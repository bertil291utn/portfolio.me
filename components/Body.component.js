import styles from './Body.module.scss';

const BodyComponent = () => {
  return (
    <div className={`${styles['container']}`}>
      <section className={styles['logo']}>
        <span className={styles['title']}>Bertil Tandayamo</span>
        <span className={styles['subtitle']}>Full Stack Developer</span>
      </section>
      <section className={styles['description']}></section>
    </div>
  );
};

export default BodyComponent;
