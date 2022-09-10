import Head from 'next/head';

const HeadComponent = () => {
  return (
    <Head>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='canonical' href='https://www.bertiltandayamo.me' />
      <meta name='author' content='bertil tandayamo' />
      <link rel='manifest' href='assests/manifest.json' />
      <meta name='title' content='Web3 Developer' />
      <meta name='description' content=' Tech nerdy, music enthusiast conquering the world' />
      <meta
        name='keywords'
        content='bertil, Bertil, BERTIL, TANDAYAMO, Tandayamo, tandayamo, Bertil Tandayamo, BERTIL TANDAYAMO,bertil tandayamo, Full Stack Developer Ecuador, Ecuador developer, cayambe developer, CAYAMBE desarrollador'
      />

      {/* twitter  */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@btandayamo' />
      <meta name='twitter:creator' content='@btandayamo' />
      <meta name='twitter:title' content='Web3 Developer' />
      <meta name='twitter:description' content='Tech nerdy, music enthusiast conquering the world' />
      <meta
        name='twitter:image'
        content='https://www.bertiltandayamo.me/assets/images/og_imageok.png'
      />

      {/* facebook  */}
      <meta property='og:locate' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='Web3 Developer' />
      <meta property='og:description' content='Tech nerdy, music enthusiast conquering the world ' />
      <meta property='og:url' content='https://bertiltandayamo.me' />
      <meta property='og:site_name' content='https://bertiltandayamo.me' />
      <meta property='og:image' content='/assets/images/og_imageok.png' />


      <link rel='icon' type='image/svg+xml' href='/assets/icons/favicon.svg' />
      <title>Bertil Tandayamo</title>
    </Head>
  );
};

export default HeadComponent;
