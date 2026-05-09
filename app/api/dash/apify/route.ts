/**
 * Dashboard data: Apify recent actor runs + monthly compute usage.
 *
 * Requires APIFY_API_TOKEN in Vercel env. Without it, returns 503 + error
 * so the dashboard panel can render an "unconfigured" state.
 *
 * Cached for 5 minutes via Next 16 fetch revalidate.
 */

import { NextResponse } from 'next/server'

const APIFY_BASE = 'https://api.apify.com/v2'

export const revalidate = 300

async function apify(path: string, token: string) {
  const res = await fetch(`${APIFY_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    throw new Error(`Apify ${res.status}: ${path}`)
  }
  return res.json()
}

export async function GET() {
  const token = process.env.APIFY_API_TOKEN

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error: 'APIFY_API_TOKEN not configured',
        fetchedAt: new Date().toISOString(),
      },
      { status: 503 },
    )
  }

  try {
    // Pull recent actors. Each actor's `stats.lastRunStartedAt` gives a recent-runs feel,
    // but for actual run data we hit /actor-runs.
    const [runsResp, usageResp] = await Promise.all([
      apify('/actor-runs?limit=10&desc=true', token),
      apify('/users/me/usage/monthly', token),
    ])

    const runItems: any[] = runsResp?.data?.items || []
    const recentRuns = runItems.map((r: any) => {
      const started = r.startedAt ? new Date(r.startedAt).getTime() : 0
      const finished = r.finishedAt ? new Date(r.finishedAt).getTime() : Date.now()
      const runtimeSecs = started ? Math.max(0, Math.round((finished - started) / 1000)) : 0
      return {
        actorName: r.actName || r.actorTaskId || r.actId || 'unknown',
        status: r.status,
        startedAt: r.startedAt,
        runtimeSecs,
        datasetItemsCount:
          r?.stats?.datasetItemCount ?? r?.defaultDatasetStats?.itemCount ?? 0,
      }
    })

    // Apify usage payload structure: data.monthlyUsage[] or data.usageCycle. We pull
    // the current monthly usage values; field names vary, so we soft-read.
    const usageData = usageResp?.data || {}
    const computeUnitsUsed =
      usageData?.monthlyServiceUsage?.COMPUTE_UNITS?.amount ??
      usageData?.computeUnits ??
      usageData?.usage?.COMPUTE_UNITS ??
      0
    const computeUnitsTotal =
      usageData?.monthlyServiceUsageLimit?.COMPUTE_UNITS?.amount ??
      usageData?.computeUnitsLimit ??
      usageData?.limits?.COMPUTE_UNITS ??
      null
    const period =
      usageData?.usageCycle?.startAt && usageData?.usageCycle?.endAt
        ? `${usageData.usageCycle.startAt.slice(0, 10)} → ${usageData.usageCycle.endAt.slice(0, 10)}`
        : usageData?.month || new Date().toISOString().slice(0, 7)

    return NextResponse.json({
      ok: true,
      recentRuns,
      usage: {
        computeUnitsUsed,
        computeUnitsTotal,
        period,
      },
      fetchedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || 'Apify request failed',
        fetchedAt: new Date().toISOString(),
      },
      { status: 200 },
    )
  }
}
