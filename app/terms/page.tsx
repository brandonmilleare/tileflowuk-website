import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-[var(--tf-fg)] mb-8">Terms of Use</h1>
        <div className="prose prose-stone max-w-none prose-headings:font-display">
          <p className="text-sm text-stone-400">Last updated: June 2025</p>
          <p>
            By using TileFlow UK (<strong>tileflowuk.com</strong>), you agree to these terms. If you do not agree, please do not use the site.
          </p>
          <h2>Content Accuracy</h2>
          <p>
            Tool prices, specifications, and availability change frequently. We do our best to keep content accurate but cannot guarantee that all information is current. Always verify current pricing on the retailer&apos;s own website before purchasing.
          </p>
          <h2>Affiliate Links</h2>
          <p>
            This site contains affiliate links. See our <a href="/disclosure">Affiliate Disclosure</a> for full details.
          </p>
          <h2>No Professional Advice</h2>
          <p>
            Content on this site is for informational purposes only. For complex or structural tiling work, always consult a qualified professional. TileFlow UK accepts no liability for loss or damage arising from reliance on information published here.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All content on this site — text, photos, and design — is owned by TileFlow UK unless stated otherwise. Do not reproduce content without written permission.
          </p>
          <h2>Changes</h2>
          <p>
            These terms may be updated at any time. Continued use of the site after changes constitutes acceptance of the updated terms.
          </p>
          <p>
            Contact: <a href="mailto:hello@tileflowuk.com">hello@tileflowuk.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
