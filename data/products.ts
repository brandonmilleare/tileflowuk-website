import { affiliateLinks } from './affiliateLinks'

export type ProductCategory =
  | 'Tile Cutters'
  | 'Angle Grinders'
  | 'Laser Levels'
  | 'Wet Saws'
  | 'Spirit Levels'
  | 'Drill Bits'
  | 'Tile Spacers'
  | 'Tile Levelling'
  | 'Trowels'
  | 'Knee Pads'
  | 'Tile Cleaners'
  | 'Mixing Tools'
  | 'Mixing Buckets'

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
    affiliateUrl: affiliateLinks.rubiSlimG2,
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

  // ─── Added 2026-05-07: Amazon UK research batch (5 priority launch picks) ───
  {
    slug: 'vitrex-2mm-tile-spacers-1000pk',
    name: 'Vitrex 2mm Cross Tile Spacers (Pack of 1000)',
    shortName: 'Vitrex 2mm Spacers x1000',
    category: 'Tile Spacers',
    price: 2.40,
    rating: 4.4,
    reviewCount: 1500,
    image: 'https://m.media-amazon.com/images/I/71Fmm9yjdUL._AC_SL1500_.jpg',
    description:
      'Vitrex are the UK trade default for tile spacers — every merchant carries them, every tiler trusts them. The 2mm pack is the spacing I use on most domestic wall tiling jobs. 1,000 pieces is enough for two or three full bathrooms.',
    specs: {
      Size: '2mm',
      'Pack Size': '1,000 pieces',
      Material: 'Plastic',
      'Suitable For': 'Wall tiles, ceramic floor tiles',
    },
    pros: [
      'UK trade staple — same product every merchant stocks',
      '1,000-piece pack covers multiple full jobs',
      'Sized accurately — no oversize variation',
      'Pennies per spacer — cheap to over-buy',
    ],
    cons: [
      'Single-use plastic — recycle responsibly after the job',
      'Get 3mm separately if your tiles are off-square or rustic',
    ],
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.vitrex2mmSpacers1k,
    featured: false,
  },
  {
    slug: 'ox-pro-10mm-notch-trowel',
    name: 'OX Pro 10mm Square-Notch Tile Trowel',
    shortName: 'OX Pro 10mm Trowel',
    category: 'Trowels',
    price: 12.99,
    rating: 4.7,
    reviewCount: 500,
    image: 'https://m.media-amazon.com/images/I/71bzQyNExaL._AC_SL1500_.jpg',
    description:
      'A 10mm square-notch trowel is the workhorse for most domestic floor tiling — 300×300mm to 600×600mm tiles bed cleanly with this notch size. OX Pro use carbon steel with a DuraGrip handle that survives years of site use. Best-rated trowel in this notch size on Amazon UK.',
    specs: {
      Notch: '10mm square',
      Blade: 'Carbon steel',
      Handle: 'DuraGrip soft-grip',
      'Suitable For': 'Floor tiles 300mm – 600mm',
    },
    pros: [
      'Carbon steel blade keeps a clean edge',
      'Soft-grip handle reduces hand fatigue on long jobs',
      'Right notch size for typical floor tiling',
      'Trade favourite — durable enough for daily use',
    ],
    cons: [
      'Pair with a 12mm for large-format tiles 600mm+',
      'Carbon steel will rust if washed and not dried — clean it properly',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.oxPro10mmTrowel,
    featured: false,
  },
  {
    slug: 'toughbuilt-gelfit-stabilization-knee-pads',
    name: 'ToughBuilt TB-KP-G3 GELFIT Stabilization Knee Pads',
    shortName: 'ToughBuilt G3 Knee Pads',
    category: 'Knee Pads',
    price: 92.99,
    rating: 4.6,
    reviewCount: 5000,
    image: 'https://m.media-amazon.com/images/I/61mYRBhg-yL._AC_SL1080_.jpg',
    description:
      'The most-recommended knee pads on the UK tilers\' forums. Gel-filled cushion, hard outer shell that pivots on rough screed without grinding the gel into your knee, and a thigh strap that takes the weight off your knee on long floor jobs. Not cheap — but you\'ll regret saving £30 on cheap foam pads after one week.',
    specs: {
      Cushioning: 'Gel-filled',
      Shell: 'Hard plastic, non-marring',
      'Strap System': 'Thigh-stabilising',
      Coverage: 'Full-knee + lower thigh',
    },
    pros: [
      "'Kings of comfort' on Tilers Forums for a reason",
      'Thigh strap takes weight off the knee on long jobs',
      'Hard shell pivots cleanly on rough screed',
      'Gel doesn\'t go flat after the first week (foam pads do)',
    ],
    cons: [
      'Premium price — knee-pad prices have moved up sharply since 2024',
      'Bulkier than basic foam pads — takes a day to get used to',
    ],
    badge: "Editor's Pick",
    affiliateUrl: affiliateLinks.toughbuiltGelfitG3,
    featured: false,
  },
  {
    slug: 'hg-tile-cleaner-product-16',
    name: 'HG Tile Cleaner Product 16 (1L Concentrated)',
    shortName: 'HG Tile Cleaner 1L',
    category: 'Tile Cleaners',
    price: 6.50,
    rating: 4.6,
    reviewCount: 5000,
    image: 'https://m.media-amazon.com/images/I/51XIALrAoiL._AC_SL1000_.jpg',
    description:
      'HG Product 16 is the budget tile cleaner that actually works — concentrated formula gives roughly 40 mop-buckets per litre, gentle enough for daily use, strong enough to lift old grout haze and traffic grime. Mass-market pricing (£6–7), proper cleaning power.',
    specs: {
      Volume: '1L (concentrated)',
      Coverage: '~40 wash buckets',
      'Suitable For': 'Ceramic, porcelain, natural stone (test first)',
      pH: 'Neutral when diluted',
    },
    pros: [
      'Concentrated — 1L lasts dozens of cleans',
      'Mass-market price (~£6.50)',
      'Works on grout haze and traffic grime',
      'Available in every UK supermarket and Amazon UK',
    ],
    cons: [
      "Won't strip serious builders' grime — use Lithofin FZ for that",
      'Always test natural stone first — some sealants are sensitive',
    ],
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.hgTileCleaner16,
    featured: false,
  },
  {
    slug: 'faithfull-faimp120-mixing-paddle',
    name: 'Faithfull FAIMP120 Mixing Paddle 120mm',
    shortName: 'Faithfull 120mm Paddle',
    category: 'Mixing Tools',
    price: 17.13,
    rating: 4.6,
    reviewCount: 1500,
    image: 'https://m.media-amazon.com/images/I/61CoRIGi7tL._AC_SL1500_.jpg',
    description:
      'The right paddle for tile adhesive. 120mm head size is the sweet spot — small enough for a 25L bucket without splash-out, big enough to mix a full bag of adhesive in one go. Standard chuck shaft fits any cordless drill or paddle mixer. Faithfull is a UK trade brand you can rely on.',
    specs: {
      'Head Size': '120mm',
      Shaft: 'Standard chuck (10mm hex)',
      Length: '~600mm overall',
      'Suitable For': 'Tile adhesive, thinset, grout',
    },
    pros: [
      'Right size for a 25L bucket — no splash-out',
      'Standard chuck — fits any drill or mixer',
      'UK trade brand with reliable quality',
      'Use it slow-speed (max 600 rpm) for clean lump-free mix',
    ],
    cons: [
      'For SDS+ rotary hammers, get a different paddle (SDS+ shaft)',
      'Paddle bends if you push too fast — keep it under 600 rpm',
    ],
    badge: 'Best Seller',
    affiliateUrl: affiliateLinks.faithfullPaddle120,
    featured: false,
  },

  // ─── Added 2026-05-08: 10-product expansion (autonomous batch) ───
  // Image paths use /images/products/<slug>.jpg placeholder — Brandon swaps to local hi-res photos.
  {
    slug: 'sigma-2g-37cm-tile-cutter',
    name: 'Sigma Tile Cutter Art. 2G 37cm',
    shortName: 'Sigma 2G 37cm',
    category: 'Tile Cutters',
    price: 119,
    rating: 4.7,
    reviewCount: 280,
    image: '/images/products/_pending.png',
    description:
      'Sigma quality at the small-format end. The 2G handles tiles up to 37cm — perfect for metro tiles, splashbacks, narrow shower walls. Same Italian-made carbide scoring wheel as the bigger Sigmas, just sized for jobs that don\'t need the full 70cm bench.',
    specs: {
      'Cutting Length': '37cm',
      'Max Thickness': '12mm',
      'Diagonal Cut': '26cm',
      Weight: '4.5kg',
      'Made In': 'Italy',
    },
    pros: [
      'Sigma scoring wheel — clean breaks on metro tiles',
      'Light enough to carry up stairs without thinking',
      'Cheaper entry into Sigma quality',
      'Made in Italy, full warranty',
    ],
    cons: [
      'Won\'t handle 600mm+ floor tiles — get the 4BU for that',
      'Overkill if you only ever cut ceramic — RUBI Slim is fine',
    ],
    affiliateUrl: affiliateLinks.sigmaSmall37,
    featured: false,
  },
  {
    slug: 'dewalt-dcd240x2-paddle-mixer',
    name: 'DEWALT DCD240X2 XR FlexVolt Paddle Mixer',
    shortName: 'DEWALT DCD240X2',
    category: 'Mixing Tools',
    price: 549,
    rating: 4.8,
    reviewCount: 320,
    image: '/images/products/_pending.png',
    description:
      'Cordless mixing on the same FlexVolt platform as the DEWALT D36000 wet saw and 54V grinders — one battery, three tools. The DCD240X2 mixes a full 25kg bag of adhesive in 90 seconds without breaking a sweat. If you\'re already on FlexVolt, this is the no-brainer mixer upgrade.',
    specs: {
      Voltage: '54V FlexVolt (or 18V XR)',
      'No-load speed': '0–800 rpm (low) / 0–1,800 rpm (high)',
      Chuck: 'M14',
      'Battery included': '2x 9.0Ah FlexVolt',
      'Made For': 'Adhesive, render, screed',
    },
    pros: [
      'Mixes 25kg bag in 90 seconds, no overheating',
      'Cordless — no extension lead trip hazard on site',
      'Shares batteries with DEWALT FlexVolt range',
      'Anti-kickback prevents wrist injuries from snags',
    ],
    cons: [
      'Premium price — corded mixers cost half',
      'Heavy to hold above shoulder height for long mixes',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.dewaltMixer,
    featured: false,
  },
  {
    slug: 'tool-depot-mlt-400-levelling-system',
    name: 'Tool Depot 400-piece Tile Levelling System (2mm) + Pliers',
    shortName: 'Tool Depot MLT 400pc',
    category: 'Tile Levelling',
    price: 10.47,
    rating: 4.4,
    reviewCount: 1250,
    image: '/images/products/_pending.png',
    description:
      'A complete tile levelling system at the price most pliers cost on their own. 400 reusable wedges, 400 disposable clips, plus the levelling pliers — enough to do an entire bathroom floor twice over. Ideal first MLT system for anyone laying large-format tiles for the first time.',
    specs: {
      'Joint Width': '2mm',
      'Pieces': '400 wedges + 400 clips + pliers',
      'Tile Thickness': '3–12mm',
      'Pliers Type': 'Manual squeeze action',
    },
    pros: [
      'Cheapest complete kit on Amazon UK',
      'Wedges are reusable — clips are the only consumable',
      'Plenty of pieces for a full bathroom job',
      'Pliers included — most kits make you buy them separately',
    ],
    cons: [
      'Plastic build — not as long-lasting as Raimondi',
      '2mm only — buy a 3mm kit too if grouting wider joints',
    ],
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.toolDepotMlt400,
    featured: false,
  },
  {
    slug: 'vitrex-3mm-tile-spacers-400pk',
    name: 'Vitrex 3mm Cross Tile Spacers (Pack of 400)',
    shortName: 'Vitrex 3mm Spacers x400',
    category: 'Tile Spacers',
    price: 4.99,
    rating: 4.5,
    reviewCount: 1100,
    image: '/images/products/_pending.png',
    description:
      'The 3mm sister of Vitrex\'s 2mm spacer — same brand, same quality, wider joint. 3mm is the standard for floor tiles, rustic-edge tiles, and any wall tile that isn\'t rectified. 400-piece pack covers about 5–8m² of floor depending on tile size.',
    specs: {
      Size: '3mm',
      'Pack Size': '400 pieces',
      Material: 'Plastic',
      'Suitable For': 'Floor tiles, rustic / non-rectified tiles',
    },
    pros: [
      'Trade-default brand — every UK merchant carries Vitrex',
      'Right pack size for one bathroom or kitchen floor',
      'No sizing variation between pieces',
      'Pair with the 2mm pack to cover most jobs',
    ],
    cons: [
      'Single-use plastic — recycle properly',
      'For 1.5mm rectified joints, need different spacers (no Vitrex equivalent)',
    ],
    affiliateUrl: affiliateLinks.vitrex3mmSpacers400,
    featured: false,
  },
  {
    slug: 'ox-pro-12mm-notch-trowel',
    name: 'OX Pro 12mm Square-Notch Tile Trowel',
    shortName: 'OX Pro 12mm Trowel',
    category: 'Trowels',
    price: 14.99,
    rating: 4.7,
    reviewCount: 380,
    image: '/images/products/_pending.png',
    description:
      'The 12mm trowel earns its place when you move to 600mm+ tiles. 10mm is fine for 300×300mm and 400×400mm; once tiles get bigger, you need the deeper notch to leave enough adhesive after combing for proper coverage. Same OX Pro carbon steel + DuraGrip handle as the 10mm version.',
    specs: {
      Notch: '12mm square',
      Blade: 'Carbon steel',
      Handle: 'DuraGrip soft-grip',
      'Suitable For': 'Floor tiles 600mm+ and large-format porcelain',
    },
    pros: [
      'Right notch for large-format work',
      'Carbon steel keeps a sharp edge through hundreds of m²',
      'Soft-grip handle on long days',
      'Use with back-buttering for bullet-proof coverage',
    ],
    cons: [
      'Overkill for small wall tiles — use a 6mm or 8mm there',
      'Carbon steel — dry it after every wash or it rusts',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.oxPro12mmTrowel,
    featured: false,
  },
  {
    slug: 'e-cloth-bathroom-cleaning-pack',
    name: 'E-Cloth Bathroom Cleaning Pack (2-piece)',
    shortName: 'E-Cloth Bathroom Pack',
    category: 'Tile Cleaners',
    price: 9.99,
    rating: 4.6,
    reviewCount: 5200,
    image: '/images/products/_pending.png',
    description:
      'Use water only, no chemicals. The microfibre weave grips the soap scum and limescale that wipes leave behind. UK-made, machine-washable up to 300 times. I keep one in every bathroom kit — gets glazed tiles streak-free in seconds.',
    specs: {
      Pack: '1x bathroom cloth + 1x glass & polishing cloth',
      Material: 'Premium microfibre',
      Washes: '300+',
      Made: 'UK',
    },
    pros: [
      'No chemicals — safe on every tile, grout, and fitting',
      'Removes limescale + soap scum with water alone',
      'Lasts 300 washes — calculator says 5+ years of weekly use',
      'UK-made, premium microfibre weave',
    ],
    cons: [
      'Won\'t shift heavy mineral build-up — use Lithofin FZ for that',
      'Wash separately or fibres pick up fluff from cotton towels',
    ],
    badge: 'Best Seller',
    affiliateUrl: affiliateLinks.eclothBathroom,
    featured: false,
  },
  {
    slug: 'lithofin-fz-intensive-cleaner-1l',
    name: 'Lithofin FZ Intensive Cleaner 1L',
    shortName: 'Lithofin FZ 1L',
    category: 'Tile Cleaners',
    price: 16.95,
    rating: 4.7,
    reviewCount: 850,
    image: '/images/products/_pending.png',
    description:
      'German-made specialist tile cleaner that strips builders\' residue, grout haze, and cement film without damaging the tile or grout. The product I reach for on a finished bathroom before handover — gets that fresh-out-the-box clean even when the install was messy.',
    specs: {
      Volume: '1L (concentrated, dilute 1:5 to 1:10)',
      'Suitable For': 'Glazed ceramic, porcelain, natural stone (test first)',
      'Made In': 'Germany',
      pH: 'Acidic — use gloves',
    },
    pros: [
      'Strips builders\' grime that normal cleaners can\'t',
      'Concentrated — 1L makes 5–10L of working solution',
      'Trusted spec on German + UK trade jobs',
      'Won\'t damage epoxy grout or tile glaze',
    ],
    cons: [
      'Acidic — wear gloves and ventilate the room',
      'Test on natural stone first — may etch limestone',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.lithofinFzIntensive,
    featured: false,
  },
  {
    slug: 'toughbuilt-gelfit-snap-shell-knee-pads',
    name: 'ToughBuilt GelFit Snap-Shell Tradesman Knee Pads',
    shortName: 'ToughBuilt Snap-Shell',
    category: 'Knee Pads',
    price: 49.99,
    rating: 4.8,
    reviewCount: 2400,
    image: '/images/products/_pending.png',
    description:
      'The knee pads I wish I\'d bought five years sooner. The Snap-Shell system means the gel cushion stays in place AND you can swap the wear plate (the bit that touches the floor) when it goes through. Ten years of daily site use on one set is realistic.',
    specs: {
      Padding: 'GelFit memory foam + EVA',
      'Wear Plate': 'Replaceable hard shell',
      Strap: 'Stretch + buckle, no Velcro to clog',
      'Suitable For': 'Hard floors, concrete, tile, screed',
    },
    pros: [
      'Wear plate is replaceable — pads last years longer',
      'Gel cushioning genuinely comfortable for full-day work',
      'Snap-Shell stays in place — no pad rotation under the trouser leg',
      'Better build quality than the basic G3 ToughBuilt',
    ],
    cons: [
      '£20 more than the standard ToughBuilt — but lasts 4x longer',
      'Bulky in skip pockets — store in van not toolbag',
    ],
    badge: 'Pro Choice',
    affiliateUrl: affiliateLinks.toughbuiltSnapShell,
    featured: false,
  },
  {
    slug: 'faithfull-faimp100-mixing-paddle',
    name: 'Faithfull FAIMP100 Mixing Paddle 100mm',
    shortName: 'Faithfull 100mm Paddle',
    category: 'Mixing Tools',
    price: 14.99,
    rating: 4.6,
    reviewCount: 720,
    image: '/images/products/_pending.png',
    description:
      'Smaller sister to the Faithfull 120mm. The 100mm head fits a 10L bucket — the right size for grout, smaller adhesive batches, and self-levelling compound where you don\'t want too much air whipped into the mix. Pair the 100 + 120 and you\'ve got every domestic tiling mix covered.',
    specs: {
      'Head Size': '100mm',
      Shaft: 'Standard chuck (10mm hex)',
      Length: '~600mm overall',
      'Suitable For': 'Grout, small adhesive batches, levelling compound',
    },
    pros: [
      'Right size for 10L bucket — no splash-out',
      'Less air introduced than 120mm on grout mixes',
      'Same UK trade quality as the 120mm',
      'Standard chuck — fits any drill or paddle mixer',
    ],
    cons: [
      'Slow on a full 25kg adhesive bag — get the 120mm for that',
      'Skip if you already have a 120mm and rarely mix grout in batches',
    ],
    affiliateUrl: affiliateLinks.faithfullPaddle100,
    featured: false,
  },
  {
    slug: 'ketoplastics-26l-flexi-tub-pack-of-5',
    name: 'KetoPlastics 26L Heavy-Duty Flexi Tub (Pack of 5)',
    shortName: 'KetoPlastics 26L Tub x5',
    category: 'Mixing Buckets',
    price: 27.99,
    rating: 4.7,
    reviewCount: 3100,
    image: '/images/products/_pending.png',
    description:
      'Five buckets, fits in the van, no excuses for cross-contaminating the wrong adhesive into the wrong bucket. 26L is the right capacity for a full bag of adhesive plus mixing room. The flexible plastic lets you knock out cured residue cleanly when the bucket sets — no more chiselling.',
    specs: {
      Capacity: '26L per bucket',
      'Pack Size': '5 buckets',
      Material: 'Flexible LDPE',
      Handles: 'Reinforced rope handles',
    },
    pros: [
      'Cured adhesive pops out — no chisel needed',
      '5 buckets cover separate adhesive / grout / clean water / waste / spare',
      'Stackable empty — fits in any van',
      'Cheaper per bucket than buying single 25L pails',
    ],
    cons: [
      'Not heat-resistant — don\'t use for boiling water',
      'Rope handles can fray after a year of daily use',
    ],
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.ketoFlexiTub26L5,
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
