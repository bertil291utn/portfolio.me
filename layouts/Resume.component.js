import Link from 'next/link';
import styles from './Resume.module.scss';
import ToggleComponent from '../components/common/Toggle.component';
import resumeFile from '../data/resume.json';

const ResumeComponent = () => {
  const {
    name,
    title,
    isAvailable,
    description,
    email,
    location,
    socialNetwork,
    workExperience,
    education,
    skills,
  } = resumeFile;
  console.log('first', resumeFile);

  return (
    <div className={`${styles['container']}`}>
      <section className={styles['logo']}>
        <span className={styles['title']}>{name}</span>
        <span className={styles['subtitle']}>{title}</span>
      </section>

      <aside className={styles['contacts']}>
        <Link href={`mailto:${email}`}>
          <span className='hand' title='Send email'>
            {email}
          </span>
        </Link>
        <span>{location}</span>
        <div className={styles['social-networks']}>
          {Object.entries(socialNetwork).map(([socialNetwork, link]) => (
            <Link href={link}>
              <a target='_blank' rel='noopener noreferrer'>
                <img
                  src={`/assets/icons/v2/${socialNetwork}.svg`}
                  alt={socialNetwork}
                  title={socialNetwork}
                />
              </a>
            </Link>
          ))}
        </div>
      </aside>

      <section className={styles['description']}>
        <div className={styles['description__toggle']}>
          <ToggleComponent available={isAvailable} />
          <span>Available</span>
        </div>
        <span className={styles['description__about-me']}>{description}</span>
      </section>

      <aside className={styles['education']}>
        <h2>Education</h2>
        {education.map(({ title, institution, date, degree }) => (
          <div className={styles['education__content']}>
            <span className={styles['work-experience__title']}>{title}</span>
            <span>{institution}</span>
            <span>{`${date[0]} - ${date[1]}`}</span>
            <span>{degree}</span>
          </div>
        ))}
      </aside>

      <section className={styles['work-experience']}>
        <h2>Work Experience</h2>
        {workExperience.map(
          ({ date, title, company, location, description }) => (
            <div className={styles['work-experience__content']}>
              <span className={styles['work-experience__date']}>
                {`${date[0]} - ${date[1]}`}
              </span>
              <span className={styles['work-experience__title']}>{title}</span>
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

      <section className={styles['skills']}>
        <h2>Skills</h2>
        <div className={styles['skills__content']}>
          {skills.map(({ name, items }) => (
            <div className={styles['skills__items']}>
              <span className={styles['skills__title']}>{name}</span>
              <span className={styles['skills__description']}>{items}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeComponent;
