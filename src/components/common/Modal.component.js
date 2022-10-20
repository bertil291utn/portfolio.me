import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { ModalText } from '@placeholders/modal.placeholders';
import styles from './Modal.module.scss';
import useOutsideElement from '@hooks/useOutsideElement';

const ModalComponent = ({
  show,
  setShow,
  title,
  children,
  acceptLabel,
  cancelLabel,
}) => {
  const handleClose = () => setShow(false);
  const modalRef = useRef(null);
  const [IsOutsideElement] = useOutsideElement(modalRef);
  useEffect(() => {
    if (IsOutsideElement) {
      handleClose();
    }
  }, [IsOutsideElement]);

  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`${styles['modal']} ${
        show ? styles['modal__show'] : styles['modal__hide']
      }`}
    >
      <div
        className={`${styles['modal-content']} ${
          resolvedTheme === 'dark' ? styles['modal-content__dark'] : ''
        }`}
        ref={modalRef}
      >
        <span className={styles['close']} onClick={handleClose}>
          {ModalText.closeLabel}
        </span>
        <div className={styles['body-content']}>
          {title && <span className={styles['title']}>{title}</span>}
          {children && <span className={styles['children']}>{children}</span>}
          {acceptLabel && (
            <div className={styles['footer']}>
              <button className={styles['primary-button']}>
                <span>{acceptLabel}</span>
              </button>
              <button className={styles['secondary-button']}>
                <span>{cancelLabel || ModalText.defaultCancelLabel}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
