import Link from 'next/link';
import styles from './Resume.module.scss';
import ToggleComponent from '@components/common/Toggle.component';
import { BsLinkedin, BsGithub, BsTelegram, BsTwitter } from 'react-icons/bs';
import { PageLabel } from '@placeholders/resume.placeholder';

const ResumeComponent = ({ resumeData: resumeDataSet }) => {
  const ICON = {
    linkedin: <BsLinkedin />,
    github: <BsGithub />,
    telegram: <BsTelegram />,
    twitter: <BsTwitter />,
  };

  const openURL = (URL) => () => {
    window.open(URL, '_blank', 'noopener,noreferrer');
  };

  return resumeDataSet ? (
    <div className={`${styles['container']}`}>
      <section className={styles['logo']}>
        <span className={styles['title']}>
          {`${resumeDataSet.shortInitials.toUpperCase()}`}
        </span>
        <span className={styles['subtitle']}>{resumeDataSet.title}</span>
      </section>

      <aside className={styles['contacts']}>
        <Link href={`mailto:${resumeDataSet.email}`}>
          <span className="hand" title="Send email">
            {resumeDataSet.email}
          </span>
        </Link>
        <span>{resumeDataSet.location}</span>
        <div className={styles['social-networks']}>
          {Object.entries(resumeDataSet.socialNetwork).map(
            ([socialNetwork, URL], index) => (
              <div
                key={`social-network-${index}`}
                title={socialNetwork}
                className="hand"
                onClick={openURL(URL)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openURL(URL)();
                }}
              >
                {ICON[socialNetwork]}
              </div>
            )
          )}
        </div>
      </aside>

      <section className={styles['description']}>
        <div className={styles['description__toggle']}>
          <ToggleComponent available={resumeDataSet.isAvailable} />
          <span>{PageLabel.available}</span>
        </div>
      </section>
      <div className={styles['order-education-work-exp']}>
        <aside className={styles['education']}>
          <h2>Education</h2>
          {resumeDataSet.education.map(
            ({ title, institution, date, degree }, index) => (
              <div
                className={styles['education__content']}
                key={`education-${index}`}
              >
                <span className={styles['work-experience__title']}>
                  {title}
                </span>
                <span>{institution}</span>
                <span>{`${date[0]} - ${date[1]}`}</span>
                <span>{degree}</span>
              </div>
            )
          )}
        </aside>

        <section className={styles['work-experience']}>
          <h2>Work Experience</h2>
          {resumeDataSet.workExperience.map(
            ({ date, title, company, location, description }, index) => (
              <div
                className={styles['work-experience__content']}
                key={`work-experience-${index}`}
              >
                <span className={styles['work-experience__date']}>
                  {`${date[0]} - ${date[1]}`}
                </span>
                <span className={styles['work-experience__title']}>
                  {title}
                </span>
                <p className={styles['work-experience__place']}>
                  <span>{company}</span>
                  <span>{location}</span>
                </p>
                <span className={styles['work-experience__description']}>
                  {description}
                </span>
              </div>
            )
          )}
        </section>
      </div>
      <section className={styles['skills']}>
        <h2>Skills</h2>
        <div className={styles['skills__content']}>
          {resumeDataSet.skills.map(({ name, items }, index) => (
            <div className={styles['skills__items']} key={`skills-${index}`}>
              <span className={styles['skills__title']}>{name}</span>
              <span className={styles['skills__description']}>{items}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ) : null;
};

export default ResumeComponent;
