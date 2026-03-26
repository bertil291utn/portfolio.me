import styles from './ServicesSection.module.scss';
import { HomeLabel } from '@placeholders/home.placeholder';

export default function ServicesSection() {
  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <h2 id="services-heading" className={styles.heading}>
        {HomeLabel.servicesTitle}
      </h2>
      <p className={styles.lead}>{HomeLabel.servicesLead}</p>
      <ul className={styles.grid}>
        {HomeLabel.serviceItems.map((item) => (
          <li key={item.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardBody}>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
