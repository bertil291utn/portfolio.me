import { useEffect, useState } from 'react';
import NavbarComponent from '@components/Navbar.component';
import { useSite } from '@context/SiteContext';
import { useTheme } from 'next-themes';
import styles from './AppShell.module.scss';

const FONT_KEY = 'portfolio-font';

export default function AppShell({ resume, children }) {
  const site = useSite();
  const app = site.ui.appShell;
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

  const name = resume?.name ?? app.identityFallbackName;
  const title = resume?.title ?? '';

  return (
    <div className={styles.shell}>
      <div className={styles.leftColumn}>
        <aside className={styles.sidebar} aria-label={app.siteSidebarAria}>
          <div className={styles.identity}>
            <h1 className={styles.siteTitle}>{name}</h1>
            {title ? <p className={styles.siteTagline}>{title}</p> : null}
          </div>
          <NavbarComponent navbarElements={site.ui.navbar} />
        </aside>
        <footer className={styles.sidebarFooter}>
          <div className={styles.toggles} role="group" aria-label={app.displayTogglesAria}>
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={toggleTheme}
              title={resolvedTheme === 'dark' ? app.themeLightTitle : app.themeDarkTitle}
              disabled={!mounted}
            >
              {mounted && resolvedTheme === 'dark' ? app.themeLightLabel : app.themeDarkLabel}
            </button>
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={toggleFont}
              title={app.fontToggleTitle}
            >
              {fontMode === 'mono' ? app.fontSansLabel : app.fontMonoLabel}
            </button>
          </div>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {resume.shortInitials}
          </p>
        </footer>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
