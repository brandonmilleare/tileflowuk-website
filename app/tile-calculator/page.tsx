import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Calculator, Ruler } from 'lucide-react'
import TileCalculator from '@/components/calculator/TileCalculator'

const TITLE = 'Tile Calculator — How Many Tiles Do I Need?'
const DESCRIPTION =
  'Free UK tile calculator. Enter your floor or wall measurements and tile size to work out how many tiles you need, with the right wastage added for your lay pattern.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://tileflowuk.com/tile-calculator' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: 'https://tileflowuk.com/tile-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

const HOW_TO_STEPS = [
  'Measure the length and width of your floor or wall in metres.',
  'Multiply length × width for each section and add them together.',
  'Subtract large non-tiled areas — doors, windows, baths, or units.',
  'Enter your tile size in millimetres (it is printed on the box).',
  'Pick your lay pattern — the calculator adds the right wastage for you.',
]

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How many tiles do I need?',
    a: 'Measure the area you are tiling in square metres, add 10% for wastage, then divide by the area of a single tile. For a 10 m² floor with 600 × 600mm tiles (0.36 m² each) you need about 31 tiles once wastage is added. The calculator above does the maths for you.',
  },
  {
    q: 'How much wastage should I add?',
    a: 'Add 10% for a straight or brick-bond lay, and 15% for herringbone, diagonal, or large-format tiles — those patterns create more offcuts. Bump it higher again for a small room full of awkward cuts.',
  },
  {
    q: 'Why do I need extra tiles?',
    a: 'Cuts, breakages, and future repairs. Tile colours are mixed in batches, so a box bought two years later rarely matches. Keep one full spare box sealed for repairs.',
  },
  {
    q: 'Do I measure in metres or millimetres?',
    a: 'Measure the room in metres or centimetres, and enter the tile size in millimetres — that is how tile sizes are listed (600 × 600, 300 × 600, and so on). The calculator handles the conversion.',
  },
  {
    q: 'Does this work for both walls and floors?',
    a: 'Yes. Use the Floor / Wall toggle at the top. The maths is identical — area to tile, divided by tile size, plus wastage — so the calculator covers both.',
  },
]

export default function TileCalculatorPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TileFlow Tile Calculator',
    url: 'https://tileflowuk.com/tile-calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web browser',
    description: DESCRIPTION,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'GBP' },
    featureList: [
      'Floor and wall tile estimates',
      'Multiple area measurements',
      'Door and window subtraction',
      'Lay-pattern wastage (straight, brick bond, herringbone, diagonal, large format)',
    ],
    publisher: { '@type': 'Organization', name: 'TileFlow UK', url: 'https://tileflowuk.com' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to work out how many tiles you need',
    description: 'Measure your area, subtract obstacles, and add wastage to find how many tiles to order.',
    step: HOW_TO_STEPS.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tileflowuk.com' },
      { '@type': 'ListItem', position: 2, name: 'Tile Calculator', item: 'https://tileflowuk.com/tile-calculator' },
    ],
  }

  return (
    <div className="min-h-screen pt-16">
      <Script id="webapp-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-5">
            <Link href="/" className="hover:text-stone-600">Home</Link>
            <span>/</span>
            <span className="text-stone-600">Tile Calculator</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--tf-primary)]">
              <Calculator className="w-3.5 h-3.5" /> Free tool
            </span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] leading-tight mb-3">
            How many tiles do I need?
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed max-w-2xl">
            Pop your measurements in and this works out the tiles for you — area, wastage, and the lot.
            Fifteen years of quoting jobs says: always order the spare.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TileCalculator />
      </div>

      {/* How to measure */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-[var(--tf-fg)] mb-6">
            <Ruler className="w-5 h-5 text-[var(--tf-primary)]" /> How to measure up
          </h2>
          <ol className="space-y-4 max-w-2xl">
            {HOW_TO_STEPS.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--tf-primary)] text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-stone-600 leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-stone-500 max-w-2xl">
            Got an L-shaped room? Split it into rectangles, measure each as a separate area, and add them with the
            “Add another area” button. Need a hand picking the tile?{' '}
            <Link href="/guides/how-to-choose-tile-grout" className="text-[var(--tf-primary)] font-medium hover:underline">
              Our buying guides
            </Link>{' '}
            walk through it.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl font-bold text-[var(--tf-fg)] mb-6">Common questions</h2>
        <div className="space-y-3 max-w-3xl">
          {FAQS.map((f, i) => (
            <details key={i} className="group rounded-xl border border-stone-200 bg-white px-5 py-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-[var(--tf-fg)] list-none">
                {f.q}
                <span className="ml-4 text-stone-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-stone-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-center gap-4">
          <Link
            href="/tiles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[var(--tf-primary)] px-4 py-2 rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors"
          >
            Browse our tiles
          </Link>
          <Link
            href="/blog/how-many-tiles-do-i-need"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:text-[var(--tf-primary-hover)]"
          >
            Read the full guide
          </Link>
        </div>
      </div>
    </div>
  )
}
