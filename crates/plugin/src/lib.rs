//! # CrowdGenome Plugin
//!
//! Orchestration plugin for the nano-zyrkel-crowdgenome project.
//! Runs inside the nano-zyrkel binary via GitHub Actions on a cron schedule.
//!
//! ## Responsibilities
//!
//! 1. **Queue Management**: Decide which GRCh38 tile is "active" — browsers
//!    align chunks against this tile. When all chunks are done for a tile,
//!    advance to the next one.
//!
//! 2. **Done Tracking**: Maintain `staging/done/<tile>.json` files that list
//!    which chunk IDs have been processed. The browser reads these to avoid
//!    duplicate computation.
//!
//! 3. **Result Aggregation**: Collect per-chunk alignment results submitted
//!    by browsers (via `staging/inbox/`). For each chunk, keep only the top
//!    4 best hits (by alignment score) across all tiles. Prune the rest.
//!
//! 4. **Progress Reporting**: Update `staging/summary.json` with overall
//!    progress, contributor count, coverage stats.
//!
//! ## Data Flow
//!
//! ```text
//! Browser                     DO Spaces                nano-zyrkel (this plugin)
//! ───────                     ─────────                ─────────────────────────
//! 1. Read queue/active.json → current tile
//! 2. Read done/<tile>.json  → which chunks done
//! 3. Pick undone chunk
//! 4. Fetch chunk (5KB)
//! 5. Fetch tile (5MB, cached)
//! 6. minimap2 align
//! 7. POST result to inbox/ ──────────────────────────→ 8. Ingest inbox/
//!                                                       9. Update done/<tile>.json
//!                                                      10. Rank best hits per chunk
//!                                                      11. Prune scores < top 4
//!                                                      12. Update summary.json
//!                                                      13. Advance tile if complete
//! ```
//!
//! ## File Layout (staging/)
//!
//! ```text
//! staging/
//! ├── queue/
//! │   └── active.json           ← { tile_chr, tile_index, tile_key, tile_url }
//! ├── done/
//! │   ├── chr1_tile_0000.jsonl  ← one chunk_id per line (append-only, fast lookup)
//! │   ├── chr1_tile_0001.jsonl
//! │   └── ...
//! ├── results/
//! │   ├── 000/                  ← sharded: chunk_id / 1000
//! │   │   ├── chunk_000000.json ← { chunk_id, best_hits: [{tile, score, mapq, identity}] }
//! │   │   └── chunk_000999.json
//! │   └── 610/
//! │       └── chunk_610314.json
//! ├── inbox/                    ← raw browser submissions (ingested then deleted)
//! │   ├── 1713000000_abc123.json
//! │   └── ...
//! └── summary.json              ← { total_alignments, unique_chunks, tiles_complete, ... }
//! ```

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::path::{Path, PathBuf};

// ── Data structures ──

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActiveTile {
    pub tile_chr: String,
    pub tile_index: u32,
    pub tile_key: String,
    pub tile_url: String,
    pub started_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChunkResult {
    pub chunk_id: u32,
    pub chr: String,
    pub start: u64,
    pub end: u64,
    pub length: u32,
    pub gc: f64,
    pub entropy: f64,
    pub tile_key: String,
    pub hits: u32,
    pub best_score: i32,
    pub best_mapq: u32,
    pub best_identity: f64,
    pub best_edit_dist: i32,
    pub session_id: String,
    pub timestamp: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BestHit {
    pub tile_key: String,
    pub score: i32,
    pub mapq: u32,
    pub identity: f64,
    pub edit_dist: i32,
    pub hits: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChunkBests {
    pub chunk_id: u32,
    pub chr: String,
    pub start: u64,
    pub end: u64,
    pub tiles_tested: u32,
    pub best_hits: Vec<BestHit>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Summary {
    pub total_alignments: u64,
    pub verified_alignments: u64,
    pub unique_chunks_tested: u64,
    pub tiles_complete: u32,
    pub tiles_total: u32,
    pub total_contributors: u64,
    pub divergent_chunks: u64,
    pub last_updated: String,
}

// ── Core logic ──

const MAX_BEST_HITS: usize = 4;
const STAGING_DIR: &str = "staging";

/// Ingest raw results from inbox/, update done-tracking, rank best hits.
pub async fn ingest(staging: &Path) -> Result<u32> {
    let inbox = staging.join("inbox");
    if !inbox.exists() {
        return Ok(0);
    }

    let mut ingested = 0u32;
    let mut entries: Vec<_> = std::fs::read_dir(&inbox)?
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().map(|x| x == "json").unwrap_or(false))
        .collect();
    entries.sort_by_key(|e| e.file_name());

    for entry in &entries {
        let path = entry.path();
        let content = std::fs::read_to_string(&path)
            .with_context(|| format!("reading {}", path.display()))?;

        let result: ChunkResult = match serde_json::from_str(&content) {
            Ok(r) => r,
            Err(e) => {
                tracing::warn!("Skipping malformed inbox file {}: {}", path.display(), e);
                std::fs::remove_file(&path).ok();
                continue;
            }
        };

        // 1. Mark chunk as done for this tile
        mark_done(staging, &result.tile_key, result.chunk_id)?;

        // 2. Update best hits for this chunk (keep top 4)
        if result.hits > 0 {
            update_best_hits(staging, &result)?;
        }

        // 3. Delete inbox file
        std::fs::remove_file(&path).ok();
        ingested += 1;
    }

    Ok(ingested)
}

/// Append chunk_id to the done-list for a tile.
fn mark_done(staging: &Path, tile_key: &str, chunk_id: u32) -> Result<()> {
    let done_dir = staging.join("done");
    std::fs::create_dir_all(&done_dir)?;

    // Sanitize tile_key for filename: "chr1:0-5000000" → "chr1_0_5000000"
    let fname = tile_key.replace(':', "_").replace('-', "_") + ".jsonl";
    let path = done_dir.join(fname);

    use std::io::Write;
    let mut f = std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(&path)?;
    writeln!(f, "{}", chunk_id)?;
    Ok(())
}

/// Load the set of done chunk IDs for a tile.
pub fn load_done(staging: &Path, tile_key: &str) -> HashSet<u32> {
    let fname = tile_key.replace(':', "_").replace('-', "_") + ".jsonl";
    let path = staging.join("done").join(fname);
    let mut set = HashSet::new();
    if let Ok(content) = std::fs::read_to_string(&path) {
        for line in content.lines() {
            if let Ok(id) = line.trim().parse::<u32>() {
                set.insert(id);
            }
        }
    }
    set
}

/// Update the best-hits file for a chunk, keeping only top MAX_BEST_HITS.
fn update_best_hits(staging: &Path, result: &ChunkResult) -> Result<()> {
    let shard = result.chunk_id / 1000;
    let dir = staging.join("results").join(format!("{:03}", shard));
    std::fs::create_dir_all(&dir)?;

    let fname = format!("chunk_{:06}.json", result.chunk_id);
    let path = dir.join(&fname);

    // Load existing bests
    let mut bests: ChunkBests = if path.exists() {
        let content = std::fs::read_to_string(&path)?;
        serde_json::from_str(&content).unwrap_or_else(|_| ChunkBests {
            chunk_id: result.chunk_id,
            chr: result.chr.clone(),
            start: result.start,
            end: result.end,
            tiles_tested: 0,
            best_hits: Vec::new(),
        })
    } else {
        ChunkBests {
            chunk_id: result.chunk_id,
            chr: result.chr.clone(),
            start: result.start,
            end: result.end,
            tiles_tested: 0,
            best_hits: Vec::new(),
        }
    };

    bests.tiles_tested += 1;

    // Check if this tile already has a better result
    let dominated = bests.best_hits.iter()
        .any(|h| h.tile_key == result.tile_key && h.score >= result.best_score);

    if !dominated {
        // Remove existing entry for this tile (if worse)
        bests.best_hits.retain(|h| h.tile_key != result.tile_key);

        // Add new hit
        bests.best_hits.push(BestHit {
            tile_key: result.tile_key.clone(),
            score: result.best_score,
            mapq: result.best_mapq,
            identity: result.best_identity,
            edit_dist: result.best_edit_dist,
            hits: result.hits,
        });

        // Sort by score descending
        bests.best_hits.sort_by(|a, b| b.score.cmp(&a.score));

        // Prune to top N
        bests.best_hits.truncate(MAX_BEST_HITS);
    }

    // Write back
    let json = serde_json::to_string_pretty(&bests)?;
    std::fs::write(&path, json)?;
    Ok(())
}

/// Check if all 610,315 chunks have been done for a tile.
pub fn is_tile_complete(staging: &Path, tile_key: &str) -> bool {
    let done = load_done(staging, tile_key);
    done.len() >= 610_315
}

/// Advance to next tile in the queue.
pub fn advance_tile(staging: &Path, ref_manifest: &serde_json::Value) -> Result<Option<ActiveTile>> {
    let queue_dir = staging.join("queue");
    std::fs::create_dir_all(&queue_dir)?;

    // Read current
    let active_path = queue_dir.join("active.json");
    let current: Option<ActiveTile> = if active_path.exists() {
        serde_json::from_str(&std::fs::read_to_string(&active_path)?).ok()
    } else {
        None
    };

    // Find next tile
    let chromosomes = ref_manifest.get("chromosomes")
        .and_then(|c| c.as_object());
    let chromosomes = match chromosomes {
        Some(c) => c,
        None => return Ok(None),
    };

    let mut found_current = current.is_none(); // if no current, start from beginning
    for (chr_name, chr_data) in chromosomes {
        let tiles = chr_data.get("tile_list").and_then(|t| t.as_array());
        let tiles = match tiles {
            Some(t) => t,
            None => continue,
        };
        for tile in tiles {
            let idx = tile.get("index").and_then(|i| i.as_u64()).unwrap_or(0) as u32;
            let start = tile.get("start").and_then(|s| s.as_u64()).unwrap_or(0);
            let end = tile.get("end").and_then(|e| e.as_u64()).unwrap_or(0);
            let file = tile.get("file").and_then(|f| f.as_str()).unwrap_or("");
            let key = format!("{}:{}-{}", chr_name, start, end);

            if let Some(ref cur) = current {
                if cur.tile_key == key {
                    found_current = true;
                    continue; // skip current, we want the NEXT one
                }
            }

            if found_current {
                // Check if this tile is already complete
                if is_tile_complete(staging, &key) {
                    continue; // skip completed tiles
                }

                let next = ActiveTile {
                    tile_chr: chr_name.clone(),
                    tile_index: idx,
                    tile_key: key,
                    tile_url: format!("https://crowdgenome.fra1.digitaloceanspaces.com/{}", file),
                    started_at: chrono::Utc::now().to_rfc3339(),
                };

                let json = serde_json::to_string_pretty(&next)?;
                std::fs::write(&active_path, json)?;
                return Ok(Some(next));
            }
        }
    }

    // Wrapped around — all tiles complete!
    Ok(None)
}

/// Generate summary.json with overall progress stats.
pub fn update_summary(staging: &Path) -> Result<Summary> {
    let done_dir = staging.join("done");
    let results_dir = staging.join("results");

    let mut total_alignments = 0u64;
    let mut tiles_complete = 0u32;
    let mut unique_chunks = HashSet::new();

    // Count done entries per tile
    if done_dir.exists() {
        for entry in std::fs::read_dir(&done_dir)? {
            let entry = entry?;
            if entry.path().extension().map(|x| x == "jsonl").unwrap_or(false) {
                let content = std::fs::read_to_string(entry.path())?;
                let count = content.lines().filter(|l| !l.is_empty()).count();
                total_alignments += count as u64;
                for line in content.lines() {
                    if let Ok(id) = line.trim().parse::<u32>() {
                        unique_chunks.insert(id);
                    }
                }
                if count >= 610_315 {
                    tiles_complete += 1;
                }
            }
        }
    }

    let summary = Summary {
        total_alignments,
        verified_alignments: total_alignments,
        unique_chunks_tested: unique_chunks.len() as u64,
        tiles_complete,
        tiles_total: 686,
        total_contributors: 0, // TODO: count from inbox metadata
        divergent_chunks: 0,   // TODO: count from results
        last_updated: chrono::Utc::now().to_rfc3339(),
    };

    let json = serde_json::to_string_pretty(&summary)?;
    std::fs::write(staging.join("summary.json"), json)?;

    Ok(summary)
}

// ── nano-zyrkel Plugin implementation ──

pub struct CrowdGenomePlugin;

impl nano_zyrkel_core::Plugin for CrowdGenomePlugin {
    fn name(&self) -> &str { "crowdgenome" }

    fn on_init(&self, ctx: &mut nano_zyrkel_core::PluginContext) -> Result<()> {
        tracing::info!("[crowdgenome] Plugin initialized");
        Ok(())
    }

    fn on_record(&self, _ctx: &mut nano_zyrkel_core::PluginContext, record: &mut serde_json::Value) -> bool {
        // Every record (= inbox submission) is valid
        true
    }

    fn on_finish(&self, _ctx: &mut nano_zyrkel_core::PluginContext, success: bool) -> Result<()> {
        if !success { return Ok(()); }

        let staging = Path::new(STAGING_DIR);

        // 1. Ingest inbox
        let rt = tokio::runtime::Handle::current();
        let ingested = rt.block_on(ingest(staging))?;
        tracing::info!("[crowdgenome] Ingested {} results from inbox", ingested);

        // 2. Check if current tile is complete → advance
        let active_path = staging.join("queue/active.json");
        if active_path.exists() {
            let active: ActiveTile = serde_json::from_str(
                &std::fs::read_to_string(&active_path)?
            )?;
            if is_tile_complete(staging, &active.tile_key) {
                tracing::info!("[crowdgenome] Tile {} complete! Advancing...", active.tile_key);
                // Load ref manifest from cache or fetch
                let manifest_path = staging.join("ref_manifest.json");
                if manifest_path.exists() {
                    let manifest: serde_json::Value = serde_json::from_str(
                        &std::fs::read_to_string(&manifest_path)?
                    )?;
                    if let Some(next) = advance_tile(staging, &manifest)? {
                        tracing::info!("[crowdgenome] Advanced to tile {}", next.tile_key);
                    } else {
                        tracing::info!("[crowdgenome] All tiles complete!");
                    }
                }
            }
        }

        // 3. Update summary
        let summary = update_summary(staging)?;
        tracing::info!(
            "[crowdgenome] Summary: {} alignments, {} unique chunks, {}/{} tiles complete",
            summary.total_alignments, summary.unique_chunks_tested,
            summary.tiles_complete, summary.tiles_total
        );

        Ok(())
    }
}
