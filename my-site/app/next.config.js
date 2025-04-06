/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports
  output: 'export',
  // Change the output directory to "out"
  distDir: 'out',
  // Disable image optimization since it's not supported in static exports
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 