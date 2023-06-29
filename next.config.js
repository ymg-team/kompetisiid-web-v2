/** @type {import('next').NextConfig} */

const publicRuntimeConfig = {
  NODE_ENV: process.env.NODE_ENV || "production",
  URL_KI_BE: process.env.URL_KI_BE || "https://apiv4.kompetisi.id",
  URL_KI_BE_GO: process.env.URL_KI_BE_GO || "https://apiv4.kompetisi.id",
  URL_KI_WEB: process.env.URL_KI_WEB || "https://kompetisi.id/api",
  APP_KEY: process.env.APP_KEY || "ki-kjhsdfi763423jhsdf76qw3qhegsdfi876",
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  GOOGLE_ADSENSE_CLIENT: process.env.GOOGLE_ADSENSE_CLIENT,
  ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN,
  RECHAPTCHA_SITE_KEY: "6LfLR8oUAAAAAGFnqkaV1H5u5tDrPCRm-J1t1hvL",
};

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  publicRuntimeConfig,
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    return [
      //browse competition pages
      {
        source: "/browse/:main_category",
        destination: "/browse?main_category=:main_category",
      },
      {
        source: "/browse/tag/:tag",
        destination: "/browse?tag=:tag",
      },
      {
        source: "/browse/:main_category/:sub_category",
        destination:
          "/browse?main_category=:main_category&sub_category=:sub_category",
      },
      //competition detail page
      {
        source: "/c/:id",
        destination: "/competitionDetail?id=:id&type=regulations",
      },
      {
        source: "/competition/:id/regulations/:title",
        destination: "/competitionDetail?id=:id&title=:title&type=regulations",
      },
      {
        source: "/competition/:id/prizes/:title",
        destination: "/competitionDetail?id=:id&title=:title&type=prizes",
      },
      {
        source: "/competition/:id/announcements/:title",
        destination:
          "/competitionDetail?id=:id&title=:title&type=announcements",
      },
      {
        source: "/competition/:id/discussions/:title",
        destination: "/competitionDetail?id=:id&title=:title&type=discussions",
      },
      {
        source: "/competition/:id/contacts/:title",
        destination: "/competitionDetail?id=:id&title=:title&type=contacts",
      },
      {
        source: "/competition/:id/share/:title",
        destination: "/competitionDetail?id=:id&title=:title&type=share",
      },
      {
        source: "/competition/:id/submission/:title",
        destination: "/competitionDetail?id=:id&title=:title&type=submission",
      },
      {
        source: "/news",
        destination: "/news",
      },
      {
        source: "/super/competitions/:status",
        destination: "/super/competitions?status=:status",
      },
      {
        source: "/super/competitions/edit/:id",
        destination: "/super/competitions/create?competition_id=:id",
      },
      // request add competition page
      {
        source: "/super/requests/waiting",
        destination: "/super/requests?status=waiting",
      },
      {
        source: "/super/requests/approved",
        destination: "/super/requests?status=posted",
      },
      {
        source: "/super/requests/rejected",
        destination: "/super/requests?status=reject",
      },
    ];
  },
  async redirects() {
    return [
      {
        permanent: false,
        source: "/mgws-rf500-2022",
        destination:
          "/competition/TVRnek53PT0/regulations/ikutan-rapha-festive-500-bisa-dapat-saldo-linkaja-dari-maugowes",
      },
    ];
  },
};

module.exports = nextConfig;
