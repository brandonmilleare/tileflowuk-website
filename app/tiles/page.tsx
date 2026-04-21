import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Mail, Sparkles } from 'lucide-react'
import TileCard from '@/components/tiles/TileCard'
import { tiles, enquiryMailto, ENQUIRY_EMAIL } from '@/data/tiles'

export const metadata: Metadata = {
  title: 'Tiles for Sale — Wex Range | Coming Soon',
  description:
    'Preview the upcoming Wex tile range at TileFlow UK — marble, stone, quartz, terrazzo and classic porcelain tiles. Register your interest for early access and first pricing.',
  alternates: {
    canonical: 'https://tileflowuk.com/tiles',
  },
  openGraph: {
    title: 'Tiles for Sale — Wex Range | Coming Soon to TileFlow UK',
    description:
      'Preview the upcoming Wex tile range at TileFlow UK. Register for early access and first pricing on Delphi, Linsey, Quartz Jade, Quartz Onyx, Stone, Trevi and Flurry.',
    url: 'https://tileflowuk.com/tiles',
    images: [
      {
        url: '/images/tiles/wex-delphi.jpg',
        width: 1200,
        height: 630,
        alt: 'TileFlow UK — Wex tile range coming soon',
      },
    ],
  },
}

export default function TilesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tileflowuk.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tiles',
        item: 'https://tileflowuk.com/tiles',
      },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TileFlow UK — Tiles for Sale',
    description:
      'Preview the upcoming Wex tile range at TileFlow UK. Marble, stone, quartz, terrazzo and classic porcelain tiles — register for early access.',
    url: 'https://tileflowuk.com/tiles',
    isPartOf: { '@type': 'WebSite', name: 'TileFlow UK', url: 'https://tileflowuk.com' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tiles.length,
      itemListElement: tiles.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://tileflowuk.com/tiles/${t.slug}`,
        name: t.name,
      })),
    },
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="bg-gradient-to-b from-stone-50 to-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--tf-primary)]/10 text-[var(--tf-primary)] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Early access — launching soon
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--tf-fg)] mb-4 leading-tight">
              Tiles for sale at TileFlow UK
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              Preview the upcoming <strong>Wex tile range</strong> — marble-effect, stone-look,
              quartz, terrazzo and classic porcelain tiles, hand-picked by a UK tiler with over ten
              years on the tools. Pricing and availability land very soon. Register your interest
              below to be first in line.
            </p>
            <a
              href={enquiryMailto()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors text-sm shadow-md"
            >
              <Mail className="w-4 h-4" />
              Enquire for early access
            </a>
            <p className="text-xs text-stone-500 mt-3">
              Email {ENQUIRY_EMAIL} — we usually reply the same day.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--tf-fg)] mb-2">
            Browse the Wex range
          </h2>
          <p className="text-stone-500">
            {tiles.length} tiles arriving soon. Click any tile to see the full description and
            register interest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tiles.map((tile, i) => (
            <TileCard key={tile.slug} tile={tile} priority={i < 4} />
          ))}
        </div>
      </section>

      <section className="bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--tf-fg)] mb-3">
            Not sure which range suits your project?
          </h2>
          <p className="text-stone-600 mb-6">
            Email a few photos of your space and what you&rsquo;re aiming for. I&rsquo;ll come back
            with the tiles that will work best — no pressure, no sales pitch.
          </p>
          <a
            href={enquiryMailto()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors text-sm shadow-md"
          >
            <Mail className="w-4 h-4" />
            Email {ENQUIRY_EMAIL}
          </a>
          <p className="text-xs text-stone-500 mt-4">
            Already know what you want?{' '}
            <Link href="/contact" className="underline hover:text-[var(--tf-primary)]">
              Use the contact form
            </Link>{' '}
            instead.
          </p>
        </div>
      </section>
    </div>
  )
}
