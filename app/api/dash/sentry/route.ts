/**
 * Dashboard data: Sentry top issues (last 7 days).
 *
 * Requires SENTRY_AUTH_TOKEN in Vercel env (same token Brandon adds
 * for the weekly digest workflow).
 *
 * Optional vars: SENTRY_ORG_SLUG, SENTRY_PROJECT_SLUG.
 * Defaults: tileflowuk / tileflowuk-v2.
 */

import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.SENTRY_AUTH_TOKEN
  const org = process.env.SENTRY_ORG_SLUG || 'tileflowuk'
  const project = process.env.SENTRY_PROJECT_SLUG || 'tileflowuk-v2'

  if (!token) {
    return NextResponse.json({
      ok: false,
      configured: false,
      message: 'Add SENTRY_AUTH_TOKEN to Vercel env to enable.',
      fetchedAt: new Date().toISOString(),
    })
  }

  try {
    const url =
      `https://sentry.io/api/0/projects/${org}/${project}/issues/?` +
      new URLSearchParams({
        query: 'is:unresolved age:-7d',
        sort: 'freq',
        limit: '8',
        statsPeriod: '7d',
      }).toString()

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error(`Sentry ${res.status}`)
    const issues = await res.json()

    return NextResponse.json({
      ok: true,
      configured: true,
      issues: issues.map((i: any) => ({
        id: i.id,
        title: i.title || i.metadata?.value || i.shortId,
        culprit: i.culprit,
        events: parseInt(i.count || '0', 10),
        users: i.userCount || 0,
        firstSeen: i.firstSeen,
        url: i.permalink || `https://${org}.sentry.io/issues/${i.id}/`,
      })),
      fetchedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      configured: true,
      error: err.message,
      fetchedAt: new Date().toISOString(),
    })
  }
}
