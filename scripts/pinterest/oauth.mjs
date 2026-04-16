#!/usr/bin/env node
/**
 * Pinterest OAuth helper — upgrades the read-only trial token in .env.local
 * to a full read+write token (pins:write, boards:write).
 *
 * Usage:
 *   node scripts/pinterest/oauth.mjs
 *
 * What it does:
 *   1. Reads PINTEREST_APP_ID + PINTEREST_APP_SECRET from .env.local
 *   2. Opens the Pinterest OAuth consent page in your browser
 *   3. Runs a tiny local HTTP server on http://localhost:8787/callback
 *      to catch the auth code redirect
 *   4. Exchanges the code for an access token + refresh token
 *   5. Rewrites .env.local with the new tokens
 *
 * Before running, make sure the Pinterest dev app redirect URI is:
 *   http://localhost:8787/callback
 * (Settings → Link to Pinterest → your app → Redirect URIs)
 */

import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { URL } from 'node:url'
import crypto from 'node:crypto'
import path from 'node:path'

const PORT = 8787
const REDIRECT = `http://localhost:${PORT}/callback`
const SCOPES = [
  'boards:read',
  'boards:write',
  'pins:read',
  'pins:write',
  'user_accounts:read',
].join(',')

const ENV_PATH = path.resolve(process.cwd(), '.env.local')

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

async function writeEnv(text, updates) {
  let next = text
  for (const [k, v] of Object.entries(updates)) {
    const re = new RegExp(`^${k}=.*$`, 'm')
    if (re.test(next)) {
      next = next.replace(re, `${k}=${v}`)
    } else {
      next += (next.endsWith('\n') ? '' : '\n') + `${k}=${v}\n`
    }
  }
  await writeFile(ENV_PATH, next)
}

function openBrowser(url) {
  const cmd =
    process.platform === 'darwin' ? `open "${url}"` :
    process.platform === 'win32' ? `start "" "${url}"` :
    `xdg-open "${url}"`
  exec(cmd, err => {
    if (err) console.log(`Couldn’t open browser automatically. Visit:\n${url}\n`)
  })
}

async function exchangeCode(code, appId, appSecret) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT,
  })
  const auth = Buffer.from(`${appId}:${appSecret}`).toString('base64')
  const res = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Token exchange failed (${res.status}): ${text}`)
  }
  return res.json()
}

async function main() {
  const { text, map } = await readEnv()
  const appId = map.get('PINTEREST_APP_ID')
  const appSecret = map.get('PINTEREST_APP_SECRET')
  if (!appId || !appSecret) {
    console.error('Missing PINTEREST_APP_ID or PINTEREST_APP_SECRET in .env.local')
    process.exit(1)
  }

  const state = crypto.randomBytes(16).toString('hex')
  const authUrl = `https://www.pinterest.com/oauth/?${new URLSearchParams({
    client_id: appId,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPES,
    state,
  }).toString()}`

  const code = await new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      if (!req.url) return
      const u = new URL(req.url, REDIRECT)
      if (u.pathname !== '/callback') {
        res.statusCode = 404
        res.end('Not found')
        return
      }
      const got = u.searchParams.get('code')
      const gotState = u.searchParams.get('state')
      if (!got || gotState !== state) {
        res.statusCode = 400
        res.end('State mismatch or missing code. Close this tab and retry.')
        server.close()
        reject(new Error('OAuth state mismatch'))
        return
      }
      res.setHeader('Content-Type', 'text/html')
      res.end(`<!doctype html><meta charset="utf-8"><title>TileFlow Pinterest OAuth</title>
<body style="font:16px/1.5 system-ui;padding:48px;max-width:560px;margin:auto;color:#1f2937">
<h2 style="color:#4d7c66">Pinterest linked.</h2>
<p>You can close this tab. The token has been written to <code>.env.local</code>.</p>
</body>`)
      server.close()
      resolve(got)
    })
    server.listen(PORT, () => {
      console.log(`\n→ Opening Pinterest consent page…`)
      console.log(`  Listening on ${REDIRECT} for the redirect.\n`)
      openBrowser(authUrl)
    })
    server.on('error', reject)
  })

  console.log('→ Exchanging auth code for tokens…')
  const token = await exchangeCode(code, appId, appSecret)

  const updates = {
    PINTEREST_ACCESS_TOKEN: token.access_token,
  }
  if (token.refresh_token) updates.PINTEREST_REFRESH_TOKEN = token.refresh_token
  await writeEnv(text, updates)

  console.log('\n✓ Done. New scopes on token:', token.scope ?? SCOPES)
  console.log('  Access token stored in .env.local (PINTEREST_ACCESS_TOKEN)')
  if (token.refresh_token) console.log('  Refresh token stored (PINTEREST_REFRESH_TOKEN)')
  if (token.expires_in) console.log(`  Expires in ${token.expires_in}s`)
}

main().catch(err => {
  console.error('\n✗ OAuth failed:', err.message)
  process.exit(1)
})
