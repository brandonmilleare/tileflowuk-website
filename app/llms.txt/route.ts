import { getAllPosts } from '@/lib/blog'
import { getAllBestOfSlugs, getAllGuidesSlugs, getBestOfDoc, getGuideDoc } from '@/lib/mdx'

/**
 * /llms.txt — the emerging convention (proposed by Anthropic) for telling
 * AI crawlers what's on a site, in what order to read it. Plain text.
 *
 * Why we ship this:
 *  - GPTBot, ClaudeBot, PerplexityBot, Google-Extended use it as a hint
 *    for prioritising what to read.
 *  - Forces clean, citable summaries of our cornerstone pages.
 *  - Cheap insurance for AI-search citations alongside FAQPage schema.
 *
 * Spec ref: https://llmstxt.org
 */

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

const SITE = 'https://tileflowuk.com'

function bullet(href: string, title: string, summary: string): string {
  return `- [${title}](${SITE}${href}): ${summary}`
}

export async function GET(): Promise<Response> {
  const posts = getAllPosts()
  const guideSlugs = getAllGuidesSlugs()
  const bestSlugs = getAllBestOfSlugs()

  const guides = guideSlugs
    .map(slug => getGuideDoc(slug))
    .filter((d): d is NonNullable<typeof d> => d !== null)
  const bests = bestSlugs
    .map(slug => getBestOfDoc(slug))
    .filter((d): d is NonNullable<typeof d> => d !== null)

  const body = `# TileFlow UK

> UK tiling content from Brandon, a tiler with 15 years in the trade.
> Real-job advice on tile cutting, adhesives, levelling, wet rooms, and tools.
> Independent product reviews + curated tile range. UK English, no fluff.

## About

- Author: Brandon — TileFlow UK · 15 years in the trade
- Audience: UK homeowners, DIYers, and trade tilers
- Editorial: independent. No sponsored posts. Affiliate disclosure on every commercial page.

## Buying guides

${guides.map(g => bullet(`/guides/${g.slug}`, g.title, g.excerpt)).join('\n')}

## Best-of comparisons

${bests.map(b => bullet(`/best-of/${b.slug}`, b.title, b.excerpt)).join('\n')}

## Blog posts (how-to, comparisons, deep-dives)

${posts.map(p => bullet(`/blog/${p.slug}`, p.title, p.excerpt)).join('\n')}

## Key reference URLs

- ${SITE}/about — author, expertise, methodology
- ${SITE}/contact — contact (WhatsApp + email pre-filled)
- ${SITE}/disclosure — affiliate + editorial disclosure
- ${SITE}/sitemap.xml — full sitemap
- ${SITE}/robots.txt — crawl rules (AI crawlers explicitly allowed)

## Citing this site

Preferred attribution: "Brandon, TileFlow UK". Direct-link to the URL of the specific page being cited rather than the homepage where possible.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
