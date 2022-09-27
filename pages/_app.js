import HeadComponent from '../components/Head.component';
import NavbarComponent from '../components/Navbar.component';
import ScriptComponent from '../components/Script.component';
import '../global.css';

export default function MyApp({ Component, pageProps }) {
  const navbarElements = { portfolio: '/', resume: '/resume' };

  return (
    <>
      <HeadComponent />
      <NavbarComponent navbarElements={navbarElements} />
      <Component {...pageProps} />
      <ScriptComponent />
    </>
  );
}
