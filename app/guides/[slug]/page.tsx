import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllGuidesSlugs, getGuideDoc } from '@/lib/mdx'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllGuidesSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = getGuideDoc(slug)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.excerpt,
    openGraph: { title: doc.title, description: doc.excerpt, type: 'article' },
  }
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params
  const doc = getGuideDoc(slug)
  if (!doc) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.title,
    description: doc.excerpt,
    author: {
      '@type': 'Person',
      name: doc.author ?? 'Brandon Miller, Professional Tiler',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TileFlow UK',
      url: 'https://tileflowuk.com',
    },
    datePublished: doc.date,
    dateModified: doc.date,
    mainEntityOfPage: `https://tileflowuk.com/guides/${slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tileflowuk.com' },
      { '@type': 'ListItem', position: 2, name: 'Buying Guides', item: 'https://tileflowuk.com/guides' },
      { '@type': 'ListItem', position: 3, name: doc.title, item: `https://tileflowuk.com/guides/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen pt-16">
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-5">
            <Link href="/" className="hover:text-stone-600">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-stone-600">Buying Guides</Link>
            <span>/</span>
            <span className="text-stone-600">{doc.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-primary)] flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Buying Guide
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-xs text-stone-400">
              <Clock className="w-3 h-3" /> {doc.readTime} read
            </span>
            {doc.date && (
              <>
                <span className="text-stone-300">·</span>
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={doc.date}>
                    {new Date(doc.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </span>
              </>
            )}
          </div>

          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] leading-tight mb-3">
            {doc.title}
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">{doc.excerpt}</p>
          {doc.author && <p className="mt-4 text-stone-500 text-sm">By {doc.author}</p>}
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12
        prose prose-stone prose-lg max-w-none
        prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--tf-fg)]
        prose-a:text-[var(--tf-primary)] prose-a:font-medium hover:prose-a:text-[var(--tf-primary-hover)]
        prose-strong:text-[var(--tf-fg)]
        prose-li:marker:text-[var(--tf-primary)]">
        <MDXRemote source={doc.content} />
      </article>

      {/* Footer CTA */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center gap-4">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:text-[var(--tf-primary-hover)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All guides
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[var(--tf-accent)] px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            Shop professional tools
          </Link>
        </div>
      </div>
    </div>
  )
}
