import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Mail, CheckCircle2, ChevronLeft } from 'lucide-react'
import {
  getTileBySlug,
  getRelatedTiles,
  tiles,
  enquiryMailto,
  ENQUIRY_EMAIL,
} from '@/data/tiles'
import TileCard from '@/components/tiles/TileCard'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tiles.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tile = getTileBySlug(slug)
  if (!tile) return {}
  const title = `${tile.name} — ${tile.style} | Coming Soon`
  return {
    title,
    description: tile.description,
    alternates: {
      canonical: `https://tileflowuk.com/tiles/${tile.slug}`,
    },
    openGraph: {
      title: `${tile.name} — ${tile.style}`,
      description: tile.description,
      url: `https://tileflowuk.com/tiles/${tile.slug}`,
      images: [
        {
          url: tile.images[0],
          width: 1200,
          height: 630,
          alt: `${tile.name} tile — ${tile.style}`,
        },
      ],
    },
  }
}

export default async function TileDetailPage({ params }: PageProps) {
  const { slug } = await params
  const tile = getTileBySlug(slug)
  if (!tile) notFound()

  const related = getRelatedTiles(slug, 3)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tile.name,
    description: tile.description,
    image: tile.images.map(i => `https://tileflowuk.com${i}`),
    brand: { '@type': 'Brand', name: tile.range },
    category: tile.style,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/PreOrder',
      url: `https://tileflowuk.com/tiles/${tile.slug}`,
      seller: { '@type': 'Organization', name: 'TileFlow UK' },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tileflowuk.com' },
      { '@type': 'ListItem', position: 2, name: 'Tiles', item: 'https://tileflowuk.com/tiles' },
      {
        '@type': 'ListItem',
        position: 3,
        name: tile.name,
        item: `https://tileflowuk.com/tiles/${tile.slug}`,
      },
    ],
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <Script
        id="tile-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="tile-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/tiles" className="hover:text-stone-600 transition-colors">
            Tiles
          </Link>
          <span>/</span>
          <span className="text-stone-600 truncate">{tile.shortName}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
              <Image
                src={tile.images[0]}
                alt={`${tile.name} — ${tile.style}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--tf-primary)] text-white shadow-sm">
                Coming soon
              </span>
            </div>
            {tile.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {tile.images.slice(1).map((img, i) => (
                  <div
                    key={img}
                    className="relative aspect-square rounded-lg overflow-hidden bg-stone-50 border border-stone-100"
                  >
                    <Image
                      src={img}
                      alt={`${tile.name} — view ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--tf-accent)] uppercase tracking-wider mb-2">
              {tile.range} Range
            </span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3 leading-tight">
              {tile.name}
            </h1>
            <p className="text-stone-500 mb-6">{tile.style}</p>

            <p className="text-stone-600 leading-relaxed mb-6">{tile.longDescription}</p>

            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 mb-8">
              <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Pricing</p>
              <p className="text-2xl font-bold text-[var(--tf-fg)] mb-3">Coming soon</p>
              <a
                href={enquiryMailto(tile.name)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--tf-primary)] text-white font-bold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors text-sm shadow-md"
              >
                <Mail className="w-4 h-4" />
                Enquire for early access
              </a>
              <p className="text-xs text-stone-500 mt-3">
                Email {ENQUIRY_EMAIL} — we usually reply the same day.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-sm uppercase tracking-wide text-stone-400 mb-3">
                Highlights
              </h2>
              <ul className="space-y-2">
                {tile.features.map(f => (
                  <li key={f} className="text-sm text-stone-600 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--tf-primary)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-stone-400 border-t border-stone-100 pt-4">
          Pricing and availability for the {tile.name} range will be confirmed at launch. Register
          early access above to get first notice.
        </p>

        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[var(--tf-fg)]">
                More tiles in the range
              </h2>
              <Link
                href="/tiles"
                className="flex items-center gap-1 text-sm font-medium text-[var(--tf-primary)] hover:underline"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back to all tiles
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(t => (
                <TileCard key={t.slug} tile={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
