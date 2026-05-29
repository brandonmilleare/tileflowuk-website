import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { WithContext, BlogPosting, BreadcrumbList, FAQPage } from 'schema-dts'

/**
 * ISR: revalidate every 24 hours.
 * Why: posts are SSG'd at build but MDX content (images, embedded data,
 * affiliate price comments) can drift between deploys. Hourly was too
 * aggressive for static content; daily strikes the right balance between
 * freshness and edge-cache efficiency.
 *
 * Note: not using Next 16 Cache Components (`cacheComponents: true` +
 * `'use cache'`) yet — it's experimental, app-wide flag, would re-architect
 * every page. ISR delivers ~80% of the win with 0% of the risk.
 */
export const revalidate = 86400
import Link from 'next/link'
import Script from 'next/script'
import { Clock, ArrowLeft, Calendar, ArrowRight } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/mdxComponents'
import AuthorByline from '@/components/content/AuthorByline'
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const image = post.heroImage ?? `/og/blog/${slug}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${slug}`,
      publishedTime: post.date,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, post.category, 3)

  const articleSchema: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author ?? 'Brandon, TileFlow UK · 15 years in the trade',
      url: 'https://tileflowuk.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TileFlow UK',
      logo: { '@type': 'ImageObject', url: 'https://tileflowuk.com/logo.svg' },
      url: 'https://tileflowuk.com',
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `https://tileflowuk.com/blog/${slug}`,
    image: post.heroImage
      ? (post.heroImage.startsWith('http') ? post.heroImage : `https://tileflowuk.com${post.heroImage}`)
      : `https://tileflowuk.com/og/blog/${slug}`,
  }

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tileflowuk.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://tileflowuk.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://tileflowuk.com/blog/${slug}` },
    ],
  }

  const faqSchema: WithContext<FAQPage> | null = post.faqs && post.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return (
    <div className="min-h-screen pt-16">
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[var(--tf-primary)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-accent)]">
              {post.category}
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-xs text-stone-400">
              <Clock className="w-3 h-3" /> {post.readTime} read
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-xs text-stone-400">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] leading-tight">
            {post.title}
          </h1>
          {post.author && (
            <p className="mt-4 text-stone-500 text-sm">By {post.author}</p>
          )}
        </div>
      </div>

      {/* Above-the-fold affiliate disclosure (ASA + Amazon Operating Agreement) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AffiliateDisclosure mode="banner" />
      </div>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-stone prose-lg max-w-none
        prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--tf-fg)]
        prose-a:text-[var(--tf-primary)] prose-a:font-medium hover:prose-a:text-[var(--tf-primary-hover)]
        prose-strong:text-[var(--tf-fg)]
        prose-li:marker:text-[var(--tf-primary)]">
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>

      {/* Author byline — E-E-A-T author identity strip */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
        <AuthorByline />
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="border-t border-stone-200 bg-stone-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="font-display text-xl font-bold text-[var(--tf-fg)] mb-6">More from the blog</h2>
            <div className="space-y-4">
              {related.map(p => (
                <article key={p.slug} className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-accent)]">{p.category}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs text-stone-400">{p.readTime} read</span>
                  </div>
                  <h3 className="font-display font-bold text-[var(--tf-fg)] mb-1 hover:text-[var(--tf-primary)]">
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-3">{p.excerpt}</p>
                  <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--tf-primary)]">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-stone-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-stone-600 text-sm mb-3">Found this useful? More trade tips in the blog.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:text-[var(--tf-primary-hover)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All posts
          </Link>
        </div>
      </div>
    </div>
  )
}
