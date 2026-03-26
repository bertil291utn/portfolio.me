import { Html, Head, Main, NextScript } from 'next/document';
import site from '../../data/site.json';

export default function Document() {
  const { seo } = site;

  return (
    <Html lang={seo.htmlLang} suppressHydrationWarning>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <link rel="canonical" href={seo.canonicalBaseUrl} />
        <meta name="author" content={seo.authorName} />
        <link rel="manifest" href={seo.manifestPath} />

        <meta name="theme-color" content={seo.themeColor} />
        <meta name="title" content={seo.defaultTitle} />
        <meta name="description" content={seo.metaDescription} />
        <meta name="keywords" content={seo.keywords} />

        <meta name="twitter:card" content={seo.twitterCard} />
        <meta name="twitter:site" content={seo.twitterHandle} />
        <meta name="twitter:creator" content={seo.twitterHandle} />
        <meta name="twitter:title" content={seo.defaultTitle} />
        <meta name="twitter:description" content={seo.metaDescription} />
        <meta name="twitter:image" content={seo.ogImage} />

        <meta property="og:locale" content={seo.ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.defaultTitle} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:url" content={seo.canonicalBaseUrl} />
        <meta property="og:site_name" content={seo.siteName} />
        <meta property="og:image" content={seo.ogImage} />

        <link rel="icon" type="image/svg+xml" href={seo.favIcon} />
      </Head>
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
