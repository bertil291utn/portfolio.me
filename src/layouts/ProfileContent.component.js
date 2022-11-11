import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useWalletContext } from '@context/WalletProvider';
import {
  IdContent,
  ProfileLabel,
  profileLoading,
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
import LoadingComponent from '@components/common/Loading.component';
import { localStorageKeys } from '@keys/localStorage';
import ToastComponent from '@components/common/Toast.component';

const ProfileContent = () => {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState();
  const [showToast, setShowToast] = useState();
  const [toastVariant, setToastVariant] = useState();
  const [activeApprovingHash, setActiveApprovingHash] = useState();
  const [activeStakingHash, setActiveStakingHash] = useState();
  const [activeUnStakingHash, setActiveUnStakingHash] = useState();
  const { userCustomTokenBalance, userStakedAmount } = useWalletContext();
  const [tokenAmount, setTokenAmount] = useState();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  const setCurrentTxState = {
    [localStorageKeys.approveStakingTxHash]: setActiveApprovingHash,
    [localStorageKeys.stakingTxHash]: setActiveStakingHash,
    [localStorageKeys.unStakingTxHash]: setActiveUnStakingHash,
  };

  const listenEvents = ({ provider }) => {
    const stakingContract = getStakingFactory({ provider });
    const tokenContract = getTokenFactory({ provider });
    //LISTENERS

    //TODO: listen transfer event not just in token component, but also all over the app _app file
    tokenContract.on('Approval', async (owner, spender) => {
      if (owner == address && spender == StakingContractAdd) {
        await finishTx({
          txHashKeyName: localStorageKeys.approveStakingTxHash,
          path: navbarElements.profile.label,
        });
      }
    });

    stakingContract.on('Staked', async (user) => {
      if (user == address) {
        await finishTx({
          txHashKeyName: localStorageKeys.stakingTxHash,
          path: navbarElements.profile.label,
          reload: true,
        });
      }
    });

    stakingContract.on('Unstake', async (user) => {
      if (user == address) {
        await finishTx({
          txHashKeyName: localStorageKeys.unStakingTxHash,
          path: navbarElements.profile.label,
          reload: true,
        });
      }
    });
  };
  //TODO: add link to display tokens on metamask
  //https://ethereum.stackexchange.com/questions/99343/how-to-automatically-add-a-custom-token-to-metamask-with-ethers-js
  useEffect(() => {
    setActiveApprovingHash(
      !!window.localStorage.getItem(localStorageKeys.approveStakingTxHash)
    );
    setActiveStakingHash(
      !!window.localStorage.getItem(localStorageKeys.stakingTxHash)
    );
    setActiveUnStakingHash(
      !!window.localStorage.getItem(localStorageKeys.unStakingTxHash)
    );

    listenEvents({ provider });
  }, []);

  useEffect(() => {
    const _tokenInputVal =
      userStakedAmount?.toString() <= 0
        ? minStakingAmount
        : userStakedAmount &&
          ethers.utils.formatEther(userStakedAmount?.toString());
    setTokenAmount(_tokenInputVal);
  }, [userStakedAmount]);

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

  const removeLocalStorageItem = (txHashKeyName) => {
    window.localStorage.removeItem(txHashKeyName);
  };

  const handleError = ({ error, txHashKeyName }) => {
    //TODO-WIP: add an object to get just object[txHashKeyName], instead os use comparison
    removeLocalStorageItem(txHashKeyName);
    setShowToast(error.reason?.replace('execution reverted:', ''));
    setToastVariant('error');
    setCurrentTxState[txHashKeyName]();
  };

  const finishTx = async ({ txHashKeyName, path, reload = false }) => {
    removeLocalStorageItem(txHashKeyName);
    setCurrentTxState[txHashKeyName]();
    router.push(`/${path}`);
    await new Promise((r) => setTimeout(r, 2000));
    reload && window.location.reload();
  };

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
      try {
        tx = await tokenContract.approve(
          StakingContractAdd,
          ethers.utils.parseEther(defaultStakingAmount.toString())
        );
        window.localStorage.setItem(
          localStorageKeys.approveStakingTxHash,
          tx.hash
        );
        setActiveApprovingHash(tx.hash);
        await tx.wait();
      } catch (error) {
        handleError({
          error,
          txHashKeyName: localStorageKeys.approveStakingTxHash,
        });
        return;
      }
    }

    try {
      tx = await stakingContract.stake(
        ethers.utils.parseEther(tokenAmount.toString()),
        ERC20TokenContractAdd
      );
      setActiveStakingHash(tx.hash);
      window.localStorage.setItem(localStorageKeys.stakingTxHash, tx.hash);
      await tx.wait();
    } catch (error) {
      handleError({
        error,
        txHashKeyName: localStorageKeys.stakingTxHash,
      });
    }
  };

  const unStakeAction = async () => {
    const stakingContract = getStakingFactory({ signer });
    let tx;
    try {
      tx = await stakingContract.unstake(
        ethers.utils.parseEther(tokenAmount.toString()),
        ERC20TokenContractAdd
      );
      window.localStorage.setItem(localStorageKeys.unStakingTxHash, tx.hash);
      setActiveUnStakingHash(tx.hash);
      await tx.wait();
    } catch (error) {
      handleError({
        error,
        txHashKeyName: localStorageKeys.unStakingTxHash,
      });
    }
  };

  const unStakingAction = (e) => {
    e.preventDefault();
    const _isFormValid = isFormValid({ stakingAmount: tokenAmount });
    _isFormValid && unStakeAction();
  };

  const stakingAction = (e) => {
    e.preventDefault();
    const _isFormValid = isFormValid({ stakingAmount: tokenAmount });
    _isFormValid && stakeAction();
  };

  return (
    <>
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
              <span>
                {`${ethers.utils.formatEther(userCustomTokenBalance || 0)} $${
                  ProfileLabel.tokenName
                }`}
              </span>
              {userCustomTokenBalance?.toString() == 0 && (
                <div className={styles['claim-btn']}>
                  <ButtonComponent
                    onClick={() =>
                      router.push(`/${navbarElements.tokens.label}`)
                    }
                    buttonType='primary'
                    btnLabel={ProfileLabel.claimTokens}
                  />
                </div>
              )}
            </div>
          )}
        </SectionPanel>

        {userCustomTokenBalance?.toString() > 0 && (
          <SectionPanel
            id={IdContent.staking}
            title={ProfileSections.stakingSectionTitle}
            subtitle={ProfileSections.stakingSectionSubtitle}
          >
            {!activeApprovingHash &&
              !activeStakingHash &&
              !activeUnStakingHash && (
                <div className={styles['staking']}>
                  <form
                    onSubmit={
                      userStakedAmount?.toString() > 0
                        ? unStakingAction
                        : stakingAction
                    }
                    className={styles['form']}
                  >
                    <InputComponent
                      className={styles['input']}
                      type='number'
                      name='tokenAmount'
                      value={tokenAmount || ''}
                      onChange={(e) => setTokenAmount(e.target.value)}
                      min={'1'}
                      max={
                        userStakedAmount?.toString() > 0
                          ? ethers.utils.formatEther(userStakedAmount || 0)
                          : '100'
                      }
                    />
                    <ButtonComponent
                      className={styles['button']}
                      type={'submit'}
                      buttonType={'primary'}
                      btnLabel={
                        userStakedAmount?.toString() > 0 ? 'Unstake' : 'Stake'
                      }
                    />
                  </form>
                  {userStakedAmount?.toString() > 0 && (
                    <div>
                      <span className={`subtitle`}>
                        {ProfileLabel.stakedTokens}
                      </span>
                      <span>
                        {`${ethers.utils.formatEther(userStakedAmount)} $${
                          ProfileLabel.tokenName
                        }`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            {
              <>
                {activeApprovingHash && (
                  <LoadingComponent
                    title={profileLoading.approving}
                    description={profileLoading.approvingDescription}
                  />
                )}
                {activeStakingHash && (
                  <LoadingComponent title={profileLoading.staking} />
                )}
                {activeUnStakingHash && (
                  <LoadingComponent title={profileLoading.unStaking} />
                )}
              </>
            }
          </SectionPanel>
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

export default ProfileContent;
