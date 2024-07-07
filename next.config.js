/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingRoot: path.join(process.cwd(), "temp/csv"),
  },
};

module.exports = nextConfig;
