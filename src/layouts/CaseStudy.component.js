import Link from 'next/link';
import { useSite } from '@context/SiteContext';
import styles from './CaseStudy.module.scss';

const techList = (str = '') =>
  str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export default function CaseStudyComponent({ caseStudy, resume }) {
  const site = useSite();
  const labels = site.ui.caseStudy;
  const home = site.ui.home;

  if (!caseStudy) return null;

  const upwork = resume?.socialNetwork?.upwork;

  return (
    <article className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/#case-studies-heading">
          <a>← {labels.backLabel}</a>
        </Link>
      </nav>

      <header className={styles.header}>
        <p className={styles.eyebrow}>
          {caseStudy.industry} · {caseStudy.period}
        </p>
        <h1 className={styles.title}>{caseStudy.title}</h1>
        <p className={styles.summary}>{caseStudy.summary}</p>
        <dl className={styles.facts}>
          <div>
            <dt>Client</dt>
            <dd>{caseStudy.client}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{caseStudy.role}</dd>
          </div>
        </dl>
      </header>

      {caseStudy.results?.length > 0 && (
        <section className={styles.section} aria-labelledby="results-heading">
          <h2 id="results-heading" className={styles.sectionLabel}>
            {labels.resultsHeading}
          </h2>
          <ul className={styles.results}>
            {caseStudy.results.map((r) => (
              <li key={r.label} className={styles.result}>
                <span className={styles.resultValue}>{r.value}</span>
                <span className={styles.resultLabel}>{r.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.section} aria-labelledby="problem-heading">
        <h2 id="problem-heading" className={styles.sectionLabel}>
          {labels.problemHeading}
        </h2>
        {caseStudy.problem.map((p) => (
          <p key={p} className={styles.paragraph}>
            {p}
          </p>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="solution-heading">
        <h2 id="solution-heading" className={styles.sectionLabel}>
          {labels.solutionHeading}
        </h2>
        {caseStudy.solution.map((p) => (
          <p key={p} className={styles.paragraph}>
            {p}
          </p>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="stack-heading">
        <h2 id="stack-heading" className={styles.sectionLabel}>
          {labels.stackHeading}
        </h2>
        <ul className={styles.stack}>
          {techList(caseStudy.stack).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {caseStudy.liveUrl && (
          <a
            className={styles.liveLink}
            href={caseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.liveLabel} ↗
          </a>
        )}
      </section>

      <section className={styles.cta} aria-labelledby="cta-heading">
        <h2 id="cta-heading" className={styles.ctaTitle}>
          {labels.ctaTitle}
        </h2>
        <p className={styles.ctaBody}>{labels.ctaBody}</p>
        <div className={styles.ctaActions}>
          {upwork && (
            <a
              className={styles.btnPrimary}
              href={upwork}
              target="_blank"
              rel="noopener noreferrer"
            >
              {home.upworkCta}
            </a>
          )}
          {resume?.email && (
            <a
              className={upwork ? styles.btnOutline : styles.btnPrimary}
              href={`mailto:${resume.email}`}
            >
              {home.emailCta}
            </a>
          )}
        </div>
      </section>
    </article>
  );
}
