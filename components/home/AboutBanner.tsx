import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const points = [
  'Every tool review is based on real-world use, not spec sheets',
  'No sponsored posts — affiliate links pay the bills, not my opinions',
  'UK trade pricing, UK supplier availability, UK VAT considered',
  'From 12×12 cm ceramics to 120×260 cm slabs — I tile it all',
]

export default function AboutBanner() {
  return (
    <section className="py-16 lg:py-20 bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            About TileFlow UK
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-5 leading-tight">
            Advice From Someone Who&apos;s Actually Used the Kit
          </h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            I&apos;ve been laying tiles professionally for over a decade — bathrooms, kitchens, wet rooms, and commercial floors. This site exists because I was fed up of &ldquo;review&rdquo; sites written by people who&apos;d never held a tile cutter.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
          >
            Read my story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ul className="space-y-4">
          {points.map(point => (
            <li key={point} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <span className="text-stone-300 text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
