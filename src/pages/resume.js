import ResumeComponent from '@layouts/Resume.component';
import { resumeDataURL } from 'src/config/URLs';

const ResumePage = ({ resume }) => {
  return <ResumeComponent resumeData={resume} />;
};

export async function getStaticProps() {
  const res = await fetch(resumeDataURL);
  const resume = await res.json();

  return {
    props: {
      resume,
    },
  };
}

export default ResumePage;
