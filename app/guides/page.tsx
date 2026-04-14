import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Buying Guides — Tiling Tools Explained',
  description:
    'Complete buying guides for every tiling tool. Learn what specs actually matter, which features are marketing fluff, and how to avoid expensive mistakes.',
}

const guides = [
  {
    slug: 'tile-cutter-buying-guide',
    title: 'Complete Tile Cutter Buying Guide',
    excerpt: 'Everything you need to know before spending money on a tile cutter — scoring wheels, frame quality, max thickness, and why cheap ones fail.',
    level: 'Beginner',
    readTime: '12 min',
  },
  {
    slug: 'angle-grinder-tiling-guide',
    title: 'Angle Grinders for Tiling: What to Look For',
    excerpt: 'Not all angle grinders cut tiles cleanly. Disc size, guard design, paddle switch vs. trigger — here\'s what separates a tiling grinder from a general-purpose one.',
    level: 'Intermediate',
    readTime: '10 min',
  },
  {
    slug: 'laser-level-guide',
    title: 'Laser Level Guide for Tilers',
    excerpt: 'How many planes? Self-levelling or manual? Green vs red beam? This guide cuts through the spec-sheet noise so you buy the right laser the first time.',
    level: 'Beginner',
    readTime: '8 min',
  },
]

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-50 text-green-700',
  Intermediate: 'bg-amber-50 text-amber-700',
  Advanced: 'bg-red-50 text-red-700',
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Buying Guides
          </h1>
          <p className="text-stone-500 text-lg">
            Understand what specs matter before you spend a penny.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {guides.map(guide => (
            <article
              key={guide.slug}
              className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-all duration-200 flex gap-5"
            >
              <div className="p-3 bg-blue-50 rounded-xl shrink-0 h-fit">
                <BookOpen className="w-5 h-5 text-[var(--tf-primary)]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColors[guide.level]}`}>
                    {guide.level}
                  </span>
                  <span className="text-xs text-stone-400">{guide.readTime} read</span>
                </div>
                <h2 className="font-display text-xl font-bold text-[var(--tf-fg)] mb-2 group-hover:text-[var(--tf-primary)] transition-colors">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-3">{guide.excerpt}</p>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:gap-3 transition-all"
                >
                  Read guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
