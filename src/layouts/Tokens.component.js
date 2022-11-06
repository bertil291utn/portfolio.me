import ButtonComponent from '@components/common/Button.component';
import { tokenModal, tokenPageLabel } from '@placeholders/tokens.placeholder';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import {
  ClaimableContractAdd,
  ERC20TokenContractAdd,
} from 'src/config/contracts';
import ToastComponent from '@components/common/Toast.component';
import { getClaimableFactory, getTokenFactory } from '@utils/web3';
import ModalComponent from '@components/common/Modal.component';
import { localStorageKeys } from '@keys/localStorage';
import { useRouter } from 'next/router';
import { useProvider } from 'wagmi';
import { useWalletContext } from '@context/WalletProvider';
import styles from './Token.module.scss';

const TokensComponent = () => {
  const [isWalletConnected, setIsWalletConnected] = useState();
  const [hasActiveHash, setHasActiveHash] = useState();
  const [showModal, setShowModal] = useState(true);
  const [showToast, setShowToast] = useState();
  const [toastVariant, setToastVariant] = useState();
  const { data: signer } = useSigner();
  const { userCustomTokenBalance } = useWalletContext();
  const provider = useProvider();
  const { address, isConnected } = useAccount();

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
    userCustomTokenBalance?.toString() > 0 && router.push('/');
  }, [userCustomTokenBalance]);

  useEffect(() => {
    const activeHash = window.localStorage.getItem(
      localStorageKeys.activeTxHash
    );
    setHasActiveHash(!!activeHash);
    isFinishedTransferTx({ provider });
  }, []);

  //TODO: add link to display tokens on metamask
  //https://ethereum.stackexchange.com/questions/99343/how-to-automatically-add-a-custom-token-to-metamask-with-ethers-js

  const setCloseCurrentTx = () => {
    window.localStorage.removeItem(localStorageKeys.activeTxHash);
  };

  const finishTx = async () => {
    setCloseCurrentTx();
    router.push('/');
    await new Promise((r) => setTimeout(r, 2000));
    window.location.reload(true);
  };

  const getTokensAction = async () => {
    try {
      const claimableContract = getClaimableFactory({ signer });
      let tx = await claimableContract.claim(ERC20TokenContractAdd);
      window.localStorage.setItem(localStorageKeys.activeTxHash, tx.hash);
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
                <ButtonComponent
                  className={styles['button__content']}
                  buttonType='primary'
                  btnLabel={tokenPageLabel.buttonLabel}
                  onClick={getTokensAction}
                />
              )}
            </div>
          </>
        ) : (
          <div className={styles['claimingTokens']}>
            <p className={styles['title']}>{tokenModal.claiming}</p>
          </div>
        )}
      </div>
      <ToastComponent
        variant={toastVariant}
        show={showToast}
        setShow={setShowToast}
      >
        {showToast}
      </ToastComponent>
      {hasActiveHash && (
        <ModalComponent show={showModal} setShow={setShowModal}>
          {tokenModal.description}
        </ModalComponent>
      )}
    </>
  );
};

export default TokensComponent;
