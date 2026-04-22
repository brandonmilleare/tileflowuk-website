import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  deluxeProducts,
  deluxeCategories,
  productsByCategory,
  deluxeProductLink,
  DELUXE_AFFILIATE_URL,
  type DeluxeCategory,
} from '@/data/deluxe-flooring'

export const metadata: Metadata = {
  title: 'Deluxe Flooring at TileFlow UK — Preview (Private)',
  description:
    'Preview mock-up of a Deluxe Flooring partnership page on tileflowuk.com. Private — not for public release.',
  robots: { index: false, follow: false, nocache: true },
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

export default function DeluxeFlooringPreviewPage() {
  const featured = deluxeProducts.filter(p => p.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Preview banner — visible to Brandon + the Deluxe owner so they know this is a mock-up */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-sm text-amber-900">
          <strong>Preview / private mock-up.</strong> This page is hosted on
          tileflowuk.com but not indexed or linked publicly. All products, prices and
          images remain the property of Deluxe Flooring Ltd — shown here for partnership
          discussion only.
        </div>
      </div>

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
                In partnership with
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
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--tf-fg)] mb-4 leading-tight">
              Engineered oak, herringbone and luxury vinyl — picked by a UK tiler
            </h1>
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              30 floors from Deluxe Flooring&rsquo;s premium range. Real oak wear layers,
              waterproof SPC cores, 25-year guarantees. Every product below links
              straight to Deluxe Flooring&rsquo;s own checkout — nothing changes for them,
              nothing changes for the buyer.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-stone-600 bg-white border border-stone-200 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-[var(--tf-primary)]"></span>
              <span>Free UK mainland delivery over £500 · Up to 3 free samples</span>
            </div>
          </div>
        </div>
      </section>

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

      {/* Featured / top picks strip */}
      {featured.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--tf-primary)] font-semibold mb-2">
                  Tiler&rsquo;s top picks
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--tf-fg)]">
                  What I&rsquo;d fit in my own house
                </h2>
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
                    <span className="absolute top-3 left-3 bg-[var(--tf-primary)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      Top pick
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
                    <a
                      href={deluxeProductLink(p)}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      className="block w-full text-center bg-[var(--tf-fg)] text-white font-semibold px-5 py-3 rounded-full hover:bg-stone-800 transition-colors"
                    >
                      View on Deluxe Flooring →
                    </a>
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
                        <a
                          href={deluxeProductLink(p)}
                          target="_blank"
                          rel="sponsored nofollow noopener"
                          className="text-sm font-semibold text-[var(--tf-fg)] hover:text-[var(--tf-primary)] transition-colors"
                        >
                          View &rarr;
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* How it works */}
      <section className="py-16 bg-[var(--tf-fg)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How the partnership would work
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            No new checkout. No new stock to manage. Every button on this page sends the
            buyer straight to Deluxe Flooring&rsquo;s own site with a referral tag, so
            Deluxe handles payment, delivery and aftercare exactly the way you do today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[var(--tf-primary)] flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-display font-bold text-lg mb-2">UK buyer lands here</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Driven by TileFlow UK content, Pinterest pins, SEO blog posts and a
                growing tiler-led audience.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[var(--tf-primary)] flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Clicks &ldquo;View&rdquo;</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Goes straight to the product on deluxe-flooring.co.uk with referral
                tag <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">?ref=3</code>.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[var(--tf-primary)] flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-display font-bold text-lg mb-2">You fulfil the sale</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Deluxe Flooring processes payment, delivers the floor, and pays me a
                commission on each tracked order. Zero risk either side.
              </p>
            </div>
          </div>

          <a
            href={DELUXE_AFFILIATE_URL}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex items-center gap-2 mt-10 bg-white text-[var(--tf-fg)] font-semibold px-7 py-3.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            Open my affiliate link (deluxe-flooring.co.uk/ref/3/) →
          </a>
        </div>
      </section>

      {/* Footer credit */}
      <footer className="bg-white border-t border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-stone-500 space-y-2">
          <p>
            Product names, descriptions, prices and images are the property of{' '}
            <Link
              href="https://deluxe-flooring.co.uk"
              target="_blank"
              rel="noopener"
              className="text-[var(--tf-fg)] underline hover:text-[var(--tf-primary)]"
            >
              Deluxe Flooring Ltd
            </Link>
            . Shown here as a private preview for partnership discussion on{' '}
            {new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            .
          </p>
          <p>
            TileFlow UK · Brandon Milleare · Full-time UK tiler · 10+ years on the tools.
          </p>
        </div>
      </footer>
    </div>
  )
}
