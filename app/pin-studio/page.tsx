import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import {
  getAllBestOfSlugs,
  getAllGuidesSlugs,
  getBestOfDoc,
  getGuideDoc,
} from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Pin Studio — TileFlow UK',
  description: 'Dynamic Pinterest pin gallery for every TileFlow article. Copy links, download pins, schedule via API.',
  robots: { index: false },
}

type Row = { section: 'blog' | 'guides' | 'best-of'; slug: string; title: string; excerpt: string }

function loadRows(): Row[] {
  const out: Row[] = []
  for (const p of getAllPosts()) {
    out.push({ section: 'blog', slug: p.slug, title: p.title, excerpt: p.excerpt })
  }
  for (const slug of getAllGuidesSlugs()) {
    const d = getGuideDoc(slug)
    if (d) out.push({ section: 'guides', slug, title: d.title, excerpt: d.excerpt })
  }
  for (const slug of getAllBestOfSlugs()) {
    const d = getBestOfDoc(slug)
    if (d) out.push({ section: 'best-of', slug, title: d.title, excerpt: d.excerpt })
  }
  return out
}

function sectionHref(r: Row): string {
  return r.section === 'best-of' ? `/best-of/${r.slug}` : `/${r.section}/${r.slug}`
}

export default function PinStudioPage() {
  const rows = loadRows()

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tf-accent)] mb-2">
            Internal · Not indexed
          </p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Pin Studio
          </h1>
          <p className="text-stone-600 max-w-2xl leading-relaxed">
            Every article rendered as a 1000×1500 Pinterest pin and a 1200×630 OG image. Click a pin to open in a new tab, right-click to save, or paste the URL into the Pinterest scheduler / API call.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(r => {
            const pinUrl = `/pin-studio/${r.section}/${r.slug}`
            const ogUrl = `/og/${r.section}/${r.slug}`
            const pageUrl = sectionHref(r)
            return (
              <div
                key={`${r.section}-${r.slug}`}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <a
                  href={pinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block bg-stone-100"
                  style={{ aspectRatio: '2 / 3' }}
                >
                  <Image
                    src={pinUrl}
                    alt={`Pinterest pin — ${r.title}`}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </a>
                <div className="p-4 flex flex-col gap-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-primary)]">
                    {r.section.replace('-', ' ')}
                  </div>
                  <h2 className="font-display font-bold text-[var(--tf-fg)] leading-tight line-clamp-2">
                    {r.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <a
                      href={pinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-[var(--tf-primary)] text-white px-3 py-1 font-semibold"
                    >
                      Pin 1000×1500
                    </a>
                    <a
                      href={ogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-stone-300 text-stone-700 px-3 py-1 font-semibold"
                    >
                      OG 1200×630
                    </a>
                    <Link
                      href={pageUrl}
                      className="inline-flex items-center rounded-full border border-stone-300 text-stone-700 px-3 py-1 font-semibold"
                    >
                      Article
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
