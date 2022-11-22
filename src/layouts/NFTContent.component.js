import Card from '@components/common/Card.component';
import { useWalletContext } from '@context/WalletProvider';
import styles from './NFTContent.module.scss';

const NFTContent = () => {
  const { tokenSymbol } = useWalletContext();
  return (
    <div className={styles['container']}>
      <div className={styles['cards']}>
        {[1, 2, 3, 4].map((elem, index) => (
          <Card
            className={styles['card-item']}
            key={`card-${++index}`}
            srcImage={
              'https://i.seadn.io/gae/ydaSGbXHpxBG8Fn7nolIYFIABPbmbWwD2fRrwXMs4mfHlGIWfivQjfONt2dDQxjpWfhwprqDBoO75b-w4EX6DRHpe5Hiy37nTY1Y89Y?auto=format&w=750'
            }
            name={'Clay friends'}
            price={`0.100 ${tokenSymbol}`}
            rarity={`Gold`}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTContent;
