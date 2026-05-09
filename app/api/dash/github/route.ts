/**
 * Dashboard data: GitHub PRs + workflow runs + open issues.
 *
 * Uses public unauthenticated reads (60 req/hr per IP from Vercel).
 * If GITHUB_TOKEN is set in env, switches to authenticated (5000 req/hr).
 *
 * Caches each response for 60s server-side via Next 16 fetch revalidate.
 */

import { NextResponse } from 'next/server'

const REPO = 'brandonmilleare/tileflowuk-website'

async function gh(path: string) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(`GitHub ${res.status}: ${path}`)
  }
  return res.json()
}

export async function GET() {
  try {
    const [prs, runs, issues] = await Promise.all([
      gh('/pulls?state=all&sort=updated&direction=desc&per_page=8'),
      gh('/actions/runs?per_page=8'),
      gh('/issues?state=open&per_page=10&sort=updated'),
    ])

    return NextResponse.json({
      ok: true,
      prs: prs.map((p: any) => ({
        number: p.number,
        title: p.title,
        state: p.state,
        merged: !!p.merged_at,
        url: p.html_url,
        updatedAt: p.updated_at,
        author: p.user?.login,
      })),
      runs: (runs.workflow_runs || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        status: r.status,
        conclusion: r.conclusion,
        url: r.html_url,
        createdAt: r.created_at,
        event: r.event,
      })),
      // Filter out PRs from the issues endpoint (GitHub returns both)
      issues: issues
        .filter((i: any) => !i.pull_request)
        .map((i: any) => ({
          number: i.number,
          title: i.title,
          url: i.html_url,
          updatedAt: i.updated_at,
          labels: (i.labels || []).map((l: any) => l.name),
        })),
      fetchedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message, fetchedAt: new Date().toISOString() },
      { status: 200 }, // 200 so client renders the panel with the error inside
    )
  }
}
