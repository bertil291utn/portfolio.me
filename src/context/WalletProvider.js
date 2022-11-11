import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { useProvider, useAccount } from 'wagmi';
import { getStakingFactory, getTokenFactory } from '@utils/web3';

const WalletContext = createContext();

export default function WalletProvider({ children }) {
  const [userCustomTokenBalance, setUserCustomTokenBalance] = useState();
  const [userStakedAmount, setUserStakedAmount] = useState();
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  //TODO-WIP:throw with catch error
  const getUserCustomTokenBalance = async ({ provider, address }) => {
    const tokenContract = getTokenFactory({ provider });
    const userTokenAmount = await tokenContract.balanceOf(address);
    setUserCustomTokenBalance(userTokenAmount);
  };

  const getUserStakedAmount = async ({ provider, address }) => {
    const stakingContract = getStakingFactory({ provider });
    const userStakedAmount = await stakingContract.balanceOf(address);
    setUserStakedAmount(userStakedAmount);
  };

  useEffect(() => {
    isConnected && getUserCustomTokenBalance({ provider, address });
    isConnected && getUserStakedAmount({ provider, address });
  }, [address]);

  return (
    <WalletContext.Provider
      value={{
        userCustomTokenBalance,
        userStakedAmount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWalletContext = () => {
  return useContext(WalletContext);
};
