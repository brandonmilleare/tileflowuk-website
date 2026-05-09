# Project git hooks

Hooks live in-tree so devs share them. They're not active until you opt in.

## One-time setup (per clone)

```bash
git config core.hooksPath .githooks
```

That's it. The next `git commit` runs the hooks automatically.

## What runs on pre-commit

- **MDX publish-gate** — every staged `content/{blog,guides,best}/*.mdx` file is checked for: banned words, missing byline, missing affiliate disclosure, broken internal links, Pandoc-style `{rel="..."}` brackets that break MDX.
- **Schema reminder** — when any `app/**/page.tsx` is staged, prints a reminder to run `tileflow-schema-validator` against the deployed URL after merge.

## Bypass intentionally

```bash
git commit --no-verify
```

Use sparingly — the gate exists for good reasons.

## Why not Husky?

Husky pulls a npm dependency, runs an `install` script, and writes its config to a hidden file. This is simpler — one shell script, one git config command, no dep.
