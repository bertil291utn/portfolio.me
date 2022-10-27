import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWalletContext } from '@context/WalletProvider';
import styles from './Navbar.module.scss';

const NavbarComponent = ({ navbarElements }) => {
  const router = useRouter();
  const { userCustomTokenBalance } = useWalletContext();
  return (
    <ul className={styles['navbar']}>
      {Object.entries(navbarElements)?.map(([navbarName, pathName], index) => {
        if (navbarName === 'tokens' && userCustomTokenBalance) {
          return null;
        }
        return (
          <li
            className={router.pathname == pathName ? `${styles['active']}` : ''}
            key={`navbar-${index}`}
          >
            {new RegExp(['https', 'http'].join('|')).test(pathName) ? (
              <Link href={pathName}>
                <a target='_blank' rel='noopener noreferrer'>
                  {navbarName}
                </a>
              </Link>
            ) : (
              <Link href={pathName}>{navbarName}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarComponent;
