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
        NEXT_PUBLIC_API_KEY: "pk_test_OJ97DXTqYIAY1RvMIRAznyBI",

    }
});

module.exports = withPlugins([withCss, [withBundleAnalyzer]], {})
