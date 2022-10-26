import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect } from 'react';
import HeadComponent from '@components/Head.component';
import NavbarComponent from '@components/Navbar.component';
import ScriptComponent from '@components/Script.component';
import FooterComponent from '@components/Footer.component';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { ThemeProvider } from 'next-themes';
import '../css/global.scss';

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.localStorage.removeItem('theme');
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
  );
}
