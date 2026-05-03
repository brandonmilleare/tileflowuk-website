import type { NextConfig } from 'next'

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
