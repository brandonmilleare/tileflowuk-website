# Product image pipeline

Two scripts. One purpose: **wrong-image incidents become structurally impossible**.

## The gate (always on)

`scripts/products/check-images.mjs` — runs in 3 places:

1. **Pre-commit hook** (`.githooks/pre-commit`) — blocks commits that change `data/products.ts` or `public/images/products/*` if any product is missing its image.
2. **Pre-build** (`npm run build`) — fails the build before Vercel deploys.
3. **GitHub Actions** (`.github/workflows/product-image-gate.yml`) — runs on PR + push to `main`, fails CI if a product is missing its image.

Bypassing the gate requires `git commit --no-verify` AND a CI failure on push. So a wrong image getting to production needs deliberate effort.

```bash
npm run check:images           # verbose pass/fail
node scripts/products/check-images.mjs --report   # JSON
```

## The fetcher (manual or Apify)

`scripts/products/fetch-image.mjs` — downloads a verified image to `public/images/products/<slug>.jpg`.

### Mode 1 — Manual SiteStripe (zero spend, zero signups)

1. Open `https://www.amazon.co.uk/dp/<ASIN>` while signed in to Amazon Associates.
2. SiteStripe bar at top → **Get Image** → choose Large → right-click → Copy image address.
3. Run:
   ```bash
   node scripts/products/fetch-image.mjs <slug> "https://m.media-amazon.com/images/I/...jpg"
   ```

Image lands at `public/images/products/<slug>.jpg`. Pre-commit gate immediately confirms it.

Time per product: ~90 sec.

### Mode 2 — Apify (gated on Brandon's "yes")

**Requires:** `APIFY_TOKEN` in `.env.local`. Token comes from a free Apify account. Cost: under £1/year at our scale (free tier covers it).

```bash
node scripts/products/fetch-image.mjs <slug> --asin B0XXXXXXXX
```

Apify hits Amazon (not us), returns the official image URL + product title, we download to disk. ToS risk lives with Apify, not the `tileflowuk-21` affiliate tag.

### Mode 3 — Batch from CSV

`scripts/products/backfill.csv` is the staging file. Format: `slug,asin,imageUrl`.

- Leave `imageUrl` blank → fetcher uses Apify with the ASIN (requires `APIFY_TOKEN`).
- Fill `imageUrl` from SiteStripe → fetcher downloads directly (no Apify needed).

```bash
node scripts/products/fetch-image.mjs --batch scripts/products/backfill.csv
```

The current `backfill.csv` is pre-seeded with the 10 placeholder products that were removed on 2026-05-09. Once images land, they can be re-added to `data/products.ts`.

## The 3 wrong-product mismatches (need re-evaluation, not just images)

These got removed because the wrong ASIN was linked AND the image was wrong:

- `sigma-4dn-95cm` — ASIN `B0BSXQG3WQ` returned a RUBI Slab System (not a Sigma cutter)
- `rubi-rdxa35-tile-cutter` — ASIN `B0CQK55C9X` is "RUBI Slim Cutter G2" (not RDXA 35)
- `tile-drill-bits-kit` — ASIN `B0CF1MDPPQ` is a hole-saw kit (description claimed 6–25mm tile drill bits)

**Action:** Brandon picks the *correct* ASIN for each product before re-adding. Not in the backfill CSV.
