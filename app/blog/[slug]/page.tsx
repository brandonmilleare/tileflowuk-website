import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Clock, ArrowLeft, Calendar, ArrowRight } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, post.category, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author ?? 'Brandon Miller, Professional Tiler',
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
    image: `https://tileflowuk.com/images/hero/website.jpeg`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tileflowuk.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://tileflowuk.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://tileflowuk.com/blog/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen pt-16">
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-stone prose-lg max-w-none
        prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--tf-fg)]
        prose-a:text-[var(--tf-primary)] prose-a:font-medium hover:prose-a:text-[var(--tf-primary-hover)]
        prose-strong:text-[var(--tf-fg)]
        prose-li:marker:text-[var(--tf-primary)]">
        <MDXRemote source={post.content} />
      </article>

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
