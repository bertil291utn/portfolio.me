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
              'https://i.seadn.io/gae/VNvGxgfw5j1oMl5UOOv82xrXZdkrbWn1-KV7jSLFTijQ4f7wGE2DsLEdV46PnqRzY-KAZ8_lo5Yu9lsCIl0q2zKUlz882OUZO5GdXFU?auto=format&w=750'
            }
            name={'Clay friends'}
            price={`${index % 2 == 0 ? 0 : 0.1} ${tokenSymbol}`}
            rarity={`Gold`}
            isFree={index % 2 == 0}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTContent;
