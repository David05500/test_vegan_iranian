const withCss = require('@zeit/next-css');

module.exports = withCss({
    images: {
        domains: ["images.ctfassets.net", "localhost"],
    },
    env: {
        ALGOLIA_APPLICATION_ID: 'M9SIDYA62K',
        ALGOLIA_ADMIN_API_KEY: 'b2d2aee15183a79abf4b3c29debfa450',
    }
});
