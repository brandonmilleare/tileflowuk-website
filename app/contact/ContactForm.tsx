'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.ok) {
        setState('success')
      } else {
        setErrorMessage(
          typeof data?.error === 'string'
            ? data.error
            : 'Something went wrong sending your message.',
        )
        setState('error')
      }
    } catch {
      setErrorMessage('Network error — please try again or email hello@tileflowuk.com directly.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold text-[var(--tf-fg)] mb-2">Message sent!</h2>
        <p className="text-stone-500">I&apos;ll get back to you within a few days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--tf-fg)] mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--tf-primary)] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--tf-fg)] mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--tf-primary)] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--tf-fg)] mb-1.5">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--tf-primary)] focus:border-transparent bg-white"
        >
          <option value="">Select a subject…</option>
          <option value="tool-question">Question about a tool</option>
          <option value="site-correction">Correction or feedback</option>
          <option value="general">General enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--tf-fg)] mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--tf-primary)] focus:border-transparent resize-none"
        />
      </div>

      {state === 'error' && errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors disabled:opacity-70 text-sm"
      >
        {state === 'loading' ? 'Sending…' : (<>Send message <Send className="w-3.5 h-3.5" /></>)}
      </button>
    </form>
  )
}
