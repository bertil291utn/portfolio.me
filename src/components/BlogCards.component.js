import styles from './BlogCards.module.scss';

export function BlogCards({ URL, title, brief }) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.inner}
        onClick={() => window.open(URL, '_blank', 'noopener,noreferrer')}
      >
        <span className={styles.cardTitle}>{title}</span>
        <span className={styles.cardBrief}>{brief}</span>
      </button>
    </article>
  );
}
