import ButtonComponent from '@components/common/Button.component';
import PortfolioCard from '@components/PortfolioCard.component';
import styles from './Portfolio.module.scss';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { useWalletContext } from '@context/WalletProvider';
import { web3Website } from 'src/config/URLs';

function PortfolioComponent({ projectsData }) {
  const { userCustomTokenBalance } = useWalletContext();


  const getTokensAction = () => {
    window.open(web3Website, '_tab');
  };

  return (
    <div className={styles['portfolio']}>
      {projectsData?.map((data) => (
        <PortfolioCard
          key={`portfolio-card-${data.id}`}
          projectId={data.id}
          type={data.type}
          description={data.description}
          projectName={data.projectName}
          overview={data.overview}
          github={data.github}
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
  );
}

export default PortfolioComponent;
