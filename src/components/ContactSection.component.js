import styles from './ContactSection.module.scss';
import { HomeLabel } from '@placeholders/home.placeholder';

export default function ContactSection({ email }) {
  if (!email) return null;

  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.card}>
        <h2 id="contact-heading" className={styles.heading}>
          {HomeLabel.contactTitle}
        </h2>
        <p className={styles.body}>{HomeLabel.contactBody}</p>
        <a className={styles.cta} href={`mailto:${email}`}>
          {HomeLabel.contactCta}
        </a>
      </div>
    </section>
  );
}
