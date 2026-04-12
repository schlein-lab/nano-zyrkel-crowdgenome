# nano-zyrkel-crowdgenome

**Distributed Dark Genome mapping — crowd-sourced pangenome analysis via browser WASM.**

## What is this?

Every visitor to [zyrkel.com](https://zyrkel.com) donates a few seconds of CPU time to analyze a micro-chunk of the human pangenome. Together, we're mapping the **Dark Genome** — the parts of human DNA that are missing from the GRCh38 reference.

## How it works

```
Your browser                    GitHub Actions               Research
─────────────                   ──────────────               ────────
1. Load WASM tools              4. Aggregate results         7. Cross-ref ClinVar/gnomAD
2. Fetch a 5kb chunk            5. LLM classifies findings   8. Flag clinical relevance
3. Run: minimap2 → samtools     6. Email milestone alerts    9. Dark Genome atlas grows
   → bedtools
   Submit result
```

### Pipeline (runs in your browser)

| Step | Tool | What it does |
|------|------|-------------|
| 1 | **minimap2** | Aligns pangenome chunk against GRCh38 |
| 2 | **samtools** | Processes alignment, extracts unmapped reads |
| 3 | **bedtools** | Finds regions with zero coverage = Dark Regions |

These are real bioinformatics tools compiled to WebAssembly via [biowasm](https://biowasm.com). The same tools that run on every HPC in the world now run in your browser.

### Visualizations (live dashboard)

- **Karyogram** — All chromosomes at a glance, colored by analysis completion
- **Contig track** — Zoom into any chromosome, see mapping status per region
- **Alignment detail** — Click a contig to see where reads mapped and where Dark Regions are
- **Live feed** — Real-time stream of new mappings from contributors worldwide

## Stats

| Metric | Value |
|--------|-------|
| Chunks analyzed | see [collect.json](staging/collect.json) |
| Dark regions found | see [collect.json](staging/collect.json) |
| Contributors | see [collect.json](staging/collect.json) |
| Daily summary | see [llm-summary.json](staging/llm-summary.json) |

## Powered by

- [nano-zyrkel SDK](https://github.com/schlein-lab/nano-zyrkel) — autonomous micro-agent framework
- [biowasm](https://biowasm.com) — bioinformatics tools compiled to WebAssembly
- [HPRC](https://humanpangenome.org) — Human Pangenome Reference Consortium (public data)
- [Zyrkel](https://zyrkel.com) — the autonomous agent that orchestrates everything

## License

MIT
