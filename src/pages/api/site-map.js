const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const site = require('@data/site.json');

// Pages and lastmod dates live in data/site.json (seo.sitemapPages).
// Update a page's lastmod when its content meaningfully changes.
export default async (req, res) => {
  const hostname =
    site.seo?.sitemapHostname || `https://${req.headers.host}`;

  const links = site.seo?.sitemapPages || [{ url: '/' }];

  const stream = new SitemapStream({
    hostname,
    xmlns: { news: false, xhtml: false, image: false, video: false },
  });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
