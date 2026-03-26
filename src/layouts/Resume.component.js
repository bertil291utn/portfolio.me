import Link from 'next/link';
import styles from './Resume.module.scss';
import ToggleComponent from '@components/common/Toggle.component';
import { BsLinkedin, BsGithub, BsTelegram } from 'react-icons/bs';
import { PageLabel } from '@placeholders/resume.placeholder';

const ICON = {
  linkedin: BsLinkedin,
  github: BsGithub,
  telegram: BsTelegram,
};

const formatTechLine = (str) => {
  if (!str || typeof str !== 'string') return null;
  const parts = str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts.join(' · ') : null;
};

const ResumeComponent = ({ resumeData: resumeDataSet }) => {
  const openURL = (URL) => () => {
    window.open(URL, '_blank', 'noopener,noreferrer');
  };

  if (!resumeDataSet) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <Link href={`mailto:${resumeDataSet.email}`}>
            <a className={styles.email}>{resumeDataSet.email}</a>
          </Link>
          <span className={styles.location}>{resumeDataSet.location}</span>
        </div>
        <div className={styles.socials}>
          {Object.entries(resumeDataSet.socialNetwork).map(([key, URL]) => {
            const Icon = ICON[key];
            if (!Icon) return null;
            return (
              <button
                key={key}
                type="button"
                className={styles.socialBtn}
                title={key}
                onClick={openURL(URL)}
                aria-label={key}
              >
                <Icon aria-hidden />
              </button>
            );
          })}
        </div>
      </header>

      <section className={styles.availability} aria-label="Availability">
        <div className={styles.availabilityRow}>
          <ToggleComponent available={resumeDataSet.isAvailable} />
          <span className={styles.availabilityLabel}>{PageLabel.available}</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="work-heading">
        <h2 id="work-heading" className={styles.sectionLabel}>
          Work experience
        </h2>
        <ul className={styles.workList}>
          {resumeDataSet.workExperience.map(
            (
              { date, title, company, location, description, technologies },
              index
            ) => {
              const period = `${date[0]} – ${date[1]}`;
              const techLine = formatTechLine(technologies);
              return (
                <li key={`work-${index}`} className={styles.workRow}>
                  <div className={styles.workPeriod}>{period}</div>
                  <div className={styles.workMain}>
                    <h3 className={styles.workTitle}>
                      {title}{' '}
                      <span className={styles.workCompany}>– {company}</span>
                    </h3>
                    <p className={styles.workDescription}>{description}</p>
                    {techLine ? (
                      <p className={styles.workTech}>{techLine}</p>
                    ) : null}
                    <p className={styles.workMeta}>{location}</p>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </section>

      <div className={styles.twoCol}>
        <section className={styles.section} aria-labelledby="edu-heading">
          <h2 id="edu-heading" className={styles.sectionLabel}>
            Education
          </h2>
          <ul className={styles.eduList}>
            {resumeDataSet.education.map(
              ({ title, institution, date, degree }, index) => (
                <li key={`edu-${index}`} className={styles.eduItem}>
                  <span className={styles.eduPeriod}>
                    {date[0]} – {date[1]}
                  </span>
                  <div>
                    <p className={styles.eduTitle}>{title}</p>
                    <p className={styles.eduInst}>{institution}</p>
                    <p className={styles.eduDegree}>{degree}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="skills-heading">
          <h2 id="skills-heading" className={styles.sectionLabel}>
            Skills
          </h2>
          <div className={styles.skillsGrid}>
            {resumeDataSet.skills.map(({ name, items }, index) => (
              <div key={`skills-${index}`} className={styles.skillBlock}>
                <span className={styles.skillName}>{name}</span>
                <span className={styles.skillItems}>{items}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeComponent;
