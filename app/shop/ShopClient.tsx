'use client'

import { useQueryState } from 'nuqs'
import { motion, AnimatePresence } from 'motion/react'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

const ALL = 'All'

export default function ShopClient() {
  const [activeCategory, setActiveCategory] = useQueryState('category', {
    defaultValue: ALL,
    shallow: true,
  })

  const filtered =
    activeCategory === ALL
      ? products
      : products.filter(p => p.category === activeCategory)

  const pills = [ALL, ...categories]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {pills.map(cat => {
          const active = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === ALL ? null : cat)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200 ${
                active
                  ? 'bg-[var(--tf-primary)] text-white border-[var(--tf-primary)]'
                  : 'bg-white text-stone-600 border-stone-300 hover:border-[var(--tf-primary)] hover:text-[var(--tf-primary)]'
              }`}
            >
              {cat}
              {active && cat !== ALL && (
                <motion.span
                  layoutId="pill-bg"
                  className="absolute inset-0 rounded-full bg-[var(--tf-primary)] -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Result count */}
      <p className="text-sm text-stone-400 mb-6">
        Showing {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== ALL && ` in ${activeCategory}`}
      </p>

      {/* Product grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((product, i) => (
            <motion.div
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
