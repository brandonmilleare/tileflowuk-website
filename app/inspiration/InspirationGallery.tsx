'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

const CATEGORIES = ['All', 'Bathrooms', 'Kitchens', 'Floors', 'Feature Walls', 'Wet Rooms']

function categoriseImage(src: string): string {
  const filename = src.toLowerCase()
  if (filename.includes('bathroom') || filename.includes('bath')) return 'Bathrooms'
  if (filename.includes('kitchen') || filename.includes('splash')) return 'Kitchens'
  if (filename.includes('floor') || filename.includes('img-0082') || filename.includes('img-0272') || filename.includes('img-3750') || filename.includes('img-4156')) return 'Floors'
  if (filename.includes('wall') || filename.includes('feature') || filename.includes('img-5102') || filename.includes('img-5458')) return 'Feature Walls'
  if (filename.includes('wet') || filename.includes('shower') || filename.includes('img-2078') || filename.includes('img-2210')) return 'Wet Rooms'
  // Default distribution for unnamed images
  const num = parseInt(filename.replace(/\D/g, '') || '0') % 5
  return CATEGORIES[num + 1] || 'Bathrooms'
}

export default function InspirationGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categorised = images.map(img => ({
    ...img,
    category: img.category ?? categoriseImage(img.src),
  }))

  const filtered = activeCategory === 'All'
    ? categorised
    : categorised.filter(img => img.category === activeCategory)

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => (i! > 0 ? i! - 1 : filtered.length - 1))
  const next = () => setLightboxIndex(i => (i! < filtered.length - 1 ? i! + 1 : 0))

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setLightboxIndex(null) }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-[var(--tf-fg)] text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
            {cat !== 'All' && (
              <span className="ml-1.5 text-xs opacity-60">
                ({categorised.filter(i => i.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <p className="text-stone-400 text-center py-12">No images in this category yet.</p>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              onClick={() => open(i)}
              className="w-full block break-inside-avoid overflow-hidden rounded-xl cursor-zoom-in group"
            >
              <div className="relative overflow-hidden rounded-xl bg-stone-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-4 p-3 text-white/70 hover:text-white z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[90vh] w-full px-16"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={1200}
                height={1600}
                className="w-full h-full object-contain max-h-[85vh] rounded-lg"
                priority
              />
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/50 text-xs">
                {lightboxIndex + 1} / {filtered.length}
                {filtered[lightboxIndex].category && (
                  <span className="ml-2 text-white/30">· {filtered[lightboxIndex].category}</span>
                )}
              </p>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-4 p-3 text-white/70 hover:text-white z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
