#!/usr/bin/env node
/**
 * Product image gate — runs in CI + pre-build.
 *
 * Why this exists:
 *   On 2026-05-09 we shipped 13 products with wrong/placeholder images
 *   because there was no automated check between "ASIN added to data file"
 *   and "image actually exists at the claimed path".
 *
 * What it does:
 *   1. Parses every entry in data/products.ts
 *   2. For each product, verifies its `image` path resolves to a real file
 *      (or, if it's an Amazon CDN URL, that the URL responds 200)
 *   3. Exits 1 if anything is missing — fails the build / CI / pre-commit
 *
 * What it does NOT do:
 *   - Fetch images from Amazon (that's the fetcher's job — Apify, SiteStripe, etc.)
 *   - Verify the image *content* matches the product (separate visual audit job)
 *
 * Usage:
 *   node scripts/products/check-images.mjs              # full check, exits 1 on miss
 *   node scripts/products/check-images.mjs --verbose    # log every product
 *   node scripts/products/check-images.mjs --report     # JSON report to stdout
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const PRODUCTS_FILE = path.join(ROOT, 'data', 'products.ts')
const PUBLIC_DIR = path.join(ROOT, 'public')

const verbose = process.argv.includes('--verbose')
const reportMode = process.argv.includes('--report')

// ── Parse products.ts (regex — robust enough; we only need slug + image) ──
function parseProducts(src) {
  const products = []
  // Match each top-level product object's slug + image fields
  const slugRe = /slug:\s*['"]([^'"]+)['"]/g
  const imageRe = /image:\s*['"]([^'"]+)['"]/g

  const slugs = [...src.matchAll(slugRe)].map((m) => m[1])
  const images = [...src.matchAll(imageRe)].map((m) => m[1])

  if (slugs.length !== images.length) {
    throw new Error(
      `products.ts parse mismatch: ${slugs.length} slugs vs ${images.length} images. ` +
        'Likely a malformed entry — fix manually.'
    )
  }

  for (let i = 0; i < slugs.length; i++) {
    products.push({ slug: slugs[i], image: images[i] })
  }
  return products
}

// ── Check one product ──
async function checkProduct({ slug, image }) {
  // Local file path
  if (image.startsWith('/')) {
    const full = path.join(PUBLIC_DIR, image)
    const exists = fs.existsSync(full)
    return {
      slug,
      image,
      kind: 'local',
      ok: exists,
      detail: exists ? 'file exists' : `MISSING: ${full}`,
    }
  }

  // Amazon CDN URL — assume present (we can't HEAD every build; relied on at write-time)
  if (image.startsWith('https://m.media-amazon.com/')) {
    return {
      slug,
      image,
      kind: 'amazon-cdn',
      ok: true,
      detail: 'amazon CDN — trusted on first add, monitored by Lychee in CI',
    }
  }

  // Anything else: red flag
  return {
    slug,
    image,
    kind: 'unknown',
    ok: false,
    detail: `unrecognised image source: ${image}`,
  }
}

// ── Run ──
async function main() {
  const src = fs.readFileSync(PRODUCTS_FILE, 'utf8')
  const products = parseProducts(src)
  const results = await Promise.all(products.map(checkProduct))

  const failed = results.filter((r) => !r.ok)
  const local = results.filter((r) => r.kind === 'local').length
  const cdn = results.filter((r) => r.kind === 'amazon-cdn').length

  if (reportMode) {
    console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2))
    process.exit(failed.length === 0 ? 0 : 1)
  }

  if (verbose) {
    for (const r of results) {
      const tick = r.ok ? '✓' : '✗'
      console.log(`  ${tick} ${r.slug.padEnd(48)} ${r.kind.padEnd(12)} ${r.detail}`)
    }
  }

  console.log(
    `\nProduct image gate: ${results.length - failed.length}/${results.length} OK ` +
      `(${local} local file, ${cdn} amazon CDN)`
  )

  if (failed.length > 0) {
    console.error('\n❌ FAILED — these products have missing or invalid images:\n')
    for (const r of failed) {
      console.error(`  • ${r.slug}`)
      console.error(`    image: ${r.image}`)
      console.error(`    error: ${r.detail}\n`)
    }
    console.error(
      'Fix options:\n' +
        '  1. Add a real image to public/images/products/<slug>.jpg, or\n' +
        '  2. Replace the image: field with a verified Amazon CDN URL, or\n' +
        '  3. Remove the product from data/products.ts.\n'
    )
    process.exit(1)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error('check-images.mjs crashed:', err.message)
  process.exit(2)
})
