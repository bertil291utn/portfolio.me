/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverless: true,
    isr: {
      cacheTime: 60
    }
  }
};

module.exports = nextConfig;
