import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWalletContext } from '@context/WalletProvider';
import { ethers } from 'ethers';
import styles from './Navbar.module.scss';

const NavbarComponent = ({ navbarElements }) => {
  const router = useRouter();
  const { userCustomTokenBalance } = useWalletContext();

  return (
    <ul className={styles['navbar']}>
      {/* TODO-WIP: display on dashboard after is connected. if it is metamask use its documentation */}

      {Object.entries(navbarElements)?.map(
        ([navbarName, { path, icon: Icon }], index) => {
          if (
            navbarName === 'tokens' &&
            ethers.utils.formatEther(userCustomTokenBalance?.toString() || 0) >
              0
          ) {
            return null;
          }
          return (
            <li
              className={`${styles['list']} ${
                router.pathname == path ? `${styles['active']}` : ''
              }`}
              key={`navbar-${index}`}
            >
              <Link href={path}>
                <a target={navbarName == 'blog' ? '_blank' : undefined}>
                  <span className={`${styles['navbar__content']}`}>
                    {navbarName}
                  </span>
                  <span className={`${styles['navbar__icon']}`}>
                    <Icon />
                  </span>
                </a>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default NavbarComponent;
