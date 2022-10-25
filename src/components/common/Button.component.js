import styles from './Button.module.scss';

const ButtonComponent = ({ buttonType, btnLabel, onClick, leftIcon }) => {
  const LeftIcon = leftIcon;
  if (buttonType !== 'fav-button') {
    return (
      <button
        className={`${styles['button']} ${styles[buttonType]}`}
        onClick={onClick}
      >
        {leftIcon && <LeftIcon className={styles['left-icon']} />}
        <span>{btnLabel}</span>
      </button>
    );
  }
  if (buttonType === 'fav-button') {
    return (
      <button className={`${styles[buttonType]}`} onClick={onClick}>
        <LeftIcon className={styles['left-icon']} />
      </button>
    );
  }
};

export default ButtonComponent;
