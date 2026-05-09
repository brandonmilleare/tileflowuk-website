import type { Metadata } from 'next'
import Link from 'next/link'
import { ENQUIRY_EMAIL, PHONE_DISPLAY } from '@/data/tiles'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How TileFlow UK collects, uses, and protects your data. UK GDPR + Data Use and Access Act 2025 compliant.',
  alternates: { canonical: 'https://tileflowuk.com/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-[var(--tf-fg)] mb-3">
          Privacy Policy
        </h1>
        <p className="text-stone-500 mb-8 text-lg">
          Plain English version of how TileFlow UK handles your data. Short
          answer: as little as possible, never sold, always your right to take
          it back.
        </p>

        <div className="prose prose-stone max-w-none prose-headings:font-display">
          <p className="text-sm text-stone-400">
            Last updated: 8 May 2026 — refreshed for the UK Data Use and Access
            Act 2025 (&quot;DUAA&quot;).
          </p>

          <div className="not-prose mb-6 p-5 rounded-xl bg-stone-50 border border-stone-200">
            <p className="font-semibold text-[var(--tf-fg)] mb-2">
              Quick summary
            </p>
            <ul className="text-sm text-stone-700 space-y-1.5 ml-4 list-disc">
              <li>I collect minimal data — only what&apos;s needed to reply or fulfil orders</li>
              <li>I never sell your data, ever</li>
              <li>Analytics are aggregated and anonymous</li>
              <li>Cookies only fire if you consent via the banner</li>
              <li>You can exercise your data rights at any time — see <Link href="/data-rights">/data-rights</Link></li>
            </ul>
          </div>

          <h2>1. Who I am</h2>
          <p>
            TileFlow UK is a UK sole trader run by Brandon. Contact:{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a> or
            WhatsApp {PHONE_DISPLAY}. I&apos;m the data controller for
            personal data collected through the site.
          </p>

          <h2>2. What data I collect, why, and on what lawful basis</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Why</th>
                <th>Lawful basis</th>
                <th>Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Contact form / WhatsApp / email</strong> — name,
                  email, message
                </td>
                <td>To reply to you</td>
                <td>Legitimate interest</td>
                <td>2 years from last contact</td>
              </tr>
              <tr>
                <td>
                  <strong>Order details</strong> — name, address, phone, order
                  contents
                </td>
                <td>To fulfil your tile order</td>
                <td>Contract + legal obligation (HMRC)</td>
                <td>6 years (HMRC tax retention)</td>
              </tr>
              <tr>
                <td>
                  <strong>Newsletter email</strong> (no live list yet)
                </td>
                <td>To send the updates you signed up for</td>
                <td>Consent (double opt-in)</td>
                <td>Until you unsubscribe</td>
              </tr>
              <tr>
                <td>
                  <strong>Analytics — Google Analytics 4</strong>: anonymised
                  page views, device type, country
                </td>
                <td>To understand how visitors use the site</td>
                <td>Consent (cookie banner)</td>
                <td>14 months</td>
              </tr>
              <tr>
                <td>
                  <strong>Behavioural — Microsoft Clarity</strong>: heatmaps,
                  anonymised session recordings (if active)
                </td>
                <td>
                  To find usability problems (e.g. why a button isn&apos;t
                  being clicked)
                </td>
                <td>Consent (cookie banner)</td>
                <td>12 months</td>
              </tr>
              <tr>
                <td>
                  <strong>Affiliate-click attribution</strong>: aggregated
                  click counts per product, no individual IDs
                </td>
                <td>To know which recommendations actually help readers</td>
                <td>Legitimate interest</td>
                <td>Aggregated only — never identifiable</td>
              </tr>
            </tbody>
          </table>

          <h2>3. Cookies + tracking</h2>
          <p>
            No tracking cookies are dropped until you accept them via the
            cookie banner. Strictly necessary cookies (e.g. remembering your
            cookie choice) work without consent — they have to, otherwise the
            banner would re-appear every page.
          </p>
          <ul>
            <li>
              <strong>Necessary</strong>: cookie-consent state, theme
              preference. Always on.
            </li>
            <li>
              <strong>Analytics</strong>: Google Analytics 4 (`_ga*`) and
              Microsoft Clarity (`_clck`, `_clsk`). On only if you accept.
            </li>
            <li>
              <strong>Marketing</strong>: none. TileFlow UK doesn&apos;t run
              ads.
            </li>
          </ul>
          <p>
            You can change your choice any time from the small &quot;Cookie
            preferences&quot; link in the footer.
          </p>

          <h2>4. Affiliate links</h2>
          <p>
            When you click an Amazon link on TileFlow UK, Amazon may set a
            cookie in your browser to track that you came from this site. I
            don&apos;t control those cookies — they&apos;re set by the
            destination, not by me. See{' '}
            <a
              href="https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Amazon&apos;s privacy notice
            </a>{' '}
            for what they do with that.
          </p>
          <p>
            See also: <Link href="/disclosure">Affiliate Disclosure</Link>{' '}
            (how I earn money) and <Link href="/data-rights">Your Data
            Rights</Link>.
          </p>

          <h2>5. Who I share data with</h2>
          <p>
            I never sell personal data. I share with these processors only
            for the operational reason listed:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> (hosting) — operates the website
              infrastructure. US-based, UK-EU Data Privacy Framework certified.
            </li>
            <li>
              <strong>Google</strong> (Analytics 4, Indexing API, Search
              Console, Ads-free Workspace email) — analytics + search. Same
              framework.
            </li>
            <li>
              <strong>Microsoft</strong> (Clarity heatmaps if active) — same
              framework.
            </li>
            <li>
              <strong>Pinterest / Meta / TikTok</strong> — relevant only when
              you click outbound to those platforms. Their cookies, their
              policies.
            </li>
            <li>
              <strong>HMRC + tax authorities</strong> — for tax records on
              direct tile sales. Statutory.
            </li>
          </ul>
          <p>
            I review processor list at least annually. I&apos;ll update this
            page if it changes.
          </p>

          <h2>6. International transfers</h2>
          <p>
            Some processors above are US-based. UK personal data sent to them
            is covered by the UK Extension to the EU-US Data Privacy
            Framework, plus standard contractual clauses where required.
          </p>

          <h2>7. Security</h2>
          <p>
            The site is HTTPS-only with HSTS preload. I use secure providers
            for hosting, email, and analytics. I keep access tokens in a
            password manager and rotate them when they leak (it&apos;s
            happened — disclosed and resolved within hours each time).
          </p>

          <h2>8. Your rights</h2>
          <p>
            Under UK GDPR and the DUAA you have the right to access, correct,
            delete, restrict, object, and port your data. Full guide and
            request route: <Link href="/data-rights">/data-rights</Link>.
          </p>
          <p>
            If you&apos;re unhappy with how your data&apos;s been handled, you
            can complain to the{' '}
            <a
              href="https://ico.org.uk/make-a-complaint/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UK Information Commissioner&apos;s Office
            </a>{' '}
            on 0303 123 1113.
          </p>

          <h2>9. Children</h2>
          <p>
            TileFlow UK is not aimed at children under 13. I don&apos;t
            knowingly collect data from anyone under 13. If you think
            I&apos;ve done so by accident, tell me and I&apos;ll delete it.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            I update this page when something changes. Material changes will
            be flagged at the top of the page for at least 30 days. The
            &quot;last updated&quot; date is at the top.
          </p>

          <h2>Contact</h2>
          <p>
            Questions:{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>.
            Data-rights requests: see{' '}
            <Link href="/data-rights">/data-rights</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
