import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub } from 'react-icons/ai';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';

const PortfolioCard = ({
  type,
  description,
  projectName,
  overview,
  github,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <span className={styles.tech}>{type}</span>
        <h3 className={styles.title}>{projectName}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.actions}>
        {overview && (
          <a
            className={styles.iconBtn}
            href={overview}
            target="_blank"
            rel="noopener noreferrer"
            title={PortfolioLabel.onlineVersionTitle}
            aria-label={`${PortfolioLabel.onlineVersionTitle}: ${projectName}`}
          >
            <TbWorld className={styles.iconSize} aria-hidden />
          </a>
        )}
        {github && (
          <a
            className={styles.iconBtn}
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            title={PortfolioLabel.githubRepoTitle}
            aria-label={`${PortfolioLabel.githubRepoTitle}: ${projectName}`}
          >
            <AiFillGithub className={styles.iconSize} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
};

export default PortfolioCard;
