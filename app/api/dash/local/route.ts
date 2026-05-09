/**
 * Dashboard data: local TileflowCEO state.
 *
 * In production (Vercel), reads from public/dash-snapshot/ — a folder
 * populated nightly by the dashboard-snapshot.yml GitHub Action.
 *
 * In dev (localhost), reads directly from disk so changes show up live.
 */

import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd() // website/
const SNAPSHOT_DIR = path.join(ROOT, 'public', 'dash-snapshot')

// In dev mode, also try to read from the live filesystem
const LIVE_TILEFLOW = path.join(ROOT, '..')

async function listMd(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir)
    return entries.filter((f) => f.endsWith('.md') || !f.includes('.'))
  } catch {
    return []
  }
}

async function readFrontmatter(file: string): Promise<{ title?: string; description?: string }> {
  try {
    const src = await fs.readFile(file, 'utf8')
    // Very small frontmatter parser — pulls "title:" and "description:"
    const match = src.match(/^---\n([\s\S]+?)\n---/)
    if (!match) {
      // No frontmatter — first non-empty line as fallback
      const firstLine = src.split('\n').find((l) => l.trim())?.replace(/^#+\s*/, '')
      return { title: firstLine?.slice(0, 80) }
    }
    const fm = match[1]
    const titleMatch = fm.match(/^(?:name|title):\s*['"]?([^\n'"]+)['"]?\s*$/m)
    const descMatch = fm.match(/^description:\s*['"]?([^\n'"]+)['"]?\s*$/m)
    return {
      title: titleMatch?.[1]?.trim(),
      description: descMatch?.[1]?.trim(),
    }
  } catch {
    return {}
  }
}

async function pickDir(...candidates: string[]): Promise<string | null> {
  for (const dir of candidates) {
    try {
      const stat = await fs.stat(dir)
      if (stat.isDirectory()) return dir
    } catch {}
  }
  return null
}

export async function GET() {
  try {
    // Find each directory — prefer snapshot in production, live in dev
    const agentsDir = await pickDir(
      path.join(SNAPSHOT_DIR, 'agents'),
      path.join(LIVE_TILEFLOW, '.claude', 'agents'),
    )
    const skillsDir = await pickDir(
      path.join(SNAPSHOT_DIR, 'skills'),
      path.join(LIVE_TILEFLOW, '.claude', 'skills'),
    )

    // Agents — each is a folder with config.md, or a single .md file
    const agentNames: string[] = []
    if (agentsDir) {
      const entries = await fs.readdir(agentsDir, { withFileTypes: true })
      for (const e of entries) {
        if (e.isDirectory()) agentNames.push(e.name)
        else if (e.name.endsWith('.md')) agentNames.push(e.name.replace(/\.md$/, ''))
      }
    }

    // Skills — same shape
    const skillNames: string[] = []
    if (skillsDir) {
      const entries = await fs.readdir(skillsDir, { withFileTypes: true })
      for (const e of entries) {
        if (e.isDirectory()) skillNames.push(e.name)
        else if (e.name.endsWith('.md')) skillNames.push(e.name.replace(/\.md$/, ''))
      }
    }

    // TOMORROW.md
    let tomorrow: string | null = null
    const tomorrowPath = await pickDir(
      path.join(SNAPSHOT_DIR),
      path.join(LIVE_TILEFLOW),
    )
    if (tomorrowPath) {
      try {
        tomorrow = await fs.readFile(path.join(tomorrowPath, 'TOMORROW.md'), 'utf8')
      } catch {}
    }

    // Recent sessions — list .md files in projects/sessions/
    const sessionsDir = await pickDir(
      path.join(SNAPSHOT_DIR, 'sessions'),
      path.join(LIVE_TILEFLOW, 'projects', 'sessions'),
    )
    const sessions: { date: string; title: string; file: string }[] = []
    if (sessionsDir) {
      const files = (await fs.readdir(sessionsDir))
        .filter((f) => f.endsWith('.md'))
        .sort()
        .reverse()
        .slice(0, 5)
      for (const f of files) {
        const fm = await readFrontmatter(path.join(sessionsDir, f))
        const dateMatch = f.match(/^(\d{4}-\d{2}-\d{2})/)
        sessions.push({
          date: dateMatch?.[1] || '',
          title: fm.title || f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
          file: f,
        })
      }
    }

    // MCPs — read names from ~/.claude.json (only available in dev / snapshot)
    let mcps: string[] = []
    const mcpListPath = await pickDir(SNAPSHOT_DIR)
    if (mcpListPath) {
      try {
        const list = await fs.readFile(path.join(mcpListPath, 'mcps.json'), 'utf8')
        mcps = JSON.parse(list)
      } catch {}
    }

    return NextResponse.json({
      ok: true,
      agents: agentNames.sort(),
      skills: skillNames.sort(),
      mcps,
      tomorrow,
      sessions,
      source: agentsDir?.includes('snapshot') ? 'snapshot' : 'live',
      fetchedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err.message,
      fetchedAt: new Date().toISOString(),
    })
  }
}
