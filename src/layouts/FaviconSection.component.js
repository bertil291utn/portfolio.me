import ButtonComponent from '@components/common/Button.component';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { web3Website } from 'src/config/URLs';
import { BsPerson } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useAccount, useProvider } from 'wagmi';
import { getUserCustomTokenBalance } from '@utils/web3';

export function FavIconSection() {
  const [tokenBalance, setTokenBalance] = useState()
  const { address } = useAccount();
  const provider = useProvider();

  const getTokensAction = () => {
    window.open(web3Website, '_tab');
  };

  const getProfileAction = () => {
    window.open(`${web3Website}/profile`, '_tab');
  };

  const _getUserCustomTokenBalance = async ({ provider, address }) => {
    const userTokenAmount = await getUserCustomTokenBalance({ provider, address })
    setTokenBalance(userTokenAmount)
  }
  useEffect(() => {
    _getUserCustomTokenBalance({ provider, address })
  }, [])

  return (
    <>
      {(!tokenBalance || tokenBalance?.toString() <= 0) ? (
        <ButtonComponent
          buttonType='fab-button'
          onClick={getTokensAction}
          leftIcon={BsCoin}
          title={PortfolioLabel.freeTokensBtn}
        />
      ) : <ButtonComponent
        buttonType='fab-button'
        onClick={getProfileAction}
        leftIcon={BsPerson}
      />}
    </>
  );
}