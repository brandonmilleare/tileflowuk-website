/**
 * Deluxe Flooring — preview/pitch data.
 *
 * This is a MOCK-UP page Brandon is sending to the Deluxe Flooring owner as a
 * "here's how I'd sell your products" pitch. It is NOT a live product page.
 *
 * - Affiliate link: /ref/3/ is Brandon's Deluxe Flooring referrer ID
 * - Prices taken directly from deluxe-flooring.co.uk (captured 2026-04-21)
 * - Images downloaded from their CDN and served locally from /public
 * - The page is noindex and NOT listed in nav/footer/sitemap
 */

export const DELUXE_BASE_URL = 'https://deluxe-flooring.co.uk'
export const DELUXE_AFFILIATE_PATH = '/ref/3/'
export const DELUXE_AFFILIATE_URL = `${DELUXE_BASE_URL}${DELUXE_AFFILIATE_PATH}`

export type DeluxeCategory =
  | 'Herringbone'
  | 'Engineered Wood'
  | 'Laminate'
  | 'LVT'

export interface DeluxeProduct {
  slug: string
  name: string
  category: DeluxeCategory
  price: string
  priceNumeric: number
  priceUnit: string
  description: string
  image: string
  productUrl: string
  features: string[]
  featured?: boolean
}

/** Deep-link to a specific product on Deluxe Flooring using Brandon's /ref/3/ affiliate ID. */
export function deluxeProductLink(product: DeluxeProduct): string {
  return `${product.productUrl}?ref=3`
}

export const deluxeProducts: DeluxeProduct[] = [
  {
    slug: 'castlehoward-herringbone-engineered-oak-15-4mm',
    name: 'Castlehoward Herringbone Engineered Oak 15/4mm',
    category: 'Herringbone',
    price: '£43.99 per m²',
    priceNumeric: 43.99,
    priceUnit: 'per m²',
    description:
      'Engineered oak herringbone with a natural brushed, UV-oiled finish and bevelled edges for a timeless, rustic look.',
    image: '/images/deluxe-flooring/castlehoward.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/castlehoward-herringbone-engineered-oak-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      'Natural brushed, UV-oiled finish',
      '600mm blocks, bevelled edges',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
    featured: true,
  },
  {
    slug: 'burghley-engineered-oak-14-3mm',
    name: 'Burghley Engineered Oak 14/3mm',
    category: 'Engineered Wood',
    price: '£39.99 per m²',
    priceNumeric: 39.99,
    priceUnit: 'per m²',
    description:
      'Straight-plank engineered oak with a natural brushed UV-oiled finish, adding warmth and character to any room.',
    image: '/images/deluxe-flooring/burghley.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/burghley-engineered-oak-natural-brushed-uv-oiled14-3/',
    features: [
      '14mm thick · 3mm real oak wear layer',
      '1900mm long planks, bevelled edges',
      'Tongue & groove fit',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'prestige-herringbone-laminate-natural-oak-12mm',
    name: 'Prestige Herringbone Laminate Natural Oak 12mm',
    category: 'Herringbone',
    price: '£23.99 per m²',
    priceNumeric: 23.99,
    priceUnit: 'per m²',
    description:
      'Herringbone-pattern laminate with a textured natural oak veneer — classic style and DIY-friendly durability.',
    image: '/images/deluxe-flooring/prestige-herringbone-natural.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/prestige-herringbone-laminate-natural-oak-12mm/',
    features: [
      '12mm HDF core',
      'AC4 — heavy residential wear',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'heritage-laminate-light-oak-12mm',
    name: 'Heritage Deluxe Laminate Light Oak 12mm',
    category: 'Laminate',
    price: '£20.99 per m²',
    priceNumeric: 20.99,
    priceUnit: 'per m²',
    description:
      'Premium 12mm laminate in light oak with a realistic textured veneer that brings an airy, natural feel to any space.',
    image: '/images/deluxe-flooring/heritage-light-oak.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/heritage-laminate-light-oak-12mm/',
    features: [
      '12mm HDF core',
      'AC5 — commercial wear rating',
      '1195mm plank length',
      'Click installation',
      '25-year guarantee',
    ],
  },
  {
    slug: 'hampshire-lvt-brown-oak-6-5mm',
    name: 'Hampshire LVT Brown Oak 6.5mm',
    category: 'LVT',
    price: '£26.99 per m²',
    priceNumeric: 26.99,
    priceUnit: 'per m²',
    description:
      'SPC-core luxury vinyl tile in warm brown oak — waterproof, hard-wearing and suitable for any room in the home.',
    image: '/images/deluxe-flooring/hampshire-brown-oak.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/hampshire-lvt-brown-oak-6-5mm/',
    features: [
      '6.5mm thick · 0.5mm wear layer',
      'Rigid SPC core, 100% waterproof',
      '1220mm plank length',
      'Click installation',
      '25-year guarantee',
    ],
    featured: true,
  },
  {
    slug: 'devon-lvt-herringbone-grey-honey-oak-5mm',
    name: 'Devon LVT Herringbone Grey Honey Oak 5mm',
    category: 'Herringbone',
    price: '£24.99 per m²',
    priceNumeric: 24.99,
    priceUnit: 'per m²',
    description:
      'Luxury vinyl tile in a herringbone pattern with soft grey-honey oak tones — waterproof and DIY-friendly.',
    image: '/images/deluxe-flooring/devon-grey-honey.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/devon-lvt-herringbone-grey-honey-oak-5mm/',
    features: [
      '5mm thick · 0.5mm wear layer',
      'SPC core, waterproof',
      '615mm blocks',
      'Click installation',
      '25-year guarantee',
    ],
  },
  {
    slug: 'arundel-herringbone-engineered-oak-15-4mm',
    name: 'Arundel Herringbone Engineered Oak 15/4mm',
    category: 'Herringbone',
    price: '£45.99 per m²',
    priceNumeric: 45.99,
    priceUnit: 'per m²',
    description:
      'Smooth UV-oiled engineered oak in a classic herringbone pattern with bevelled edges for a refined finish.',
    image: '/images/deluxe-flooring/arundel.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/arundel-herringbone-engineered-oak-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      '125 × 600mm blocks',
      'Smooth UV-oiled finish',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'blenheim-herringbone-engineered-oak-10-3mm',
    name: 'Blenheim Herringbone Engineered Oak 10/3mm',
    category: 'Herringbone',
    price: '£32.99 per m²',
    priceNumeric: 32.99,
    priceUnit: 'per m²',
    description:
      'Entry-level engineered oak herringbone with a golden brushed finish — luxurious look at a more accessible price point.',
    image: '/images/deluxe-flooring/blenheim.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/blenheim-herringbone-engineered-oak-10-3mm/',
    features: [
      '10mm thick · 3mm real oak wear layer',
      '300mm block length',
      'Natural brushed & UV-oiled finish',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'chatsworth-herringbone-engineered-oak-10-3mm',
    name: 'Chatsworth Herringbone Engineered Oak 10/3mm',
    category: 'Herringbone',
    price: '£32.99 per m²',
    priceNumeric: 32.99,
    priceUnit: 'per m²',
    description:
      'Engineered oak herringbone with a natural brushed UV-oiled finish — heritage style built for everyday use.',
    image: '/images/deluxe-flooring/chatsworth.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/chatsworth-engineered-oak-natural-brushed-uv-oiled-10-3mm/',
    features: [
      '10mm thick · 3mm real oak wear layer',
      '300mm block length',
      'Bevelled edges',
      'Tongue & groove fit',
      '25-year guarantee',
    ],
  },
  {
    slug: 'holkham-herringbone-engineered-oak-20-6mm',
    name: 'Holkham Herringbone Engineered Oak 20/6mm',
    category: 'Herringbone',
    price: '£49.99 per m²',
    priceNumeric: 49.99,
    priceUnit: 'per m²',
    description:
      'Premium 20mm engineered oak herringbone with a thick 6mm real oak wear layer that can be sanded back multiple times.',
    image: '/images/deluxe-flooring/holkham.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/holkham-herringbone-engineered-oak-20-6mm/',
    features: [
      '20mm thick · 6mm real oak wear layer',
      '350mm blocks',
      'Smooth UV-oiled finish',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
    featured: true,
  },
  {
    slug: 'cotswold-engineered-oak-click-15-4mm',
    name: 'Cotswold Engineered Oak Click 15/4mm',
    category: 'Engineered Wood',
    price: '£43.99 per m²',
    priceNumeric: 43.99,
    priceUnit: 'per m²',
    description:
      'Mid-tone engineered oak plank with a natural brushed UV-oiled finish and DIY-friendly click system.',
    image: '/images/deluxe-flooring/cotswold.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/cotswold-engineered-oak-click-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      'Click installation',
      'Bevelled edges',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'bibury-engineered-oak-click-15-4mm',
    name: 'Bibury Engineered Oak Click 15/4mm',
    category: 'Engineered Wood',
    price: '£44.99 per m²',
    priceNumeric: 44.99,
    priceUnit: 'per m²',
    description:
      'Smooth UV-lacquered engineered oak plank with a polished, low-maintenance finish and quick click installation.',
    image: '/images/deluxe-flooring/bibury.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/bibury-engineered-oak-click-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      'Smooth UV-lacquered finish',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'burford-engineered-oak-click-15-4mm',
    name: 'Burford Engineered Oak Click 15/4mm',
    category: 'Engineered Wood',
    price: '£44.49 per m²',
    priceNumeric: 44.49,
    priceUnit: 'per m²',
    description:
      'Light engineered oak plank with a natural brushed, UV-oiled finish — bright and contemporary.',
    image: '/images/deluxe-flooring/burford.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/burford-engineered-oak-click-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      'Bevelled edges',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'winchcombe-engineered-oak-click-15-4mm',
    name: 'Winchcombe Engineered Oak Click 15/4mm',
    category: 'Engineered Wood',
    price: '£43.99 per m²',
    priceNumeric: 43.99,
    priceUnit: 'per m²',
    description:
      'Deeper-toned engineered oak plank with brushed UV-oiled finish — warm, walnut-inspired tones.',
    image: '/images/deluxe-flooring/winchcombe.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/winchcombe-engineered-oak-click-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      'Natural brushed & UV-oiled finish',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'althorp-herringbone-engineered-oak',
    name: 'Althorp Herringbone Engineered Oak 20/5mm',
    category: 'Herringbone',
    price: '£46.99 per m²',
    priceNumeric: 46.99,
    priceUnit: 'per m²',
    description:
      'Smoked oak herringbone with a brushed, UV-oiled finish — rich character for statement living rooms.',
    image: '/images/deluxe-flooring/althorp.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/althorp-herringbone-engineered-oak/',
    features: [
      '20mm thick · 5mm real oak wear layer',
      'Smoked oak, brushed & UV-oiled',
      'Bevelled edges',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'ambleside-herringbone-engineered-oak-click-14-3mm',
    name: 'Ambleside Herringbone Engineered Oak Click 14/3mm',
    category: 'Herringbone',
    price: '£45.99 per m²',
    priceNumeric: 45.99,
    priceUnit: 'per m²',
    description:
      'Click-system engineered oak herringbone with a smooth UV-lacquered finish for polished, contemporary interiors.',
    image: '/images/deluxe-flooring/ambleside.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/ambleside-herringbone-engineered-oak-click-14-3mm/',
    features: [
      '14mm thick · 3mm real oak wear layer',
      'Smooth UV-lacquered finish',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'berkeley-herringbone-engineered-oak-15-4mm',
    name: 'Berkeley Herringbone Engineered Oak 15/4mm',
    category: 'Herringbone',
    price: '£47.99 per m²',
    priceNumeric: 47.99,
    priceUnit: 'per m²',
    description:
      'Select-grade engineered oak herringbone with a brushed UV-lacquered finish — gentle sheen and long-lasting protection.',
    image: '/images/deluxe-flooring/berkeley.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/berkeley-herringbone-engineered-oak-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      'Brushed & UV-lacquered',
      'Bevelled edges',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'hardwick-herringbone-engineered-oak-15-4mm',
    name: 'Hardwick Herringbone Engineered Oak 15/4mm',
    category: 'Herringbone',
    price: '£43.99 per m²',
    priceNumeric: 43.99,
    priceUnit: 'per m²',
    description:
      'Engineered oak herringbone in a golden brushed, UV-oiled finish — warm, rustic, and ready for heavy use.',
    image: '/images/deluxe-flooring/hardwick.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/hardwick-herringbone-engineered-oak-15-4mm/',
    features: [
      '15mm thick · 4mm real oak wear layer',
      'Golden brushed & UV-oiled finish',
      'Bevelled edges',
      'Tongue & groove fit',
      '25-year guarantee',
    ],
  },
  {
    slug: 'dorset-herringbone-laminate-light-oak-8mm',
    name: 'Dorset Herringbone Laminate Light Oak 8mm',
    category: 'Herringbone',
    price: '£19.99 per m²',
    priceNumeric: 19.99,
    priceUnit: 'per m²',
    description:
      'Budget-friendly herringbone laminate in warm light oak — the look of real wood with easy-clean practicality.',
    image: '/images/deluxe-flooring/dorset-light-oak.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/dorset-herringbone-laminate-light-oak-8mm/',
    features: [
      '8mm HDF core',
      'AC4 — heavy residential wear',
      'Textured oak veneer',
      'Click installation',
      '25-year guarantee',
    ],
  },
  {
    slug: 'dorset-herringbone-laminate-white-washed-oak-8mm',
    name: 'Dorset Herringbone Laminate White Washed Oak 8mm',
    category: 'Herringbone',
    price: '£19.99 per m²',
    priceNumeric: 19.99,
    priceUnit: 'per m²',
    description:
      'Soft white-washed laminate herringbone — bright, airy and perfect for Scandi-style rooms on a budget.',
    image: '/images/deluxe-flooring/dorset-white-washed.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/dorset-herringbone-laminate-white-washed-oak-8mm/',
    features: [
      '8mm HDF core',
      'AC4 — heavy residential wear',
      'Textured veneer, bevelled edges',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'madrid-chevron-laminate-grey-oak-8mm',
    name: 'Madrid Chevron Laminate Grey Oak 8mm',
    category: 'Laminate',
    price: '£19.99 per m²',
    priceNumeric: 19.99,
    priceUnit: 'per m²',
    description:
      'Contemporary chevron-pattern laminate in a cool grey oak — sleek and on-trend without the real wood price.',
    image: '/images/deluxe-flooring/madrid-grey.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/madrid-chevron-laminate-grey-oak-8mm/',
    features: [
      '8mm HDF core',
      'AC4 — heavy residential wear',
      'Chevron pattern, bevelled edges',
      'Click installation',
      '25-year guarantee',
    ],
  },
  {
    slug: 'madrid-chevron-laminate-light-oak-8mm',
    name: 'Madrid Chevron Laminate Light Oak 8mm',
    category: 'Laminate',
    price: '£19.99 per m²',
    priceNumeric: 19.99,
    priceUnit: 'per m²',
    description:
      'Warm light-oak chevron laminate — classic pattern that works in both traditional and modern spaces.',
    image: '/images/deluxe-flooring/madrid-light.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/madrid-chevron-laminate-light-oak-8mm/',
    features: [
      '8mm HDF core',
      'AC4 — heavy residential wear',
      'Textured chevron veneer',
      'Click installation',
      '25-year guarantee',
    ],
  },
  {
    slug: 'valencia-tile-laminate-white-stone-10mm',
    name: 'Valencia Tile Laminate White Stone 10mm',
    category: 'Laminate',
    price: '£25.99 per m²',
    priceNumeric: 25.99,
    priceUnit: 'per m²',
    description:
      'Stone-effect laminate tile in clean white — brings the look of natural stone to kitchens and hallways.',
    image: '/images/deluxe-flooring/valencia-white-stone.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/valencia-tile-laminate-white-stone10mm/',
    features: [
      '10mm HDF core',
      'AC4 — heavy residential wear',
      'Textured stone veneer',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'valencia-tile-laminate-white-marbled-stone-10mm',
    name: 'Valencia Tile Laminate White Marbled Stone 10mm',
    category: 'Laminate',
    price: '£25.99 per m²',
    priceNumeric: 25.99,
    priceUnit: 'per m²',
    description:
      'Marble-effect laminate tile in soft white — the luxury of marble with the practicality of click-fit laminate.',
    image: '/images/deluxe-flooring/valencia-marbled.png',
    productUrl:
      'https://deluxe-flooring.co.uk/product/valencia-tile-laminate-white-marbled-stone10mm/',
    features: [
      '10mm HDF core',
      'AC4 — heavy residential wear',
      'Marble-effect textured veneer',
      'Click installation',
      '25-year guarantee',
    ],
  },
  {
    slug: 'heritage-laminate-grey-oak-12mm',
    name: 'Heritage Deluxe Laminate Grey Oak 12mm',
    category: 'Laminate',
    price: '£20.99 per m²',
    priceNumeric: 20.99,
    priceUnit: 'per m²',
    description:
      'Premium 12mm laminate in a cool grey oak tone — modern, versatile and built for busy homes.',
    image: '/images/deluxe-flooring/heritage-grey-oak.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/heritage-laminate-grey-oak-12mm/',
    features: [
      '12mm HDF core',
      'AC5 — commercial wear rating',
      'Textured oak veneer',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'heritage-laminate-honey-oak-12mm',
    name: 'Heritage Deluxe Laminate Honey Oak 12mm',
    category: 'Laminate',
    price: '£20.99 per m²',
    priceNumeric: 20.99,
    priceUnit: 'per m²',
    description:
      'Rich honey-toned laminate with a realistic textured veneer — warm and inviting for living and dining spaces.',
    image: '/images/deluxe-flooring/heritage-honey-oak.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/heritage-laminate-honey-oak-12mm/',
    features: [
      '12mm HDF core',
      'AC5 — commercial wear rating',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'hampshire-lvt-aged-oak-6-5mm',
    name: 'Hampshire LVT Aged Oak 6.5mm',
    category: 'LVT',
    price: '£26.99 per m²',
    priceNumeric: 26.99,
    priceUnit: 'per m²',
    description:
      'Aged-oak LVT with a lived-in, weathered look — waterproof, scratch-resistant and ideal for high-traffic rooms.',
    image: '/images/deluxe-flooring/hampshire-aged-oak.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/hampshire-lvt-aged-oak-6-5mm/',
    features: [
      '6.5mm thick · 0.5mm wear layer',
      'Rigid SPC core, waterproof',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'hampshire-lvt-antique-brown-oak-6-5mm',
    name: 'Hampshire LVT Antique Brown Oak 6.5mm',
    category: 'LVT',
    price: '£26.99 per m²',
    priceNumeric: 26.99,
    priceUnit: 'per m²',
    description:
      'Rich antique-brown LVT that mimics reclaimed oak — durable, waterproof and easy to install.',
    image: '/images/deluxe-flooring/hampshire-antique-brown.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/hampshire-lvt-antique-brown-oak-6-5mm/',
    features: [
      '6.5mm thick · 0.5mm wear layer',
      'SPC waterproof core',
      'Micro-bevelled edges',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'hampshire-lvt-light-grey-oak-6-5mm',
    name: 'Hampshire LVT Light Grey Oak 6.5mm',
    category: 'LVT',
    price: '£26.99 per m²',
    priceNumeric: 26.99,
    priceUnit: 'per m²',
    description:
      'Light grey SPC luxury vinyl that delivers a bright, contemporary look with waterproof durability.',
    image: '/images/deluxe-flooring/hampshire-light-grey.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/hampshire-lvt-light-grey-oak-6-5mm/',
    features: [
      '6.5mm thick · 0.5mm wear layer',
      'Rigid SPC core, waterproof',
      'Click installation',
      'Underfloor heating compatible',
      '25-year guarantee',
    ],
  },
  {
    slug: 'surrey-lvt-light-grey-oak-5mm',
    name: 'Surrey LVT Light Grey Oak 5mm',
    category: 'LVT',
    price: '£22.99 per m²',
    priceNumeric: 22.99,
    priceUnit: 'per m²',
    description:
      'Thinner, budget-friendly SPC LVT in light grey oak — straight plank format with a sleek modern finish.',
    image: '/images/deluxe-flooring/surrey-light-grey.png',
    productUrl: 'https://deluxe-flooring.co.uk/product/surrey-lvt-light-grey-oak-5mm/',
    features: [
      '5mm thick · 0.5mm wear layer',
      'SPC waterproof core',
      'Micro-bevelled edges',
      'Click installation',
      '25-year guarantee',
    ],
  },
]

export const deluxeCategories: DeluxeCategory[] = [
  'Herringbone',
  'Engineered Wood',
  'LVT',
  'Laminate',
]

export function productsByCategory(category: DeluxeCategory): DeluxeProduct[] {
  return deluxeProducts.filter(p => p.category === category)
}
