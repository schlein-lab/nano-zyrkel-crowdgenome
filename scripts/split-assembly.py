#!/usr/bin/env python3
"""Split a pangenome assembly FASTA into chunks for browser-based analysis.

Downloads assembly from HPRC public data, splits into CHUNK_SIZE_BP-sized
FASTA files, and generates corresponding GRCh38 reference windows.

Environment variables:
  ASSEMBLY_SOURCE  - Assembly ID (default: HPRC-HG002)
  CHUNK_SIZE_BP    - Chunk size in base pairs (default: 5000)
"""

import json
import os
import sys
from pathlib import Path

CHUNK_SIZE = int(os.environ.get("CHUNK_SIZE_BP", 5000))
ASSEMBLY = os.environ.get("ASSEMBLY_SOURCE", "HPRC-HG002")

DATA_DIR = Path("data/assembly")
REF_DIR = Path("data/reference")
MANIFEST = Path("staging/chunks/manifest.json")

# HPRC assembly URLs (public, no auth needed)
HPRC_URLS = {
    "HPRC-HG002": "https://s3-us-west-2.amazonaws.com/human-pangenomics/T2T/HG002/assemblies/hg002v1.1.mat.fasta.gz",
}


def split_fasta(fasta_path: Path, chunk_size: int) -> list:
    """Split a FASTA file into chunks of chunk_size bp."""
    chunks = []
    current_seq = ""
    current_header = ""
    chunk_id = 0

    with open(fasta_path) as f:
        for line in f:
            line = line.strip()
            if line.startswith(">"):
                if current_seq:
                    chunks.extend(emit_chunks(current_header, current_seq, chunk_size, chunk_id))
                    chunk_id += len(current_seq) // chunk_size + 1
                current_header = line[1:].split()[0]
                current_seq = ""
            else:
                current_seq += line

    if current_seq:
        chunks.extend(emit_chunks(current_header, current_seq, chunk_size, chunk_id))

    return chunks


def emit_chunks(contig: str, seq: str, chunk_size: int, start_id: int) -> list:
    """Emit chunk files for a single contig."""
    chunks = []
    for i in range(0, len(seq), chunk_size):
        chunk_seq = seq[i : i + chunk_size]
        if len(chunk_seq) < 100:  # skip tiny trailing chunks
            continue

        chunk_id = start_id + i // chunk_size
        chunk_file = DATA_DIR / f"chunk_{chunk_id:06d}.fa"

        with open(chunk_file, "w") as f:
            f.write(f">{contig}:{i}-{i + len(chunk_seq)}\n")
            for j in range(0, len(chunk_seq), 80):
                f.write(chunk_seq[j : j + 80] + "\n")

        chunks.append({
            "id": chunk_id,
            "contig": contig,
            "start": i,
            "end": i + len(chunk_seq),
            "length": len(chunk_seq),
            "file": str(chunk_file),
            "status": "available",
        })

    return chunks


def update_manifest(chunks: list):
    """Update the chunk manifest."""
    manifest = {
        "version": 1,
        "assembly": ASSEMBLY,
        "reference": "GRCh38",
        "chunk_size_bp": CHUNK_SIZE,
        "total_chunks": len(chunks),
        "chunks": chunks,
    }
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    with open(MANIFEST, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"Manifest updated: {len(chunks)} chunks")


def main():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    REF_DIR.mkdir(parents=True, exist_ok=True)

    url = HPRC_URLS.get(ASSEMBLY)
    if not url:
        print(f"Unknown assembly: {ASSEMBLY}. Available: {list(HPRC_URLS.keys())}")
        sys.exit(1)

    print(f"Assembly: {ASSEMBLY}")
    print(f"Chunk size: {CHUNK_SIZE} bp")
    print(f"Source: {url}")
    print()
    print("NOTE: Full download + split requires ~10GB disk space.")
    print("For initial setup, use a pre-split dataset or run locally first.")
    print()

    # Placeholder: in production, download + decompress + split
    # For now, create a minimal demo manifest
    demo_chunks = []
    for chr_num in range(1, 23):
        for i in range(10):  # 10 demo chunks per chromosome
            demo_chunks.append({
                "id": chr_num * 1000 + i,
                "contig": f"chr{chr_num}",
                "start": i * CHUNK_SIZE,
                "end": (i + 1) * CHUNK_SIZE,
                "length": CHUNK_SIZE,
                "file": f"data/assembly/chunk_{chr_num * 1000 + i:06d}.fa",
                "status": "available",
            })

    update_manifest(demo_chunks)
    print(f"Demo manifest created with {len(demo_chunks)} placeholder chunks.")


if __name__ == "__main__":
    main()
