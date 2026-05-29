import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * POST /api/newsletter — capture a newsletter signup.
 *
 * Replaces the old client-side stub that faked success and silently discarded
 * every email. Two capture modes, in order of preference:
 *   1. If RESEND_AUDIENCE_ID is set → add the email to that Resend Audience
 *      (proper list-building; lets Brandon broadcast to the list later).
 *   2. Otherwise → email a notification to NEWSLETTER_EMAIL_TO so the signup is
 *      never lost. This is the safety net, not the long-term home.
 *
 * To upgrade to mode 1: create an Audience in the Resend dashboard, then set
 * RESEND_AUDIENCE_ID in Vercel env vars.
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NEWSLETTER_EMAIL_TO || process.env.CONTACT_EMAIL_TO || 'tileflowuk@gmail.com'
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey) {
    console.error('[newsletter] RESEND_API_KEY missing — set it in Vercel env vars')
    return NextResponse.json({ ok: false, error: 'Server not configured' }, { status: 500 })
  }

  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email || '').trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  const resend = new Resend(apiKey)

  // Mode 1 — add to a Resend Audience (preferred, proper list-building).
  if (audienceId) {
    try {
      const r = await resend.contacts.create({ email, audienceId, unsubscribed: false })
      if (!r.error) {
        return NextResponse.json({ ok: true })
      }
      console.error('[newsletter] contacts.create error, falling back to email:', r.error)
    } catch (err) {
      console.error('[newsletter] contacts.create threw, falling back to email:', err)
    }
    // fall through to the notification fallback if the audience add failed
  }

  // Mode 2 — notification email (safety net so a signup is never silently lost).
  try {
    const result = await resend.emails.send({
      from: 'TileFlow UK Newsletter <onboarding@resend.dev>',
      to: [to],
      subject: '[TileFlow UK] New newsletter signup',
      html: `<div style="font-family:-apple-system,system-ui,sans-serif"><p>New newsletter signup:</p><p><strong>${escapeHtml(email)}</strong></p><p style="font-size:12px;color:#999">Add this to your mailing list. (Set RESEND_AUDIENCE_ID in Vercel to auto-collect these into a Resend Audience instead.)</p></div>`,
      text: `New newsletter signup: ${email}`,
    })

    if (result.error) {
      console.error('[newsletter] Resend error:', result.error)
      return NextResponse.json({ ok: false, error: 'Signup failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err)
    return NextResponse.json({ ok: false, error: 'Signup failed' }, { status: 502 })
  }
}
