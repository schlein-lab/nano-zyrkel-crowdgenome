// =====================================================================
// pangenome-worker.js — CrowdGenome: distributed pangenome alignment
// ---------------------------------------------------------------------
// 1. Read queue from nano-zyrkel repo (GitHub Raw: staging/queue/active.json)
// 2. Load ONE GRCh38 tile (5MB, cached), then rattle through chunks
// 3. Each chunk: fetch 5KB → minimap2 (biowasm) → submit to briefkasten
// 4. nano-zyrkel-crowdgenome orchestrates: checks results, advances queue
//
// Anti-duplicate: large batches (10k chunks) + random start position
// per browser session → minimal collision between concurrent users.
// Server rejects duplicates via file_exists() check.
// =====================================================================

import { reduced } from './reduce.js';

const SPACES = 'https://crowdgenome.fra1.digitaloceanspaces.com';
const REPO_RAW = 'https://raw.githubusercontent.com/schlein-lab/nano-zyrkel-crowdgenome/main';
const API = 'https://chunks.zyrkel.com/api';
const TOTAL_CHUNKS = 610_315;
const GENOME_SIZE = 3_051_512_954;

const CHRS = [
  { name: '1', size: 248956422 }, { name: '2', size: 242193529 },
  { name: '3', size: 198295559 }, { name: '4', size: 190214555 },
  { name: '5', size: 181538259 }, { name: '6', size: 170805979 },
  { name: '7', size: 159345973 }, { name: '8', size: 145138636 },
  { name: '9', size: 138394717 }, { name: '10', size: 133797422 },
  { name: '11', size: 135086622 }, { name: '12', size: 133275309 },
  { name: '13', size: 114364328 }, { name: '14', size: 107043718 },
  { name: '15', size: 101991189 }, { name: '16', size: 90338345 },
  { name: '17', size: 83257441 }, { name: '18', size: 80373285 },
  { name: '19', size: 58617616 }, { name: '20', size: 64444167 },
  { name: '21', size: 46709983 }, { name: '22', size: 50818468 },
  { name: 'X', size: 156040895 },
];
const chrColor = (i) => `oklch(0.60 0.12 ${(i / CHRS.length) * 360})`;

// ---- State ----
let sessionChunks = parseInt(localStorage.getItem('cg-chunks') || '0');
let sessionDark = parseInt(localStorage.getItem('cg-dark') || '0');
let sessionBases = parseInt(localStorage.getItem('cg-bases') || '0');
let running = false;
let analyzedChrs = {};

let aioli = null;
let aioliReady = false;

let currentTile = null;     // { key, chr, index, text }
let chunkQueue = [];         // chunk IDs to process
let queueInfo = null;        // from active.json
let prefetchCache = new Map(); // chunk_id → fasta text (prefetched)
let doneChunks = new Set(JSON.parse(localStorage.getItem('cg-done') || '[]'));
let resultBatch = [];
// Track which 10k blocks are fully done (survives reload, compact)
let doneBlocks = new Set(JSON.parse(localStorage.getItem('cg-done-blocks') || '[]'));
let currentBlockStart = parseInt(localStorage.getItem('cg-block-start') || '0');

// ---- DOM ----
const $ = (sel) => document.querySelector(sel);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Pipeline step UI ----
const STEPS = ['fetch', 'parse', 'minimap2', 'analyze', 'submit'];

function setStep(name, state) {
  const step = document.querySelector(`[data-step="${name}"]`);
  if (!step) return;
  step.classList.remove('nano-compute__step--active', 'nano-compute__step--done');
  if (state) step.classList.add(`nano-compute__step--${state}`);
  const icon = step.querySelector('[data-step-icon]');
  if (icon) {
    if (state === 'active') icon.textContent = '\u25E6';
    else if (state === 'done') icon.textContent = '\u2713';
    else icon.textContent = '\u25CB';
  }
}

function setStepTime(name, ms) {
  const el = document.querySelector(`[data-step-time="${name}"]`);
  if (el) el.textContent = ms >= 0 ? `${ms}ms` : '';
}

function resetSteps() {
  STEPS.forEach((s) => { setStep(s, null); setStepTime(s, -1); });
}

// ---- Sequence preview (lightweight: update every 5th chunk) ----
let seqRenderCounter = 0;

function renderSeqPreview(seq) {
  seqRenderCounter++;
  const el = $('[data-nano-seq-preview]');
  if (!el) return;

  // Only re-render DOM every 10 chunks to reduce flicker
  if (seqRenderCounter % 10 !== 1 && el.textContent.length > 0) {
    // Just update the label
    const label = $('[data-nano-seq-label]');
    if (label) label.textContent = `${seq.length.toLocaleString()} bp`;
    return;
  }

  // Use textContent with CSS coloring via background-image gradient trick
  // Much cheaper than 600 <span> elements
  el.textContent = seq.slice(0, 400);
  const label = $('[data-nano-seq-label]');
  if (label) label.textContent = `showing 400 of ${seq.length.toLocaleString()} bp`;
}

// ---- FASTA ----
function parseFasta(text) {
  let header = '', seq = '';
  for (const line of text.split('\n')) {
    if (line.startsWith('>')) header = line.slice(1).trim();
    else seq += line.trim().toUpperCase();
  }
  return { header, seq };
}

function parseHeader(header) {
  const m = header.match(/^(chr\w+?)(?:_MATERNAL|_PATERNAL)?:(\d+)-(\d+)/);
  return m ? { chr: m[1], start: +m[2], end: +m[3] } : { chr: '?', start: 0, end: 0 };
}

// ---- JS Analysis ----
function computeGC(seq) {
  let gc = 0, t = 0;
  for (const c of seq) { if (c === 'G' || c === 'C') gc++; if (c !== 'N') t++; }
  return t > 0 ? gc / t : 0;
}

function computeKmerEntropy(seq, k = 4) {
  const counts = {};
  for (let i = 0; i <= seq.length - k; i++) {
    const kmer = seq.slice(i, i + k);
    if (!/[^ACGT]/.test(kmer)) counts[kmer] = (counts[kmer] || 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (!total) return { entropy: 0, unique: 0 };
  let ent = 0;
  for (const c of Object.values(counts)) { const p = c / total; ent -= p * Math.log2(p); }
  return { entropy: ent, unique: Object.keys(counts).length };
}

function detectRepeats(seq) {
  let count = 0, bases = 0;
  for (let unit = 2; unit <= 6; unit++) {
    let i = 0;
    while (i < seq.length - unit * 3) {
      const pat = seq.slice(i, i + unit);
      if (/[^ACGT]/.test(pat)) { i++; continue; }
      let len = unit;
      while (i + len + unit <= seq.length && seq.slice(i + len, i + len + unit) === pat) len += unit;
      if (len >= unit * 3) { count++; bases += len; i += len; } else i++;
    }
  }
  return { count, bases };
}

// ---- biowasm / Aioli ----
async function initAioli() {
  const statusEl = $('[data-nano-minimap2-status]');
  const setStatus = (msg, s) => { if (statusEl) { statusEl.textContent = msg; statusEl.dataset.status = s; } };

  try {
    setStatus('loading Aioli\u2026', 'loading');
    const script = document.createElement('script');
    script.src = 'https://biowasm.com/cdn/v3/aioli.js';
    document.head.appendChild(script);
    await new Promise((ok, fail) => { script.onload = ok; script.onerror = () => fail('CDN'); setTimeout(fail, 15000); });

    if (typeof window.Aioli === 'undefined') { setStatus('Aioli not found', 'error'); return false; }

    setStatus('loading minimap2 WASM\u2026', 'loading');
    aioli = await new window.Aioli([{ tool: 'minimap2', version: '2.22' }], { printInterleaved: false });
    aioliReady = true;
    setStatus('minimap2 ready', 'ready');
    return true;
  } catch (e) {
    aioliReady = false;
    setStatus(typeof SharedArrayBuffer === 'undefined' ? 'needs COOP/COEP' : `failed: ${String(e).slice(0, 40)}`, 'error');
    return false;
  }
}

// ---- minimap2 ----
let tileIndexed = null; // tile key for which we've built the .mmi index

async function ensureTileIndex(tileText, tileKey) {
  // Only re-index if tile changed
  if (tileIndexed === tileKey) return;
  await aioli.mount([{ name: 'ref.fa', data: tileText }]);
  // Build index once (takes ~300-500ms, but only once per tile)
  await aioli.exec('minimap2 -d ref.mmi ref.fa');
  tileIndexed = tileKey;
}

async function runMinimap2(chunkSeq, chunkHeader, tileText) {
  if (!aioliReady || !aioli) return null;
  try {
    // Build tile index once, reuse for all chunks
    await ensureTileIndex(tileText, currentTile?.key);

    await aioli.mount([
      { name: 'query.fa', data: `>${chunkHeader}\n${chunkSeq}\n` },
    ]);
    // Align against pre-built index (~20ms instead of ~400ms)
    const result = await aioli.exec('minimap2 -a ref.mmi query.fa');
    const stdout = typeof result === 'string' ? result : (result.stdout || '');

    const hits = stdout.split('\n')
      .filter((l) => l && !l.startsWith('@'))
      .map((l) => {
        const c = l.split('\t');
        const flag = parseInt(c[1] || '0');
        const cigar = c[5] || '*';
        const tags = {};
        for (let t = 11; t < c.length; t++) {
          const m = c[t]?.match(/^(\w+):([ifZAH]):(.+)$/);
          if (m) tags[m[1]] = m[2] === 'i' ? parseInt(m[3]) : (m[2] === 'f' ? parseFloat(m[3]) : m[3]);
        }
        let matches = 0, alnLen = 0;
        for (const cm of cigar.matchAll(/(\d+)([MIDNSHP=X])/g)) {
          const n = parseInt(cm[1]);
          if ('M=X'.includes(cm[2])) { alnLen += n; if (cm[2] !== 'X') matches += n; }
          else if ('ID'.includes(cm[2])) alnLen += n;
        }
        if (tags.NM !== undefined) matches = Math.max(0, matches - tags.NM);
        return {
          flag, pos: parseInt(c[3] || '0'), mapq: parseInt(c[4] || '0'),
          cigar, strand: (flag & 16) ? '-' : '+', mapped: !(flag & 4),
          score: tags.AS ?? 0, editDist: tags.NM ?? -1,
          identity: alnLen > 0 ? matches / alnLen : 0, alnLen,
        };
      })
      .filter((h) => h.mapped && h.cigar !== '*')
      .sort((a, b) => b.score - a.score);

    renderHits(hits);
    return { hits };
  } catch (e) {
    return { error: e.message, hits: [] };
  }
}

function renderHits(hits) {
  const container = document.getElementById('nano-hits');
  const list = document.querySelector('[data-nano-hits-list]');
  if (!container || !list) return;
  container.hidden = false;
  list.innerHTML = '';

  if (!hits.length) {
    list.innerHTML = '<div class="nano-compute__no-hits">No alignment to this tile</div>';
    return;
  }

  hits.slice(0, 8).forEach((hit, i) => {
    const row = document.createElement('div');
    row.className = 'nano-compute__hit';
    const ic = hit.identity >= 0.95 ? 'high' : (hit.identity >= 0.8 ? 'mid' : 'low');
    row.innerHTML = `
      <span class="nano-compute__hit-idx">#${i + 1}</span>
      <span class="nano-compute__hit-strand">${hit.strand}</span>
      <span class="nano-compute__hit-pos">pos ${hit.pos.toLocaleString()}</span>
      <span class="nano-compute__hit-mapq nano-compute__hit-mapq--${ic}">${(hit.identity * 100).toFixed(1)}%</span>
      <span class="nano-compute__hit-cigar" title="${hit.cigar}">S${hit.score} Q${hit.mapq}${hit.editDist >= 0 ? ` NM${hit.editDist}` : ''}</span>
    `;
    list.appendChild(row);
  });
}

// ---- Genome bar ----
function renderGenomeBar() {
  const bar = document.getElementById('nano-genome-bar');
  const labels = document.getElementById('nano-genome-labels');
  if (!bar) return;
  bar.innerHTML = '';
  if (labels) labels.innerHTML = '';
  const total = CHRS.reduce((s, c) => s + c.size, 0);
  CHRS.forEach((chr, i) => {
    const pct = (chr.size / total) * 100;
    const seg = document.createElement('div');
    seg.className = 'nano-genome__seg';
    seg.style.flex = `${pct}`;
    seg.style.background = chrColor(i);
    seg.style.opacity = '0.25';
    seg.dataset.chr = chr.name;
    seg.title = `chr${chr.name}: ${(chr.size / 1e6).toFixed(0)} Mb`;
    bar.appendChild(seg);
    if (labels && pct > 1.2) {
      const lbl = document.createElement('span');
      lbl.className = 'nano-genome__lbl';
      lbl.style.flex = `${pct}`;
      lbl.textContent = chr.name;
      labels.appendChild(lbl);
    }
  });
}

function highlightChr(chrName) {
  const clean = chrName.replace(/^chr/, '').replace(/_MATERNAL|_PATERNAL/, '');
  document.querySelectorAll('.nano-genome__seg').forEach((seg) => {
    seg.classList.remove('nano-genome__seg--active');
    const n = analyzedChrs[seg.dataset.chr] || 0;
    if (n > 0) seg.style.opacity = Math.min(0.25 + n * 0.05, 1).toString();
    if (seg.dataset.chr === clean) {
      seg.classList.add('nano-genome__seg--active');
      seg.style.opacity = '1';
      const marker = document.getElementById('nano-genome-marker');
      const bar = document.getElementById('nano-genome-bar');
      if (marker && bar) {
        const br = bar.getBoundingClientRect();
        const sr = seg.getBoundingClientRect();
        marker.style.display = 'block';
        marker.style.left = `${sr.left - br.left + sr.width / 2}px`;
      }
    }
  });
}

function updateProgress(len) {
  if (len) sessionBases += len;
  const pctEl = $('[data-nano-progress-pct]');
  const basesEl = $('[data-nano-session-bases]');
  if (pctEl) pctEl.textContent = `${((sessionBases / GENOME_SIZE) * 100).toFixed(4)}%`;
  if (basesEl) {
    basesEl.textContent = sessionBases < 1e6
      ? `${(sessionBases / 1e3).toFixed(1)}k`
      : `${(sessionBases / 1e6).toFixed(2)}M`;
  }
}

let communityCount = 0;
let localSinceRefresh = 0;
let lastCommunityRefresh = 0;

async function loadCommunityCount() {
  try {
    const res = await fetch(`${API}/results/count?t=${Date.now()}`);
    if (res.ok) {
      const { count } = await res.json();
      communityCount = count;
      localSinceRefresh = 0;
      const el = $('[data-nano-community-chunks]');
      if (el) el.textContent = count.toLocaleString();
    }
  } catch {}
  lastCommunityRefresh = Date.now();
}

function updateCommunityCount() {
  // Optimistic increment between server polls
  localSinceRefresh++;
  const el = $('[data-nano-community-chunks]');
  if (el) el.textContent = (communityCount + localSinceRefresh).toLocaleString();

  // Re-sync from server every 15 seconds
  if (Date.now() - lastCommunityRefresh > 15000) {
    loadCommunityCount();
  }
}

function getSessionId() {
  let id = localStorage.getItem('crowdgenome-session');
  if (!id) { id = crypto.randomUUID?.() || `${Date.now()}`; localStorage.setItem('crowdgenome-session', id); }
  return id;
}

// ---- Prefetch: load next 100 chunks in background ----
const PREFETCH_COUNT = 100;
let prefetching = false;

function prefetchAhead() {
  if (prefetching || prefetchCache.size >= PREFETCH_COUNT) return;
  prefetching = true;

  // Grab next chunks from queue that aren't cached yet
  const toFetch = [];
  for (const id of chunkQueue) {
    if (!prefetchCache.has(id) && toFetch.length < PREFETCH_COUNT - prefetchCache.size) {
      toFetch.push(id);
    }
  }

  // Fire all fetches concurrently (5KB each, ~500KB total — negligible)
  Promise.all(toFetch.map(async (id) => {
    const padded = String(id).padStart(6, '0');
    try {
      let res = await fetch(`${SPACES}/pangenome/chunks/chunk_${padded}.fa`);
      if (!res.ok) res = await fetch(`https://chunks.zyrkel.com/chunks/chunk_${padded}.fa`);
      if (res.ok) prefetchCache.set(id, await res.text());
    } catch {}
  })).finally(() => { prefetching = false; });
}

// ---- Queue: load from nano-zyrkel repo ----
async function loadQueue() {
  const posEl = $('[data-nano-chunk-pos]');
  if (posEl) posEl.textContent = 'reading queue from nano-zyrkel\u2026';

  try {
    const res = await fetch(`${REPO_RAW}/staging/queue/active.json`);
    if (!res.ok) throw new Error(`queue ${res.status}`);
    queueInfo = await res.json();

    // Load tile if changed
    if (!currentTile || currentTile.key !== queueInfo.tile.key) {
      if (posEl) posEl.textContent = `loading GRCh38 ${queueInfo.tile.chr} tile ${queueInfo.tile.index} (~5MB)\u2026`;
      const tileRes = await fetch(queueInfo.tile.url);
      if (!tileRes.ok) throw new Error(`tile ${tileRes.status}`);
      currentTile = { ...queueInfo.tile, text: await tileRes.text() };
    }

    // Build chunk queue: auto-advance through ALL 610k chunks, never stop
    // Start from where we left off (persisted in sessionStorage)
    let start = currentBlockStart;
    let end = start + 10000;
    let ids = [];

    // Skip fully-done blocks
    let attempts = 0;
    while (ids.length === 0 && attempts < 62) { // 62 blocks × 10k = 620k > 610k
      ids = [];
      for (let i = start; i < end && i < TOTAL_CHUNKS; i++) {
        if (!doneChunks.has(i)) ids.push(i);
      }
      if (ids.length === 0) {
        doneBlocks.add(start);
        start += 10000;
        end = start + 10000;
        if (start >= TOTAL_CHUNKS) start = 0; // wrap around
        attempts++;
      }
    }

    // Persist current position
    currentBlockStart = start;
    localStorage.setItem('cg-block-start', start);
    localStorage.setItem('cg-done-blocks', JSON.stringify([...doneBlocks]));

    // Shuffle within block
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    chunkQueue = ids;

    // Prune doneChunks if it gets too large (keep only current block's IDs)
    if (doneChunks.size > 30000) {
      const keep = new Set();
      for (const id of doneChunks) {
        if (id >= start && id < start + 20000) keep.add(id);
      }
      doneChunks = keep;
      localStorage.setItem('cg-done', JSON.stringify([...doneChunks]));
    }

    if (posEl) posEl.textContent = `${queueInfo.tile.chr} tile ${queueInfo.tile.index} \u2014 ${chunkQueue.length} chunks queued`;
    return true;
  } catch (e) {
    const r = $('[data-nano-findings]');
    if (r) r.textContent = `Queue load failed: ${e.message}`;
    return false;
  }
}

// ---- Main pipeline ----
async function analyzeChunk() {
  if (chunkQueue.length === 0) {
    const ok = await loadQueue();
    if (!ok || chunkQueue.length === 0) return;
  }

  const widget = $('[data-nano="compute"]');
  const resultEl = $('[data-nano-findings]');

  const chunkId = chunkQueue.shift();
  const paddedId = String(chunkId).padStart(6, '0');
  const idEl = $('[data-nano-chunk-id]');
  const chrEl = $('[data-nano-chr]');
  const posEl = $('[data-nano-chunk-pos]');
  if (idEl) idEl.textContent = `#${chunkId.toLocaleString()}`;
  if (posEl) posEl.textContent = `vs ${currentTile.chr} tile ${currentTile.index} \u2014 ${chunkQueue.length} remaining`;

  // ── FETCH chunk (5KB) — from prefetch cache or live ──
  setStep('fetch', 'active');
  const t0 = performance.now();
  let chunkText;

  if (prefetchCache.has(chunkId)) {
    chunkText = prefetchCache.get(chunkId);
    prefetchCache.delete(chunkId);
  } else {
    try {
      let res = await fetch(`${SPACES}/pangenome/chunks/chunk_${paddedId}.fa`);
      if (!res.ok) res = await fetch(`https://chunks.zyrkel.com/chunks/chunk_${paddedId}.fa`);
      if (!res.ok) throw new Error(`${res.status}`);
      chunkText = await res.text();
    } catch (e) {
      setStep('fetch', null);
      if (resultEl) resultEl.textContent = `Chunk fetch failed: ${e.message}`;
      return;
    }
  }
  setStep('fetch', 'done');
  setStepTime('fetch', Math.round(performance.now() - t0));

  // Prefetch next 100 chunks in background (non-blocking)
  prefetchAhead();

  // ── PARSE ──
  setStep('parse', 'active');
  const t1 = performance.now();
  const { header, seq } = parseFasta(chunkText);
  const pos = parseHeader(header);
  setStep('parse', 'done');
  setStepTime('parse', Math.round(performance.now() - t1));

  if (chrEl) chrEl.textContent = pos.chr;
  if (posEl) posEl.textContent = `${(pos.start / 1e6).toFixed(2)}\u2013${(pos.end / 1e6).toFixed(2)} Mb vs ${currentTile.chr}:tile ${currentTile.index}`;
  renderSeqPreview(seq);

  if (!seq || seq.length < 100) { if (resultEl) resultEl.textContent = 'Chunk too short'; return; }

  // ── ANALYZE (JS, always) ──
  setStep('analyze', 'active');
  const t3 = performance.now();
  const gc = computeGC(seq);
  const { entropy, unique } = computeKmerEntropy(seq);
  const repeats = detectRepeats(seq);
  setStep('analyze', 'done');
  setStepTime('analyze', Math.round(performance.now() - t3));

  // Stats
  const gcEl = $('[data-nano-gc]');
  const entropyEl = $('[data-nano-entropy]');
  const repeatsEl = $('[data-nano-repeats]');
  const lengthEl = $('[data-nano-length]');
  if (gcEl) gcEl.textContent = `${(gc * 100).toFixed(1)}%`;
  if (entropyEl) entropyEl.textContent = entropy.toFixed(2);
  if (repeatsEl) repeatsEl.textContent = repeats.count;
  if (lengthEl) lengthEl.textContent = `${seq.length.toLocaleString()} bp`;

  // ── MINIMAP2 ──
  setStep('minimap2', 'active');
  const t2 = performance.now();
  let mm2 = null;

  if (aioliReady) {
    mm2 = await runMinimap2(seq, header, currentTile.text);
  } else {
    const hc = document.getElementById('nano-hits');
    const hl = document.querySelector('[data-nano-hits-list]');
    if (hc) hc.hidden = false;
    if (hl) hl.innerHTML = '<div class="nano-compute__no-hits">minimap2 loading\u2026</div>';
    await sleep(50);
  }

  const mm2Ms = Math.round(performance.now() - t2);
  if (aioliReady) { setStep('minimap2', 'done'); setStepTime('minimap2', mm2Ms); }

  const hasHits = mm2?.hits?.length > 0;
  const bestHit = hasHits ? mm2.hits[0] : null;
  const minimap2Ran = aioliReady && mm2 && !mm2.error;
  const isDivergent = minimap2Ran && !hasHits;

  // ── SUBMIT (fire & forget — non-blocking, next chunk starts immediately) ──
  const payload = JSON.stringify({
    chunk_id: chunkId, chr: pos.chr, start: pos.start, end: pos.end,
    length: seq.length, gc, entropy, unique_kmers: unique,
    repeat_count: repeats.count, repeat_bases: repeats.bases,
    tile_key: currentTile.key,
    minimap2_hits: mm2?.hits?.length ?? -1,
    minimap2_best_score: bestHit?.score ?? 0,
    minimap2_best_mapq: bestHit?.mapq ?? 0,
    minimap2_best_identity: bestHit?.identity ?? 0,
    minimap2_best_edit_dist: bestHit?.editDist ?? -1,
    minimap2_verified: minimap2Ran,
    is_divergent: isDivergent,
    compute_ms: mm2Ms,
    session_id: getSessionId(),
  });
  // Batch results — send every 50 chunks as one request
  resultBatch.push(JSON.parse(payload));
  if (resultBatch.length >= 50) {
    const batch = JSON.stringify(resultBatch);
    resultBatch = [];
    fetch(`${API}/result`, {
      method: 'POST',
      body: batch,
      keepalive: true,
      headers: { 'Content-Type': 'text/plain' },
    }).catch(() => {});
  }
  setStep('submit', 'done');

  // Update community counter
  updateCommunityCount();

  // Mark chunk as done locally (skip on future reloads)
  doneChunks.add(chunkId);
  if (doneChunks.size <= 50000) {
    localStorage.setItem('cg-done', JSON.stringify([...doneChunks]));
  }

  // ── Update counters ──
  sessionChunks++;
  if (isDivergent) sessionDark++;
  localStorage.setItem('cg-chunks', sessionChunks);
  localStorage.setItem('cg-dark', sessionDark);
  localStorage.setItem('cg-bases', sessionBases);
  const chrClean = pos.chr.replace(/^chr/, '');
  analyzedChrs[chrClean] = (analyzedChrs[chrClean] || 0) + 1;

  $('[data-nano-session-chunks]')?.replaceChildren(document.createTextNode(String(sessionChunks)));
  $('[data-nano-session-dark]')?.replaceChildren(document.createTextNode(String(sessionDark)));
  highlightChr(pos.chr);
  updateProgress(seq.length);

  // ── Result display ──
  if (resultEl) {
    if (!minimap2Ran) {
      resultEl.className = 'nano-compute__result';
      resultEl.textContent = `Characterized: ${unique} 4-mers, GC ${(gc * 100).toFixed(1)}% \u2014 minimap2 loading`;
    } else if (isDivergent) {
      resultEl.className = 'nano-compute__result nano-compute__result--dark';
      widget?.classList.add('nano-widget--dark-found');
      resultEl.textContent = `\u26a0 No alignment to ${currentTile.key} (${mm2Ms}ms) \u2014 may diverge or map elsewhere`;
    } else {
      resultEl.className = 'nano-compute__result nano-compute__result--mapped';
      widget?.classList.remove('nano-widget--dark-found');
      resultEl.textContent = `\u2713 Aligned \u2014 ${mm2.hits.length} hit${mm2.hits.length > 1 ? 's' : ''}, ${(bestHit.identity * 100).toFixed(1)}% identity, score ${bestHit.score}, Q${bestHit.mapq}`;
    }
  }
}

// ---- Loop ----
async function runLoop() {
  if (running) return;
  running = true;

  renderGenomeBar();

  // Restore counters from session
  $('[data-nano-session-chunks]')?.replaceChildren(document.createTextNode(String(sessionChunks)));
  $('[data-nano-session-dark]')?.replaceChildren(document.createTextNode(String(sessionDark)));
  updateProgress(0);

  // Load community total from server
  loadCommunityCount();

  // Load queue + tile
  await loadQueue();

  // Start minimap2 in background
  initAioli();

  // Flush remaining batch on page unload
  window.addEventListener('beforeunload', () => {
    if (resultBatch.length > 0) {
      navigator.sendBeacon(`${API}/result`, new Blob([JSON.stringify(resultBatch)], { type: 'text/plain' }));
      resultBatch = [];
    }
  });

  // Continuous loop — runs even when tab is in background
  async function loop() {
    await analyzeChunk();
    setTimeout(loop, document.hidden ? 200 : 100);
  }
  loop();

}

// ---- Init ----
export function init() {
  const section = document.getElementById('nanos');
  if (!section) return;
  if (reduced()) {
    const el = $('[data-nano-findings]');
    if (el) el.textContent = 'Reduced motion: analysis paused';
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => { if (entries[0]?.isIntersecting) { observer.disconnect(); runLoop(); } },
    { threshold: 0.1 },
  );
  observer.observe(section);
  setTimeout(() => { if (!running) runLoop(); }, 3000);
}
