import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'
import { getBestOfDoc, getGuideDoc, type MdxDoc } from '@/lib/mdx'

export const dynamic = 'force-static'

const SECTION_LABELS: Record<string, string> = {
  blog: 'The Tiler’s Blog',
  guides: 'Buying Guide',
  'best-of': 'Best Of',
}

type DocLite = { title: string; excerpt: string; category?: string; readTime?: string }

function loadDoc(section: string, slug: string): DocLite | null {
  if (section === 'blog') {
    const p = getPostBySlug(slug)
    return p ? { title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime } : null
  }
  if (section === 'guides') {
    const d: MdxDoc | null = getGuideDoc(slug)
    return d ? { title: d.title, excerpt: d.excerpt, category: d.category, readTime: d.readTime } : null
  }
  if (section === 'best-of') {
    const d: MdxDoc | null = getBestOfDoc(slug)
    return d ? { title: d.title, excerpt: d.excerpt, category: d.category, readTime: d.readTime } : null
  }
  return null
}

export async function generateStaticParams() {
  const { getAllPostSlugs } = await import('@/lib/blog')
  const { getAllGuidesSlugs, getAllBestOfSlugs } = await import('@/lib/mdx')
  return [
    ...getAllPostSlugs().map(slug => ({ section: 'blog', slug })),
    ...getAllGuidesSlugs().map(slug => ({ section: 'guides', slug })),
    ...getAllBestOfSlugs().map(slug => ({ section: 'best-of', slug })),
  ]
}

/**
 * Pinterest-spec dynamic pin: 1000×1500 (2:3).
 * Pinterest algorithm favours text-heavy vertical pins with a clear hook,
 * strong brand badge, and a CTA at the bottom.
 */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ section: string; slug: string }> },
) {
  const { section, slug } = await ctx.params
  const doc = loadDoc(section, slug)
  if (!doc) {
    return new Response('Not found', { status: 404 })
  }

  const label = SECTION_LABELS[section] ?? 'TileFlow UK'
  const title = doc.title

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#f7f5f1',
          fontFamily: 'serif',
        }}
      >
        {/* Top band — brand + section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px 56px',
            background: '#4d7c66',
            color: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: 'white',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4d7c66',
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              T
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
              TileFlow UK
            </div>
          </div>
          <div style={{ fontSize: 18, opacity: 0.85, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
            {label}
          </div>
        </div>

        {/* Headline block */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '72px 56px 40px 56px',
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#ea580c',
              textTransform: 'uppercase',
              letterSpacing: 4,
            }}
          >
            Real UK tiler
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 76 : 90,
              fontWeight: 800,
              color: '#1f2937',
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 880,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#4b5563',
              lineHeight: 1.35,
              maxWidth: 880,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {doc.excerpt}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: '40px 56px 56px 56px',
            background: 'white',
            borderTop: '6px solid #ea580c',
          }}
        >
          <div style={{ fontSize: 30, color: '#1f2937', fontWeight: 600 }}>
            Full guide + recommended tools →
          </div>
          <div style={{ fontSize: 24, color: '#6b7280' }}>tileflowuk.com</div>
        </div>
      </div>
    ),
    { width: 1000, height: 1500 },
  )
}
