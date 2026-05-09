import type { Metadata } from 'next'
import Link from 'next/link'
import { ENQUIRY_EMAIL, PHONE_DISPLAY } from '@/data/tiles'

export const metadata: Metadata = {
  title: 'Your Data Rights — UK GDPR + DUAA',
  description:
    'How to exercise your data rights at TileFlow UK — access, correction, deletion, complaints. UK GDPR + Data Use and Access Act 2025.',
  alternates: { canonical: 'https://tileflowuk.com/data-rights' },
  robots: { index: true, follow: true },
}

export default function DataRightsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-[var(--tf-fg)] mb-3">
          Your Data Rights
        </h1>
        <p className="text-stone-500 mb-8 text-lg">
          What rights you have over the personal data TileFlow UK holds, and
          how to use them.
        </p>

        <div className="prose prose-stone max-w-none prose-headings:font-display">
          <div className="not-prose mb-8 p-5 rounded-xl bg-stone-50 border border-stone-200">
            <p className="font-semibold text-[var(--tf-fg)] mb-2">
              Quickest path
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              Email{' '}
              <a
                href={`mailto:${ENQUIRY_EMAIL}?subject=Data%20rights%20request`}
                className="underline"
              >
                {ENQUIRY_EMAIL}
              </a>{' '}
              with the subject line <strong>&quot;Data rights
              request&quot;</strong> and which right you want to exercise. I
              respond within 1 working day, formal action within 30 days
              (statutory limit).
            </p>
          </div>

          <h2>The rights you have</h2>
          <p>
            Under the UK GDPR (as updated by the Data Use and Access Act 2025
            — &quot;DUAA&quot;), you have the following rights over personal
            data TileFlow UK holds about you:
          </p>
          <ul>
            <li>
              <strong>Right to be informed</strong> — what data is held, why,
              and what happens to it. Most of this lives in the{' '}
              <Link href="/privacy">Privacy Policy</Link>; if anything is
              unclear, ask.
            </li>
            <li>
              <strong>Right of access (Subject Access Request)</strong> — you
              can ask for a copy of all personal data I hold on you. Free of
              charge, delivered within 30 days.
            </li>
            <li>
              <strong>Right to rectification</strong> — correct anything
              inaccurate.
            </li>
            <li>
              <strong>Right to erasure</strong> (&quot;right to be
              forgotten&quot;) — request deletion of your data. Subject to
              statutory retention obligations (e.g. order records for tax).
            </li>
            <li>
              <strong>Right to restrict processing</strong> — ask me to stop
              using your data while you contest its accuracy or its use.
            </li>
            <li>
              <strong>Right to data portability</strong> — receive your data
              in a structured, machine-readable format and move it to another
              provider.
            </li>
            <li>
              <strong>Right to object</strong> — object to processing based on
              legitimate interest, especially for direct marketing.
            </li>
            <li>
              <strong>Rights in automated decision-making</strong> — TileFlow
              UK doesn&apos;t make decisions about you based purely on
              automated processing. If that ever changed, you&apos;d be told.
            </li>
          </ul>

          <h2>How to exercise a right</h2>
          <p>
            <strong>Email</strong>{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}?subject=Data%20rights%20request`}>
              {ENQUIRY_EMAIL}
            </a>{' '}
            with:
          </p>
          <ul>
            <li>The subject &quot;Data rights request&quot;</li>
            <li>Which right you want to exercise</li>
            <li>
              Enough information for me to identify the data (name, email used
              when you contacted, order number if applicable)
            </li>
          </ul>
          <p>
            I may need to verify your identity before releasing data — usually
            a confirmation reply from the email address that holds the data is
            enough.
          </p>
          <p>
            <strong>Statutory response time:</strong> 30 calendar days. I aim
            to acknowledge within 1 working day. If a request is complex I
            may extend by up to 60 more days, and I&apos;ll tell you why.
          </p>
          <p>
            <strong>Cost:</strong> free for normal requests. The DUAA allows a
            reasonable admin fee for &quot;manifestly excessive&quot; or
            repeated requests — I&apos;ve never charged one and don&apos;t
            plan to.
          </p>

          <h2>What data I hold on you</h2>
          <p>
            For most visitors: <strong>none</strong>. Browsing the site
            anonymously generates only aggregated analytics that can&apos;t
            identify you personally.
          </p>
          <p>If you&apos;ve interacted, I may hold:</p>
          <ul>
            <li>
              Email address, name, message content (if you used the contact
              form, WhatsApp, or email)
            </li>
            <li>Order details (if you bought tiles from me directly)</li>
            <li>
              Newsletter subscription email (currently no list active —
              re-stated when one is)
            </li>
            <li>
              Aggregated analytics (Google Analytics 4 + Microsoft Clarity)
              that uses cookies you&apos;ve consented to
            </li>
          </ul>

          <h2>Lawful basis for processing</h2>
          <table>
            <thead>
              <tr>
                <th>What</th>
                <th>Basis</th>
                <th>Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Contact-form / WhatsApp / email exchanges</td>
                <td>Legitimate interest (replying to you)</td>
                <td>2 years from last contact</td>
              </tr>
              <tr>
                <td>Order records (direct tile sales)</td>
                <td>Contract + legal obligation (HMRC)</td>
                <td>6 years (HMRC tax retention)</td>
              </tr>
              <tr>
                <td>Newsletter subscription</td>
                <td>Consent (double opt-in)</td>
                <td>Until you unsubscribe</td>
              </tr>
              <tr>
                <td>Analytics (GA4 + Clarity)</td>
                <td>Consent (cookie banner)</td>
                <td>14 months (GA4 default), 12 months (Clarity default)</td>
              </tr>
              <tr>
                <td>Affiliate-click tracking</td>
                <td>Legitimate interest (commission attribution)</td>
                <td>Aggregated only — no individual identification</td>
              </tr>
            </tbody>
          </table>

          <h2>International transfers</h2>
          <p>
            Some processors are based outside the UK:
          </p>
          <ul>
            <li>
              <strong>Google Analytics 4 / Google Indexing API</strong> —
              Google LLC (US). Operates under the UK Extension to the EU-US
              Data Privacy Framework.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — Microsoft Corp (US). Same
              framework.
            </li>
            <li>
              <strong>Vercel</strong> (hosting) — Vercel Inc (US). Same
              framework.
            </li>
            <li>
              <strong>Pinterest, Instagram, TikTok, YouTube</strong> — only
              relevant when you click out to those platforms; transfers
              governed by their own policies.
            </li>
          </ul>

          <h2>How to complain to the ICO</h2>
          <p>
            If you&apos;re not happy with how I&apos;ve handled your data or
            your rights request, you can complain to the UK&apos;s Information
            Commissioner&apos;s Office:
          </p>
          <ul>
            <li>
              <strong>Website:</strong>{' '}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ico.org.uk/make-a-complaint
              </a>
            </li>
            <li>
              <strong>Phone:</strong> 0303 123 1113
            </li>
            <li>
              <strong>Post:</strong> Information Commissioner&apos;s Office,
              Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF
            </li>
          </ul>
          <p>
            You don&apos;t need to come to me first, but it&apos;s usually
            quicker if you do.
          </p>

          <h2>Data controller details</h2>
          <p>
            <strong>TileFlow UK</strong> — a UK sole trader (Brandon).
            <br />
            Email: <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>
            <br />
            WhatsApp: {PHONE_DISPLAY}
            <br />
            UK ICO Registration: not required for sole traders processing
            personal data only for editorial / customer-correspondence
            purposes (ICO fee exemption confirmed 2026). Status reviewed
            annually.
          </p>

          <p className="text-sm text-stone-400 mt-10">
            Last updated: 8 May 2026. This page describes my data-rights
            process — it can&apos;t reduce your statutory rights and
            isn&apos;t intended to. The UK GDPR + DUAA give you the rights
            above as a matter of law.
          </p>
        </div>
      </div>
    </div>
  )
}
