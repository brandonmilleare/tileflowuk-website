import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — TileFlow UK',
  description:
    'TileFlow UK is run by a professional UK tiler with over 10 years of trade experience. Learn why this site exists and what you can expect from it.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            About TileFlow UK
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-[var(--tf-primary)] prose-a:no-underline hover:prose-a:underline">
          <p className="text-lg text-stone-600 leading-relaxed">
            I&apos;ve been laying tiles professionally since I was sixteen. Bathrooms, kitchens, wet rooms, commercial floors — I&apos;ve tiled them all across homes and businesses throughout the UK. After ten years of picking up wrong tools, wasting money on gear that looked good in adverts but fell apart on site, and reading &ldquo;reviews&rdquo; clearly written by people who&apos;d never held a tile cutter, I decided to build something better.
          </p>

          <h2>What TileFlow UK Is</h2>
          <p>
            An honest, no-nonsense resource for UK tilers and serious DIYers. Every tool reviewed here is one I&apos;ve either owned myself or used extensively on site. I don&apos;t accept free products in exchange for reviews, and I don&apos;t write glowing reviews because a brand has a good PR budget.
          </p>
          <p>
            The affiliate links (mostly Amazon UK) are how I pay the hosting bills. When you click through and buy, I earn a small commission at zero extra cost to you. That&apos;s the deal — transparent and honest.
          </p>

          <h2>What You Can Trust Here</h2>
          <ul>
            <li>Tool reviews based on real-world, daily use — not spec sheets</li>
            <li>UK pricing and UK supplier availability (trade accounts, merchants, Amazon)</li>
            <li>Honest pros and cons — I include the cons even when a tool is genuinely good</li>
            <li>No brand partnerships that influence editorial content</li>
            <li>Plain English — no SEO filler, no padding, no waffle</li>
          </ul>

          <h2>Get in Touch</h2>
          <p>
            Questions, corrections, or suggestions? I genuinely read every message.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full text-sm hover:bg-[var(--tf-primary-hover)] transition-colors"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 text-[var(--tf-fg)] font-semibold rounded-full text-sm hover:bg-stone-50 transition-colors"
          >
            Browse the tools
          </Link>
        </div>
      </div>
    </div>
  )
}
