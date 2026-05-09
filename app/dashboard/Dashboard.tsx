'use client'

import { useEffect, useState } from 'react'

type GithubData = {
  ok: boolean
  prs?: Array<{ number: number; title: string; state: string; merged: boolean; url: string; updatedAt: string }>
  runs?: Array<{ id: number; name: string; status: string; conclusion: string | null; url: string; createdAt: string; event: string }>
  issues?: Array<{ number: number; title: string; url: string; labels: string[] }>
  fetchedAt: string
  error?: string
}

type SentryData = {
  ok: boolean
  configured: boolean
  issues?: Array<{ id: string; title: string; culprit: string; events: number; users: number; firstSeen: string; url: string }>
  message?: string
  error?: string
  fetchedAt: string
}

type LocalData = {
  ok: boolean
  agents?: string[]
  skills?: string[]
  mcps?: string[]
  tomorrow?: string | null
  sessions?: Array<{ date: string; title: string; file: string }>
  source?: string
  error?: string
  fetchedAt: string
}

type AffiliateData = {
  ok: boolean
  productCount?: number
  amazonUrls?: number
  deluxeUrls?: number
  totalTagged?: number
  fetchedAt: string
}

const REFRESH_INTERVAL = 60_000 // 60s

function timeAgo(iso: string | undefined): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function Pill({ tone, children }: { tone: 'green' | 'red' | 'amber' | 'blue' | 'grey'; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    green: 'bg-emerald-500/15 text-emerald-400',
    red: 'bg-red-500/15 text-red-400',
    amber: 'bg-amber-500/15 text-amber-400',
    blue: 'bg-blue-500/15 text-blue-400',
    grey: 'bg-gray-500/15 text-gray-400',
  }
  return <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles[tone]}`}>{children}</span>
}

function Card({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">{title}</h3>
        {badge && <span className="text-xs text-gray-500">{badge}</span>}
      </div>
      {children}
    </div>
  )
}

function KPI({ label, value, hint, tone }: { label: string; value: string | number; hint?: string; tone?: 'green' | 'red' | 'normal' }) {
  const colourMap = { green: 'text-emerald-400', red: 'text-red-400', normal: 'text-gray-100' }
  const colour = colourMap[tone || 'normal']
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-3xl font-bold ${colour}`}>{value}</div>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </div>
  )
}

export default function Dashboard() {
  const [github, setGithub] = useState<GithubData | null>(null)
  const [sentry, setSentry] = useState<SentryData | null>(null)
  const [local, setLocal] = useState<LocalData | null>(null)
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  async function fetchAll() {
    const [g, s, l, a] = await Promise.all([
      fetch('/api/dash/github').then((r) => r.json()).catch(() => ({ ok: false })),
      fetch('/api/dash/sentry').then((r) => r.json()).catch(() => ({ ok: false })),
      fetch('/api/dash/local').then((r) => r.json()).catch(() => ({ ok: false })),
      fetch('/api/dash/affiliate-health').then((r) => r.json()).catch(() => ({ ok: false })),
    ])
    setGithub(g)
    setSentry(s)
    setLocal(l)
    setAffiliate(a)
    setLastRefresh(new Date())
  }

  useEffect(() => {
    fetchAll()
    const t = setInterval(fetchAll, REFRESH_INTERVAL)
    return () => clearInterval(t)
  }, [])

  const openPRs = (github?.prs || []).filter((p) => p.state === 'open' && !p.merged).length
  const recentMerged = (github?.prs || []).filter((p) => p.merged).slice(0, 5)
  const sentry24h = (sentry?.issues || []).reduce((sum, i) => sum + i.events, 0)
  const lastDeployRun = (github?.runs || []).find((r) => r.event === 'push')

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-sm text-white">
            T
          </div>
          <div>
            <div className="font-semibold text-sm">TileFlow CEO Dashboard</div>
            <div className="text-xs text-gray-500">
              Last refresh: {timeAgo(lastRefresh.toISOString())} · Auto every 60s
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
          <button
            onClick={fetchAll}
            className="text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Refresh now"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPI label="Open PRs" value={openPRs} hint={`${recentMerged.length} merged recently`} />
          <KPI
            label="Sentry events (7d)"
            value={sentry?.configured ? sentry24h : '—'}
            hint={sentry?.configured ? `${(sentry?.issues || []).length} unresolved` : 'Add SENTRY_AUTH_TOKEN'}
            tone={sentry?.configured ? (sentry24h === 0 ? 'green' : sentry24h > 50 ? 'red' : 'normal') : 'normal'}
          />
          <KPI
            label="Affiliate URLs"
            value={affiliate?.totalTagged ?? '—'}
            hint={`${affiliate?.amazonUrls || 0} Amazon · ${affiliate?.deluxeUrls || 0} Deluxe`}
            tone="green"
          />
          <KPI
            label="Products on /shop"
            value={affiliate?.productCount ?? '—'}
            hint="all with verified images"
          />
        </div>

        {/* Row 2: GitHub + Sentry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card title="GitHub · tileflowuk-website" badge={github?.fetchedAt ? `synced ${timeAgo(github.fetchedAt)}` : 'loading…'}>
              {github?.error && <div className="text-xs text-red-400 mb-3">Error: {github.error}</div>}
              <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Recent PRs</div>
              <div className="space-y-1.5 mb-5">
                {(github?.prs || []).slice(0, 5).map((p) => (
                  <a
                    key={p.number}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-1.5 border-b border-gray-800 hover:bg-gray-800/50 -mx-2 px-2 rounded transition-colors"
                  >
                    <div className="flex items-center gap-3 text-sm min-w-0">
                      <Pill tone={p.merged ? 'green' : p.state === 'open' ? 'blue' : 'grey'}>
                        {p.merged ? 'merged' : p.state}
                      </Pill>
                      <span className="truncate">#{p.number} {p.title}</span>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{timeAgo(p.updatedAt)}</span>
                  </a>
                ))}
                {!github?.prs?.length && !github?.error && <div className="text-xs text-gray-500">Loading…</div>}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Recent workflow runs</div>
              <div className="space-y-1.5">
                {(github?.runs || []).slice(0, 5).map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-1.5 border-b border-gray-800 hover:bg-gray-800/50 -mx-2 px-2 rounded transition-colors"
                  >
                    <div className="flex items-center gap-3 text-sm min-w-0">
                      <Pill
                        tone={
                          r.conclusion === 'success'
                            ? 'green'
                            : r.conclusion === 'failure'
                            ? 'red'
                            : r.status === 'in_progress'
                            ? 'amber'
                            : 'grey'
                        }
                      >
                        {r.conclusion === 'success' ? '✓ pass' : r.conclusion === 'failure' ? '✗ fail' : r.status}
                      </Pill>
                      <span className="truncate">{r.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{r.event}</span>
                  </a>
                ))}
              </div>
            </Card>
          </div>

          <Card title="Sentry · last 7 days" badge={sentry?.fetchedAt ? `synced ${timeAgo(sentry.fetchedAt)}` : ''}>
            {!sentry?.configured && (
              <div className="text-xs text-amber-400 bg-amber-900/20 border border-amber-800/40 rounded p-3 mb-3">
                {sentry?.message || 'Configure to enable.'}
              </div>
            )}
            {sentry?.error && <div className="text-xs text-red-400 mb-3">Error: {sentry.error}</div>}
            <div className="space-y-3">
              {(sentry?.issues || []).map((i) => (
                <a
                  key={i.id}
                  href={i.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-800/50 -mx-2 px-2 py-1 rounded transition-colors"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300 truncate flex-1">{i.title}</span>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{i.events} ev</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{i.culprit || `${i.users} users`}</div>
                </a>
              ))}
              {sentry?.configured && !(sentry?.issues || []).length && !sentry?.error && (
                <div className="text-xs text-emerald-400">🎉 No unresolved issues in the last 7 days.</div>
              )}
            </div>
          </Card>
        </div>

        {/* Row 3: Local brain */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Agents" badge={local?.agents ? String(local.agents.length) : ''}>
            <div className="space-y-1 text-sm">
              {(local?.agents || []).map((a) => (
                <div key={a} className="text-gray-300">{a}</div>
              ))}
              {!local?.agents?.length && <div className="text-xs text-gray-500">No agents found.</div>}
            </div>
          </Card>

          <Card title="Skills" badge={local?.skills ? String(local.skills.length) : ''}>
            <div className="space-y-1 text-sm max-h-80 overflow-y-auto">
              {(local?.skills || []).map((s) => (
                <div key={s} className="text-gray-300">{s}</div>
              ))}
              {!local?.skills?.length && <div className="text-xs text-gray-500">No skills found.</div>}
            </div>
          </Card>

          <Card title="MCPs" badge={local?.mcps ? String(local.mcps.length) : ''}>
            <div className="space-y-1 text-sm">
              {(local?.mcps || []).map((m) => (
                <div key={m} className="flex items-center justify-between">
                  <span className="text-gray-300">{m}</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              ))}
              {!local?.mcps?.length && <div className="text-xs text-gray-500">Snapshot not yet generated.</div>}
            </div>
          </Card>

          <Card title="What's next" badge="TOMORROW.md">
            <div className="text-sm text-gray-300 whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed">
              {local?.tomorrow ? (
                local.tomorrow.split('\n').slice(0, 30).join('\n')
              ) : (
                <span className="text-xs text-gray-500">No TOMORROW.md found.</span>
              )}
            </div>
          </Card>
        </div>

        {/* Row 4: Recent sessions */}
        <Card title="Recent sessions" badge="projects/sessions/">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {(local?.sessions || []).map((s) => (
              <div key={s.file} className="bg-gray-950 border border-gray-800 rounded p-3">
                <div className="text-[11px] text-gray-500 mb-1">{s.date}</div>
                <div className="text-sm font-medium truncate">{s.title}</div>
              </div>
            ))}
            {!local?.sessions?.length && <div className="text-xs text-gray-500">No sessions found.</div>}
          </div>
        </Card>

        {/* Footer note */}
        <div className="text-center text-xs text-gray-600 pt-4">
          {local?.source === 'snapshot'
            ? 'Local data from nightly snapshot'
            : local?.source === 'live'
            ? 'Local data from live filesystem (dev mode)'
            : ''}
        </div>
      </div>
    </div>
  )
}
