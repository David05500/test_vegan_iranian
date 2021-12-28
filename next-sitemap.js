const siteUrl = "https://www.theiranianvegan.com"

module.exports = {
//   siteUrl: process.env.SITE_URL || 'https://example.com',
    siteUrl,
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/sitemap.xml`,
            `${siteUrl}/server-sitemap.xml`
        ]
    }
}