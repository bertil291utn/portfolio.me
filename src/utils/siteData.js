import siteFallbackRaw from '@data/site.json';
import personData from '@data/person.json';
import caseStudies from '@data/caseStudies.json';

const caseStudyMeta = (field) =>
  Object.fromEntries(
    caseStudies.map((cs) => [`/case-studies/${cs.slug}`, cs[field]])
  );

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
        ...caseStudyMeta('metaTitle'),
      },
      pageDescriptions: {
        ...site.seo.pageDescriptions,
        ...caseStudyMeta('metaDescription'),
      },
    },
    pwa: { ...site.pwa, name: `${person.name} portfolio` },
  };
}

export const siteFallback = mergePerson(siteFallbackRaw, personData);
