import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import InspirationStrip from '@/components/home/InspirationStrip'
import AboutBanner from '@/components/home/AboutBanner'
// Newsletter form hidden 2026-05-05 — no list yet, was faking success. Restore when a list provider is wired up.
// import Newsletter from '@/components/home/Newsletter'

export const metadata: Metadata = {
  title: 'TileFlow UK — Professional Tiling Tools & Inspiration',
  description:
    'Honest tiling tool reviews and buying guides from a UK tiler with 15+ years on site. Best tile cutters, laser levels, adhesives and more.',
  alternates: { canonical: 'https://tileflowuk.com' },
}

// Note: Organization + WebSite schema now lives in app/layout.tsx (sitewide).
// Page-specific schema (Article, Product, etc.) layers on top there.

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <FeaturedProducts />
      <InspirationStrip />
      <AboutBanner />
      {/* <Newsletter /> hidden 2026-05-05 — restore when list provider is live */}
    </>
  )
}
