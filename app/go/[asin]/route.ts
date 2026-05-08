import { NextResponse } from 'next/server'
import { AMAZON_TAG } from '@/data/affiliateLinks'

/**
 * Affiliate redirect handler — /go/<asin>
 *
 * Why this exists:
 * 1. Short, stable internal URL we control (e.g. /go/B0CXWLTZJ7) survives
 *    TikTok / Instagram / WhatsApp in-app webviews better than amzn.to which
 *    has been observed stripping cookies on some webview redirect chains.
 * 2. We can fire a server-side analytics event on the redirect (future).
 * 3. We never lose the tileflowuk-21 affiliate tag — it's appended here, not
 *    inside amzn.to's redirect.
 * 4. If Amazon ever changes the affiliate tag format, we update one constant.
 *
 * Behaviour: HTTP 302 to https://www.amazon.co.uk/dp/<ASIN>?tag=tileflowuk-21
 * Caching: no-store (we want every click counted on Amazon's side).
 * Validation: ASIN must match Amazon's 10-char alphanumeric pattern. Invalid
 *   ASINs return 400 rather than redirecting to a broken Amazon URL.
 */

const ASIN_RE = /^[A-Z0-9]{10}$/

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  ctx: { params: Promise<{ asin: string }> },
): Promise<Response> {
  const { asin: raw } = await ctx.params
  const asin = (raw ?? '').toUpperCase().trim()

  if (!ASIN_RE.test(asin)) {
    return new NextResponse('Invalid ASIN', { status: 400 })
  }

  const url = new URL(request.url)
  const passThrough: string[] = []
  // Preserve UTM tracking parameters if present so Amazon-side reports keep
  // attribution. Amazon strips most query strings, but tag is the one that
  // matters for commission.
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const v = url.searchParams.get(k)
    if (v) passThrough.push(`${k}=${encodeURIComponent(v)}`)
  }

  const target = `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}${
    passThrough.length ? '&' + passThrough.join('&') : ''
  }`

  const res = NextResponse.redirect(target, 302)
  res.headers.set('Cache-Control', 'no-store, max-age=0')
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}
