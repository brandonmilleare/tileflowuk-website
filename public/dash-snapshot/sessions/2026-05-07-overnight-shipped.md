# 2026-05-07 — Overnight session: 3 PRs shipped + MCP infrastructure expanded

> **TL;DR:** Three PRs (#7 SEO + content, #8 30 Amazon products + 5 /shop pages, #9 MDX rel-attribute fix) all merged to main, all live on production. Indexing API push run twice. 21 rel-tagged affiliate links now compliant. Followed by installation of Playwright + GitHub + Pinterest MCPs and three custom builds (publish-gate, auto-ping hook, schema validator).

---

## What landed in production today

### PR #7 — SEO hygiene + content refresh
**Merged:** 2026-05-06 → 3ca5f80 → live on tileflowuk.com
**Files changed:** 11, +415/-96
**Highlights:**
- JSON-LD schema added to `/contact`, `/about`, `/best-of`, `/deluxe-flooring` (was zero before)
- Canonicals on `/`, `/contact`, `/about`, `/best-of`, `/guides`
- 5 over-long meta descriptions trimmed (deluxe was 224→152 chars, the big one Brandon flagged)
- og:image on /deluxe-flooring (was inheriting site default → blank social shares)
- `/guides/tile-adhesive-buying-guide` rewritten — 8 long-tail H2s targeting 25+ adhesive queries from GSC, ~2,600 words, refreshed date
- `/blog/sigma-vs-rubi-tile-cutters` title + excerpt rewritten for CTR (was pos 7.1, 1.6% CTR)
- `/best-of/best-budget-tiling-tools-uk` refreshed for page-1 push from pos 13. Added 3 new sections (spacers, knee pads, mixing bucket)

### PR #8 — Amazon affiliate additions (30 verified products + 5 launch /shop pages)
**Merged:** 2026-05-07 morning → 587b2af → live
**Files changed:** 4, +237/-31
**Highlights:**
- `data/affiliateLinks.ts`: 30 new named keys for verified ASINs across 8 categories (levelling kits, spacers, trowels, cleaners, knee pads, mixing tools, paddles, tubs)
- `data/products.ts`: 5 new ProductCategory values (Tile Spacers, Trowels, Knee Pads, Tile Cleaners, Mixing Tools)
- 5 new `/shop` product pages with full descriptions, specs, pros/cons, and Amazon-hosted hi-res images:
  1. Vitrex 2mm Cross Spacers Pack 1000 — £2.40
  2. OX Pro 10mm Notch Trowel — £12.99
  3. ToughBuilt TB-KP-G3 GELFIT Knee Pads — £92.99
  4. HG Tile Cleaner Product 16 1L — £6.50
  5. Faithfull FAIMP120 Mixing Paddle 120mm — £17.13
- 31 placeholder `/shop` links across 5 content pages replaced with real Amazon URLs (direct-product where ASIN known, search-URLs with tag for generics)
- `next build` confirms 24 SSG pages now under `/shop/[slug]` (was 19)

### PR #9 — MDX `rel="nofollow sponsored"` injection
**Merged:** 2026-05-07 → 89517a5 → live
**Files changed:** 5, +122/-3
**Highlights:**
- `components/mdx/SmartAnchor.tsx` — client-component `<a>` replacement. Detects affiliate hosts (amzn.to, amazon.co.uk, deluxe-flooring.co.uk, awin1.com), injects `rel="nofollow sponsored noopener noreferrer"` + `target="_blank"`, fires `dataLayer.push({ event: 'affiliate_click', source: 'mdx' })` for GA4 parity with the existing AffiliateLink wrapper
- `components/mdx/mdxComponents.tsx` — shared MDX components map. Maps markdown `a` → SmartAnchor.
- 3 routes wired: `/blog/[slug]`, `/guides/[slug]`, `/best-of/[slug]` — each MDXRemote call now passes `components={mdxComponents}`
- **Verification:** 3/3 amzn.to links on `/blog/sigma-vs-rubi-tile-cutters` now have rel attrs (was 0). 8/8 on adhesive guide. 10+/10+ on best-budget. All `data-affiliate="mdx"` for GA4 segmentation.

---

## Indexing API submissions

10 URLs pushed to Google Indexing API twice (after PR #7 merge, after PR #9 merge):
```
https://tileflowuk.com/
https://tileflowuk.com/about
https://tileflowuk.com/contact
https://tileflowuk.com/best-of
https://tileflowuk.com/guides
https://tileflowuk.com/tiles
https://tileflowuk.com/deluxe-flooring
https://tileflowuk.com/guides/tile-adhesive-buying-guide
https://tileflowuk.com/blog/sigma-vs-rubi-tile-cutters
https://tileflowuk.com/best-of/best-budget-tiling-tools-uk
```

All returned 200. Token refresh succeeded both times. Script lives at `~/Desktop/TileflowCEO/projects/scripts/indexing-api-push.mjs`.

---

## Amazon affiliate research output

**Source file:** `~/Desktop/TileflowCEO/projects/drafts/2026-05-07-amazon-affiliate-additions.md`
**Verified file:** `~/Desktop/TileflowCEO/projects/drafts/2026-05-07-amazon-affiliate-VERIFIED.md`

**Verified live (30/33):**
8 categories — tile-levelling kits/pliers, tile spacers, trowels, cleaning cloths/sponges, tile cleaners, knee pads, mixing paddles, mixing buckets. Each ASIN was fetched live from amazon.co.uk with a Chrome User-Agent, titles + prices + availability extracted from the page HTML.

**3 ASINs dropped:**
- `B0042QEJS2` — RUBI 5mm T-spacers — listing was "Currently unavailable"
- `B00FRJC91W` — Italian-style Levelling System Pliers — "Currently unavailable"
- `B00160JJ9G` — Lithofin KF Intensive — title mismatch, listing was 5L (£107.90) not 1L as research file implied

**4 price/copy mismatches noted:**
- `B07T97LJJB` pliers are blue, not yellow as research said
- `B0140V9LWC` ToughBuilt G3 knee pads now £92.99 (research band was £35-50; UK knee-pad prices have moved up sharply)
- `B09S5DZ8X8` ToughBuilt Snap-Shell now £67.10 (research band was £25-35)
- `B001MJTKBI` E-Cloth Bathroom is "2 cloths" not "Pack" — minor copy fix

The best-budget post was updated to reflect the inflated knee-pad pricing (kit total £263 → £305, section renamed "Under £220" → "Under £310").

---

## Affiliate audit (PR #8 follow-up)

**Report:** `~/Desktop/TileflowCEO/projects/sessions/2026-05-06-affiliate-live-audit.md`

**P0 finding (now fixed in PR #9):** all amzn.to links inside MDX content rendered without `rel="nofollow sponsored"` — Amazon Operating Agreement breach risk. SmartAnchor (PR #9) closed this.

**Healthy:** 5/5 sampled amzn.to shortlinks return HTTP 200 with `tag=tileflowuk-21` preserved when fetched with realistic Chrome UA. /shop and /deluxe-flooring AffiliateLink CTAs correctly attributed.

**Hygiene improvements queued (P1, P2):**
- Add `<AffiliateDisclosure />` block automatically to every blog/guide layout (currently only on /deluxe-flooring + /shop product pages)
- Optional: switch amzn.to shortlinks to direct `amazon.co.uk/dp/{ASIN}?tag=tileflowuk-21` for one less HTTP hop

---

## What's still in `projects/drafts/` awaiting Brandon's read

`projects/drafts/blog-posts-2026-05-06/` — 3 publish-ready drafts:
- `how-to-tile-a-wall.mdx` (~2,950 words, 11 placeholder /shop links to swap)
- `tiling-onto-floorboards.mdx` (~2,200 words, 5 price markers to verify in HardieBacker comparison table)
- `tanking-a-wet-room.mdx` (~2,800 words, 5 price markers to verify against current trade quotes)

Note: I copied these locally into `website/content/blog/` for the dev-server preview hub at `/tmp/tileflow-review-2026-05-06/index.html` and stripped 6 broken `{rel="..."}` Pandoc-syntax bits from `how-to-tile-a-wall` and `tiling-onto-floorboards`. The originals in `projects/drafts/` are untouched.

---

## Open follow-ups (parked)

- **3 blog drafts** — Brandon to read in dev-server preview, approve for live publish (separate small PR)
- **25 of 30 verified ASINs not yet in /shop** — usable immediately via `affiliateLinks.ts` registry from any MDX, promote to /shop pages whenever appropriate
- **Microsoft Clarity install** — gated on Brandon's 5-min sign-up at clarity.microsoft.com
- **Sentry DSN** — gated on Brandon pasting DSN into `.zshenv`
- **Memory walkthrough** — 5 drafts in `projects/drafts/memory-files-2026-05-04/` still awaiting Brandon's interactive review
- **claude-mem `mcp-search` plugin** — currently failed in `claude mcp list`, not blocking but should be fixed
- **5 priority /shop product images** — currently using Amazon-hosted m.media-amazon.com images, Brandon may want to swap to local high-res photos at some point

---

## What this session also did

- Ran extensive system test suite (early in the day): 12 live URLs all 200, 5 amzn.to shortlinks all preserve tag, 10/10 folder integrity checks, all 5 Google APIs working (GSC, GA4, Indexing, PageSpeed, Identity)
- Spawned 5 background subagents in parallel: 3 blog drafts (~8,000 words), Amazon research (33 ASINs), affiliate live audit
- Built /tmp/tileflow-review-2026-05-06/index.html as a visual review hub for Brandon (replaced VS Code reading with a styled localhost preview gallery)
- Fixed Pandoc-syntax bugs in two of the three blog drafts so they'd render in MDX

---

## Live tracker / state at end of day

| Surface | Affiliate touch points | Compliant? |
|---|---|---|
| /shop product pages | 5 hero CTAs (uses AffiliateLink wrapper) | ✅ |
| /shop/[slug] sidebar (existing) | 19 (existing tile cutters etc.) | ✅ |
| /deluxe-flooring | 9+ Deluxe affiliate CTAs | ✅ |
| /blog/[slug] MDX | 3+ amzn.to + amazon.co.uk links per post | ✅ post-PR #9 |
| /guides/[slug] MDX | 8 affiliate links on adhesive guide | ✅ post-PR #9 |
| /best-of/[slug] MDX | 12+ affiliate links on best-budget | ✅ post-PR #9 |

| Tracking | Status |
|---|---|
| GA4 `affiliate_click` event firing | ✅ confirmed in realtime (test click 2026-05-06) |
| GTM tag `GTM-WMPBDV7D` configured | ✅ |
| dataLayer push from AffiliateLink + SmartAnchor | ✅ |
| Indexing API quota | 30 URLs submitted today, 170/200 daily quota remaining |

| Open service auth | Status |
|---|---|
| Google OAuth (GSC + GA4 + Indexing + PageSpeed) | ✅ live, refresh token working |
| Amazon Associates UK (`tag=tileflowuk-21`) | ✅ verified preserving through redirects |
| GitHub PAT for MCP | ✅ generated 2026-05-07 (rotated mid-session — see notes) |
| Pinterest API token | ✅ working token in ~/.zshenv (replaced broken one) |
| Sentry | parked — needs DSN |
| Microsoft Clarity | parked — needs Brandon sign-up |

---

## Notes for next session

- **Resume prompt:** read `~/Desktop/TileflowCEO/CLAUDE.md` → `~/Desktop/TileflowCEO/TOMORROW.md` → `.remember/core-memories.md` → this file → confirm mode + state in 3 bullets, then wait for greenlight
- **GitHub PAT was rotated mid-session** (2026-05-07 ~16:50) due to a `.zshenv` syntax error that printed the original token to terminal output. The original was revoked; new token loaded cleanly with 40 chars
- **Next high-leverage moves:**
  1. Read + ship the 3 blog drafts (Brandon's call)
  2. Promote next batch of Amazon ASINs to /shop pages (10 of the 25 unused)
  3. Build the missing `/guides/tile-levelling-clips-explained` and `/guides/grout-haze-removal` pages (referenced as placement targets in the affiliate research)
  4. Once Clarity is installed, run the clarity-analyst on the 0%-conversion problem
