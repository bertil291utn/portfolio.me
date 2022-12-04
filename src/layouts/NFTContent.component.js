import NFTCard from '@components/common/NFTCard.component';
import { useTokenContext } from '@context/TokenProvider';
import { useWalletContext } from '@context/WalletProvider';
import { useEffect, useState } from 'react';
import styles from './NFTContent.module.scss';

const NFTContent = () => {
  const [NFTData, setNFTData] = useState();
  const { tokenSymbol } = useWalletContext();
  const { NFTData: _NFTData } = useTokenContext();

  const getToken = (isFree) => () => {
    console.log(isFree ? 'claim token' : 'buy token');
  };

  useEffect(() => {
    setNFTData(_NFTData);
  }, [_NFTData]);

  return NFTData ? (
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
              erc1155={!elem.erc721}
              quantityLeft={elem.quantityLeft}
              totalSupply={elem.totalSupply}
            />
          ) : null;
        })}
      </div>
    </div>
  ) : null;
};

export default NFTContent;
