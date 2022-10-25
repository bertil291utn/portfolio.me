import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { localStorageKeys } from '@keys/localStorage';

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
    localStorage.removeItem('theme');
  }, []);

  if (!mounted) {
    return null;
  }

  const openURL = (URL) => () => {
    if (
      window.localStorage.getItem(
        localStorageKeys.isWeb3User
      ) /*and doesn't have tokens*/
    ) {
      alert('claim free tokens');
      return;
    }
    window.open(URL, '_blank');
  };

  const rateProject = () => {
    alert('rate project');
  };

  return (
    <div
      className={`${styles['card-content']} ${
        resolvedTheme === 'dark' ? styles['card-content__dark'] : ''
      }`}
    >
      <div>
        <span className={styles['card-content__tech']}>{type}</span>
        <span className={styles['card-content__project']}>{projectName}</span>
        <span className={styles['card-content__description']}>
          {description}
        </span>
      </div>
      <div className={styles['card-content__icons']}>
        {overview && (
          <TbWorld
            className={styles['icon-size']}
            title='Online version'
            onClick={openURL(overview)}
          />
        )}

        {github && (
          <AiFillGithub
            className={styles['icon-size']}
            title='Github repository'
            onClick={openURL(github)}
          />
        )}

        <AiFillStar
          className={styles['icon-size']}
          title='Rate this project'
          onClick={rateProject}
        />
      </div>
    </div>
  );
};

export default PortfolioCard;