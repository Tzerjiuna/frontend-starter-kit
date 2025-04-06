/** @type {import('next').NextConfig} */

const path = require('path')

const sassConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/sass')]
  }
}

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true
          }
        }
      ]
    })

    return config
  },
  async headers() {
    return [
      {
        source: '/mockServiceWorker.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/user/auth/mfid/callback',
        destination: `/api/auth/mfid/callback`,
        permanent: true
      }
    ]
  },
  reactStrictMode: process.env.APP_ENV === 'development' ? false : true,
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    instrumentationHook: true,
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  optimizeFonts: false,
  swcMinify: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn']
          }
        : false
  },
  ...sassConfig
}

module.exports = nextConfig
