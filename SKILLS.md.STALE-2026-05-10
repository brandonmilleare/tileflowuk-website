# TileFlow UK v2 — Skills Reference

> One place to see, review, and add to every skill available in this project.
> Skills marked **[LOCAL]** live in `~/.claude/plugins/local/` and can be edited directly.
> Skills marked **[PLUGIN]** come from the official Claude plugins registry.
> Skills marked **[OTHER PROJECT]** were built for a different site but are loaded globally.

---

## How to Use a Skill

In any Claude Code session, type `/skill-name` or tell Claude to "use the X skill".
Example: "write a product review using the tileflow-content skill"

---

## 1. TileFlow UK — Custom Skills

These skills were built specifically for this website.

---

### `tileflow-content` [LOCAL]

**File:** `~/.claude/plugins/local/tileflow-content/skills/tileflow-content/SKILL.md`

**When to use:** Any time you write text for the TileFlow UK site — product reviews, blog posts, buying guides, hero copy, category descriptions, page copy, meta descriptions, MDX content, or any placeholder text.

**What it does:**
- Sets the brand voice: British English, trade-credible, direct, honest
- Provides product review structure (MDX format with ProsCons, StarRating, AffiliateButton)
- Provides buying guide + best-of structure
- Provides blog post structure by type (How-To, Tool Review, Tiling Tips, etc.)
- Enforces SEO keyword placement rules
- Enforces affiliate link format: `https://www.amazon.co.uk/dp/[ASIN]?tag=tileflowuk-21`
- Enforces `rel="nofollow sponsored"` on all affiliate links
- Reminds about affiliate disclosure on every page
- Lists TileFlow UK keyword clusters (tile cutters, angle grinders, laser levels, how-to)

**Key rules inside the skill:**
- Always British spellings (colour, aluminium, centre, organise)
- Always £ — never $ or EUR
- Dates: DD/MM/YYYY
- Measurements: mm, cm, m²
- No lorem ipsum — always write realistic branded content
- Mark placeholders with: `{/* REPLACE: ... */}`

**TODO / Things to add:**
- [ ] Add real ASINs for all 16 products once confirmed
- [ ] Add TikTok-specific copy guidelines
- [ ] Add Instagram caption templates

---

## 2. Website Build Skills

These skills are used during development of the site itself.

---

### `frontend-design` [PLUGIN]

**When to use:** Any design decision — component layout, colour choices, spacing, typography, UI patterns, animations.

**What it does:** Produces production-grade UI following established design principles. Knows about the TileFlow UK design tokens (sage green primary, pastel blue trust bar) from context.

**Used in phases:** All phases — especially Phase 1 (Navbar/Footer), Phase 2 (Homepage), Phase 3 (Shop).

---

### `vercel:nextjs` [PLUGIN]

**When to use:** Any Next.js App Router question — routing, layouts, server vs client components, metadata API, image optimisation, MDX setup.

**Note:** This project uses Next.js 16 App Router. Always read `node_modules/next/dist/docs/` before writing Next.js code — the API may differ from training data.

---

### `vercel:shadcn` [PLUGIN]

**When to use:** Installing or using shadcn/ui components. This project uses shadcn/ui with the Default style and Neutral base colour.

---

### `vercel:deploy` [PLUGIN]

**When to use:** Deploying to Vercel, managing preview vs production deployments, setting environment variables, connecting `tileflowuk.com` domain.

---

### `vercel:env-vars` [PLUGIN]

**When to use:** Managing `.env` variables, pulling env vars with `vercel env pull`, setting secrets in Vercel dashboard.

**Key env vars for this project:**
- `NEXT_PUBLIC_SITE_URL` — https://tileflowuk.com
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4
- `KEYSTATIC_GITHUB_CLIENT_ID` / `KEYSTATIC_GITHUB_CLIENT_SECRET` / `KEYSTATIC_SECRET`
- `DATAFORSEO_USERNAME` / `DATAFORSEO_PASSWORD`

---

### `feature-dev:feature-dev` [PLUGIN]

**When to use:** Building a new site feature end-to-end (e.g. adding the Inspiration Gallery, Deals page, Downloads section). Guides you through architecture → implementation → review.

---

## 3. SEO Skills

---

### `seo` [PLUGIN]

**When to use:** Full SEO audit of the site or any page. Covers crawlability, indexability, Core Web Vitals, schema, sitemap, meta tags.

**Sub-skills inside `seo`:**
- `seo-technical` — crawlability, robots.txt, URL structure
- `seo-content` — E-E-A-T, thin content, readability
- `seo-schema` — JSON-LD structured data (Product, Article, BreadcrumbList, Organization)
- `seo-sitemap` — validate and generate XML sitemap
- `seo-performance` — Core Web Vitals, Lighthouse
- `seo-geo` — AI search visibility (ChatGPT, Perplexity, Google AI Overviews)
- `seo-local` — local SEO signals
- `seo-google` — CrUX field data, GSC indexation, GA4 traffic

**Used in phases:** Phase 10 (SEO Polish), Phase 12 (pre-launch).

---

### `blog-seo-check` [PLUGIN]

**When to use:** After writing any blog post or guide — validates title tag, meta description, heading hierarchy, internal/external links, canonical, OG tags, Twitter Card, URL structure.

---

### `blog-schema` [PLUGIN]

**When to use:** Generating JSON-LD structured data for blog posts and guides. Produces Article + BreadcrumbList schema.

---

## 4. Blog & Content Skills

---

### `blog-write` [PLUGIN]

**When to use:** Writing a new blog post from scratch. Works alongside `tileflow-content` for the brand voice.

**Used in phases:** Phase 5 (Blog System) — 3 placeholder posts:
- `how-to-cut-porcelain-tiles`
- `best-tile-cutter-uk-2026`
- `large-format-tile-installation-guide`

---

### `blog-outline` [PLUGIN]

**When to use:** Before writing a post — generates a SERP-informed outline based on what's ranking for the target keyword.

---

### `blog-brief` [PLUGIN]

**When to use:** Planning a new article — generates a content brief with keyword, intent, angle, outline, affiliate opportunities, and competitor gaps.

---

### `blog-rewrite` [PLUGIN]

**When to use:** Improving or updating an existing blog post for better SEO or readability.

---

### `blog-audit` [PLUGIN]

**When to use:** Full health check of all blog posts on the site — thin content, missing metadata, broken links, cannibalization.

---

### `blog-image` [PLUGIN]

**When to use:** Generating or sourcing featured images and OG images for blog posts.

---

### `blog-schema` [PLUGIN]

**When to use:** Adding JSON-LD Article schema to blog posts.

---

## 5. Workflow & Quality Skills

---

### `superpowers:verification-before-completion` [PLUGIN]

**When to use:** Before marking any build phase as done. Runs a checklist to make sure nothing was missed.

**Used in phases:** End of every phase gate (Phases 0–12).

---

### `superpowers:requesting-code-review` [PLUGIN]

**When to use:** After finishing a major implementation step — triggers a code review agent.

---

### `superpowers:systematic-debugging` [PLUGIN]

**When to use:** When anything breaks — build errors, runtime errors, layout bugs. Use this before trying random fixes.

---

### `superpowers:brainstorming` [PLUGIN]

**When to use:** Before any creative or architectural decision — new page design, content strategy, feature ideas.

---

### `simplify` / `code-simplifier` [PLUGIN]

**When to use:** After implementing a feature — cleans up and simplifies code without changing functionality.

---

### `context7` [PLUGIN]

**When to use:** Looking up current docs for any library — Next.js, Tailwind, Motion, shadcn/ui, etc. Always prefer this over relying on training data for library-specific syntax.

---

## 6. MCPs (Live Integrations)

These are connected tools, not skills — they run as services alongside Claude.

| MCP | Status | What it does |
|-----|--------|-------------|
| **Firecrawl** | Active | Scrape competitor pages, analyse SERP results |
| **Brave Search** | Active | Web search for research and fact-checking |
| **Vercel** | Active | Deploy, check logs, manage projects |
| **Canva** | Active | Generate and edit Pinterest pin designs |
| **context7** | Active | Fetch live library documentation |
| **DataForSEO** | Needs setup | Keyword volume + difficulty data — see setup below |
| **Claude in Chrome** | Active | Browser automation for testing and screenshots |

### DataForSEO Setup (not yet configured)

1. Sign up at https://dataforseo.com
2. Get API credentials from the API Access tab
3. Run:
```bash
claude mcp add --header "Authorization: Basic $(echo -n 'YOUR_EMAIL:YOUR_PASSWORD' | base64)" \
  --transport http dfs-mcp https://mcp.dataforseo.com/http
```
Cost: ~£15–40/quarter for normal keyword research usage.

---

## 7. Other Project Skills (Loaded Globally — Not TileFlow UK)

These are loaded globally and available, but were built for other projects. They won't break anything but are not part of the TileFlow UK build plan.

| Skill | Built for | What it does |
|-------|-----------|-------------|
| `affiliate-auditor` | remotetoolkit.net | Audits Awin/Impact/PartnerStack affiliate links in that site's markdown files |
| `content-brief` | remotetoolkit.net | Generates content briefs with that site's affiliate programmes (VPN, banking, etc.) |
| `pinterest-pins` | remotetoolkit.net | Posts Pinterest pins via Canva + Zapier for that site's articles |

> **Note:** These skills reference wrong paths and affiliate IDs for TileFlow UK. If you want Pinterest pin posting or content briefs for TileFlow UK, the `tileflow-content` skill should be extended or new local skills created.

---

## 8. Skills To Add / Build

Things that would be useful but don't exist yet:

| Skill to build | What it would do |
|---------------|-----------------|
| `tileflow-pinterest` | TileFlow UK–specific Pinterest pin workflow (using Canva + Zapier with correct board and branding) |
| `tileflow-seo-audit` | Combined SEO audit tailored to this site's structure and keyword clusters |
| `keystatic-content` | Helpers for adding/editing content via the Keystatic CMS panel |
| MCP Builder | Build new MCP integrations — to be added (repo TBC) |
| Caveman repo | To be added (repo TBC — please share the GitHub link) |

---

## Build Phase → Skill Mapping

Quick reference for which skills to call in each build phase:

| Phase | Skills to use |
|-------|--------------|
| 0 — Foundation | `vercel:nextjs`, `context7` |
| 1 — Navbar + Footer | `frontend-design`, `tileflow-content` |
| 2 — Homepage | `frontend-design`, `tileflow-content` |
| 3 — Shop page | `frontend-design`, `tileflow-content` |
| 4 — Product pages | `tileflow-content`, `blog-schema` |
| 5 — Blog system | `blog-write`, `tileflow-content`, `blog-seo-check`, `blog-schema` |
| 6 — Inspiration gallery | `frontend-design` |
| 7 — Best-of + guides | `blog-write`, `tileflow-content`, `blog-outline`, `blog-seo-check` |
| 8 — Secondary pages | `tileflow-content` |
| 9 — Legal pages | `tileflow-content` |
| 10 — SEO polish | `seo`, `blog-schema`, `seo-sitemap`, `seo-technical` |
| 11 — CMS + PWA | `keystatic-content` (to build), `vercel:nextjs` |
| 12 — Deployment | `vercel:deploy`, `vercel:env-vars`, `superpowers:verification-before-completion` |
| Any phase end | `superpowers:verification-before-completion`, `superpowers:requesting-code-review` |
