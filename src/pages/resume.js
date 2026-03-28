import ResumeComponent from '@layouts/Resume.component';
import { siteFallback } from '@utils/siteData';
import { resumeFallback } from '@utils/resumeData';

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
  return {
    props: {
      resume: resumeFallback,
      site: siteFallback,
    },
    revalidate: 60,
  };
}

export default ResumePage;
