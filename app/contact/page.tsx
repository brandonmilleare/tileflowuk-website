import type { Metadata } from 'next'
import Script from 'next/script'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — TileFlow UK',
  description: 'Get in touch with TileFlow UK — questions, corrections, partnership enquiries.',
  alternates: { canonical: 'https://tileflowuk.com/contact' },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact TileFlow UK',
  url: 'https://tileflowuk.com/contact',
  description: 'Contact page for TileFlow UK — direct email and message form.',
  mainEntity: {
    '@type': 'Organization',
    name: 'TileFlow UK',
    url: 'https://tileflowuk.com',
    email: 'hello@tileflowuk.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@tileflowuk.com',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--tf-fg)] mb-3">
            Get in Touch
          </h1>
          <p className="text-stone-500 text-lg">
            I read every message. Expect a reply within a few days.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContactForm />

        <div className="mt-10 pt-8 border-t border-stone-100">
          <h2 className="font-semibold text-[var(--tf-fg)] mb-3">Other Ways to Reach Me</h2>
          <p className="text-sm text-stone-500">
            Email:{' '}
            <a href="mailto:hello@tileflowuk.com" className="text-[var(--tf-primary)] hover:underline">
              hello@tileflowuk.com
            </a>
          </p>
          <p className="text-sm text-stone-500 mt-1">
            I don&apos;t accept sponsored posts or paid placements. All editorial decisions are independent.
          </p>
        </div>
      </div>
    </div>
  )
}
