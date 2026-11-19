import { useSite } from '@context/SiteContext';
import styles from './ContactSection.module.scss';

export default function ContactSection({ email, upwork }) {
  const site = useSite();
  const home = site.ui.home;

  if (!email && !upwork) return null;

  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.card}>
        <h2 id="contact-heading" className={styles.heading}>
          {home.contactTitle}
        </h2>
        <p className={styles.body}>{home.contactBody}</p>
        <div className={styles.actions}>
          {upwork && (
            <a
              className={styles.cta}
              href={upwork}
              target="_blank"
              rel="noopener noreferrer"
            >
              {home.upworkCta}
            </a>
          )}
          {email && (
            <a
              className={upwork ? styles.ctaOutline : styles.cta}
              href={`mailto:${email}`}
            >
              {home.contactCta}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
