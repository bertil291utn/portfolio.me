import TokensComponent from '@layouts/Tokens.component';
import { nftDataURL } from 'src/config/URLs';

const TokensPage = ({ nfts }) => {
  return <TokensComponent NFTData={nfts} />;
};

export async function getStaticProps() {
  const res = await fetch(nftDataURL);
  const nfts = await res.json();

  return {
    props: {
      nfts,
    },
  };
}
export default TokensPage;
