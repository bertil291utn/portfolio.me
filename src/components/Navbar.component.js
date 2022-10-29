import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWalletContext } from '@context/WalletProvider';
import { ethers } from 'ethers';
import styles from './Navbar.module.scss';

const NavbarComponent = ({ navbarElements }) => {
  const router = useRouter();
  const { userCustomTokenBalance } = useWalletContext();
  //TODO: return to home if user want to redirect to /token path when user has already tokens
  return (
    <ul className={styles['navbar']}>
      {/* temporal maybe */}
      {userCustomTokenBalance?.toString() > 0 && (
        <li>{`${ethers.utils.formatEther(userCustomTokenBalance)} $BATL`}</li>
      )}
      {Object.entries(navbarElements)?.map(([navbarName, pathName], index) => {
        if (
          userCustomTokenBalance &&
          navbarName === 'tokens' &&
          ethers.utils.formatEther(userCustomTokenBalance.toString()) > 0
        ) {
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
