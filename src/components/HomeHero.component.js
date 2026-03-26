import Link from 'next/link';
import { useSite } from '@context/SiteContext';
import styles from './HomeHero.module.scss';

export default function HomeHero({ resume }) {
  const site = useSite();
  const home = site.ui.home;

  if (!resume) return null;

  return (
    <header className={styles.hero}>
      <p className={styles.lead}>{resume.description}</p>
      <div className={styles.actions}>
        <a className={styles.linkPrimary} href={`mailto:${resume.email}`}>
          {home.contactCta}
        </a>
        <Link href="/resume">
          <a className={styles.linkSecondary}>{home.secondaryCta}</a>
        </Link>
      </div>
    </header>
  );
}
