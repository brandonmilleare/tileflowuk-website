#!/usr/bin/env node
/**
 * Dashboard snapshot — copies relevant local TileflowCEO files into
 * website/public/dash-snapshot/ so the deployed dashboard at /dashboard
 * can read them server-side on Vercel.
 *
 * Run by:
 *   - npm run dashboard:snapshot (manual / dev)
 *   - .github/workflows/dashboard-snapshot.yml (nightly cron)
 *
 * What it copies:
 *   - .claude/agents/         → public/dash-snapshot/agents/
 *   - .claude/skills/         → public/dash-snapshot/skills/
 *   - TOMORROW.md             → public/dash-snapshot/TOMORROW.md
 *   - projects/sessions/*.md  → public/dash-snapshot/sessions/  (newest 10 only)
 *   - MCPs list (from ~/.claude.json) → public/dash-snapshot/mcps.json
 *
 * What it does NOT copy:
 *   - memory/*.md (long-form, not needed for dashboard glance)
 *   - .remember/  (chat history, internal)
 *   - any credentials or env files
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WEBSITE_ROOT = path.resolve(__dirname, '..', '..')
const TILEFLOW_ROOT = path.resolve(WEBSITE_ROOT, '..')
const SNAPSHOT_DIR = path.join(WEBSITE_ROOT, 'public', 'dash-snapshot')

async function copyDirShallow(src, dest, options = {}) {
  await fs.mkdir(dest, { recursive: true })
  let copied = 0
  try {
    const entries = await fs.readdir(src, { withFileTypes: true })
    for (const e of entries) {
      const srcPath = path.join(src, e.name)
      const destPath = path.join(dest, e.name)
      if (e.isDirectory()) {
        // Just create an empty dir to mark agent/skill name — don't recurse
        // (we only need the names for the dashboard, not full content)
        await fs.mkdir(destPath, { recursive: true })
        if (options.includeReadme) {
          // Copy a single README.md if present
          try {
            const readme = await fs.readFile(path.join(srcPath, 'README.md'), 'utf8')
            await fs.writeFile(path.join(destPath, 'README.md'), readme)
          } catch {}
        }
        copied++
      } else if (e.name.endsWith('.md')) {
        const data = await fs.readFile(srcPath, 'utf8')
        await fs.writeFile(destPath, data)
        copied++
      }
    }
  } catch (err) {
    console.error(`  ⚠ Could not read ${src}: ${err.message}`)
  }
  return copied
}

async function copyFile(src, dest) {
  try {
    await fs.mkdir(path.dirname(dest), { recursive: true })
    const data = await fs.readFile(src)
    await fs.writeFile(dest, data)
    return true
  } catch (err) {
    console.error(`  ⚠ Could not copy ${src}: ${err.message}`)
    return false
  }
}

async function copyRecentSessions() {
  const src = path.join(TILEFLOW_ROOT, 'projects', 'sessions')
  const dest = path.join(SNAPSHOT_DIR, 'sessions')
  await fs.mkdir(dest, { recursive: true })
  let count = 0
  try {
    const files = (await fs.readdir(src))
      .filter((f) => f.endsWith('.md'))
      .sort()
      .reverse()
      .slice(0, 10)
    for (const f of files) {
      const data = await fs.readFile(path.join(src, f), 'utf8')
      await fs.writeFile(path.join(dest, f), data)
      count++
    }
  } catch (err) {
    console.error(`  ⚠ Could not snapshot sessions: ${err.message}`)
  }
  return count
}

async function snapshotMcps() {
  // Read ~/.claude.json and extract MCP server names only (no credentials)
  try {
    const home = process.env.HOME || ''
    const claudeJson = path.join(home, '.claude.json')
    const data = JSON.parse(await fs.readFile(claudeJson, 'utf8'))
    const mcps = []
    function walk(o) {
      if (!o || typeof o !== 'object') return
      if (o.mcpServers && typeof o.mcpServers === 'object') {
        for (const name of Object.keys(o.mcpServers)) {
          if (!mcps.includes(name)) mcps.push(name)
        }
      }
      for (const v of Object.values(o)) walk(v)
    }
    walk(data)
    await fs.mkdir(SNAPSHOT_DIR, { recursive: true })
    await fs.writeFile(path.join(SNAPSHOT_DIR, 'mcps.json'), JSON.stringify(mcps.sort(), null, 2))
    return mcps.length
  } catch (err) {
    // In CI, ~/.claude.json won't exist — that's fine, dashboard handles missing file
    console.log(`  ⓘ MCP list skipped (${err.message})`)
    await fs.mkdir(SNAPSHOT_DIR, { recursive: true })
    await fs.writeFile(path.join(SNAPSHOT_DIR, 'mcps.json'), '[]')
    return 0
  }
}

async function main() {
  console.log('Dashboard snapshot starting...')
  console.log(`  Source: ${TILEFLOW_ROOT}`)
  console.log(`  Dest:   ${SNAPSHOT_DIR}`)

  // Wipe and rebuild
  try {
    await fs.rm(SNAPSHOT_DIR, { recursive: true, force: true })
  } catch {}
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true })

  const agents = await copyDirShallow(
    path.join(TILEFLOW_ROOT, '.claude', 'agents'),
    path.join(SNAPSHOT_DIR, 'agents'),
  )
  console.log(`  ✓ ${agents} agents`)

  const skills = await copyDirShallow(
    path.join(TILEFLOW_ROOT, '.claude', 'skills'),
    path.join(SNAPSHOT_DIR, 'skills'),
  )
  console.log(`  ✓ ${skills} skills`)

  const tomorrow = await copyFile(
    path.join(TILEFLOW_ROOT, 'TOMORROW.md'),
    path.join(SNAPSHOT_DIR, 'TOMORROW.md'),
  )
  console.log(`  ${tomorrow ? '✓' : '✗'} TOMORROW.md`)

  const sessions = await copyRecentSessions()
  console.log(`  ✓ ${sessions} sessions`)

  const mcps = await snapshotMcps()
  console.log(`  ✓ ${mcps} MCPs`)

  // Add a manifest so the dashboard can show "snapshot from <date>"
  await fs.writeFile(
    path.join(SNAPSHOT_DIR, 'manifest.json'),
    JSON.stringify(
      {
        snapshotAt: new Date().toISOString(),
        agents,
        skills,
        sessions,
        mcps,
        hasTomorrow: tomorrow,
      },
      null,
      2,
    ),
  )

  console.log('Done.')
}

main().catch((err) => {
  console.error('Snapshot failed:', err)
  process.exit(1)
})
