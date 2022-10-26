import styles from './Button.module.scss';

const ButtonComponent = ({
  buttonType,
  btnLabel,
  onClick,
  leftIcon,
  title,
  className,
}) => {
  const LeftIcon = leftIcon;
  if (buttonType !== 'fab-button') {
    return (
      <button
        className={`${className ? className : ''} ${styles['button']} ${
          styles[buttonType]
        }`}
        onClick={onClick}
        title={title}
      >
        {leftIcon && <LeftIcon className={styles['left-icon']} />}
        <span>{btnLabel}</span>
      </button>
    );
  }
  if (buttonType === 'fab-button') {
    return (
      <button
        className={`${className ? className : ''} ${styles[buttonType]}`}
        onClick={onClick}
        title={title}
      >
        <LeftIcon className={styles['left-icon']} />
      </button>
    );
  }
};

export default ButtonComponent;
