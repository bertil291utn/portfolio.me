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
import { web3Website } from 'src/config/URLs';
import { useAccount, useProvider } from 'wagmi';
import { getWeb3User } from '@utils/firebaseFunctions';
import { getNFT1155Factory } from '@utils/web3';

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
  const [isWeb3User, setIsWeb3User] = useState(false);
  const [NFTBalance, setNFTBalance] = useState();
  const provider = useProvider();

  const { address } = useAccount();

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const _setNFTBalance = async (ownerAddress, provider) => {
    const NFT1155Contract = getNFT1155Factory({ provider });
    const balance = await NFT1155Contract.balanceOfByOwner(ownerAddress);
    setNFTBalance(Number(balance))
  }

  useEffect(() => {
    address && provider && _setNFTBalance(address, provider);
    return () => {
      setNFTBalance(undefined);
    }
  }, [address, provider]);


  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    setIsStakeHolder(userStakedAmount?.toString() > 0);
  }, [userStakedAmount]);

  const _getweb3User = async (address) => {
    const resp = await getWeb3User(address);
    setIsWeb3User(resp?.data()?.isWeb3User)
  }

  useEffect(() => {
    address && _getweb3User(address)
  }, [address])

  if (!mounted) {
    return null;
  }



  const openURL = (URL) => () => {

    if (isWeb3User && (!NFTBalance || NFTBalance == 0)) {
      setClaimTokensModal(true)
      return;
    }
    window.open(URL, '_blank');
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
        className={`${styles['card-content']} ${resolvedTheme === 'dark' ? styles['card-content__dark'] : ''
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
        acceptLabel={PortfolioLabel.mintTokensBtn}
        acceptBtnAction={claimAcceptBtnAction}
      >
        {PortfolioLabel.modalClaimNFTDesc}
      </ModalComponent>
    </>
  );
};

export default PortfolioCard;
