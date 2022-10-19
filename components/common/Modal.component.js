import { useTheme } from 'next-themes';
import styles from './Modal.module.scss';

const ModalComponent = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`${styles['modal']} ${
        show ? styles['modal__show'] : styles['modal__hide']
      }`}
      onClick={handleClose}
    >
      <div
        className={`${styles['modal-content']} ${
          resolvedTheme === 'dark' ? styles['modal-content__dark'] : ''
        }`}
      >
        <span className={styles['close']} onClick={handleClose}>
          close
        </span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
};

export default ModalComponent;
