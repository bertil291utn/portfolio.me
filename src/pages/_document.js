import { Html, Head, Main, NextScript } from 'next/document';
const author = 'Bertil Tandayamo';
export default function Document({
  canonicalURL,
  author,
  manifest,
  metaTitle,
  metaImage,
  description,
  keywords,
  favIcon,
  twitterUsername,
  themeColor,
}) {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <link rel="canonical" href={canonicalURL} />
        <meta name="author" content={author} />
        <link rel="manifest" href={manifest} />

        <meta name="theme-color" content={themeColor} />
        <meta name="title" content={metaTitle} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={twitterUsername} />
        <meta name="twitter:creator" content={twitterUsername} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImage} />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:site_name" content={canonicalURL} />
        <meta property="og:image" content={metaImage} />

        <link rel="icon" type="image/svg+xml" href={favIcon} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.defaultProps = {
  canonicalURL: 'https://www.bertiltandayamo.me',
  author,
  manifest: '/assets/manifest.json',
  metaTitle: 'Bertil Tandayamo — Full Stack Developer & Freelancer',
  metaImage:
    'https://res.cloudinary.com/btandayamo/image/upload/v1675372137/portofolio.me/og_imageok_quf0ho.png',
  description:
    'Full stack developer for hire. I build web products, MVPs, and integrations — with Web3 experience when your roadmap needs it. Based in Quito, Ecuador.',
  keywords:
    'freelance developer, full stack developer, Next.js, React, Ecuador, Quito, web development, freelance, Bertil Tandayamo, software engineer',
  favIcon: '/assets/icons/favicon.svg',
  twitterUsername: '@btandayamo',
  themeColor: '#fff5f0',
};
