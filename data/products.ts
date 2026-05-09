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
    price: 447.28,
    rating: 4.4,
    reviewCount: 20,
    image: '/images/products/sigma-4bu-70cm.jpg',
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
    slug: 'sigma-4en-125cm',
    name: 'Sigma Tile Cutter Art. 4EN 125cm',
    shortName: 'Sigma 4EN 125cm',
    category: 'Tile Cutters',
    price: 879.99,
    rating: 4.7,
    reviewCount: 105,
    image: '/images/products/sigma-4en-125cm.jpg',
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
    slug: 'dewalt-18v-angle-grinder',
    name: 'DEWALT 18V XR Brushless 125mm Angle Grinder',
    shortName: 'DEWALT 18V Grinder',
    category: 'Angle Grinders',
    price: 114.98,
    rating: 4.6,
    reviewCount: 34,
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
    name: 'DEWALT DCG405N 18V Brushless 125mm Angle Grinder Kit (2× 5Ah + Charger)',
    shortName: 'DEWALT DCG405N Kit',
    category: 'Angle Grinders',
    price: 259,
    priceNote: 'with 2× 5Ah batteries + charger',
    rating: 4,
    reviewCount: 6,
    image: '/images/products/dewalt-dcg405n.jpg',
    description:
      'DEWALT DCG405N 18V XR brushless 125mm angle grinder — supplied with 2× 5.0Ah batteries and a charger. Brushless motor for longer runtime and tool life. Soft-start reduces kickback on first trigger pull.',
    specs: {
      'Disc Size': '125mm',
      Voltage: '18V',
      Motor: 'Brushless',
      'In the Box': 'Grinder + 2× 5Ah battery + charger',
      Brand: 'DEWALT',
    },
    pros: [
      'Full kit — ready to use out of the box',
      'Brushless motor runs cool on extended use',
      'Soft-start reduces kickback',
      'DEWALT 18V XR ecosystem — batteries fit other tools',
    ],
    cons: [
      'Premium price vs body-only models',
      '125mm limits cutting capacity vs 230mm grinders',
    ],
    affiliateUrl: affiliateLinks.dewaltDcg405n,
    featured: false,
  },
  {
    slug: 'dewalt-dcg460-flexvolt',
    name: 'DEWALT DCG460 54V XR Cordless FLEXVOLT 230mm Angle Grinder (No Batteries)',
    shortName: 'DEWALT DCG460 FLEXVOLT',
    category: 'Angle Grinders',
    price: 326.84,
    priceNote: 'no batteries — body only',
    rating: 5,
    reviewCount: 2,
    image: '/images/products/dewalt-dcg460-flexvolt.jpg',
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
    name: 'Makita DGA463Z 18V Li-Ion LXT Brushless 115mm Angle Grinder (Body Only)',
    shortName: 'Makita DGA463Z',
    category: 'Angle Grinders',
    price: 39.99,
    priceNote: 'body only — no batteries / charger',
    rating: 4.8,
    reviewCount: 568,
    image: '/images/products/makita-dga463z.jpg',
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
    price: 227.1,
    rating: 4.7,
    reviewCount: 161,
    image: '/images/products/bosch-gwx18v-7.jpg',
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
    name: 'DEWALT DCLE34035B-XJ 18V MAX 3×360° Remote Control Laser (Bare Tool)',
    shortName: 'DEWALT 3×360 Laser',
    category: 'Laser Levels',
    price: 775.58,
    priceNote: 'bare tool — no battery / charger',
    rating: 4.6,
    reviewCount: 20,
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
      'Reliable 3×360° self-levelling green-beam laser (DCE089D1G, 12V) for tiling and general building work. Quick to set up, accurate to ±3mm at 10m. A solid, no-fuss laser that does exactly what you need.',
    specs: {
      Beams: '3×360°',
      'Beam Colour': 'Green',
      Voltage: '12V',
      Range: '30m',
      Accuracy: '±3mm/10m',
    },
    pros: [
      'Quick self-levelling — on site fast',
      'Robust build handles site conditions',
      'Green beam — much more visible than red on a lit site',
      'Compatible with DEWALT detector for outdoor use',
    ],
    cons: [
      'No remote control',
      '12V battery only — separate from your 18V tool ecosystem',
    ],
    affiliateUrl: affiliateLinks.dewaltSelfLevel,
    featured: false,
  },
  {
    slug: 'bosch-gll-laser',
    name: 'Bosch Professional GLL 12V-100-33 CG Line Laser',
    shortName: 'Bosch GLL 12V',
    category: 'Laser Levels',
    price: 707.96,
    rating: 5,
    reviewCount: 3,
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
    price: 259.99,
    rating: 4.5,
    reviewCount: 53,
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
    price: 449.0,
    rating: 5,
    reviewCount: 1,
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
    price: 140.99,
    rating: 5,
    reviewCount: 1,
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
    price: 143.99,
    rating: 4.6,
    reviewCount: 232,
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

  // ─── Added 2026-05-07: Amazon UK research batch (5 priority launch picks) ───
  {
    slug: 'vitrex-2mm-tile-spacers-1000pk',
    name: 'Vitrex 2mm Cross Tile Spacers (Pack of 1000)',
    shortName: 'Vitrex 2mm Spacers x1000',
    category: 'Tile Spacers',
    price: 2.4,
    rating: 4.4,
    reviewCount: 596,
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
    rating: 4.6,
    reviewCount: 338,
    image: 'https://m.media-amazon.com/images/I/71bzQyNExaL._AC_SL1500_.jpg',
    description:
      'A 10mm square-notch trowel is the workhorse for most domestic floor tiling — 300×300mm to 600×600mm tiles bed cleanly with this notch size. OX Pro use a stainless steel blade with a DuraGrip handle that survives years of site use. Best-rated trowel in this notch size on Amazon UK.',
    specs: {
      Notch: '10mm square',
      Blade: 'Stainless steel',
      Handle: 'DuraGrip soft-grip',
      'Suitable For': 'Floor tiles 300mm – 600mm',
    },
    pros: [
      'Stainless steel blade — won\'t rust if washed',
      'Soft-grip handle reduces hand fatigue on long jobs',
      'Right notch size for typical floor tiling',
      'Trade favourite — durable enough for daily use',
    ],
    cons: [
      'Pair with a 12mm for large-format tiles 600mm+',
      'Notches blunt over time — replace every 12-18 months on heavy use',
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
    price: 89.98,
    rating: 4.5,
    reviewCount: 9596,
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
    price: 6.5,
    rating: 4.3,
    reviewCount: 669,
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
    reviewCount: 3388,
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
  // ─── Re-added 2026-05-09 from Apify Amazon data ───
  // Title, price, rating, description, specs come from the live Amazon listing.
  // Pros/cons are Brandon-voice (carried from prior entries where present).
  {
    slug: 'sigma-2g-37cm-tile-cutter',
    name: 'Sigma 6054137 Art. Tile Cutter 2 G',
    shortName: 'Sigma 2G 37cm',
    category: 'Tile Cutters',
    price: 124.32,
    rating: 4.6,
    reviewCount: 564,
    image: '/images/products/sigma-2g-37cm-tile-cutter.jpg',
    description:
      'The Sigma 2G Tile Cutter is a manual tile cutter that has been designed to cut a range of tiles up to 15mm thick. The tungsten carbide scoring wheels on the Sigma 2G Tile Cutter scores the tile by pulling the breaker along the surface of the tile.',
    specs: {
      'Cutting Length': '37 cm',
      'Max Thickness': '15 mm',
      Construction: 'Aluminium',
      'Scoring Wheel': 'Tungsten carbide',
      Brand: 'Sigma',
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
    name: 'DEWALT DCD240X2-GB XR Flexvolt Brushless Paddle Mixer, 54 V, Multi-Colour',
    shortName: 'DEWALT DCD240X2',
    category: 'Mixing Tools',
    price: 532,
    rating: 4.4,
    reviewCount: 43,
    image: '/images/products/dewalt-dcd240x2-paddle-mixer.jpg',
    description:
      'DEWALT 54V FLEXVOLT cordless paddle mixer for plaster, mortar, adhesive and screed up to 25 litres. M14 threaded connector (industry standard), all-metal heavy cycle gear, ergonomic handle, 5 electronic speed settings (300–725 rpm).',
    specs: {
      'Colour': 'Multi-colour',
      'Product dimensions': '45D x 64W x 25H centimetres',
      'Material': 'Metal',
      'Capacity': '25 litres',
      'Voltage': '54 Volts',
      'Wattage': '2000 watts',
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
    name: 'Tool Depot® 400pcs Tile Levelling System, 2mm 300 Pcs Tile Spacers Levelling Clips and 100 Pcs Reusable Wedges with Pliers - Tile Tools Set (2mm Kit)',
    shortName: 'Tool Depot 400-pc MLT',
    category: 'Tile Levelling',
    price: 10.47,
    rating: 4.6,
    reviewCount: 26,
    image: '/images/products/tool-depot-mlt-400-levelling-system.jpg',
    description:
      '400-piece tile levelling system for 2mm joints — 300 reusable clips + 100 reusable wedges + pliers. Holds tiles flush during set so you avoid lipping on large-format floors.',
    specs: {
      Pack: '300 clips + 100 wedges + pliers',
      'Joint Width': '2 mm',
      'Reusable Parts': 'Wedges + pliers',
      'Single-use': 'Clips (snap off after set)',
      Brand: 'Tool Depot',
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
    name: 'Vitrex VIT102013 102013 Essential Tile Spacers 3mm Pack of 400, White',
    shortName: 'Vitrex 3mm × 400',
    category: 'Tile Spacers',
    price: 6.78,
    rating: 4.4,
    reviewCount: 596,
    image: '/images/products/vitrex-3mm-tile-spacers-400pk.jpg',
    description:
      'Vitrex Essential 3mm cross tile spacers — pack of 400, white, in a resealable bag. T-shape for use on internal corners. Trade-default for 3mm joints on most UK domestic kitchen and bathroom floors.',
    specs: {
      Size: '3 mm',
      Pack: '400 pieces',
      Shape: 'Cross + T-shape',
      Colour: 'White',
      Brand: 'Vitrex',
      Packaging: 'Resealable bag',
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
    name: 'OX Pro 12mm Notch Trowel',
    shortName: 'OX Pro 12mm Trowel',
    category: 'Trowels',
    price: 8.99,
    rating: 4.6,
    reviewCount: 338,
    image: '/images/products/ox-pro-12mm-notch-trowel.jpg',
    description:
      'OX Pro 12mm square-notch tile trowel — high-quality carbon steel blade on an aluminium shank with a soft DuraGrip handle. The 12mm notch is the right size for spreading adhesive on large-format tiles 600mm+.',
    specs: {
      'Material': 'Aluminium, High Carbon Steel',
      'Colour': 'Multi-colour',
      'Item dimensions L x W x H': '9 x 12 x 39 centimetres',
      'Item weight': '0.4 Kilograms',
      'Style': 'Work',
      'Handle material': 'Aluminium',
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
    name: 'E-cloth Bathroom Cleaning - 2 cloths',
    shortName: 'E-Cloth Bathroom',
    category: 'Tile Cleaners',
    price: 9.7,
    rating: 4.6,
    reviewCount: 917,
    image: '/images/products/e-cloth-bathroom-cleaning-pack.jpg',
    description:
      'A 2-cloth bathroom kit — one bathroom microfibre, one glass / polishing cloth. Removes soap scum, grime, scale and over 99% of bacteria using just water — no chemicals required. 100-wash / 1-year manufacturer guarantee.',
    specs: {
      Pack: '2 cloths',
      Material: 'Microfibre',
      Use: 'Bathroom + glass / polishing',
      Guarantee: '100 washes / 1 year',
      Brand: 'E-Cloth',
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
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.eclothBathroom,
    featured: false,
  },

  {
    slug: 'lithofin-fz-intensive-cleaner-1l',
    name: 'Lithofin FZ Intensive Cleaner 1L For Porcelain Tiles',
    shortName: 'Lithofin FZ',
    category: 'Tile Cleaners',
    price: 22.99,
    rating: 4.3,
    reviewCount: 148,
    image: '/images/products/lithofin-fz-intensive-cleaner-1l.jpg',
    description:
      'Concentrated, high-alkaline cleaner for porcelain tiles. Removes engrained dirt, grease, oil and care-product residue. Goes-to product for builder\'s clean and stripping built-up sealer before resealing. Mainland UK delivery only.',
    specs: {
      'Item form': 'Liquid',
      'Scent': 'Unscented',
      'Specific uses for product': 'Grout',
      'Material feature': 'Natural',
      'Item volume': '1000 Millilitres',
      'Unit count': '1000.0 millilitre',
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
    name: 'ToughBuilt - Gelfit ™ Knee Pad - Comfortable Gel Cushion with Strong Adjustable Straps, Heavy Duty - (TB-KP-G203-UK)',
    shortName: 'ToughBuilt Snap-Shell',
    category: 'Knee Pads',
    price: 67.1,
    rating: 4.7,
    reviewCount: 3,
    image: '/images/products/toughbuilt-gelfit-snap-shell-knee-pads.jpg',
    description:
      'ToughBuilt GelFit knee pads with the patented SnapShell system — the hard non-marring shell unclips to swap for different work surfaces. Gel + foam cushion, EVA elastic leg straps, high side walls reduce twist.',
    specs: {
      Model: 'TB-KP-G203-UK',
      Cushion: 'Gel + foam',
      Shell: 'Non-marring SnapShell (interchangeable)',
      Straps: 'EVA elastic, adjustable',
      Brand: 'ToughBuilt',
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
    affiliateUrl: affiliateLinks.toughbuiltSnapShell,
    featured: false,
  },

  {
    slug: 'faithfull-faimp100-mixing-paddle',
    name: 'Faithfull FAIMP100 Mixing Paddle 100MM',
    shortName: 'Faithfull FAIMP100',
    category: 'Mixing Tools',
    price: 13.2,
    rating: 4.6,
    reviewCount: 3388,
    image: '/images/products/faithfull-faimp100-mixing-paddle.jpg',
    description:
      'Faithfull FAIMP100 mixing paddle, 100mm helical head on a 600mm shaft. For mixing plaster, render, paint, adhesives, mortar, paste and screed (10–20 kg batches). Use with a 13mm (1/2") chuck power drill of at least 600 W. 5-year manufacturer guarantee.',
    specs: {
      'Size': '100mm Diameter with a 600mm Shaft',
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
    badge: 'Best Value',
    affiliateUrl: affiliateLinks.faithfullPaddle100,
    featured: false,
  },

  {
    slug: 'ketoplastics-26l-flexi-tub-pack-of-5',
    name: 'Pack Of 5-26 litre Flexi Tub/Bucket/Trug/Gorilla Bucket Made In U.K.(Made In The UK) By KetoPlastics',
    shortName: 'KetoPlastics 26L × 5',
    category: 'Mixing Buckets',
    price: 21.99,
    rating: 4.6,
    reviewCount: 239,
    image: '/images/products/ketoplastics-26l-flexi-tub-pack-of-5.jpg',
    description:
      'They are great for ALSORTS of jobs around the garden and home. With Uses such as toy boxes, laundry baskets, storage containers, plaster mixing as well as for odd jobs around the garden.',
    specs: {
      'Colour': 'Multicolour',
      'Material': 'Plastic',
      'Capacity': '26 litres',
      'Handle material': 'Plastic',
      'Shape': 'Round',
      'With lid': 'No',
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
