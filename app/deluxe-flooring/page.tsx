import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
  deluxeProducts,
  deluxeCategories,
  productsByCategory,
  deluxeProductLink,
  DELUXE_AFFILIATE_URL,
  type DeluxeCategory,
} from '@/data/deluxe-flooring'
import AffiliateLink from '@/components/affiliate/AffiliateLink'
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure'

export const metadata: Metadata = {
  title: 'Wood Flooring UK — Engineered Oak, Herringbone, LVT & Laminate',
  description:
    'Hand-picked UK wood flooring from a 15-year tiler — engineered oak, herringbone parquet, SPC LVT and AC5 laminate. In partnership with Deluxe Flooring.',
  alternates: { canonical: 'https://tileflowuk.com/deluxe-flooring' },
  openGraph: {
    title: 'Wood Flooring UK — Engineered Oak, Herringbone, LVT & Laminate',
    description:
      'Hand-picked wood flooring from a UK tiler with 15 years in the trade. In partnership with Deluxe Flooring.',
    url: 'https://tileflowuk.com/deluxe-flooring',
    type: 'website',
    images: [
      {
        url: '/images/deluxe-flooring/burghley.png',
        width: 1200,
        height: 630,
        alt: 'Burghley engineered oak — featured at TileFlow × Deluxe Flooring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/deluxe-flooring/burghley.png'],
  },
}

const CATEGORY_BLURB: Record<DeluxeCategory, string> = {
  Herringbone:
    'Classic and chevron block patterns — engineered oak, LVT and laminate options, all with the look of a traditional parquet floor.',
  'Engineered Wood':
    'Real oak wear layer over a stable engineered core. Wide planks, click-fit or tongue-and-groove, underfloor-heating friendly.',
  LVT:
    'SPC rigid-core vinyl — 100% waterproof, hard-wearing and a go-to choice for kitchens, bathrooms and busy family rooms.',
  Laminate:
    'HDF-core laminate in oak, stone and marble effects. AC4–AC5 wear rating means it handles heavy foot traffic without blinking.',
}

function CategoryAnchor({ id }: { id: string }) {
  return <span id={id} className="block -mt-20 pt-20" aria-hidden="true" />
}

export default function DeluxeFlooringPage() {
  const featured = deluxeProducts.filter(p => p.featured)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TileFlow × Deluxe Flooring — Wood Flooring Range',
    description:
      'Hand-picked UK wood flooring: engineered oak, herringbone parquet, SPC LVT, and AC5 laminate.',
    numberOfItems: deluxeProducts.length,
    itemListElement: deluxeProducts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        category: p.category,
        image: `https://tileflowuk.com${p.image}`,
        description: p.description,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'GBP',
          price: p.price.replace(/[£\s]/g, '').split('per')[0],
          availability: 'https://schema.org/InStock',
          url: deluxeProductLink(p),
          seller: { '@type': 'Organization', name: 'Deluxe Flooring Ltd' },
        },
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tileflowuk.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Wood Flooring',
        item: 'https://tileflowuk.com/deluxe-flooring',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="deluxe-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="deluxe-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Co-brand header */}
      <section className="pt-24 pb-10 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-1">
                TileFlow UK
              </div>
              <div className="font-display text-3xl font-bold text-[var(--tf-fg)]">
                Hand-picked wood flooring
              </div>
            </div>
            <div className="text-stone-400 text-3xl font-light hidden sm:block">×</div>
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-1">
                Paid partnership with
              </div>
              <Image
                src="/images/deluxe-flooring/logo.png"
                alt="Deluxe Flooring — Wood Floor Specialists"
                width={200}
                height={80}
                className="h-12 w-auto mx-auto"
                priority
              />
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[var(--tf-ink)] mb-4 leading-tight">
              Engineered oak, <span className="accent-italic">herringbone</span>, LVT and laminate
            </h1>
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              A proper range of UK click-and-lock flooring — easily installed by
              yourself or your flooring specialist. These are our hand-picked
              choices that we think will make your interior pop with stylish,
              luxury designs. Featuring high-end 100% waterproof SPC luxury vinyl,
              engineered oak, herringbone parquet and AC4&ndash;AC5 laminate.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-stone-600 bg-white border border-stone-200 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-[var(--tf-primary)]"></span>
              <span>Free UK mainland delivery over £500 · Up to 3 free samples</span>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate disclosure — above-the-fold, before first affiliate link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <AffiliateDisclosure mode="banner" />
      </div>

      {/* Category nav */}
      <nav className="sticky top-16 z-30 bg-white/90 backdrop-blur border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto py-3 text-sm">
            {deluxeCategories.map(cat => {
              const count = productsByCategory(cat).length
              const anchor = cat.toLowerCase().replace(/\s+/g, '-')
              return (
                <a
                  key={cat}
                  href={`#${anchor}`}
                  className="whitespace-nowrap px-4 py-2 rounded-full font-medium text-stone-700 hover:bg-[var(--tf-primary)] hover:text-white transition-colors"
                >
                  {cat} <span className="opacity-60">({count})</span>
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Best Sellers */}
      {featured.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-light text-[var(--tf-ink)]">
                  Best <span className="accent-italic">Sellers</span>
                </h2>
                <p className="text-stone-600 mt-2">
                  The floors moving fastest from Deluxe&rsquo;s UK warehouse — picked
                  across herringbone, engineered oak, LVT and laminate.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map(p => (
                <article
                  key={p.slug}
                  className="group rounded-2xl overflow-hidden border border-stone-200 bg-white"
                >
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[var(--tf-accent)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      Best Seller
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="text-xs uppercase tracking-wider text-stone-500 mb-1">
                      {p.category}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--tf-fg)] leading-snug mb-2">
                      {p.name}
                    </h3>
                    <div className="text-xl font-bold text-[var(--tf-primary)] mb-4">
                      {p.price}
                    </div>
                    <AffiliateLink
                      href={deluxeProductLink(p)}
                      retailer="deluxe"
                      product={p.slug}
                      className="block w-full text-center bg-[var(--tf-fg)] text-white font-semibold px-5 py-3 rounded-full hover:bg-stone-800 transition-colors"
                    >
                      View on Deluxe Flooring →
                    </AffiliateLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category sections */}
      {deluxeCategories.map(category => {
        const products = productsByCategory(category)
        const anchor = category.toLowerCase().replace(/\s+/g, '-')
        return (
          <section key={category} className="py-14 odd:bg-stone-50">
            <CategoryAnchor id={anchor} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10 max-w-3xl">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--tf-fg)] mb-3">
                  {category}
                </h2>
                <p className="text-stone-600 leading-relaxed">{CATEGORY_BLURB[category]}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <article
                    key={p.slug}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-xs uppercase tracking-wider text-stone-500 mb-1">
                        {p.category}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[var(--tf-fg)] leading-snug mb-2">
                        {p.name}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed mb-3 flex-1">
                        {p.description}
                      </p>
                      <ul className="text-xs text-stone-500 space-y-1 mb-4">
                        {p.features.slice(0, 3).map(f => (
                          <li key={f} className="flex items-start gap-2">
                            <span className="text-[var(--tf-primary)] mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <div className="text-lg font-bold text-[var(--tf-primary)]">
                          {p.price}
                        </div>
                        <AffiliateLink
                          href={deluxeProductLink(p)}
                          retailer="deluxe"
                          product={p.slug}
                          className="text-sm font-semibold text-[var(--tf-fg)] hover:text-[var(--tf-primary)] transition-colors"
                        >
                          View &rarr;
                        </AffiliateLink>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* How buying works */}
      <section className="py-16 bg-[var(--tf-fg)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How buying works
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            You click through to Deluxe Flooring&rsquo;s own UK site, order direct
            from them. They handle payment, delivery and aftercare. Free samples
            are available, and free UK mainland delivery kicks in over £500.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[var(--tf-primary)] flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Pick your floor</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Browse the categories below — engineered oak, herringbone parquet,
                LVT or laminate. Order up to 3 free samples to see the finish in
                your own light before committing.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[var(--tf-primary)] flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Order direct from Deluxe</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Every &ldquo;View&rdquo; button takes you straight to the product on
                deluxe-flooring.co.uk. Their checkout, their warehouse, their UK
                delivery network.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[var(--tf-primary)] flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Fit it yourself or get a tiler in</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Most engineered oak, LVT and laminate is straightforward DIY-fit
                with the right prep. Herringbone takes more skill — worth a chat
                with a tiler first.
              </p>
            </div>
          </div>

          <AffiliateLink
            href={DELUXE_AFFILIATE_URL}
            retailer="deluxe"
            product="full-range"
            className="inline-flex items-center gap-2 mt-10 bg-white text-[var(--tf-fg)] font-semibold px-7 py-3.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            Browse the full Deluxe Flooring range →
          </AffiliateLink>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="bg-[var(--tf-sage-mist)] border-y border-[var(--tf-sage-soft)] py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-[var(--tf-ink-soft)] leading-relaxed">
          <strong className="text-[var(--tf-sage-deep)]">Paid partnership with Deluxe Flooring Ltd.</strong> TileFlow UK
          also earns a commission on purchases made through links on this page —
          at no extra cost to you. See our{' '}
          <Link href="/disclosure" className="underline font-semibold text-[var(--tf-sage-deep)] hover:text-[var(--tf-ink)]">
            full affiliate disclosure
          </Link>
          .
        </div>
      </section>

      {/* Footer credit */}
      <footer className="bg-white border-t border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-stone-500 space-y-2">
          <p>
            Product names, descriptions, prices and images are used with permission
            and remain the property of{' '}
            <Link
              href="https://deluxe-flooring.co.uk"
              target="_blank"
              rel="noopener"
              className="text-[var(--tf-fg)] underline hover:text-[var(--tf-primary)]"
            >
              Deluxe Flooring Ltd
            </Link>
            .
          </p>
          <p>
            TileFlow UK · 15+ years in the trade · Full-time UK tiler.
          </p>
        </div>
      </footer>
    </div>
  )
}
