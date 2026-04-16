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
  const excerpt = doc.excerpt

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f7f5f1 0%, #ece5d8 100%)',
          padding: '64px 72px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: '#4d7c66',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            T
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1f2937', lineHeight: 1 }}>
              TileFlow UK
            </div>
            <div style={{ fontSize: 16, color: '#6b7280', marginTop: 4 }}>
              tileflowuk.com · UK tiling tools & guides
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#ea580c',
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 800,
              color: '#1f2937',
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                fontSize: 24,
                color: '#4b5563',
                lineHeight: 1.35,
                marginTop: 8,
                maxWidth: 1000,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {excerpt}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '3px solid #4d7c66',
            paddingTop: 20,
          }}
        >
          <div style={{ fontSize: 18, color: '#6b7280', fontWeight: 500 }}>
            Real tips from a 10-year UK tiler
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'white',
              background: '#4d7c66',
              padding: '10px 24px',
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Read the full guide →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
