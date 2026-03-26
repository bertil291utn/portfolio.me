import Head from 'next/head';

const defaultTitle = 'Bertil Tandayamo — Full Stack Developer & Freelancer';

const HeadComponent = ({ title }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </Head>
  );
};

HeadComponent.defaultProps = {
  title: defaultTitle,
};

export default HeadComponent;
