import HeadComponent from '../components/Head.component';
import NavbarComponent from '../components/Navbar.component';
import ScriptComponent from '../components/Script.component';
import { ThemeProvider } from 'next-themes';
import FooterComponent from '../components/Footer.component';
import '../global.css';

export default function MyApp({ Component, pageProps }) {
  const navbarElements = {
    portfolio: '/',
    resume: '/resume',
    blog: 'https://blog.bertiltandayamo.me/',
  };

  return (
    <ThemeProvider>
      <HeadComponent />
      <NavbarComponent navbarElements={navbarElements} />
      <Component {...pageProps} />
      <FooterComponent />
      <ScriptComponent />
    </ThemeProvider>
  );
}
