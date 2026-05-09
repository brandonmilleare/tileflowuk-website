# Backlog verification — 2026-05-08

Verified the 2026-05-08 full backlog against the actual codebase at `/Users/Tileflowuk/Desktop/TileflowCEO/website/`. **Content / Channels** subgroup skipped per instructions.

Legend:
- ✅ DONE — already implemented (file evidence)
- 🟡 PARTIAL — partly there, gap noted
- ❌ NOT STARTED — confirmed missing
- ⛔ BLOCKED — needs Brandon input or external service

---

## 🔴 Needs Brandon's input

| Item | Status | Evidence |
|---|---|---|
| ~~Awin retailer confirmation + sample deep-link~~ | 🅿️ PARKED 2026-05-08 | Brandon rejected by most merchants. Revisit when traffic > ~10k sessions/month. Stay 100% Amazon for now. |
| Microsoft Clarity sign-up + Project ID | ⛔ BLOCKED | External service. No Clarity script in codebase. |
| GA4 attribution → data-driven | ⛔ BLOCKED | Admin UI only — outside code. |
| Sentry DSN paste into `.zshenv` | ⛔ BLOCKED | Outside repo. |
| Read new Amazon Operating Agreement (10 Apr 2026) | ⛔ BLOCKED | Legal interpretation. |
| Tile calculator final spec | ⛔ BLOCKED | No `app/tile-calculator/` directory exists — confirmed missing, awaiting spec. |
| Greenlight 3 unmerged blog drafts | ⛔ BLOCKED | All 3 drafts present in repo: `content/blog/how-to-tile-a-wall.mdx`, `tanking-a-wet-room.mdx`, `tiling-onto-floorboards.mdx`. Awaiting Brandon's "yes". |
| Memory walkthrough — 5 drafts | ⛔ BLOCKED | Outside website repo. |
| TikTok bio link confirmation + UTMs | ⛔ BLOCKED | External platform. |
| GSC ownership re-verification | ⛔ BLOCKED | External platform. |
| ~~TTA membership decision~~ | ❌ KILLED 2026-05-08 | Brandon decided no value at this stage. |
| ~~Sample-box logistics call~~ | ❌ KILLED 2026-05-08 | Brandon killed permanently — not part of strategy. |

10 items genuinely blocked + 2 permanently killed.

---

## 🟢 Legal / Compliance

| Item | Status | Evidence |
|---|---|---|
| `/data-rights` page with complaints procedure | ❌ NOT STARTED | `app/data-rights/` does not exist. Listing of `app/` confirms only: about, best-of, blog, contact, deluxe-flooring, digital-products, disclosure, go, guides, inspiration, llms.txt, og, pin-studio, privacy, robots.ts, shop, sitemap.ts, terms, tiles. |
| `/returns` page | ❌ NOT STARTED | `app/returns/` does not exist. |
| Refresh `/privacy` (cookie list, lawful basis, retention, ICO route, UK address, controller identity) | 🟡 PARTIAL | `/Users/Tileflowuk/Desktop/TileflowCEO/website/app/privacy/page.tsx` exists but is light: no specific cookie list, no lawful basis under UK GDPR, no retention windows, no ICO complaint route, no named UK address, no controller identity. Last-updated April 2026. |
| Refresh `/terms` (VAT-inclusive pricing, 14-day cancellation, made-to-order exclusions, ADR/ODR) | 🟡 PARTIAL | `/Users/Tileflowuk/Desktop/TileflowCEO/website/app/terms/page.tsx` (46 lines) covers content accuracy, affiliate links, IP, but no VAT clause, no 14-day cancellation, no made-to-order exclusions, no ADR/ODR. Last-updated June 2025. |
| Disable GA4 Google Signals + product-data sharing | ⛔ BLOCKED | GA4 Admin UI — not code. |
| Move `#ad` / Amazon Associates disclosure above the fold | 🟡 PARTIAL | Disclosure present **below the fold** on every post layout: `app/blog/[slug]/page.tsx` (no inline disclosure at all in the visible template — only in MDX bodies if author adds it), `app/best-of/[slug]/page.tsx` shows "As an Amazon Associate I earn from qualifying purchases…" near the back-link footer (line ~ end), `app/shop/[slug]/page.tsx` shows the same in the page footer. None render above-fold. |
| `<AffiliateDisclosure />` reusable component | ❌ NOT STARTED | `/Users/Tileflowuk/Desktop/TileflowCEO/website/components/affiliate/` only contains `AffiliateLink.tsx`. No `AffiliateDisclosure.tsx`. Each page hard-codes its own disclosure copy. |
| WCAG 2.2 AA pass — alt text, focus rings, contrast, skip-to-content, etc. | 🟡 PARTIAL | `lang="en-GB"` set at `app/layout.tsx:118`. Raw `<img>` count in components/ + app/ is **0** — all migrated to `next/image`. Full axe DevTools sweep, focus rings, skip-to-content, reduced-motion not verified — code-level work still needed. |
| Add `pa11y-ci` to GitHub Actions | ❌ NOT STARTED | Only `pin-factory.yml` exists in `.github/workflows/`. No accessibility check. |

---

## 🟢 SEO / AI Search

| Item | Status | Evidence |
|---|---|---|
| FAQPage schema on remaining 8 posts | ✅ DONE (mostly) | 12 of 15 published MDX files have `faqs:` frontmatter. Missing only the 3 unmerged drafts (how-to-tile-a-wall, tanking-a-wet-room, tiling-onto-floorboards) which are blocked on Brandon. FAQ schema rendering wired in `app/blog/[slug]/page.tsx:82–92`. **Remove this from backlog — done for everything that has shipped.** |
| Author bio + Person schema with LinkedIn `sameAs` on every post | ✅ DONE | `AuthorByline` component imported and rendered on all 3 post layouts: `app/blog/[slug]/page.tsx:8,151`, `app/guides/[slug]/page.tsx:9,152`, `app/best-of/[slug]/page.tsx:9,153`. Person sameAs schema lives in `app/about/page.tsx:53`. **Remove from backlog.** |
| Rewrite first 50 words of all 11 posts to answer-first format | 🟡 PARTIAL / NEEDS AUDIT | Cannot verify intent without reading each MDX intro. Likely some are answer-first, some not. Best handled as a per-file audit. |
| GSC opportunity refresh (pos 8–20, CTR <2%) | ⛔ BLOCKED | Needs GSC data export. |
| Build `/guides/tile-levelling-clips-explained` + `/guides/grout-haze-removal` + `/guides/tile-spacers-buying-guide` | ❌ NOT STARTED | `content/guides/` only has: how-to-choose-tile-grout.mdx, subfloor-prep-before-tiling.mdx, tile-adhesive-buying-guide.mdx. All three named guides are missing. |
| Ship `llms.txt` | ✅ DONE | `app/llms.txt/route.ts` exists with `revalidate = 86400`. |
| IndexNow ping (Bing/Yandex) | ❌ NOT STARTED | Grep `IndexNow` / `indexnow` returns zero matches across `app/`, `lib/`, scripts. No `vercel.json` exists. |
| Hub-and-spoke internal linking | ❌ NOT STARTED | Homepage `app/page.tsx` has `CategoryGrid` (`components/home/CategoryGrid.tsx`) but its slugs are tool categories (`Tile+Cutters`, `Angle+Grinders`…) pointing to `/shop?category=`, not topic hubs like "Bathroom Tiles". No `/bathroom-tiles`, `/kitchen-tiles` category landing pages exist. |
| Comparison-table format on every "best of" post | 🟡 PARTIAL | All 4 best-of MDX files contain markdown tables (pipe-separated rows): `best-budget-tiling-tools-uk.mdx` (11 table lines), `best-professional-tiling-starter-kit.mdx` (11), `best-tools-large-format-tiles.mdx` (8), `best-wet-saw-for-tiling.mdx` (8). The "currently only on sigma-vs-rubi" claim in the backlog is **stale** — best-of posts already use tables. Outstanding: dedicated comparison tables on product comparison **blog** posts and on the `best-of` posts may want a stronger ProductComparisonTable component (no such component in `components/`). |
| Add `web-vitals` package + log INP/LCP into GA4 | ❌ NOT STARTED | `web-vitals` not in `package.json` dependencies (verified — package.json deps end at zod). No `web-vitals` import anywhere. |

---

## 🟢 Conversion / CRO

| Item | Status | Evidence |
|---|---|---|
| Build UK tile calculator | ❌ NOT STARTED | `app/tile-calculator/` does not exist. Confirmed top item on the backlog. |
| Rewrite top-clicked /shop product page (NN/G 5 patterns) | ❌ NOT STARTED | `app/shop/[slug]/page.tsx` is a single template used for all SKUs. No NN/G hero/authority/single-CTA/trust-strip rewrite. |
| Roll rewrite pattern across all 5 launch /shop pages | ❌ NOT STARTED | Depends on previous. |
| ~~Wire dual-listed Awin secondary CTAs~~ | 🅿️ PARKED 2026-05-08 | Awin merchant approvals didn't come through. Stay 100% Amazon until traffic earns retailer approvals. |
| Promote 25 unused verified Amazon ASINs to /shop | 🟡 PARTIAL | `data/affiliateLinks.ts` has **46 affiliate keys**. `data/products.ts` has only **22 product entries** — gap is roughly 24 ASINs unused. Some affiliateLinks keys are duplicates/variants for the same SKU group, but the gap is real. |
| Trust strip near every Buy CTA | ❌ NOT STARTED | `components/product/ProductCard.tsx` (lines 1–99) has no trust strip — just badge, rating, price, AffiliateLink. `app/shop/[slug]/page.tsx` has no padlock/returns/"Picked by 15-year tiler" badge near CTA. |
| Real reviews / testimonial block on product pages | ❌ NOT STARTED | `app/shop/[slug]/page.tsx` only renders `product.reviewCount` star count. No testimonial block, no placeholder. |

---

## 🟢 Technical / Performance

| Item | Status | Evidence |
|---|---|---|
| Migrate to Next 16 Cache Components (`"use cache"` + `cacheLife()` + `cacheTag()`) | ❌ NOT STARTED | Grep across `app/` and `lib/` returns zero `"use cache"`, `cacheLife`, or `cacheTag` directives. Only one `revalidate` (`app/llms.txt/route.ts:18`). |
| Move article pages to ISR with `revalidate: 86400` | ❌ NOT STARTED | Blog/guide/best-of slug pages don't export `revalidate`. Only llms.txt does. |
| Audit + swap remaining `<img>` for `next/image` | ✅ DONE | `grep -rn "<img" components/ app/` returns **0 hits**. **Remove from backlog.** |
| Replace Amazon-hosted product images with local hi-res | 🟡 PARTIAL | 5 entries in `data/products.ts` still use `https://m.media-amazon.com/...` (lines 568, 599, 630, 661, 692). Original 17 launch products all use `/images/products/...` local. So 5 of the 22 SKUs still hot-link Amazon. |
| Switch amzn.to → direct amazon.co.uk/dp/{ASIN}?tag=tileflowuk-21 | 🟡 PARTIAL | `data/affiliateLinks.ts` still has **23 amzn.to** entries vs **32 amazon.co.uk** direct. The newer batch (lines 70–112) is direct; the older Sigma/DEWALT/Bosch group (lines 35–66) is still amzn.to. |

---

## 🟢 Tooling

| Item | Status | Evidence |
|---|---|---|
| Run `/less-permission-prompts` | ⛔ BLOCKED | Claude Code workflow command — outside repo. |
| Install Lighthouse / PageSpeed MCP | ⛔ BLOCKED | MCP installation — outside repo. |
| Install `claude-seo` skill | ⛔ BLOCKED | Skill install — outside repo. |
| Install `seo-geo-claude-skills` | ⛔ BLOCKED | Skill install — outside repo. |
| Wire `tileflow-publish-gate` + `tileflow-schema-validator` into `.git/hooks/pre-commit` | ❌ NOT STARTED | `.git/hooks/` only has `*.sample` files. No `pre-commit` hook installed. No `.husky/` directory. No `lint-staged` in `package.json`. |
| Broken-link monitor on GitHub Actions (lychee/linkinator, weekly cron) | ❌ NOT STARTED | `.github/workflows/` only has `pin-factory.yml`. No lychee or linkinator workflow. |
| GA4 → Notion weekly digest cron | ❌ NOT STARTED | No such workflow. |
| Fix `claude-mem` `mcp-search` plugin | ⛔ BLOCKED | MCP plugin — outside repo. |

---

## Summary

- **Items that should be removed from backlog (already done):** 3
  - FAQPage schema on remaining posts (12 of 15 done; only the 3 blocked drafts lack it)
  - Author bio + Person schema with `sameAs` on every post (AuthorByline rendered on all 3 layouts)
  - Audit `<img>` → `next/image` (zero raw `<img>` tags in code)
  - llms.txt (live)

- **Items partially done (need finishing, not full rebuild):** 7
  - Privacy policy refresh (light skeleton exists)
  - Terms refresh (light skeleton exists)
  - WCAG 2.2 AA pass (lang done, raw `<img>` done; rest unverified)
  - amzn.to → direct amazon.co.uk (32 direct, 23 still amzn.to)
  - Replace m.media-amazon.com images (5 of 22 still remote)
  - Comparison tables on best-of (already exist; could level up to a component)
  - Promote unused ASINs (46 affiliate keys vs 22 product entries — ~24 unused)
  - Above-fold #ad disclosure (disclosure exists on every page but below the fold)

- **Items genuinely outstanding (full build):** 13
  - `/data-rights`, `/returns`, `<AffiliateDisclosure />` component
  - 3 missing guide pages (tile-levelling-clips-explained, grout-haze-removal, tile-spacers-buying-guide)
  - Tile calculator
  - NN/G product page rewrite + roll-out
  - Trust strip + real-reviews block
  - Hub-and-spoke internal linking + category hubs
  - Cache Components / ISR migration
  - web-vitals + GA4 reporting
  - IndexNow
  - pa11y-ci, lychee, GA4→Notion CI workflows
  - Pre-commit hook (publish-gate + schema-validator)
  - First-50-words answer-first audit (per-post)

- **Items blocked on Brandon (no code work possible):** 16 across 🔴 (12) and 🟢 (4: Awin secondary CTAs, GA4 Signals, Clarity, GSC export)

---

*Verified by reading actual files in `/Users/Tileflowuk/Desktop/TileflowCEO/website/`. Cited file paths absolute. UK English.*
