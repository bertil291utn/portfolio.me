import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { ModalText } from '../../placeholders/modal.placeholders';
import styles from './Modal.module.scss';

const ModalComponent = ({ show, setShow, title, children }) => {
  const handleClose = () => setShow(false);
  const modalRef = useRef(null);
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`${styles['modal']} ${
        show ? styles['modal__show'] : styles['modal__hide']
      }`}
      ref={modalRef}
      // onClick={handleClose}
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
        <div className={styles['footer']}>
          <button className={styles['primary-button']}>
            <span>ok</span>
          </button>
          <button className={styles['secondary-button']}>
            <span>cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
