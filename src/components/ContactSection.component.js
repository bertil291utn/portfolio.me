import { useSite } from '@context/SiteContext';
import styles from './ContactSection.module.scss';

export default function ContactSection({ email }) {
  const site = useSite();
  const home = site.ui.home;

  if (!email) return null;

  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.card}>
        <h2 id="contact-heading" className={styles.heading}>
          {home.contactTitle}
        </h2>
        <p className={styles.body}>{home.contactBody}</p>
        <a className={styles.cta} href={`mailto:${email}`}>
          {home.contactCta}
        </a>
      </div>
    </section>
  );
}
