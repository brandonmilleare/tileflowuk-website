import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Zap } from 'lucide-react'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Tool Deals — Best Prices on Amazon',
  description:
    'The best current prices on professional tiling tools. All links to Amazon UK — checked and updated regularly.',
}

export default function DealsPage() {
  // Show all products sorted with featured first as "deals"
  const dealProducts = [...products].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.price - b.price
  })

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-amber-600 fill-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
              Updated Regularly
            </span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Tool Deals
          </h1>
          <p className="text-stone-500 text-lg">
            The best prices on professional tiling tools — all Amazon UK. Click through to see current live pricing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-xs text-stone-400 mb-6 italic">
          * Prices correct at time of writing. As an Amazon Associate I earn from qualifying purchases.
        </p>

        <div className="grid gap-3">
          {dealProducts.map(product => (
            <div
              key={product.slug}
              className="bg-white rounded-xl border border-stone-200 p-4 flex items-center gap-4 hover:shadow-sm hover:border-stone-300 transition-all"
            >
              <div className="flex-1 min-w-0">
                <Link
                  href={`/shop/${product.slug}`}
                  className="font-semibold text-[var(--tf-fg)] hover:text-[var(--tf-primary)] transition-colors text-sm leading-snug block mb-0.5"
                >
                  {product.name}
                </Link>
                <span className="text-xs text-stone-400">{product.category}</span>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-[var(--tf-fg)] text-sm">
                  £{product.price.toLocaleString('en-GB')}
                  {product.priceNote && <span className="text-xs font-normal text-stone-400 ml-1">({product.priceNote})</span>}
                </p>
              </div>
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--tf-accent)] text-white text-xs font-semibold rounded-full hover:bg-orange-600 transition-colors shrink-0"
              >
                Amazon <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
