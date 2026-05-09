# TOMORROW — Live handover (last updated: 2026-05-08 morning)

> Read this first. Then `~/Desktop/TileflowCEO/.remember/core-memories.md`. Then `~/Desktop/TileflowCEO/projects/sessions/2026-05-08-autonomous-execution.md` for today's full record.

---

## Where we left off (state at 2026-05-08 09:10 BST)

**`feat/autonomous-2026-05-08` MERGED to main. Live on production. Verified.**

- `/go/<asin>` redirect: HTTP 302 → `amazon.co.uk/dp/<ASIN>?tag=tileflowuk-21` ✅
- `robots.txt`: 15 AI crawlers allowlisted, `/go/` disallowed ✅
- FAQPage schema on top 3 GSC posts: validated PASS on production (0 errors, 0 warnings) ✅
- Next.js patched to 16.2.6 ✅
- WhatsApp pre-fill + contact-page CTAs ✅

**One blocker:** Indexing API push hit 403 `PERMISSION_DENIED — Failed to verify the URL ownership`. Same script worked yesterday. Brandon needs to check Google Search Console → tileflowuk.com → Settings → Users and permissions, confirm the OAuth Google account is still listed as **Owner** (not just User). Then say "rerun indexing".

**What it ships:**

1. Next.js patched 16.2.3 → 16.2.6 (CVE-2025-66478 RCE, CVSS 10.0)
2. `/go/<asin>` redirect — survives TikTok/Instagram webview cookie stripping
3. `whatsappLink()` 5 intent variants + WhatsApp/email CTAs on contact page
4. AI-crawler allowlist in `robots.ts` (15 bots: GPTBot, PerplexityBot, ClaudeBot, etc)
5. FAQPage schema on top 3 GSC posts (sigma-vs-rubi, tile-adhesive guide, best-budget-tools)
6. Affiliate disclosure added to 2 MDX files (publish-gate caught the gap)
7. Broken internal link fix in best-budget-tools

**Awin: PARKED 2026-05-08.** Brandon got rejected by most merchants. Strategy: stay 100% Amazon until traffic > ~10k sessions/month, then re-apply. Audit at `projects/sessions/2026-05-08-awin-swap-audit.md` retained for future reference.

---

## What needs Brandon's input next

| # | What | Where | Time |
|---|---|---|---|
| 1 | **Open + merge PR** — the autonomous work | github.com pull request URL above | 5 min |
| 2 | Microsoft Clarity sign-up → Project ID | clarity.microsoft.com (free) | 5 min |
| 3 | GA4 attribution → switch to data-driven | GA4 Admin UI | 5 min |
| 4 | GA4 → Google Signals OFF (DUAA) | GA4 Admin → Data Streams | 2 min |
| 5 | Memory walkthrough — 5 drafts | `projects/drafts/memory-files-2026-05-04/` | 30–45 min |
| 6 | Tile calculator final spec | conversation | 15 min |
| 7 | Read 3 unmerged blog drafts → ship/edit/bin | `content/blog/{how-to-tile-a-wall,tanking-a-wet-room,tiling-onto-floorboards}.mdx` | 20 min |
| 8 | Sentry DSN → paste into `.zshenv` | sentry.io project settings | 2 min |
| 9 | TikTok bio link → `https://tileflowuk.com` | TikTok app | 1 min |

<!-- Sample-box + TTA: KILLED 2026-05-08 (do not re-suggest). Awin: PARKED 2026-05-08 (revisit at 10k sessions/month). -->

Order: #1 first (unblocks Indexing API push), the rest in any order.

---

## What's autonomous-ready (Claude can do without asking)

After PR merge:

- **Run Indexing API push** on changed URLs (auto-fires via post-push hook, manual via `node ~/Desktop/TileflowCEO/projects/scripts/indexing-api-push.mjs`)
- **Schema-validate** the 3 FAQ pages on production via Playwright
- **Promote next 5–10 Amazon ASINs** to `/shop` product pages (25 verified ASINs unused)
- **Build missing referenced pages**: `/guides/tile-levelling-clips-explained`, `/guides/grout-haze-removal`, `/guides/tile-spacers-buying-guide`
<!-- Wire Awin secondary CTAs: PARKED 2026-05-08, revisit at 10k sessions/month -->
- **Run affiliate-link-auditor** weekly (now powered by Playwright)
- **Run schema-validator + publish-gate** on any commit before push

---

## Active services / auth state

| Service | Status |
|---|---|
| Google OAuth (GSC + GA4 + Indexing + PageSpeed) | ✅ live, refresh token in `safe/google-oauth-tokens.json` |
| Amazon Associates UK `tag=tileflowuk-21` | ✅ verified, now also enforced via `/go/<asin>` redirect |
| Awin Publisher ID `2826900` | 🅿️ PARKED — code constant retained; merchant approvals didn't come through, revisit at 10k sessions/mo |
| GitHub PAT (`GITHUB_PAT`) | ✅ rotated 2026-05-07, working |
| Pinterest API token (`PINTEREST_ACCESS_TOKEN`) | ✅ from `.env.local`, working |
| GTM tag `GTM-WMPBDV7D` | ✅ `affiliate_click` event firing |
| Sentry | ⏳ DSN parked |
| Microsoft Clarity | ⏳ sign-up parked |

---

## MCP fleet

Unchanged from 2026-05-07. Vercel, GitHub (remote), Playwright, Pinterest, Sentry, Notion, Google Drive, Canva, filesystem, brave-search, firecrawl, sequential-thinking, context7, obsidian — all connected.

---

## Resume prompt for next session

```
Pick up where we left off. Read in this order:

1. ~/Desktop/TileflowCEO/CLAUDE.md
2. ~/Desktop/TileflowCEO/TOMORROW.md (this file)
3. ~/Desktop/TileflowCEO/.remember/core-memories.md (focus on the 2026-05-07 + 2026-05-08 entries)
4. ~/Desktop/TileflowCEO/projects/sessions/2026-05-08-autonomous-execution.md (today's full record)
5. ~/Desktop/TileflowCEO/projects/sessions/2026-05-08-awin-swap-audit.md (Awin opportunity)

Then confirm in 3 bullets:
- Mode (lean orchestrator)
- Live state (where the feat/autonomous-2026-05-08 branch sits — merged or pending)
- One thing you'd flag before we start

Don't start work until I greenlight it.
```

---

## Open follow-ups (lower-priority, can wait days)

- 25 verified Amazon ASINs sitting in `affiliateLinks.ts` not yet promoted to /shop pages
- Bing IndexNow integration into the post-push hook (Google-only currently)
- `<AffiliateDisclosure />` reusable component that auto-renders below blog/guide MDX (would automate what publish-gate caught manually today)
- The 3 new /shop product pages use Amazon-hosted product images (m.media-amazon.com) — Brandon may want local hi-res photos
- The `claude-mem` `mcp-search` plugin shows `✗ Failed to connect` — separate fix
