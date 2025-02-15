// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'http://localhost:3000',// Update with your actual domain
    generateRobotsTxt: true, // Generates a robots.txt file as well
    exclude: ['/admin', '/login'], // Add paths you don't want indexed
    changefreq: 'monthly',
    priority: 0.7,
    sitemapSize: 5000,
  };
  