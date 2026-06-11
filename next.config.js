/** @type {import('next').NextConfig} */
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  // Remove the eslint block entirely
};

module.exports = nextConfig;


