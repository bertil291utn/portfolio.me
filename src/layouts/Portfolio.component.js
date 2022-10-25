import ButtonComponent from '@components/common/Button.component';
import PortfolioCard from '@components/PortfolioCard.component';
import PortfolioData from '@data/portfolio.json';
import styles from './Portfolio.module.scss';
import { BsCoin } from 'react-icons/bs';

const PortfolioComponent = () => {
  const getTokensAction = () => {
    console.log('get tokens');
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
      <ButtonComponent
        buttonType='fav-button'
        onClick={getTokensAction}
        leftIcon={BsCoin}
      />
    </div>
  );
};

export default PortfolioComponent;
