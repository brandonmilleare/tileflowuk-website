# TileFlow UK — Website To-do

Last updated: 2026-04-21
Owner: Brandon

Plain English to-do list for everything outstanding on **tileflowuk.com**.
Tick the box when done. Add new items at the bottom of the right section.

---

## Done — reference

- [x] `/tiles` preview page live at tileflowuk.com/tiles (2026-04-21)
- [x] 7 Wex tile preview pages with Product schema (PreOrder)
- [x] "Tiles" link added to Navbar (2nd position) and Footer
- [x] Sitemap includes `/tiles` + all 7 tile slugs
- [x] "Enquire for early access" mailto buttons → tileflowuk@gmail.com
- [x] Ad-studio page built (4 formats) — saved, not deployed yet
- [x] Research done on tile/reno social hooks and hashtags

---

## Tile range (priority — revenue line)

- [ ] Get real tile photos from Wex supplier — current photos are PDF spec sheets converted to JPG
- [ ] Drop new photos into `public/images/tiles/` with same filenames → updates site automatically
- [ ] Confirm prices with Wex supplier
- [ ] Add prices to `data/tiles.ts` (replace "Coming Soon" badge with real £ price)
- [ ] Add sizes, finishes, full spec per tile once known
- [ ] Decide long-term: enquire-only vs Stripe checkout on site
- [ ] Agree delivery / shipping policy for tiles (UK-wide, local only, collection?)
- [ ] Agree returns policy for tiles
- [ ] Write up supplier ordering process — how does an enquiry email become a paid sale?

---

## Ad studio (paused — come back to this)

- [ ] Review redesigned ads at `localhost:3000/ad-studio/tiles` (bigger photos, no blank space)
- [ ] Decide: deploy ad-studio to `tileflowuk.com/ad-studio/tiles` (hidden from Google, phone-accessible)
- [ ] Post one ad per platform (Pinterest, Instagram, TikTok) — track clicks to /tiles
- [ ] A/B test 3-5 different hook lines on each platform
- [ ] Add per-tile ads once real tile photos arrive
- [ ] Add video ad templates (TikTok / Reels) once first photos are in

---

## SEO — get /tiles ranking

- [ ] Submit `tileflowuk.com/tiles` to Google Search Console for indexing
- [ ] Submit all 7 `/tiles/[slug]` pages to Search Console
- [ ] Check rich-result preview in Google's Rich Results Test (Product + Breadcrumb schema)
- [ ] Monitor indexation weekly for 4 weeks
- [ ] Add internal links from existing blog posts → `/tiles` where the topic fits
- [ ] Add internal links from guides → `/tiles` where the topic fits
- [ ] Once prices are set, resubmit to Search Console (availability: InStock vs PreOrder)

---

## Content to write (drives /tiles traffic)

- [ ] Blog post: *"2026 UK bathroom tile trends — what's actually changing"* (links to /tiles)
- [ ] Blog post: *"Dark green tiles in the UK — Quartz Jade deep dive"*
- [ ] Blog post: *"Marble-effect porcelain vs real marble for UK bathrooms"* (Delphi)
- [ ] Blog post: *"Terrazzo is back — here's a modern take"* (Flurry)
- [ ] Guide: *"How to pick the right tile for your project"* (linking each tile range)
- [ ] Inspiration gallery entry per tile range once real photos arrive

---

## Pinterest (blocked until OAuth)

- [ ] Run Pinterest OAuth: `node scripts/pinterest/oauth.mjs`
- [ ] Paste `PINTEREST_REFRESH_TOKEN` into `~/.zshenv`
- [ ] Auto-post first tile pin to @tileflowuk
- [ ] Set up scheduled pinning cadence (e.g. 2 pins per day via GitHub Actions)

---

## Admin / legal

- [ ] Update Terms of Use to cover physical tile sales
- [ ] Update Privacy Policy if collecting enquirer data (even just emails)
- [ ] Add a simple enquiry log — track who emailed, what tile, when
- [ ] VAT position — confirm if / when registration is needed

---

## Technical backlog (nice-to-have, not urgent)

- [ ] Swap PDF-converted JPGs for optimised WebP versions once real photos arrive
- [ ] Add OG preview images per tile (currently all share the Delphi image)
- [ ] Add structured data for `LocalBusiness` if doing Maps SEO later
- [ ] Consider a `/ranges/wex` page if more supplier ranges come on board
- [ ] Add "recently viewed tiles" memory on the frontend
- [ ] Move tile data out of `data/tiles.ts` into a CMS once list grows past 20

---

## How to use this file

- **Add a task:** drop it in the right section with `- [ ] Short description`
- **Mark done:** change `[ ]` to `[x]` and move it up to the `Done — reference` section with a date
- **Update the date at the top** when you edit
- Keep items short. One sentence. Plain English.
