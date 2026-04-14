import { affiliateLinks } from './affiliateLinks'

export type ProductCategory =
  | 'Tile Cutters'
  | 'Angle Grinders'
  | 'Laser Levels'
  | 'Wet Saws'
  | 'Spirit Levels'
  | 'Drill Bits'

export interface Product {
  slug: string
  name: string
  shortName: string
  category: ProductCategory
  price: number
  priceNote?: string  // e.g. "from £" for variable pricing
  rating: number
  reviewCount: number
  image: string
  description: string
  specs: Record<string, string>
  pros: string[]
  cons: string[]
  badge?: 'Best Seller' | "Editor's Pick" | 'Best Value' | 'Pro Choice' | 'New'
  affiliateUrl: string
  featured: boolean
}

export const products: Product[] = [
  {
    slug: 'sigma-4bu-70cm',
    name: 'Sigma Tile Cutter Art. 4BU 70cm',
    shortName: 'Sigma 4BU 70cm',
    category: 'Tile Cutters',
    price: 289,
    rating: 4.8,
    reviewCount: 342,
    image: '/images/products/sigma-4bu-70cm-tile-cutter.png',
    description:
      'The Sigma 4BU is the cutter I reach for on 90% of domestic jobs. Cuts up to 70cm, handles 10mm porcelain cleanly, and the scoring wheel will outlast cheaper alternatives by years.',
    specs: {
      'Cutting Length': '70cm',
      'Max Thickness': '15mm',
      'Diagonal Cut': '50cm',
      Weight: '7.5kg',
      'Made In': 'Italy',
    },
    pros: [
      'Scoring wheel lasts for years of daily use',
      'Breaking bar gives clean, consistent snaps on porcelain',
      'Robust enough for a full day on site',
      'Made in Italy — quality you can feel',
    ],
    cons: [
      'Premium price vs. budget alternatives',
      'Not suitable for tiles wider than 70cm',
    ],
    badge: 'Best Seller',
    affiliateUrl: affiliateLinks.sigma4bu70,
    featured: true,
  },
  {
    slug: 'sigma-4dn-95cm',
    name: 'Sigma Tile Cutter Art. 4DN 95cm',
    shortName: 'Sigma 4DN 95cm',
    category: 'Tile Cutters',
    price: 489,
    rating: 4.7,
    reviewCount: 156,
    image: '/images/products/sigma-4dn-95cm-tile-cutter.jpg',
    description:
      'For large format work — 60×120cm and above — the 4DN is the tool. Heavy but precise, this is the professional\'s choice for high-end residential and commercial jobs.',
    specs: {
      'Cutting Length': '95cm',
      'Max Thickness': '15mm',
      'Diagonal Cut': '67cm',
      Weight: '14kg',
      'Made In': 'Italy',
    },
    pros: [
      'Handles 120cm large-format tiles with ease',
      'Extremely precise — consistent cuts every time',
      'Built for professional daily use',
    ],
    cons: [
      'Heavy at 14kg — not ideal for solo use',
      'Significant investment for occasional users',
    ],
    badge: "Editor's Pick",
    affiliateUrl: affiliateLinks.sigma4dn95,
    featured: true,
  },
  {
    slug: 'sigma-4en-125cm',
    name: 'Sigma Tile Cutter Art. 4EN 125cm',
    shortName: 'Sigma 4EN 125cm',
    category: 'Tile Cutters',
    price: 689,
    rating: 4.9,
    reviewCount: 87,
    image: '/images/products/sigma-4en-125cm-tile-cutter.jpg',
    description:
      'The 4EN is for the big commercial jobs — full 125cm boards, 180×90cm slabs. If you\'re laying large format stone or porcelain on commercial sites, this is your machine.',
    specs: {
      'Cutting Length': '125cm',
      'Max Thickness': '20mm',
      'Diagonal Cut': '88cm',
      Weight: '22kg',
      'Made In': 'Italy',
    },
    pros: [
      'Handles virtually any tile size commercially available',
      'Precision scoring even on 20mm thick porcelain',
      'Professional-grade durability',
    ],
    cons: [
      'Very heavy — needs two people to move',
      'Top of the price range',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.sigma4en125,
    featured: false,
  },
  {
    slug: 'rubi-rdxa35-tile-cutter',
    name: 'RUBI RDXA 35 Tile Cutter',
    shortName: 'RUBI RDXA35',
    category: 'Tile Cutters',
    price: 199,
    rating: 4.5,
    reviewCount: 213,
    image: '/images/products/rubi-rdxa35-tile-cutter.jpg',
    description:
      'Solid mid-range option from RUBI. Good for ceramic and lighter porcelain on smaller bathroom and kitchen jobs. A reliable workhorse at a sensible price.',
    specs: {
      'Cutting Length': '35cm',
      'Max Thickness': '12mm',
      Weight: '4.2kg',
      'Made In': 'Spain',
    },
    pros: [
      'Excellent value for smaller jobs',
      'Lightweight — easy to carry and set up',
      'RUBI quality and reliability',
    ],
    cons: [
      'Limited to 35cm — won\'t handle large format',
      'Scoring wheel not as long-lasting as Sigma',
    ],
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.rubiRdxa35,
    featured: false,
  },
  {
    slug: 'dewalt-18v-angle-grinder',
    name: 'DEWALT 18V XR Brushless 125mm Angle Grinder',
    shortName: 'DEWALT 18V Grinder',
    category: 'Angle Grinders',
    price: 149,
    rating: 4.7,
    reviewCount: 524,
    image: '/images/products/dewalt-18v-angle-grinder.jpg',
    description:
      'The go-to cordless grinder for most tiling work. Brushless motor means it runs cool and lasts. The 18V battery platform is the same as your other DEWALT tools — one ecosystem, less hassle.',
    specs: {
      'Disc Size': '125mm',
      Voltage: '18V',
      Motor: 'Brushless',
      'No-load Speed': '8,000 RPM',
      Weight: '1.9kg',
    },
    pros: [
      'Shares battery with DEWALT 18V ecosystem',
      'Brushless motor runs cool on extended use',
      'Good balance for tiling cuts',
      'Electronic brake for safety',
    ],
    cons: [
      'Battery and charger sold separately',
      'Plastic guard feels a bit cheap',
    ],
    badge: 'Best Seller',
    affiliateUrl: affiliateLinks.dewalt18vAngle,
    featured: true,
  },
  {
    slug: 'dewalt-dcg405n',
    name: 'DEWALT DCG405N 18V Brushless 125mm Angle Grinder',
    shortName: 'DEWALT DCG405N',
    category: 'Angle Grinders',
    price: 139,
    priceNote: 'body only',
    rating: 4.6,
    reviewCount: 389,
    image: '/images/products/dewalt-dcg405n-angle-grinder.jpg',
    description:
      'Body-only version of the DCG405. If you\'re already in the DEWALT ecosystem, this saves you buying batteries you don\'t need. Same excellent brushless performance.',
    specs: {
      'Disc Size': '125mm',
      Voltage: '18V',
      Motor: 'Brushless',
      'No-load Speed': '8,000 RPM',
      Weight: '1.8kg',
    },
    pros: [
      'Excellent value if you have DEWALT batteries',
      'Lightweight body for a 125mm grinder',
      'Soft-start reduces kickback',
    ],
    cons: [
      'No battery or charger included',
      'Needs DEWALT 18V battery to run',
    ],
    affiliateUrl: affiliateLinks.dewaltDcg405n,
    featured: false,
  },
  {
    slug: 'dewalt-dcg460-flexvolt',
    name: 'DEWALT DCG460 54V XR FLEXVOLT 230mm Angle Grinder',
    shortName: 'DEWALT DCG460 FLEXVOLT',
    category: 'Angle Grinders',
    price: 279,
    priceNote: 'body only',
    rating: 4.8,
    reviewCount: 167,
    image: '/images/products/dewalt-dcg460-flexvolt-grinder.jpg',
    description:
      'When you need corded power without the cord — DEWALT\'s 54V FLEXVOLT grinder delivers. Handles 230mm diamond blades on heavy-duty stone work without breaking a sweat.',
    specs: {
      'Disc Size': '230mm',
      Voltage: '54V FLEXVOLT',
      Motor: 'Brushless',
      'No-load Speed': '6,500 RPM',
      Weight: '3.4kg',
    },
    pros: [
      'Corded-class power from a battery',
      '230mm blade handles heavy stone and porcelain slab',
      'FLEXVOLT battery works at 18V and 54V',
    ],
    cons: [
      'Heavy at 3.4kg',
      'FLEXVOLT batteries are expensive',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.dewaltDcg460,
    featured: true,
  },
  {
    slug: 'makita-dga463z',
    name: 'Makita DGA463Z 18V Li-Ion LXT Brushless 115mm Angle Grinder',
    shortName: 'Makita DGA463Z',
    category: 'Angle Grinders',
    price: 129,
    priceNote: 'body only',
    rating: 4.6,
    reviewCount: 298,
    image: '/images/products/makita-dga463z-angle-grinder.jpg',
    description:
      'If you run Makita tools on site, this is the natural choice. Compact 115mm head — tighter corners, more control. Excellent for grout removal and edge detailing.',
    specs: {
      'Disc Size': '115mm',
      Voltage: '18V',
      Motor: 'Brushless',
      'No-load Speed': '8,500 RPM',
      Weight: '1.5kg',
    },
    pros: [
      'Lightest in its class at 1.5kg',
      '115mm ideal for precision grout and edge work',
      'Makita LXT battery ecosystem compatibility',
    ],
    cons: [
      '115mm limits cutting capacity on thick materials',
      'Body only — no battery/charger',
    ],
    affiliateUrl: affiliateLinks.makitaDga463z,
    featured: false,
  },
  {
    slug: 'bosch-gwx18v-7',
    name: 'Bosch Professional GWX 18V-7 Angle Grinder',
    shortName: 'Bosch GWX 18V-7',
    category: 'Angle Grinders',
    price: 239,
    rating: 4.7,
    reviewCount: 201,
    image: '/images/products/bosch-gwx18v-7-angle-grinder.jpg',
    description:
      'The X-Lock system makes blade changes genuinely tool-free and fast. On a busy site, that matters. Comes with a 5-piece disc set in an L-BOXX — ready to go out of the box.',
    specs: {
      'Disc Size': '125mm',
      Voltage: '18V',
      'Mounting System': 'X-Lock',
      'No-load Speed': '8,500 RPM',
      Weight: '1.9kg',
    },
    pros: [
      'X-Lock tool-free blade changes in seconds',
      'Comes with L-BOXX and 5-piece disc set',
      'Overload protection extends motor life',
    ],
    cons: [
      'Premium price vs. standard DEWALT',
      'X-Lock discs slightly harder to source',
    ],
    affiliateUrl: affiliateLinks.boschGwx18v,
    featured: true,
  },
  {
    slug: 'dewalt-dcle34035b-laser',
    name: 'DEWALT DCLE34035B 18V MAX 3×360° Remote Control Laser',
    shortName: 'DEWALT 3×360 Laser',
    category: 'Laser Levels',
    price: 449,
    priceNote: 'body only',
    rating: 4.8,
    reviewCount: 134,
    image: '/images/products/dewalt-dcle34035b-laser.jpg',
    description:
      'Remote-controlled 3×360° green beam — you can adjust the level from across the room. Game-changer for large-format floor laying where you\'re constantly checking alignment.',
    specs: {
      Beams: '3×360°',
      'Beam Colour': 'Green',
      Range: '50m (with detector)',
      Accuracy: '±3mm/10m',
      Control: 'Remote',
    },
    pros: [
      'Remote control — adjust from across the job site',
      'Green beam visible in bright conditions',
      'Extremely accurate for professional tiling',
    ],
    cons: [
      'Body only — expensive to get started',
      'Overkill for small domestic jobs',
    ],
    badge: "Editor's Pick",
    affiliateUrl: affiliateLinks.dewaltDcle34035b,
    featured: true,
  },
  {
    slug: 'dewalt-self-levelling-laser',
    name: 'DEWALT Self-Levelling Multi Line 3×360°',
    shortName: 'DEWALT Self-Level Laser',
    category: 'Laser Levels',
    price: 299,
    rating: 4.6,
    reviewCount: 287,
    image: '/images/products/dewalt-self-levelling-laser.jpg',
    description:
      'Reliable 3×360° self-levelling laser for tiling and general building work. Quick to set up, accurate to ±3mm at 10m. A solid, no-fuss laser that does exactly what you need.',
    specs: {
      Beams: '3×360°',
      'Beam Colour': 'Red',
      Range: '30m',
      Accuracy: '±3mm/10m',
    },
    pros: [
      'Quick self-levelling — on site fast',
      'Robust build handles site conditions',
      'Compatible with DEWALT detector for outdoor use',
    ],
    cons: [
      'Red beam less visible in bright sunlight',
      'No remote control',
    ],
    affiliateUrl: affiliateLinks.dewaltSelfLevel,
    featured: false,
  },
  {
    slug: 'bosch-gll-laser',
    name: 'Bosch Professional GLL 12V-100-33 CG Line Laser',
    shortName: 'Bosch GLL 12V',
    category: 'Laser Levels',
    price: 199,
    rating: 4.5,
    reviewCount: 176,
    image: '/images/products/bosch-gll-laser.jpg',
    description:
      'Compact 12V green beam laser — excellent for bathroom and kitchen tiling. The green beam is significantly brighter than red, making it usable in reasonable natural light.',
    specs: {
      Beams: '3×360°',
      'Beam Colour': 'Green',
      Range: '25m',
      Accuracy: '±0.3mm/m',
      Voltage: '12V',
    },
    pros: [
      'Green beam visible in normal indoor light',
      'Compact and lightweight',
      'Outstanding accuracy at ±0.3mm/m',
    ],
    cons: [
      '12V battery not compatible with larger Bosch tools',
      'Limited 25m range',
    ],
    affiliateUrl: affiliateLinks.boschGll,
    featured: false,
  },
  {
    slug: 'huepar-laser-level',
    name: 'Huepar Pro Laser Level 4×360° Self-Levelling',
    shortName: 'Huepar Pro Laser',
    category: 'Laser Levels',
    price: 149,
    rating: 4.4,
    reviewCount: 421,
    image: '/images/products/huepar-laser-level.jpg',
    description:
      'Outstanding value at the price. Four 360° lines for complete room coverage. Battery-powered with a long runtime. Not a professional tool, but excellent for DIY and lighter trade use.',
    specs: {
      Beams: '4×360°',
      'Beam Colour': 'Green',
      Range: '30m',
      Accuracy: '±3mm/10m',
    },
    pros: [
      'Exceptional value for money',
      'Four 360° beams — complete room coverage',
      'USB-C rechargeable battery',
    ],
    cons: [
      'Accuracy not at pro level',
      'Build quality reflects the price point',
    ],
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.huepar4x360,
    featured: false,
  },
  {
    slug: 'dewalt-d36000-wet-tile-saw',
    name: 'DEWALT D36000 940mm Wet Tile Saw 240V',
    shortName: 'DEWALT D36000 Wet Saw',
    category: 'Wet Saws',
    price: 799,
    rating: 4.7,
    reviewCount: 98,
    image: '/images/products/dewalt-d36000-wet-tile-saw.jpg',
    description:
      'The D36000 is the wet saw for serious tiling contractors. Cuts up to 940mm in a single pass — handles full-size large format slabs. If you\'re cutting a lot of stone or thick porcelain, nothing beats a wet saw.',
    specs: {
      'Table Size': '940mm',
      'Blade Diameter': '254mm',
      Power: '2,000W',
      Voltage: '240V',
      'Water Cooling': 'Yes',
    },
    pros: [
      '940mm cutting capacity handles any tile',
      'Precision fence system for repeatability',
      'Water cooling gives dust-free clean cuts',
      'DEWALT reliability on demanding jobs',
    ],
    cons: [
      'Significant investment',
      'Heavy — needs permanent or semi-permanent setup',
      'Requires water supply and drainage',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.dewaltD36000,
    featured: true,
  },
  {
    slug: 'stabila-level-set',
    name: 'STABILA Spirit Level Set 196-2 Dark Shadow',
    shortName: 'STABILA 196-2 Set',
    category: 'Spirit Levels',
    price: 179,
    rating: 4.9,
    reviewCount: 312,
    image: '/images/products/stabila-level-set.jpg',
    description:
      'STABILA makes the best spirit levels on the market — full stop. The 196-2 Dark Shadow set gives you multiple lengths for everything from skirting boards to full wall tiles. These will last a career.',
    specs: {
      'Lengths Included': '1800mm, 1200mm, 600mm',
      Accuracy: '±0.5mm/m',
      Material: 'Aluminium',
      'Made In': 'Germany',
    },
    pros: [
      'Market-leading accuracy',
      'Three lengths cover all tiling scenarios',
      'Indestructible aluminium construction',
      'Made in Germany — lifetime investment',
    ],
    cons: [
      'Premium price — you\'re paying for quality',
    ],
    badge: "Editor's Pick",
    affiliateUrl: affiliateLinks.stabilaLevelSet,
    featured: true,
  },
  {
    slug: 'ox-pro-level-bag',
    name: 'OX Pro Level Bag with 1800mm, 1200mm & 600mm Spirit Levels',
    shortName: 'OX Pro Level Bag',
    category: 'Spirit Levels',
    price: 99,
    rating: 4.6,
    reviewCount: 189,
    image: '/images/products/ox-pro-level-bag.jpg',
    description:
      'A complete level kit in a professional carry bag. OX Pro levels are trusted on UK construction sites for a reason — accurate, durable, and at a fair price point.',
    specs: {
      'Lengths Included': '1800mm, 1200mm, 600mm',
      Accuracy: '±0.5mm/m',
      Material: 'Aluminium',
      Includes: 'Carry bag',
    },
    pros: [
      'Excellent value for a three-piece set',
      'Carry bag keeps everything organised',
      'OX Pro build quality trusted on UK sites',
    ],
    cons: [
      'Not quite at STABILA accuracy levels',
    ],
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.oxProLevelBag,
    featured: false,
  },
  {
    slug: 'tile-drill-bits-kit',
    name: 'Professional Tile Drill Bits Kit',
    shortName: 'Tile Drill Bits Kit',
    category: 'Drill Bits',
    price: 29,
    rating: 4.4,
    reviewCount: 634,
    image: '/images/products/tile-drill-bits-kit.jpg',
    description:
      'A solid set of diamond-tipped tile drill bits covering the most common hole sizes. Works on porcelain, ceramic, marble, and glass. Use with water cooling and low speed for best results.',
    specs: {
      'Sizes Included': '6mm, 8mm, 10mm, 12mm, 20mm, 25mm',
      Tip: 'Diamond',
      'Suitable For': 'Porcelain, Ceramic, Glass, Marble',
    },
    pros: [
      'Covers all common hole sizes',
      'Diamond tips last well if used correctly',
      'Works on even hard porcelain',
      'Great value for the set',
    ],
    cons: [
      'Must use water cooling — dry drilling kills them fast',
      'Not for heavy commercial use',
    ],
    affiliateUrl: affiliateLinks.tileDrillBits,
    featured: false,
  },
]

export const featuredProducts = products.filter((p) => p.featured)
export const categories = [...new Set(products.map((p) => p.category))] as ProductCategory[]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, category: ProductCategory, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit)
}
