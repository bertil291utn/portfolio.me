import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { useEffect } from 'react';
import HeadComponent from '@components/Head.component';
import NavbarComponent from '@components/Navbar.component';
import ScriptComponent from '@components/Script.component';
import FooterComponent from '@components/Footer.component';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { ThemeProvider } from 'next-themes';
import { chainProv, client } from '@utils/web3';
import WalletProvider from 'src/context/WalletProvider';
import '../css/global.scss';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.localStorage.removeItem('theme');
  }, []);

  return (
    <WalletProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chainProv}>
          <ThemeProvider>
            <HeadComponent />
            <NavbarComponent navbarElements={navbarElements} />
            <div className='content'>
              <Component {...pageProps} />
            </div>
            <FooterComponent />
            <ScriptComponent />
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </WalletProvider>
  );
}
