import HeadComponent from '@components/Head.component';
import AppShell from '@components/AppShell.component';
import ScriptComponent from '@components/Script.component';
import { ThemeProvider } from 'next-themes';
import resumeFallback from '../../data/resume.json';
import '../css/global.scss';

export default function MyApp({ Component, pageProps }) {
  const resume = pageProps.resume ?? resumeFallback;

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <HeadComponent />
      <AppShell resume={resume}>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </AppShell>
      <ScriptComponent />
    </ThemeProvider>
  );
}
