import Link from 'next/link';
import { useSite } from '@context/SiteContext';
import styles from './CaseStudiesSection.module.scss';

export default function CaseStudiesSection({ caseStudies = [] }) {
  const site = useSite();
  const home = site.ui.home;

  if (!caseStudies.length) return null;

  return (
    <section className={styles.section} aria-labelledby="case-studies-heading">
      <h2 id="case-studies-heading" className={styles.heading}>
        {home.caseStudiesTitle}
      </h2>
      <p className={styles.lead}>{home.caseStudiesSubtitle}</p>
      <ul className={styles.grid}>
        {caseStudies.map((cs) => (
          <li key={cs.slug} className={styles.card}>
            <span className={styles.industry}>{cs.industry}</span>
            <h3 className={styles.title}>
              <Link href={`/case-studies/${cs.slug}`}>
                <a className={styles.titleLink}>{cs.shortTitle}</a>
              </Link>
            </h3>
            <p className={styles.summary}>{cs.summary}</p>
            {cs.results?.[0] && (
              <p className={styles.metric}>
                <strong>{cs.results[0].value}</strong> {cs.results[0].label}
              </p>
            )}
            <span className={styles.more} aria-hidden>
              {home.caseStudyLinkLabel} →
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
