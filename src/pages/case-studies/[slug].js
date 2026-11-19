import CaseStudyComponent from '@layouts/CaseStudy.component';
import { siteFallback } from '@utils/siteData';
import { resumeFallback } from '@utils/resumeData';
import caseStudies from '@data/caseStudies.json';

const CaseStudyPage = ({ caseStudy, resume }) => (
  <CaseStudyComponent caseStudy={caseStudy} resume={resume} />
);

export async function getStaticPaths() {
  return {
    paths: caseStudies.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);
  if (!caseStudy) return { notFound: true };

  return {
    props: {
      caseStudy,
      resume: resumeFallback,
      site: siteFallback,
    },
  };
}

export default CaseStudyPage;
