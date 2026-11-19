// Builds schema.org JSON-LD from data/person.json + data/resume.json so the
// markup never drifts from what the page shows.

const parseLocation = (location = '') => {
  const [locality, country] = location.split(',').map((s) => s.trim());
  return {
    '@type': 'PostalAddress',
    ...(locality && { addressLocality: locality }),
    ...(country && { addressCountry: country }),
  };
};

const splitList = (str = '') =>
  str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export function buildPersonNode(resume, seo) {
  const base = seo.canonicalBaseUrl;
  const current = resume.workExperience?.find(
    (job) => job.date?.[1]?.toLowerCase() === 'present'
  );
  const degrees = (resume.education || []).filter((e) =>
    /bachelor|master/i.test(e.degree || '')
  );
  const knowsAbout = (resume.skills || [])
    .filter((s) => !/language/i.test(s.name))
    .flatMap((s) => splitList(s.items));

  return {
    '@type': 'Person',
    '@id': `${base}/#person`,
    name: resume.name,
    ...(resume.nickname && { alternateName: resume.nickname }),
    url: `${base}/`,
    jobTitle: resume.title,
    ...(resume.email && { email: `mailto:${resume.email}` }),
    ...(resume.location && { address: parseLocation(resume.location) }),
    ...(current && {
      worksFor: { '@type': 'Organization', name: current.company },
    }),
    ...(degrees.length && {
      alumniOf: degrees.map((e) => ({
        '@type': 'EducationalOrganization',
        name: e.institution,
      })),
    }),
    knowsAbout,
    sameAs: [
      ...Object.values(resume.socialNetwork || {}),
      ...(seo.twitterUrl ? [seo.twitterUrl] : []),
    ],
  };
}

export function buildStructuredData(pathname, resume, seo, pageTitle) {
  const base = seo.canonicalBaseUrl;
  const person = buildPersonNode(resume, seo);
  const website = {
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: `${base}/`,
    name: seo.siteName,
    inLanguage: seo.htmlLang,
    publisher: { '@id': person['@id'] },
  };

  if (pathname === '/') {
    return { '@context': 'https://schema.org', '@graph': [website, person] };
  }

  if (pathname === '/resume') {
    const url = `${base}/resume`;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          '@id': `${url}#webpage`,
          url,
          name: pageTitle,
          isPartOf: { '@id': website['@id'] },
          mainEntity: { '@id': person['@id'] },
          breadcrumb: { '@id': `${url}#breadcrumb` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
            { '@type': 'ListItem', position: 2, name: 'Resume', item: url },
          ],
        },
        website,
        person,
      ],
    };
  }

  return null;
}
