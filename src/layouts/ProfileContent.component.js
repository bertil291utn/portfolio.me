import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useWalletContext } from '@context/WalletProvider';
import { ProfileLabel } from '@placeholders/profile.placeholder';
import ButtonComponent from '@components/common/Button.component';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { useRouter } from 'next/router';
import styles from './ProfileContent.module.scss';
import SectionPanel from '@components/common/SectionPanel.component';

const ProfileContent = () => {
  //TODO: add link to display tokens on metamask
  //https://ethereum.stackexchange.com/questions/99343/how-to-automatically-add-a-custom-token-to-metamask-with-ethers-js

  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState();
  const { userCustomTokenBalance } = useWalletContext();
  const { address, isConnected } = useAccount();
  useEffect(() => {
    setIsWalletConnected(isConnected);
  }, [address]);
  return (
    <div className={styles['content']}>
      <SectionPanel
        title={'Wallet info'}
        subtitle={'Connection button and available tokens'}
      >
        <div className={styles['connect-btn']}>
          <ConnectButton showBalance={false} />
        </div>
        {isWalletConnected && (
          <div className={styles['profile']}>
            <span className={`subtitle`}>{ProfileLabel.availableTokens}</span>
            {userCustomTokenBalance && (
              <span>
                {`${ethers.utils.formatEther(userCustomTokenBalance)} $${
                  ProfileLabel.tokenName
                }`}
              </span>
            )}
            {userCustomTokenBalance?.toString() == 0 && (
              <div className={styles['claim-btn']}>
                <ButtonComponent
                  onClick={() => router.push(`/${navbarElements.tokens.label}`)}
                  buttonType='primary'
                  btnLabel={ProfileLabel.claimTokens}
                />
              </div>
            )}
          </div>
        )}
      </SectionPanel>

      <SectionPanel
        title={'Staking'}
        subtitle={'Stake $BATL tokens to rate, view and be part of our DAO'}
      >
        here staking
      </SectionPanel>
    </div>
  );
};

export default ProfileContent;
