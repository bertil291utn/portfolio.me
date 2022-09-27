import NavbarComponent from '../components/Navbar.component';
import '../global.css';

export default function MyApp({ Component, pageProps }) {
  const navbarElements = { portfolio: '/', resume: '/resume', about: '/about' };

  return (
    <>
      <NavbarComponent navbarElements={navbarElements} />
      <Component {...pageProps} />
    </>
  );
}
