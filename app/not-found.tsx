import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-stone-50">
      <div className="text-center px-4">
        <p className="text-8xl font-display font-bold text-stone-200 mb-6 leading-none">404</p>
        <h1 className="font-display text-2xl font-bold text-[var(--tf-fg)] mb-3">
          Page Not Found
        </h1>
        <p className="text-stone-500 mb-8 max-w-sm mx-auto">
          That page doesn&apos;t exist — it may have been moved or the link is broken.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--tf-primary)] text-white font-semibold rounded-full text-sm hover:bg-[var(--tf-primary-hover)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 text-[var(--tf-fg)] font-semibold rounded-full text-sm hover:bg-stone-100 transition-colors"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
