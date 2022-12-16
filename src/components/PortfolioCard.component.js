import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { localStorageKeys } from '@keys/localStorage';
import ModalComponent from '@components/common/Modal.component';
import { useWalletContext } from '@context/WalletProvider';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { useRouter } from 'next/router';
import {
  PortfolioCardLabel,
  PortfolioLabel,
} from '@placeholders/portfolio.placeholder';
import { IdContent } from '@placeholders/profile.placeholder';
import { useAccount, useProvider } from 'wagmi';
import { getRatingFactory } from '@utils/web3';
import ToastComponent from '@components/common/Toast.component';
import LoadingComponent from '@components/common/Loading.component';
import { isTokenCheckPassed } from '@utils/common';
import { web3Website } from 'src/config/URLs';

const PortfolioCard = ({
  type,
  description,
  projectName,
  overview,
  github,
  isRated,
}) => {
  const { userCustomTokenBalance, userStakedAmount, tokenSymbol } =
    useWalletContext();
  const [claimTokensModal, setClaimTokensModal] = useState(false);
  const [stakeTokensModal, setStakeTokensModal] = useState(false);
  const [isStakeHolder, setIsStakeHolder] = useState(false);
  const [toastVariant, setToastVariant] = useState();
  const [showToast, setShowToast] = useState();
  const [activeRatingHash, setActiveRatingHash] = useState();
  const [activeUnRatingHash, setActiveUnRatingHash] = useState();

  const { resolvedTheme } = useTheme();
  const provider = useProvider();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { address } = useAccount();

  const listenEvents = ({ provider, address }) => {
    const ratingContract = getRatingFactory({ provider });
    //TODO: listen transfer event not just in rating component, but also all over the app _app file
    ratingContract.on('RatedProject', async (from, rated) => {
      if (from?.toLowerCase() == address?.toLowerCase()) {
        await finishTx({
          txHashKeyName: rated
            ? localStorageKeys.ratingTxHash
            : localStorageKeys.unRatingTxHash,
          path: '',
          reload: true,
        });
      }
    });
  };

  const removeLocalStorageItem = (txHashKeyName) => {
    window.localStorage.removeItem(txHashKeyName);
  };

  const finishTx = async ({ txHashKeyName, path, reload = false }) => {
    removeLocalStorageItem(txHashKeyName);
    setActiveRatingHash();
    setActiveRatingHash();
    router.push(`/${path}`);
    await new Promise((r) => setTimeout(r, 2000));
    reload && window.location.reload();
  };

  useEffect(() => {
    setMounted(true);

    !isRated &&
      setActiveRatingHash(
        !!window.localStorage.getItem(localStorageKeys.ratingTxHash)
      );
    isRated &&
      setActiveUnRatingHash(
        !!window.localStorage.getItem(localStorageKeys.unRatingTxHash)
      );
  }, []);

  useEffect(() => {
    listenEvents({ provider, address });
  }, [address]);

  useEffect(() => {
    setIsStakeHolder(userStakedAmount?.toString() > 0);
  }, [userStakedAmount]);

  if (!mounted) {
    return null;
  }

  const openURL = (URL) => () => {
    const _isTokenCheckPassed = isTokenCheckPassed({
      setClaimTokensModal,
      setStakeTokensModal,
      userCustomTokenBalance,
      isStakeHolder,
    });
    _isTokenCheckPassed && window.open(URL, '_blank');
  };

  const claimAcceptBtnAction = () => {
    window.open(`${web3Website}`, '_tab');
  };

  const stakeAcceptBtnAction = () => {
    window.open(`${web3Website}/profile#${IdContent.staking}`, '_tab');
  };

  return (
    <>
      <div
        className={`${styles['card-content']} ${
          resolvedTheme === 'dark' ? styles['card-content__dark'] : ''
        }`}
      >
        {!activeRatingHash && !activeUnRatingHash && (
          <>
            <div>
              <span className={styles['card-content__tech']}>{type}</span>
              <span className={styles['card-content__project']}>
                {projectName}
              </span>
              <span className={styles['card-content__description']}>
                {description}
              </span>
            </div>
            <div className={styles['card-content__icons']}>
              {overview && (
                <TbWorld
                  className={styles['icon-size']}
                  title={PortfolioLabel.onlineVersionTitle}
                  onClick={openURL(overview)}
                />
              )}

              {github && (
                <AiFillGithub
                  className={styles['icon-size']}
                  title={PortfolioLabel.githubRepoTitle}
                  onClick={openURL(github)}
                />
              )}
            </div>
          </>
        )}

        {(activeRatingHash || activeUnRatingHash) && (
          <LoadingComponent
            title={
              activeRatingHash
                ? PortfolioCardLabel.rating
                : PortfolioCardLabel.unRating
            }
          />
        )}
      </div>
      <ModalComponent
        show={claimTokensModal}
        setShow={setClaimTokensModal}
        acceptLabel={PortfolioLabel.freeTokensBtn}
        acceptBtnAction={claimAcceptBtnAction}
      >
        {PortfolioLabel.modalClaimDesc(tokenSymbol)}
      </ModalComponent>
      <ModalComponent
        show={stakeTokensModal}
        setShow={setStakeTokensModal}
        acceptLabel={PortfolioLabel.stakeTokensBtn}
        acceptBtnAction={stakeAcceptBtnAction}
      >
        {PortfolioLabel.modalStakeDesc(tokenSymbol)}
      </ModalComponent>
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

export default PortfolioCard;
