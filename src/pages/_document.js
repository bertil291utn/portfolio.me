import { Html, Head, Main, NextScript } from 'next/document';
import { siteFallback as site } from '@utils/siteData';

// Site-wide tags only. Per-page tags (title, description, canonical, OG/Twitter,
// JSON-LD) live in src/components/Head.component.js.
export default function Document() {
  const { seo } = site;

  return (
    <Html lang={seo.htmlLang} suppressHydrationWarning>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="author" content={seo.authorName} />
        <link rel="manifest" href={seo.manifestPath} />
        <meta name="theme-color" content={seo.themeColor} />

        <link rel="icon" type="image/svg+xml" href={seo.favIcon} />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
