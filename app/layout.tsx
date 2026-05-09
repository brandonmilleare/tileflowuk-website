import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Inter_Tight } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { GoogleTagManager } from '@next/third-parties/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import WebVitals from '@/components/analytics/WebVitals'
import './globals.css'

/**
 * Sitewide schema — Organization + WebSite. Renders once on every page so
 * we don't have to re-declare the brand on every route. Page-level schema
 * (Article, Product, FAQPage, BreadcrumbList) layers on top of this.
 *
 * Why both Organization and WebSite:
 *  - Organization tells Google who we are (sameAs unifies us across socials).
 *  - WebSite enables sitelinks search box (potential rich result) and
 *    name-in-search-results consistency.
 */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://tileflowuk.com#organization',
  name: 'TileFlow UK',
  url: 'https://tileflowuk.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://tileflowuk.com/logo.svg',
    width: 512,
    height: 512,
  },
  description:
    'Professional tiling tool reviews and buying guides from a UK tiler with 15 years on site.',
  founder: {
    '@type': 'Person',
    name: 'Brandon',
    url: 'https://tileflowuk.com/about',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  sameAs: [
    'https://www.instagram.com/tileflowuk/',
    'https://www.tiktok.com/@tileflowuk1',
    'https://pinterest.co.uk/tileflowuk',
    'https://youtube.com/@tileflowuk',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://tileflowuk.com#website',
  name: 'TileFlow UK',
  url: 'https://tileflowuk.com',
  description:
    'Tiling tools, buying guides, and curated tile range from a UK tiler.',
  publisher: { '@id': 'https://tileflowuk.com#organization' },
  inLanguage: 'en-GB',
}

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'TileFlow UK — Professional Tiling Tools & Inspiration',
    template: '%s | TileFlow UK',
  },
  description:
    'Tiling tool reviews and buying guides from a UK tiler with 15+ years on site. Trusted by tradespeople and serious DIYers.',
  metadataBase: new URL('https://tileflowuk.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://tileflowuk.com',
    siteName: 'TileFlow UK',
    images: [{ url: '/images/hero/website.jpeg', width: 1200, height: 630, alt: 'TileFlow UK' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tileflowuk',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: process.env.PINTEREST_DOMAIN_VERIFY
      ? { 'p:domain_verify': process.env.PINTEREST_DOMAIN_VERIFY }
      : {},
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${interTight.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--tf-paper)] text-[var(--tf-ink)]">
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/*
          GTM — afterInteractive defers loading until after the page is
          interactive, which protects INP/LCP. @next/third-parties already
          uses afterInteractive internally; this comment is here so future
          us doesn't doubt it.
        */}
        <GoogleTagManager gtmId="GTM-WMPBDV7D" />
        {/* Reports Core Web Vitals (INP, LCP, CLS, FCP, TTFB) to GA4 as
            'web_vitals' events. Only active when gtag is loaded. */}
        <WebVitals />
        <NuqsAdapter>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </NuqsAdapter>
      </body>
    </html>
  )
}
