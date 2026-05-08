export interface Tile {
  slug: string
  name: string
  shortName: string
  range: string
  style: string
  description: string
  longDescription: string
  features: string[]
  images: string[]
  featured?: boolean
  /** Display price including unit, e.g. "£29.99 per m²". */
  price: string
  /** Numeric price for schema.org Product availability/offers. */
  priceNumeric: number
  /** Tile size, e.g. "300×600mm" or "1200×600mm". */
  size: string
}

export const tiles: Tile[] = [
  {
    slug: 'wex-delphi',
    name: 'Wex Delphi',
    shortName: 'Delphi',
    range: 'Wex',
    style: 'Marble-effect porcelain',
    size: '300×600mm',
    price: '£29.99 per m²',
    priceNumeric: 29.99,
    description:
      'Premium marble-effect porcelain with soft veining and a polished finish — part of the Wex range at TileFlow UK.',
    longDescription:
      'The Wex Delphi range brings the feel of natural marble into a hard-wearing porcelain tile. Soft grey veining on a warm white background — ideal for bathrooms, kitchens, and open-plan living areas. 300×600mm format, £29.99 per m². In stock — email or WhatsApp Brandon to order.',
    features: [
      'Marble-effect porcelain',
      'Polished finish',
      '300×600mm format',
      'Suitable for walls and floors',
    ],
    images: ['/images/tiles/wex-delphi.jpg'],
    featured: true,
  },
  {
    slug: 'wex-linsey',
    name: 'Wex Linsey',
    shortName: 'Linsey',
    range: 'Wex',
    style: 'Contemporary stone-look porcelain',
    size: '1200×600mm',
    price: '£43.99 per m²',
    priceNumeric: 43.99,
    description:
      'Contemporary stone-look porcelain — warm neutral tones with a subtle textured surface, in large-format 1200×600mm.',
    longDescription:
      'Linsey is designed for modern UK homes — a stone-look porcelain in warm neutrals that suits kitchens, hallways, and bathrooms equally well. The subtle surface texture reads natural while staying easy to clean. Large-format 1200×600mm at £43.99 per m². In stock — email or WhatsApp Brandon to order.',
    features: [
      'Stone-look porcelain',
      'Warm neutral palette',
      '1200×600mm large format',
      'Wall and floor use',
    ],
    images: ['/images/tiles/wex-linsey.jpg', '/images/tiles/wex-linsey-2.jpg'],
    featured: true,
  },
  {
    slug: 'wex-quartz-jade',
    name: 'Wex Quartz Jade',
    shortName: 'Quartz Jade',
    range: 'Wex',
    style: 'Deep green quartz-effect porcelain',
    size: '1200×600mm',
    price: '£43.99 per m²',
    priceNumeric: 43.99,
    description:
      'Bold deep-green quartz-effect porcelain — a statement tile in large-format 1200×600mm.',
    longDescription:
      'Quartz Jade is the statement option in the Wex Quartz range — a rich green quartz-effect porcelain that works beautifully as a feature wall, a splashback, or a whole-room install in larger bathrooms. Large-format 1200×600mm at £43.99 per m². In stock — email or WhatsApp Brandon to order.',
    features: [
      'Quartz-effect porcelain',
      'Deep green colourway',
      '1200×600mm large format',
      'Low-maintenance surface',
    ],
    images: ['/images/tiles/wex-quartz-jade.jpg'],
    featured: true,
  },
  {
    slug: 'wex-quartz-onyx',
    name: 'Wex Quartz Onyx',
    shortName: 'Quartz Onyx',
    range: 'Wex',
    style: 'Onyx-effect porcelain',
    size: '300×600mm',
    price: '£29.99 per m²',
    priceNumeric: 29.99,
    description:
      'Dramatic onyx-effect porcelain with deep veining — a bold feature tile in 300×600mm.',
    longDescription:
      'Quartz Onyx delivers the look of polished onyx in a durable porcelain tile — deep, dramatic veining on a dark base. Used sparingly as a feature or across a full bathroom, it\'s a high-end finish without the upkeep of real stone. 300×600mm at £29.99 per m². In stock — email or WhatsApp Brandon to order.',
    features: [
      'Onyx-effect porcelain',
      'Dramatic deep veining',
      '300×600mm format',
      'Feature-wall ready',
    ],
    images: ['/images/tiles/wex-quartz-onyx.jpg'],
  },
  {
    slug: 'wex-stone',
    name: 'Wex Stone',
    shortName: 'Stone',
    range: 'Wex',
    style: 'Natural stone-look porcelain',
    size: '300×600mm',
    price: '£29.99 per m²',
    priceNumeric: 29.99,
    description:
      'Versatile natural stone-look porcelain — neutral tones that work across bathrooms, kitchens and living spaces.',
    longDescription:
      'Stone is the workhorse of the Wex range — a natural stone-look porcelain in neutral tones designed to sit alongside almost any palette. Great for through-floor continuity between kitchen and living room. 300×600mm at £29.99 per m². In stock — email or WhatsApp Brandon to order.',
    features: [
      'Stone-look porcelain',
      'Neutral palette',
      '300×600mm format',
      'Durable for high-traffic rooms',
    ],
    images: ['/images/tiles/wex-stone.jpg'],
  },
  {
    slug: 'wex-trevi',
    name: 'Wex Trevi',
    shortName: 'Trevi',
    range: 'Wex',
    style: 'Classic porcelain, updated',
    size: '300×600mm',
    price: '£29.99 per m²',
    priceNumeric: 29.99,
    description:
      'A classic tile pattern reimagined for modern UK homes — clean finish, contemporary colourways.',
    longDescription:
      'Trevi takes a classic tile silhouette and updates it with a cleaner finish and contemporary colourways. A go-to for period properties, bathrooms with character, and feature splashbacks. 300×600mm at £29.99 per m². In stock — email or WhatsApp Brandon to order.',
    features: [
      'Updated classic pattern',
      'Contemporary finish',
      '300×600mm format',
      'Feature-wall and splashback friendly',
    ],
    images: ['/images/tiles/wex-trevi.jpg'],
  },
  {
    slug: 'wex-flurry',
    name: 'Wex Flurry',
    shortName: 'Flurry',
    range: 'Wex',
    style: 'Soft terrazzo-effect porcelain',
    size: '1200×600mm',
    price: '£43.99 per m²',
    priceNumeric: 43.99,
    description:
      'Light, airy terrazzo-effect porcelain — a soft modern look in large-format 1200×600mm.',
    longDescription:
      'Flurry is a soft terrazzo-effect porcelain — speckled, light, and perfect for bright bathrooms, utility rooms, and kitchen floors. A refreshing change from the heavier marble looks without losing the premium feel. Large-format 1200×600mm at £43.99 per m². In stock — email or WhatsApp Brandon to order.',
    features: [
      'Terrazzo-effect porcelain',
      'Light, airy look',
      '1200×600mm large format',
      'Complements warm and cool palettes',
    ],
    images: ['/images/tiles/wex-flurry.jpg'],
  },
]

export function getTileBySlug(slug: string): Tile | undefined {
  return tiles.find(t => t.slug === slug)
}

export function getRelatedTiles(currentSlug: string, limit = 3): Tile[] {
  return tiles.filter(t => t.slug !== currentSlug).slice(0, limit)
}

export const ENQUIRY_EMAIL = 'tileflowuk@gmail.com'

/** Brandon's WhatsApp number in international format (no +, no spaces) for wa.me links. */
export const WHATSAPP_NUMBER = '447539472545'
/** Display version of the phone number. */
export const PHONE_DISPLAY = '+44 7539 472545'

export function enquiryMailto(tileName?: string): string {
  const subject = tileName
    ? `Order enquiry: ${tileName}`
    : 'Tile order enquiry — TileFlow UK'
  const body = tileName
    ? `Hi Brandon,\n\nI'd like to order the ${tileName} tile. Could you let me know availability and delivery options?\n\nThanks,\n`
    : `Hi Brandon,\n\nI'd like to order from your tile range. Could you tell me what's in stock and how to order?\n\nThanks,\n`
  return `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export type WhatsAppIntent = 'order' | 'sample' | 'delivery' | 'question' | 'general'

/**
 * Build a wa.me link with a pre-filled message. Pre-filled text removes
 * the friction of "what do I say" — Amazon can't do this. UK English.
 */
export function whatsappLink(tileName?: string, intent: WhatsAppIntent = 'order'): string {
  const tile = tileName ?? ''
  const messages: Record<WhatsAppIntent, string> = {
    order: tile
      ? `Hi Brandon, I'd like to order the ${tile} tile from TileFlow UK. What's the next step?`
      : `Hi Brandon, I'd like to order from your TileFlow UK tile range. What's available?`,
    sample: tile
      ? `Hi Brandon, can I get a sample of the ${tile} tile? I want to see it in my own light before I commit.`
      : `Hi Brandon, can I get a sample box of your tiles? I want to see them in my own light before I commit.`,
    delivery: tile
      ? `Hi Brandon, what's the delivery timing and cost for the ${tile} tile to my postcode?`
      : `Hi Brandon, what's your delivery timing and cost to my postcode?`,
    question: tile
      ? `Hi Brandon, I've got a question about the ${tile} tile from TileFlow UK.`
      : `Hi Brandon, I've got a question about your TileFlow UK tiles.`,
    general: `Hi Brandon, I came across TileFlow UK and wanted to ask about your tiles.`,
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[intent])}`
}
