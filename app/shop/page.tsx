import type { Metadata } from 'next'
import { Suspense } from 'react'
import ShopClient from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop — Tiling Tools',
  description:
    'Browse all professional tiling tools reviewed by TileFlow UK — tile cutters, angle grinders, laser levels, wet saws, spirit levels, and drill bits.',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-2">
            Professional Tiling Tools
          </h1>
          <p className="text-stone-500">
            Every tool reviewed by a working UK tiler. Click any category to filter.
          </p>
        </div>
      </div>

      <Suspense fallback={<ShopSkeleton />}>
        <ShopClient />
      </Suspense>
    </div>
  )
}

function ShopSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-stone-200 rounded-full animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-stone-100 rounded-2xl aspect-[3/4] animate-pulse" />
        ))}
      </div>
    </div>
  )
}
