import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';


const NavbarComponent = ({ navbarElements }) => {
  const router = useRouter();

  return (
    <div className={styles['content']}>
      <ul className={styles['navbar']}>
        {Object.values(navbarElements)?.map(
          ({ label, path, icon: Icon }, index) => {
            return (
              <li
                className={`${styles['list']} ${router.pathname == path ? `${styles['active']}` : ''
                  }`}
                key={`navbar-${index}`}
              >
                <Link href={path}>
                  <a
                  >
                    <span className={`${styles['navbar__content']}`}>
                      {label}
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
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default NavbarComponent;
