import siteFallbackRaw from '../../data/site.json';
import personData from '../../data/person.json';
import { getSite } from '@utils/firebaseFunctions';

function mergePerson(site, person) {
  return {
    ...site,
    seo: {
      ...site.seo,
      authorName: person.name,
      siteName: person.name,
      defaultTitle: `${person.name} — ${person.title}`,
      twitterHandle: person.twitterHandle,
      pageTitles: {
        '/': `${person.name} — ${person.title}`,
        ...site.seo.pageTitles,
      },
    },
    pwa: { ...site.pwa, name: `${person.name} portfolio` },
  };
}

export const siteFallback = mergePerson(siteFallbackRaw, personData);

export async function loadSite() {
  let site = siteFallback;
  try {
    const snap = await getSite();
    const data = snap?.data();
    if (data) site = data;
  } catch {
    // Firestore offline — use static JSON
  }
  return site;
}
