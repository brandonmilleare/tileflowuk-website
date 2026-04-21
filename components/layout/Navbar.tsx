'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ShoppingBag } from 'lucide-react'

const navLinks = [
  { href: '/tiles', label: 'Tiles' },
  { href: '/shop', label: 'Shop' },
  { href: '/best-of', label: 'Best Of' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/inspiration', label: 'Inspiration' },
  { href: '/digital-products', label: 'Downloads' },
  { href: '/deals', label: 'Deals' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200/60'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="TileFlow UK Home">
            <Image
              src="/logo.svg"
              alt="TileFlow UK"
              width={220}
              height={56}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <li key={href} className="relative">
                  <Link
                    href={href}
                    className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md ${
                      active
                        ? 'text-[var(--tf-primary)]'
                        : scrolled || !isHome
                          ? 'text-[var(--tf-fg)] hover:text-[var(--tf-primary)]'
                          : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--tf-primary)] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                scrolled || !isHome
                  ? 'bg-[var(--tf-primary)] text-white hover:bg-[var(--tf-primary-hover)]'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white/25'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Browse Tools
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                scrolled || !isHome ? 'text-[var(--tf-fg)]' : 'text-white'
              }`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
                <Image src="/logo.svg" alt="TileFlow UK" width={120} height={30} className="h-7 w-auto" />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1.5 text-stone-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map(({ href, label }, i) => {
                    const active = pathname === href || pathname.startsWith(href + '/')
                    return (
                      <motion.li
                        key={href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={href}
                          className={`flex items-center px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                            active
                              ? 'bg-blue-50 text-[var(--tf-primary)]'
                              : 'text-[var(--tf-fg)] hover:bg-stone-50'
                          }`}
                        >
                          {label}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <div className="px-4 py-5 border-t border-stone-100">
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full text-sm hover:bg-[var(--tf-primary-hover)] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Browse All Tools
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
