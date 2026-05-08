// Sentry client-side config — runs in the browser.
// This file is imported automatically by @sentry/nextjs at instrumentation
// time. Don't import it manually.

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Send 10% of regular sessions for tracing — keeps the free quota safe
  // (5,000 events/month on free tier). Bump higher once we know baseline.
  tracesSampleRate: 0.1,

  // Capture replay only on errors. Replays use a separate quota; cap at 0%
  // baseline + 100% on errors so we get a video of what the user was doing
  // ONLY when something actually broke.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  // Don't send Sentry events in development — keeps the dashboard clean.
  enabled: process.env.NODE_ENV === 'production',

  // Sensible defaults for performance + sane noise filtering.
  integrations: [
    Sentry.replayIntegration({
      // Privacy: don't capture form input by default. We can opt-in per-form.
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Filter out noisy errors that aren't real bugs.
  ignoreErrors: [
    // Browser extensions throw these in their own contexts
    'Non-Error promise rejection captured',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // TikTok in-app webview throws this on some redirects (we route /go/<asin> instead)
    'Failed to fetch',
    // Safari quirks
    "Can't find variable: gtag",
  ],

  // Strip query strings from breadcrumb URLs (some carry tokens we don't want logged)
  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.category === 'navigation' && breadcrumb.data?.to) {
      breadcrumb.data.to = String(breadcrumb.data.to).split('?')[0]
    }
    return breadcrumb
  },
})
