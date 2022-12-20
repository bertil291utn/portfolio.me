import styles from './PortfolioCard.module.scss';
import { TbWorld } from 'react-icons/tb';
import { AiFillGithub } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ModalComponent from '@components/common/Modal.component';
import { useWalletContext } from '@context/WalletProvider';
import {
  PortfolioLabel,
} from '@placeholders/portfolio.placeholder';
import { IdContent } from '@placeholders/profile.placeholder';
import { isTokenCheckPassed } from '@utils/common';
import { web3Website } from 'src/config/URLs';

const PortfolioCard = ({
  type,
  description,
  projectName,
  overview,
  github,
}) => {
  const { userCustomTokenBalance, userStakedAmount, tokenSymbol } =
    useWalletContext();
  const [claimTokensModal, setClaimTokensModal] = useState(false);
  const [stakeTokensModal, setStakeTokensModal] = useState(false);
  const [isStakeHolder, setIsStakeHolder] = useState(false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);




  useEffect(() => {
    setMounted(true);
  }, []);


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
    </>
  );
};

export default PortfolioCard;
