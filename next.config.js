/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   outputFileTracingIncludes: {
  //     "/lib/railway-helpers.ts": ["./temp/**/*"],
  //   },
  // },
  output: "standalone/csv",
};

module.exports = nextConfig;
