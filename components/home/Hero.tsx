'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/website.jpeg"
        alt="Luxury marble bathroom tiled by TileFlow UK"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Side scrim — strong dark gradient on the left, fades to transparent on the right */}
      <div
        className="absolute inset-0 bg-gradient-to-r to-transparent"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(26,26,24,0.85), rgba(26,26,24,0.65), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs font-bold tracking-wide uppercase"
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            15+ Years Professional Experience
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-5 text-white">
            TileFlowUK · Built on Style. Backed by{' '}
            <span className="italic font-normal text-[var(--tf-sage)]">Skill.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-base sm:text-lg text-white/95 leading-relaxed mb-8 max-w-xl font-medium"
          >
            We bring you high-end tiles and LVT at prices that defy the design.
            We don&rsquo;t just supply the floor — we empower the project. From
            &ldquo;unbelievable&rdquo; luxury aesthetics to expert how-to guides
            and honest tool reviews, we bridge the gap between premium style and
            DIY confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--tf-primary)] text-white font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-all duration-200 text-sm shadow-lg shadow-green-900/20 hover:-translate-y-0.5"
            >
              Browse All Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/deluxe-flooring"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-full border border-white/40 hover:bg-white/25 transition-all duration-200 text-sm"
            >
              Browse Flooring
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/70 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
