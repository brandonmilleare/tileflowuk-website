# TileFlow UK — skill discovery pointer

> This file used to be a hand-curated skills list. It went stale fast — many entries became wrong, missing the 4 local plugins, the external repos under `~/.claude/skills/`, and current MCPs.
>
> **Source of truth for installed skills/agents/plugins/MCPs** is now `~/.claude/INVENTORY.md` (auto-refreshable via `node ~/.claude/scripts/refresh-inventory.mjs`).

## Where to look

| If you want to know… | Read |
|---|---|
| What skills, agents, plugins, MCPs, GHA workflows are installed on this Mac | `~/.claude/INVENTORY.md` (auto-injected into every Claude session via global CLAUDE.md `@` reference) |
| When to use which skill — operational shortlist | `~/.claude/projects/-Users-Tileflowuk-Desktop-TileflowCEO/memory/topic-skills.md` |
| TileFlow-specific brand voice and convention rules | `~/Desktop/TileflowCEO/.claude/rules/*.md` (auto-load on matching paths) |
| Build commands, common ops facts | `~/.claude/projects/-Users-Tileflowuk-Desktop-TileflowCEO/memory/MEMORY.md` |

## Build phase → skill quick reference (kept from old SKILLS.md)

Old phase→skill mapping survives in `SKILLS.md.STALE-2026-05-10` for historical reference. Use INVENTORY.md going forward — it auto-updates and stays accurate.

## Two original notes that are still valid

1. **Next.js version warning:** this project uses Next.js 16+. APIs differ from training data — read `node_modules/next/dist/docs/` before writing Next.js code.
2. **British English always.** Colour, organise, fulfil, £, mm/cm/m².
