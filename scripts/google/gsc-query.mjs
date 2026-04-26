#!/usr/bin/env node
/**
 * Query Google Search Console using the OAuth token from oauth.mjs.
 *
 * Usage:
 *   node scripts/google/gsc-query.mjs sites
 *   node scripts/google/gsc-query.mjs queries [--days 28] [--limit 25]
 *   node scripts/google/gsc-query.mjs pages [--days 28] [--limit 25]
 *   node scripts/google/gsc-query.mjs underperforming   # high impressions, low CTR
 *
 * Auto-refreshes the access token if expired (uses GOOGLE_REFRESH_TOKEN).
 */

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ENV_PATH = path.resolve(process.cwd(), '.env.local')
const SITE_URL = 'sc-domain:tileflowuk.com'

function parseArgs(argv) {
  const cmd = argv[0]
  const out = { _cmd: cmd }
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      out[a.slice(2)] = argv[i + 1]
      i++
    }
  }
  return out
}

async function readEnv() {
  const text = await readFile(ENV_PATH, 'utf8')
  const map = new Map()
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    map.set(line.slice(0, eq).trim(), line.slice(eq + 1).trim())
  }
  return { text, map }
}

async function writeEnvUpdates(text, updates) {
  let next = text
  for (const [k, v] of Object.entries(updates)) {
    const re = new RegExp(`^${k}=.*$`, 'm')
    if (re.test(next)) next = next.replace(re, `${k}=${v}`)
    else next += `\n${k}=${v}\n`
  }
  await writeFile(ENV_PATH, next)
}

async function refreshAccessToken(env) {
  const body = new URLSearchParams({
    client_id: env.map.get('GOOGLE_OAUTH_CLIENT_ID'),
    client_secret: env.map.get('GOOGLE_OAUTH_CLIENT_SECRET'),
    refresh_token: env.map.get('GOOGLE_REFRESH_TOKEN'),
    grant_type: 'refresh_token',
  })
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!r.ok) throw new Error(`Refresh failed ${r.status}: ${await r.text()}`)
  const j = await r.json()
  await writeEnvUpdates(env.text, { GOOGLE_ACCESS_TOKEN: j.access_token })
  return j.access_token
}

async function gscFetch(path, token, body) {
  const url = `https://searchconsole.googleapis.com${path}`
  const opts = {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  if (body) opts.body = JSON.stringify(body)
  const r = await fetch(url, opts)
  if (!r.ok) {
    const txt = await r.text()
    throw new Error(`GSC ${r.status}: ${txt.slice(0, 400)}`)
  }
  return r.json()
}

async function authedFetch(env, path, body) {
  let token = env.map.get('GOOGLE_ACCESS_TOKEN')
  try {
    return await gscFetch(path, token, body)
  } catch (err) {
    if (String(err).includes('401') || String(err).includes('UNAUTHENTICATED')) {
      console.error('  (refreshing access token...)')
      token = await refreshAccessToken(env)
      return gscFetch(path, token, body)
    }
    throw err
  }
}

function fmtDate(d) {
  return d.toISOString().slice(0, 10)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const env = await readEnv()
  const cmd = args._cmd || 'sites'

  if (!env.map.get('GOOGLE_ACCESS_TOKEN')) {
    console.error('No GOOGLE_ACCESS_TOKEN in .env.local. Run: node scripts/google/oauth.mjs')
    process.exit(1)
  }

  const days = parseInt(args.days || '28', 10)
  const limit = parseInt(args.limit || '25', 10)
  const endDate = new Date()
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  if (cmd === 'sites') {
    const r = await authedFetch(env, '/webmasters/v3/sites')
    console.log(`\n${(r.siteEntry || []).length} sites visible:`)
    for (const s of r.siteEntry || []) {
      console.log(`  ${s.permissionLevel.padEnd(20)} ${s.siteUrl}`)
    }
    return
  }

  if (cmd === 'queries' || cmd === 'pages') {
    const dim = cmd === 'queries' ? 'query' : 'page'
    const r = await authedFetch(env, `/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
      startDate: fmtDate(startDate),
      endDate: fmtDate(endDate),
      dimensions: [dim],
      rowLimit: limit,
    })
    console.log(`\nTop ${limit} ${cmd} (last ${days} days):`)
    console.log(`${dim.padEnd(50)}  clicks  impressions  ctr%   pos`)
    console.log('─'.repeat(80))
    for (const row of (r.rows || []).slice(0, limit)) {
      const k = String(row.keys[0]).slice(0, 48).padEnd(50)
      const c = String(row.clicks || 0).padStart(6)
      const i = String(row.impressions || 0).padStart(11)
      const ctr = ((row.ctr || 0) * 100).toFixed(1).padStart(5)
      const pos = (row.position || 0).toFixed(1).padStart(5)
      console.log(`${k}  ${c}  ${i}  ${ctr}  ${pos}`)
    }
    if (!r.rows || r.rows.length === 0) {
      console.log('(no data — site may be too new or no GSC impressions yet)')
    }
    return
  }

  if (cmd === 'underperforming') {
    const r = await authedFetch(env, `/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
      startDate: fmtDate(startDate),
      endDate: fmtDate(endDate),
      dimensions: ['query'],
      rowLimit: 200,
    })
    const candidates = (r.rows || [])
      .filter(row => row.impressions >= 50 && (row.ctr || 0) < 0.02)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, limit)
    console.log(`\nUnderperforming queries (impressions ≥ 50, CTR < 2%):`)
    console.log(`${'query'.padEnd(50)}  impr  ctr%   pos`)
    console.log('─'.repeat(80))
    for (const row of candidates) {
      const k = String(row.keys[0]).slice(0, 48).padEnd(50)
      const i = String(row.impressions).padStart(4)
      const ctr = ((row.ctr || 0) * 100).toFixed(1).padStart(5)
      const pos = (row.position || 0).toFixed(1).padStart(5)
      console.log(`${k}  ${i}  ${ctr}  ${pos}`)
    }
    if (candidates.length === 0) {
      console.log('(no underperformers yet — site too new for meaningful data)')
    }
    return
  }

  console.error(`Unknown command: ${cmd}`)
  console.error('Usage: gsc-query.mjs <sites|queries|pages|underperforming> [--days N] [--limit N]')
  process.exit(1)
}

main().catch(err => {
  console.error('\n✗', err.message)
  process.exit(1)
})
