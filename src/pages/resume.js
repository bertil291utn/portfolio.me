import ResumeComponent from '@layouts/Resume.component';
import { getResume } from '@utils/firebaseFunctions';
import { loadSite } from '@utils/siteData';
import resumeFallback from '../../data/resume.json';

const extractYear = (dateString) => {
  const [, year] = dateString.split(' ');
  return year;
};

const sortWorkExperienceDate = (resumeData) => {
  resumeData.workExperience.sort((a, b) => {
    const yearA = parseInt(extractYear(a.date[0]), 10);
    const yearB = parseInt(extractYear(b.date[0]), 10);

    return yearB - yearA;
  });
};

const ResumePage = ({ resume }) => {
  sortWorkExperienceDate(resume);
  return <ResumeComponent resumeData={resume} />;
};

export async function getStaticProps() {
  let resume = resumeFallback;
  try {
    const resp = await getResume();
    const data = resp?.data();
    if (data) resume = data;
  } catch {
    // Offline build or Firebase misconfiguration — use local JSON
  }

  const site = await loadSite();

  return {
    props: {
      resume,
      site,
    },
    revalidate: 60,
  };
}

export default ResumePage;
