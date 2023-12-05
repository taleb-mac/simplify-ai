/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["pdf2json"],
      appDir: true,
    },
  };
  
  module.exports = nextConfig;