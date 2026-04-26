import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TileFlow UK privacy policy — how we collect and use your data.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-[var(--tf-fg)] mb-8">Privacy Policy</h1>
        <div className="prose prose-stone max-w-none prose-headings:font-display">
          <p className="text-sm text-stone-400">Last updated: April 2026</p>

          <h2>What Data We Collect</h2>
          <p>
            TileFlow UK collects minimal personal data. Specifically:
          </p>
          <ul>
            <li><strong>Newsletter sign-ups:</strong> Your email address, if you choose to subscribe.</li>
            <li><strong>Contact form submissions:</strong> Your name, email, and message.</li>
            <li><strong>Analytics:</strong> Anonymous usage data via Google Analytics 4 (page views, device type, approximate location). No personally identifiable data is sent to Google Analytics.</li>
            <li><strong>Affiliate cookies:</strong> Amazon and other retailers may set cookies when you click affiliate links. We do not control these cookies.</li>
          </ul>

          <h2>How We Use Your Data</h2>
          <ul>
            <li>Email newsletter: to send you updates you signed up for. You can unsubscribe at any time.</li>
            <li>Contact forms: to respond to your message. We do not share this with third parties.</li>
            <li>Analytics: to understand how visitors use the site and improve the content.</li>
          </ul>

          <h2>Your Rights (UK GDPR)</h2>
          <p>
            You have the right to access, correct, or request deletion of any personal data we hold about you. Email <a href="mailto:hello@tileflowuk.com">hello@tileflowuk.com</a> to exercise these rights.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            This site uses: Google Analytics 4, Amazon Associates, Pinterest API (v5). Each has its own privacy policy.
          </p>

          <h2>Pinterest API Integration</h2>
          <p>
            TileFlow UK uses the Pinterest API (v5) to manage our own Pinterest business account (@tileflowuk). Specifically:
          </p>
          <ul>
            <li>We create, edit, and schedule pins that link to content on this website.</li>
            <li>We read analytics for pins and boards we own.</li>
            <li>We do not collect personal data from Pinterest users.</li>
            <li>We do not share any data with third parties.</li>
            <li>
              We follow the <a href="https://policy.pinterest.com/en/developer-guidelines" target="_blank" rel="noopener noreferrer">Pinterest Developer Guidelines</a> and Pinterest&apos;s API terms of service.
            </li>
          </ul>
          <p>
            The access tokens that authorise this integration are held only by the business owner and are never shared.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href="mailto:hello@tileflowuk.com">hello@tileflowuk.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
