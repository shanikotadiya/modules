/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint checks during build
  },
   experimental: {
    turbo: false
  }
};

export default nextConfig;
