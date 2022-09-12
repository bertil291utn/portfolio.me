import styles from './Body.module.scss';

const BodyComponent = () => {
  return (
    <div className={`${styles['container']}`}>
      <span>Bertil Tandayamo</span>
    </div>
  );
};

export default BodyComponent;
