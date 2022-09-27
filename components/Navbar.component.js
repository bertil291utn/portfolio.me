import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';
const NavbarComponent = ({ navbarElements }) => {
  const router = useRouter();
  return (
    <ul className={styles['navbar']}>
      {Object.entries(navbarElements)?.map(([navbarName, pathName], index) => (
        <li
          className={router.pathname == pathName ? `${styles['active']}` : ''}
          key={`navbar-${index}`}
        >
          <Link href={pathName}>{navbarName}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarComponent;
