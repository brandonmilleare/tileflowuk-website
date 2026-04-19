#!/usr/bin/env python3
"""
Pipeline 3: Competitor Gap Analysis
Creates a NotebookLM notebook from competitor URLs, then queries for
content gaps — topics they cover that TileFlow UK hasn't.

Usage:
  python3 pipeline3_competitor_analysis.py "best tile cutters UK" --urls "url1,url2,url3"
  python3 pipeline3_competitor_analysis.py "best tile cutters UK" --json
  python3 pipeline3_competitor_analysis.py "best tile cutters UK" --keep
"""
from __future__ import annotations
import argparse
import json
import subprocess
import sys


NLM = "notebooklm"


def run(args: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run([NLM] + args, capture_output=True, text=True, check=False)


def create_notebook(name: str) -> str | None:
    r = run(["create", name, "--json"])
    if r.returncode != 0:
        return None
    try:
        data = json.loads(r.stdout)
        nb = data.get("notebook") or data
        return nb.get("id") or nb.get("notebook_id")
    except Exception:
        return None


def add_source(notebook_id: str, url: str) -> bool:
    r = run(["source", "add", url, "--notebook", notebook_id])
    return r.returncode == 0


def add_research(notebook_id: str, query: str) -> bool:
    r = run([
        "source", "add-research", query,
        "--notebook", notebook_id,
        "--from", "web",
        "--mode", "fast",
        "--import-all",
    ])
    return r.returncode == 0


def ask_question(notebook_id: str, question: str) -> str:
    r = run(["ask", question, "--notebook", notebook_id])
    if r.returncode != 0:
        return ""
    return r.stdout.strip()


def delete_notebook(notebook_id: str) -> None:
    run(["delete", "--notebook", notebook_id, "--yes"])


def main() -> None:
    parser = argparse.ArgumentParser(description="Competitor gap analysis for TileFlow UK")
    parser.add_argument("keyword", help="Target keyword (e.g. 'best tile cutters UK 2026')")
    parser.add_argument("--urls", help="Comma-separated competitor URLs to analyse")
    parser.add_argument("--keep", action="store_true", help="Keep notebook after analysis")
    parser.add_argument("--json", dest="use_json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    keyword = args.keyword
    notebook_name = f"TileFlow Competitor Analysis: {keyword}"

    if not args.use_json:
        print(f"[pipeline3] Competitor gap analysis for: {keyword}")

    nb_id = create_notebook(notebook_name)
    if not nb_id:
        result = {"error": "Failed to create notebook", "keyword": keyword}
        print(json.dumps(result) if args.use_json else f"ERROR: {result['error']}")
        sys.exit(1)

    # Add competitor URLs if provided
    urls_added = []
    if args.urls:
        for url in [u.strip() for u in args.urls.split(",") if u.strip()]:
            if not args.use_json:
                print(f"[pipeline3] Adding competitor URL: {url}")
            if add_source(nb_id, url):
                urls_added.append(url)

    # Use research to find top-ranking content for this keyword
    if not args.use_json:
        print(f"[pipeline3] Researching top-ranking content for '{keyword}'...")
    add_research(nb_id, f"{keyword} UK guide review comparison")
    add_research(nb_id, f"{keyword} buy recommendation professional")

    if not args.use_json:
        print("[pipeline3] Analysing gaps...")

    # Ask gap analysis questions
    gap_questions = [
        f"What topics and subtopics are covered by the content in this notebook about '{keyword}'? List them all.",
        f"What unique angles, insights, or data points appear that would differentiate a new article about '{keyword}'?",
        f"What questions about '{keyword}' are NOT answered in this content? What information is missing?",
        f"What is the approximate word count, number of sections, and content structure of the top articles about '{keyword}'?",
    ]

    gaps = []
    for q in gap_questions:
        ans = ask_question(nb_id, q)
        if ans:
            gaps.append({"question": q, "finding": ans})

    result = {
        "keyword": keyword,
        "notebook_id": nb_id,
        "competitor_urls": urls_added,
        "gap_analysis": gaps,
        "source_quality": "Tier 2 (competitor content analysis)",
        "recommendation": "Use findings to identify uncovered subtopics and unique angles for TileFlow content.",
    }

    if not args.keep:
        if not args.use_json:
            print("[pipeline3] Cleaning up notebook...")
        delete_notebook(nb_id)
        result["notebook_id"] = None

    if args.use_json:
        print(json.dumps(result, indent=2))
    else:
        print(f"\n=== Gap Analysis: {keyword} ===")
        for item in result["gap_analysis"]:
            print(f"\nQ: {item['question']}")
            print(f"Finding: {item['finding'][:400]}...")


if __name__ == "__main__":
    main()
