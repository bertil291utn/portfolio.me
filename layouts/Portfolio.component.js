import PortfolioCards from '../components/PortfolioCards.component';
import styles from './Portfolio.module.scss';
const PortfolioComponent = () => {
  return (
    <div className={styles['portfolio']}>
      <PortfolioCards />
      <PortfolioCards />
      <PortfolioCards />
      <PortfolioCards />
    </div>
  );
};

export default PortfolioComponent;
