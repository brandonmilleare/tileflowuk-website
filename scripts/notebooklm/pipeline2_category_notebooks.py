#!/usr/bin/env python3
"""
Pipeline 2: Persistent Category Notebooks
Maintains one NotebookLM notebook per content category.
Add new published blog post URLs to keep category notebooks current.
Query category notebooks for targeted, domain-specific research.

Usage:
  python3 pipeline2_category_notebooks.py add "tile-cutters" "https://tileflowuk.com/..."
  python3 pipeline2_category_notebooks.py query "tile-cutters" "What are the best tile cutters for large format?"
  python3 pipeline2_category_notebooks.py list
  python3 pipeline2_category_notebooks.py init  # Create all category notebooks
"""
from __future__ import annotations
import argparse
import json
import subprocess
import sys
from pathlib import Path


NLM = "notebooklm"
DATA_FILE = Path(__file__).parent / "category_notebooks.json"

CATEGORIES = {
    "tile-cutters": "TileFlow UK: Tile Cutters",
    "laser-levels": "TileFlow UK: Laser Levels",
    "wet-saws": "TileFlow UK: Wet Saws & Power Tools",
    "grout-adhesive": "TileFlow UK: Grout & Adhesive",
    "large-format": "TileFlow UK: Large Format Tiles",
    "tools-general": "TileFlow UK: General Tiling Tools",
    "how-to": "TileFlow UK: How-To Guides",
    "best-of": "TileFlow UK: Best-Of Lists",
}


def run(args: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run([NLM] + args, capture_output=True, text=True, check=False)


def load_data() -> dict:
    if DATA_FILE.exists():
        return json.loads(DATA_FILE.read_text())
    return {}


def save_data(data: dict) -> None:
    DATA_FILE.write_text(json.dumps(data, indent=2))


def create_notebook(name: str) -> str | None:
    r = run(["create", name, "--json"])
    if r.returncode != 0:
        return None
    try:
        data = json.loads(r.stdout)
        nb = data.get("notebook") or data
        nb_id = nb.get("id") or nb.get("notebook_id")
        if nb_id:
            return nb_id
    except Exception:
        pass
    # Fall back: find by listing
    notebooks = list_notebooks()
    for nb in notebooks:
        if nb.get("title") == name:
            return nb.get("id")
    return None


def list_notebooks() -> list:
    r = run(["list", "--json"])
    if r.returncode != 0:
        return []
    try:
        data = json.loads(r.stdout)
        return data if isinstance(data, list) else data.get("notebooks", [])
    except Exception:
        return []


def add_source(notebook_id: str, url: str) -> bool:
    r = run(["source", "add", url, "--notebook", notebook_id])
    return r.returncode == 0


def query_notebook(notebook_id: str, question: str) -> str:
    r = run(["ask", question, "--notebook", notebook_id])
    if r.returncode != 0:
        return ""
    return r.stdout.strip()


def get_or_create_category_notebook(slug: str, data: dict) -> str | None:
    if slug in data:
        return data[slug]
    name = CATEGORIES.get(slug, f"TileFlow UK: {slug.replace('-', ' ').title()}")
    nb_id = create_notebook(name)
    if nb_id:
        data[slug] = nb_id
        save_data(data)
    return nb_id


def infer_category(url: str) -> str:
    url_lower = url.lower()
    if "tile-cutter" in url_lower or "cutter" in url_lower:
        return "tile-cutters"
    if "laser" in url_lower or "level" in url_lower:
        return "laser-levels"
    if "wet-saw" in url_lower or "wet-tile" in url_lower:
        return "wet-saws"
    if "grout" in url_lower or "adhesive" in url_lower:
        return "grout-adhesive"
    if "large-format" in url_lower or "large-tile" in url_lower:
        return "large-format"
    if "how-to" in url_lower or "guide" in url_lower:
        return "how-to"
    if "best-of" in url_lower or "best-" in url_lower:
        return "best-of"
    return "tools-general"


def cmd_add(args) -> None:
    data = load_data()
    category = args.category or infer_category(args.url)
    nb_id = get_or_create_category_notebook(category, data)
    if not nb_id:
        print(json.dumps({"error": f"Could not get/create notebook for {category}"}))
        sys.exit(1)
    success = add_source(nb_id, args.url)
    result = {
        "category": category,
        "notebook_id": nb_id,
        "url_added": args.url,
        "success": success,
    }
    print(json.dumps(result, indent=2))


def cmd_query(args) -> None:
    data = load_data()
    category = args.category
    if category not in data:
        print(json.dumps({"error": f"No notebook found for category '{category}'. Run 'init' first or add a URL."}))
        sys.exit(1)
    nb_id = data[category]
    answer = query_notebook(nb_id, args.question)
    result = {
        "category": category,
        "notebook_id": nb_id,
        "question": args.question,
        "answer": answer,
        "source_quality": "Tier 1 (TileFlow category knowledge base)",
    }
    print(json.dumps(result, indent=2))


def cmd_list(args) -> None:
    data = load_data()
    result = {
        "categories": [
            {"slug": slug, "notebook_id": nb_id, "name": CATEGORIES.get(slug, slug)}
            for slug, nb_id in data.items()
        ]
    }
    print(json.dumps(result, indent=2))


def cmd_init(args) -> None:
    data = load_data()
    created = []
    for slug in CATEGORIES:
        if slug not in data:
            print(f"Creating notebook for: {slug}...")
            nb_id = get_or_create_category_notebook(slug, data)
            if nb_id:
                created.append({"slug": slug, "notebook_id": nb_id})
        else:
            created.append({"slug": slug, "notebook_id": data[slug], "existing": True})
    print(json.dumps({"notebooks": created}, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser(description="Persistent category notebooks for TileFlow UK")
    sub = parser.add_subparsers(dest="command")

    add_p = sub.add_parser("add", help="Add a URL to a category notebook")
    add_p.add_argument("url", help="URL to add as source")
    add_p.add_argument("--category", "-c", help="Category slug (auto-detected from URL if omitted)")

    q_p = sub.add_parser("query", help="Query a category notebook")
    q_p.add_argument("category", help="Category slug")
    q_p.add_argument("question", help="Research question")

    sub.add_parser("list", help="List all category notebooks")
    sub.add_parser("init", help="Create all category notebooks")

    args = parser.parse_args()

    if args.command == "add":
        cmd_add(args)
    elif args.command == "query":
        cmd_query(args)
    elif args.command == "list":
        cmd_list(args)
    elif args.command == "init":
        cmd_init(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
