import { useTheme } from 'next-themes';
import styles from './BlogCards.module.scss';

export function BlogCards({ URL, title, brief }) {

  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`${styles['card-content']} ${resolvedTheme === 'dark' ? styles['card-content__dark'] : ''
        }`}
    >
      <div
        onClick={() => window.open(URL, '_new')}
      >
        <span className={styles['title']}>{title}</span>
        <span className={styles['content']}>{brief}</span>
      </div>
    </div>
  )
}