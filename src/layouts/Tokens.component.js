import ButtonComponent from '@components/common/Button.component';
import { tokenPageLabel } from '@placeholders/tokens.placeholder';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import styles from './Token.module.scss';
import { ERC20TokenContractAdd } from 'src/config/contratcs';
import ToastComponent from '@components/common/Toast.component';
import { getClaimableFactory } from '@utils/web3';

const TokensComponent = () => {
  const [isWalletConnected, setIsWalletConnected] = useState();
  const [showToast, setShowToast] = useState();
  const [toastVariant, setToastVariant] = useState();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  useEffect(() => {
    setIsWalletConnected(isConnected);
  });
  //TODO: add a waiting or loading modal after each wait tx
  //TODO: add link to display tokens on metamask
  //https://ethereum.stackexchange.com/questions/99343/how-to-automatically-add-a-custom-token-to-metamask-with-ethers-js

  const getTokensAction = async () => {
    try {
      const tokenContract = getClaimableFactory({ signer });
      let tx = await tokenContract.claim(ERC20TokenContractAdd);
      await tx.wait();
      //TODO: once pass all checks, return to home and refresh tokens
    } catch (error) {
      setShowToast(error.reason?.replace('execution reverted:', ''));
      setToastVariant('error');
    }
  };
  return (
    <>
      <div className={styles['content']}>
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
