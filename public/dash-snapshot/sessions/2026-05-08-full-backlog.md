# TileFlow UK — Consolidated Backlog (2026-05-08)

> One tracker. Pulled from the 6 research files (2026-05-07), the 3 session reports, the Awin audit, TOMORROW.md, and core memories. Items already shipped in PRs #7, #8, #9, #11, #12, #13, #15 are excluded.

---

## 🔴 Needs Brandon's input (blocked until he acts)

<!-- Awin: PARKED 2026-05-08. Brandon tried, got rejected by most merchants. Revisit when traffic > ~10k sessions/month. Stay 100% Amazon for now. -->

- **Microsoft Clarity sign-up + Project ID.** 5-min self-serve at clarity.microsoft.com, hand back the Project ID. Blocked: cannot drop the tag into GTM without it; without Clarity the 0% conversion diagnosis stays a guess. Source: `04-cro-landing-pages.md` §Top 5 #1.
- **GA4 attribution → data-driven.** GA4 Admin → Attribution settings → switch to Data-driven. Brandon-only UI click. Blocked: Claude has no UI access to GA4 settings. Source: `01-tech-audit-analytics.md` §6.4.
- **Sentry DSN paste into `.zshenv`.** Brandon copies DSN from sentry.io project settings. Blocked: error monitoring stays dark until pasted.
- **Read the new Amazon Operating Agreement (effective 10 April 2026).** Brandon to scan the diff (link disclosure rules, image hot-linking, US-state terms) and confirm TileFlow's compliance call. Blocked: legal interpretation is his, not Claude's. Source: `00-master-summary.md` §Urgent #2.
<!-- KILLED 2026-05-08 by Brandon — do not re-suggest:
     • TTA membership (no value at this stage)
     • £5 sample-box programme (parked permanently — not part of strategy) -->
- **Tile calculator final spec.** Brandon to sanity-check inputs/outputs (room m² + tile size + waste % + grout?) before code. Source: same.
- **Read + greenlight the 3 unmerged blog drafts** (`content/blog/how-to-tile-a-wall.mdx`, `tanking-a-wet-room.mdx`, `tiling-onto-floorboards.mdx`). Drafts are publish-ready. Blocked: never publish without his "yes". Source: `2026-05-07-overnight-shipped.md` §Open follow-ups.
- **Memory walkthrough — 5 drafts in `projects/drafts/memory-files-2026-05-04/`.** Interactive — Brandon must react/edit. Source: `2026-05-08-decisions-snapshot.md`.
- **TikTok bio link confirmation + UTMs.** Brandon owns the bio; he updates the link or hands the login. Blocked: Claude can't edit TikTok bio. Source: `04-cro-landing-pages.md` §Top 5 #3.
- **GSC ownership re-verification (if Indexing API breaks again).** GSC → Settings → Users and permissions → confirm OAuth account = Owner. Source: `2026-05-08-autonomous-execution.md` §Indexing API failed.

---

## 🟢 Autonomous (Claude can do without input) — priority order

### Legal / Compliance

- **Add documented data-protection complaints procedure** at `/data-rights` with a contact form (mandatory under DUAA from 19 June 2026). Source: `00-master-summary.md` §This Month Legal #5. Size: S. Impact: legal.
- **Write `/returns` page** covering 14-day cooling-off, refund window, made-to-order exclusions, return-postage owner (Consumer Rights Act 2015 + Consumer Contracts Regs 2013). Source: `05-additional-questions.md` §3. Size: S. Impact: legal / pre-empts checkout.
- **Refresh `/privacy`** with full cookie list, lawful basis, retention, ICO complaint route, named UK address, controller identity. Source: `05-additional-questions.md` §3. Size: S. Impact: legal.
- **Refresh `/terms`** for VAT-inclusive pricing, 14-day cancellation, made-to-order exclusions, ADR/ODR. Source: same. Size: S. Impact: legal.
- **Disable GA4 Google Signals + product-data sharing** (so the DUAA analytics-cookie exemption applies). Source: `01-tech-audit-analytics.md` §6.2. Size: S. Impact: legal / removes need for cookie banner on UK traffic.
- **Move `#ad` / Amazon Associates disclosure above the fold** on every affiliate-bearing page (ASA rule, currently buried below fold on some). Source: `00-master-summary.md` §This Month Legal #2. Size: S. Impact: legal.
- **`<AffiliateDisclosure />` reusable component** auto-rendered on every blog/guide MDX layout (replaces the manual gate publish-gate keeps catching). Source: `2026-05-07-overnight-shipped.md` §Open follow-ups + TOMORROW.md. Size: M. Impact: legal / a11y prevention.
- **WCAG 2.2 AA pass** — alt text on every product image, focus rings, 4.5:1 contrast, label-input ties, keyboard reach for affiliate buttons, `lang="en-GB"`, skip-to-content, heading hierarchy, reduced-motion honoured. Run axe DevTools on `/shop/*`. Source: `01-tech-audit-analytics.md` §1.2 + `05-additional-questions.md` §3. Size: M. Impact: a11y / EAA legal exposure.
- **Add `pa11y-ci` to GitHub Actions** so every PR runs an accessibility check. Source: `01-tech-audit-analytics.md` §1.2. Size: S. Impact: a11y / regression prevention.

### SEO / AI Search

- **FAQPage schema on the remaining 8 posts** (Tier 2 covered 9 more; finish the rest of the library). Source: `00-master-summary.md` §This Week SEO #2. Size: M. Impact: SEO / AI citation.
- **Author bio + `Person` schema with LinkedIn `sameAs`** rendered on every post via the new `AuthorByline` component (PR #15 component exists; coverage gap remains on older pages). Source: `03-seo-marketing-channels.md` §5. Size: S. Impact: E-E-A-T / AI citation.
- **Rewrite first 50 words of all 11 posts to answer-first format.** Source: `03-seo-marketing-channels.md` §5. Size: M. Impact: AI citation / featured snippet.
- **GSC opportunity refresh — pos 8–20 queries with 100+ impressions and CTR <2%.** Export, sort, refresh top 10 with PAA-driven sections. Source: `03-seo-marketing-channels.md` §1 + §3. Size: M. Impact: SEO (10× traffic on existing assets).
- **Build `/guides/tile-levelling-clips-explained` + `/guides/grout-haze-removal` + `/guides/tile-spacers-buying-guide`** — referenced as placement targets, currently 404. Source: TOMORROW.md §Autonomous-ready. Size: M. Impact: SEO / affiliate placement.
- **Ship `llms.txt`** (already partially live per PR #13; verify file structure + extend). Source: `00-master-summary.md` §This Week SEO #5. Size: S. Impact: AI citation (low-but-real upside).
- **Submit IndexNow ping** in addition to Google Indexing API (Bing/Yandex). Add `"bing": { "indexNow": true }` to `vercel.json` or call API direct. Source: `01-tech-audit-analytics.md` §1.3. Size: S. Impact: SEO.
- **Build hub-and-spoke internal linking** — category hubs ("Bathroom Tiles") feeding spokes, lateral links between spokes. Source: `05-additional-questions.md` §5 mistake #9. Size: M. Impact: SEO.
- **Comparison-table format** propagated to every "best of" + product comparison post (currently only on sigma-vs-rubi). Source: `03-seo-marketing-channels.md` §4. Size: M. Impact: SEO / AI citation.
- **Add `web-vitals` package + log INP/LCP into GA4** as custom events for real-user CWV data. Source: `01-tech-audit-analytics.md` §1.1. Size: S. Impact: SEO measurement.

### Conversion / CRO

- **Build the UK tile calculator** — single-page widget (room m² → tile count + waste %). None of Topps, Walls and Floors, Tile Mountain, Tile Giant feature one prominently. Source: `00-master-summary.md` §Next 6 Months + `05-additional-questions.md` §1. Size: L. Impact: revenue / SEO / lead capture.
- **Rewrite top-clicked /shop product page using NN/G 5 patterns** — hero one-liner, authority block (Brandon's photo + 15 yrs), single primary CTA above fold, trust strip, social-proof placeholder. Pick the ASIN with most `affiliate_click` events. Source: `04-cro-landing-pages.md` §Top 5 #2. Size: M. Impact: revenue.
- **Roll the rewrite pattern across all 5 launch /shop pages** once the template proves out. Source: same. Size: M. Impact: revenue.
<!-- Wire dual-listed Awin CTAs: PARKED 2026-05-08 (Brandon got rejected on Awin merchants). Revisit when traffic > ~10k/mo and we re-apply. -->
- **Promote 25 unused verified Amazon ASINs** to `/shop` product pages. Source: TOMORROW.md §Autonomous-ready. Size: M. Impact: revenue.
- **Trust strip near every "Buy" CTA** — padlock, returns badge, "Picked by a 15-year tiler". Source: `04-cro-landing-pages.md` §5. Size: S. Impact: revenue.
- **Add real reviews / testimonial block** with photo per product page (placeholder until first quote arrives). Source: same. Size: S. Impact: revenue.

### Content / Channels

- **Pinterest fresh-pin push** — 5 pin variants per top guide across the 13 (mostly empty) boards. Schedule via the existing Buffer subscription. Source: `00-master-summary.md` §Next 6 Months + `05-additional-questions.md` §2. Size: L. Impact: traffic.
- **Reddit + Tilers' Forum participation cadence** — 1 daily answer on r/DIYUK + r/Tiling, 1 on Tilers' Forum, 1 weekly Featured.com pitch. Source: `03-seo-marketing-channels.md` §Top 5 #4. Size: M (ongoing). Impact: AI citation (Reddit cited at ~40% across major engines) + backlinks.
- **Lead magnet PDF** — "7 Mistakes UK Homeowners Make Hiring a Tiler" or "DIY Tiling Tools Brandon Actually Uses". Source: `03-seo-marketing-channels.md` §3 + `00-master-summary.md` §This Week SEO #3. Size: M. Impact: email list.
- **MailerLite free-tier setup + signup forms** above-fold on every guide, after first H2, exit-intent backup, double opt-in. Source: `04-cro-landing-pages.md` §4. Size: M. Impact: owned audience.
- **3-email welcome sequence** (lead magnet → 5 best guides → 1 affiliate offer). Source: `03-seo-marketing-channels.md` §3. Size: S. Impact: email revenue.
- **Repurposing playbook (1 blog → 7 channels)** — TikTok, YT Short, Pinterest pin, IG Reel, X/Threads thread, email excerpt, Reddit answer. Buffer + PostEverywhere + CapCut, all free. Source: `05-additional-questions.md` §6. Size: M (per post, after template). Impact: traffic.
- **Outreach scripts to 3 trade publications** (Homebuilding & Renovating, Ideal Home, Real Homes) via Featured.com / Connectively. Source: `03-seo-marketing-channels.md` §2. Size: M. Impact: backlinks / E-E-A-T.

### Technical / Performance

- **Migrate to Next 16 Cache Components** (`"use cache"` + `cacheLife()` + `cacheTag()`) at the data-fetch level — static MDX shells render instantly, affiliate/product blocks stay fresh. Source: `01-tech-audit-analytics.md` §1.1. Size: M. Impact: SEO / CWV.
- **Move article pages to ISR** with `revalidate: 86400`. Source: same. Size: S. Impact: SEO / performance.
- **Audit + swap any remaining `<img>` for `next/image`** with explicit `width`/`height` + `sizes`. Source: same. Size: M. Impact: CWV (CLS).
- **Replace Amazon-hosted product images** (m.media-amazon.com) with local hi-res photos on the 5 launch /shop pages. Source: `2026-05-07-overnight-shipped.md`. Size: M. Impact: AOA compliance / brand.
- **Switch amzn.to shortlinks to direct `amazon.co.uk/dp/{ASIN}?tag=tileflowuk-21`** for one less HTTP hop. Source: `2026-05-07-overnight-shipped.md` §Affiliate audit. Size: S. Impact: performance / link integrity.

### Tooling / Automation

- **Run `/less-permission-prompts`** (auto-allowlists repeated bash + MCP commands). Source: `02-claude-code-capabilities.md` §1.2. Size: S. Impact: workflow speed.
- **Install Lighthouse / PageSpeed MCP** for post-deploy CWV checks on every PR. Source: `02-claude-code-capabilities.md` §3.1. Size: S. Impact: tooling.
- **Install `claude-seo` skill** (backlinks + Maps intelligence + 12 subagents). Source: `02-claude-code-capabilities.md` §2.1. Size: S. Impact: tooling.
- **Install `seo-geo-claude-skills`** (passage-citability scoring for AI Overview readiness). Source: `02-claude-code-capabilities.md` §2.2. Size: S. Impact: tooling.
- **Wire `tileflow-publish-gate` + `tileflow-schema-validator` into a `.git/hooks/pre-commit`** so invalid MDX/schema can't ship. Source: `02-claude-code-capabilities.md` §Top 5 #5. Size: S. Impact: regression prevention.
- **Broken-link monitor on GitHub Actions** (`lychee` or `linkinator`, weekly cron). Source: `05-additional-questions.md` §4. Size: S. Impact: hygiene.
- **GA4 → Notion weekly digest cron** on GitHub Actions. Source: same. Size: S. Impact: reporting.
- **Fix `claude-mem` `mcp-search` plugin** — currently `✗ Failed to connect`. Source: TOMORROW.md §Open follow-ups. Size: S. Impact: tooling.

---

## 📦 Parked / explicitly out of scope

- **Stripe checkout for direct tile sales** — separate 1-2 week project, parked until calculator + redirects land. Source: `00-master-summary.md` §This Month + `2026-05-08-decisions-snapshot.md`.
- **TikTok Shop UK affiliate application** — high-leverage but Brandon-decision; parked. Source: `05-additional-questions.md` §2.
- **Move off Vercel** — switching costs > savings until ~250k visits/month or ~£40/mo bill. Source: `01-tech-audit-analytics.md` §1.5.
- **Switch frontend framework (Astro / Remix / SvelteKit / Eleventy)** — Next 16 stays. Source: `01-tech-audit-analytics.md` §1.6.
- **DataForSEO / Ahrefs / SEMrush / Similarweb (paid)** — vetoed. Source: master.
- **Apify Starter, Postiz** — vetoed. Source: master.
- **Zapier, Make.com** — vetoed (use GitHub Actions / n8n self-hosted). Source: standing rule.
- **Google Ads paid spend** — too expensive (£3–£6 UK CPC) until checkout exists. Source: `00-master-summary.md`.
- **LinkedIn / Threads / Bluesky** — wrong audience for tiling. Source: same.
- **Discord community** — wrong shape for tiling audience. Source: same.
- **Heavy local SEO ("tiler near me")** — Brandon is a content site, not a tradesman taking jobs. Source: `03-seo-marketing-channels.md` §6.
- **Hotjar / FullStory / Smartlook** — Clarity covers it free. Source: `04-cro-landing-pages.md` §3.
- **Plausible / Fathom / paid analytics** — GA4 + Clarity + Vercel Analytics is the indie stack. Source: `01-tech-audit-analytics.md` §6.1.
- **Formal A/B testing tool** — TileFlow's traffic too low for stat-sig. Use directional tests + Clarity replays. Source: `04-cro-landing-pages.md` §2.
- **Repurpose.io (~£25/mo)** — not yet; Buffer + PostEverywhere + CapCut covers free path. Source: `05-additional-questions.md` §6.

---

## ⭐ Top 5 highest-leverage moves right now

1. **Build the UK tile calculator.** Replaces the decision overhead Amazon can't fix; ranks for "tile calculator UK" + every "how many tiles" long-tail; none of the big chains lead with one. Compounds traffic + lead-magnet + brand moat in a single asset.
2. **Rewrite the top-clicked /shop page to the NN/G 5-pattern template, then roll the template across all 5.** The 0/57 conversion problem is mostly underbuilt product pages; this is the single biggest free revenue lift available right now.
3. **Promote 24 unused verified Amazon ASINs to /shop pages.** They're already in `data/affiliateLinks.ts` but not surfaced — pure latent revenue. (Replaces previous Awin recommendation, which is parked until traffic earns approvals.)
4. **Finish FAQPage schema + answer-first rewrite + `Person` byline across the rest of the library.** AI-Overview citation is now decoupled from rank position (~38% cited from outside top 10) — TileFlow's 15-yr-tiler authority signal is the moat, but it only fires when the schema is in place.
5. **Lead magnet PDF + MailerLite signup above-fold on every guide.** 1,440 sessions/month at 0% email capture is pure leak; an owned audience decouples TileFlow from a TikTok algo shock and stacks on every later launch (calculator, Stripe).

---

*Compiled 2026-05-08 evening from the 6 research files (`projects/research/2026-05-07/`), 3 session reports, the Awin audit, TOMORROW.md, and core memories. UK English throughout.*
