#!/usr/bin/env python3
"""
Test all 4 NotebookLM pipelines.
Run this after 'notebooklm login' to verify everything works.

Usage:
  python3 test_pipelines.py
  python3 test_pipelines.py --pipeline 1  # Test only pipeline 1
"""
from __future__ import annotations
import argparse
import json
import subprocess
import sys
from pathlib import Path


SCRIPTS_DIR = Path(__file__).parent


def run_script(script: str, args: list[str]) -> tuple[bool, str, str]:
    """Returns (success, stdout, stderr) — JSON parsing uses stdout only."""
    r = subprocess.run(
        [sys.executable, str(SCRIPTS_DIR / script)] + args,
        capture_output=True, text=True, check=False,
    )
    return r.returncode == 0, r.stdout.strip(), r.stderr.strip()


def check_auth() -> bool:
    r = subprocess.run(
        ["notebooklm", "auth", "check"],
        capture_output=True, text=True, check=False,
    )
    return "SID cookie" not in r.stdout or "✓" in r.stdout or r.returncode == 0


def test_pipeline_1() -> dict:
    print("\n[TEST 1] Pre-Research Notebook...")
    ok, stdout, stderr = run_script(
        "pipeline1_pre_research.py",
        ["best tile cutter UK 2026 professional", "--json"],
    )
    if stderr:
        print(f"  NOTE: {stderr[:120]}")
    try:
        data = json.loads(stdout)
        answers = len(data.get("research", []))
        if answers > 0:
            print(f"  ✓ Pipeline 1 passed. Got {answers} research answers.")
            return {"pipeline": 1, "passed": True, "answers": answers}
        print(f"  ✗ Pipeline 1: no research answers returned")
        return {"pipeline": 1, "passed": False, "error": "no research answers"}
    except json.JSONDecodeError:
        print(f"  ✗ Pipeline 1 failed (bad JSON):\n    {stdout[:200]}")
        return {"pipeline": 1, "passed": False, "error": stdout[:200]}


def test_pipeline_2() -> dict:
    print("\n[TEST 2] Category Notebooks...")
    ok, stdout, stderr = run_script(
        "pipeline2_category_notebooks.py",
        ["add", "https://tileflowuk.com/best-of/best-tile-cutters", "--category", "tile-cutters"],
    )
    try:
        data = json.loads(stdout)
        if data.get("success") or data.get("notebook_id"):
            print(f"  ✓ Pipeline 2 passed. Notebook: {data.get('notebook_id', '')[:8]}...")
            return {"pipeline": 2, "passed": True}
    except json.JSONDecodeError:
        pass
    print(f"  ✗ Pipeline 2 failed:\n    {stdout[:300]}")
    return {"pipeline": 2, "passed": False, "error": stdout[:200]}


def test_pipeline_3() -> dict:
    print("\n[TEST 3] Competitor Gap Analysis...")
    ok, stdout, stderr = run_script(
        "pipeline3_competitor_analysis.py",
        ["best tile cutters UK 2026", "--json"],
    )
    try:
        data = json.loads(stdout)
        gaps = data.get("gap_analysis", [])
        if gaps:
            print(f"  ✓ Pipeline 3 passed. Got {len(gaps)} gap findings.")
            return {"pipeline": 3, "passed": True, "findings": len(gaps)}
    except json.JSONDecodeError:
        pass
    print(f"  ✗ Pipeline 3 failed:\n    {stdout[:300]}")
    return {"pipeline": 3, "passed": False, "error": stdout[:200]}


def test_pipeline_4() -> dict:
    print("\n[TEST 4] Product Intelligence...")
    ok, stdout, stderr = run_script(
        "pipeline4_product_intel.py",
        ["query", "Sigma 4BU 70cm", "What are the key specs and price range?"],
    )
    try:
        data = json.loads(stdout)
        if data.get("answer"):
            print(f"  ✓ Pipeline 4 passed. Answer length: {len(data.get('answer', ''))}")
            return {"pipeline": 4, "passed": True}
    except json.JSONDecodeError:
        pass
    print(f"  ✗ Pipeline 4 failed:\n    {stdout[:300]}")
    return {"pipeline": 4, "passed": False, "error": stdout[:200]}


def main() -> None:
    parser = argparse.ArgumentParser(description="Test all NotebookLM pipelines")
    parser.add_argument("--pipeline", type=int, choices=[1, 2, 3, 4],
                        help="Test only a specific pipeline")
    args = parser.parse_args()

    print("=" * 60)
    print("TileFlow UK — NotebookLM Pipeline Tests")
    print("=" * 60)

    # Check auth
    print("\nChecking authentication...")
    r = subprocess.run(["notebooklm", "auth", "check"], capture_output=True, text=True, check=False)
    if "not found" in r.stderr.lower() or "storage_state" in r.stdout.lower() and "fail" in r.stdout.lower():
        print("✗ NOT AUTHENTICATED")
        print("\nRun this command first:")
        print("  notebooklm login")
        print("\nA browser will open. Log into your Google account.")
        sys.exit(1)
    print("✓ Authenticated")

    # Run tests
    tests = {1: test_pipeline_1, 2: test_pipeline_2, 3: test_pipeline_3, 4: test_pipeline_4}

    if args.pipeline:
        results = [tests[args.pipeline]()]
    else:
        results = [fn() for fn in tests.values()]

    # Summary
    passed = sum(1 for r in results if r.get("passed"))
    total = len(results)

    print(f"\n{'=' * 60}")
    print(f"Results: {passed}/{total} pipelines passed")
    print("=" * 60)

    for r in results:
        status = "✓" if r.get("passed") else "✗"
        print(f"  Pipeline {r['pipeline']}: {status}")
        if not r.get("passed") and r.get("error"):
            print(f"    Error: {r['error'][:100]}")

    sys.exit(0 if passed == total else 1)


if __name__ == "__main__":
    main()
