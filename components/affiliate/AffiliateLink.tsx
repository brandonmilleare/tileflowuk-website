'use client'

import { type ReactNode, type MouseEvent } from 'react'

interface AffiliateLinkProps {
  href: string
  retailer: 'amazon' | 'deluxe' | 'awin' | 'wex' | 'other'
  product?: string
  page?: string
  className?: string
  children: ReactNode
}

export default function AffiliateLink({
  href,
  retailer,
  product,
  page,
  className,
  children,
}: AffiliateLinkProps) {
  const handleClick = (_e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return
    const w = window as unknown as { dataLayer?: unknown[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: 'affiliate_click',
      retailer,
      link_url: href,
      product: product ?? null,
      page: page ?? window.location.pathname,
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={handleClick}
      className={className}
      data-retailer={retailer}
    >
      {children}
    </a>
  )
}
