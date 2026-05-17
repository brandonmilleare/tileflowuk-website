/**
 * preview-shop-products.ts
 *
 * Maps the 23 Apify-sourced preview-products into the full Product shape used
 * by /shop. Lets the main products array stay clean while we promote real
 * Amazon-fetched data to the live shop.
 *
 * Why a separate file:
 *   - keeps the Amazon-sourced records visibly separate from Brandon's own
 *     hand-written reviews (sigma, dewalt etc.)
 *   - makes it easy to roll back if any specific listing needs pulling
 *   - regenerable from preview-products.ts (which is regenerable from Apify
 *     sidecars via scripts/products/build-preview-data.mjs)
 *
 * What gets dropped:
 *   - mapeker-rapid-flex-adhesive — image was unobtainable from Apify; will be
 *     promoted manually once a SiteStripe image is fetched.
 */

import type { Product, ProductCategory } from './products'
import { previewProducts } from './preview-products'

function categoryMap(c: string): ProductCategory {
  if (c === 'Prep') return 'Prep'
  if (c === 'Adhesives') return 'Adhesives'
  return 'Application Tools'
}

function buildShortName(title: string, brand: string): string {
  // Strip pack sizes, units, and trailing parentheticals so the card stays readable.
  const cleaned = title
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+\d+\s*(kg|g|ml|L|cm|mm|m|pack|pcs|pieces)\b.*$/i, '')
    .replace(/\s+-\s+.*$/, '')
    .trim()
  if (cleaned.length > 36) {
    return brand ? `${brand} ${cleaned.split(' ').slice(1, 4).join(' ')}` : cleaned.slice(0, 36)
  }
  return cleaned
}

export const previewShopProducts: Product[] = previewProducts
  // Mapeker sidecar has no image — skip from live shop until manually fixed.
  .filter(p => Boolean(p.image))
  .map(p => ({
    slug: p.slug,
    name: p.title,
    shortName: buildShortName(p.title, p.brand),
    category: categoryMap(p.category),
    price: p.price,
    rating: p.rating,
    reviewCount: p.reviewCount,
    image: p.image,
    description: p.description,
    // No structured specs from Apify; leaving empty avoids fabrication.
    specs: {},
    // Treat manufacturer feature claims as pros (factual, not invented).
    pros: p.features.slice(0, 4),
    // No fabricated cons — Brandon adds these manually if/when he reviews.
    cons: [],
    affiliateUrl: p.affiliateUrl,
    featured: false,
  }))
