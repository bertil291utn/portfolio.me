import { useEffect, useState } from 'react';
import NavbarComponent from '@components/Navbar.component';
import { navbarElements } from '@placeholders/navbar.placeholders';
import { useTheme } from 'next-themes';
import styles from './AppShell.module.scss';

const FONT_KEY = 'portfolio-font';

export default function AppShell({ resume, children }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [fontMode, setFontMode] = useState('sans');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(FONT_KEY);
      if (stored === 'mono' || stored === 'sans') {
        setFontMode(stored);
        document.documentElement.setAttribute('data-font', stored);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-font', fontMode);
    try {
      window.localStorage.setItem(FONT_KEY, fontMode);
    } catch {
      // ignore
    }
  }, [fontMode, mounted]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleFont = () => {
    setFontMode((f) => (f === 'sans' ? 'mono' : 'sans'));
  };

  const name = resume?.name ?? 'Portfolio';
  const title = resume?.title ?? '';

  return (
    <div className={styles.shell}>
      <div className={styles.leftColumn}>
        <aside className={styles.sidebar} aria-label="Site">
          <div className={styles.identity}>
            <h1 className={styles.siteTitle}>{name}</h1>
            {title ? <p className={styles.siteTagline}>{title}</p> : null}
          </div>
          <NavbarComponent navbarElements={navbarElements} />
        </aside>
        <footer className={styles.sidebarFooter}>
          <div className={styles.toggles} role="group" aria-label="Display">
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={toggleTheme}
              title={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
              disabled={!mounted}
            >
              {mounted && resolvedTheme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={toggleFont}
              title="Toggle monospaced font"
            >
              {fontMode === 'mono' ? 'Sans' : 'Mono'}
            </button>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {name.split(' ')[0]}
          </p>
        </footer>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
