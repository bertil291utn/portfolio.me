import LoadingComponent from '@components/common/Loading.component';
import NFTCard from '@components/common/NFTCard.component';
import { defaultStakingAmount } from '@constants/common';
import { useTokenContext } from '@context/TokenProvider';
import { useWalletContext } from '@context/WalletProvider';
import {
  getNFTEditionClaimableFactory,
  getNFTEditionFactory,
  getTokenFactory,
} from '@utils/web3';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import {
  ERC20TokenContractAdd,
  NFTEditionClaimableContractAdd,
  NFTEditionContractAdd,
  OwnerAddress,
} from 'src/config/contracts';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { NFTPage, NFTTokensLoading } from '@placeholders/tokens.placeholder';
import styles from './NFTContent.module.scss';

const NFTContent = () => {
  const [activeApprovingHash, setActiveApprovingHash] = useState();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [NFTData, setNFTData] = useState();
  const { tokenSymbol } = useWalletContext();
  const { NFTData: _NFTData } = useTokenContext();
  const provider = useProvider();
  //TODO-WIP: add tx hashes and messages and listeners and local storage vars
  //test with more than edition tokens
  const getToken = (tokenId) => async () => {
    const NFTEditionContract = getNFTEditionFactory({ provider });
    const NFTClaimableEditionContract = getNFTEditionClaimableFactory({
      signer,
    });
    const tokenContract = getTokenFactory({ signer });

    let tx;
    try {
      const tokenPrice = await NFTEditionContract.getTokenPrice(tokenId);
      const allowanceAmount = await tokenContract.allowance(
        address,
        NFTEditionClaimableContractAdd
      );

      //if claimable nft 1155 was not approved then approve
      if (tokenPrice > 0 && allowanceAmount?.toString() == 0) {
        tx = await tokenContract.approve(
          NFTEditionClaimableContractAdd,
          ethers.utils.parseEther(defaultStakingAmount.toString())
        );
        await tx.wait();
      }
      tx = await NFTClaimableEditionContract.mintUser(
        tokenId,
        NFTEditionContractAdd,
        ERC20TokenContractAdd,
        OwnerAddress
      );
      await tx.wait();
    } catch (error) {
      console.log(
        '🚀 ~ file: NFTContent.component.js:37 ~ getToken ~ error',
        error.reason
      );
    }
  };

  useEffect(() => {
    setNFTData(_NFTData);
  }, [_NFTData]);

  return (
    <>
      {!activeApprovingHash && (
        <div className={styles['container']}>
          <div className={styles['header']}>
            <span className={styles['title']}>{NFTPage.title}</span>
            <p className={styles['description']}>
              {NFTPage.description(tokenSymbol)}
            </p>
          </div>
          <div className={styles['cards']}>
            {NFTData?.map((elem, index) => {
              return !elem.allMinted ? (
                <NFTCard
                  className={styles['card-item']}
                  key={`card-${++index}`}
                  srcImage={elem.image}
                  name={elem.name}
                  price={`${elem.free ? 0 : elem.price} ${tokenSymbol}`}
                  superRare={elem.superRare}
                  isFree={elem.free}
                  onClick={getToken(elem.id)}
                  quantityLeft={elem.quantityLeft}
                  totalSupply={elem.totalSupply}
                />
              ) : null;
            })}
          </div>
        </div>
      )}
      <>
        {activeApprovingHash && (
          <LoadingComponent
            title={NFTTokensLoading.approving}
            description={NFTTokensLoading.approvingDescription}
            fullHeight
          />
        )}
      </>
    </>
  );
};

export default NFTContent;
