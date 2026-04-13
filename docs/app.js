// =====================================================================
// app.js — CrowdGenome Dashboard
// Karyogram, Contig Track, Alignment Detail, Live Feed, Pipeline
// =====================================================================

const GITHUB_RAW = 'https://raw.githubusercontent.com/schlein-lab/nano-zyrkel-crowdgenome/main';
const API = 'https://chunks.zyrkel.com/api';

// Chromosome sizes (GRCh38, in Mb, approximate)
const CHR_SIZES = {
  1: 249, 2: 243, 3: 198, 4: 191, 5: 182, 6: 171, 7: 159, 8: 146,
  9: 139, 10: 134, 11: 135, 12: 133, 13: 115, 14: 107, 15: 102,
  16: 90, 17: 84, 18: 80, 19: 59, 20: 65, 21: 47, 22: 51, X: 156, Y: 57,
};

// Simulated per-chromosome completion (will be replaced by real data)
let chrCompletion = {};
let chrChunks = {};

// ---- Init ----

document.addEventListener('DOMContentLoaded', async () => {
  initKaryogram();
  initNavigation();
  await loadStats();
  startLiveFeed();
  startPipeline();
});

// ---- Stats ----

async function loadStats() {
  try {
    const res = await fetch(`${API}/stats`);
    if (res.ok) {
      const data = await res.json();
      setText('stat-chunks', data.unique_chunks || 0);
      setText('stat-dark', data.divergent_chunks || 0);
      setText('stat-contributors', data.contributors || 0);
      setText('stat-cpu', formatHours(data.cpu_hours || 0));
      setText('stat-coverage', `${(data.genome_pct || 0).toFixed(1)}%`);

      if (data.chromosomes) {
        for (const [chr, info] of Object.entries(data.chromosomes)) {
          const clean = chr.replace(/^chr/, '');
          const size = {1:249,2:243,3:198,4:191,5:182,6:171,7:159,8:146,9:139,10:134,11:135,12:133,13:115,14:107,15:102,16:90,17:84,18:80,19:59,20:65,21:47,22:51,X:156,Y:57}[clean] || 100;
          const totalChunks = size * 200;
          chrCompletion[clean] = (parseInt(info.cnt) / totalChunks) * 100;
        }
        updateKaryogram();
      }
    }
  } catch { /* use demo data */ }

  // Load LLM summary
  try {
    const res = await fetch(`${GITHUB_RAW}/staging/llm-summary.json`);
    if (res.ok) {
      const data = await res.json();
      setText('daily-summary', data.summary || 'No summary available yet.');
      const time = document.getElementById('summary-time');
      if (time && data.timestamp) time.textContent = new Date(data.timestamp).toLocaleString();
    }
  } catch { /* placeholder stays */ }

  // If no real data, generate demo
  if (Object.keys(chrCompletion).length === 0) {
    generateDemoData();
    updateKaryogram();
  }
}

function generateDemoData() {
  for (const chr of Object.keys(CHR_SIZES)) {
    const pct = Math.random() * 15; // 0-15% for demo
    chrCompletion[chr] = pct;
    chrChunks[chr] = generateDemoChunks(chr, pct);
  }
  setText('stat-chunks', '1,247');
  setText('stat-dark', '23');
  setText('stat-contributors', '89');
  setText('stat-cpu', '4.2h');
  setText('stat-coverage', '3.8%');
  setText('daily-summary', 'Early stage: 89 contributors have analyzed 1,247 chunks across all chromosomes. 23 candidate dark regions identified, primarily in centromeric and subtelomeric areas. Highest coverage on chr21 (12.3%) and chr22 (9.7%). Cross-referencing against ClinVar in progress.');
}

function generateDemoChunks(chr, completionPct) {
  const sizeMb = CHR_SIZES[chr];
  const totalChunks = Math.floor(sizeMb * 200); // ~200 chunks per Mb at 5kb
  const analyzed = Math.floor(totalChunks * completionPct / 100);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    const startMb = (i / totalChunks) * sizeMb;
    const endMb = ((i + 1) / totalChunks) * sizeMb;
    let status = 'pending';
    if (i < analyzed) {
      status = Math.random() < 0.03 ? 'dark' : (Math.random() < 0.15 ? 'partial' : 'mapped');
    }
    chunks.push({ id: i, chr, startMb, endMb, status });
  }
  return chunks;
}

// ---- Karyogram ----

function initKaryogram() {
  const container = document.getElementById('karyogram');
  if (!container) return;

  const maxSize = Math.max(...Object.values(CHR_SIZES));

  for (const [chr, sizeMb] of Object.entries(CHR_SIZES)) {
    const el = document.createElement('div');
    el.className = 'karyo-chr';
    el.dataset.chr = chr;

    const barHeight = Math.round((sizeMb / maxSize) * 180);
    const pct = chrCompletion[chr] || 0;
    const color = completionColor(pct);

    el.innerHTML = `
      <span class="karyo-chr__pct">${pct.toFixed(0)}%</span>
      <div class="karyo-chr__bar" style="height: ${barHeight}px">
        <div class="karyo-chr__fill" style="height: ${pct}%; background: ${color}"></div>
      </div>
      <span class="karyo-chr__label">${chr}</span>
    `;

    el.addEventListener('click', () => showContigTrack(chr));
    container.appendChild(el);
  }
}

function updateKaryogram() {
  for (const [chr, pct] of Object.entries(chrCompletion)) {
    const el = document.querySelector(`.karyo-chr[data-chr="${chr}"]`);
    if (!el) continue;
    const fill = el.querySelector('.karyo-chr__fill');
    const pctLabel = el.querySelector('.karyo-chr__pct');
    if (fill) {
      fill.style.height = `${pct}%`;
      fill.style.background = completionColor(pct);
    }
    if (pctLabel) pctLabel.textContent = `${pct.toFixed(0)}%`;
  }
}

function completionColor(pct) {
  if (pct < 10) return '#333348';
  if (pct < 30) return '#eab308';
  if (pct < 70) return '#22c55e';
  return '#22c55e';
}

// ---- Contig Track ----

function showContigTrack(chr) {
  document.getElementById('karyogram-panel').hidden = true;
  document.getElementById('contig-panel').hidden = false;
  document.getElementById('alignment-panel').hidden = true;
  setText('contig-title', `chr${chr}`);

  const track = document.getElementById('contig-track');
  track.innerHTML = '';

  const chunks = chrChunks[chr] || generateDemoChunks(chr, chrCompletion[chr] || 0);
  if (!chrChunks[chr]) chrChunks[chr] = chunks;

  // For performance, group consecutive same-status chunks
  let groups = [];
  let current = null;
  for (const chunk of chunks) {
    if (current && current.status === chunk.status) {
      current.count++;
      current.endMb = chunk.endMb;
    } else {
      if (current) groups.push(current);
      current = { ...chunk, count: 1 };
    }
  }
  if (current) groups.push(current);

  for (const group of groups) {
    const block = document.createElement('div');
    block.className = 'contig-block';
    block.dataset.status = group.status;
    block.style.flex = group.count;
    block.title = `${group.startMb.toFixed(1)}–${group.endMb.toFixed(1)} Mb (${group.status})`;
    block.addEventListener('click', () => showAlignmentDetail(chr, group));
    track.appendChild(block);
  }
}

// ---- Alignment Detail ----

function showAlignmentDetail(chr, group) {
  document.getElementById('contig-panel').hidden = true;
  document.getElementById('alignment-panel').hidden = false;
  setText('alignment-title', `chr${chr}:${group.startMb.toFixed(1)}M–${group.endMb.toFixed(1)}M`);

  const meta = document.getElementById('alignment-meta');
  const mapped = group.status === 'mapped' ? 100 : (group.status === 'dark' ? 0 : 67);
  const mismatches = group.status === 'mapped' ? Math.floor(Math.random() * 8) : 0;
  const insertions = Math.floor(Math.random() * 3);
  const deletions = Math.floor(Math.random() * 2);

  meta.innerHTML = `
    <dl>
      <dt>Position</dt><dd>chr${chr}:${(group.startMb * 1e6).toLocaleString()}–${(group.endMb * 1e6).toLocaleString()}</dd>
    </dl>
    <dl>
      <dt>Mapped</dt><dd>${mapped}%</dd>
    </dl>
    <dl>
      <dt>Mismatches</dt><dd>${mismatches}</dd>
    </dl>
    <dl>
      <dt>Insertions</dt><dd>${insertions}</dd>
    </dl>
    <dl>
      <dt>Deletions</dt><dd>${deletions}</dd>
    </dl>
    <dl>
      <dt>Status</dt><dd>${group.status}</dd>
    </dl>
  `;

  // Simulated alignment visualization
  const viz = document.getElementById('alignment-viz');
  viz.innerHTML = generateAlignmentViz(group.status);

  const dark = document.getElementById('alignment-dark');
  if (group.status === 'dark') {
    dark.innerHTML = `<p style="color: var(--color-dark); font-weight: 600; margin-top: 0.5rem;">
      Dark region: ${((group.endMb - group.startMb) * 1000).toFixed(0)} kb unmapped.
      Not present in GRCh38 reference. Candidate for novel sequence analysis.
    </p>`;
  } else {
    dark.innerHTML = '';
  }
}

function generateAlignmentViz(status) {
  const bases = 'ACGTACGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG';
  let ref = '';
  let query = '';
  let matchLine = '';

  for (let i = 0; i < 50; i++) {
    const base = bases[i];
    if (status === 'dark' && i > 15 && i < 40) {
      ref += `<span class="gap">-</span>`;
      query += `<span class="mismatch">${base}</span>`;
      matchLine += ' ';
    } else if (Math.random() < 0.04) {
      const alt = 'ACGT'[Math.floor(Math.random() * 4)];
      ref += `<span class="mismatch">${base}</span>`;
      query += `<span class="mismatch">${alt}</span>`;
      matchLine += '*';
    } else {
      ref += `<span class="match">${base}</span>`;
      query += `<span class="match">${base}</span>`;
      matchLine += '|';
    }
  }

  return `<span class="label">Ref  </span>${ref}\n<span class="label">     </span>${matchLine}\n<span class="label">Query</span>${query}`;
}

// ---- Navigation ----

function initNavigation() {
  document.getElementById('btn-back-karyo')?.addEventListener('click', () => {
    document.getElementById('karyogram-panel').hidden = false;
    document.getElementById('contig-panel').hidden = true;
    document.getElementById('alignment-panel').hidden = true;
  });

  document.getElementById('btn-back-contig')?.addEventListener('click', () => {
    document.getElementById('contig-panel').hidden = false;
    document.getElementById('alignment-panel').hidden = true;
  });
}

// ---- Live Feed ----

function startLiveFeed() {
  const feed = document.getElementById('live-feed');
  if (!feed) return;

  // Add a new simulated event every 3-8 seconds
  setInterval(() => {
    if (document.hidden) return;
    const chr = Object.keys(CHR_SIZES)[Math.floor(Math.random() * 24)];
    const pos = Math.floor(Math.random() * CHR_SIZES[chr] * 1e6);
    const dark = Math.random() < 0.08;
    const mismatches = Math.floor(Math.random() * 6);

    const item = document.createElement('div');
    item.className = 'feed-item feed-item--new';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    item.innerHTML = `
      <span class="feed-item__time">${now}</span>
      <span class="feed-item__chr">chr${chr}</span>
      <span class="feed-item__result">${(pos / 1e6).toFixed(1)}M — ${dark ? '<span style="color:var(--color-dark)">dark region (novel)</span>' : `${mismatches} mismatches, mapped`}</span>
    `;

    // Remove placeholder
    const placeholder = feed.querySelector('.feed-item--placeholder');
    if (placeholder) placeholder.remove();

    feed.prepend(item);
    // Keep max 50 items
    while (feed.children.length > 50) feed.lastChild.remove();
  }, 3000 + Math.random() * 5000);
}

// ---- Pipeline Simulation ----

function startPipeline() {
  const steps = ['minimap2', 'samtools', 'bedtools'];
  const result = document.getElementById('pipeline-result');

  async function runChunk() {
    const chr = Object.keys(CHR_SIZES)[Math.floor(Math.random() * 24)];
    const pos = Math.floor(Math.random() * CHR_SIZES[chr] * 1e6);

    // Reset
    steps.forEach(s => setProgress(s, 0));
    if (result) result.textContent = `Analyzing chr${chr}:${(pos / 1e6).toFixed(1)}M...`;

    // minimap2 (~300ms)
    for (let i = 0; i <= 100; i += 5) {
      setProgress('minimap2', i);
      await sleep(15);
    }

    // samtools (~100ms)
    for (let i = 0; i <= 100; i += 10) {
      setProgress('samtools', i);
      await sleep(10);
    }

    // bedtools (~100ms)
    for (let i = 0; i <= 100; i += 10) {
      setProgress('bedtools', i);
      await sleep(10);
    }

    const dark = Math.random() < 0.08;
    const mm = Math.floor(Math.random() * 5);
    if (result) {
      result.textContent = dark
        ? `chr${chr}:${(pos / 1e6).toFixed(1)}M — Dark region found! Novel sequence candidate.`
        : `chr${chr}:${(pos / 1e6).toFixed(1)}M — Mapped. ${mm} mismatches.`;
    }
  }

  // Run first chunk, then loop
  runChunk();
  setInterval(() => { if (!document.hidden) runChunk(); }, 8000);
}

// ---- Helpers ----

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setProgress(step, value) {
  const el = document.querySelector(`[data-step="${step}"] progress`);
  if (el) el.value = value;
}

function formatHours(h) {
  if (h < 1) return `${Math.round(h * 60)}m`;
  if (h < 24) return `${h.toFixed(1)}h`;
  return `${(h / 24).toFixed(1)}d`;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
