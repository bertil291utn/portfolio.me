import PortfolioComponent from '@layouts/Portfolio.component';
import { getPortfolio, getResume } from '@utils/firebaseFunctions';
import resumeFallback from '../../data/resume.json';
import portfolioFallback from '../../data/portfolio.json';

function HomeContent({ projects, resume }) {
  return <PortfolioComponent projectsData={projects} resume={resume} />;
}

export async function getStaticProps() {
  let projects = portfolioFallback;
  try {
    const resp = await getPortfolio();
    const fromDb = resp.docs.map((doc) => doc.data());
    if (fromDb.length) {
      projects = fromDb;
      projects.sort((a, b) => a.id - b.id);
    }
  } catch {
    // Firestore offline — use static JSON
  }

  let resume = resumeFallback;
  try {
    const resumeResp = await getResume();
    const data = resumeResp?.data();
    if (data) resume = data;
  } catch {
    // Firebase unavailable — use local JSON
  }

  return {
    props: {
      projects,
      resume,
    },
    revalidate: 3600,
  };
}

export default HomeContent;
