#!/usr/bin/env node
/**
 * build-preview-data.mjs
 *
 * Reads the Apify sidecar JSON files for the 23 ASIN preview batch and writes
 * data/preview-products.ts — a typed, static product list grouped by category.
 *
 * Run after `scripts/products/fetch-image.mjs --batch scripts/products/preview-batch-2026-05-16.csv`
 * has populated public/images/products/<slug>.amazon.json files.
 *
 * Categories:
 *   - 'Prep'        — tile backer boards, washers, primer, screws, tanking
 *   - 'Adhesives'   — tile adhesives, flexible / rapid-set / ready-mix
 *   - 'Application Tools'       — trowels, floats, buckets, sponges, grouting tools
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const IMG_DIR = path.join(ROOT, 'public', 'images', 'products')
const OUT_FILE = path.join(ROOT, 'data', 'preview-products.ts')
const CSV_PATH = path.join(__dirname, 'preview-batch-2026-05-16.csv')

const CATEGORY_MAP = {
  'thermopanel-tile-backer-board-10mm': 'Prep',
  'muklei-insulation-washers-stainless': 'Prep',
  'imperial-studios-tile-primer': 'Prep',
  'timco-stainless-screws-classic': 'Prep',
  'hyload-tanking-membrane-adhesive': 'Prep',
  'ob1-grey-tanking-solution': 'Prep',
  'mapei-mapegum-tanking-membrane': 'Prep',
  'mapeker-rapid-flex-adhesive': 'Adhesives',
  'bal-flex-one-adhesive': 'Adhesives',
  'standard-tile-adhesive-white-20kg': 'Adhesives',
  'bal-rapid-flex-one-adhesive': 'Adhesives',
  'ready-mix-adhesive-ceramic-mosaic-v1': 'Adhesives',
  'ready-mix-adhesive-ceramic-mosaic-v2': 'Adhesives',
  'professional-tiling-trowels-set': 'Application Tools',
  'ox-tools-stainless-trowel-12mm': 'Application Tools',
  'peohud-stainless-finishing-trowel': 'Application Tools',
  'ox-bucket-trowel-stainless': 'Application Tools',
  'ox-sponge-float': 'Application Tools',
  'vitrex-grouting-tool-set': 'Application Tools',
  'kmj-mixing-bucket': 'Application Tools',
  'plasterers-bucket': 'Application Tools',
  'professional-washboy-grouting-sponge': 'Application Tools',
  'vitrex-2901-soft-grout-float': 'Application Tools',
}

const AMAZON_TAG = 'tileflowuk-21'

function readCsv() {
  const src = fs.readFileSync(CSV_PATH, 'utf8')
  return src
    .trim()
    .split('\n')
    .slice(1)
    .map(l => l.split(',').map(s => s?.trim()))
    .filter(r => r[0] && r[1])
}

function imageExt(slug) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    if (fs.existsSync(path.join(IMG_DIR, `${slug}.${ext}`))) return ext
  }
  return null
}

function loadSidecar(slug) {
  const f = path.join(IMG_DIR, `${slug}.amazon.json`)
  if (!fs.existsSync(f)) return null
  try {
    return JSON.parse(fs.readFileSync(f, 'utf8'))
  } catch {
    return null
  }
}

function escapeStr(s) {
  if (s == null) return ''
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function build() {
  const rows = readCsv()
  const products = []
  const missing = []

  for (const [slug, asin] of rows) {
    const sidecar = loadSidecar(slug)
    const ext = imageExt(slug)

    if (!sidecar) {
      missing.push({ slug, asin, reason: 'no sidecar JSON' })
      continue
    }
    // Image missing is tolerated — product still shows with an image-unavailable state.

    const category = CATEGORY_MAP[slug] || 'Application Tools'
    const title = sidecar.title || slug
    const brand = sidecar.brand || ''
    const price = sidecar.price?.value ?? 0
    const rating = sidecar.stars ?? 0
    const reviewCount = sidecar.reviewsCount ?? 0
    const features = Array.isArray(sidecar.features)
      ? Array.from(new Set(sidecar.features)).slice(0, 5)
      : []
    const description = sidecar.description || features[0] || title

    products.push({
      slug,
      asin,
      category,
      title,
      brand,
      price,
      rating,
      reviewCount,
      description,
      features,
      image: ext ? `/images/products/${slug}.${ext}` : '',
      affiliateUrl: `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`,
    })
  }

  const header = `/**
 * preview-products.ts — GENERATED FILE, do not edit by hand.
 * Run scripts/products/build-preview-data.mjs to regenerate.
 *
 * Source: 23 ASINs in scripts/products/preview-batch-2026-05-16.csv
 * Data:   Apify sidecar JSONs in public/images/products/<slug>.amazon.json
 * Built:  ${new Date().toISOString()}
 */

export type PreviewCategory = 'Prep' | 'Adhesives' | 'Application Tools'

export interface PreviewProduct {
  slug: string
  asin: string
  category: PreviewCategory
  title: string
  brand: string
  price: number
  rating: number
  reviewCount: number
  description: string
  features: string[]
  image: string
  affiliateUrl: string
}

export const previewProducts: PreviewProduct[] = ${JSON.stringify(products, null, 2)}

export const previewCategories: PreviewCategory[] = ['Prep', 'Adhesives', 'Application Tools']
`

  fs.writeFileSync(OUT_FILE, header, 'utf8')

  console.log(`✓ Wrote ${OUT_FILE}`)
  console.log(`  Products: ${products.length}`)
  if (missing.length) {
    console.log(`  Missing:  ${missing.length}`)
    for (const m of missing) console.log(`    - ${m.slug} (${m.asin}): ${m.reason}`)
  }
}

build()
