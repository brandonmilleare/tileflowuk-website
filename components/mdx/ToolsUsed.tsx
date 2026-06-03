import Link from 'next/link'
import Image from 'next/image'
import { Wrench, ArrowRight } from 'lucide-react'
import { getProductBySlug } from '@/data/products'

/**
 * <ToolsUsed slugs="sigma-4bu-70cm, dewalt-18v-angle-grinder" />
 *
 * Renders an internal-linking "Tools I used" box inside MDX content. Each entry
 * links to the matching /shop/<slug> product page (internal — the affiliate
 * button lives on that page), which strengthens content→commercial internal
 * linking and gives readers a clear next step.
 *
 * Server component: reads product data directly. Unknown slugs are skipped
 * silently so a typo never breaks a published post.
 */
export default function ToolsUsed({
  slugs,
  title = 'Tools I used',
}: {
  slugs: string | string[]
  title?: string
}) {
  const list = (Array.isArray(slugs) ? slugs : slugs.split(','))
    .map(s => s.trim())
    .filter(Boolean)

  const items = list.map(getProductBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p))
  if (items.length === 0) return null

  return (
    <div className="not-prose my-8 rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="w-4 h-4 text-[var(--tf-primary)]" />
        <h3 className="font-display text-base font-bold text-[var(--tf-fg)] m-0">{title}</h3>
      </div>
      <ul className="space-y-2.5 list-none p-0 m-0">
        {items.map(p => (
          <li key={p.slug} className="m-0">
            <Link
              href={`/shop/${p.slug}`}
              className="group flex items-center gap-3 rounded-xl bg-white border border-stone-200 px-3 py-2.5 hover:border-[var(--tf-primary)] transition-colors no-underline"
            >
              <span className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-stone-100">
                <Image
                  src={p.image}
                  alt={p.shortName}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[var(--tf-fg)] truncate">
                  {p.shortName}
                </span>
                <span className="block text-xs text-stone-400">{p.category}</span>
              </span>
              <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-[var(--tf-primary)]">
                View
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
