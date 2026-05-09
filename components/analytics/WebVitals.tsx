'use client'

/**
 * Web Vitals → GA4 reporter.
 *
 * Why this matters: Sentry catches errors. This catches slow pages — the
 * Core Web Vitals metrics Google uses to rank. Without field data we're
 * guessing which pages are slow. With field data we know which to optimise.
 *
 * Metrics reported:
 *  - INP  (Interaction to Next Paint) — replaces FID, the new responsiveness signal
 *  - LCP  (Largest Contentful Paint) — perceived load speed
 *  - CLS  (Cumulative Layout Shift) — visual stability
 *  - FCP  (First Contentful Paint) — perceived first content
 *  - TTFB (Time to First Byte) — server-side latency
 *
 * Each metric ships to GA4 as a custom event named `web_vitals` with
 * dimensions: name, id (session UUID for reproducibility), value (rounded),
 * delta (change since last report), navigationType, rating (good/needs-
 * improvement/poor — applied per Google's thresholds).
 *
 * GA4 setup: events show in Engagement → Events → web_vitals automatically.
 * For dashboards, register `metric_name`, `metric_value`, `metric_rating`
 * as Custom Definitions in GA4 Admin → Custom definitions.
 */

import { useReportWebVitals } from 'next/web-vitals'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default function WebVitals() {
  useReportWebVitals(metric => {
    // No-op until gtag is loaded. GTM injects gtag asynchronously, so on a
    // very fast page the first report may arrive before gtag exists. The
    // metric will simply not be sent — which is fine, web-vitals re-reports
    // on every change.
    if (typeof window === 'undefined' || !window.gtag) return

    window.gtag('event', 'web_vitals', {
      name: metric.name,
      // GA4 events accept a single value field; preserve precision for CLS
      // (which is < 1) by storing in `metric_value` separately as a float.
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_delta: metric.delta,
      metric_rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
      navigation_type: metric.navigationType,
      // Send via beacon so the report still goes when the page is unloading
      transport_type: 'beacon',
      // Don't trigger sessions on metric reports
      non_interaction: true,
    })
  })

  return null
}
