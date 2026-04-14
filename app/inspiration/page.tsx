import type { Metadata } from 'next'
import { readdir } from 'fs/promises'
import InspirationGallery from './InspirationGallery'

export const metadata: Metadata = {
  title: 'Inspiration Gallery',
  description:
    'Real tiling work by TileFlow UK — bathrooms, kitchens, wet rooms, and commercial floors. Photos from actual jobs, not stock imagery.',
}

async function getImages() {
  try {
    const files = await readdir('./public/images/inspiration')
    return files
      .filter(f => f.endsWith('.webp'))
      .map(f => ({
        src: `/images/inspiration/${f}`,
        alt: `Professional tiling work — ${f.replace('.webp', '').replace(/-/g, ' ')}`,
      }))
  } catch {
    return []
  }
}

export default async function InspirationPage() {
  const images = await getImages()

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Inspiration Gallery
          </h1>
          <p className="text-stone-500 text-lg">
            {images.length} photos from real jobs. No stock imagery. No filters.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <InspirationGallery images={images} />
      </div>
    </div>
  )
}
