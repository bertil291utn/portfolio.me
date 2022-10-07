import styles from './PortfolioCards.module.scss';

const PortfolioCards = () => {
  return (
    <div className={styles['card-content']}>
      <span className={styles['card-content__tech']}>JAVASCRIPT</span>
      <span className={styles['card-content__project']}>dinero.js</span>
      <span className={styles['card-content__description']}>
        Description dinero.js
      </span>
    </div>
  );
};

export default PortfolioCards;
