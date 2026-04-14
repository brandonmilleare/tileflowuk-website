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

      {/* Very light overlay — lets the marble show through, dark at bottom for button contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-black/55" />

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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 text-[#2d2d2d] text-xs font-medium tracking-wide uppercase shadow-sm"
          >
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            10+ Years Professional Experience
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-black">
            TileFlowUK
            <span className="block mt-1">Built on Style.</span>
            <span className="block">Backed by Skill.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-base text-black leading-relaxed mb-8 max-w-xl font-semibold"
          >
            Honest reviews and buying guides from a UK professional tiler. No sponsored fluff — only the tools I actually use on the job.
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
              href="/best-of"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/70 backdrop-blur-sm text-[#1f2937] font-semibold rounded-full border border-white/60 hover:bg-white/90 transition-all duration-200 text-sm shadow-sm"
            >
              Best Of Lists
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
