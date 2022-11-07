import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useWalletContext } from '@context/WalletProvider';
import styles from './ProfileContent.module.scss';
import Link from 'next/link';

const ProfileContent = () => {
  const [isWalletConnected, setIsWalletConnected] = useState();
  const { userCustomTokenBalance } = useWalletContext();
  const { address, isConnected } = useAccount();
  useEffect(() => {
    setIsWalletConnected(isConnected);
  }, [address]);
  return (
    <div className={styles['content']}>
      <div className={styles['connect-btn']}>
        <ConnectButton showBalance={false} />
      </div>
      {isWalletConnected && (
        <div className={styles['profile']}>
          <span className={`subtitle`}>Available tokens</span>
          {userCustomTokenBalance && (
            <span>
              {`${ethers.utils.formatEther(userCustomTokenBalance)} $BATL`}
            </span>
          )}
          {userCustomTokenBalance?.toString() == 0 && (
            <Link href='/tokens'>
              <p>
                <u className='hand'>Claim tokens</u>
              </p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
