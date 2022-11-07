import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { localStorageKeys } from '@keys/localStorage';
import ModalComponent from '@components/common/Modal.component';
import { useWalletContext } from '@context/WalletProvider';

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const openURL = (URL) => () => {
    if (
      window.localStorage.getItem(localStorageKeys.isWeb3User) &&
      userCustomTokenBalance?.toString() == 0
    ) {
      setClaimTokensModal(true);
      return;
    }
    // TODO-WIP:if has tokens but hasn't deposit on smart contract

    window.open(URL, '_blank');
  };

  const rateProject = () => {
    alert('rate project');
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
            title='Online version'
            onClick={openURL(overview)}
          />
        )}

        {github && (
          <AiFillGithub
            className={styles['icon-size']}
            title='Github repository'
            onClick={openURL(github)}
          />
        )}

        <AiFillStar
          className={styles['icon-size']}
          title='Rate this project'
          onClick={rateProject}
        />
      </div>
      <ModalComponent show={claimTokensModal} setShow={setClaimTokensModal}>
        {'Claim $BATL free tokens first, then interact with app '}
      </ModalComponent>
    </div>
  );
};

export default PortfolioCard;
