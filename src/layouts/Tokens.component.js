import ButtonComponent from '@components/common/Button.component';
import {
  getEth,
  NFTPage,
  tokenModal,
  tokenPageLabel,
} from '@placeholders/tokens.placeholder';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount, useBalance, useSigner } from 'wagmi';
import {
  ClaimableContractAdd,
  ERC20TokenContractAdd,
  OwnerAddress,
} from 'src/config/contracts';
import ToastComponent from '@components/common/Toast.component';
import {
  getClaimableFactory,
  getNFTEditionFactory,
  getNFTUniqueFactory,
  getTokenFactory,
} from '@utils/web3';
import { localStorageKeys } from '@keys/localStorage';
import { useRouter } from 'next/router';
import { useProvider } from 'wagmi';
import { useWalletContext } from '@context/WalletProvider';
import { navbarElements } from '@placeholders/navbar.placeholders';
import styles from './Token.module.scss';
import { ethers } from 'ethers';
import LoadingComponent from '@components/common/Loading.component';
import NFTContent from '@layouts/NFTContent.component';
import { useTokenContext } from '@context/TokenProvider';

//TODO: I might have to build in a different project for claiming and nft tokens
const TokensComponent = ({ NFTData }) => {
  const { setNFTData } = useTokenContext();
  const [activeTknClaimHash, setActiveTknClaimHash] = useState();
  const [activeNFTHash, setActiveNFTHash] = useState();
  const [showToast, setShowToast] = useState();
  const [toastVariant, setToastVariant] = useState();
  const [ethUserBalance, setEthUserBalance] = useState();
  const [isConnected, setIsConnected] = useState();
  const { data: signer } = useSigner();
  const { userCustomTokenBalance, tokenSymbol } = useWalletContext();
  const provider = useProvider();
  const { address, isConnected: _isConnected } = useAccount();
  console.log(
    '🚀 ~ file: Tokens.component.js:47 ~ TokensComponent ~ address',
    address
  );

  const getBalance = async ({ provider, address }) => {
    const userBalance = await provider.getBalance(address);
    const _balance = ethers.utils.formatEther(userBalance?.toString());
    setEthUserBalance((+_balance).toFixed(4));
  };
  //todo-wip split up in an new project for tokens ,claims, nfts and dao core
  const setNFTsMetadata = async (nfts) => {
    const NFTEditionContract = getNFTEditionFactory({ provider });
    const resp = await Promise.all(
      nfts.map(async (elem) => {
        const ownerBalance = await NFTEditionContract.balanceOf(
          OwnerAddress,
          elem.id
        );
        const totalSupply = (
          await NFTEditionContract.totalSupply(elem.id)
        ).toString();
        const quantityLeft = ownerBalance.toString();
        const allMinted = ownerBalance.toString() == 0;
        let price = await NFTEditionContract.getTokenPrice(elem.id);
        price = ethers.utils.formatEther(price).toString();
        return {
          ...elem,
          allMinted,
          quantityLeft,
          totalSupply,
          price,
          free: price <= 0,
        };
      })
    );
    setNFTData(resp);
  };

  useEffect(() => {
    address && getBalance({ provider, address });
    setNFTsMetadata(NFTData);
  }, [address]);

  useEffect(() => {
    setIsConnected(_isConnected);
  }, [_isConnected]);

  const router = useRouter();

  const isFinishedTransferTx = async ({ provider }) => {
    const tokenContract = getTokenFactory({ provider });
    //TODO: listen transfer event not just in token component, but also all over the app _app file
    tokenContract.on('Transfer', async (from, to) => {
      console.log(
        '🚀 ~ file: Tokens.component.js:97 ~ tokenContract.on ~ from',
        from
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:106 ~ tokenContract.on ~ to',
        to
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:107 ~ tokenContract.on ~ from?.toLowerCase() == ClaimableContractAdd?.toLowerCase()',
        from?.toLowerCase() == ClaimableContractAdd?.toLowerCase()
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:109 ~ tokenContract.on ~ to?.toLowerCase() == address?.toLowerCase()',
        to?.toLowerCase() == address?.toLowerCase()
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:115 ~ tokenContract.on ~ from?.toLowerCase()',
        from?.toLowerCase()
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:117 ~ tokenContract.on ~ to?.toLowerCase()',
        to?.toLowerCase()
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:117 ~ tokenContract.on ~ ClaimableContractAdd?.toLowerCase()',
        ClaimableContractAdd?.toLowerCase()
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:119 ~ tokenContract.on ~ address?.toLowerCase()',
        address?.toLowerCase()
      );
      console.log(
        '🚀 ~ file: Tokens.component.js:136 ~ tokenContract.on ~ address',
        address
      );
      if (
        from?.toLowerCase() == ClaimableContractAdd?.toLowerCase() &&
        to?.toLowerCase() == address?.toLowerCase()
      ) {
        window.localStorage.setItem(localStorageKeys.isWeb3User, true);
        await finishTx();
      }
    });
  };

  useEffect(() => {
    setActiveTknClaimHash(
      !!window.localStorage.getItem(localStorageKeys.claimingTxHash)
    );
    isFinishedTransferTx({ provider });
  }, []);

  const setCloseCurrentTx = () => {
    window.localStorage.removeItem(localStorageKeys.claimingTxHash);
  };

  const finishTx = async () => {
    setCloseCurrentTx();
    router.push(`/${navbarElements.profile.label}`);
    await new Promise((r) => setTimeout(r, 2000));
    window.location.reload(true);
  };

  const getEths = (URL) => () => {
    URL && window.open(URL, '_tab');
  };

  const getTokensAction = async () => {
    try {
      const claimableContract = getClaimableFactory({ signer });
      let tx = await claimableContract.claim(ERC20TokenContractAdd);
      window.localStorage.setItem(localStorageKeys.claimingTxHash, tx.hash);
      setActiveTknClaimHash(tx.hash);
      await tx.wait();
    } catch (error) {
      setCloseCurrentTx();
      setShowToast(error.reason?.replace('execution reverted:', ''));
      setToastVariant('error');
    }
  };

  return (
    <>
      <div className={styles['content']}>
        {!activeTknClaimHash && !activeNFTHash ? (
          <>
            {(!isConnected || userCustomTokenBalance?.toString() <= 0) && (
              <>
                <span className={styles['title']}>{tokenPageLabel.title}</span>
                <p
                  className={styles['description']}
                  dangerouslySetInnerHTML={{
                    __html: tokenPageLabel.description(tokenSymbol),
                  }}
                />
                <div className={styles['button']}>
                  <div className={styles['user-connected-btn']}>
                    <ConnectButton showBalance={false} />
                  </div>
                  {ethUserBalance > 0 && (
                    <ButtonComponent
                      className={styles['button__content']}
                      buttonType='primary'
                      btnLabel={tokenPageLabel.buttonLabel}
                      onClick={getTokensAction}
                    />
                  )}
                  {ethUserBalance <= 0.005 && (
                    <ButtonComponent
                      className={styles['get-eth']}
                      buttonType='tertiary'
                      btnLabel={getEth.buttonLabel}
                      onClick={getEths(getEth.URL)}
                    />
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <LoadingComponent
            title={
              activeTknClaimHash ? tokenModal.claiming : NFTPage.transferringNFT
            }
            description={tokenModal.description}
            fullHeight
          />
        )}
      </div>
      {isConnected &&
        userCustomTokenBalance?.toString() > 0 &&
        !activeTknClaimHash &&
        !activeNFTHash && (
          <>
            <NFTContent />
          </>
        )}
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

export default TokensComponent;
