/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
  images: {
    domains: ['localhost'],
  },
  typescript: {
    // We'll handle TypeScript errors ourselves
    ignoreBuildErrors: false,
  },
  eslint: {
    // We'll handle ESLint ourselves
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
