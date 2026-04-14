# TileFlow UK Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan phase-by-phase. Each phase ends with a localhost preview gate — do NOT proceed to the next phase without user approval.

**Goal:** Build a premium, production-grade affiliate marketing and content website for TileFlow UK — a professional British tiling brand — deployed to Vercel at tileflowuk.com.

**Architecture:** Next.js 16 App Router with Tailwind v4, Motion animations, MDX content, shadcn/ui components, Keystatic CMS for visual editing, and a centralised affiliate link config. All content is file-based (MDX + TypeScript data files) — no database required. SEO-first with JSON-LD structured data on every page.

**Tech Stack:** Next.js 16.2.3 · Tailwind CSS v4.2.2 · Motion 12.38.0 · shadcn/ui · nuqs · next-mdx-remote 6 · Keystatic CMS · react-photo-album · yet-another-react-lightbox · react-hook-form + zod · sharp · lucide-react · next-sitemap · clsx + tailwind-merge · react-wrap-balancer · reading-time · gray-matter

---

## Pre-Phase: Assets & Tools Checklist

### Source paths (read-only — copy to public/)
- Logo SVG: `/Users/Tileflowuk/Desktop/Tile flow work /tileflowuk_logo_redesign.svg`
- Hero image: `/Users/Tileflowuk/Desktop/Tile flow work /video/website.jpeg`
- Cover banner: `/Users/Tileflowuk/Desktop/Tile flow work /video/cover photo tile flow .png`
- Portfolio photos: `/Users/Tileflowuk/Desktop/Tile flow work /insperational this is my work /` (HEIC + JPG)
- Product images: `/Users/Tileflowuk/Desktop/Tile flow work /amazon tools /` (JPG + PNG)
- Old HTML template (design reference): `/Users/Tileflowuk/Desktop/Tile flow work /tileflowuk-website.template .html`
- Amazon affiliate links: `/Users/Tileflowuk/Desktop/Tile flow work /amazon tools /affilate links for pro tools amazon.pages`
- Amazon tools HTML: `/Users/Tileflowuk/Desktop/Tile flow work /amazon tools /TileFlow UK — Pro Tools Drop.html`

### Skills to invoke during build
| Phase | Skills |
|-------|--------|
| Design work | `frontend-design` |
| All content writing | `tileflow-content` |
| SEO auditing | `seo` |
| Blog content | `blog-write`, `blog-seo-check`, `blog-schema` |
| Completion check | `superpowers:verification-before-completion` |
| Code review | `superpowers:requesting-code-review` |

---

## Phase 0: Project Foundation

**Goal:** Working Next.js 16 project with all packages installed, Tailwind v4 tokens, fonts, folder structure, and assets copied.

### Files to create
- `package.json` — all dependencies
- `next.config.ts` — image domains, MDX config, redirects
- `styles/globals.css` — Tailwind v4 @import + @theme tokens
- `app/layout.tsx` — root layout with fonts + metadata
- `tailwind.config.ts` — (minimal, for shadcn/ui plugin only)
- `tsconfig.json` — path aliases
- `.env.example` — all env vars documented
- `lib/utils.ts` — cn() helper
- `public/logo.svg` — copied from source
- `public/images/hero/website.jpeg` — hero background
- `public/images/products/` — all 16 product images copied
- `scripts/convert-heic.mjs` — HEIC → WebP converter

### Steps

- [ ] **Step 1: Initialise Next.js project**

```bash
cd /Users/Tileflowuk/Desktop/tileflowuk-v2
npx create-next-app@16.2.3 . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --use-npm
```

Expected: project files created, `npm run dev` works on first try.

- [ ] **Step 2: Install all dependencies**

```bash
npm install motion@12.38.0 next-mdx-remote@6.0.0 sharp@0.34.5 lucide-react@1.8.0 \
  next-sitemap@4.2.3 clsx@2.1.1 tailwind-merge@3.5.0 gray-matter \
  reading-time react-hook-form zod @hookform/resolvers \
  nuqs react-photo-album yet-another-react-lightbox \
  react-wrap-balancer @keystatic/core @keystatic/next \
  @tailwindcss/typography

npm install --save-dev @types/node
```

- [ ] **Step 3: Install shadcn/ui**

```bash
npx shadcn@latest init
# Choose: Default style, Neutral base colour, CSS variables yes
# This creates components.json and updates globals.css
```

- [ ] **Step 4: Configure Tailwind v4 globals.css**

Replace `styles/globals.css` (or `app/globals.css`) with:

```css
@import "tailwindcss";
@import "@tailwindcss/typography";

@theme {
  /* Brand colours */
  --color-primary: #1e40af;
  --color-primary-hover: #1d3a9e;
  --color-accent: #ea580c;
  --color-accent-hover: #dc4a00;
  --color-bg: #ffffff;
  --color-fg: #1f2937;
  --color-border: #e5e7eb;
  --color-muted: #f5f5f5;
  --color-muted-fg: #6b7280;
  --color-card-bg: #ffffff;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Montserrat', system-ui, sans-serif;

  /* Shadows */
  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07);
  --shadow-card-hover: 0 20px 40px -8px rgb(0 0 0 / 0.12);
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.08);
  --shadow-nav: 0 1px 3px rgba(0, 0, 0, 0.1);

  /* Radii */
  --radius-card: 0.5rem;
  --radius-pill: 9999px;

  /* Transitions */
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration-fast: 200ms;
  --duration-normal: 300ms;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-fg);
  background-color: var(--color-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.2;
}
```

- [ ] **Step 5: Configure next.config.ts**

```typescript
import type { NextConfig } from 'next'
import { withKeystaticConfig } from '@keystatic/next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'www.amazon.co.uk' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
}

export default withKeystaticConfig(nextConfig)
```

- [ ] **Step 6: Configure tsconfig.json paths**

Ensure `paths` includes:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/data/*": ["./data/*"],
      "@/content/*": ["./content/*"]
    }
  }
}
```

- [ ] **Step 7: Create lib/utils.ts**

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 8: Create root layout with fonts**

`app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'TileFlow UK — Professional Tiling Tools & Inspiration',
    template: '%s | TileFlow UK',
  },
  description: 'Expert tiling tool reviews, buying guides, and professional inspiration from a UK tiler with 10+ years experience.',
  metadataBase: new URL('https://tileflowuk.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://tileflowuk.com',
    siteName: 'TileFlow UK',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 9: Copy and process assets**

```bash
# Copy logo
cp "/Users/Tileflowuk/Desktop/Tile flow work /tileflowuk_logo_redesign.svg" \
   /Users/Tileflowuk/Desktop/tileflowuk-v2/public/logo.svg

# Create image directories
mkdir -p public/images/{hero,products,inspiration,video}

# Copy hero and banner
cp "/Users/Tileflowuk/Desktop/Tile flow work /video/website.jpeg" public/images/hero/
cp "/Users/Tileflowuk/Desktop/Tile flow work /video/cover photo tile flow .png" public/images/hero/

# Copy product images
cp "/Users/Tileflowuk/Desktop/Tile flow work /amazon tools /"*.jpg public/images/products/ 2>/dev/null || true
cp "/Users/Tileflowuk/Desktop/Tile flow work /amazon tools /"*.png public/images/products/ 2>/dev/null || true
```

- [ ] **Step 10: Write HEIC converter script**

`scripts/convert-heic.mjs`:
```javascript
import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'

const SOURCE = '/Users/Tileflowuk/Desktop/Tile flow work /insperational this is my work /'
const DEST = './public/images/inspiration/'

await mkdir(DEST, { recursive: true })

const files = await readdir(SOURCE)
const imageFiles = files.filter(f => /\.(heic|HEIC|jpg|JPG|jpeg|JPEG|png|PNG)$/.test(f))

for (const file of imageFiles) {
  const name = basename(file, extname(file)).toLowerCase().replace(/\s+/g, '-')
  const outPath = join(DEST, `${name}.webp`)
  
  try {
    await sharp(join(SOURCE, file))
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outPath)
    console.log(`✓ ${file} → ${name}.webp`)
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`)
  }
}

console.log('Done!')
```

Run it:
```bash
node scripts/convert-heic.mjs
```

Expected: 17 WebP files in `public/images/inspiration/`

- [ ] **Step 11: Create data/affiliateLinks.ts**

Read the HTML from: `/Users/Tileflowuk/Desktop/Tile flow work /amazon tools /TileFlow UK — Pro Tools Drop.html`
Extract ASINs and build:

```typescript
export const AMAZON_TAG = 'tileflowuk-21'

export function amazonUrl(asin: string): string {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`
}

export const affiliateLinks = {
  sigma4bu70: amazonUrl('B000XXXXX1'),      // REPLACE: real ASIN
  sigma4en125: amazonUrl('B000XXXXX2'),
  sigma4dn95: amazonUrl('B000XXXXX3'),
  dewaltAngle18v: amazonUrl('B000XXXXX4'),
  dewaltAngle54v: amazonUrl('B000XXXXX5'),
  dewaltDcg405n: amazonUrl('B000XXXXX6'),
  dewaltWetSaw: amazonUrl('B000XXXXX7'),
  dewaltLaser: amazonUrl('B000XXXXX8'),
  boschLaser: amazonUrl('B000XXXXX9'),
  makitaAngle: amazonUrl('B000XXXXA1'),
  boschAngle: amazonUrl('B000XXXXA2'),
  stabilaLevel: amazonUrl('B000XXXXA3'),
  oxLevelBag: amazonUrl('B000XXXXA4'),
  huepar: amazonUrl('B000XXXXA5'),
  drillBits: amazonUrl('B000XXXXA6'),
  rubiRdxa: amazonUrl('B000XXXXA7'),
} as const
```

- [ ] **Step 12: Create .env.example**

```env
# Site
NEXT_PUBLIC_SITE_URL=https://tileflowuk.com

# Analytics (add after Vercel deployment)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Keystatic (local dev uses GitHub mode in production)
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=

# DataForSEO (optional - for keyword research)
DATAFORSEO_USERNAME=
DATAFORSEO_PASSWORD=
```

- [ ] **Step 13: Verify dev server**

```bash
npm run dev
```

Expected: No errors. Blank page at localhost:3000 is fine — layout shell comes in Phase 1.

- [ ] **Step 14: Commit Phase 0**

```bash
git add -A
git commit -m "Phase 0: Project foundation — Next.js 16, Tailwind v4, all packages, assets copied"
git push
```

---

## Phase 1: Layout Shell — Navbar + Footer

**Goal:** Sticky glass navbar and full footer wrapping all pages. Mobile hamburger. Animated active link.

### Files to create/modify
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/SocialBar.tsx`
- `app/layout.tsx` — add Navbar + Footer
- `app/page.tsx` — temporary placeholder so we can see layout

### Steps

- [ ] **Step 1: Create Navbar component**

`components/layout/Navbar.tsx`:
```typescript
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/shop', label: 'Pro Tools' },
  { href: '/blog', label: 'The Journal' },
  { href: '/guides', label: 'Buying Guides' },
  { href: '/inspiration', label: 'Inspiration' },
  { href: '/deals', label: 'Deals' },
  { href: '/downloads', label: 'Downloads' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [pathname])

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-nav)] border-b border-[var(--color-border)]'
          : 'bg-white/90 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.svg" alt="TileFlow UK" width={180} height={48} priority />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
                      isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-fg)] hover:text-[var(--color-accent)]'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--color-accent)] rounded-full"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[var(--color-accent)] rounded-md hover:bg-[var(--color-accent-hover)] transition-all duration-200 hover:scale-105"
            >
              Shop Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-[var(--color-fg)]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-[var(--color-border)] bg-white overflow-hidden"
          >
            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                      pathname.startsWith(link.href)
                        ? 'text-[var(--color-accent)] bg-orange-50'
                        : 'text-[var(--color-fg)] hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2 border-t border-[var(--color-border)]"
              >
                <Link
                  href="/shop"
                  className="block w-full text-center px-3 py-2.5 text-sm font-semibold text-white bg-[var(--color-accent)] rounded-md"
                >
                  Shop Now
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
```

- [ ] **Step 2: Create Footer component**

`components/layout/Footer.tsx`:
```typescript
import Link from 'next/link'
import Image from 'next/image'
import { SocialBar } from './SocialBar'

const footerNav = {
  Tools: [
    { href: '/shop', label: 'Pro Tools' },
    { href: '/shop?category=tile-cutters', label: 'Tile Cutters' },
    { href: '/shop?category=angle-grinders', label: 'Angle Grinders' },
    { href: '/shop?category=laser-levels', label: 'Laser Levels' },
    { href: '/deals', label: 'Current Deals' },
  ],
  Content: [
    { href: '/blog', label: 'The Journal' },
    { href: '/guides', label: 'Buying Guides' },
    { href: '/best/tile-cutters-uk', label: 'Best Tile Cutters' },
    { href: '/inspiration', label: 'Inspiration Gallery' },
    { href: '/downloads', label: 'Free Downloads' },
  ],
  Company: [
    { href: '/about', label: 'About TileFlow UK' },
    { href: '/contact', label: 'Contact' },
    { href: '/digital-products', label: 'PDF Guides' },
    { href: '/disclosure', label: 'Affiliate Disclosure' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-fg)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <Image src="/logo.svg" alt="TileFlow UK" width={160} height={42} className="mb-4 brightness-0 invert" />
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {/* REPLACE: brand tagline */}
              The UK's go-to resource for professional tilers and serious DIYers. Expert reviews, honest advice, real trade knowledge.
            </p>
            <SocialBar variant="footer" />
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} TileFlow UK / Stonehouse Tiling. All rights reserved.</p>
          <p>
            This site contains affiliate links.{' '}
            <Link href="/disclosure" className="text-gray-400 hover:text-white underline">
              See our disclosure →
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create SocialBar component**

`components/layout/SocialBar.tsx`:
```typescript
import Link from 'next/link'
import { cn } from '@/lib/utils'

const socials = [
  { href: 'https://tiktok.com/@tileflowuk', label: 'TikTok', icon: 'tiktok' },
  { href: 'https://instagram.com/tileflowuk', label: 'Instagram', icon: 'instagram' },
  { href: 'https://facebook.com/tileflowuk', label: 'Facebook', icon: 'facebook' },
  { href: 'https://pinterest.com/tileflowuk', label: 'Pinterest', icon: 'pinterest' },
]

// SVG icons inlined for performance (no extra library)
const icons: Record<string, React.ReactNode> = {
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  pinterest: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
}

interface SocialBarProps {
  variant?: 'header' | 'footer'
}

export function SocialBar({ variant = 'footer' }: SocialBarProps) {
  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <Link
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={cn(
            'p-2 rounded-full transition-all duration-200 hover:scale-110',
            variant === 'footer'
              ? 'text-gray-400 hover:text-white hover:bg-white/10'
              : 'text-[var(--color-muted-fg)] hover:text-[var(--color-accent)]'
          )}
        >
          {icons[social.icon]}
        </Link>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Update root layout with Navbar + Footer**

`app/layout.tsx` — add to body:
```tsx
<body>
  <Navbar />
  <main>{children}</main>
  <Footer />
</body>
```

- [ ] **Step 5: Add temporary homepage placeholder**

`app/page.tsx`:
```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl">
        TileFlow UK — Coming Soon
      </h1>
    </div>
  )
}
```

- [ ] **Step 6: Verify layout at localhost:3000**

```bash
npm run dev
```

Open http://localhost:3000 — you should see:
- Sticky glass navbar with logo + nav links
- "TileFlow UK — Coming Soon" placeholder
- Dark footer with 4 columns + social icons

- [ ] **Step 7: Commit Phase 1**

```bash
git add -A
git commit -m "Phase 1: Navbar + Footer shell with Motion animations, mobile hamburger"
git push
```

---

## Phase 2: Homepage

**Goal:** Full homepage — hero, categories, stats countup, featured products, blog grid, newsletter, CTA.

### Files to create
- `app/page.tsx` — full homepage
- `components/ui/ScrollReveal.tsx` — scroll-triggered fade-up wrapper
- `components/ui/CountUpStats.tsx` — animated number counters
- `components/ui/NewsletterSignup.tsx` — email capture
- `components/product/ProductCard.tsx` — card (also used on /shop)
- `data/products.ts` — all product data
- `data/categories.ts` — category card data

### Steps

- [ ] **Step 1: Create ScrollReveal wrapper**

`components/ui/ScrollReveal.tsx`:
```typescript
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export function ScrollReveal({ children, className, delay = 0, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 24 : 0,
    x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create CountUpStats component**

`components/ui/CountUpStats.tsx`:
```typescript
'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'motion/react'

interface StatItem {
  value: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
  { value: 16, suffix: '+', label: 'Tools Reviewed' },
]

function Counter({ value, suffix, label }: StatItem) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = (value / duration) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-display)' }}>
        {count}{suffix}
      </div>
      <div className="text-sm text-[var(--color-muted-fg)] uppercase tracking-widest mt-1">{label}</div>
    </div>
  )
}

export function CountUpStats() {
  return (
    <section className="bg-white border-y border-[var(--color-border)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create data/products.ts**

Read `/Users/Tileflowuk/Desktop/Tile flow work /amazon tools /TileFlow UK — Pro Tools Drop.html` and extract real product names, descriptions and prices. Build:

```typescript
import { amazonUrl } from './affiliateLinks'

export interface Product {
  slug: string
  name: string
  shortName: string
  category: string
  price: number
  rating: number
  reviewCount: number
  image: string
  description: string
  badge?: 'Best Seller' | "Editor's Pick" | 'Best Value' | 'Pro Choice'
  affiliateUrl: string
  featured: boolean
}

export const products: Product[] = [
  {
    slug: 'sigma-4bu-70cm',
    name: 'Sigma Tile Cutter Art. 4BU 70cm',
    shortName: 'Sigma 4BU 70cm',
    category: 'Tile Cutters',
    price: 289,
    rating: 4.8,
    reviewCount: 342,
    image: '/images/products/Sigma Tile Cutter Art. 4BU 70 cm.png',
    description: 'Professional manual tile cutter with 70cm cutting capacity. Ideal for medium to large format tiles up to 15mm thick.',
    badge: 'Best Seller',
    affiliateUrl: amazonUrl('B000XXXXX1'), // REPLACE: real ASIN
    featured: true,
  },
  // ... remaining 15 products following same pattern
]

export const featuredProducts = products.filter(p => p.featured).slice(0, 6)
export const productsByCategory = products.reduce((acc, p) => {
  if (!acc[p.category]) acc[p.category] = []
  acc[p.category].push(p)
  return acc
}, {} as Record<string, Product[]>)

export const categories = [...new Set(products.map(p => p.category))]
```

- [ ] **Step 4: Create ProductCard component**

`components/product/ProductCard.tsx`:
```typescript
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { StarRating } from './StarRating'
import { AffiliateButton } from './AffiliateButton'
import { cn } from '@/lib/utils'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-bold text-white bg-[var(--color-accent)] rounded-full">
          {product.badge}
        </div>
      )}

      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wide mb-1">
          {product.category}
        </div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[var(--color-fg)] hover:text-[var(--color-primary)] line-clamp-2 mb-2 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-[var(--color-muted-fg)]">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-display)' }}>
            £{product.price.toLocaleString('en-GB')}
          </span>
          <AffiliateButton href={product.affiliateUrl} size="sm" label="Buy Now" />
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 5: Create StarRating + AffiliateButton components**

`components/product/StarRating.tsx`:
```typescript
import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export function StarRating({ rating, size = 'md', showValue = false }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= rating) return 'full'
    if (i + 0.5 <= rating) return 'half'
    return 'empty'
  })

  const sizeClass = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' }[size]

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((type, i) => (
        <span key={i} className="text-amber-400">
          {type === 'full' ? <Star className={cn(sizeClass, 'fill-current')} /> :
           type === 'half' ? <StarHalf className={cn(sizeClass, 'fill-current')} /> :
           <Star className={cn(sizeClass, 'text-gray-200 fill-current')} />}
        </span>
      ))}
      {showValue && <span className="text-sm font-semibold ml-1 text-[var(--color-fg)]">{rating}</span>}
    </div>
  )
}
```

`components/product/AffiliateButton.tsx`:
```typescript
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AffiliateButtonProps {
  href: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AffiliateButton({ href, label = 'Buy on Amazon', size = 'md', className }: AffiliateButtonProps) {
  const sizeClass = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size]

  return (
    <a
      href={href}
      rel="nofollow sponsored"
      target="_blank"
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold text-white bg-[var(--color-accent)] rounded-md',
        'hover:bg-[var(--color-accent-hover)] hover:scale-105 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2',
        sizeClass,
        className
      )}
    >
      {label}
      <ExternalLink className="w-3 h-3 opacity-75" />
    </a>
  )
}
```

- [ ] **Step 6: Build full Homepage**

`app/page.tsx` — full implementation with:
- Hero section: `website.jpeg` background, dark overlay, staggered Motion animation, headline + 2 CTAs
- "What We Offer" category cards: Shop, Tools, Journal, Guides, Downloads, Inspiration
- CountUpStats bar
- Featured Products grid (6 cards from `featuredProducts`)
- Latest Blog section (3 placeholder posts)
- CTA section with dark background
- NewsletterSignup

Use `tileflow-content` skill for all copy in this file.

- [ ] **Step 7: Verify homepage at localhost:3000**

Open http://localhost:3000. Check:
- Hero image loads with overlay
- Headline animates in with stagger
- Category cards hover correctly
- Stats count up on scroll
- Product cards show with images
- Mobile layout looks correct (resize browser)

- [ ] **Step 8: Commit Phase 2**

```bash
git add -A
git commit -m "Phase 2: Homepage — hero, categories, stats, products, blog grid, newsletter"
git push
```

---

## Phase 3: Shop Page + Product Filtering

**Goal:** `/shop` — filterable, sortable product grid using `nuqs` for URL state.

### Files to create
- `app/shop/page.tsx`
- `components/product/ProductGrid.tsx`
- `components/product/CategoryFilter.tsx`
- `components/product/SortDropdown.tsx`

### Steps

- [ ] **Step 1: Create CategoryFilter with animated pill**

`components/product/CategoryFilter.tsx`:
```typescript
'use client'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (cat: string) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const all = ['All', ...categories]

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const isActive = cat === selected || (cat === 'All' && selected === '')
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat === 'All' ? '' : cat)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
              isActive ? 'text-white' : 'text-[var(--color-fg)] bg-[var(--color-muted)] hover:bg-gray-200'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 bg-[var(--color-accent)] rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Build /shop page with nuqs filtering**

`app/shop/page.tsx`:
```typescript
'use client'
import { useQueryState } from 'nuqs'
import { products, categories } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { CategoryFilter } from '@/components/product/CategoryFilter'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export default function ShopPage() {
  const [category, setCategory] = useQueryState('category', { defaultValue: '' })
  const [sort, setSort] = useQueryState('sort', { defaultValue: 'featured' })

  const filtered = products
    .filter(p => !category || p.category === category)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ScrollReveal>
        <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-bold mb-2">
          Pro Tiling Tools
        </h1>
        <p className="text-[var(--color-muted-fg)] mb-8">
          {/* REPLACE: category description */}
          Every tool here has been chosen because it earns its place on a real job site. No filler.
        </p>
      </ScrollReveal>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 text-sm border border-[var(--color-border)] rounded-md bg-white"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify /shop page**

Check: filter tabs animate correctly, URL updates with ?category=, sorting works.

- [ ] **Step 4: Commit Phase 3**

```bash
git add -A
git commit -m "Phase 3: Shop page with nuqs URL-state filtering and animated category pills"
git push
```

---

## Phase 4: Product Detail Page

**Goal:** `/shop/[slug]` — full product review page with MDX content, specs, ProsCons.

### Files to create
- `app/shop/[slug]/page.tsx`
- `components/product/ProsCons.tsx`
- `components/product/ComparisonTable.tsx`
- `components/ui/Breadcrumbs.tsx`
- `content/products/sigma-4bu-70cm.mdx` — first product MDX

### Steps (abbreviated — full pattern, repeat for all products)

- [ ] **Step 1: Create ProsCons component**

`components/product/ProsCons.tsx`:
```typescript
import { CheckCircle, XCircle } from 'lucide-react'

interface ProsConsProps {
  pros: string[]
  cons: string[]
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      <div className="bg-green-50 rounded-lg p-5 border border-green-100">
        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Pros
        </h4>
        <ul className="space-y-2">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-sm text-green-900">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-green-500 flex-shrink-0" />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 rounded-lg p-5 border border-red-100">
        <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          <XCircle className="w-4 h-4" /> Cons
        </h4>
        <ul className="space-y-2">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-sm text-red-900">
              <XCircle className="w-3.5 h-3.5 mt-0.5 text-red-400 flex-shrink-0" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create Breadcrumbs**

`components/ui/Breadcrumbs.tsx`:
```typescript
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb { href: string; label: string }

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[var(--color-muted-fg)] mb-6">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
          {i === crumbs.length - 1 ? (
            <span className="text-[var(--color-fg)]">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-[var(--color-accent)] transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
```

- [ ] **Step 3: Build product detail page**

`app/shop/[slug]/page.tsx` — server component that:
1. Finds product by slug from `products.ts`
2. Renders full product layout: image, specs table, StarRating, price, AffiliateButton (sticky on mobile)
3. Includes ProsCons and Breadcrumbs
4. Shows related products grid (same category, max 4)
5. Includes JSON-LD Product + Review structured data
6. Returns 404 for unknown slugs

- [ ] **Step 4: Commit Phase 4**

```bash
git add -A
git commit -m "Phase 4: Product detail pages with specs, ProsCons, related products, JSON-LD"
git push
```

---

## Phase 5: Blog System

**Goal:** `/blog` index + `/blog/[slug]` post pages with MDX, ToC, reading time, 3 placeholder posts.

### Files to create
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `lib/mdx.ts` — MDX utilities
- `components/blog/BlogCard.tsx`
- `components/blog/TableOfContents.tsx`
- `components/blog/CalloutBox.tsx`
- `components/mdx/MDXComponents.tsx`
- `content/blog/how-to-cut-porcelain-tiles.mdx`
- `content/blog/best-tile-cutter-uk-2026.mdx`
- `content/blog/large-format-tile-installation-guide.mdx`

### Key implementation notes
- Use `next-mdx-remote/rsc` for RSC MDX rendering
- `lib/mdx.ts` exports `getAllPosts()`, `getPost(slug)`, `getRelatedPosts(slug, category)`
- `reading-time` package for read time calculation
- `gray-matter` for frontmatter parsing
- Use `tileflow-content` + `blog-write` skills for all 3 placeholder blog posts

---

## Phase 6: Inspiration Gallery

**Goal:** `/inspiration` — masonry gallery of all 17 portfolio photos, lightbox, category filters.

### Key implementation
- `react-photo-album` for masonry layout
- `yet-another-react-lightbox` for click-to-expand
- Manual category tagging in `data/inspiration.ts`
- HEIC conversion already done in Phase 0 (WebP files in `public/images/inspiration/`)
- Category filter tabs: All, Bathrooms, Kitchens, Floors, Feature Walls, Large Format

---

## Phase 7: Best Of + Buying Guides

**Goal:** `/best/[slug]` comparison pages + `/guides/[slug]` buying guides. MDX + ComparisonTable.

### Placeholder content (use `blog-write` + `tileflow-content` skills)
- `content/best/best-tile-cutters-uk-2026.mdx`
- `content/best/best-angle-grinders-for-tiling.mdx`
- `content/guides/how-to-choose-a-tile-cutter.mdx`
- `content/guides/professional-tiling-tools-buying-guide.mdx`

---

## Phase 8: Secondary Pages

**Goal:** Deals, Downloads, Digital Products, About, Contact

### `/deals` — DealCard components with optional countdown timers
### `/downloads` — Free resource cards with PDF preview thumbnails
### `/digital-products` — Premium PDF guide cards, Gumroad/Lemon Squeezy placeholder buttons
### `/about` — Brand story, stats, portfolio photos from inspiration folder
### `/contact` — react-hook-form + zod validated form (name, email, subject, message)

---

## Phase 9: Legal + 404

**Goal:** `/disclosure`, `/privacy`, `/terms`, custom 404 page.

Use `tileflow-content` skill. All pages include proper UK/GDPR language.

---

## Phase 10: SEO Polish

**Goal:** JSON-LD on every page, sitemap, robots.txt, metadata API, Lighthouse 95+.

### Steps
- Add JSON-LD: Organization + WebSite on homepage
- Add JSON-LD: Product + Review on all product pages
- Add JSON-LD: Article + BreadcrumbList on blog/guide pages
- Configure `next-sitemap` in `next-sitemap.config.js`
- Add `robots.txt` via Next.js route handler
- Run `/seo audit` skill against localhost build
- Fix any issues flagged

---

## Phase 11: Keystatic CMS + PWA + Final Polish

**Goal:** Visual editing panel, PWA manifest, favicon, cookie consent, GA4, loading skeletons, README.

### Keystatic setup
- `keystatic.config.ts` — configure collections for blog posts, products, guides
- `app/keystatic/[...params]/route.ts` — Keystatic route handler
- Users access visual editor at `/keystatic` after deployment

### PWA
- `public/manifest.json` — PWA manifest with TileFlow UK icons
- `public/favicon.ico` — generated from logo SVG

### Cookie consent
- Install `react-cookie-consent` or build minimal banner
- Required for GDPR/UK PECR compliance

### Analytics
- Add GA4 measurement ID to `.env` and wire `next/script` in layout

---

## Phase 12: Vercel Deployment

**Goal:** Live at tileflowuk.com

### Steps
- [ ] Run `npm run build` — fix any build errors
- [ ] Run `/seo audit` skill one final time
- [ ] Run `superpowers:verification-before-completion`
- [ ] `npm i -g vercel && vercel login`
- [ ] `vercel` — deploy preview, get preview URL
- [ ] **STOP: show user preview URL, wait for approval**
- [ ] Set env vars in Vercel dashboard
- [ ] Connect domain `tileflowuk.com` via Vercel DNS settings
- [ ] `vercel --prod` — go live

---

## DataForSEO MCP Setup (keyword research)

You need a DataForSEO account for keyword research during content phases.

1. Sign up at https://dataforseo.com (free to sign up, $1 free credit)
2. Get API credentials from API Access tab
3. Run in terminal:
```bash
claude mcp add --header "Authorization: Basic $(echo -n 'YOUR_EMAIL:YOUR_PASSWORD' | base64)" \
  --transport http dfs-mcp https://mcp.dataforseo.com/http
```
4. Cost: ~£15-40/quarter for normal usage — completely worth it for keyword data

---

## Toolkit Summary

| Tool | Purpose |
|------|---------|
| `frontend-design` skill | All design decisions |
| `tileflow-content` skill | All site copy |
| `seo` skill (19 sub-skills) | SEO audits, schema, sitemap |
| `blog-write` skill | Blog post content |
| `blog-seo-check` skill | Post-writing SEO validation |
| `vercel:nextjs` skill | Next.js 16 App Router guidance |
| `vercel:shadcn` skill | shadcn/ui component guidance |
| `superpowers:verification-before-completion` | Gate before marking any phase done |
| DataForSEO MCP | Keyword volume + difficulty data |
| Firecrawl MCP | Competitor page analysis |
| Canva MCP | PDF guide cover mockup images |
