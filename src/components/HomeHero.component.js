import Link from 'next/link';
import { useSite } from '@context/SiteContext';
import styles from './HomeHero.module.scss';

export default function HomeHero({ resume }) {
  const site = useSite();
  const home = site.ui.home;

  if (!resume) return null;

  const upwork = resume.socialNetwork?.upwork;

  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>{home.heroTitle}</h1>
      {home.heroSubtitle && (
        <h2 className={styles.subtitle}>{home.heroSubtitle}</h2>
      )}
      {resume.location && (
        <p className={styles.meta}>
          {home.heroMeta.replace('{location}', resume.location)}
        </p>
      )}
      <p className={styles.lead}>{resume.description}</p>
      <div className={styles.actions}>
        {upwork ? (
          <>
            <a
              className={styles.linkPrimary}
              href={upwork}
              target="_blank"
              rel="noopener noreferrer"
            >
              {home.upworkCta}
            </a>
            <a className={styles.linkOutline} href={`mailto:${resume.email}`}>
              {home.emailCta}
            </a>
          </>
        ) : (
          <a className={styles.linkPrimary} href={`mailto:${resume.email}`}>
            {home.emailCta}
          </a>
        )}
        <Link href="/resume">
          <a className={styles.linkSecondary}>{home.secondaryCta}</a>
        </Link>
      </div>
    </header>
  );
}
