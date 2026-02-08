/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'todo-hackathon-phase-3-backend.vercel.app'],
  },
};

module.exports = nextConfig;