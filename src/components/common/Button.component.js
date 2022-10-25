import styles from './Button.module.scss';

const ButtonComponent = ({
  buttonType,
  btnLabel,
  onClick,
  leftIcon,
  title,
}) => {
  const LeftIcon = leftIcon;
  if (buttonType !== 'fav-button') {
    return (
      <button
        className={`${styles['button']} ${styles[buttonType]}`}
        onClick={onClick}
        title={title}
      >
        {leftIcon && <LeftIcon className={styles['left-icon']} />}
        <span>{btnLabel}</span>
      </button>
    );
  }
  if (buttonType === 'fav-button') {
    return (
      <button
        className={`${styles[buttonType]}`}
        onClick={onClick}
        title={title}
      >
        <LeftIcon className={styles['left-icon']} />
      </button>
    );
  }
};

export default ButtonComponent;
