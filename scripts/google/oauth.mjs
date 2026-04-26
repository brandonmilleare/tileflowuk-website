#!/usr/bin/env node
/**
 * Google OAuth helper — gets a long-lived refresh token for a personal Google
 * account that already has Owner permission on the GSC property.
 *
 * Why OAuth instead of the service account?
 * Search Console's "Add user" dialog rejects service-account emails on
 * Domain properties (sc-domain:). OAuth user-auth uses Brandon's existing
 * Owner-level access, no UI dance required.
 *
 * Usage:
 *   node scripts/google/oauth.mjs
 *
 * Prerequisites in .env.local:
 *   GOOGLE_OAUTH_CLIENT_ID=...
 *   GOOGLE_OAUTH_CLIENT_SECRET=...
 *
 * To create those (one-time, ~2 min):
 *   1. https://console.cloud.google.com/apis/credentials?project=tileflow-seo
 *   2. + Create Credentials → OAuth client ID
 *   3. Application type: Desktop app
 *   4. Name: tileflow-cli
 *   5. Create → copy the Client ID + Client Secret into .env.local
 *
 * Outputs:
 *   GOOGLE_REFRESH_TOKEN written to .env.local
 *   GOOGLE_ACCESS_TOKEN written to .env.local (auto-refreshes via the refresh token)
 */

import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { URL } from 'node:url'
import crypto from 'node:crypto'
import path from 'node:path'

const PORT = 8788   // 8787 is Pinterest's
const REDIRECT = `http://localhost:${PORT}/callback`
const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/indexing',
].join(' ')

const ENV_PATH = path.resolve(process.cwd(), '.env.local')

async function readEnv() {
  let text = ''
  try {
    text = await readFile(ENV_PATH, 'utf8')
  } catch {
    text = ''
  }
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
    if (err) console.log(`Could not open browser. Visit:\n${url}\n`)
  })
}

async function exchangeCode(code, clientId, clientSecret) {
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: REDIRECT,
    grant_type: 'authorization_code',
  })
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Token exchange failed (${res.status}): ${errText}`)
  }
  return res.json()
}

async function main() {
  const { text, map } = await readEnv()
  const clientId = map.get('GOOGLE_OAUTH_CLIENT_ID')
  const clientSecret = map.get('GOOGLE_OAUTH_CLIENT_SECRET')
  if (!clientId || !clientSecret) {
    console.error('\n✗ Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET in .env.local')
    console.error('\nQuick fix (~2 min):')
    console.error('  1. Open: https://console.cloud.google.com/apis/credentials?project=tileflow-seo')
    console.error('  2. + Create Credentials → OAuth client ID')
    console.error('  3. (If asked to configure consent screen first: pick External, fill name/email, add yourself as a test user, save.)')
    console.error('  4. Application type: Desktop app')
    console.error('  5. Name: tileflow-cli')
    console.error('  6. After creation, copy Client ID + Client Secret')
    console.error('  7. Append to .env.local:')
    console.error('       GOOGLE_OAUTH_CLIENT_ID=<your-client-id>')
    console.error('       GOOGLE_OAUTH_CLIENT_SECRET=<your-client-secret>')
    console.error('  8. Re-run: node scripts/google/oauth.mjs\n')
    process.exit(1)
  }

  const state = crypto.randomBytes(16).toString('hex')
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent',
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
      const error = u.searchParams.get('error')
      if (error) {
        res.statusCode = 400
        res.end(`OAuth error: ${error}. Close this tab and retry.`)
        server.close()
        reject(new Error(`OAuth error: ${error}`))
        return
      }
      if (!got || gotState !== state) {
        res.statusCode = 400
        res.end('State mismatch or missing code. Close this tab and retry.')
        server.close()
        reject(new Error('OAuth state mismatch'))
        return
      }
      res.setHeader('Content-Type', 'text/html')
      res.end(`<!doctype html><meta charset="utf-8"><title>TileFlow Google OAuth</title>
<body style="font:16px/1.5 system-ui;padding:48px;max-width:560px;margin:auto;color:#1f2937">
<h2 style="color:#4d7c66">Google linked.</h2>
<p>Tokens written to <code>.env.local</code>. You can close this tab.</p>
</body>`)
      server.close()
      resolve(got)
    })
    server.listen(PORT, () => {
      console.log(`\n→ Opening Google consent page...`)
      console.log(`  Listening on ${REDIRECT} for the redirect.\n`)
      console.log(`  Scopes requested: webmasters.readonly + indexing`)
      openBrowser(authUrl)
    })
    server.on('error', reject)
  })

  console.log('→ Exchanging auth code for tokens...')
  const token = await exchangeCode(code, clientId, clientSecret)

  const updates = {
    GOOGLE_ACCESS_TOKEN: token.access_token,
  }
  if (token.refresh_token) updates.GOOGLE_REFRESH_TOKEN = token.refresh_token
  await writeEnv(text, updates)

  console.log('\n✓ Done.')
  console.log(`  Access token saved (expires in ${token.expires_in}s)`)
  if (token.refresh_token) {
    console.log('  Refresh token saved — auto-refresh will work going forward')
  } else {
    console.log('  ⚠ No refresh token returned. May need prompt=consent on next run.')
  }
  console.log(`  Granted scopes: ${token.scope}`)
}

main().catch(err => {
  console.error('\n✗ OAuth failed:', err.message)
  process.exit(1)
})
