import ResumeComponent from '@layouts/Resume.component';
import { getResume } from '@utils/firebaseFunctions';

const extractYear = (dateString) => {
  const [_, year] = dateString.split(' ');
  return year;
};


const sortWorkExperienceDate = (resumeData) => {
  resumeData.workExperience.sort((a, b) => {
    const yearA = parseInt(extractYear(a.date[0]), 10);
    const yearB = parseInt(extractYear(b.date[0]), 10);

    return yearB - yearA;
  });
}


const ResumePage = ({ resume }) => {
  sortWorkExperienceDate(resume);
  return <ResumeComponent resumeData={resume} />;
};

export async function getStaticProps() {
  const resp = await getResume();

  return {
    props: {
      resume: resp?.data(),
    },
    revalidate: 60
  };
}

export default ResumePage;
