import type { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { tiles } from '@/data/tiles'
import { getAllPostSlugs } from '@/lib/blog'
import { getAllBestOfSlugs, getAllGuidesSlugs } from '@/lib/mdx'

const BASE = 'https://tileflowuk.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/tiles`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/best-of`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/inspiration`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}/digital-products`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const tilePages: MetadataRoute.Sitemap = tiles.map(t => ({
    url: `${BASE}/tiles/${t.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const productPages: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = getAllPostSlugs().map(slug => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const bestOfPages: MetadataRoute.Sitemap = getAllBestOfSlugs().map(slug => ({
    url: `${BASE}/best-of/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const guidePages: MetadataRoute.Sitemap = getAllGuidesSlugs().map(slug => ({
    url: `${BASE}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...tilePages, ...productPages, ...blogPages, ...bestOfPages, ...guidePages]
}
