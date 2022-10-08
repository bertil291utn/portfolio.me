import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const PortfolioCard = ({
  type,
  description,
  projectName,
  overview,
  github,
}) => {
  const { resolvedTheme } = useTheme();
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
          <Link href={overview}>
            <a target='_blank' rel='noopener noreferrer'>
              <TbWorld className={styles['icon-size']} title='Online version' />
            </a>
          </Link>
        )}

        {github && (
          <Link href={github}>
            <a target='_blank' rel='noopener noreferrer'>
              <AiFillGithub
                className={styles['icon-size']}
                title='Github repository'
              />
            </a>
          </Link>
        )}

        <AiFillStar className={styles['icon-size']} title='Rate this project' />
      </div>
    </div>
  );
};

export default PortfolioCard;
