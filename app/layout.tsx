import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter_Tight } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { GoogleTagManager } from '@next/third-parties/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import './globals.css'

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
    'Expert tiling tool reviews, buying guides, and real inspiration from a professional UK tiler with 15+ years experience. Trusted by tradespeople and serious DIYers.',
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
        <GoogleTagManager gtmId="GTM-WMPBDV7D" />
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
