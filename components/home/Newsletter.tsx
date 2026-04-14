'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState('loading')
    // TODO: Wire up to Mailchimp / ConvertKit / Klaviyo
    await new Promise(r => setTimeout(r, 800))
    setState('success')
  }

  return (
    <section className="py-16 lg:py-20 bg-white border-t border-stone-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
          Get the Best Deals First
        </h2>
        <p className="text-stone-500 mb-8">
          New tool reviews, price drops, and trade tips delivered straight to your inbox. No spam — just the good stuff.
        </p>

        {state === 'success' ? (
          <div className="flex flex-col items-center gap-3 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
            <p className="font-semibold">You&apos;re on the list — welcome aboard!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.co.uk"
              required
              className="flex-1 px-4 py-3 rounded-full border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--tf-primary)] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-70 shrink-0"
            >
              {state === 'loading' ? 'Subscribing…' : (
                <>Subscribe <Send className="w-3.5 h-3.5" /></>
              )}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-stone-400">
          Unsubscribe any time. No sponsored emails ever.
        </p>
      </div>
    </section>
  )
}
