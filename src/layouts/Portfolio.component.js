import ButtonComponent from '@components/common/Button.component';
import PortfolioCard from '@components/PortfolioCard.component';
import PortfolioData from '@data/portfolio.json';
import styles from './Portfolio.module.scss';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { getTokenFactory } from '@utils/web3';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useProvider, useAccount } from 'wagmi';

const PortfolioComponent = () => {
  const router = useRouter();
  const { address } = useAccount();
  const provider = useProvider();
  const getTokensAction = () => {
    router.push('/tokens');
  };

  const getTotalSUpply = async () => {
    const tokenContract = getTokenFactory({ provider });
    const userTokenAmount = await tokenContract.balanceOf(address);
    const totalSupply = await tokenContract.totalSupply();
    console.log(
      '🚀 ~ file: Portfolio.component.js ~ line 25 ~ getTotalSUpply ~ totalSupply',
      totalSupply.toString()
    );
    console.log(
      '🚀 ~ file: Portfolio.component.js ~ line 23 ~ getTotalSUpply ~ userTokenAmount',
      userTokenAmount.toString()
    );
  };

  useEffect(() => {
    getTotalSUpply();
  }, []);

  return (
    <div className={styles['portfolio']}>
      {PortfolioData.map((data) => (
        <PortfolioCard
          key={`portfolio-card-${data.id}`}
          type={data.type}
          description={data.description}
          projectName={data.projectName}
          overview={data.overview}
          github={data.github}
        />
      ))}
      {/* claim free tokens button */}
      {/* TODO: show only when the user has no claim his tokens */}
      <ButtonComponent
        buttonType='fab-button'
        onClick={getTokensAction}
        leftIcon={BsCoin}
        title={PortfolioLabel.freeTokensBtn}
      />
    </div>
  );
};

export default PortfolioComponent;
