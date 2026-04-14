import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

const BASE = 'https://tileflowuk.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/best-of`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/inspiration`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/digital-products`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const productPages: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
