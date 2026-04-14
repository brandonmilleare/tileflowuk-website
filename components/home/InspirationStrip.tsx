import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { readdir } from 'fs/promises'

async function getInspirationImages() {
  try {
    const files = await readdir('./public/images/inspiration')
    return files
      .filter(f => f.endsWith('.webp'))
      .slice(0, 6)
      .map(f => `/images/inspiration/${f}`)
  } catch {
    return []
  }
}

export default async function InspirationStrip() {
  const images = await getInspirationImages()
  if (images.length === 0) return null

  return (
    <section className="py-16 lg:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-2">
              Real Work, Real Results
            </h2>
            <p className="text-stone-500">Photos from actual jobs — not stock imagery.</p>
          </div>
          <Link
            href="/inspiration"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:gap-2.5 transition-all"
          >
            Full gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <Link
              key={src}
              href="/inspiration"
              className={`relative block overflow-hidden rounded-xl bg-stone-200 ${
                i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
              } group`}
            >
              <Image
                src={src}
                alt={`Tiling project ${i + 1} by TileFlow UK`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {i === images.length - 1 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">View all photos →</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
