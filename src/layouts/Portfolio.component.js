import PortfolioCard from '@components/PortfolioCard.component';
import styles from './Portfolio.module.scss';

function PortfolioComponent({ projectsData }) {
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

    </div>
  );
}

export default PortfolioComponent;
