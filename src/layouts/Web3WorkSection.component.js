import PortfolioCard from '@components/PortfolioCard.component';
import styles from './Web3WorkSection.module.scss';
import { HomeLabel } from '@placeholders/home.placeholder';

export default function Web3WorkSection({ projects }) {
  if (!projects?.length) return null;

  return (
    <section className={styles.section} aria-labelledby="web3-heading">
      <h2 id="web3-heading" className={styles.heading}>
        {HomeLabel.web3Title}
      </h2>
      <p className={styles.subtitle}>{HomeLabel.web3Subtitle}</p>
      <div className={styles.grid}>
        {projects.map((data) => (
          <PortfolioCard
            key={`web3-card-${data.id}`}
            type={data.type}
            description={data.description}
            projectName={data.projectName}
            overview={data.overview}
            github={data.github}
          />
        ))}
      </div>
    </section>
  );
}
