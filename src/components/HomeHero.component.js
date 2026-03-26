import Link from 'next/link';
import styles from './HomeHero.module.scss';
import { HomeLabel } from '@placeholders/home.placeholder';

export default function HomeHero({ resume }) {
  if (!resume) return null;

  return (
    <header className={styles.hero}>
      <h1 className={styles.name}>{resume.name}</h1>
      <p className={styles.lead}>{resume.description}</p>
      <div className={styles.actions}>
        <a className={styles.btnPrimary} href={`mailto:${resume.email}`}>
          {HomeLabel.contactCta}
        </a>
        <Link href="/resume">
          <a className={styles.btnSecondary}>{HomeLabel.secondaryCta}</a>
        </Link>
      </div>
    </header>
  );
}
