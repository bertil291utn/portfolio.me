import ButtonComponent from '@components/common/Button.component';
import PortfolioCard from '@components/PortfolioCard.component';
import PortfolioData from '@data/portfolio.json';
import styles from './Portfolio.module.scss';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { ethers } from 'ethers';

import { useRouter } from 'next/router';
import { useWalletContext } from '@context/WalletProvider';
import { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { getRatingFactory } from '@utils/web3';

const PortfolioComponent = () => {
  const router = useRouter();
  const [portfolioDataSet, setPortfolioDataSet] = useState(PortfolioData);
  const { userCustomTokenBalance } = useWalletContext();
  const { address } = useAccount();
  const { data: signer } = useSigner();

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
    getPortfolioData(portfolioDataSet);
  }, []);

  const getTokensAction = () => {
    router.push('/tokens');
  };

  return portfolioDataSet ? (
    <div className={styles['portfolio']}>
      {portfolioDataSet?.map((data) => (
        <PortfolioCard
          key={`portfolio-card-${data.id}`}
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
