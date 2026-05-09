#!/usr/bin/env node
/**
 * Image fetcher — downloads a verified Amazon image to /public/images/products/<slug>.<ext>
 *
 * Three modes:
 *
 *   1. URL mode — paste in a SiteStripe image URL (manual / fallback)
 *      node scripts/products/fetch-image.mjs <slug> <imageUrl>
 *
 *   2. Apify mode — fetch via curious_coder/amazon-scraper actor (requires APIFY_TOKEN)
 *      node scripts/products/fetch-image.mjs <slug> --asin <ASIN>
 *
 *   3. Batch mode — read a CSV of slug,asin,imageUrl and fetch all
 *      node scripts/products/fetch-image.mjs --batch <csv-path>
 *
 * Why structured this way:
 *   The gate (check-images.mjs) doesn't care HOW the image got there. This
 *   script is the only thing that puts images into /public/images/products/.
 *   Apify-on/off is a one-line switch — pre-commit + CI gate stay identical.
 *
 * Apify integration is OFF by default — requires Brandon's "yes" + APIFY_TOKEN.
 * Without a token, runs in URL mode only (zero spend, zero signups).
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'products')

// ── Helpers ──
function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
}

function extFromUrl(url) {
  const m = url.match(/\.(jpe?g|png|webp)(\?|$)/i)
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
}

async function downloadImage(slug, imageUrl) {
  ensureOutDir()
  const ext = extFromUrl(imageUrl)
  const out = path.join(OUT_DIR, `${slug}.${ext}`)

  console.log(`→ Fetching: ${imageUrl}`)
  const res = await fetch(imageUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8',
    },
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }

  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 5_000) {
    throw new Error(`Suspiciously small image (${buf.length} bytes) — probably a placeholder`)
  }

  fs.writeFileSync(out, buf)
  console.log(`✓ Saved ${out} (${(buf.length / 1024).toFixed(1)} KB)`)
  return out
}

// ── Apify mode (gated — only fires if any APIFY_* token var is set) ──
function findApifyToken() {
  // Accept any common variable name — Brandon already has one in ~/.zshenv
  const names = ['APIFY_TOKEN', 'APIFY_API_TOKEN', 'APIFY_API_KEY', 'APIFY_KEY']
  for (const n of names) {
    if (process.env[n] && process.env[n].length > 10) return process.env[n]
  }
  return null
}

// When Apify returns null price, queue this slug+ASIN for Playwright lookup.
// Future agents can read this CSV and run Playwright via the MCP.
function queueForPlaywright(slug, asin, reason) {
  const queueFile = path.join(ROOT, 'scripts', 'products', 'playwright-queue.csv')
  const exists = fs.existsSync(queueFile)
  const row = `${slug},${asin},${reason},${new Date().toISOString()}\n`
  if (!exists) fs.writeFileSync(queueFile, 'slug,asin,reason,queuedAt\n' + row)
  else fs.appendFileSync(queueFile, row)
  console.log(`  ⚠ Queued for Playwright fallback: ${slug} (${reason})`)
  console.log(`    Queue file: ${queueFile}`)
}

async function fetchViaApify(slug, asin) {
  const token = findApifyToken()
  if (!token) {
    throw new Error(
      'No Apify token found in env (looked for APIFY_TOKEN, APIFY_API_TOKEN, APIFY_API_KEY, APIFY_KEY).\n' +
        'Either:\n' +
        '  1. Use URL mode: paste a SiteStripe image URL directly, or\n' +
        '  2. Source ~/.zshenv before running, or\n' +
        '  3. Add APIFY_TOKEN=... to website/.env.local'
    )
  }

  // Using junglee/Amazon-crawler — 15k users, explicit .co.uk support, latest build May 2026.
  // Free tier covers ~30 ASINs/month easily. ~$3/1k results.
  console.log(`→ Apify fetch for ASIN ${asin} (actor: junglee/Amazon-crawler)`)

  const startRes = await fetch(
    `https://api.apify.com/v2/acts/junglee~Amazon-crawler/runs?token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categoryOrProductUrls: [{ url: `https://www.amazon.co.uk/dp/${asin}` }],
        maxItemsPerStartUrl: 1,
        proxyCountry: 'GB',
      }),
    }
  )

  if (!startRes.ok) {
    throw new Error(`Apify start failed: HTTP ${startRes.status}`)
  }

  const { data: run } = await startRes.json()
  console.log(`  Run started: ${run.id} (waiting for completion…)`)

  // Poll for completion (free tier — small runs finish in 10–30s)
  let attempt = 0
  while (attempt++ < 60) {
    await new Promise((r) => setTimeout(r, 2000))
    const statusRes = await fetch(`https://api.apify.com/v2/actor-runs/${run.id}?token=${token}`)
    const { data: status } = await statusRes.json()
    if (status.status === 'SUCCEEDED') break
    if (status.status === 'FAILED' || status.status === 'ABORTED') {
      throw new Error(`Apify run ${status.status}`)
    }
  }

  const itemsRes = await fetch(
    `https://api.apify.com/v2/datasets/${run.defaultDatasetId}/items?token=${token}`
  )
  const items = await itemsRes.json()
  if (!items.length) throw new Error('Apify returned no items for this ASIN')

  const item = items[0]
  // junglee/Amazon-crawler returns: highResolutionImages, galleryThumbnails, thumbnailImage
  const imageUrl =
    item.highResolutionImages?.[0] ||
    item.galleryThumbnails?.[0] ||
    item.thumbnailImage ||
    item.images?.[0] ||
    item.image
  if (!imageUrl) throw new Error('No image URL in Apify response')

  // Strip size segment for original quality (e.g. ._AC_SL1100_. → .)
  const fullSizeUrl = imageUrl.replace(/\._[A-Z0-9_,]+_\./, '.')

  console.log(`  Title: ${item.title || '(no title)'}`)
  console.log(`  ASIN:  ${item.asin || asin}`)
  console.log(`  Image: ${fullSizeUrl}`)

  // If Apify returned no price, queue for Playwright fallback (Brandon's rule:
  // "use playwright when apify isnnt working"). Caller still gets the image
  // and other data — this just flags the product for a manual price check.
  if (!item.price?.value && !item.listPrice?.value) {
    queueForPlaywright(slug, asin, 'apify-no-price')
  }

  // Save the full Amazon data alongside the image so the entry-generator
  // can lift real title/price/description/features instead of guessing.
  const sidecar = path.join(OUT_DIR, `${slug}.amazon.json`)
  fs.writeFileSync(
    sidecar,
    JSON.stringify(
      {
        asin: item.asin,
        title: item.title,
        brand: item.brand,
        price: item.price,
        listPrice: item.listPrice,
        priceRange: item.priceRange,
        stars: item.stars,
        reviewsCount: item.reviewsCount,
        description: item.description,
        features: item.features,
        productOverview: item.productOverview,
        manufacturerAttributes: item.manufacturerAttributes,
        breadCrumbs: item.breadCrumbs,
        url: item.url,
        fetchedAt: new Date().toISOString(),
      },
      null,
      2
    )
  )
  console.log(`  Data:  ${sidecar}`)

  return downloadImage(slug, fullSizeUrl)
}

// ── Batch mode ──
async function batchFromCsv(csvPath) {
  const src = fs.readFileSync(csvPath, 'utf8')
  const lines = src.trim().split('\n').slice(1) // skip header
  let ok = 0
  let fail = 0
  for (const line of lines) {
    const [slug, asin, url] = line.split(',').map((s) => s?.trim())
    if (!slug) continue
    try {
      if (url) {
        await downloadImage(slug, url)
      } else if (asin) {
        await fetchViaApify(slug, asin)
      } else {
        console.error(`✗ ${slug}: needs either a URL or an ASIN`)
        fail++
        continue
      }
      ok++
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`)
      fail++
    }
  }
  console.log(`\nBatch complete: ${ok} ok, ${fail} failed`)
  if (fail > 0) process.exit(1)
}

// ── CLI ──
async function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.error('Usage:')
    console.error('  fetch-image.mjs <slug> <imageUrl>          # URL mode (manual)')
    console.error('  fetch-image.mjs <slug> --asin <ASIN>       # Apify mode (needs APIFY_TOKEN)')
    console.error('  fetch-image.mjs --batch <csv-path>          # CSV: slug,asin,imageUrl')
    process.exit(1)
  }

  if (args[0] === '--batch') {
    return batchFromCsv(args[1])
  }

  const slug = args[0]
  if (args[1] === '--asin') {
    return fetchViaApify(slug, args[2])
  }

  return downloadImage(slug, args[1])
}

main().catch((err) => {
  console.error(`✗ ${err.message}`)
  process.exit(1)
})
