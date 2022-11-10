import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
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
import { defaultStakingAmount, minStakingAmount } from '@constants/common';
import InputComponent from '@components/common/Input.component';
import { getStakingFactory, getTokenFactory } from '@utils/web3';
import {
  ERC20TokenContractAdd,
  StakingContractAdd,
} from 'src/config/contracts';

const ProfileContent = () => {
  //TODO: add link to display tokens on metamask
  //https://ethereum.stackexchange.com/questions/99343/how-to-automatically-add-a-custom-token-to-metamask-with-ethers-js

  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState();
  const [tokenAmount, setTokenAmount] = useState(minStakingAmount);
  const { userCustomTokenBalance } = useWalletContext();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();

  useEffect(() => {
    setIsWalletConnected(isConnected);
  }, [address]);

  const isFormValid = ({ stakingAmount }) => {
    if (!stakingAmount) return false;
    if (stakingAmount <= 0) return false;
    //TODO: check stakingAmount is not greater than default staking amount
    //rn there's an input min and max
    return true;
  };
  //TODO-WIP: if user has already stake, hide stake option and show unstake option
  //TODO-WIP: display a legend amount of tokens being staked

  const stakeAction = async () => {
    const stakingContract = getStakingFactory({ signer });
    const tokenContract = getTokenFactory({ signer });
    const allowanceAmount = await tokenContract.allowance(
      address,
      StakingContractAdd
    );
    let tx;
    //TODO: it might not be necessary this check bc the staking tx is gonna be done just once
    if (allowanceAmount?.toString() <= 0) {
      //TODO-WIP: set hash and display staking status
      //TODO-WIP: if there's no hash just display approving
      tx = await tokenContract.approve(
        StakingContractAdd,
        ethers.utils.parseEther(defaultStakingAmount.toString())
      );
      await tx.wait();
    }

    //TODO-WIP: if page apporving is displayed, also display staking
    tx = await stakingContract.stake(
      ethers.utils.parseEther(tokenAmount.toString()),
      ERC20TokenContractAdd
    );
    await tx.wait();
  };

  const stakingAction = async (e) => {
    e.preventDefault();
    const _isFormValid = isFormValid({ stakingAmount: tokenAmount });
    _isFormValid && stakeAction();
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
