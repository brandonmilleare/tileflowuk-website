'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Scissors, Zap, Crosshair, Droplets, Ruler, Drill } from 'lucide-react'

const categories = [
  {
    slug: 'Tile+Cutters',
    label: 'Tile Cutters',
    icon: Scissors,
    description: 'Manual & electric cutters for every tile size',
    color: 'bg-blue-50 text-blue-700 group-hover:bg-blue-100',
  },
  {
    slug: 'Angle+Grinders',
    label: 'Angle Grinders',
    icon: Zap,
    description: 'Corded & cordless grinders for precise cuts',
    color: 'bg-orange-50 text-orange-700 group-hover:bg-orange-100',
  },
  {
    slug: 'Laser+Levels',
    label: 'Laser Levels',
    icon: Crosshair,
    description: 'Self-levelling lasers for perfect alignment',
    color: 'bg-green-50 text-green-700 group-hover:bg-green-100',
  },
  {
    slug: 'Wet+Saws',
    label: 'Wet Saws',
    icon: Droplets,
    description: 'Diamond blade wet saws for porcelain & stone',
    color: 'bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100',
  },
  {
    slug: 'Spirit+Levels',
    label: 'Spirit Levels',
    icon: Ruler,
    description: 'Professional box levels & level sets',
    color: 'bg-purple-50 text-purple-700 group-hover:bg-purple-100',
  },
  {
    slug: 'Drill+Bits',
    label: 'Drill Bits',
    icon: Drill,
    description: 'Diamond & carbide bits for tiles & glass',
    color: 'bg-rose-50 text-rose-700 group-hover:bg-rose-100',
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-16 lg:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Shop by Category
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            Every tool category reviewed and ranked by a working UK tiler — not an algorithm.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ slug, label, icon: Icon, description, color }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/shop?category=${slug}`}
                className="group flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-stone-200 hover:border-transparent hover:shadow-lg transition-all duration-300 h-full"
              >
                <span className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="font-semibold text-sm text-[var(--tf-fg)] mb-1 leading-tight">{label}</span>
                <span className="text-xs text-stone-400 leading-snug hidden lg:block">{description}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
