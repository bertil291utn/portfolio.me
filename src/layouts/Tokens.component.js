import ButtonComponent from '@components/common/Button.component';
import { localStorageKeys } from '@keys/localStorage';
import { tokenPageLabel } from '@placeholders/tokens.placeholder';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import styles from './Token.module.scss';

const TokensComponent = () => {
  const [isWalletConnected, setIsWalletConnected] = useState();
  const { isConnected } = useAccount();
  useEffect(() => {
    setIsWalletConnected(isConnected);
  });

  const getTokensAction = () => {
    console.log('get tokens');
  };
  return (
    <div className={styles['content']}>
      <span className={styles['title']}>{tokenPageLabel.title}</span>
      <p
        className={styles['description']}
        dangerouslySetInnerHTML={{ __html: tokenPageLabel.description }}
      ></p>
      <div className={styles['button']}>
        <ConnectButton showBalance={false} />
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
