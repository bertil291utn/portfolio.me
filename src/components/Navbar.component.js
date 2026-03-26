import Link from 'next/link';
import { useSite } from '@context/SiteContext';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';

const NavbarComponent = ({ navbarElements }) => {
  const site = useSite();
  const router = useRouter();
  const entries = Object.values(navbarElements) ?? [];

  return (
    <nav className={styles.navWrap} aria-label={site.ui.appShell.primaryNavAria}>
      <ol className={styles.navbar}>
        {entries.map(({ label, path }, index) => {
          const active = router.pathname === path;
          return (
            <li
              className={`${styles.list} ${active ? styles.active : ''}`}
              key={path}
            >
              <Link href={path}>
                <a>
                  <span className={styles.index} aria-hidden="true">
                    {index + 1}.
                  </span>
                  <span className={styles.label}>{label}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavbarComponent;
