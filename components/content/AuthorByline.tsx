import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Author byline strip — render at the foot of every blog/guide/best-of post.
 *
 * Why this matters:
 *  Google's 2024-2025 Core Updates rewarded sites with clear author identity
 *  and penalised "anonymous affiliate sites". An author footer linking to
 *  /about creates authority signal continuity: every post becomes another
 *  internal vote for the about page, and the about page passes authority
 *  back through Person schema (@id at /about#person).
 */
export default function AuthorByline() {
  return (
    <aside
      className="mt-12 pt-8 border-t border-stone-200"
      aria-label="About the author"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-stone-50 rounded-xl border border-stone-100">
        <div className="flex-1">
          <p className="font-display font-bold text-[var(--tf-fg)] text-base mb-1">
            Brandon — TileFlow UK
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            15 years in the trade. Bathrooms, kitchens, wet rooms, commercial
            floors. Independent reviews — no sponsored content, no paid
            placements.
          </p>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:text-[var(--tf-primary-hover)] whitespace-nowrap"
        >
          About me <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  )
}
