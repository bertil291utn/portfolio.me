import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSite } from '@context/SiteContext';

const HeadComponent = () => {
  const router = useRouter();
  const site = useSite();
  const pathname = router?.pathname || '/';
  const title =
    site.seo.pageTitles?.[pathname] ?? site.seo.defaultTitle;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </Head>
  );
};

export default HeadComponent;
