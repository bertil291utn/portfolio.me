import { useEffect } from 'react';
import HeadComponent from '@components/Head.component';
import NavbarComponent from '@components/Navbar.component';
import ScriptComponent from '@components/Script.component';
import FooterComponent from '@components/Footer.component';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { ThemeProvider } from 'next-themes';
import '../css/global.scss';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.localStorage.removeItem('theme');
  }, []);

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <HeadComponent />
      <NavbarComponent navbarElements={navbarElements} />
      <div className="content">
        <Component {...pageProps} />
      </div>
      <FooterComponent />
      <ScriptComponent />
    </ThemeProvider>
  );
}
