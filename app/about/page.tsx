import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — TileFlow UK',
  description:
    'TileFlow UK is run by a professional UK tiler with over 15 years of trade experience. Learn why this site exists and what you can expect from it.',
  alternates: { canonical: 'https://tileflowuk.com/about' },
}

/**
 * Person schema with full E-E-A-T signals.
 * - @id lets Article.author across the site point to a single canonical Person
 *   instead of redeclaring the bio on every blog post.
 * - sameAs unifies Brandon's identity across the social platforms he posts on.
 * - knowsAbout helps Google's Knowledge Graph match this Person to topical
 *   queries like "best UK tiler advice on porcelain".
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://tileflowuk.com/about#person',
  name: 'Brandon',
  alternateName: 'Brandon, TileFlow UK',
  jobTitle: 'Professional Tiler',
  description:
    'UK-based professional tiler with 15 years in the trade. Bathrooms, kitchens, wet rooms, commercial floors. Founder and editor of TileFlow UK.',
  url: 'https://tileflowuk.com/about',
  image: 'https://tileflowuk.com/images/about/brandon.jpg',
  knowsAbout: [
    'Tile cutting',
    'Wall tiling',
    'Floor tiling',
    'Wet room tanking',
    'Large format tile installation',
    'Tile adhesive selection',
    'Porcelain tile installation',
    'Underfloor heating tiling',
    'Subfloor preparation',
    'Tiling tool reviews',
  ],
  knowsLanguage: 'en-GB',
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Tiler',
    occupationLocation: { '@type': 'Country', name: 'United Kingdom' },
    estimatedSalary: { '@type': 'MonetaryAmountDistribution', name: 'UK tiler' },
  },
  worksFor: { '@id': 'https://tileflowuk.com#organization' },
  founder: { '@id': 'https://tileflowuk.com#organization' },
  sameAs: [
    'https://www.instagram.com/tileflowuk/',
    'https://www.tiktok.com/@tileflowuk1',
    'https://uk.pinterest.com/tileflowuk/',
  ],
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://tileflowuk.com/about#aboutpage',
  name: 'About TileFlow UK',
  url: 'https://tileflowuk.com/about',
  description:
    'TileFlow UK is run by Brandon, a professional UK tiler with 15 years of trade experience.',
  mainEntity: { '@id': 'https://tileflowuk.com/about#person' },
  isPartOf: { '@id': 'https://tileflowuk.com#website' },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <Script
        id="ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="ld-aboutpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
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
            I&apos;ve been laying tiles professionally since I was sixteen. Bathrooms, kitchens, wet rooms, commercial floors — I&apos;ve tiled them all across homes and businesses throughout the UK. After fifteen years of picking up wrong tools, wasting money on gear that looked good in adverts but fell apart on site, and reading &ldquo;reviews&rdquo; clearly written by people who&apos;d never held a tile cutter, I decided to build something better.
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
