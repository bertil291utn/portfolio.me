import Link from 'next/link';
import styles from './Body.module.scss';
import ToggleComponent from './common/Toggle.component';

const BodyComponent = () => {
  return (
    <div className={`${styles['container']}`}>
      <section className={styles['logo']}>
        <span className={styles['title']}>Bertil Tandayamo</span>
        <span className={styles['subtitle']}>Full Stack Developer</span>
      </section>

      <aside className={styles['contacts']}>
        <Link href='mailto:letstalk@bertiltandayamo.me'>
          <span className='hand' title='Send email'>
            letstalk@bertiltandayamo.me
          </span>
        </Link>
        <span>Quito, Ecuador</span>
        <div className={styles['social-networks']}>
          <Link href={`https://www.linkedin.com/in/bertiltandayamo/`}>
            <a target='_blank' rel='noopener noreferrer'>
              <img
                src='/assets/icons/v2/linkedin.svg'
                alt='linkedin'
                title='linkedin'
              />
            </a>
          </Link>
          <img
            src='/assets/icons/v2/github-sign.svg'
            alt='github'
            title='github'
          />
        </div>
      </aside>

      <section className={styles['description']}>
        <div className={styles['description__toggle']}>
          <ToggleComponent available />
          <span>Available</span>
        </div>
        <span className={styles['description__about-me']}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          autem enim, nihil consequatur animi nemo odit quam quas, repellendus
          alias nobis dolore assumenda nostrum consectetur sit labore facere,
          sed odio?
        </span>
      </section>

      <aside className={styles['education']}>
        <h2>Education</h2>
        <div className={styles['education__content']}>
          <span className={styles['work-experience__title']}>
            Interface Design: Web & Mobile
          </span>
          <span>
            Belarusian State University of Informatics and Radioelectronics,
          </span>
          <span>2011 - 2015</span>
          <span>Bachelor’s degree</span>
        </div>
        {/* 2 */}
        <div className={styles['education__content']}>
          <span className={styles['work-experience__title']}>
            Interface Design: Web & Mobile
          </span>
          <span>
            Belarusian State University of Informatics and Radioelectronics,
          </span>
          <span>2011 - 2015</span>
          <span>Bachelor’s degree</span>
        </div>
      </aside>

      <section className={styles['work-experience']}>
        <h2>Work Experience</h2>
        <div className={styles['work-experience__content']}>
          <span className={styles['work-experience__date']}>
            Jul 2019 - present
          </span>
          <span className={styles['work-experience__title']}>
            Freelancer Designer
          </span>
          <p className={styles['work-experience__place']}>
            <span>J Creative Solutions</span>
            <span>Netherlands, Worldwide</span>
          </p>
          <span className={styles['work-experience__description']}>
            Created visuals for digital marketing channels such as social media,
            promo web and online ads. Developed visual language from scratch or
            following the branding guidelines. Designed presentations for
            clients and indoor purposes.
          </span>
        </div>

        {/* 2 */}

        <div className={styles['work-experience__content']}>
          <span className={styles['work-experience__date']}>
            Jul 2019 - present
          </span>
          <span className={styles['work-experience__title']}>
            Freelancer Designer
          </span>
          <p className={styles['work-experience__place']}>
            <span>J Creative Solutions</span>
            <span>Netherlands, Worldwide</span>
          </p>
          <span className={styles['work-experience__description']}>
            Created visuals for digital marketing channels such as social media,
            promo web and online ads. Developed visual language from scratch or
            following the branding guidelines. Designed presentations for
            clients and indoor purposes.
          </span>
        </div>
      </section>
    </div>
  );
};

export default BodyComponent;
