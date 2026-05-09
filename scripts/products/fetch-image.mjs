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

// ── Apify mode (gated — only fires if APIFY_TOKEN is set) ──
async function fetchViaApify(slug, asin) {
  const token = process.env.APIFY_TOKEN
  if (!token) {
    throw new Error(
      'APIFY_TOKEN not set. Either:\n' +
        '  1. Use URL mode: paste a SiteStripe image URL directly, or\n' +
        '  2. Get Brandon to approve Apify free-tier sign-up + add APIFY_TOKEN to .env.local'
    )
  }

  console.log(`→ Apify fetch for ASIN ${asin} (actor: curious_coder/amazon-scraper)`)

  const startRes = await fetch(
    `https://api.apify.com/v2/acts/curious_coder~amazon-scraper/runs?token=${token}`,
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
  const imageUrl = item.images?.[0] || item.image
  if (!imageUrl) throw new Error('No image URL in Apify response')

  // Strip size segment for original quality
  const fullSizeUrl = imageUrl.replace(/\._[^.]+_\./, '.')

  console.log(`  Title: ${item.title}`)
  console.log(`  Image: ${fullSizeUrl}`)
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
