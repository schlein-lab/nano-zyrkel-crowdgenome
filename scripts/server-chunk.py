#!/usr/bin/env python3
"""Split a FASTA assembly into chunks for browser-based analysis.

Run on the server: python3 server-chunk.py /path/to/assembly.fa /path/to/output/

Outputs:
  - chunks/chunk_NNNNNN.fa  — individual FASTA chunks
  - manifest.json           — chunk index with contig, position, status
  - index.html              — simple CORS-enabled directory listing
"""

import json
import os
import sys
from pathlib import Path

CHUNK_SIZE = int(os.environ.get("CHUNK_SIZE_BP", 5000))


def main():
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <assembly.fa> <output_dir>")
        sys.exit(1)

    assembly_path = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    chunks_dir = output_dir / "chunks"
    chunks_dir.mkdir(parents=True, exist_ok=True)

    print(f"Assembly: {assembly_path}")
    print(f"Output: {output_dir}")
    print(f"Chunk size: {CHUNK_SIZE} bp")
    print()

    manifest_chunks = []
    chunk_id = 0
    current_contig = ""
    current_seq = ""

    def emit_chunks(contig, seq):
        nonlocal chunk_id
        for i in range(0, len(seq), CHUNK_SIZE):
            chunk_seq = seq[i : i + CHUNK_SIZE]
            if len(chunk_seq) < 100:
                continue

            fname = f"chunk_{chunk_id:06d}.fa"
            fpath = chunks_dir / fname

            with open(fpath, "w") as f:
                f.write(f">{contig}:{i}-{i + len(chunk_seq)}\n")
                for j in range(0, len(chunk_seq), 80):
                    f.write(chunk_seq[j : j + 80] + "\n")

            manifest_chunks.append(
                {
                    "id": chunk_id,
                    "contig": contig,
                    "start": i,
                    "end": i + len(chunk_seq),
                    "length": len(chunk_seq),
                    "file": f"chunks/{fname}",
                    "status": "available",
                }
            )
            chunk_id += 1
            if chunk_id % 10000 == 0:
                print(f"  ...{chunk_id} chunks created", flush=True)

    print("Parsing FASTA...")
    with open(assembly_path) as f:
        for line in f:
            line = line.strip()
            if line.startswith(">"):
                if current_seq:
                    emit_chunks(current_contig, current_seq)
                    print(
                        f"  Contig {current_contig}: {len(current_seq):,} bp → {chunk_id - sum(1 for c in manifest_chunks if c['contig'] != current_contig)} chunks",
                        flush=True,
                    )
                current_contig = line[1:].split()[0]
                current_seq = ""
            else:
                current_seq += line

    if current_seq:
        emit_chunks(current_contig, current_seq)
        print(f"  Contig {current_contig}: {len(current_seq):,} bp", flush=True)

    # Write manifest
    manifest = {
        "version": 1,
        "assembly": "HPRC-HG002-maternal",
        "reference": "GRCh38",
        "chunk_size_bp": CHUNK_SIZE,
        "total_chunks": len(manifest_chunks),
        "contigs": list(set(c["contig"] for c in manifest_chunks)),
        "total_bases": sum(c["length"] for c in manifest_chunks),
        "chunks": manifest_chunks,
    }

    manifest_path = output_dir / "manifest.json"
    with open(manifest_path, "w") as f:
        json.dump(manifest, f)

    # Write a simple nginx CORS config hint
    cors_conf = output_dir / ".htaccess"
    with open(cors_conf, "w") as f:
        f.write("# Enable CORS for chunk files\n")
        f.write("Header set Access-Control-Allow-Origin *\n")
        f.write("Header set Access-Control-Allow-Methods GET\n")
        f.write("Header set Cache-Control max-age=86400\n")

    print()
    print(f"=== Complete ===")
    print(f"Total chunks: {len(manifest_chunks):,}")
    print(f"Total bases: {sum(c['length'] for c in manifest_chunks):,}")
    print(f"Contigs: {len(set(c['contig'] for c in manifest_chunks))}")
    print(f"Manifest: {manifest_path}")
    print(f"Chunks dir: {chunks_dir}")


if __name__ == "__main__":
    main()
