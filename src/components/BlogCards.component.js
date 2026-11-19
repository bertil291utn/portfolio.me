import styles from './BlogCards.module.scss';

export function BlogCards({ URL, title, brief }) {
  return (
    <article className={styles.card}>
      <a
        className={styles.inner}
        href={URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.cardTitle}>{title}</span>
        <span className={styles.cardBrief}>{brief}</span>
      </a>
    </article>
  );
}
