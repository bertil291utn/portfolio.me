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
import ToastComponent from '@components/common/Toast.component';
import { localStorageKeys } from '@keys/localStorage';
import { useRouter } from 'next/router';
import { navbarElements } from '@placeholders/navbar.placeholders';

const NFTContent = () => {
  const router = useRouter();
  const [activeApprovingHash, setActiveApprovingHash] = useState();
  const [activeClaimingHash, setActiveClaimingHash] = useState();
  const [showToast, setShowToast] = useState();
  const [toastVariant, setToastVariant] = useState();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [NFTData, setNFTData] = useState();
  const { tokenSymbol } = useWalletContext();
  const { NFTData: _NFTData } = useTokenContext();
  const provider = useProvider();

  const listenEvents = ({ provider }) => {
    const NFTEditionContract = getNFTEditionFactory({
      provider,
    });
    const tokenContract = getTokenFactory({ provider });

    tokenContract.on('Approval', async (owner, spender) => {
      console.log(
        '🚀 ~ file: NFTContent.component.js:47 ~ tokenContract.on ~ spender',
        spender
      );
      console.log(
        '🚀 ~ file: NFTContent.component.js:47 ~ tokenContract.on ~ owner',
        owner
      );
      if (owner == address && spender == NFTEditionClaimableContractAdd) {
        await finishTx({
          txHashKeyName: localStorageKeys.approveClaimingNFTTokenTxHash,
          path: navbarElements.tokens.label,
        });
      }
    });

    NFTEditionContract.on('TransferSingle', async (_, from, to) => {
      console.log(
        '🚀 ~ file: NFTContent.component.js:58 ~ NFTEditionContract.on ~ to',
        to
      );
      console.log(
        '🚀 ~ file: NFTContent.component.js:58 ~ NFTEditionContract.on ~ from',
        from
      );
      if (from == OwnerAddress && to == address) {
        await finishTx({
          txHashKeyName: localStorageKeys.claimingNFTTokenTxHash,
          path: navbarElements.tokens.label,
          reload: true,
        });
      }
    });
  };

  useEffect(() => {
    setActiveApprovingHash(
      !!window.localStorage.getItem(
        localStorageKeys.approveClaimingNFTTokenTxHash
      )
    );
    setActiveClaimingHash(
      !!window.localStorage.getItem(localStorageKeys.claimingNFTTokenTxHash)
    );

    listenEvents({ provider });
  }, []);

  const finishTx = async ({ txHashKeyName, path, reload = false }) => {
    removeLocalStorageItem(txHashKeyName);
    setCurrentTxState[txHashKeyName]();
    router.push(`/${path}`);
    await new Promise((r) => setTimeout(r, 2000));
    reload && window.location.reload();
  };

  const removeLocalStorageItem = (txHashKeyName) => {
    window.localStorage.removeItem(txHashKeyName);
  };

  const setCurrentTxState = {
    [localStorageKeys.approveClaimingNFTTokenTxHash]: setActiveApprovingHash,
    [localStorageKeys.claimingNFTTokenTxHash]: setActiveClaimingHash,
  };

  const handleError = ({ error, txHashKeyName }) => {
    removeLocalStorageItem(txHashKeyName);
    setShowToast(error.reason?.replace('execution reverted:', ''));
    setToastVariant('error');
    setCurrentTxState[txHashKeyName]();
  };

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
        window.localStorage.setItem(
          localStorageKeys.approveClaimingNFTTokenTxHash,
          tx.hash
        );
        setActiveApprovingHash(tx.hash);
        await tx.wait();
      }
      tx = await NFTClaimableEditionContract.mintUser(
        tokenId,
        NFTEditionContractAdd,
        ERC20TokenContractAdd,
        OwnerAddress
      );
      window.localStorage.setItem(
        localStorageKeys.claimingNFTTokenTxHash,
        tx.hash
      );
      setActiveClaimingHash(tx.hash);
      await tx.wait();
    } catch (error) {
      handleError({
        error,
        txHashKeyName: localStorageKeys.claimingNFTTokenTxHash,
      });
    }
  };

  useEffect(() => {
    setNFTData(_NFTData);
  }, [_NFTData]);

  return (
    <>
      {!activeApprovingHash && !activeClaimingHash && (
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
        {activeClaimingHash && (
          <LoadingComponent title={NFTTokensLoading.claiming} fullHeight />
        )}
      </>
      <ToastComponent
        variant={toastVariant}
        show={showToast}
        setShow={setShowToast}
      >
        {showToast}
      </ToastComponent>
    </>
  );
};

export default NFTContent;
