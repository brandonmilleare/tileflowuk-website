#!/usr/bin/env node
/**
 * Affiliate link health check — HTTP status + bot-block detection.
 *
 * What this catches:
 *   - 404 / 410 / 5xx — listing genuinely pulled or server error
 *   - Network timeout / DNS failure
 *   - Amazon CAPTCHA challenge (bot-blocked, transient)
 *
 * What this DOES NOT catch (intentionally):
 *   - Amazon "Currently unavailable" stock-outs. Amazon embeds both
 *     the in-stock and out-of-stock templates in every listing's
 *     static HTML, then uses JS to show one. Static-HTML detection
 *     produces consistent false positives. For deeper stock detection
 *     run a separate Playwright-based check (heavier, weekly).
 *
 * Companion to check-affiliate-tags.mjs:
 *   - tags  → catches commission leak (wrong/missing tileflowuk-21)
 *   - this  → catches dead listings (customer clicks → empty page)
 *
 * Output:
 *   - Console summary
 *   - Markdown report at /tmp/affiliate-health.md (for GitHub issue)
 *   - Exit 0 healthy, 1 if dead/error, 2 on parse error
 *
 * Usage:
 *   node scripts/products/check-affiliate-health.mjs
 *   node scripts/products/check-affiliate-health.mjs --concurrency 5
 *   node scripts/products/check-affiliate-health.mjs --report-only
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')

const args = process.argv.slice(2)
const CONCURRENCY = parseInt(args.find((a, i, arr) => arr[i - 1] === '--concurrency') || '3', 10)
const REPORT_ONLY = args.includes('--report-only')
const REPORT_FILE = '/tmp/affiliate-health.md'

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

// ── Extract URLs from data files ──
function extractAmazonUrls() {
  const urls = new Set()
  for (const file of ['data/affiliateLinks.ts', 'data/products.ts']) {
    const fp = path.join(ROOT, file)
    if (!fs.existsSync(fp)) continue
    const src = fs.readFileSync(fp, 'utf8')
    const re = /https:\/\/www\.amazon\.co\.uk\/dp\/([A-Z0-9]+)\?tag=tileflowuk-21/g
    let m
    while ((m = re.exec(src))) urls.add(m[0])
  }
  return [...urls].map((url) => ({ url, retailer: 'amazon', asin: url.match(/dp\/([A-Z0-9]+)/)[1] }))
}

function extractDeluxeUrls() {
  const fp = path.join(ROOT, 'data', 'deluxe-flooring.ts')
  if (!fs.existsSync(fp)) return []
  const src = fs.readFileSync(fp, 'utf8')
  const urls = new Set()
  const re = /https:\/\/deluxe-flooring\.co\.uk\/product\/[a-z0-9-]+\/?/g
  let m
  while ((m = re.exec(src))) urls.add(m[0])
  return [...urls].map((url) => ({ url: url + '?ref=3', retailer: 'deluxe' }))
}

// ── Check one URL ──
async function checkOne({ url, retailer, asin }) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
      signal: AbortSignal.timeout(20000),
    })

    const status = res.status
    const html = await res.text()

    // Detect Amazon's bot-block FIRST — it serves a CAPTCHA page that
    // contains marketing text matching most of our other patterns, so
    // we have to rule it out before any content-sniffing.
    const captcha =
      /Sorry, we just need to make sure you're not a robot/i.test(html) ||
      /Type the characters you see in this image/i.test(html) ||
      /Enter the characters you see below/i.test(html) ||
      // Amazon "we couldn't process your request" page (sometimes served to GHA)
      (html.length < 5000 && /To discuss automated access to Amazon data/i.test(html))

    // ── Stock-out detection: NOT done in this script ──
    //
    // Amazon embeds BOTH the in-stock buybox and the out-of-stock
    // template in every listing's static HTML, then JavaScript hides
    // one based on inventory state. Static HTML detection therefore
    // produces consistent false positives — we verified this against
    // known-live listings (e.g. Bosch GWX B0BYT1521B contains
    // id="outOfStock" + "We don't know when..." while the product is
    // genuinely purchasable).
    //
    // Reliable detection requires a JS-rendered fetch:
    //   - Playwright (heavy — separate weekly workflow)
    //   - Amazon Product Advertising API (gated on 3 affiliate sales)
    //   - Apify renderer actor (paid tier above our scale)
    //
    // For this script we limit ourselves to signals we can trust:
    //   - HTTP 4xx/5xx → dead
    //   - Amazon CAPTCHA → bot-blocked (warning, transient)
    //   - timeout / network error → fetch error
    let verdict = 'ok'
    if (status >= 400) verdict = 'dead'
    else if (captcha) verdict = 'bot-blocked'

    return { url, retailer, asin, status, verdict }
  } catch (err) {
    return { url, retailer, asin, status: 0, verdict: 'error', error: err.message }
  }
}

// ── Pool runner ──
async function runPool(items, fn, concurrency) {
  const results = []
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      const r = await fn(items[idx])
      results[idx] = r
      const tick = r.verdict === 'ok' ? '✓' : r.verdict === 'bot-blocked' ? '~' : '✗'
      const label = r.asin || r.url.replace('https://', '').slice(0, 60)
      process.stdout.write(`\r  ${tick} [${idx + 1}/${items.length}] ${label.padEnd(60)}\n`)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

// Retry transient errors (timeouts, network blips). Real failures
// (404/410/5xx, dead) don't get retried — they're definitive.
async function retryErrors(results, items, attempts = 2) {
  for (let pass = 0; pass < attempts; pass++) {
    const errIdxs = results
      .map((r, i) => (r.verdict === 'error' ? i : -1))
      .filter((i) => i >= 0)
    if (!errIdxs.length) break
    console.log(`\n  Retrying ${errIdxs.length} timeouts (pass ${pass + 1}/${attempts})...`)
    for (const idx of errIdxs) {
      // 2-second back-off before retry
      await new Promise((r) => setTimeout(r, 2000))
      results[idx] = await checkOne(items[idx])
    }
  }
  return results
}

// ── Run ──
async function main() {
  const items = [...extractAmazonUrls(), ...extractDeluxeUrls()]
  console.log(`Checking ${items.length} affiliate URLs (concurrency ${CONCURRENCY})...`)

  let results = await runPool(items, checkOne, CONCURRENCY)
  results = await retryErrors(results, items, 2)

  const dead = results.filter((r) => r.verdict === 'dead')
  const unavailable = results.filter((r) => r.verdict === 'unavailable')
  const errored = results.filter((r) => r.verdict === 'error')
  const botBlocked = results.filter((r) => r.verdict === 'bot-blocked')
  const ok = results.filter((r) => r.verdict === 'ok')

  // Summary
  console.log('')
  console.log(`Affiliate health: ${ok.length}/${results.length} OK`)
  if (dead.length) console.log(`  ✗ ${dead.length} DEAD (404/410/5xx)`)
  if (unavailable.length) console.log(`  ⚠ ${unavailable.length} CURRENTLY UNAVAILABLE`)
  if (errored.length) console.log(`  ⚠ ${errored.length} fetch error`)
  if (botBlocked.length) console.log(`  ~ ${botBlocked.length} bot-blocked (Amazon CAPTCHA — usually transient)`)

  // Markdown report (for GitHub issue)
  const lines = []
  lines.push(`# Affiliate health check — ${new Date().toISOString().slice(0, 10)}`)
  lines.push('')
  lines.push(`**${ok.length}/${results.length} healthy.**`)
  lines.push('')

  for (const [label, list] of [
    ['💀 Dead listings (404/410/5xx)', dead],
    ['⚠️ Currently unavailable on Amazon', unavailable],
    ['⚠️ Fetch errors', errored],
    ['🤖 Bot-blocked (transient — re-run to confirm)', botBlocked],
  ]) {
    if (!list.length) continue
    lines.push(`## ${label} (${list.length})`)
    lines.push('')
    for (const r of list) {
      lines.push(`- [${r.retailer}${r.asin ? ` ${r.asin}` : ''}] ${r.url} — ${r.status || r.error || r.verdict}`)
    }
    lines.push('')
  }

  if (!dead.length && !unavailable.length && !errored.length) {
    lines.push('All affiliate URLs returned healthy responses. No commission at risk.')
  }

  fs.writeFileSync(REPORT_FILE, lines.join('\n'))
  console.log(`\nReport written: ${REPORT_FILE}`)

  // Bot-blocked is treated as warning (doesn't fail the build) — Amazon
  // intermittently blocks GHA IPs and re-running fixes it. Real failures
  // (dead/unavailable/error) DO fail the build.
  const realFailures = dead.length + unavailable.length + errored.length
  if (REPORT_ONLY) process.exit(0)
  process.exit(realFailures === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error('check-affiliate-health.mjs crashed:', err.message)
  process.exit(2)
})
