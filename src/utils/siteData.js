import siteFallbackRaw from '@data/site.json';
import personData from '@data/person.json';

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
