'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-[var(--tf-fg)] text-white rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm leading-relaxed">
          <p>
            We use cookies to analyse site traffic and improve your experience.{' '}
            <Link href="/privacy" className="underline hover:text-stone-300 transition-colors">
              Privacy policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-xs text-stone-400 hover:text-white transition-colors px-3 py-2"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold bg-[var(--tf-accent)] hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors"
          >
            Accept cookies
          </button>
          <button
            onClick={decline}
            aria-label="Close"
            className="p-1.5 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
