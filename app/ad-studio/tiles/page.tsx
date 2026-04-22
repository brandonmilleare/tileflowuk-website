import type { Metadata } from 'next'
import Link from 'next/link'
import { Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tile Ads — Download for Pinterest, Instagram, TikTok',
  description: 'Ready-made ad images promoting the TileFlow UK Wex tile range.',
  robots: { index: false, follow: false },
}

const ads = [
  {
    slug: 'pinterest',
    label: 'Pinterest',
    size: '1000 × 1500',
    ratio: '2:3 vertical',
    use: 'Standard Pinterest pin. Posts directly.',
    aspect: '2/3',
  },
  {
    slug: 'instagram-portrait',
    label: 'Instagram — Portrait',
    size: '1080 × 1350',
    ratio: '4:5 portrait',
    use: 'Feed post (tall). Takes up the most screen space in feed.',
    aspect: '4/5',
  },
  {
    slug: 'instagram-square',
    label: 'Instagram — Square',
    size: '1080 × 1080',
    ratio: '1:1 square',
    use: 'Feed post (classic), profile grid, or carousel slide.',
    aspect: '1/1',
  },
  {
    slug: 'tiktok',
    label: 'TikTok / Reels / Stories',
    size: '1080 × 1920',
    ratio: '9:16 vertical',
    use: 'TikTok photo post, Instagram Reel cover, or Stories.',
    aspect: '9/16',
  },
] as const

export default function AdStudioTilesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Tile range — download ads
          </h1>
          <p className="text-stone-600 max-w-2xl">
            Four ready-made promo images for the Wex tile pre-launch. Click any
            &ldquo;Download PNG&rdquo; button to save it to your computer — then upload
            straight to the platform. All images link people to{' '}
            <code className="bg-white px-1.5 py-0.5 rounded text-sm">
              tileflowuk.com/tiles
            </code>
            .
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ads.map(ad => (
            <article
              key={ad.slug}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-stone-100">
                <h2 className="font-display text-xl font-bold text-[var(--tf-fg)] mb-1">
                  {ad.label}
                </h2>
                <p className="text-sm text-stone-500">
                  {ad.size} · {ad.ratio}
                </p>
                <p className="text-sm text-stone-500 mt-2">{ad.use}</p>
              </div>

              <div
                className="bg-stone-100 flex items-center justify-center p-6"
                style={{ aspectRatio: ad.aspect }}
              >
                <img
                  src={`/ad-studio/tiles/${ad.slug}`}
                  alt={`${ad.label} ad preview`}
                  className="max-w-full max-h-full rounded shadow-md border border-stone-200"
                  style={{ aspectRatio: ad.aspect }}
                />
              </div>

              <div className="p-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={`/ad-studio/tiles/${ad.slug}`}
                  download={`tileflowuk-tiles-${ad.slug}.png`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors text-sm shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </a>
                <Link
                  href={`/ad-studio/tiles/${ad.slug}`}
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-white border border-stone-300 text-stone-700 font-semibold rounded-full hover:bg-stone-50 transition-colors text-sm"
                >
                  Open in new tab
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[var(--tf-fg)] mb-4">
            Copy-paste captions &amp; hashtags
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-stone-700 mb-2">Pinterest</h3>
              <p className="text-stone-600 mb-3 leading-relaxed">
                The Wex tile range is landing soon at TileFlow UK — 7 tiles covering
                marble-effect, stone-look, deep green quartz, onyx, terrazzo and classic
                patterns. Picked by a UK tiler with 10+ years on the tools. Tap to join
                the early-access list.
              </p>
              <p className="text-xs text-stone-500">
                bathroom tile ideas UK · marble effect porcelain tiles · dark green
                bathroom tiles · terrazzo floor tiles · 2026 bathroom trends
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-700 mb-2">Instagram</h3>
              <p className="text-stone-600 mb-3 leading-relaxed">
                7 tiles. One UK range. Dropping soon at TileFlow UK. Marble, stone,
                quartz, terrazzo — picked by a real UK tiler.{' '}
                <strong>Comment WEX and I&rsquo;ll DM you the early-access link.</strong>
              </p>
              <p className="text-xs text-stone-500">
                #bathroomdesign #bathroominspo #bathroomrenovation #kitchentiles
                #interiordesignuk #homerenovationuk #newbuilduk #bathroomtiles
                #tiletrends2026 #porcelaintiles #marbleeffect #greentiles
                #terrazzotiles #uktiler #interiorstylinguk
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-700 mb-2">TikTok</h3>
              <p className="text-stone-600 mb-3 leading-relaxed">
                POV: you just found THE 2026 tile range. 7 tiles. Link in bio for early
                access. Comment TILE and I&rsquo;ll send it.
              </p>
              <p className="text-xs text-stone-500">
                #tiletok #ukrenovation #bathroomtok #hometok #uktiler #bathroominspo
                #tilersoftiktok #renovationuk #interiordesignuk #tiletrend #newbuilduk
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-700 mb-2">Hook variations to test</h3>
              <ul className="text-stone-600 space-y-1.5 list-disc list-inside">
                <li>POV: you finally picked the tile that ends the scroll.</li>
                <li>The tile trend about to take over UK bathrooms in 2026.</li>
                <li>Marble-effect tiles no one can tell are porcelain.</li>
                <li>Dark green tiles are having a moment — here&rsquo;s the one.</li>
                <li>
                  I&rsquo;ve laid tile for 10 years. This is the one I&rsquo;d pick for my
                  own house.
                </li>
                <li>Running out before launch — here&rsquo;s how to get first pick.</li>
              </ul>
            </div>
          </div>
        </section>

        <p className="mt-8 text-xs text-stone-500 text-center">
          This page is private. It&rsquo;s not listed in search or the sitemap.
        </p>
      </div>
    </div>
  )
}
