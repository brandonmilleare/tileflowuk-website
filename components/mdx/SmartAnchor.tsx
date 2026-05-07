'use client'

import { type AnchorHTMLAttributes, type MouseEvent } from 'react'

type Retailer = 'amazon' | 'deluxe' | 'awin' | 'wex' | 'other'

const AFFILIATE_HOSTS: Record<string, Retailer> = {
  'amzn.to': 'amazon',
  'amazon.co.uk': 'amazon',
  'www.amazon.co.uk': 'amazon',
  'amazon.com': 'amazon',
  'www.amazon.com': 'amazon',
  'deluxe-flooring.co.uk': 'deluxe',
  'www.deluxe-flooring.co.uk': 'deluxe',
  'awin1.com': 'awin',
  'www.awin1.com': 'awin',
}

function detectRetailer(href: string | undefined): Retailer | null {
  if (!href) return null
  try {
    // Allow protocol-relative + missing-protocol URLs
    const url = href.startsWith('http')
      ? new URL(href)
      : new URL(`https://${href}`)
    return AFFILIATE_HOSTS[url.hostname] ?? null
  } catch {
    return null
  }
}

/**
 * SmartAnchor — drop-in `<a>` for MDX content.
 *
 * If the href points at an affiliate host, this component:
 *   - injects `rel="nofollow sponsored noopener noreferrer"` (Amazon Operating
 *     Agreement + UK ASA requirement)
 *   - sets `target="_blank"`
 *   - fires a `dataLayer.push({ event: 'affiliate_click', ... })` on click so
 *     GTM forwards it to GA4 (parity with the existing AffiliateLink wrapper)
 *
 * For external-but-non-affiliate links, it just adds `rel="noopener noreferrer"`
 * and `target="_blank"` (security + UX hygiene).
 *
 * For internal links (no host or matching site), it renders a plain `<a>`.
 */
export default function SmartAnchor({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const retailer = detectRetailer(href)
  const isExternal = !!href && /^https?:\/\//.test(href) && !href.startsWith('https://tileflowuk.com')

  if (retailer) {
    const handleClick = (_e: MouseEvent<HTMLAnchorElement>) => {
      if (typeof window === 'undefined' || !href) return
      const w = window as unknown as { dataLayer?: unknown[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({
        event: 'affiliate_click',
        retailer,
        link_url: href,
        product: null,
        page: window.location.pathname,
        source: 'mdx',
      })
    }

    return (
      <a
        {...rest}
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        onClick={handleClick}
        data-retailer={retailer}
        data-affiliate="mdx"
      >
        {children}
      </a>
    )
  }

  if (isExternal) {
    return (
      <a {...rest} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  // Internal link — pass through as-is
  return (
    <a {...rest} href={href}>
      {children}
    </a>
  )
}
