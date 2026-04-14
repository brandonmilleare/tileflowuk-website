/**
 * TileFlow UK — Centralised Affiliate Link Config
 * Update AMAZON_TAG here and it propagates everywhere.
 * All links: rel="nofollow sponsored" target="_blank"
 */

export const AMAZON_TAG = 'tileflowuk-21'
export const AWIN_PUBLISHER_ID = '2826900'

export function amazonUrl(asin: string): string {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`
}

export function awinUrl(merchantUrl: string): string {
  return `https://www.awin1.com/cread.php?awinmid=MERCHANT_ID&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(merchantUrl)}`
}

/**
 * Amazon product ASINs
 * REPLACE each ASIN with the real one from amazon.co.uk product URL
 * Format: amazon.co.uk/dp/[ASIN]
 */
export const affiliateLinks = {
  // Tile Cutters
  sigma4bu70:     amazonUrl('B09C2B1YHK'),   // REPLACE: Sigma 4BU 70cm
  sigma4dn95:     amazonUrl('B09C2B1YHK'),   // REPLACE: Sigma 4DN 95cm
  sigma4en125:    amazonUrl('B09C2B1YHK'),   // REPLACE: Sigma 4EN 125cm
  rubiRdxa35:     amazonUrl('B09C2B1YHK'),   // REPLACE: RUBI RDXA 35

  // Angle Grinders
  dewalt18vAngle:     amazonUrl('B07FKCB8S8'),  // REPLACE: DEWALT 18V
  dewaltDcg405n:      amazonUrl('B07FKCB8S8'),  // REPLACE: DEWALT DCG405N
  dewaltDcg460:       amazonUrl('B07FKCB8S8'),  // REPLACE: DEWALT DCG460 FLEXVOLT
  makitaDga463z:      amazonUrl('B07FKCB8S8'),  // REPLACE: Makita DGA463Z
  boschGwx18v:        amazonUrl('B07FKCB8S8'),  // REPLACE: Bosch GWX 18V-7

  // Laser Levels
  dewaltDcle34035b:   amazonUrl('B08XYZABC1'),  // REPLACE: DEWALT DCLE34035B
  dewaltSelfLevel:    amazonUrl('B08XYZABC2'),  // REPLACE: DEWALT Self-Levelling
  boschGll:           amazonUrl('B08XYZABC3'),  // REPLACE: Bosch GLL 12V
  huepar4x360:        amazonUrl('B08XYZABC4'),  // REPLACE: Huepar Pro 4×360

  // Wet Saws
  dewaltD36000:       amazonUrl('B08XYZABC5'),  // REPLACE: DEWALT D36000

  // Spirit Levels
  stabilaLevelSet:    amazonUrl('B08XYZABC6'),  // REPLACE: STABILA 196-2
  oxProLevelBag:      amazonUrl('B08XYZABC7'),  // REPLACE: OX Pro Level Bag

  // Drill Bits
  tileDrillBits:      amazonUrl('B08XYZABC8'),  // REPLACE: Tile Drill Bits Kit
} as const

export type AffiliateKey = keyof typeof affiliateLinks
