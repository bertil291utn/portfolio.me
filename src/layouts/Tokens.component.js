import ButtonComponent from '@components/common/Button.component';
import { tokenModal, tokenPageLabel } from '@placeholders/tokens.placeholder';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount, useBalance, useSigner } from 'wagmi';
import {
  ClaimableContractAdd,
  ERC20TokenContractAdd,
} from 'src/config/contracts';
import ToastComponent from '@components/common/Toast.component';
import { getClaimableFactory, getTokenFactory } from '@utils/web3';
import { localStorageKeys } from '@keys/localStorage';
import { useRouter } from 'next/router';
import { useProvider } from 'wagmi';
import { useWalletContext } from '@context/WalletProvider';
import { navbarElements } from '@placeholders/navbar.placeholders';
import styles from './Token.module.scss';
import LoadingComponent from '@components/common/Loading.component';

const TokensComponent = () => {
  const [isWalletConnected, setIsWalletConnected] = useState();
  const [hasActiveHash, setHasActiveHash] = useState();
  const [showToast, setShowToast] = useState();
  const [toastVariant, setToastVariant] = useState();
  const { data: signer } = useSigner();
  const { userCustomTokenBalance } = useWalletContext();
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const { data: userBalance } = useBalance({
    address,
  });

  const router = useRouter();
  useEffect(() => {
    setIsWalletConnected(isConnected);
  });

  const isFinishedTransferTx = async ({ provider }) => {
    const tokenContract = getTokenFactory({ provider });
    //TODO: listen transfer event not just in token component, but also all over the app _app file
    tokenContract.on('Transfer', async (from, to) => {
      if (from == ClaimableContractAdd && to == address) {
        await finishTx();
      }
    });
  };

  useEffect(() => {
    userCustomTokenBalance?.toString() > 0 &&
      router.push(`/${navbarElements.profile.label}`);
  }, [userCustomTokenBalance]);

  useEffect(() => {
    setHasActiveHash(
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
      setHasActiveHash(tx.hash);
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
        {!hasActiveHash ? (
          <>
            <span className={styles['title']}>{tokenPageLabel.title}</span>
            <p
              className={styles['description']}
              dangerouslySetInnerHTML={{ __html: tokenPageLabel.description }}
            ></p>
            <div className={styles['button']}>
              <div className={styles['user-connected-btn']}>
                <ConnectButton showBalance={false} />
              </div>
              {isWalletConnected && (
                <>
                  <ButtonComponent
                    className={styles['button__content']}
                    buttonType='primary'
                    btnLabel={tokenPageLabel.buttonLabel}
                    onClick={getTokensAction}
                  />

                  {userBalance?.formatted <= 0 && (
                    <ButtonComponent
                      className={styles['get-eth']}
                      buttonType='tertiary'
                      btnLabel={'Get Eth'}
                      onClick={getEths('https://goerlifaucet.com/')}
                    />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <LoadingComponent
            title={tokenModal.claiming}
            description={tokenModal.description}
            fullHeight
          />
        )}
      </div>
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
