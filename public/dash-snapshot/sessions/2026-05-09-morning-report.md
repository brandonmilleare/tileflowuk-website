# Morning report — 2026-05-09

> Read this first. Everything I shipped overnight in one place. No fluff.

## Status: 10 PRs open + 50-repo research done

All 10 autonomous items from the approved sprint plan are PRs. The research file is sitting at `~/Desktop/TileflowCEO/projects/research/2026-05-08-50-repos/index.html` — open it with `open <path>`.

---

## Open PRs (all merge-able in any order)

| PR | Title | Why | Risk |
|---|---|---|---|
| **#18** | `fix(affiliate)`: replace amzn.to → direct amazon.co.uk URLs | Fixes 0% TikTok conversion (cookie stripping on amzn.to redirects). 30 link replacements across 5 files. | Low — only data + content edits |
| **#19** | `feat(shop)`: promote 10 verified ASINs to /shop pages | 22 → 32 product pages. Fills 8 categories. Two new categories opened. | Low — pure content add |
| **#20** | `feat(content)`: 3 missing buying guides | Closes broken internal links. Adds 3 SEO landing pages. ~8.3k words, 21 FAQ blocks. | Low — content only |
| **#21** | `feat(shop)`: trust strip + reviews block above the fold | Single biggest free conversion lever. Adds 4 trust signals + a "Why Brandon picked this" pull quote. | Low — additive UI |
| **#22** | `feat(perf)`: web-vitals → GA4 | Reports INP/LCP/CLS/FCP/TTFB to GA4 as `web_vitals` events. | Low — analytics only |
| **#23** | `feat(seo)`: IndexNow ping (Bing + Yandex) | Pings Bing+Yandex alongside Google after each push. Bing's ~5% UK organic share now stays fresh. | Low — adds a key file + script |
| **#24** | `feat(ci)`: in-tree pre-commit hook | Auto-runs publish-gate on staged MDX. Blocks bad commits before PRs. | Low — opt-in per clone |
| **#25** | `feat(ci)`: Lychee broken-link monitor | GitHub Action: weekly + push. Auto-files an issue with the report. | Low — read-only CI |
| **#26** | `feat(seo)`: hub-and-spoke internal linking | 35 contextual internal links across 11 MDX files. Authority compounds in clusters. | Low — text edits |
| **#27** | `feat(perf)`: ISR 24h on detail pages | Detail pages re-render daily without redeploy. Better than `cacheComponents` (still experimental). | Low — single-line per file |

**Total: 10 PRs, ~40 files changed, ~1,500 lines added, all green builds, all publish-gate PASS.**

## Suggested merge order

1. **#18** first (conversion fix — biggest revenue impact)
2. **#19, #20** next (new pages — both reference each other's slugs)
3. **#21** (trust strip on the new shop pages)
4. **#22, #23, #24, #25, #26, #27** in any order (orthogonal)

Once #18 + #19 + #20 are merged, the post-push hook will auto-fire Google Indexing API + IndexNow on all the changed URLs. No action needed from you.

---

## ⭐ The 50-repo research file (item #11)

**Open it:**
```bash
open ~/Desktop/TileflowCEO/projects/research/2026-05-08-50-repos/index.html
```

51 picks across 6 categories. Each verified live via the GitHub API (stars, last commit, licence). Quality gates: ≤12 months old, ≥50 stars, MIT/Apache/BSD only, no paid-only, no duplicates of what's installed.

**Categories:**
- Claude Code skills (10)
- Claude agents + plugins + MCPs (9)
- Next.js + Vercel production patterns (8)
- SEO + AI-search automation (8)
- Affiliate + commerce stack (8)
- AI workflow / productivity (8)

The HTML has filter buttons, a Top 10 highlight section, and a "If you only pick 3" recommendation footer. Browseable in 5 minutes over your morning coffee.

**Companion files:**
- `data.json` — same data machine-readable for future agents
- `README.md` — quick text guide
- `cat[1-6]-*.json` — raw per-category research

---

## What needs your attention (still your jobs to do)

These haven't moved overnight — same as before, ordered by ease:

- **TikTok bio link** — set Website to `https://tileflowuk.com` (✅ you said this is done)
- **Microsoft Clarity sign-up** — clarity.microsoft.com → Project ID → tell me
- **GA4 Attribution → data-driven** — UI couldn't find this in your account version, low value, parked
- **Tile calculator spec** — when you've got 15 min, walk me through what it should ask + show
- **3 unmerged blog drafts** — read in `content/blog/{how-to-tile-a-wall, tanking-a-wet-room, tiling-onto-floorboards}.mdx`. Ship/edit/bin
- **Memory walkthrough** — 30-45 min interactive when you've got time

(Sample-box + TTA killed permanently. Awin parked until 10k sessions/month.)

---

## What I tried that didn't work

- **Amazon image URL scraping** — Amazon blocks bots. The 10 new /shop pages use a placeholder image at `/images/products/_pending.png` (a copy of the Sigma 4BU image). Real photos: drop them at `/images/products/<slug>.jpg` and Next/Image picks them up automatically. Slugs in `data/products.ts`.
- **GA4 attribution UI item** — wasn't in your account's left sidebar. GA4 has been quietly removing it from properties without certain features. Not worth chasing.
- **claude-mem 12.6.2 → 13.0.0** — fixed the `zod/v3` import error during yesterday's session. Restart Claude Code to load the new version.

---

## Quick metrics you might care about

- **Production currently:** 22 shop pages → will be 32 after merge
- **Live MDX content:** 11 → 14 (after PR #20 merge)
- **Internal-link density:** +35 contextual cross-links after PR #26
- **Affiliate URLs:** 100% direct (no amzn.to anywhere) after PR #18
- **CI:** broken-link monitor + pre-commit gate active after PR #24 + #25
- **Detail pages:** all 4 routes get 24h ISR after PR #27

---

## Resume prompt for next session

```
Read these in order:
1. ~/Desktop/TileflowCEO/CLAUDE.md
2. ~/Desktop/TileflowCEO/TOMORROW.md
3. ~/Desktop/TileflowCEO/projects/sessions/2026-05-09-morning-report.md (this file)
4. ~/Desktop/TileflowCEO/projects/sessions/2026-05-08-full-backlog.md (verified backlog)
5. ~/Desktop/TileflowCEO/projects/research/2026-05-08-50-repos/index.html (research)

Then confirm:
- Which of PRs #18–#27 are merged (gh pr list --state merged --limit 20)
- Whether the post-push hook fired Indexing API + IndexNow correctly (auto-ping-log.md)
- One thing to flag before we start the next batch.
```

---

## Honest reflection

**What went well:**
- 6 research subagents in parallel cleared the 50-repo brief in ~7 min wall time
- Hub-and-spoke linking subagent surgically added 35 links, 0 broken slugs
- 3 missing guides written by one subagent in 7 min, all PASS publish-gate
- Each PR small enough to review in 5 min — easier than one giant PR

**What I'd do differently:**
- Image fetching for Amazon products needs a real solution. Suggest: add the [`amazon-paapi`](https://github.com/utsavanand2/amazon-paapi) library when you have a few hours, OR just drop in your own photos as you ship them. The placeholder works but isn't pretty.
- GA4 Attribution UI hunt wasted ~10 min. Should have backed off sooner.

**Time spent:** ~3 hours real wall time for 10 PRs + 51-repo research + morning report. Cost-efficient delegation pattern: heavy lifting (content writing, link-pass, research) all went to subagents in parallel; structural code I did directly.
