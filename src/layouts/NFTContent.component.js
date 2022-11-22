import Card from '@components/common/Card.component';
import styles from './NFTContent.module.scss';

const NFTContent = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['card']}>
        {[1, 2, 3, 4].map((elem, index) => (
          <Card key={`card-${++index}`} />
        ))}
      </div>
    </div>
  );
};

export default NFTContent;
