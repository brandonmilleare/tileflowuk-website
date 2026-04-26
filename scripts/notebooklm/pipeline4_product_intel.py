#!/usr/bin/env python3
"""
Pipeline 4: Affiliate Product Intelligence
Maintains persistent product notebooks with Amazon/affiliate pages, spec sheets,
and review aggregators. Returns accurate, up-to-date product data for blog writing.

Usage:
  python3 pipeline4_product_intel.py add "Sigma 4BU 70cm" "https://amazon.co.uk/..."
  python3 pipeline4_product_intel.py query "Sigma 4BU 70cm" "What are the specs and price?"
  python3 pipeline4_product_intel.py compare "Sigma 4BU" "RUBI RDXA35" "What are the key differences?"
  python3 pipeline4_product_intel.py list
"""
from __future__ import annotations
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path


NLM = "notebooklm"
DATA_FILE = Path(__file__).parent / "product_notebooks.json"


def run(args: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run([NLM] + args, capture_output=True, text=True, check=False)


def load_data() -> dict:
    if DATA_FILE.exists():
        return json.loads(DATA_FILE.read_text())
    return {}


def save_data(data: dict) -> None:
    DATA_FILE.write_text(json.dumps(data, indent=2))


def slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


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


def get_or_create_product_notebook(product_name: str, data: dict) -> str | None:
    key = slug(product_name)
    if key in data:
        return data[key]["notebook_id"]

    nb_name = f"TileFlow Product: {product_name}"
    nb_id = create_notebook(nb_name)
    if nb_id:
        # Seed with web research automatically
        add_research(nb_id, f"{product_name} review specs price UK buy")
        add_research(nb_id, f"{product_name} professional review comparison alternatives")
        data[key] = {"product_name": product_name, "notebook_id": nb_id, "sources": []}
        save_data(data)
    return nb_id


def cmd_add(args) -> None:
    data = load_data()
    product_name = args.product
    nb_id = get_or_create_product_notebook(product_name, data)
    if not nb_id:
        print(json.dumps({"error": f"Could not create notebook for {product_name}"}))
        sys.exit(1)

    key = slug(product_name)
    success = add_source(nb_id, args.url)
    if success and key in data:
        data[key]["sources"] = data[key].get("sources", []) + [args.url]
        save_data(data)

    result = {
        "product": product_name,
        "notebook_id": nb_id,
        "url_added": args.url,
        "success": success,
    }
    print(json.dumps(result, indent=2))


def cmd_query(args) -> None:
    data = load_data()
    product_name = args.product
    nb_id = get_or_create_product_notebook(product_name, data)
    if not nb_id:
        print(json.dumps({"error": f"Could not get notebook for {product_name}"}))
        sys.exit(1)

    answer = ask_question(nb_id, args.question)
    result = {
        "product": product_name,
        "notebook_id": nb_id,
        "question": args.question,
        "answer": answer,
        "source_quality": "Tier 1 (product intelligence notebook)",
    }
    print(json.dumps(result, indent=2))


def cmd_compare(args) -> None:
    data = load_data()
    product_a = args.product_a
    product_b = args.product_b

    nb_id_a = get_or_create_product_notebook(product_a, data)
    nb_id_b = get_or_create_product_notebook(product_b, data)

    # Query each notebook for comparison data
    comparison_q = f"What are the key specs, pros, cons, and price of this product?"
    answer_a = ask_question(nb_id_a, comparison_q) if nb_id_a else "No data"
    answer_b = ask_question(nb_id_b, comparison_q) if nb_id_b else "No data"

    result = {
        "comparison": {
            product_a: {"notebook_id": nb_id_a, "data": answer_a},
            product_b: {"notebook_id": nb_id_b, "data": answer_b},
        },
        "question": args.question,
        "source_quality": "Tier 1 (product intelligence notebooks)",
    }
    print(json.dumps(result, indent=2))


def cmd_list(args) -> None:
    data = load_data()
    result = {
        "products": [
            {
                "slug": k,
                "product_name": v.get("product_name", k),
                "notebook_id": v.get("notebook_id"),
                "source_count": len(v.get("sources", [])),
            }
            for k, v in data.items()
        ]
    }
    print(json.dumps(result, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser(description="Product intelligence notebooks for TileFlow UK")
    sub = parser.add_subparsers(dest="command")

    add_p = sub.add_parser("add", help="Add a URL to a product notebook")
    add_p.add_argument("product", help="Product name (e.g. 'Sigma 4BU 70cm')")
    add_p.add_argument("url", help="URL to add (Amazon, spec sheet, review)")

    q_p = sub.add_parser("query", help="Query a product notebook")
    q_p.add_argument("product", help="Product name")
    q_p.add_argument("question", help="Question about the product")

    cmp_p = sub.add_parser("compare", help="Compare two products")
    cmp_p.add_argument("product_a", help="First product name")
    cmp_p.add_argument("product_b", help="Second product name")
    cmp_p.add_argument("question", nargs="?", default="What are the key differences?",
                       help="Comparison question")

    sub.add_parser("list", help="List all product notebooks")

    args = parser.parse_args()

    if args.command == "add":
        cmd_add(args)
    elif args.command == "query":
        cmd_query(args)
    elif args.command == "compare":
        cmd_compare(args)
    elif args.command == "list":
        cmd_list(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
