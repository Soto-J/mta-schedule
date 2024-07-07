/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/lib/railway-helpers.ts": ["./temp/**/*"],
    },
  },
};

module.exports = nextConfig;
