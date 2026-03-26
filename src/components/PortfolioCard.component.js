import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';

const PortfolioCard = ({
  type,
  description,
  projectName,
  overview,
  github,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openURL = (URL) => () => {
    window.open(URL, '_blank', 'noopener,noreferrer');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`${styles['card-content']} ${
        resolvedTheme === 'dark' ? styles['card-content__dark'] : ''
      }`}
    >
      <div>
        <span className={styles['card-content__tech']}>{type}</span>
        <span className={styles['card-content__project']}>{projectName}</span>
        <span className={styles['card-content__description']}>{description}</span>
      </div>
      <div className={styles['card-content__icons']}>
        {overview && (
          <button
            type="button"
            className={styles['icon-btn']}
            title={PortfolioLabel.onlineVersionTitle}
            onClick={openURL(overview)}
            aria-label={PortfolioLabel.onlineVersionTitle}
          >
            <TbWorld className={styles['icon-size']} aria-hidden />
          </button>
        )}
        {github && (
          <button
            type="button"
            className={styles['icon-btn']}
            title={PortfolioLabel.githubRepoTitle}
            onClick={openURL(github)}
            aria-label={PortfolioLabel.githubRepoTitle}
          >
            <AiFillGithub className={styles['icon-size']} aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
