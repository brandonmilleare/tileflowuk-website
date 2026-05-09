/**
 * Dashboard data: latest affiliate health + tag audit summary.
 *
 * Reads counts from data files directly (number of Amazon URLs, Deluxe URLs, total tagged URLs).
 * Doesn't run a live HTTP check (that's the weekly workflow's job — too slow for a 60s refresh).
 */

import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

export async function GET() {
  try {
    const ROOT = process.cwd()
    const [products, affiliateLinks, deluxe] = await Promise.all([
      fs.readFile(path.join(ROOT, 'data', 'products.ts'), 'utf8').catch(() => ''),
      fs.readFile(path.join(ROOT, 'data', 'affiliateLinks.ts'), 'utf8').catch(() => ''),
      fs.readFile(path.join(ROOT, 'data', 'deluxe-flooring.ts'), 'utf8').catch(() => ''),
    ])

    const amazonRe = /https:\/\/www\.amazon\.co\.uk\/dp\/[A-Z0-9]+\?tag=tileflowuk-21/g
    const deluxeRe = /https:\/\/deluxe-flooring\.co\.uk\/product\/[a-z0-9-]+\/?/g

    const amazon = new Set([
      ...(products.match(amazonRe) || []),
      ...(affiliateLinks.match(amazonRe) || []),
    ])
    const deluxeUrls = new Set(deluxe.match(deluxeRe) || [])

    const totalTagged = amazon.size + 0 // Deluxe uses ?ref=3, not tag, so only Amazon counts here
    const productCount = (products.match(/^    slug: '/gm) || []).length

    return NextResponse.json({
      ok: true,
      productCount,
      amazonUrls: amazon.size,
      deluxeUrls: deluxeUrls.size,
      totalTagged,
      // The actual HEAD check happens in CI; we read the latest run output if available
      lastWorkflowRun: null, // populated by snapshot job in future
      fetchedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message })
  }
}
