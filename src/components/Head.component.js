import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSite } from '@context/SiteContext';
import { resumeFallback } from '@utils/resumeData';
import { buildStructuredData } from '@utils/structuredData';

const HeadComponent = () => {
  const router = useRouter();
  const { seo, ui } = useSite();
  const pathname = router?.pathname || '/';

  const indexable = (seo.indexablePaths || []).includes(pathname);
  const title = seo.pageTitles?.[pathname] ?? seo.defaultTitle;
  const description = seo.pageDescriptions?.[pathname] ?? seo.metaDescription;
  const canonical = `${seo.canonicalBaseUrl}${pathname === '/' ? '/' : pathname}`;
  const jsonLd = indexable
    ? buildStructuredData(pathname, resumeFallback, seo, title, ui?.home?.serviceItems)
    : null;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />

      {indexable ? (
        <link rel="canonical" href={canonical} />
      ) : (
        <meta name="robots" content="noindex" />
      )}

      <meta property="og:locale" content={seo.ogLocale} />
      <meta property="og:type" content={pathname === '/resume' ? 'profile' : 'website'} />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {indexable && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:image:width" content={String(seo.ogImageWidth)} />
      <meta property="og:image:height" content={String(seo.ogImageHeight)} />
      <meta property="og:image:alt" content={seo.ogImageAlt} />

      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:site" content={seo.twitterHandle} />
      <meta name="twitter:creator" content={seo.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seo.ogImage} />
      <meta name="twitter:image:alt" content={seo.ogImageAlt} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </Head>
  );
};

export default HeadComponent;
