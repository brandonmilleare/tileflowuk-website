#!/usr/bin/env node
/**
 * List Pinterest boards on the connected account.
 * Usage: node scripts/pinterest/list-boards.mjs
 */

import { readFile } from 'node:fs/promises'
import path from 'node:path'

async function readToken() {
  const text = await readFile(path.resolve(process.cwd(), '.env.local'), 'utf8')
  const m = text.match(/^PINTEREST_ACCESS_TOKEN=(.+)$/m)
  if (!m) throw new Error('PINTEREST_ACCESS_TOKEN missing from .env.local')
  return m[1].trim()
}

async function main() {
  const token = await readToken()
  const res = await fetch('https://api.pinterest.com/v5/boards?page_size=100', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await res.json()
  if (!res.ok) {
    console.error('✗', res.status, JSON.stringify(json, null, 2))
    process.exit(1)
  }
  console.log(`Found ${json.items?.length ?? 0} boards:\n`)
  for (const b of json.items ?? []) {
    console.log(`  ${b.id}  ${b.name}${b.privacy === 'SECRET' ? '  (SECRET)' : ''}`)
  }
}

main().catch(err => {
  console.error('✗', err.message)
  process.exit(1)
})
