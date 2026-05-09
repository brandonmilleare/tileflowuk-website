#!/usr/bin/env node
/**
 * Build corrected product entries from Amazon JSON sidecars.
 *
 * For each public/images/products/<slug>.amazon.json, output a TS product
 * entry that uses REAL Amazon data for facts (title, price, rating,
 * description, features) instead of guessed copy.
 *
 * Pros/cons are carried over from existing entries when present (those
 * are Brandon's tiler voice). If a slug isn't yet in products.ts, it
 * scaffolds blank pros/cons + a TODO marker.
 *
 * Usage:
 *   node scripts/products/build-entries.mjs <slug-csv-or-all>
 *     e.g. node scripts/products/build-entries.mjs all
 *     e.g. node scripts/products/build-entries.mjs sigma-2g-37cm-tile-cutter,dewalt-dcd240x2-paddle-mixer
 *
 * Outputs cleaned TypeScript entries to stdout — pipe / paste into products.ts.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const SIDECAR_DIR = path.join(ROOT, 'public', 'images', 'products')
const PRODUCTS_FILE = path.join(ROOT, 'data', 'products.ts')

// ── Mapping rules — slug → category, affiliate key, badge override ──
// Edit when adding new slugs. Categories must match ProductCategory union.
const SLUG_RULES = {
  'sigma-2g-37cm-tile-cutter': {
    category: 'Tile Cutters',
    affiliateKey: 'sigmaSmall37',
    shortName: 'Sigma 2G 37cm',
    badge: undefined,
  },
  'dewalt-dcd240x2-paddle-mixer': {
    category: 'Mixing Tools',
    affiliateKey: 'dewaltMixer',
    shortName: 'DEWALT DCD240X2',
    badge: 'Pro Choice',
  },
  'tool-depot-mlt-400-levelling-system': {
    category: 'Tile Levelling',
    affiliateKey: 'toolDepotMlt400',
    shortName: 'Tool Depot 400-pc MLT',
    badge: 'Best Value',
  },
  'vitrex-3mm-tile-spacers-400pk': {
    category: 'Tile Spacers',
    affiliateKey: 'vitrex3mmSpacers400',
    shortName: 'Vitrex 3mm × 400',
    badge: undefined,
  },
  'ox-pro-12mm-notch-trowel': {
    category: 'Trowels',
    affiliateKey: 'oxPro12mmTrowel',
    shortName: 'OX Pro 12mm Trowel',
    badge: 'Pro Choice',
  },
  'e-cloth-bathroom-cleaning-pack': {
    category: 'Tile Cleaners',
    affiliateKey: 'eclothBathroom',
    shortName: 'E-Cloth Bathroom',
    badge: 'Best Value',
  },
  'lithofin-fz-intensive-cleaner-1l': {
    category: 'Tile Cleaners',
    affiliateKey: 'lithofinFzIntensive',
    shortName: 'Lithofin FZ',
    badge: 'Pro Choice',
  },
  'toughbuilt-gelfit-snap-shell-knee-pads': {
    category: 'Knee Pads',
    affiliateKey: 'toughbuiltSnapShell',
    shortName: 'ToughBuilt Snap-Shell',
    badge: undefined,
  },
  'faithfull-faimp100-mixing-paddle': {
    category: 'Mixing Tools',
    affiliateKey: 'faithfullPaddle100',
    shortName: 'Faithfull FAIMP100',
    badge: 'Best Value',
  },
  'ketoplastics-26l-flexi-tub-pack-of-5': {
    category: 'Mixing Buckets',
    affiliateKey: 'ketoFlexiTub26L5',
    shortName: 'KetoPlastics 26L × 5',
    badge: 'Best Value',
  },
}

// ── Helpers ──
function escapeQuotes(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function cleanDescription(raw, features = []) {
  // Strip noisy delivery boilerplate, marketing fluff. Keep first
  // factual sentence or two. If description is empty, stitch from features.
  let d = (raw || '').trim()

  // Strip "This product will only be delivered to Mainland UK" + similar
  d = d.replace(/^This product will only be delivered to[^.]+\.\s*/gi, '')
  d = d.replace(/^Product Description[\s\n]*/gi, '')

  // Take first 2 sentences, max ~280 chars
  const sentences = d.split(/(?<=[.!?])\s+/).filter(Boolean)
  let chosen = ''
  for (const s of sentences) {
    if ((chosen + ' ' + s).length > 280) break
    chosen = chosen ? chosen + ' ' + s : s
  }
  if (chosen.length > 30) return chosen

  // Fallback: stitch first 2 features
  if (features.length) {
    return features
      .slice(0, 2)
      .map((f) => (f || '').trim().replace(/[.•:]+$/, ''))
      .filter(Boolean)
      .join('. ')
      .slice(0, 280)
  }

  return ''
}

function pickPrice(d) {
  const cur = d.price?.value ?? d.listPrice?.value ?? null
  return cur
}

function specsFromOverview(productOverview = [], features = [], attrs = []) {
  const specs = {}
  // Tier 1: productOverview is gold — Amazon's structured spec table
  if (Array.isArray(productOverview)) {
    for (const o of productOverview) {
      if (o?.key && o?.value && Object.keys(specs).length < 6) {
        const k = String(o.key).slice(0, 28)
        const v = String(o.value).slice(0, 60)
        // Skip uninteresting Amazon defaults
        if (/^(Brand|Special feature)$/i.test(k)) continue
        specs[k] = v
      }
    }
  }
  // Tier 2: manufacturerAttributes (rare on UK listings but try)
  if (Array.isArray(attrs)) {
    for (const a of attrs) {
      if (a?.name && a?.value && Object.keys(specs).length < 6) {
        specs[String(a.name).slice(0, 28)] = String(a.value).slice(0, 60)
      }
    }
  }
  // Tier 3: parse "Key: Value" patterns from features (last resort)
  if (Object.keys(specs).length === 0) {
    for (const f of features) {
      const text = (f || '').trim()
      const m = text.match(/^([A-Z][a-zA-Z ]{2,20}):\s*([^.]+)/)
      if (m && Object.keys(specs).length < 5) {
        specs[m[1].trim()] = m[2].trim().slice(0, 60)
      }
    }
  }
  return specs
}

// Existing entry extractor — pulls pros/cons + price/rating overrides for slugs
// that already exist in products.ts. Carries Brandon's voice across.
function extractExistingPosCons(slug) {
  const src = fs.readFileSync(PRODUCTS_FILE, 'utf8')
  // Find the block for this slug
  const slugIdx = src.indexOf(`slug: '${slug}'`)
  if (slugIdx === -1) return { pros: null, cons: null }
  // Find matching block end (next '},' at appropriate brace level)
  const blockEnd = src.indexOf('\n  },', slugIdx)
  const block = src.slice(slugIdx, blockEnd + 4)

  const prosM = block.match(/pros:\s*\[([^\]]+)\]/)
  const consM = block.match(/cons:\s*\[([^\]]+)\]/)

  const parseList = (raw) =>
    (raw || '')
      .split(/,\s*\n/)
      .map((s) => {
        // Strip surrounding quotes
        let t = s.trim().replace(/^['"]/, '').replace(/['"],?$/, '').replace(/['"]$/, '')
        // Unescape TS-escaped sequences so we don't double-escape on output
        t = t.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')
        return t
      })
      .filter(Boolean)

  return {
    pros: prosM ? parseList(prosM[1]) : null,
    cons: consM ? parseList(consM[1]) : null,
  }
}

// ── Build entry ──
function buildEntry(slug, data) {
  const rule = SLUG_RULES[slug]
  if (!rule) {
    console.error(`⚠ No SLUG_RULES entry for ${slug} — skipping`)
    return null
  }

  const name = data.title || rule.shortName
  const price = pickPrice(data)
  const priceNote = data.listPrice && data.price ? '' : data.price ? '' : 'check listing'
  const rating = data.stars ?? 0
  const reviewCount = data.reviewsCount ?? 0
  const desc = cleanDescription(data.description, data.features)
  const specs = specsFromOverview(data.productOverview, data.features, data.manufacturerAttributes)

  // Existing voice — only if already in products.ts (carry-over)
  const { pros: existingPros, cons: existingCons } = extractExistingPosCons(slug)
  // Default fallback voice scaffold (TODO markers if no carry-over)
  const pros = existingPros && existingPros.length > 0 ? existingPros : ['// TODO Brandon voice — pros']
  const cons = existingCons && existingCons.length > 0 ? existingCons : ['// TODO Brandon voice — cons']

  const lines = []
  lines.push('  {')
  lines.push(`    slug: '${slug}',`)
  lines.push(`    name: '${escapeQuotes(name)}',`)
  lines.push(`    shortName: '${escapeQuotes(rule.shortName)}',`)
  lines.push(`    category: '${rule.category}',`)
  if (price !== null && price !== undefined) {
    lines.push(`    price: ${price},`)
  } else {
    lines.push(`    price: 0,`)
    lines.push(`    priceNote: 'check Amazon for current price',`)
  }
  lines.push(`    rating: ${rating},`)
  lines.push(`    reviewCount: ${reviewCount},`)
  lines.push(`    image: '/images/products/${slug}.jpg',`)
  lines.push(`    description:`)
  lines.push(`      '${escapeQuotes(desc)}',`)
  lines.push(`    specs: {`)
  for (const [k, v] of Object.entries(specs)) {
    const key = /^[a-z][a-zA-Z0-9]*$/.test(k) ? k : `'${escapeQuotes(k)}'`
    lines.push(`      ${key}: '${escapeQuotes(v)}',`)
  }
  if (Object.keys(specs).length === 0) {
    lines.push(`      // TODO specs — Apify returned no parseable spec features`)
  }
  lines.push(`    },`)
  lines.push(`    pros: [`)
  for (const p of pros) lines.push(`      '${escapeQuotes(p)}',`)
  lines.push(`    ],`)
  lines.push(`    cons: [`)
  for (const c of cons) lines.push(`      '${escapeQuotes(c)}',`)
  lines.push(`    ],`)
  if (rule.badge) lines.push(`    badge: '${rule.badge}',`)
  lines.push(`    affiliateUrl: affiliateLinks.${rule.affiliateKey},`)
  lines.push(`    featured: false,`)
  lines.push(`  },`)
  return lines.join('\n')
}

// ── Run ──
const target = process.argv[2] || 'all'
const slugs =
  target === 'all'
    ? Object.keys(SLUG_RULES)
    : target.split(',').map((s) => s.trim()).filter(Boolean)

console.log('// ─── Re-generated 2026-05-09 from Apify Amazon data ───')
console.log('// Title, price, rating, description, specs come from Amazon listing.')
console.log('// Pros/cons are Brandon-voice (carried from prior entries where present).')
for (const slug of slugs) {
  const file = path.join(SIDECAR_DIR, `${slug}.amazon.json`)
  if (!fs.existsSync(file)) {
    console.error(`⚠ No sidecar for ${slug} — skipping`)
    continue
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  const entry = buildEntry(slug, data)
  if (entry) console.log('\n' + entry)
}
