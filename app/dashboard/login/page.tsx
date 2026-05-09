import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'node:crypto'

async function loginAction(formData: FormData) {
  'use server'
  const password = String(formData.get('password') || '')
  if (!password) return

  // Hash the input — never store/compare plaintext
  const hash = createHash('sha256').update(password).digest('hex')
  const expected = process.env.DASHBOARD_PASSWORD_HASH

  if (!expected) {
    // No password configured = dev mode, just let them in
    redirect('/dashboard')
  }

  if (hash !== expected) {
    redirect('/dashboard/login?error=wrong')
  }

  const cookieStore = await cookies()
  cookieStore.set('dash', hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/dashboard',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  redirect('/dashboard')
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
      <form
        action={loginAction}
        className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-sm">
            T
          </div>
          <div>
            <div className="font-semibold text-sm">TileFlow CEO</div>
            <div className="text-xs text-gray-500">Dashboard access</div>
          </div>
        </div>

        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
          Password
        </label>
        <input
          name="password"
          type="password"
          autoFocus
          required
          className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-orange-500"
        />

        {error === 'wrong' && (
          <p className="text-xs text-red-400 mt-2">Wrong password.</p>
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 text-sm transition-colors"
        >
          Sign in
        </button>

        <p className="text-xs text-gray-600 mt-4">
          Internal tool. Set <code className="bg-gray-950 px-1 rounded">DASHBOARD_PASSWORD_HASH</code> in
          Vercel env vars to control access.
        </p>
      </form>
    </div>
  )
}
