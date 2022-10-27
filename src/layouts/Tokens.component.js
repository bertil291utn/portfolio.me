import ButtonComponent from '@components/common/Button.component';
import { tokenPageLabel } from '@placeholders/tokens.placeholder';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { getTokenFactory } from '@utils/web3';
import { ethers } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import styles from './Token.module.scss';
import { useWalletContext } from 'src/context/WalletProvider';

const TokensComponent = () => {
  const [isWalletConnected, setIsWalletConnected] = useState();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const { userCustomTokenBalance } = useWalletContext();
  useEffect(() => {
    setIsWalletConnected(isConnected);
  });
  //TODO: display smart contract error try/catch
  //TODO: add a waiting or loading modal after each wait tx
  const getTokensAction = async () => {
    const tokenContract = getTokenFactory({ signer });
    let tx = await tokenContract.approve(
      address,
      // ethers.utils.parseUnits((100).toString())
      100
    );
    await tx.wait();
    tx = await tokenContract.transferFrom(
      // '0xA0E5DD804aBC46858c2f6Af9abE9c949f4f40DF6',
      address,
      ethers.BigNumber.from('100000000000000000000')
      // ethers.utils.parseUnits((100).toString())

      // 10000
    );

    //use tranferfrom
    //apporve the same quantity
    // check remix example
    await tx.wait();
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
