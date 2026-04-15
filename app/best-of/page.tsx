import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Of — Top-Rated Tiling Tools',
  description:
    'The definitive "Best Of" lists for every tiling tool category — tile cutters, laser levels, angle grinders, and more. Ranked by a working UK professional.',
}

const lists = [
  {
    slug: 'best-budget-tiling-tools-uk',
    title: 'Best Budget Tiling Tools UK 2026',
    subtitle: 'Quality tools without the pro price tag',
    tools: ['RUBI EASY-60', 'Huepar 602CG Laser', 'STANLEY FatMax Level'],
    category: 'Starter Kits',
  },
  {
    slug: 'best-tools-large-format-tiles',
    title: 'Best Tools for Large Format Tiles',
    subtitle: '600mm+ tiles demand specialist equipment',
    tools: ['Sigma 4DN 95cm', 'DEWALT DCLE34035B', 'Raimondi Lippage Clips'],
    category: 'Large Format',
  },
  {
    slug: 'best-professional-tiling-starter-kit',
    title: 'Best Professional Tiling Starter Kit',
    subtitle: "The kit I'd buy starting out today",
    tools: ['Sigma 4BU 70cm', 'DEWALT DCLE34035B', 'Bosch GWX 18V-7'],
    category: 'Starter Kits',
  },
  {
    slug: 'best-wet-saw-for-tiling',
    title: 'Best Wet Saw for Tiling UK 2026',
    subtitle: 'For large format and complex cuts',
    tools: ['Raimondi RTC Battipav 1200', 'Sigma SM3', 'Battipav Super Pro 900'],
    category: 'Wet Saws',
  },
  {
    slug: 'best-tile-cutters',
    title: 'Best Tile Cutters 2026',
    subtitle: 'Manual & Electric — All Budgets',
    tools: ['Sigma 4BU 70cm', 'RUBI RDXA35', 'Sigma 4EN 125cm'],
    category: 'Tile Cutters',
  },
  {
    slug: 'best-laser-levels-tiling',
    title: 'Best Laser Levels for Tiling',
    subtitle: 'Self-Levelling & Line Lasers',
    tools: ['DEWALT DCLE34035B', 'Huepar Pro 4×360', 'Bosch GLL 12V'],
    category: 'Laser Levels',
  },
]

export default function BestOfPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Best Of Lists
          </h1>
          <p className="text-stone-500 text-lg">
            Every category ranked by a working UK tiler — no algorithm, no ads influence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 gap-6">
          {lists.map(list => (
            <article
              key={list.slug}
              className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-lg hover:border-transparent transition-all duration-300"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[var(--tf-accent)] mb-3">
                {list.category}
              </span>
              <h2 className="font-display text-xl font-bold text-[var(--tf-fg)] mb-1 group-hover:text-[var(--tf-primary)] transition-colors">
                {list.title}
              </h2>
              <p className="text-sm text-stone-400 mb-4">{list.subtitle}</p>

              <ol className="space-y-2 mb-5">
                {list.tools.map((tool, i) => (
                  <li key={tool} className="flex items-center gap-2.5 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      i === 0 ? 'bg-amber-400 text-white' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {i + 1}
                    </span>
                    {i === 0 && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                    <span className={i === 0 ? 'font-semibold text-[var(--tf-fg)]' : 'text-stone-500'}>{tool}</span>
                  </li>
                ))}
              </ol>

              <Link
                href={`/best-of/${list.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:gap-3 transition-all"
              >
                Read full list <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
