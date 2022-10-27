import ButtonComponent from '@components/common/Button.component';
import PortfolioCard from '@components/PortfolioCard.component';
import PortfolioData from '@data/portfolio.json';
import styles from './Portfolio.module.scss';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';

import { useRouter } from 'next/router';
import { useWalletContext } from '@context/WalletProvider';

const PortfolioComponent = () => {
  const router = useRouter();
  const { userCustomTokenBalance } = useWalletContext();

  const getTokensAction = () => {
    router.push('/tokens');
  };

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
      {userCustomTokenBalance <= 0 && (
        <ButtonComponent
          buttonType='fab-button'
          onClick={getTokensAction}
          leftIcon={BsCoin}
          title={PortfolioLabel.freeTokensBtn}
        />
      )}
    </div>
  );
};

export default PortfolioComponent;
