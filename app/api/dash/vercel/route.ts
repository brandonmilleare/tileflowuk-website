/**
 * Dashboard data: recent Vercel deployments for the TileFlow project.
 *
 * Requires VERCEL_TOKEN in Vercel env. Optionally VERCEL_PROJECT_ID and
 * VERCEL_TEAM_ID. Without VERCEL_TOKEN, returns 503 + error so the panel
 * can render an "unconfigured" state.
 *
 * Cached for 60s via Next 16 fetch revalidate.
 */

import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  const token = process.env.VERCEL_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  const teamId = process.env.VERCEL_TEAM_ID

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error: 'VERCEL_TOKEN not configured',
        fetchedAt: new Date().toISOString(),
      },
      { status: 503 },
    )
  }

  try {
    const params = new URLSearchParams({ limit: '5' })
    if (projectId) params.set('projectId', projectId)
    if (teamId) params.set('teamId', teamId)

    const res = await fetch(`https://api.vercel.com/v6/deployments?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`Vercel ${res.status}`)
    }

    const json = await res.json()
    const items: any[] = json?.deployments || []

    const deployments = items.map((d: any) => {
      const created = d.created || d.createdAt || null
      const buildingAt = d.buildingAt || null
      const ready = d.ready || d.readyAt || null
      const durationSecs =
        ready && created ? Math.max(0, Math.round((ready - created) / 1000)) : null
      return {
        state: d.state || d.readyState || 'UNKNOWN',
        target: d.target || (d.meta?.githubCommitRef === 'main' ? 'production' : 'preview'),
        createdAt: created ? new Date(created).toISOString() : null,
        buildingAt: buildingAt ? new Date(buildingAt).toISOString() : null,
        readyAt: ready ? new Date(ready).toISOString() : null,
        url: d.url ? `https://${d.url}` : d.inspectorUrl || '',
        durationSecs,
      }
    })

    return NextResponse.json({
      ok: true,
      deployments,
      fetchedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || 'Vercel request failed',
        fetchedAt: new Date().toISOString(),
      },
      { status: 200 },
    )
  }
}
