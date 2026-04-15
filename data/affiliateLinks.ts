/**
 * TileFlow UK — Centralised Affiliate Link Config
 * All amzn.to links have tileflowuk-21 tag embedded (verified).
 * All links: rel="nofollow sponsored" target="_blank"
 */

export const AMAZON_TAG = 'tileflowuk-21'
export const AWIN_PUBLISHER_ID = '2826900'

export function amazonUrl(asin: string): string {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`
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
} as const

export type AffiliateKey = keyof typeof affiliateLinks
