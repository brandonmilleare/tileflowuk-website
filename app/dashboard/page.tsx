import Dashboard from './Dashboard'

// Always fresh — no static caching of the dashboard shell
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return <Dashboard />
}
