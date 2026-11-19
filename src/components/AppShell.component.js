import { useEffect, useState } from 'react';
import NavbarComponent from '@components/Navbar.component';
import { useSite } from '@context/SiteContext';
import { useTheme } from 'next-themes';
import { BsLinkedin, BsGithub, BsTelegram, BsTwitter } from 'react-icons/bs';
import styles from './AppShell.module.scss';

const PROFILE_ICONS = {
  linkedin: { Icon: BsLinkedin, label: 'LinkedIn' },
  github: { Icon: BsGithub, label: 'GitHub' },
  telegram: { Icon: BsTelegram, label: 'Telegram' },
  twitter: { Icon: BsTwitter, label: 'X (Twitter)' },
};

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
  const profiles = [
    ...Object.entries(resume?.socialNetwork || {}),
    ...(site.seo.twitterUrl ? [['twitter', site.seo.twitterUrl]] : []),
  ].filter(([key]) => PROFILE_ICONS[key]);

  return (
    <div className={styles.shell}>
      <div className={styles.leftColumn}>
        <aside className={styles.sidebar} aria-label={app.siteSidebarAria}>
          <div className={styles.identity}>
            <p className={styles.siteTitle}>{name}</p>
            {title ? <p className={styles.siteTagline}>{title}</p> : null}
          </div>
          <NavbarComponent navbarElements={site.ui.navbar} />
          {profiles.length > 0 && (
            <ul className={styles.profiles} aria-label={app.profilesAria}>
              {profiles.map(([key, url]) => {
                const { Icon, label } = PROFILE_ICONS[key];
                return (
                  <li key={key}>
                    <a
                      className={styles.profileLink}
                      href={url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      aria-label={label}
                      title={label}
                    >
                      <Icon aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
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
