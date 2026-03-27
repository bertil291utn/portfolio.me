const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const site = require('@data/site.json');

export default async (req, res) => {
  const hostname =
    site.seo?.sitemapHostname || `https://${req.headers.host}`;

  const links = [{ url: '/', changefreq: 'weekly', priority: 1 }];

  const stream = new SitemapStream({ hostname });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
