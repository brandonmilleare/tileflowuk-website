'use client'

import { Mail, MessageCircle } from 'lucide-react'

/**
 * TileEnquiryButtons — the "Email to order" + "WhatsApp" buttons on a tile page.
 *
 * Why a client component: the tile page is a Server Component, so it can't fire
 * a click handler. This wrapper pushes a `tile_enquiry` event to the GTM
 * dataLayer (→ GA4) so Brandon can actually SEE direct-sale demand — previously
 * these were plain <a> tags firing zero analytics, so enquiry intent was invisible.
 *
 * URLs are computed server-side (mailto/whatsapp helpers from @/data/tiles) and
 * passed in as props — this component only adds the tracking + markup.
 */
export default function TileEnquiryButtons({
  tileName,
  mailto,
  whatsapp,
}: {
  tileName: string
  mailto: string
  whatsapp: string
}) {
  function track(method: 'email' | 'whatsapp') {
    if (typeof window === 'undefined') return
    const w = window as unknown as { dataLayer?: unknown[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: 'tile_enquiry',
      method,
      tile: tileName,
      page: window.location.pathname,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2.5">
      <a
        href={mailto}
        onClick={() => track('email')}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--tf-primary)] text-white font-bold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors text-sm shadow-md flex-1"
      >
        <Mail className="w-4 h-4" />
        Email to order
      </a>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener"
        onClick={() => track('whatsapp')}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#1ea850] transition-colors text-sm shadow-md flex-1"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
    </div>
  )
}
