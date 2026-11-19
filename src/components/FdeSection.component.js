import { useSite } from '@context/SiteContext';
import styles from './FdeSection.module.scss';

export default function FdeSection() {
  const site = useSite();
  const home = site.ui.home;

  return (
    <>
      <section className={styles.section} aria-labelledby="fde-heading">
        <h2 id="fde-heading" className={styles.heading}>
          {home.fdeTitle}
        </h2>
        <p className={styles.definition}>{home.fdeDefinition}</p>
        <ol className={styles.steps}>
          {home.fdeSteps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="faq-heading">
        <h2 id="faq-heading" className={styles.heading}>
          {home.faqTitle}
        </h2>
        <dl className={styles.faq}>
          {home.faqItems.map((item) => (
            <div key={item.question} className={styles.faqItem}>
              <dt className={styles.question}>{item.question}</dt>
              <dd className={styles.answer}>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
