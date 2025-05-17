/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://your-domain.com/server-sitemap.xml',
    ],
  },
  exclude: ['/server-sitemap.xml'],
  changefreq: 'weekly',
  priority: 0.7,
}
