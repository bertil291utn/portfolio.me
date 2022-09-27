import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';
const NavbarComponent = ({ navbarElements }) => {
  return (
    <ul className={styles['navbar']}>
      {Object.entries(navbarElements)?.map(([navbarName, pathName]) => (
        <li
          className={
            router.pathname == pathName
              ? // || router.pathname == '/'
                `${styles['active']}`
              : ''
          }
        >
          <Link href={pathName}>{navbarName}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarComponent;
