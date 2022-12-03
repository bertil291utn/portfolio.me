import NFTCard from '@components/common/NFTCard.component';
import { useTokenContext } from '@context/TokenProvider';
import { useWalletContext } from '@context/WalletProvider';
import styles from './NFTContent.module.scss';

const NFTContent = () => {
  const { tokenSymbol } = useWalletContext();
  const { NFTData } = useTokenContext();

  const getToken = (isFree) => () => {
    console.log(isFree ? 'claim token' : 'buy token');
  };
  return (
    <div className={styles['container']}>
      <div className={styles['cards']}>
        {NFTData.map((elem, index) => {
          return !elem.allMinted ? (
            <NFTCard
              className={styles['card-item']}
              key={`card-${++index}`}
              srcImage={elem.image}
              name={elem.name}
              price={`${elem.free ? 0 : elem.price} ${tokenSymbol}`}
              superRare={elem.superRare}
              isFree={elem.free}
              onClick={getToken(elem.free)}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default NFTContent;
