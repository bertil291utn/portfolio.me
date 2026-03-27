import { createContext, useContext } from 'react';
import { siteFallback } from '@utils/siteData';

const SiteContext = createContext(siteFallback);

export function SiteProvider({ site, children }) {
  return (
    <SiteContext.Provider value={site ?? siteFallback}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
