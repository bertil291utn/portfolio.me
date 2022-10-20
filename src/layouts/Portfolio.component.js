import PortfolioCard from '../components/PortfolioCard.component';
import PortfolioData from '../data/portfolio.json';
import styles from './Portfolio.module.scss';

const PortfolioComponent = () => {
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
    </div>
  );
};

export default PortfolioComponent;
