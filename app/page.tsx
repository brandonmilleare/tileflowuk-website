import type { Metadata } from 'next'
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

export default function HomePage() {
  return (
    <>
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
