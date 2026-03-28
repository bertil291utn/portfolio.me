import PortfolioComponent from '@layouts/Portfolio.component';
import { siteFallback } from '@utils/siteData';
import { resumeFallback } from '@utils/resumeData';
import portfolioFallback from '@data/portfolio.json';

function HomeContent({ projects, resume }) {
  return <PortfolioComponent projectsData={projects} resume={resume} />;
}

export async function getStaticProps() {
  const projects = [...portfolioFallback].sort((a, b) => a.id - b.id);

  return {
    props: {
      projects,
      resume: resumeFallback,
      site: siteFallback,
    },
    revalidate: 3600,
  };
}

export default HomeContent;
