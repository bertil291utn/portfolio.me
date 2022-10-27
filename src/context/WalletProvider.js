import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { useProvider, useAccount } from 'wagmi';
import { getTokenFactory } from '@utils/web3';

const WalletContext = createContext();

export default function WalletProvider({ children }) {
  const [userCustomTokenBalance, setUserCustomTokenBalance] = useState();
  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const getUserCustomTokenBalance = async ({ provider, address }) => {
    const tokenContract = getTokenFactory({ provider });
    const userTokenAmount = await tokenContract.balanceOf(address);
    setUserCustomTokenBalance(userTokenAmount);
  };

  useEffect(() => {
    isConnected && getUserCustomTokenBalance({ provider, address });
  }, [address]);

  return (
    <WalletContext.Provider
      value={{
        userCustomTokenBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWalletContext = () => {
  return useContext(WalletContext);
};
