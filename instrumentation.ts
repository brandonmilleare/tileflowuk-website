// Next.js 16 instrumentation hook.
// This file is auto-loaded once at server startup. We use it to wire Sentry
// for both Node.js (RSC, API routes, server actions) and edge (middleware,
// edge route handlers) runtimes — Sentry needs to know which environment
// it's running in to load the right SDK.

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

// Forward server-side errors to Sentry from the Next.js error boundary.
// Without this, only client-side errors get captured automatically.
export { captureRequestError as onRequestError } from '@sentry/nextjs'
