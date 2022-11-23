import styles from './Card.module.scss';

const Card = ({ srcImage, name, price, rarity, className, isFree }) => {
  return (
    <div className={`${className || ''} ${styles['container']}`}>
      {isFree && <span className={styles['free']}>{`Free`}</span>}
      <img src={srcImage} alt={`${name}`} />
      <footer>
        <div className={styles['container']}>
          <div>
            <span className={styles['name']}>{name}</span>
            <span className={styles['price']}>{price}</span>
          </div>
          <div>
            <section className={styles['rarity-chip']}>{rarity}</section>
          </div>
        </div>
        <div className={styles['empty-button']}>&nbsp;</div>
        <div className={styles['button']}>Buy now</div>
      </footer>
    </div>
  );
};

export default Card;
