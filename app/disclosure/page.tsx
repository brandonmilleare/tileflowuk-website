import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'TileFlow UK affiliate disclosure — how this site earns money and how that affects our content.',
  robots: { index: false },
}

export default function DisclosurePage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-[var(--tf-fg)] mb-8">Affiliate Disclosure</h1>
        <div className="prose prose-stone max-w-none prose-headings:font-display">
          <p className="text-lg text-stone-600">
            TileFlow UK participates in the Amazon Associates programme and other affiliate programmes. This means that when you click a link on this site and make a purchase, we may earn a small commission — at no additional cost to you.
          </p>
          <h2>How Affiliate Links Work</h2>
          <p>
            When you click an affiliate link on TileFlow UK, a small cookie is set in your browser that tells the retailer (e.g. Amazon) that you arrived via this site. If you make a qualifying purchase within the cookie window, we receive a commission, typically 1–5% of the sale price.
          </p>
          <h2>Does This Affect Our Reviews?</h2>
          <p>
            No. Every tool reviewed on TileFlow UK is chosen based on its merit — either because I&apos;ve used it professionally or because it represents good value for the price. I include cons in every review, even on products I rate highly. I never recommend a tool because of its affiliate commission rate.
          </p>
          <h2>Which Programmes We Participate In</h2>
          <ul>
            <li>
              <strong>Amazon Associates (UK):</strong> Links to amazon.co.uk with the tag <code>tileflowuk-21</code>
            </li>
          </ul>
          <h2>Your Rights</h2>
          <p>
            You are under no obligation to use our affiliate links. You can always visit Amazon or any other retailer directly. Our commission is paid by the retailer, not by you.
          </p>
          <p>
            If you have any questions about this disclosure, please{' '}
            <a href="/contact">get in touch</a>.
          </p>
          <p className="text-sm text-stone-400">Last updated: June 2025</p>
        </div>
      </div>
    </div>
  )
}
