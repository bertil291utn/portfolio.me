import styles from './Body.module.scss';
import ToggleComponent from './common/Toggle.component';

const BodyComponent = () => {
  return (
    <div className={`${styles['container']}`}>
      <section className={styles['logo']}>
        <span className={styles['title']}>Bertil Tandayamo</span>
        <span className={styles['subtitle']}>Full Stack Developer</span>
      </section>
      <section className={styles['description']}>
        <ToggleComponent />
      </section>
    </div>
  );
};

export default BodyComponent;
