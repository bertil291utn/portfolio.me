import styles from './Toggle.module.scss';

const ToggleComponent = ({ checked }) => {
  return (
    <label className={styles['switch']}>
      <input type='checkbox' /*checked={checked} disabled*/ />
      <span className={`${styles['slider']} ${styles['round']}`}></span>
    </label>
  );
};

export default ToggleComponent;
