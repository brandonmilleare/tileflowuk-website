#!/usr/bin/env python3
"""Diagnostic script — shows exact exit code and stderr for Pipeline 1."""
import subprocess, sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent

r = subprocess.run(
    [sys.executable, str(SCRIPTS_DIR / "pipeline1_pre_research.py"),
     "best tile cutter UK 2026", "--json"],
    text=True,
    capture_output=True,
    check=False,
)

print(f"=== EXIT CODE: {r.returncode} ===")
print(f"=== STDOUT ({len(r.stdout)} chars) ===")
print(r.stdout[:1000])
print(f"=== STDERR ({len(r.stderr)} chars) ===")
print(r.stderr[:2000])
