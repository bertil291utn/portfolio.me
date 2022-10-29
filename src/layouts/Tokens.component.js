import ButtonComponent from '@components/common/Button.component';
import { tokenPageLabel } from '@placeholders/tokens.placeholder';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { getClaimableFactory, getTokenFactory } from '@utils/web3';
import { ethers } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import styles from './Token.module.scss';
import { useWalletContext } from 'src/context/WalletProvider';
import { ERC20TokenContractAdd } from 'src/config/contratcs';

const TokensComponent = () => {
  const [isWalletConnected, setIsWalletConnected] = useState();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const { userCustomTokenBalance } = useWalletContext();
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
      console.log(err.reason);
    }
  };
  return (
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
  );
};

export default TokensComponent;
