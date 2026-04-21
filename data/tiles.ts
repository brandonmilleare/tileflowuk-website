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
}

export const tiles: Tile[] = [
  {
    slug: 'wex-delphi',
    name: 'Wex Delphi',
    shortName: 'Delphi',
    range: 'Wex',
    style: 'Marble-effect porcelain',
    description:
      'Part of the upcoming Wex Delphi range at TileFlow UK — a premium marble-effect porcelain with soft veining and a polished finish.',
    longDescription:
      'The Wex Delphi range brings the feel of natural marble into a hard-wearing porcelain tile. Expect soft grey veining on a warm white background, ideal for bathrooms, kitchens, and open-plan living areas. Full specification, size options and UK pricing will be announced shortly — register your interest below and be first to hear when Delphi goes live.',
    features: [
      'Marble-effect porcelain',
      'Polished finish',
      'Suitable for walls and floors',
      'Large-format options',
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
    description:
      'The Wex Linsey range is a contemporary stone-look porcelain — warm neutral tones with a subtle textured surface, landing soon at TileFlow UK.',
    longDescription:
      'Linsey is designed for modern UK homes — a stone-look porcelain in warm neutrals that suits kitchens, hallways, and bathrooms equally well. The subtle surface texture reads natural while staying easy to clean. We\'re finalising sizes, trims, and pricing now. Leave your email below to be first in line when Linsey is released.',
    features: [
      'Stone-look porcelain',
      'Warm neutral palette',
      'Subtle surface texture',
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
    description:
      'Wex Quartz Jade is a bold, deep-green quartz-effect porcelain — a statement tile coming soon to TileFlow UK.',
    longDescription:
      'Quartz Jade is the statement option in the Wex Quartz range — a rich green quartz-effect porcelain that works beautifully as a feature wall, a splashback, or a whole-room install in larger bathrooms. Full sizes, trims and UK pricing are being finalised now — register early access below.',
    features: [
      'Quartz-effect porcelain',
      'Deep green colourway',
      'Feature-tile finish',
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
    description:
      'Wex Quartz Onyx is a dramatic onyx-effect porcelain with deep veining — a bold bathroom and kitchen tile arriving soon.',
    longDescription:
      'Quartz Onyx delivers the look of polished onyx in a durable porcelain tile — deep, dramatic veining on a dark base. Used sparingly as a feature or across a full bathroom, it\'s a high-end finish without the upkeep of real stone. Sizes and UK pricing announced soon — register below for first access.',
    features: [
      'Onyx-effect porcelain',
      'Dramatic deep veining',
      'Polished finish',
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
    description:
      'The Wex Stone range is a versatile natural stone-look porcelain — neutral tones that work across bathrooms, kitchens and living spaces.',
    longDescription:
      'Stone is the workhorse of the Wex range — a natural stone-look porcelain in neutral tones designed to sit alongside almost any palette. Great for through-floor continuity between kitchen and living room. Sizes, finishes and UK pricing will be confirmed shortly — early-access list open below.',
    features: [
      'Stone-look porcelain',
      'Neutral palette',
      'Through-floor friendly',
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
    description:
      'The new Wex Trevi collection reimagines a classic tile pattern for modern UK homes — arriving soon at TileFlow UK.',
    longDescription:
      'Trevi takes a classic tile silhouette and updates it with a cleaner finish and contemporary colourways. A go-to for period properties, bathrooms with character, and feature splashbacks. Full spec, pricing and availability coming soon — register interest below.',
    features: [
      'Updated classic pattern',
      'Contemporary finish',
      'Feature-wall and splashback friendly',
      'Multiple colourways',
    ],
    images: ['/images/tiles/wex-trevi.jpg'],
  },
  {
    slug: 'wex-flurry',
    name: 'Wex Flurry',
    shortName: 'Flurry',
    range: 'Wex',
    style: 'Soft terrazzo-effect porcelain',
    description:
      'Wex Flurry is a light, airy terrazzo-effect porcelain — a soft modern look coming soon to TileFlow UK.',
    longDescription:
      'Flurry is a soft terrazzo-effect porcelain — speckled, light, and perfect for bright bathrooms, utility rooms, and kitchen floors. A refreshing change from the heavier marble looks without losing the premium feel. Full details and UK pricing imminent — leave your email below for first access.',
    features: [
      'Terrazzo-effect porcelain',
      'Light, airy look',
      'Great for bathrooms and utilities',
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

export function enquiryMailto(tileName?: string): string {
  const subject = tileName
    ? `Early access enquiry: ${tileName}`
    : 'Early access enquiry — TileFlow tiles'
  const body = tileName
    ? `Hi,\n\nI'd like early access details for the ${tileName} tile.\n\nThanks,\n`
    : `Hi,\n\nI'd like early access details for your upcoming tile ranges.\n\nThanks,\n`
  return `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
