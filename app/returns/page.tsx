import type { Metadata } from 'next'
import Link from 'next/link'
import { whatsappLink, ENQUIRY_EMAIL, PHONE_DISPLAY } from '@/data/tiles'

export const metadata: Metadata = {
  title: 'Returns & Refunds — Your Rights',
  description:
    'Returns, refunds, and your statutory rights when you buy tiles or place an order through TileFlow UK. UK Consumer Rights Act 2015 + Consumer Contracts Regulations 2013.',
  alternates: { canonical: 'https://tileflowuk.com/returns' },
  robots: { index: true, follow: true },
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-[var(--tf-fg)] mb-3">
          Returns & Refunds
        </h1>
        <p className="text-stone-500 mb-8 text-lg">
          Your rights when you order tiles from TileFlow UK, in plain English.
        </p>

        <div className="prose prose-stone max-w-none prose-headings:font-display">
          <div className="not-prose mb-8 p-5 rounded-xl bg-stone-50 border border-stone-200">
            <p className="font-semibold text-[var(--tf-fg)] mb-2">In short</p>
            <ul className="text-sm text-stone-700 space-y-1.5 ml-4 list-disc">
              <li>14 days to change your mind on most orders (statutory)</li>
              <li>30 days to reject faulty or mis-described tiles for a full refund</li>
              <li>Made-to-order or cut-to-size tiles are excluded from the change-of-mind window</li>
              <li>Damaged-in-transit? Photo it before unpacking fully and message me</li>
            </ul>
          </div>

          <h2>1. Your statutory rights (Consumer Rights Act 2015)</h2>
          <p>
            Under UK law, tiles you buy from TileFlow UK must be of satisfactory
            quality, fit for the purpose described, and as described in the
            product page. If they&apos;re not, you have a legal right to:
          </p>
          <ul>
            <li>
              <strong>Reject them within 30 days</strong> for a full refund
            </li>
            <li>
              Ask for a repair or replacement after 30 days but within 6 months
            </li>
            <li>
              A partial refund or final rejection if the repair/replacement
              fails
            </li>
          </ul>
          <p>
            These rights are statutory. They sit on top of anything written
            here and can&apos;t be reduced.
          </p>

          <h2>
            2. Change of mind — 14-day cooling-off (Consumer Contracts
            Regulations 2013)
          </h2>
          <p>
            For tiles bought online or by phone, you have <strong>14 days
            from the day you receive the goods</strong> to tell me you want to
            cancel. You then have a further 14 days to return them. You don&apos;t
            need a reason.
          </p>
          <p>
            <strong>To start a return:</strong> WhatsApp{' '}
            <a
              href={whatsappLink(undefined, 'general')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {PHONE_DISPLAY}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}?subject=Return%20request`}>
              {ENQUIRY_EMAIL}
            </a>{' '}
            with your order reference. I&apos;ll confirm the return address
            within 1 working day.
          </p>
          <h3>What I refund</h3>
          <ul>
            <li>The full cost of the tiles</li>
            <li>
              Standard outbound delivery cost (the cheapest standard option,
              even if you upgraded — that bit&apos;s not refundable per the
              regulations)
            </li>
          </ul>
          <h3>What you cover</h3>
          <ul>
            <li>The cost of returning the tiles to me safely</li>
            <li>
              Any reduction in value if you&apos;ve handled the tiles beyond
              what you would in a shop (e.g. used them, damaged the surface)
            </li>
          </ul>
          <p>
            Refunds are processed within 14 days of me receiving the tiles
            back, or proof you&apos;ve sent them, whichever comes first.
          </p>

          <h2>3. What&apos;s excluded from the 14-day cooling-off</h2>
          <p>
            UK regulations exclude these categories from the change-of-mind
            window. Statutory rights (faulty / mis-described) still apply
            either way.
          </p>
          <ul>
            <li>
              <strong>Made-to-order or cut-to-size tiles</strong> — anything
              produced or modified to your spec
            </li>
            <li>
              <strong>Tiles cut from a single batch on your request</strong> —
              once cut, they&apos;re bespoke
            </li>
            <li>
              <strong>Sealed cleaning or sealing chemicals</strong> once the
              seal is broken (hygiene)
            </li>
          </ul>
          <p>
            Sample tiles are NOT excluded — you can return samples within the
            14-day window like any other order.
          </p>

          <h2>4. Damaged in transit</h2>
          <p>
            Tiles travel on pallets and a small percentage of breakage is
            normal — that&apos;s why I always recommend ordering 10–15% extra
            for waste. But if more than 5% of your order arrives broken, or
            the pallet is visibly damaged on delivery:
          </p>
          <ol>
            <li>
              Sign for the delivery as <strong>&quot;DAMAGED&quot;</strong> on
              the courier&apos;s POD before they leave
            </li>
            <li>
              Take photos of the wrapped pallet AND the damaged tiles before
              unpacking the rest
            </li>
            <li>
              Message me within 48 hours of delivery — I&apos;ll arrange
              replacement or refund at no cost to you
            </li>
          </ol>

          <h2>5. Faulty or mis-described tiles</h2>
          <p>
            If a tile is genuinely faulty (not just a colour variation between
            batches, which is normal for natural-look porcelain) or doesn&apos;t
            match the description on the product page, your statutory rights
            kick in. Message me with photos and your order reference. I&apos;ll
            replace, refund, or repair as you prefer.
          </p>

          <h2>6. Affiliate purchases (Amazon and others)</h2>
          <p>
            When you click an Amazon link on TileFlow UK and buy from Amazon,
            you&apos;re buying from Amazon — not from me. Returns, refunds,
            and faulty-product complaints for those orders are handled by
            Amazon under their{' '}
            <a
              href="https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Amazon UK returns policy
            </a>
            . I can&apos;t process returns on Amazon&apos;s behalf, but if
            something goes wrong with a tool I&apos;ve recommended, do tell me
            so I can update the review.
          </p>

          <h2>7. Complaints + dispute resolution</h2>
          <p>
            Try me first — most things sort out in one message. WhatsApp{' '}
            {PHONE_DISPLAY} or email{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>.
          </p>
          <p>
            If we can&apos;t agree, you can refer the complaint to{' '}
            <a
              href="https://www.citizensadvice.org.uk/consumer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Citizens Advice consumer service
            </a>
            , or use the EU{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Online Dispute Resolution platform
            </a>
            . You also retain your right to take the matter to the small
            claims court.
          </p>

          <h2>8. Trader details</h2>
          <p>
            <strong>TileFlow UK</strong>
            <br />
            Trading as: TileFlow UK
            <br />
            Email:{' '}
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>
            <br />
            WhatsApp: {PHONE_DISPLAY}
            <br />
            UK-based sole trader. Postal address available on request.
          </p>

          <p className="text-sm text-stone-400 mt-10">
            Last updated: 8 May 2026. This page describes my returns process —
            it can&apos;t override your statutory rights, and nothing here is
            intended to. If anything looks off,{' '}
            <Link href="/contact">tell me</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
