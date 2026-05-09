#!/usr/bin/env node
/**
 * Affiliate tag audit — verifies every Amazon URL across the site
 * carries the tileflowuk-21 tag. Missing or wrong-tag URLs = lost commission.
 *
 * Scans:
 *   - data/affiliateLinks.ts (the source of truth)
 *   - data/products.ts (productized affiliate URLs)
 *   - data/*.ts (any other data files referencing Amazon)
 *   - content/**\/*.mdx (in-content affiliate links)
 *   - app/**\/*.tsx (any hard-coded affiliate links — should be zero)
 *
 * Reports:
 *   - URLs missing the tag entirely
 *   - URLs with a different/wrong tag (commission going somewhere else!)
 *   - URLs with the right tag (count only)
 *
 * Exit code: 0 if all clean, 1 if any miss/wrong, 2 on parse error.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const REQUIRED_TAG = 'tileflowuk-21'

// Find all relevant files
function findFiles() {
  const cmd = `find . \\( -name 'node_modules' -o -name '.next' -o -name '.git' \\) -prune -o \\( -name '*.ts' -o -name '*.tsx' -o -name '*.mdx' -o -name '*.md' \\) -print`
  const out = execSync(cmd, { cwd: ROOT, encoding: 'utf8' })
  return out
    .split('\n')
    .filter((l) => l && !l.includes('node_modules') && !l.includes('.next'))
    .map((l) => path.join(ROOT, l.replace(/^\.\//, '')))
}

// Match an Amazon URL with tag, no tag, or different tag
const URL_RE = /https?:\/\/(?:www\.|m\.)?amazon(?:\.co\.uk|\.com|\.de|\.fr|\.es|\.it)\/(?:dp|gp\/product|exec\/obidos\/ASIN)\/[A-Z0-9]+(?:[/?][^\s'")<>]*)?/g
const TAG_RE = /[?&]tag=([a-zA-Z0-9-]+)/

const found = []
for (const file of findFiles()) {
  let src
  try {
    src = fs.readFileSync(file, 'utf8')
  } catch {
    continue
  }
  let m
  URL_RE.lastIndex = 0
  while ((m = URL_RE.exec(src))) {
    const url = m[0]
    const tagMatch = url.match(TAG_RE)
    const tag = tagMatch ? tagMatch[1] : null
    found.push({ file: path.relative(ROOT, file), url, tag })
  }
}

const missing = found.filter((f) => !f.tag)
const wrong = found.filter((f) => f.tag && f.tag !== REQUIRED_TAG)
const ok = found.filter((f) => f.tag === REQUIRED_TAG)

console.log(`Affiliate tag audit (looking for tag=${REQUIRED_TAG}):`)
console.log(`  ${found.length} Amazon URLs found across ${new Set(found.map((f) => f.file)).size} files`)
console.log(`  ✓ ${ok.length} have the correct tag`)
console.log(`  ✗ ${missing.length} missing tag entirely (NO commission)`)
console.log(`  ⚠ ${wrong.length} have a DIFFERENT tag (commission going elsewhere!)`)

if (missing.length > 0) {
  console.log('\n--- MISSING TAG (no commission) ---')
  for (const f of missing) {
    console.log(`  ${f.file}`)
    console.log(`    ${f.url}`)
  }
}

if (wrong.length > 0) {
  console.log('\n--- WRONG TAG (commission to someone else!) ---')
  for (const f of wrong) {
    console.log(`  ${f.file}`)
    console.log(`    ${f.url}  (tag=${f.tag})`)
  }
}

if (missing.length === 0 && wrong.length === 0) {
  console.log('\n✓ All Amazon URLs carry the tileflowuk-21 tag. No commission leak.')
}

process.exit(missing.length + wrong.length === 0 ? 0 : 1)
