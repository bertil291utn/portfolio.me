import ResumeComponent from '@layouts/Resume.component';
import { getResume } from '@utils/firebaseFunctions';

const ResumePage = ({ resume }) => {
  return <ResumeComponent resumeData={resume} />;
};

export async function getStaticProps() {
  const resp = await getResume();

  return {
    props: {
      resume: resp?.data(),
    },
  };
}

export default ResumePage;
