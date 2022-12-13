import NFTCard from '@components/common/NFTCard.component';
import { useTokenContext } from '@context/TokenProvider';
import { useWalletContext } from '@context/WalletProvider';
import { getNFTEditionFactory, getNFTUniqueFactory } from '@utils/web3';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { NFTUniqueContractAdd } from 'src/config/contracts';
import { useProvider } from 'wagmi';
import styles from './NFTContent.module.scss';
//TODO-WIP: make all nfts data as claim, minted first by the owner
const NFTContent = () => {
  const [NFTData, setNFTData] = useState();
  const { tokenSymbol } = useWalletContext();
  const { NFTData: _NFTData } = useTokenContext();
  const provider = useProvider();

  const claimToken = () => {
    const NFTEditionContract = getNFTEditionFactory({ provider });
  };

  const getToken = (isFree) => () => {
    claimERC115Token();
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
