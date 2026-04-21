import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'

const SvgInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const SvgYoutube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)
const SvgFacebook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const shopLinks = [
  { href: '/tiles', label: 'Tiles (Coming Soon)' },
  { href: '/shop', label: 'All Tools' },
  { href: '/shop?category=Tile+Cutters', label: 'Tile Cutters' },
  { href: '/shop?category=Angle+Grinders', label: 'Angle Grinders' },
  { href: '/shop?category=Laser+Levels', label: 'Laser Levels' },
  { href: '/shop?category=Wet+Saws', label: 'Wet Saws' },
  { href: '/shop?category=Spirit+Levels', label: 'Spirit Levels' },
  { href: '/deals', label: 'Deals' },
]

const contentLinks = [
  { href: '/best-of', label: 'Best Of Lists' },
  { href: '/guides', label: 'Buying Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/inspiration', label: 'Inspiration Gallery' },
  { href: '/digital-products', label: 'PDF Downloads' },
]

const companyLinks = [
  { href: '/about', label: 'About TileFlow UK' },
  { href: '/contact', label: 'Contact' },
  { href: '/disclosure', label: 'Affiliate Disclosure' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
]

const socials = [
  { href: 'https://instagram.com/tileflowuk', label: 'Instagram', Icon: SvgInstagram },
  { href: 'https://youtube.com/@tileflowuk', label: 'YouTube', Icon: SvgYoutube },
  { href: 'https://facebook.com/tileflowuk', label: 'Facebook', Icon: SvgFacebook },
  { href: 'mailto:hello@tileflowuk.com', label: 'Email', Icon: Mail },
]

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-stone-300 mt-auto">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="TileFlow UK"
              width={140}
              height={36}
              className="h-9 w-auto brightness-0 invert mb-4"
            />
          </Link>
          <p className="text-sm leading-relaxed text-stone-400 mb-5">
            Honest tool reviews and practical guides from a UK professional tiler with 10+ years on the tools. No fluff — just what works.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 transition-colors text-stone-400 hover:text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">Shop by Category</h3>
          <ul className="space-y-2.5">
            {shopLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-stone-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">Content</h3>
          <ul className="space-y-2.5">
            {contentLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-stone-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">Company</h3>
          <ul className="space-y-2.5">
            {companyLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-stone-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Affiliate disclosure bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500 text-center sm:text-left">
            © {new Date().getFullYear()} TileFlow UK. All rights reserved.
          </p>
          <p className="text-xs text-stone-600 text-center sm:text-right max-w-md">
            As an Amazon Associate I earn from qualifying purchases.{' '}
            <Link href="/disclosure" className="underline hover:text-stone-400 transition-colors">
              Full disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
