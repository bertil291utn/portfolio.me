import styles from './Button.module.scss';

const ButtonComponent = ({ buttonType, btnLabel, onClick, leftIcon }) => {
  const LeftIcon = leftIcon;
  return (
    <button
      className={`${styles['button']} ${styles[buttonType]}`}
      onClick={onClick}
    >
      {leftIcon && <LeftIcon className={styles['left-icon']} />}
      <span>{btnLabel}</span>
    </button>
  );
};

export default ButtonComponent;
