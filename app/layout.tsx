import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'TileFlow UK — Professional Tiling Tools & Inspiration',
    template: '%s | TileFlow UK',
  },
  description:
    'Expert tiling tool reviews, buying guides, and real inspiration from a professional UK tiler with 10+ years experience. Trusted by tradespeople and serious DIYers.',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#1f2937]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
