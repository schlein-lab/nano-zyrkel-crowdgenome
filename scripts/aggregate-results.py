#!/usr/bin/env python3
"""Aggregate chunk analysis results from all contributors.

Reads results from the Cloudflare Worker API (or local staging),
computes summary statistics, and writes staging/collect.json.
"""

import json
from datetime import datetime, timezone
from pathlib import Path

COLLECT_PATH = Path("staging/collect.json")
RESULTS_DIR = Path("staging/results")  # individual chunk results


def aggregate():
    results = []

    # Read all result files (submitted by CF Worker or locally)
    if RESULTS_DIR.exists():
        for f in RESULTS_DIR.glob("*.json"):
            try:
                results.append(json.loads(f.read_text()))
            except (json.JSONDecodeError, IOError):
                continue

    # Compute aggregates
    total_chunks = len(results)
    dark_regions = sum(1 for r in results if r.get("dark_regions"))
    total_dark_bases = sum(
        sum(d.get("length", 0) for d in r.get("dark_regions", []))
        for r in results
    )
    mismatches = sum(r.get("mismatches", 0) for r in results)
    insertions = sum(r.get("insertions", 0) for r in results)
    deletions = sum(r.get("deletions", 0) for r in results)
    compute_ms = sum(r.get("compute_ms", 0) for r in results)
    cpu_hours = compute_ms / 3_600_000

    # Per-chromosome stats
    chromosomes = {}
    for r in results:
        chr_name = r.get("chr", "unknown")
        if chr_name not in chromosomes:
            chromosomes[chr_name] = {"chunks": 0, "dark_regions": 0, "coverage_pct": 0}
        chromosomes[chr_name]["chunks"] += 1
        if r.get("dark_regions"):
            chromosomes[chr_name]["dark_regions"] += len(r["dark_regions"])

    # Unique contributors (by session hash if available)
    contributors = len(set(r.get("session_id", f"anon-{i}") for i, r in enumerate(results)))

    collect = {
        "total_chunks": total_chunks,
        "total_chunks_available": total_chunks,  # TODO: from manifest
        "completed_chunks": total_chunks,
        "total_contributors": contributors,
        "cpu_hours": round(cpu_hours, 2),
        "dark_regions_found": dark_regions,
        "dark_bases_total": total_dark_bases,
        "novel_sequences": dark_regions,  # simplified
        "mismatches_total": mismatches,
        "insertions_total": insertions,
        "deletions_total": deletions,
        "genome_coverage_pct": 0,  # TODO: calculate from manifest
        "chromosomes": chromosomes,
        "last_updated": datetime.now(timezone.utc).isoformat(),
        "cross_references": {
            "clinvar_matches": 0,
            "gnomad_matches": 0,
            "dbvar_matches": 0,
        },
    }

    COLLECT_PATH.write_text(json.dumps(collect, indent=2))
    print(f"Aggregated {total_chunks} results, {dark_regions} dark regions, {contributors} contributors")


if __name__ == "__main__":
    aggregate()
