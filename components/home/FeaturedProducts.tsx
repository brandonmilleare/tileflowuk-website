import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProducts } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

export default function FeaturedProducts() {
  const featured = featuredProducts.slice(0, 3)

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-2">
              Editor&apos;s Picks
            </h2>
            <p className="text-stone-500">The tools I reach for first on every job.</p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:gap-2.5 transition-all"
          >
            View all tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i === 0} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white text-sm font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors"
          >
            See All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
