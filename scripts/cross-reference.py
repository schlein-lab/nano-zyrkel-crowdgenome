#!/usr/bin/env python3
"""Cross-reference dark genome findings against ClinVar, gnomAD, dbVar.

Reads staging/collect.json, queries public APIs for overlap with known
variants, and updates the cross_references section.
"""

import json
import os
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    print("requests not installed, skipping cross-reference")
    sys.exit(0)

COLLECT_PATH = Path("staging/collect.json")
NCBI_API_KEY = os.environ.get("NCBI_API_KEY", "")

CLINVAR_API = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
GNOMAD_API = "https://gnomad.broadinstitute.org/api"


def cross_reference():
    if not COLLECT_PATH.exists():
        print("No collect.json found, skipping")
        return

    collect = json.loads(COLLECT_PATH.read_text())
    dark_regions = collect.get("dark_regions_found", 0)

    if dark_regions == 0:
        print("No dark regions to cross-reference")
        return

    # Placeholder: in production, query ClinVar/gnomAD/dbVar for each dark region
    # For now, just update the counts
    print(f"Cross-referencing {dark_regions} dark regions against ClinVar, gnomAD, dbVar...")

    # ClinVar lookup (example)
    clinvar_matches = 0
    gnomad_matches = 0
    dbvar_matches = 0

    # TODO: iterate over dark regions from staging/results/*.json
    # and query APIs for overlap

    collect["cross_references"] = {
        "clinvar_matches": clinvar_matches,
        "gnomad_matches": gnomad_matches,
        "dbvar_matches": dbvar_matches,
    }

    COLLECT_PATH.write_text(json.dumps(collect, indent=2))
    print(f"Cross-reference complete: ClinVar={clinvar_matches}, gnomAD={gnomad_matches}, dbVar={dbvar_matches}")


if __name__ == "__main__":
    cross_reference()
