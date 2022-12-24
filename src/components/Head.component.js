import Head from 'next/head';
const author = 'Bertil Tandayamo';

const HeadComponent = ({
  title,
}) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <title>{title}</title>
    </Head>
  );
};

HeadComponent.defaultProps = {
  title: author,
};

export default HeadComponent;
