import type { NextConfig } from 'next'

/**
 * Security headers — applied to every response.
 * Defensive baseline. None of these change rendering. CSP is Report-Only
 * for now (won't block anything) so we can collect violations before
 * switching to enforcing.
 */
const securityHeaders = [
  {
    // HTTPS-only for 2 years, includes subdomains, eligible for HSTS preload list.
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Stops anyone iframing the site (clickjacking).
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    // Stops browsers MIME-sniffing — only honour declared Content-Type.
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Send origin only on cross-origin nav, full URL same-origin.
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Disable powerful APIs we don't use. Cuts attack surface.
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()',
  },
  {
    // Modern replacement for X-XSS-Protection, isolates browsing context.
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    // Report-only mode — collects violations, doesn't block anything.
    // Switch to 'Content-Security-Policy' once the report log is clean.
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https://m.media-amazon.com https://images-na.ssl-images-amazon.com https://www.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms",
      "frame-src 'self' https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  // Turbopack FS cache — faster dev restarts between sessions (Next.js 16 beta feature)
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ['lucide-react', 'motion', 'yet-another-react-lightbox'],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/preview/deluxe-flooring',
        destination: '/deluxe-flooring',
        permanent: true,
      },
      {
        source: '/preview/deluxe-flooring/:path*',
        destination: '/deluxe-flooring/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
