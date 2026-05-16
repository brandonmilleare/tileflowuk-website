import type { Metadata } from 'next'
import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'
import {
  previewProducts,
  previewCategories,
  type PreviewProduct,
  type PreviewCategory,
} from '@/data/preview-products'
import { formatGBP } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Shop Preview — 23 New ASIN Listings (Internal Review)',
  description:
    'Internal preview of 23 new Amazon-affiliate products across Prep, Adhesives and Application Tools. Brandon-only.',
  robots: { index: false, follow: false, nocache: true },
}

const CATEGORY_DESCRIPTIONS: Record<PreviewCategory, string> = {
  Prep: 'Tile backer boards, washers, primers, screws and tanking — everything you need before the tiles go up.',
  Adhesives:
    'Tile adhesives — rapid-set, flexible and ready-mix options for floors, walls and wet rooms.',
  'Application Tools':
    'Trowels, floats, buckets and grouting tools — the everyday kit a UK tiler reaches for.',
}

export default function ShopPreviewPage() {
  const grouped: Record<PreviewCategory, PreviewProduct[]> = {
    Prep: [],
    Adhesives: [],
    'Application Tools': [],
  }
  for (const p of previewProducts) grouped[p.category].push(p)

  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Internal review banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-amber-900 flex items-center gap-2">
          <span className="font-semibold">INTERNAL PREVIEW</span>
          <span className="text-amber-700">
            · {previewProducts.length} products · Not indexed · Verify everything before pushing to
            production /shop
          </span>
        </div>
      </div>

      {/* Page header */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-2">
            Shop Preview · 23 ASIN Listings
          </h1>
          <p className="text-stone-500 max-w-3xl">
            Real Amazon UK data via Apify. All affiliate links carry the{' '}
            <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">tileflowuk-21</code> tag.
            Click any &quot;View on Amazon&quot; to verify the destination.
          </p>
          <nav className="flex flex-wrap gap-2 mt-6">
            {previewCategories.map(cat => (
              <a
                key={cat}
                href={`#cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border border-stone-300 text-stone-700 hover:bg-[var(--tf-ink)] hover:text-white hover:border-[var(--tf-ink)] transition-colors"
              >
                {cat} ({grouped[cat].length})
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {previewCategories.map(cat => (
          <section key={cat} id={`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`} className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-[var(--tf-fg)] mb-2">
                {cat}
              </h2>
              <p className="text-stone-500 max-w-2xl text-sm">
                {CATEGORY_DESCRIPTIONS[cat]}
              </p>
            </div>

            {grouped[cat].length === 0 ? (
              <p className="text-stone-400 text-sm italic">No products in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {grouped[cat].map(p => (
                  <PreviewCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </section>
        ))}

        <p className="text-xs text-stone-400 border-t border-stone-100 pt-4">
          All product data fetched from Amazon UK via Apify on {new Date().toLocaleDateString('en-GB')}.
          Prices and stock are live at the time of fetch — verify before final publish.
        </p>
      </div>
    </div>
  )
}

function PreviewCard({ product }: { product: PreviewProduct }) {
  const fullStars = Math.floor(product.rating)
  const hasHalf = product.rating % 1 >= 0.5
  return (
    <article className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col">
      <div className="relative block aspect-[4/3] bg-stone-50 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-50 text-amber-800 text-xs font-semibold text-center px-4">
            Image unavailable — verify on Amazon
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {product.brand && (
          <p className="text-xs font-medium text-[var(--tf-accent)] uppercase tracking-wider mb-1">
            {product.brand}
          </p>
        )}
        <h3 className="font-semibold text-[var(--tf-fg)] leading-snug mb-2 line-clamp-3 text-sm flex-1">
          {product.title}
        </h3>

        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < fullStars
                      ? 'fill-amber-400 text-amber-400'
                      : i === fullStars && hasHalf
                        ? 'fill-amber-200 text-amber-400'
                        : 'text-stone-200 fill-stone-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-stone-500">
              {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        )}

        <div className="text-xs text-stone-500 mb-3 line-clamp-3">{product.description}</div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
          <div className="flex flex-col leading-tight">
            {product.price > 0 ? (
              <span className="font-bold text-[var(--tf-fg)]">{formatGBP(product.price)}</span>
            ) : (
              <span className="text-xs font-medium text-stone-600">Check Amazon</span>
            )}
            <span className="text-[10px] text-stone-400 font-normal uppercase tracking-wide">
              ASIN {product.asin}
            </span>
          </div>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[var(--tf-accent)] text-white text-xs font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            View on Amazon
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  )
}
