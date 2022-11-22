import ButtonComponent from '@components/common/Button.component';
import PortfolioCard from '@components/PortfolioCard.component';
import styles from './Portfolio.module.scss';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { useRouter } from 'next/router';
import { useWalletContext } from '@context/WalletProvider';
import { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { getRatingFactory } from '@utils/web3';
import { portfolioDataURL } from 'src/config/URLs';

const PortfolioComponent = () => {
  const router = useRouter();
  const [portfolioDataSet, setPortfolioDataSet] = useState();
  const { userCustomTokenBalance } = useWalletContext();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const getPortfolioJSON = async (URL) => {
    const rateContract = getRatingFactory({ signer });
    let resp = await fetch(URL);
    resp = await resp.json();
    console.log(
      '🚀 ~ file: Portfolio.component.js ~ line 24 ~ getPortfolioJSON ~ resp',
      resp
    );
    const newObject = await Promise.all(
      resp.map(async (elem) => {
        return {
          ...elem,
          isRated: await rateContract.isRatedProject(elem.id),
        };
      })
    );
    setPortfolioDataSet(newObject);
  };

  useEffect(() => {
    signer && getPortfolioJSON(portfolioDataURL);
  }, [signer]);

  const getTokensAction = () => {
    router.push('/tokens');
  };

  return portfolioDataSet ? (
    <div className={styles['portfolio']}>
      {portfolioDataSet?.map((data) => (
        <PortfolioCard
          key={`portfolio-card-${data.id}`}
          projectId={data.id}
          type={data.type}
          description={data.description}
          projectName={data.projectName}
          overview={data.overview}
          github={data.github}
          isRated={data.isRated}
        />
      ))}
      {(!userCustomTokenBalance || userCustomTokenBalance.toString() <= 0) && (
        <ButtonComponent
          buttonType='fab-button'
          onClick={getTokensAction}
          leftIcon={BsCoin}
          title={PortfolioLabel.freeTokensBtn}
        />
      )}
    </div>
  ) : null;
};

export default PortfolioComponent;
