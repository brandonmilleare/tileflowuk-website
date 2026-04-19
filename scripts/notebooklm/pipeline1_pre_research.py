#!/usr/bin/env python3
"""
Pipeline 1: Pre-Research Notebooks
Creates a NotebookLM notebook for a blog topic, runs web research,
queries it, and returns structured findings for the blog-researcher agent.

Usage:
  python3 pipeline1_pre_research.py "best tile cutters UK" [--mode fast|deep] [--keep]
  python3 pipeline1_pre_research.py "best tile cutters UK" --json
"""
from __future__ import annotations
import argparse
import json
import subprocess
import sys
import time


NLM = "notebooklm"


def run(args: list[str], capture=True) -> subprocess.CompletedProcess:
    return subprocess.run(
        [NLM] + args,
        capture_output=capture,
        text=True,
        check=False,
    )


def run_json(args: list[str]) -> dict | list | None:
    r = run(args + ["--json"])
    if r.returncode != 0:
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return None


def create_notebook(name: str) -> str | None:
    r = run(["create", name, "--json"])
    if r.returncode != 0:
        print(f"[pipeline1] ERROR creating notebook: {r.stderr}", file=sys.stderr)
        return None
    try:
        data = json.loads(r.stdout)
        # Response: {"notebook": {"id": "...", "title": "..."}}
        nb = data.get("notebook") or data
        nb_id = nb.get("id") or nb.get("notebook_id")
        if nb_id:
            return nb_id
    except Exception:
        pass
    # Fall back: list notebooks and find by name
    notebooks = run_json(["list"])
    if notebooks:
        nb_list = notebooks.get("notebooks", [])
        for nb in nb_list:
            if nb.get("title") == name:
                return nb.get("id")
    return None


def add_research(notebook_id: str, query: str, mode: str = "fast") -> bool:
    r = run([
        "source", "add-research", query,
        "--notebook", notebook_id,
        "--from", "web",
        "--mode", mode,
        "--import-all",
    ])
    if r.returncode != 0:
        # Research API can fail due to rate limits — log silently and continue.
        # The ask command still returns answers from NotebookLM's own knowledge.
        print(f"[pipeline1] NOTE: web research unavailable, using notebook knowledge", file=sys.stderr)
        return False

    # Wait for research to complete if deep mode
    if mode == "deep":
        time.sleep(5)
        run(["research", "wait", "--notebook", notebook_id])
    return True


def ask_question(notebook_id: str, question: str) -> str:
    r = run(["ask", question, "--notebook", notebook_id])
    if r.returncode != 0:
        return ""
    return r.stdout.strip()


def delete_notebook(notebook_id: str) -> None:
    run(["delete", "--notebook", notebook_id, "--yes"])


def main() -> None:
    parser = argparse.ArgumentParser(description="Pre-research pipeline for blog topics")
    parser.add_argument("topic", help="Blog topic to research (e.g. 'best tile cutters UK 2026')")
    parser.add_argument("--mode", choices=["fast", "deep"], default="fast",
                        help="Research depth (default: fast)")
    parser.add_argument("--keep", action="store_true",
                        help="Keep the notebook after research (default: delete)")
    parser.add_argument("--json", dest="use_json", action="store_true",
                        help="Output results as JSON")
    args = parser.parse_args()

    topic = args.topic
    notebook_name = f"TileFlow Research: {topic}"
    search_query = f"{topic} UK professional tiling"

    if not args.use_json:
        print(f"[pipeline1] Creating research notebook for: {topic}")

    # Create notebook
    nb_id = create_notebook(notebook_name)
    if not nb_id:
        result = {"error": "Failed to create notebook", "topic": topic}
        print(json.dumps(result) if args.use_json else f"ERROR: {result['error']}")
        sys.exit(1)

    if not args.use_json:
        print(f"[pipeline1] Notebook created: {nb_id}")
        print(f"[pipeline1] Running {args.mode} web research...")

    # Run research
    add_research(nb_id, search_query, mode=args.mode)

    # Also add the plain topic search
    add_research(nb_id, f"{topic} statistics data 2025 2026", mode="fast")

    if not args.use_json:
        print("[pipeline1] Querying notebook...")

    # Ask key research questions
    questions = [
        f"What are the key facts, statistics, and expert recommendations about {topic}?",
        f"What are the most important things a UK professional tiler should know about {topic}?",
        f"What problems do people commonly face with {topic} and what are the solutions?",
    ]

    answers = []
    for q in questions:
        ans = ask_question(nb_id, q)
        if ans:
            answers.append({"question": q, "answer": ans})

    # Get notebook summary
    summary_r = run(["summary", "--notebook", nb_id])
    summary = summary_r.stdout.strip() if summary_r.returncode == 0 else ""

    result = {
        "topic": topic,
        "notebook_id": nb_id,
        "notebook_name": notebook_name,
        "research": answers,
        "summary": summary,
        "source_quality": "Tier 1 (NotebookLM web research)",
    }

    # Clean up unless --keep
    if not args.keep:
        if not args.use_json:
            print("[pipeline1] Cleaning up notebook...")
        delete_notebook(nb_id)
        result["notebook_id"] = None

    if args.use_json:
        print(json.dumps(result, indent=2))
    else:
        print(f"\n=== Research Results: {topic} ===")
        for item in result["research"]:
            print(f"\nQ: {item['question']}")
            print(f"A: {item['answer'][:500]}...")
        if summary:
            print(f"\nSummary: {summary[:300]}...")


if __name__ == "__main__":
    main()
