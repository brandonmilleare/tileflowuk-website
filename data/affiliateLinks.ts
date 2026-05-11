/**
 * TileFlow UK — Centralised Affiliate Link Config
 * All links are direct amazon.co.uk/dp/<ASIN>?tag=tileflowuk-21 (no amzn.to short links).
 * Why: TikTok/Instagram in-app webviews can strip cookies on amzn.to redirects, losing the affiliate tag.
 *      Direct URLs preserve the tag reliably across all browsers + webviews.
 * All links: rel="nofollow sponsored" target="_blank"
 */

export const AMAZON_TAG = 'tileflowuk-21'
export const AWIN_PUBLISHER_ID = '2826900'

/**
 * Append UTM parameters for attribution tracking.
 * Works on direct amazon.co.uk URLs (we no longer use amzn.to short links).
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
  sigmaSmall37:   'https://www.amazon.co.uk/dp/B00BBBBCM2?tag=tileflowuk-21',   // Sigma 2G 37cm — best for metros
  sigma4bu70:     'https://www.amazon.co.uk/dp/B0BSXR5JNM?tag=tileflowuk-21',   // Sigma 4BU 70cm
  sigma4dn95:     'https://www.amazon.co.uk/dp/B0BSXQG3WQ?tag=tileflowuk-21',   // Sigma 4DN 95cm
  sigma4en125:    'https://www.amazon.co.uk/dp/B0BSXPRPH8?tag=tileflowuk-21',   // Sigma 4EN 125cm
  rubiSlimG2:     'https://www.amazon.co.uk/dp/B0CQK55C9X?tag=tileflowuk-21',   // RUBI Slim Cutter G2

  // Wet Saws
  dewaltD36000:   'https://www.amazon.co.uk/dp/B099X8BT8F?tag=tileflowuk-21',   // DEWALT DEWD36000 940mm Wet Saw

  // Mixer Drills
  dewaltMixer:    'https://www.amazon.co.uk/dp/B079NH3YCN?tag=tileflowuk-21',   // DEWALT DCD240X2 XR Flexvolt Paddle Mixer

  // Drill Bits / Hole Cutters
  diamondCoreBits: 'https://www.amazon.co.uk/dp/B0CDWZ36K3?tag=tileflowuk-21',  // Diamond Core Drill Bits Set 11pcs
  tileDrillBits:   'https://www.amazon.co.uk/dp/B0CF1MDPPQ?tag=tileflowuk-21',  // Tile Drill Bits Kit 11pcs

  // Laser Levels
  dewaltSelfLevel:  'https://www.amazon.co.uk/dp/B016QUEA2G?tag=tileflowuk-21', // DEWALT DCE089D1G 3x360 Green 12V
  dewaltDcle34035b: 'https://www.amazon.co.uk/dp/B0DMPCBK6F?tag=tileflowuk-21', // DEWALT DCLE34035B 18V 3x360 Remote
  boschGll:         'https://www.amazon.co.uk/dp/B0DV9J2GVF?tag=tileflowuk-21', // Bosch GLL 12V-100-33 CG
  huepar4x360:      'https://www.amazon.co.uk/dp/B0CX4XC397?tag=tileflowuk-21', // Huepar Pro 4x360

  // Spirit Levels
  oxProLevelBag:  'https://www.amazon.co.uk/dp/B01JUEZ6Z0?tag=tileflowuk-21',   // OX Pro Level Bag (1800/1200/600mm)
  stabilaLevelSet: 'https://www.amazon.co.uk/dp/B0GMKVB8MT?tag=tileflowuk-21',  // STABILA 196-2 Dark Shadow 183cm/40cm

  // Angle Grinders
  dewalt18vAngle: 'https://www.amazon.co.uk/dp/B0F9LG2N1B?tag=tileflowuk-21',   // DEWALT DCG407N 18V 125mm (tool only)
  dewaltDcg405n:  'https://www.amazon.co.uk/dp/B0BB2SJNFN?tag=tileflowuk-21',   // DEWALT DCG405N 18V with 2x5Ah
  dewaltDcg460:   'https://www.amazon.co.uk/dp/B0CFXM3RXY?tag=tileflowuk-21',   // DEWALT DCG460 54V FLEXVOLT 230mm
  makitaDga463z:  'https://www.amazon.co.uk/dp/B01LW2MQGG?tag=tileflowuk-21',   // Makita DGA463Z 18V 115mm
  boschGwx18v:    'https://www.amazon.co.uk/dp/B0BYT1521B?tag=tileflowuk-21',   // Bosch GWX 18V-7 125mm

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

  // ── Pending Review — added 2026-05-11 from best-sellers research, awaiting Brandon's categorisation
  procutS600:           'https://www.amazon.co.uk/dp/B0BMM9SRML?tag=tileflowuk-21', // ProCut S 600 600mm Tile Cutter (£124.68)
  aiGearContourGauge:   'https://www.amazon.co.uk/dp/B084Y8NQWB?tag=tileflowuk-21', // AI Gear 10in Contour Gauge (£15.99)
  amtechTileNipper:     'https://www.amazon.co.uk/dp/B008PQCLJE?tag=tileflowuk-21', // Amtech S4435 Tile Nipper (£7.97)
  ezarc115mmDiscs:      'https://www.amazon.co.uk/dp/B09KNMBF5K?tag=tileflowuk-21', // EZARC 115mm Diamond Discs 2pk (£17.97)
  zenoSpiritLevel3Set:  'https://www.amazon.co.uk/dp/B0DMT4BVSF?tag=tileflowuk-21', // ZENO Spirit Level 3 Set 300/600/1000mm (£21.95)
  flintronic80pcLevel:  'https://www.amazon.co.uk/dp/B0CY8F8VLJ?tag=tileflowuk-21', // Flintronic 80pc Tile Levelling System (£8.49)
  shafferPro4mmLevel:   'https://www.amazon.co.uk/dp/B0CWY1GL15?tag=tileflowuk-21', // SHAFFER PRO 4mm Levelling 200+100 (£35.89)
  levellingSys400pc3mm: 'https://www.amazon.co.uk/dp/B0D25JMW2Z?tag=tileflowuk-21', // 400pc 3mm Tile Levelling System (£20.95)
  amtechGroutFloat:     'https://www.amazon.co.uk/dp/B0096AWHKG?tag=tileflowuk-21', // Amtech Tile Grout Float 24x10cm (£8.95)
  siliconeRemover5in1:  'https://www.amazon.co.uk/dp/B09716NPDG?tag=tileflowuk-21', // 5-in-1 Silicone Remover & Finishing Tool (£5.99)
  ob1ClearSealant290:   'https://www.amazon.co.uk/dp/B08DD3LHFB?tag=tileflowuk-21', // OB1 Clear Sealant 290ml (£8.13)
  rubi5mmWedges250pk:   'https://www.amazon.co.uk/dp/B00IMPRSK0?tag=tileflowuk-21', // RUBI 5mm Tile Wedges 250pk (price TBD — Playwright queued)
  bluePaintersTape4r:   'https://www.amazon.co.uk/dp/B0CYBM99N7?tag=tileflowuk-21', // 4 Rolls Blue Masking Tape 50m x 24mm (£7.99)
  frogtapeGreenMulti:   'https://www.amazon.co.uk/dp/B0FVFTR77B?tag=tileflowuk-21', // Frog Tape Green Multi Surface 36mm x 55m (£6.84)
  vitrexTileWashFloat:  'https://www.amazon.co.uk/dp/B000C74YBM?tag=tileflowuk-21', // Vitrex 10 2915 Tile Wash Float (£8.00)
  vitrexSuperSponge:    'https://www.amazon.co.uk/dp/B009217AHY?tag=tileflowuk-21', // Vitrex PT S001 Super Sponge (£2.72)
} as const

export type AffiliateKey = keyof typeof affiliateLinks
