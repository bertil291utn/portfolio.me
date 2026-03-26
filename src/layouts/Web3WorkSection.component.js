import PortfolioCard from '@components/PortfolioCard.component';
import { useSite } from '@context/SiteContext';
import styles from './Web3WorkSection.module.scss';

export default function Web3WorkSection({ projects }) {
  const site = useSite();
  const home = site.ui.home;

  if (!projects?.length) return null;

  return (
    <section className={styles.section} aria-labelledby="web3-heading">
      <h2 id="web3-heading" className={styles.heading}>
        {home.web3Title}
      </h2>
      <p className={styles.subtitle}>{home.web3Subtitle}</p>
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
