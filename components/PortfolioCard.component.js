import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub, AiFillStar, AiOutlineStar } from 'react-icons/ai';

const PortfolioCard = ({ type, description, projectName }) => {
  return (
    <div className={styles['card-content']}>
      <div>
        <span className={styles['card-content__tech']}>{type}</span>
        <span className={styles['card-content__project']}>{projectName}</span>
        <span className={styles['card-content__description']}>
          {description}
        </span>
      </div>
      <div className={styles['card-content__icons']}>
        <TbWorld className={styles['icon-size']} title='Online version' />
        <AiFillGithub
          className={styles['icon-size']}
          title='Github repository'
        />
        <AiFillStar className={styles['icon-size']} title='Rate this project' />
      </div>
    </div>
  );
};

export default PortfolioCard;
