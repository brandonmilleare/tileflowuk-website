// Sentry server-side config — runs in Node.js (RSC, API routes, server actions).
// Imported automatically via instrumentation.ts.

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === 'production',

  // Don't capture errors thrown by Next.js' own redirect/notFound — those are
  // intentional control flow, not bugs.
  ignoreErrors: [
    'NEXT_REDIRECT',
    'NEXT_NOT_FOUND',
  ],
})
