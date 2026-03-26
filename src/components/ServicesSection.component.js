import { useSite } from '@context/SiteContext';
import styles from './ServicesSection.module.scss';

export default function ServicesSection() {
  const site = useSite();
  const home = site.ui.home;

  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <h2 id="services-heading" className={styles.heading}>
        {home.servicesTitle}
      </h2>
      <p className={styles.lead}>{home.servicesLead}</p>
      <ul className={styles.grid}>
        {home.serviceItems.map((item) => (
          <li key={item.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardBody}>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
