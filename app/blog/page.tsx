import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Tiling Tips & Trade Advice',
  description:
    'Practical tiling tips, trade secrets, and honest product knowledge from a UK professional tiler with 10+ years experience.',
}

const posts = [
  {
    slug: 'how-to-choose-tile-cutter',
    title: 'How to Choose the Right Tile Cutter for Every Job',
    excerpt:
      'Manual or electric? 60cm or 125cm? The right tile cutter saves hours on site. Here\'s how I decide which one to grab from the van.',
    date: '2025-06-10',
    readTime: '7 min',
    category: 'Buying Guide',
  },
  {
    slug: 'sigma-vs-rubi-tile-cutters',
    title: 'Sigma vs RUBI: Which Italian Manual Cutter Wins?',
    excerpt:
      'I\'ve used both brands on hundreds of jobs. After breaking down the scoring wheel, frame quality, and cut finish, here\'s my verdict.',
    date: '2025-05-28',
    readTime: '9 min',
    category: 'Comparison',
  },
  {
    slug: 'laser-levels-for-tiling',
    title: 'Why Every Tiler Needs a 3×360° Laser Level',
    excerpt:
      'A good laser level is not a luxury — it\'s the fastest way to avoid a wonky floor tile that haunts you for years. Here\'s what to look for.',
    date: '2025-05-14',
    readTime: '6 min',
    category: 'Tips & Tricks',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            The TileFlow Blog
          </h1>
          <p className="text-stone-500 text-lg">
            Trade secrets, buying advice, and honest opinions from the tools down.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {posts.map(post => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md hover:border-stone-300 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-accent)]">
                  {post.category}
                </span>
                <span className="text-stone-300">·</span>
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Clock className="w-3 h-3" /> {post.readTime} read
                </span>
                <span className="text-stone-300">·</span>
                <time className="text-xs text-stone-400">
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>

              <h2 className="font-display text-xl font-bold text-[var(--tf-fg)] mb-2 group-hover:text-[var(--tf-primary)] transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-stone-500 leading-relaxed mb-4">{post.excerpt}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:gap-3 transition-all"
              >
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
          <p className="text-stone-600 text-sm">
            More posts coming soon — subscribe to the newsletter to get them first.
          </p>
          <Link href="/#newsletter" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)]">
            Get notified <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
