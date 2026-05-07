/**
 * TileFlow UK — Centralised Affiliate Link Config
 * All amzn.to links have tileflowuk-21 tag embedded (verified).
 * All links: rel="nofollow sponsored" target="_blank"
 */

export const AMAZON_TAG = 'tileflowuk-21'
export const AWIN_PUBLISHER_ID = '2826900'

/**
 * Append UTM parameters for attribution tracking.
 * Works on both direct amazon.co.uk URLs and amzn.to short URLs
 * (amzn.to preserves query string through the redirect).
 */
export function withUtm(
  url: string,
  opts: { source?: string; medium?: string; campaign?: string; content?: string } = {},
): string {
  const source = opts.source ?? 'pinterest'
  const medium = opts.medium ?? 'pin'
  const campaign = opts.campaign ?? 'tileflowuk'
  const sep = url.includes('?') ? '&' : '?'
  let qs = `utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`
  if (opts.content) qs += `&utm_content=${encodeURIComponent(opts.content)}`
  return `${url}${sep}${qs}`
}

export function amazonUrl(asin: string, utm?: Parameters<typeof withUtm>[1]): string {
  const base = `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`
  return utm ? withUtm(base, utm) : base
}

export const affiliateLinks = {
  // Tile Cutters
  sigmaSmall37:   'https://amzn.to/4dC0yss',   // Sigma 2G 37cm — best for metros
  sigma4bu70:     'https://amzn.to/4tvyV8X',   // Sigma 4BU 70cm
  sigma4dn95:     'https://amzn.to/4dvM39w',   // Sigma 4DN 95cm
  sigma4en125:    'https://amzn.to/4vnXHKc',   // Sigma 4EN 125cm
  rubiSlimG2:     'https://amzn.to/4snQPtp',   // RUBI Slim Cutter G2

  // Wet Saws
  dewaltD36000:   'https://amzn.to/4vnDt3a',   // DEWALT DEWD36000 940mm Wet Saw

  // Mixer Drills
  dewaltMixer:    'https://amzn.to/4bZWgde',   // DEWALT DCD240X2 XR Flexvolt Paddle Mixer

  // Drill Bits / Hole Cutters
  diamondCoreBits: 'https://amzn.to/4bY8EKJ',  // Diamond Core Drill Bits Set 11pcs
  tileDrillBits:   'https://amzn.to/4msx5DB',  // Tile Drill Bits Kit 11pcs

  // Laser Levels
  dewaltSelfLevel:  'https://amzn.to/4vhMDOv', // DEWALT DCE089D1G 3x360 Green 12V
  dewaltDcle34035b: 'https://amzn.to/41UnsUF', // DEWALT DCLE34035B 18V 3x360 Remote
  boschGll:         'https://amzn.to/4mgznWt', // Bosch GLL 12V-100-33 CG
  huepar4x360:      'https://amzn.to/4cxxDVj', // Huepar Pro 4x360

  // Spirit Levels
  oxProLevelBag:  'https://amzn.to/4txJxEl',   // OX Pro Level Bag (1800/1200/600mm)
  stabilaLevelSet: 'https://amzn.to/4e5LOlK',  // STABILA 196-2 Dark Shadow 183cm/40cm

  // Angle Grinders
  dewalt18vAngle: 'https://amzn.to/4ccqhW5',   // DEWALT DCG407N 18V 125mm (tool only)
  dewaltDcg405n:  'https://amzn.to/3OdHKW6',   // DEWALT DCG405N 18V with 2x5Ah
  dewaltDcg460:   'https://amzn.to/4ctEqzn',   // DEWALT DCG460 54V FLEXVOLT 230mm
  makitaDga463z:  'https://amzn.to/3PWwn5s',   // Makita DGA463Z 18V 115mm
  boschGwx18v:    'https://amzn.to/4vhO8ft',   // Bosch GWX 18V-7 125mm

  // ─── Added 2026-05-07: Amazon UK research batch ───
  // Tile Levelling Systems
  toolDepotMlt400:    'https://www.amazon.co.uk/dp/B0CXWLTZJ7?tag=tileflowuk-21', // Tool Depot 400pc Levelling System 2mm + pliers (£10.47)
  ogoriMlt400:        'https://www.amazon.co.uk/dp/B07V6DS51Y?tag=tileflowuk-21', // OGORI 400pc Levelling System (£21.99)
  genericMlt400:      'https://www.amazon.co.uk/dp/B08P54N6F1?tag=tileflowuk-21', // Generic 400pc Levelling System (£20.95)
  mltPliersBlue:      'https://www.amazon.co.uk/dp/B07T97LJJB?tag=tileflowuk-21', // Blue Pliers for Levelling System (£13.45)

  // Tile Spacers
  vitrex2mmSpacers1k: 'https://www.amazon.co.uk/dp/B00NVK3SV4?tag=tileflowuk-21', // Vitrex 2mm Cross Spacers Pack 1000
  vitrex3mmSpacers400:'https://www.amazon.co.uk/dp/B00CQMGQ62?tag=tileflowuk-21', // Vitrex 3mm Cross Spacers Pack 400
  vitrex5mmFloor100:  'https://www.amazon.co.uk/dp/B0001P15NU?tag=tileflowuk-21', // Vitrex 5mm Floor Spacers Pack 100
  vitrex25mmWall1k:   'https://www.amazon.co.uk/dp/B0001P15MG?tag=tileflowuk-21', // Vitrex 2.5mm Wall Spacers Pack 1000
  rubi3mmSpacers200:  'https://www.amazon.co.uk/dp/B00IMPS80E?tag=tileflowuk-21', // RUBI 3mm Cross Spacers Pack 200 (£5.66)
  spacersMixed1k:     'https://www.amazon.co.uk/dp/B08LNCLT1G?tag=tileflowuk-21', // 1000pcs mixed 2/3/5mm Spacers (£9.69)

  // Notched Trowels
  oxPro10mmTrowel:    'https://www.amazon.co.uk/dp/B075SJ7XGW?tag=tileflowuk-21', // OX Pro 10mm Notch Trowel
  oxPro12mmTrowel:    'https://www.amazon.co.uk/dp/B075SHLBFN?tag=tileflowuk-21', // OX Pro 12mm Notch Trowel
  oxTrade10mmStainless:'https://www.amazon.co.uk/dp/B09KKV8C34?tag=tileflowuk-21',// OX Trade Stainless 10mm Trowel
  oxTrade8mmTrowel:   'https://www.amazon.co.uk/dp/B08BZV8WRX?tag=tileflowuk-21', // OX Trade 8mm Trowel
  qltVNotch10mm:      'https://www.amazon.co.uk/dp/B000N6K768?tag=tileflowuk-21', // QLT Marshalltown V-Notch 10mm

  // Cleaning — Cloths + Sponges
  amazonMicrofibre24: 'https://www.amazon.co.uk/dp/B009FUF6DM?tag=tileflowuk-21', // Amazon Basics Microfibre Cloths Pack 24
  eclothBathroom:     'https://www.amazon.co.uk/dp/B001MJTKBI?tag=tileflowuk-21', // E-Cloth Bathroom Pack
  eclothDeepCleanMop: 'https://www.amazon.co.uk/dp/B003WKSTJY?tag=tileflowuk-21', // E-Cloth Deep Clean Mop

  // Cleaning — Chemical
  lithofinFzIntensive:'https://www.amazon.co.uk/dp/B00169BSJQ?tag=tileflowuk-21', // Lithofin FZ Intensive Cleaner 1L
  lithofinFzCondit:   'https://www.amazon.co.uk/dp/B004Y4GXWC?tag=tileflowuk-21', // Lithofin FZ Conditioning Cleaner 1L
  lithofinKfRestore:  'https://www.amazon.co.uk/dp/B001T07P44?tag=tileflowuk-21', // Lithofin KF Tile Restorer 1L (£23.35)
  hgTileCleaner16:    'https://www.amazon.co.uk/dp/B000IU3VXU?tag=tileflowuk-21', // HG Tile Cleaner Product 16 1L (£6.50)

  // Knee Pads
  toughbuiltGelfitG3: 'https://www.amazon.co.uk/dp/B0140V9LWC?tag=tileflowuk-21', // ToughBuilt TB-KP-G3 GELFIT Knee Pads
  toughbuiltSnapShell:'https://www.amazon.co.uk/dp/B09S5DZ8X8?tag=tileflowuk-21', // ToughBuilt GelFit Snap-Shell
  toughbuiltThighG3R: 'https://www.amazon.co.uk/dp/B08W7T9H9C?tag=tileflowuk-21', // ToughBuilt GelFit Thigh Support

  // Mixing — Paddles + Buckets
  faithfullPaddle120: 'https://www.amazon.co.uk/dp/B0001IWPYA?tag=tileflowuk-21', // Faithfull FAIMP120 Paddle 120mm
  faithfullPaddle100: 'https://www.amazon.co.uk/dp/B0001IWPA4?tag=tileflowuk-21', // Faithfull FAIMP100 Paddle 100mm
  faithfullPaddle80:  'https://www.amazon.co.uk/dp/B0001IWP9U?tag=tileflowuk-21', // Faithfull FAIMP80 Paddle 80mm
  sdsPaddle120x600:   'https://www.amazon.co.uk/dp/B0F7XSF7Z6?tag=tileflowuk-21', // SDS+ Mixing Paddle 120x600mm
  ketoFlexiTub26L5:   'https://www.amazon.co.uk/dp/B002GCRQH0?tag=tileflowuk-21', // KetoPlastics 26L Flexi Tub Pack 5
} as const

export type AffiliateKey = keyof typeof affiliateLinks
