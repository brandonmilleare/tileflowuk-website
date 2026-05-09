#!/usr/bin/env node
/**
 * Sentry weekly digest — pulls top issues from the last 7 days and
 * formats a markdown report for the GitHub workflow to file as an issue.
 *
 * Why this exists:
 *   Sentry Developer plan (free) sends per-issue alerts. That = noise.
 *   This script aggregates a week's events into one Sunday-morning
 *   summary so Brandon checks Sentry once a week, not 50 times.
 *
 * Inputs (env vars):
 *   SENTRY_AUTH_TOKEN  — server auth token from sentry.io/settings/account/api/auth-tokens/
 *                        Required scopes: project:read, event:read, org:read
 *   SENTRY_ORG_SLUG    — your Sentry organisation slug (default: 'tileflowuk')
 *   SENTRY_PROJECT_SLUG — your Sentry project slug (default: 'tileflowuk-v2')
 *
 * Output:
 *   /tmp/sentry-digest.md — markdown body for the GitHub issue
 *   Exit 0 always (failure to fetch isn't a build break — emit a placeholder)
 */

import fs from 'node:fs'

const TOKEN = process.env.SENTRY_AUTH_TOKEN
const ORG = process.env.SENTRY_ORG_SLUG || 'tileflowuk'
const PROJECT = process.env.SENTRY_PROJECT_SLUG || 'tileflowuk-v2'
const REPORT_FILE = '/tmp/sentry-digest.md'

const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

function abort(reason) {
  // Don't exit non-zero — let the workflow file an issue with the placeholder
  fs.writeFileSync(
    REPORT_FILE,
    `# Sentry weekly digest — ${new Date().toISOString().slice(0, 10)}\n\n` +
      `**Skipped:** ${reason}\n\n` +
      `Add \`SENTRY_AUTH_TOKEN\` to repo secrets to enable. ` +
      `Token can be created at https://sentry.io/settings/account/api/auth-tokens/ ` +
      `with scopes: \`project:read\`, \`event:read\`, \`org:read\`.`
  )
  console.log(`Skipped: ${reason}`)
  process.exit(0)
}

if (!TOKEN) abort('SENTRY_AUTH_TOKEN not set')

async function sentryGet(path) {
  const url = `https://sentry.io/api/0${path}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  if (!res.ok) throw new Error(`Sentry API ${res.status}: ${await res.text()}`)
  return res.json()
}

async function main() {
  // Top issues by event count in the last 7 days
  // Docs: https://docs.sentry.io/api/events/list-a-projects-issues/
  const issuesPath =
    `/projects/${ORG}/${PROJECT}/issues/?` +
    new URLSearchParams({
      query: `is:unresolved age:-7d`,
      sort: 'freq',
      limit: '15',
      statsPeriod: '7d',
    }).toString()

  let issues
  try {
    issues = await sentryGet(issuesPath)
  } catch (err) {
    abort(`Sentry API call failed: ${err.message}`)
    return
  }

  // Project-wide stats for context
  let stats = null
  try {
    stats = await sentryGet(
      `/projects/${ORG}/${PROJECT}/stats/?` +
        new URLSearchParams({
          stat: 'received',
          since: String(Math.floor(Date.parse(sevenDaysAgo) / 1000)),
          until: String(Math.floor(Date.now() / 1000)),
          resolution: '1d',
        }).toString()
    )
  } catch {
    // non-fatal
  }

  const lines = []
  const today = new Date().toISOString().slice(0, 10)
  lines.push(`# Sentry weekly digest — ${today}`)
  lines.push('')

  if (stats) {
    const totalEvents = stats.reduce((sum, [, n]) => sum + (n || 0), 0)
    lines.push(`**Total events (7 days):** ${totalEvents.toLocaleString()}`)
    lines.push('')
  }

  if (!issues.length) {
    lines.push('No unresolved issues created in the last 7 days. 🎉')
  } else {
    lines.push(`## Top ${issues.length} unresolved issues by event count`)
    lines.push('')
    lines.push('| Events | Users | First seen | Title |')
    lines.push('|---:|---:|---|---|')
    for (const i of issues) {
      const events = (i.count || '0').toLocaleString()
      const users = (i.userCount || 0).toLocaleString()
      const first = i.firstSeen?.slice(0, 10) || '?'
      const title = (i.title || i.metadata?.value || i.shortId || '?').replace(/\|/g, '\\|').slice(0, 80)
      const link = i.permalink || `https://${ORG}.sentry.io/issues/${i.id}/`
      lines.push(`| ${events} | ${users} | ${first} | [${title}](${link}) |`)
    }
    lines.push('')
    lines.push('## Recommended actions')
    lines.push('')
    lines.push('- Click any title above to open the issue in Sentry')
    lines.push('- For "TypeError" / "Cannot read properties" — usually a missing null check after a recent ship')
    lines.push('- For 5xx errors — check the API route + Vercel function logs')
    lines.push('- Resolve fixed issues so they stop appearing here next week')
  }

  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push(
    '_This digest was generated automatically by `.github/workflows/sentry-weekly-digest.yml`. ' +
      'Close this issue once reviewed — it will reopen next Sunday with fresh data._'
  )

  fs.writeFileSync(REPORT_FILE, lines.join('\n'))
  console.log(`Wrote ${REPORT_FILE} (${issues.length} issues digested)`)
}

main().catch((err) => abort(`Unexpected error: ${err.message}`))
