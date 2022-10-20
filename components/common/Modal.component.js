import { useTheme } from 'next-themes';
import { ModalText } from '../../placeholders/modal.placeholders';
import styles from './Modal.module.scss';

const ModalComponent = ({ show, setShow, title, children }) => {
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
          {ModalText.closeLabel}
        </span>
        {title && <span className={styles['title']}>{title}</span>}
        {children && <span className={styles['children']}>{children}</span>}
      </div>
    </div>
  );
};

export default ModalComponent;
