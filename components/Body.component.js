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
    </div>
  );
};

export default BodyComponent;
