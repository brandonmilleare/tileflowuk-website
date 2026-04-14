import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Star, CheckCircle2, XCircle, ExternalLink, ChevronLeft } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, products } from '@/data/products'
import { Badge } from '@/components/ui/badge'
import ProductCard from '@/components/product/ProductCard'

// Next.js 16: params must be awaited
type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.image, width: 1200, height: 630, alt: product.name }],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(slug, product.category, 3)
  const fullStars = Math.floor(product.rating)
  const hasHalf = product.rating % 1 >= 0.5

  const price = product.priceNote
    ? `£${product.price.toLocaleString('en-GB')} (${product.priceNote})`
    : `£${product.price.toLocaleString('en-GB')}`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://tileflowuk.com${product.image}`,
    brand: { '@type': 'Brand', name: product.name.split(' ')[0] },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: product.affiliateUrl,
      seller: { '@type': 'Organization', name: 'Amazon UK' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-600 transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-stone-600 transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-stone-600 truncate">{product.shortName}</span>
        </nav>
      </div>

      {/* Main product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.badge && (
              <span className="absolute top-4 left-4">
                <Badge className="bg-amber-500 text-white border-0 text-sm font-semibold px-3 py-1.5">
                  {product.badge}
                </Badge>
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--tf-accent)] uppercase tracking-wider mb-2">
              {product.category}
            </span>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--tf-fg)] mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < fullStars
                        ? 'fill-amber-400 text-amber-400'
                        : i === fullStars && hasHalf
                          ? 'fill-amber-200 text-amber-400'
                          : 'text-stone-200 fill-stone-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[var(--tf-fg)]">{product.rating}</span>
              <span className="text-sm text-stone-400">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <p className="text-stone-600 leading-relaxed mb-6">{product.description}</p>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-stone-50 rounded-xl border border-stone-200 mb-8">
              <div className="flex-1">
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-0.5">Amazon Price</p>
                <p className="text-2xl font-bold text-[var(--tf-fg)]">{price}</p>
              </div>
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--tf-accent)] text-white font-bold rounded-full hover:bg-orange-600 transition-colors text-sm shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-transform"
              >
                View on Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Specs */}
            <div className="mb-6">
              <h2 className="font-semibold text-sm uppercase tracking-wide text-stone-400 mb-3">Specifications</h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm border-b border-stone-100 pb-2">
                    <dt className="text-stone-500">{key}</dt>
                    <dd className="font-medium text-[var(--tf-fg)]">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Pros & Cons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-green-600 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Pros
                </h3>
                <ul className="space-y-2">
                  {product.pros.map(pro => (
                    <li key={pro} className="text-sm text-stone-600 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-red-500 mb-3 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Cons
                </h3>
                <ul className="space-y-2">
                  {product.cons.map(con => (
                    <li key={con} className="text-sm text-stone-600 flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Disclosure */}
        <p className="mt-8 text-xs text-stone-400 border-t border-stone-100 pt-4">
          * As an Amazon Associate I earn from qualifying purchases at no extra cost to you.{' '}
          <Link href="/disclosure" className="underline hover:text-stone-600">Full disclosure</Link>.
        </p>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[var(--tf-fg)]">
                You Might Also Like
              </h2>
              <Link
                href="/shop"
                className="flex items-center gap-1 text-sm font-medium text-[var(--tf-primary)] hover:underline"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back to shop
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
