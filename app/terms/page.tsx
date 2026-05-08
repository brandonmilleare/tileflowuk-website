import type { Metadata } from 'next'
import Link from 'next/link'
import { ENQUIRY_EMAIL, PHONE_DISPLAY } from '@/data/tiles'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'TileFlow UK terms of use — content, affiliate links, direct tile sales, dispute resolution. UK Consumer Rights Act 2015 compliant.',
  alternates: { canonical: 'https://tileflowuk.com/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-[var(--tf-fg)] mb-3">
          Terms of Use
        </h1>
        <p className="text-stone-500 mb-8 text-lg">
          The rules for using TileFlow UK and ordering tiles directly. Plain
          English. Nothing here cancels your statutory rights.
        </p>

        <div className="prose prose-stone max-w-none prose-headings:font-display">
          <p className="text-sm text-stone-400">
            Last updated: 8 May 2026 · Governing law: England &amp; Wales
          </p>

          <h2>1. Who you&apos;re dealing with</h2>
          <p>
            TileFlow UK (<strong>tileflowuk.com</strong>) is a UK sole trader
            run by Brandon. Contact:{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a> or
            WhatsApp {PHONE_DISPLAY}. By using the site you agree to these
            terms. If you don&apos;t agree, please don&apos;t use it.
          </p>

          <h2>2. Content accuracy</h2>
          <p>
            Tool prices, specs, and stock change frequently — Amazon prices
            can shift several times a day. I do my best to keep content
            accurate but can&apos;t guarantee everything is current. Always
            verify the live price on the retailer&apos;s site before
            committing.
          </p>
          <p>
            Tile prices on this site are inclusive of UK VAT at the prevailing
            rate (currently 20%). Delivery is quoted separately at order time.
          </p>

          <h2>3. Affiliate links</h2>
          <p>
            This site contains affiliate links — primarily Amazon UK. When
            you click and buy, I earn a small commission at no extra cost to
            you. Full detail:{' '}
            <Link href="/disclosure">Affiliate Disclosure</Link>.
          </p>
          <p>
            Editorial decisions are independent. I&apos;ve never accepted a
            payment to change a recommendation. I include the cons in every
            review even when I rate a tool highly.
          </p>

          <h2>4. No professional advice</h2>
          <p>
            Content on this site is for informational purposes. I&apos;m a
            tiler with 15 years on UK sites, so the advice reflects real-world
            practice — but every job is different. For complex,
            structural, or wet-room work, get site-specific advice from a
            qualified tiler or surveyor. TileFlow UK accepts no liability for
            loss or damage arising from reliance on information published
            here, except liability that can&apos;t be excluded under UK law
            (e.g. for death or personal injury caused by negligence).
          </p>

          <h2>5. Direct tile sales</h2>
          <p>
            Tiles ordered through TileFlow UK directly (not via Amazon
            affiliate links) are subject to:
          </p>
          <ul>
            <li>
              <strong>Consumer Rights Act 2015</strong> — tiles must be of
              satisfactory quality, fit for purpose, and as described
            </li>
            <li>
              <strong>Consumer Contracts Regulations 2013</strong> — 14-day
              cooling-off on most orders, with exclusions for made-to-order
              and cut-to-size goods
            </li>
            <li>
              See <Link href="/returns">Returns &amp; Refunds</Link> for the
              full process
            </li>
          </ul>

          <h2>6. Accuracy of tile colours</h2>
          <p>
            Screen colour reproduction varies. I always recommend ordering a
            sample before committing to a full pallet — natural-look porcelain
            in particular varies between batches. Slight batch-to-batch
            variation is normal and isn&apos;t a fault.
          </p>

          <h2>7. Pricing errors</h2>
          <p>
            If a tile is priced incorrectly on the site (rare, but happens),
            I&apos;m not obliged to honour the wrong price. If you&apos;ve
            already paid, I&apos;ll either refund in full or offer the
            corrected price for your decision before fulfilling.
          </p>

          <h2>8. Intellectual property</h2>
          <p>
            All content on this site — text, photos, design, code — is owned
            by TileFlow UK unless stated otherwise. You can quote short
            passages (with attribution + a link). You can&apos;t reproduce or
            republish whole posts without written permission.
          </p>

          <h2>9. User-submitted content</h2>
          <p>
            If you message me a photo or testimonial, you grant TileFlow UK a
            non-exclusive, royalty-free licence to use it for editorial
            purposes (e.g. featuring a customer install). You can withdraw
            consent at any time and I&apos;ll remove it.
          </p>

          <h2>10. Acceptable use</h2>
          <p>You won&apos;t use the site to:</p>
          <ul>
            <li>Scrape content for resale or republishing</li>
            <li>Probe, scan, or test the security of the infrastructure</li>
            <li>Spam the contact form or WhatsApp number</li>
            <li>Anything illegal under UK law</li>
          </ul>

          <h2>11. Third-party links</h2>
          <p>
            Outbound links to retailers, manufacturers, and trade bodies are
            for your convenience. I don&apos;t control those sites and
            can&apos;t be responsible for their content, accuracy, or
            availability.
          </p>

          <h2>12. Privacy + your data</h2>
          <p>
            See <Link href="/privacy">Privacy Policy</Link> and{' '}
            <Link href="/data-rights">Your Data Rights</Link> for what data I
            collect and how to exercise your rights under UK GDPR + DUAA.
          </p>

          <h2>13. Disputes + complaints</h2>
          <p>
            Try me first — most issues sort out in one message. WhatsApp{' '}
            {PHONE_DISPLAY} or email{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>.
          </p>
          <p>
            If we can&apos;t agree, you can refer the dispute to{' '}
            <a
              href="https://www.citizensadvice.org.uk/consumer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Citizens Advice consumer service
            </a>{' '}
            or use the EU{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Online Dispute Resolution platform
            </a>
            . You retain the right to take any matter to the small claims
            court. These terms are governed by English law and subject to the
            non-exclusive jurisdiction of the courts of England &amp; Wales.
          </p>

          <h2>14. Changes to these terms</h2>
          <p>
            These terms may be updated at any time. Material changes will be
            flagged on the page for 30 days. Continued use of the site after
            that constitutes acceptance.
          </p>

          <p>
            Contact:{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
