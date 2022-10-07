import styles from './Portfolio.module.scss';
const PortfolioComponent = () => {
  return (
    <div className={styles['portfolio']}>
      <span className={styles['portfolio__title']}>Building In Progress</span>
    </div>
  );
};

export default PortfolioComponent;
