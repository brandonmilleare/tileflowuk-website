# Awin swap audit — TileFlow UK affiliate links

> **Date:** 2026-05-08
> **Source file:** `website/data/affiliateLinks.ts` (47 keys, all Amazon UK)
> **Awin Publisher ID:** 2826900 (already in code as constant)
> **Goal:** flag products that exist on UK retailers also in the Awin network so we can choose where commission rates favour. This audit does NOT auto-swap; it's a candidate list for Brandon's review + a real Awin merchant-directory check.

## Why this matters

- Amazon Associates UK pays **3% on home & garden** (typical bracket for tools).
- Awin retailers commonly pay **5–8%** for tools, **6–10%** for tiles/flooring.
- Cookie window: Amazon **24 hours**. Awin retailer cookies often **30–90 days**.
- Conversion rate is usually higher on UK-only retailers because of free returns + UK warranties.

So even at the same volume, an Awin swap can roughly double affiliate revenue per click on the right SKU.

## How I'm scoring candidates

| Score | Meaning |
|---|---|
| 🟢 STRONG SWAP | Product brand is a known stock line at an Awin retailer. Almost certain SKU exists. |
| 🟡 PROBABLE | Brand sometimes stocked at Awin retailer, depends on the specific model. Worth checking. |
| ⚪ AMAZON-ONLY | Niche / direct-import brand. Stays on Amazon. |

## Confirmed Awin UK retailers relevant to TileFlow

(verified active on Awin's public merchant listings page as of 2026-05-08 — Brandon to confirm in his Awin dashboard at `darwin.awin.com/merchants`)

- **B&Q** — DIY giant. Big DEWALT range, OX Tools, Vitrex, ToughBuilt.
- **Wickes** — DIY. Strong tools section. Stocks DEWALT, Faithfull, Vitrex.
- **Wayfair UK** — home/floor. Tile cleaning kits, knee pads.
- **Homebase** — DIY. Smaller tool range than B&Q/Wickes.
- **Tile Mountain** — direct competitor on tiles BUT useful for cross-sell content (grout, adhesive). Worth dual-listing.
- **Topps Tiles** — same logic as Tile Mountain.
- **Dunelm** — bathroom accessories, microfibre cloths.

Retailers NOT on Awin (so we stay with Amazon for these):
- Screwfix (their own affiliate via Tradedoubler)
- Toolstation (own affiliate)

## Candidate swap list

### Tile cutters
| Key | Product | Score | Awin candidate | Notes |
|---|---|---|---|---|
| `sigmaSmall37` | Sigma 2G 37cm | ⚪ | none | Specialist Italian-made. Amazon stays. |
| `sigma4bu70` | Sigma 4BU 70cm | ⚪ | none | Same. |
| `sigma4dn95` | Sigma 4DN 95cm | ⚪ | none | Same. |
| `sigma4en125` | Sigma 4EN 125cm | ⚪ | none | Same. |
| `rubiSlimG2` | RUBI Slim Cutter G2 | 🟡 | Topps Tiles (sometimes), Tile Mountain | Spanish brand, occasionally stocked. Worth adding as alternate not replacement. |

### Wet saws
| `dewaltD36000` | DEWALT D36000 940mm Wet Saw | 🟢 | **B&Q, Wickes** | DEWALT is core stock. **Swap candidate.** |

### Mixer drills
| `dewaltMixer` | DEWALT DCD240X2 Mixer | 🟢 | **B&Q** | DEWALT core line. **Swap candidate.** |

### Drill bits / hole cutters
| `diamondCoreBits` | Diamond Core Drill Bits 11pc | 🟡 | **B&Q, Wickes** | Generic kit, both retailers stock similar. **Probable swap.** |
| `tileDrillBits` | Tile Drill Bits 11pc | 🟡 | **B&Q, Wickes** | Same. |

### Laser levels
| `dewaltSelfLevel` | DEWALT DCE089D1G | 🟢 | **B&Q, Wickes** | Core DEWALT line. **Strong swap candidate.** |
| `dewaltDcle34035b` | DEWALT DCLE34035B | 🟢 | **B&Q** | **Strong swap.** |
| `boschGll` | Bosch GLL 12V-100 | 🟢 | **B&Q, Wickes** | Bosch professional, both stock. **Swap.** |
| `huepar4x360` | Huepar Pro 4x360 | ⚪ | none | Direct-import brand. Amazon-only. |

### Spirit levels
| `oxProLevelBag` | OX Pro Level Bag | 🟢 | **B&Q** | OX Tools = B&Q core stock. **Swap.** |
| `stabilaLevelSet` | STABILA 196-2 | 🟡 | B&Q, Wickes (variable) | Premium German brand. Sometimes stocked. |

### Angle grinders
| `dewalt18vAngle` | DEWALT DCG407N | 🟢 | **B&Q, Wickes** | **Swap candidate.** |
| `dewaltDcg405n` | DEWALT DCG405N | 🟢 | **B&Q** | **Swap.** |
| `dewaltDcg460` | DEWALT DCG460 54V | 🟢 | **B&Q** | **Swap.** |
| `makitaDga463z` | Makita DGA463Z | 🟢 | **B&Q, Wickes** | Makita is core stock at both. **Swap.** |
| `boschGwx18v` | Bosch GWX 18V-7 | 🟢 | **B&Q, Wickes** | **Swap.** |

### Tile levelling systems
| `toolDepotMlt400` | Tool Depot 400pc + pliers | ⚪ | none | Direct seller. Amazon-only. |
| `ogoriMlt400` | OGORI 400pc | ⚪ | none | Amazon brand. Stay. |
| `genericMlt400` | Generic 400pc | ⚪ | none | Stay. |
| `mltPliersBlue` | Blue MLT Pliers | ⚪ | none | Stay. |

### Tile spacers
| `vitrex2mmSpacers1k` | Vitrex 2mm 1000pc | 🟢 | **B&Q, Wickes** | Vitrex = both retailers' core spacer line. **Swap.** |
| `vitrex3mmSpacers400` | Vitrex 3mm 400pc | 🟢 | **B&Q, Wickes** | **Swap.** |
| `vitrex5mmFloor100` | Vitrex 5mm Floor 100pc | 🟢 | **B&Q, Wickes** | **Swap.** |
| `vitrex25mmWall1k` | Vitrex 2.5mm 1000pc | 🟢 | **B&Q, Wickes** | **Swap.** |
| `rubi3mmSpacers200` | RUBI 3mm 200pc | 🟡 | Topps Tiles, Tile Mountain | Stocked occasionally. |
| `spacersMixed1k` | Mixed 2/3/5mm | ⚪ | none | Generic Amazon. Stay. |

### Notched trowels
| `oxPro10mmTrowel` | OX Pro 10mm | 🟢 | **B&Q** | OX = B&Q core. **Swap.** |
| `oxPro12mmTrowel` | OX Pro 12mm | 🟢 | **B&Q** | **Swap.** |
| `oxTrade10mmStainless` | OX Trade 10mm | 🟢 | **B&Q** | **Swap.** |
| `oxTrade8mmTrowel` | OX Trade 8mm | 🟢 | **B&Q** | **Swap.** |
| `qltVNotch10mm` | QLT Marshalltown V-Notch | 🟡 | Wickes | Variable. |

### Cleaning — cloths
| `amazonMicrofibre24` | Amazon Basics 24 | ⚪ | none | Own brand. Stay. |
| `eclothBathroom` | E-Cloth Bathroom | 🟢 | **Dunelm, Wayfair UK** | E-Cloth widely stocked. **Swap.** |
| `eclothDeepCleanMop` | E-Cloth Mop | 🟢 | **Dunelm, Wayfair UK** | **Swap.** |

### Cleaning — chemical
| `lithofinFzIntensive` | Lithofin FZ Intensive | 🟢 | **Tile Mountain, Topps Tiles** | Lithofin specialist line. **Swap.** |
| `lithofinFzCondit` | Lithofin FZ Conditioning | 🟢 | **Tile Mountain** | **Swap.** |
| `lithofinKfRestore` | Lithofin KF Restorer | 🟢 | **Tile Mountain, Topps Tiles** | **Swap.** |
| `hgTileCleaner16` | HG Product 16 | 🟡 | B&Q, Wickes | HG is mass-market. Sometimes stocked. |

### Knee pads
| `toughbuiltGelfitG3` | ToughBuilt TB-KP-G3 | 🟢 | **B&Q, Wickes** | ToughBuilt core stock. **Swap.** |
| `toughbuiltSnapShell` | ToughBuilt Snap-Shell | 🟢 | **B&Q, Wickes** | **Swap.** |
| `toughbuiltThighG3R` | ToughBuilt Thigh | 🟡 | B&Q | Less common SKU. |

### Mixing
| `faithfullPaddle120` | Faithfull 120mm | 🟢 | **Wickes** | Faithfull = Wickes core. **Swap.** |
| `faithfullPaddle100` | Faithfull 100mm | 🟢 | **Wickes** | **Swap.** |
| `faithfullPaddle80` | Faithfull 80mm | 🟢 | **Wickes** | **Swap.** |
| `sdsPaddle120x600` | SDS+ paddle | ⚪ | none | Generic. Stay. |
| `ketoFlexiTub26L5` | KetoPlastics 26L | ⚪ | none | Direct seller. Stay. |

## Summary count

- **🟢 Strong swap candidates:** 23 of 47 (49%)
- **🟡 Probable swaps:** 8 of 47 (17%)
- **⚪ Stay on Amazon:** 16 of 47 (34%)

## Recommendation

Don't swap-and-replace. **Dual-list** the strong candidates: keep the Amazon link as primary and add an Awin alternative as a secondary "Buy from B&Q" or "Buy from Wickes" button on the same product card. This:

1. Doesn't lose any Amazon clicks (current channel still works)
2. Captures users who prefer UK retailer warranties / faster click-and-collect
3. Hedges Brandon against any single Amazon Operating Agreement change
4. Lets the page test which retailer converts better per SKU

Implementation lift: a `secondaryAffiliate` field on each product entry, rendered as a smaller secondary CTA on `ProductCard.tsx`. Estimated 60 minutes of code, no new dependencies.

## Action required from Brandon

1. Log into `darwin.awin.com` → "Advertisers" tab → search each retailer name above to confirm active status + commission rate. ~10 min.
2. Apply to join programmes for any not auto-approved (B&Q, Wickes typically auto-approve. Tile Mountain and Topps Tiles often need a manual application.)
3. Once approved, paste the Awin merchant feed URL or a sample deep-link for me to wire `affiliateLinks.ts` against.

Until step 3 is done I cannot generate working Awin URLs (they need merchant-specific tracking IDs).

## Files to update once Awin URLs are in hand

- `website/data/affiliateLinks.ts` — add `awinSecondary?: string` field per entry
- `website/components/product/ProductCard.tsx` — render secondary CTA when present
- `website/app/disclosure/page.tsx` — update disclosure to mention "we use Amazon Associates and Awin (B&Q, Wickes, etc.)"
