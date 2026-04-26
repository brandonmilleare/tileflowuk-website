#!/usr/bin/env node
/**
 * Post a pin to Pinterest via API v5.
 *
 * Usage:
 *   node scripts/pinterest/post-pin.mjs --board <board_id> --title "..." \
 *     --link https://tileflowuk.com/blog/foo \
 *     --image https://tileflowuk.com/pin-studio/blog/foo \
 *     [--description "..."] [--alt "..."]
 *
 * Reads PINTEREST_ACCESS_TOKEN from .env.local.
 * Needs pins:write scope on the token (run oauth.mjs first).
 */

import { readFile } from 'node:fs/promises'
import path from 'node:path'

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const k = a.slice(2)
      const v = argv[i + 1]
      out[k] = v
      i++
    }
  }
  return out
}

async function readToken() {
  const text = await readFile(path.resolve(process.cwd(), '.env.local'), 'utf8')
  const m = text.match(/^PINTEREST_ACCESS_TOKEN=(.+)$/m)
  if (!m) throw new Error('PINTEREST_ACCESS_TOKEN missing from .env.local')
  return m[1].trim()
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const required = ['board', 'title', 'link', 'image']
  for (const k of required) {
    if (!args[k]) {
      console.error(`Missing --${k}`)
      process.exit(1)
    }
  }
  const token = await readToken()
  const body = {
    board_id: args.board,
    title: args.title,
    description: args.description ?? '',
    link: args.link,
    alt_text: args.alt ?? args.title,
    media_source: {
      source_type: 'image_url',
      url: args.image,
    },
  }
  const res = await fetch('https://api.pinterest.com/v5/pins', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    console.error(`✗ Pin failed (${res.status}):`, JSON.stringify(json, null, 2))
    process.exit(1)
  }
  console.log('✓ Pin created:', json.id ?? json)
  console.log('  URL:', json.url ?? `https://www.pinterest.com/pin/${json.id}/`)
}

main().catch(err => {
  console.error('✗', err.message)
  process.exit(1)
})
