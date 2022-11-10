import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useWalletContext } from '@context/WalletProvider';
import {
  IdContent,
  ProfileLabel,
  ProfileSections,
} from '@placeholders/profile.placeholder';
import ButtonComponent from '@components/common/Button.component';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { useRouter } from 'next/router';
import styles from './ProfileContent.module.scss';
import SectionPanel from '@components/common/SectionPanel.component';
import { minStakingAmount } from '@constants/common';
import InputComponent from '@components/common/Input.component';

const ProfileContent = () => {
  //TODO: add link to display tokens on metamask
  //https://ethereum.stackexchange.com/questions/99343/how-to-automatically-add-a-custom-token-to-metamask-with-ethers-js

  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState();
  const [tokenAmount, setTokenAmount] = useState(minStakingAmount);
  const { userCustomTokenBalance } = useWalletContext();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsWalletConnected(isConnected);
  }, [address]);

  const stakingAction = (e) => {
    e.preventDefault();
    console.log('staking 10 batl');
  };

  return (
    <div className={styles['content']}>
      <SectionPanel
        id={IdContent.walletInfo}
        title={ProfileSections.walletInfoTitle}
        subtitle={ProfileSections.walletInfoSubtitle}
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
        id={IdContent.staking}
        title={ProfileSections.stakingSectionTitle}
        subtitle={ProfileSections.stakingSectionSubtitle}
      >
        <div className={styles['staking']}>
          <form onSubmit={stakingAction} className={styles['form']}>
            <InputComponent
              className={styles['input']}
              type='number'
              name='tokenAmount'
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              min={'1'}
              max={'100'}
            />
            <ButtonComponent
              className={styles['button']}
              type={'submit'}
              buttonType={'primary'}
              btnLabel={'Stake'}
            />
          </form>
        </div>
      </SectionPanel>
    </div>
  );
};

export default ProfileContent;
