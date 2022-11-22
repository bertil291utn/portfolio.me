import ButtonComponent from '@components/common/Button.component';
import PortfolioCard from '@components/PortfolioCard.component';
import styles from './Portfolio.module.scss';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { useRouter } from 'next/router';
import { useWalletContext } from '@context/WalletProvider';
import { useEffect, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { getRatingFactory } from '@utils/web3';

function PortfolioComponent({ projectsData }) {
  const router = useRouter();
  const [portfolioDataSet, setPortfolioDataSet] = useState(projectsData);
  const { userCustomTokenBalance } = useWalletContext();
  const { data: signer } = useSigner();

  const getPortfolioJSON = async (projects) => {
    const rateContract = getRatingFactory({ signer });
    const newObject = await Promise.all(
      projects?.map(async (elem) => {
        return {
          ...elem,
          isRated: await rateContract.isRatedProject(elem.id),
        };
      })
    );
    setPortfolioDataSet(newObject);
  };

  useEffect(() => {
    signer && getPortfolioJSON(projectsData);
  }, [signer]);

  const getTokensAction = () => {
    router.push('/tokens');
  };

  return (
    <div className={styles['portfolio']}>
      {portfolioDataSet?.map((data) => (
        <PortfolioCard
          key={`portfolio-card-${data.id}`}
          projectId={data.id}
          type={data.type}
          description={data.description}
          projectName={data.projectName}
          overview={data.overview}
          github={data.github}
          isRated={data.isRated}
        />
      ))}
      {(!userCustomTokenBalance || userCustomTokenBalance.toString() <= 0) && (
        <ButtonComponent
          buttonType='fab-button'
          onClick={getTokensAction}
          leftIcon={BsCoin}
          title={PortfolioLabel.freeTokensBtn}
        />
      )}
    </div>
  );
}

export default PortfolioComponent;
