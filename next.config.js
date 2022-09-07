const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const withCss = require('@zeit/next-css')({
    swcMinify: true,
    images: {
        domains: ["images.ctfassets.net", "localhost"],
    },
    env: {
        ALGOLIA_APPLICATION_ID: 'M9SIDYA62K',
        ALGOLIA_ADMIN_API_KEY: 'b2d2aee15183a79abf4b3c29debfa450',
        STRIPE_PUBLISH_API_KEY: "pk_live_51LfT3ZDwkFWRAyDPNO4YKhGwSrgsu4nsxKvFbJOzYDQmEwwTvW4S5BevSB0HCyMXyNvwO9pYbkg8cpJIrgyTJIWf00wMttuq2L",

    }
});

module.exports = withPlugins([withCss, [withBundleAnalyzer]], {})
