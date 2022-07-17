/** @type {import('next').NextConfig} */

const publicRuntimeConfig = {
  NODE_ENV: process.env.NODE_ENV,
  URL_KI_BE: process.env.URL_KI_BE,
  URL_KI_WEB: process.env.URL_KI_WEB,
  APP_KEY: process.env.APP_KEY,
};

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig,
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    return [
      {
        source: "/browse/:mainCat",
        destination: "/browse?mainCat=:mainCat",
      },
      {
        source: "/browse/tag/:tag",
        destination: "/browse?tag=:tag",
      },
      {
        source: "/browse/:mainCat/:subCat",
        destination: "/browse?mainCat=:mainCat&subCat=:subCat",
      },
    ];
  },
};

module.exports = nextConfig;
