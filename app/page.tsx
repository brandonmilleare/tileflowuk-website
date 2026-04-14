import type { Metadata } from 'next'
import Script from 'next/script'
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import InspirationStrip from '@/components/home/InspirationStrip'
import AboutBanner from '@/components/home/AboutBanner'
import Newsletter from '@/components/home/Newsletter'

export const metadata: Metadata = {
  title: 'TileFlow UK — Professional Tiling Tools & Inspiration',
  description:
    'Honest tiling tool reviews and buying guides from a UK professional tiler with 10+ years experience. Find the best tile cutters, laser levels, angle grinders, and more.',
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TileFlow UK',
  url: 'https://tileflowuk.com',
  logo: 'https://tileflowuk.com/logo.svg',
  description: 'Professional tiling tool reviews and buying guides from a UK tiler with 10+ years experience.',
  sameAs: [
    'https://instagram.com/tileflowuk',
    'https://youtube.com/@tileflowuk',
  ],
}

export default function HomePage() {
  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <FeaturedProducts />
      <InspirationStrip />
      <AboutBanner />
      <Newsletter />
    </>
  )
}
