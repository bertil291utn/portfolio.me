import styles from './Button.module.scss';

const ButtonComponent = ({ buttonType, btnLabel, onClick }) => {
  return (
    <button
      className={`${styles['button']} ${styles[buttonType]}`}
      onClick={onClick}
    >
      <span>{btnLabel}</span>
    </button>
  );
};

export default ButtonComponent;
