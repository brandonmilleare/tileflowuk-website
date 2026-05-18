import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const SUBJECT_LABELS: Record<string, string> = {
  'tool-question': 'Question about a tool',
  'site-correction': 'Correction or feedback',
  'general': 'General enquiry',
}

const MAX_MESSAGE_LENGTH = 5000
const MAX_NAME_LENGTH = 120

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO || 'hello@tileflowuk.com'

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY missing — set it in Vercel env vars')
    return NextResponse.json({ ok: false, error: 'Server not configured' }, { status: 500 })
  }

  let body: { name?: string; email?: string; subject?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const name = (body.name || '').trim().slice(0, MAX_NAME_LENGTH)
  const email = (body.email || '').trim().toLowerCase()
  const subjectKey = (body.subject || '').trim()
  const message = (body.message || '').trim().slice(0, MAX_MESSAGE_LENGTH)

  if (!name || !email || !subjectKey || !message) {
    return NextResponse.json({ ok: false, error: 'All fields required' }, { status: 400 })
  }

  // Light email sanity check — full validation belongs to the browser + Resend itself.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  const subjectLabel = SUBJECT_LABELS[subjectKey] || 'General enquiry'

  const resend = new Resend(apiKey)

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px;">
      <h2 style="color: #1a1a1a;">New contact form message — TileFlow UK</h2>
      <p style="color: #555;"><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <h3 style="color: #1a1a1a;">Message</h3>
      <div style="white-space: pre-wrap; background: #f7f7f5; padding: 16px; border-radius: 8px; border: 1px solid #eee;">${escapeHtml(message)}</div>
      <p style="margin-top: 24px; font-size: 12px; color: #999;">
        Reply directly to this email — it goes back to the sender.
      </p>
    </div>
  `

  const text = `New contact form message — TileFlow UK

Subject: ${subjectLabel}
From: ${name} <${email}>

${message}

---
Reply directly to this email — it goes back to the sender.`

  try {
    const result = await resend.emails.send({
      from: 'TileFlow UK Contact <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `[TileFlow UK] ${subjectLabel} — ${name}`,
      html,
      text,
    })

    if (result.error) {
      console.error('[contact] Resend error:', result.error)
      return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 502 })
  }
}
