import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { localStorageKeys } from '@keys/localStorage';
import ModalComponent from '@components/common/Modal.component';
import { useWalletContext } from '@context/WalletProvider';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { useRouter } from 'next/router';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { IdContent } from '@placeholders/profile.placeholder';

const PortfolioCard = ({
  type,
  description,
  projectName,
  overview,
  github,
}) => {
  const { userCustomTokenBalance } = useWalletContext();
  const [claimTokensModal, setClaimTokensModal] = useState(false);
  const [stakeTokensModal, setStakeTokensModal] = useState(false);
  const [isStakeHolder, setIsStakeHolder] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setIsStakeHolder(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const isTokenCheckPassed = () => {
    if (!window.localStorage.getItem(localStorageKeys.isWeb3User)) {
      return true;
    }

    if (userCustomTokenBalance?.toString() == 0) {
      setClaimTokensModal(true);
      return false;
    }
    if (!isStakeHolder) {
      setStakeTokensModal(true);
      return false;
    }
    return true;
  };

  const openURL = (URL) => () => {
    const _isTokenCheckPassed = isTokenCheckPassed();
    _isTokenCheckPassed && window.open(URL, '_blank');
  };

  const rateProject = () => {
    const _isTokenCheckPassed = isTokenCheckPassed();
    //  _isTokenCheckPassed && /*open rate modal or something*/
  };

  const claimAcceptBtnAction = () => {
    router.push(`/${navbarElements.tokens.label}`);
  };

  const stakeAcceptBtnAction = () => {
    router.push(`/${navbarElements.profile.label}#${IdContent.staking}`);
  };

  return (
    <div
      className={`${styles['card-content']} ${
        resolvedTheme === 'dark' ? styles['card-content__dark'] : ''
      }`}
    >
      <div>
        <span className={styles['card-content__tech']}>{type}</span>
        <span className={styles['card-content__project']}>{projectName}</span>
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

        <AiFillStar
          className={styles['icon-size']}
          title={PortfolioLabel.rateProjectTitle}
          onClick={rateProject}
        />
      </div>
      <ModalComponent
        show={claimTokensModal}
        setShow={setClaimTokensModal}
        acceptLabel={PortfolioLabel.freeTokensBtn}
        acceptBtnAction={claimAcceptBtnAction}
      >
        {PortfolioLabel.modalClaimDesc}
      </ModalComponent>
      <ModalComponent
        show={stakeTokensModal}
        setShow={setStakeTokensModal}
        acceptLabel={PortfolioLabel.stakeTokensBtn}
        acceptBtnAction={stakeAcceptBtnAction}
      >
        {PortfolioLabel.modalStakeDesc}
      </ModalComponent>
    </div>
  );
};

export default PortfolioCard;
