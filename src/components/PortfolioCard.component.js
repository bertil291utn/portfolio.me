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
  const openURL = (URL) => () => {
    window.open(URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <span className={styles.tech}>{type}</span>
        <h3 className={styles.title}>{projectName}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.actions}>
        {overview && (
          <button
            type="button"
            className={styles.iconBtn}
            title={PortfolioLabel.onlineVersionTitle}
            onClick={openURL(overview)}
            aria-label={PortfolioLabel.onlineVersionTitle}
          >
            <TbWorld className={styles.iconSize} aria-hidden />
          </button>
        )}
        {github && (
          <button
            type="button"
            className={styles.iconBtn}
            title={PortfolioLabel.githubRepoTitle}
            onClick={openURL(github)}
            aria-label={PortfolioLabel.githubRepoTitle}
          >
            <AiFillGithub className={styles.iconSize} aria-hidden />
          </button>
        )}
      </div>
    </article>
  );
};

export default PortfolioCard;
