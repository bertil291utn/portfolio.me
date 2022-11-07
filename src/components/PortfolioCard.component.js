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

const PortfolioCard = ({
  type,
  description,
  projectName,
  overview,
  github,
}) => {
  const { userCustomTokenBalance } = useWalletContext();
  const [claimTokensModal, setClaimTokensModal] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const checkTokens = () => {
    if (
      window.localStorage.getItem(localStorageKeys.isWeb3User) &&
      userCustomTokenBalance?.toString() == 0
    ) {
      setClaimTokensModal(true);
      return false;
    }
    // TODO-WIP:if has tokens but hasn't deposit on smart contract
    return true;
  };

  const openURL = (URL) => () => {
    const isCheckToken = checkTokens();
    isCheckToken && window.open(URL, '_blank');
  };

  const rateProject = () => {
    const isCheckToken = checkTokens();
  };

  const acceptBtnAction = () => {
    router.push(`/${navbarElements.tokens.label}`);
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
        acceptBtnAction={acceptBtnAction}
      >
        {PortfolioLabel.modalDesc}
      </ModalComponent>
    </div>
  );
};

export default PortfolioCard;
