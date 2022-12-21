import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useAccount, useProvider, WagmiConfig } from 'wagmi';
import { useEffect, useState } from 'react';
import HeadComponent from '@components/Head.component';
import NavbarComponent from '@components/Navbar.component';
import ScriptComponent from '@components/Script.component';
import FooterComponent from '@components/Footer.component';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { ThemeProvider } from 'next-themes';
import { chainProv, client, getUserCustomTokenBalance } from '@utils/web3';
import WalletProvider, { useWalletContext } from 'src/context/WalletProvider';
import ButtonComponent from '@components/common/Button.component';
import { BsCoin } from 'react-icons/bs';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { web3Website } from 'src/config/URLs';
import { BsPerson } from 'react-icons/bs';
import '../css/global.scss';

export default function MyApp({ Component, pageProps }) {
  const [tokenBalance, setTokenBalance] = useState()
  const { address } = useAccount();
  const provider = useProvider();
  useEffect(() => {
    window.localStorage.removeItem('theme');
  }, []);

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
    <WalletProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chainProv}>
          <ThemeProvider>
            <HeadComponent />
            <NavbarComponent navbarElements={navbarElements} />
            <div className='content'>
              <Component {...pageProps} />
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
            </div>
            <FooterComponent />
            <ScriptComponent />
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </WalletProvider>
  );
}
