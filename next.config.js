/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disables double-rendering in dev (faster)
    swcMinify: false,
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    experimental: {
      optimizePackageImports: ['framer-motion', 'lucide-react'],
    },
  };
  
  module.exports = nextConfig;