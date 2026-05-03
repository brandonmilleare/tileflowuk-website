'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/tiles', label: 'Tiles' },
  { href: '/deluxe-flooring', label: 'Flooring' },
  { href: '/shop', label: 'Browse Tools' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/inspiration', label: 'Inspiration' },
  { href: '/digital-products', label: 'Downloads' },
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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-28 lg:h-36">
          {/* Logo — extra large and prominent */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="TileFlow UK Home">
            <Image
              src="/logo.svg"
              alt="TileFlow UK"
              width={480}
              height={128}
              className="h-24 lg:h-32 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav — black, big, bold, drop-shadow on hero for legibility */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <li key={href} className="relative">
                  <Link
                    href={href}
                    className={`relative px-3 py-2 text-lg font-bold tracking-wide transition-colors duration-200 rounded-md ${
                      active
                        ? 'text-[var(--tf-primary)]'
                        : 'text-black hover:text-[var(--tf-primary)]'
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

          {/* Mobile hamburger only — pill removed, Browse Tools is now inline */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="lg:hidden p-2 rounded-md text-black transition-colors"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
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
                <Image src="/logo.svg" alt="TileFlow UK" width={140} height={36} className="h-9 w-auto" />
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
                          className={`flex items-center px-3 py-2.5 rounded-lg text-base font-bold transition-colors ${
                            active
                              ? 'bg-stone-100 text-[var(--tf-primary)]'
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
