import PortfolioCard from '../components/PortfolioCard.component';
import styles from './Portfolio.module.scss';

const PortfolioComponent = () => {
  return (
    <div className={styles['portfolio']}>
      <PortfolioCard
        type='javascript'
        description='this is money description'
        projectName='money.js'
      />
      <PortfolioCard
        type='next js'
        description='this is alpaca something description'
        projectName='alpaca something.js'
      />
    </div>
  );
};

export default PortfolioComponent;
