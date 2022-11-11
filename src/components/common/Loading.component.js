import styles from './Loading.module.scss';

const LoadingComponent = ({ fullHeight, descriptionLabel }) => {
  return (
    <div
      className={`${styles['container']} ${
        fullHeight ? styles['full-height'] : ''
      }`}
    >
      <p className={styles['description']}>{descriptionLabel}</p>
    </div>
  );
};

export default LoadingComponent;
