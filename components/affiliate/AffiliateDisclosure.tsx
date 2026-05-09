import Link from 'next/link'

/**
 * Affiliate disclosure block — ASA-compliant, three render modes.
 *
 * Why three modes:
 *  - 'inline' (compact): single-line "#ad" capsule for above the fold on
 *    posts. ASA wants disclosure visible BEFORE the first affiliate click,
 *    not buried in the footer. Used inside MDX or top of page templates.
 *  - 'banner': larger card with the full sentence. For top-of-page on
 *    /shop/[slug] and /best-of/[slug] where commercial intent is highest.
 *  - 'footer': long-form for end-of-post. Replaces the old paragraph that
 *    lived inside individual MDX files (publish-gate caught those gaps).
 *
 * UK ASA reference (2024): "consumers must be able to recognise marketing
 * communications as such" and disclosure "must be obvious in advance".
 *
 * Amazon Operating Agreement (10 April 2026 update): clear and conspicuous
 * statement that the site is an Amazon Associate is mandatory on every
 * page that contains an Amazon affiliate link.
 */

export type AffiliateDisclosureMode = 'inline' | 'banner' | 'footer'

interface Props {
  mode?: AffiliateDisclosureMode
  className?: string
}

export default function AffiliateDisclosure({
  mode = 'banner',
  className = '',
}: Props) {
  if (mode === 'inline') {
    return (
      <p
        className={`text-xs text-stone-500 not-prose ${className}`}
        role="note"
        aria-label="Affiliate disclosure"
      >
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-stone-100 text-stone-700 font-semibold uppercase tracking-wide text-[10px]">
          #ad
        </span>{' '}
        This page contains Amazon affiliate links — I earn a small commission
        if you buy, at no extra cost to you.{' '}
        <Link href="/disclosure" className="underline hover:text-stone-700">
          Full disclosure
        </Link>
        .
      </p>
    )
  }

  if (mode === 'footer') {
    return (
      <aside
        className={`mt-10 p-5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-600 ${className}`}
        aria-label="Affiliate disclosure"
      >
        <p className="font-semibold text-[var(--tf-fg)] mb-1">
          Affiliate disclosure
        </p>
        <p className="leading-relaxed">
          TileFlow UK is an Amazon Associate (tag: <code>tileflowuk-21</code>).
          The Amazon links on this page pay a small commission if you buy —
          at no extra cost to you. It funds the site so I can keep these
          guides free and independent. I include the cons in every review,
          even on products I rate highly. I&apos;ve never accepted a payment
          to change a recommendation.{' '}
          <Link
            href="/disclosure"
            className="underline hover:text-[var(--tf-primary)]"
          >
            Full affiliate disclosure
          </Link>
          .
        </p>
      </aside>
    )
  }

  // banner — default
  return (
    <div
      className={`flex items-start gap-3 p-3 sm:p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm ${className}`}
      role="note"
      aria-label="Affiliate disclosure"
    >
      <span
        className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold uppercase tracking-wide text-[10px] flex-shrink-0 mt-0.5"
        aria-hidden
      >
        #ad
      </span>
      <p className="text-amber-900 leading-snug">
        Amazon affiliate links below — I earn a small commission if you buy
        through them, at no extra cost to you. Independent review, no
        sponsored content.{' '}
        <Link href="/disclosure" className="underline hover:no-underline">
          How this works
        </Link>
        .
      </p>
    </div>
  )
}
