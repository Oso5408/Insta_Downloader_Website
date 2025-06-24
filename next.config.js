/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdninstagram.com', 'scontent.cdninstagram.com', 'instagram.com'],
  },
}

module.exports = nextConfig 