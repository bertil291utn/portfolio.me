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
    const resp = await fetch(URL);
    setPortfolioDataSet(await resp.json());
  };

  useEffect(() => {
    getPortfolioJSON(portfolioDataURL);
  }, []);

  const getPortfolioData = async (prevPortfolioData) => {
    const rateContract = getRatingFactory({ signer });

    const _prevPortfolioData = [...prevPortfolioData];
    const newObject = await Promise.all(
      _prevPortfolioData.map(async (elem) => {
        const isRated = await rateContract.isRatedProject(elem.id);
        return { ...elem, isRated };
      })
    );
    setPortfolioDataSet(newObject);
  };

  useEffect(() => {
    signer && getPortfolioData(portfolioDataSet);
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
