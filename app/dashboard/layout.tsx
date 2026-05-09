import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'

export const metadata = {
  title: 'TileFlow CEO Dashboard',
  robots: { index: false, follow: false }, // never index — internal tool
}

/**
 * Dashboard layout — auth gate.
 *
 * Auth model: simple cookie + env var. Brandon sets DASHBOARD_PASSWORD
 * in Vercel project env. The /dashboard/login route hashes the input
 * and sets a `dash` cookie. Any /dashboard/* request without a valid
 * cookie redirects to /dashboard/login.
 *
 * Why this and not full auth: solo operator, single user, no multi-tenant
 * needs. Bigger auth = bigger maintenance.
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const dash = cookieStore.get('dash')?.value
  const expected = process.env.DASHBOARD_PASSWORD_HASH

  // Only enforce auth if DASHBOARD_PASSWORD_HASH is set in env.
  // If missing in dev/local: open access (with a banner).
  const authNeeded = Boolean(expected)
  const authed = authNeeded ? dash === expected : true

  if (!authed) {
    redirect('/dashboard/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {!authNeeded && (
        <div className="bg-amber-900/30 border-b border-amber-800 text-amber-200 text-xs text-center py-2">
          Dev mode — set <code className="bg-amber-950 px-1 rounded">DASHBOARD_PASSWORD_HASH</code> in Vercel env to enable auth
        </div>
      )}
      {children}
    </div>
  )
}
