import type { Metadata } from 'next'
import { Download, FileText, Briefcase, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Downloads — PDF Guides',
  description:
    'Paid PDF guides from TileFlow UK — professional tiling techniques, tool setup, and business scaling for tiling contractors.',
}

const products = [
  {
    title: 'The Professional Tiling Handbook',
    subtitle: '120-page PDF guide',
    description:
      'Everything from substrate prep and waterproofing to large-format slab installation and wet room builds. Written from 10 years of daily site experience.',
    icon: FileText,
    price: '£24.99',
    status: 'coming-soon' as const,
    bullets: [
      'Substrate prep & primers — every surface type covered',
      'Waterproofing wet rooms properly (tanking vs membrane)',
      'Large-format tiles: lippage control and back-buttering',
      'Grouting dos and don\'ts for every joint width',
      'Professional tool setup and calibration tips',
    ],
  },
  {
    title: 'Scaling Your Tiling Business',
    subtitle: '80-page PDF guide',
    description:
      'How I went from solo operator to running a small tiling team — pricing, quoting, subcontractors, marketing, and the mistakes I made along the way.',
    icon: Briefcase,
    price: '£19.99',
    status: 'coming-soon' as const,
    bullets: [
      'Pricing strategies that win jobs without underselling yourself',
      'Quote templates and scope-of-work documents',
      'Hiring and managing subcontract tilers',
      'Getting repeat business and referrals from builders',
      'Tax, insurance, and setting up as a sole trader',
    ],
  },
]

export default function DigitalProductsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[var(--tf-primary)] rounded-xl">
              <Download className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--tf-accent)]">
              Instant Download
            </span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            PDF Guides
          </h1>
          <p className="text-stone-500 text-lg max-w-xl">
            Decades of professional knowledge distilled into practical, printable guides. No fluff — just what you need to know.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {products.map(({ title, subtitle, description, icon: Icon, price, status, bullets }) => (
            <article
              key={title}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                    <Icon className="w-6 h-6 text-[var(--tf-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="font-display text-xl font-bold text-[var(--tf-fg)]">{title}</h2>
                      <span className="text-xs font-medium text-stone-400">{subtitle}</span>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-5">{description}</p>

                    <ul className="space-y-2 mb-6">
                      {bullets.map(b => (
                        <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                          <span className="text-[var(--tf-primary)] font-bold shrink-0 mt-0.5">→</span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="text-2xl font-bold text-[var(--tf-fg)]">{price}</span>
                      {status === 'coming-soon' ? (
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-stone-100 rounded-full text-stone-400 text-sm font-semibold cursor-not-allowed">
                          <Lock className="w-4 h-4" />
                          Coming Soon
                        </div>
                      ) : (
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--tf-primary)] text-white text-sm font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Buy Now — {price}
                        </a>
                      )}
                    </div>

                    {status === 'coming-soon' && (
                      <p className="mt-3 text-xs text-stone-400">
                        Subscribe to the newsletter to be first in line when this launches.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
