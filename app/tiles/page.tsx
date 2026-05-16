import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Mail, MessageCircle } from 'lucide-react'
import TileCard from '@/components/tiles/TileCard'
import { tiles, enquiryMailto, whatsappLink, ENQUIRY_EMAIL, PHONE_DISPLAY } from '@/data/tiles'

export const metadata: Metadata = {
  title: 'Wex Porcelain Tiles for Sale UK — From £29.99/m²',
  description:
    'Premium Wex porcelain tiles — marble, stone, quartz and terrazzo looks. 300×600mm and 1200×600mm formats from £29.99/m². In stock, UK delivery.',
  alternates: {
    canonical: 'https://tileflowuk.com/tiles',
  },
  openGraph: {
    title: 'Wex Porcelain Tiles for Sale UK — TileFlow UK',
    description:
      'Premium Wex range porcelain tiles from a UK tiler with 15 years in the trade. From £29.99/m² — in stock, UK delivery.',
    url: 'https://tileflowuk.com/tiles',
    images: [
      {
        url: '/images/tiles/wex-delphi.jpg',
        width: 1200,
        height: 630,
        alt: 'TileFlow UK — Wex porcelain tile range',
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
    name: 'TileFlow UK — Wex Porcelain Tiles',
    description:
      'Premium Wex range porcelain tiles from TileFlow UK. Marble, stone, quartz, terrazzo and classic porcelain in 300×600mm and 1200×600mm formats from £29.99/m².',
    url: 'https://tileflowuk.com/tiles',
    isPartOf: { '@type': 'WebSite', name: 'TileFlow UK', url: 'https://tileflowuk.com' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tiles.length,
      itemListElement: tiles.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://tileflowuk.com/tiles/${t.slug}`,
        name: `${t.name} — ${t.style} (${t.size})`,
        item: {
          '@type': 'Product',
          name: t.name,
          description: t.description,
          image: `https://tileflowuk.com${t.images[0]}`,
          brand: { '@type': 'Brand', name: t.range },
          category: t.style,
          url: `https://tileflowuk.com/tiles/${t.slug}`,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'GBP',
            price: t.priceNumeric,
            availability: 'https://schema.org/InStock',
          },
        },
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--tf-ink)] text-white mb-4 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              In Stock — UK Delivery
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[var(--tf-ink)] mb-4 leading-tight">
              <span className="accent-italic">Wex</span> Porcelain Tiles · From £29.99/m²
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              The <strong>Wex range</strong> — marble-effect, stone-look, quartz, terrazzo and
              classic porcelain tiles in 300×600mm and 1200×600mm formats. Hand-picked by a UK
              tiler with 15 years in the trade. In stock now — order direct by email or WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={enquiryMailto()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors text-sm shadow-md"
              >
                <Mail className="w-4 h-4" />
                Email to order
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1ea850] transition-colors text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp {PHONE_DISPLAY}
              </a>
            </div>
            <p className="text-xs text-stone-500 mt-3">
              Email {ENQUIRY_EMAIL} or WhatsApp {PHONE_DISPLAY} — usually a same-day reply.
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
            {tiles.length} porcelain tiles in stock. Click any tile to see the full spec, price
            and ordering details.
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
            Not sure which tile suits your project?
          </h2>
          <p className="text-stone-600 mb-6">
            Send a few photos of your space and what you&rsquo;re aiming for. I&rsquo;ll come back
            with the tiles that will work best — no pressure, no sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={enquiryMailto()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors text-sm shadow-md"
            >
              <Mail className="w-4 h-4" />
              Email {ENQUIRY_EMAIL}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1ea850] transition-colors text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
