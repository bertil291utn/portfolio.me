import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { ModalText } from '@placeholders/modal.placeholders';
import styles from './Modal.module.scss';
import useOutsideElement from '@hooks/useOutsideElement';
import { localStorageKeys } from '@keys/localStorage';
import ButtonComponent from '@components/common/Button.component';

const ModalComponent = ({
  show,
  setShow,
  title,
  children,
  acceptLabel,
  cancelLabel,
  backButton = true,
  closeButton = true,
}) => {
  const handleClose = () => setShow(false);
  const modalRef = useRef(null);
  const [IsOutsideElement] = useOutsideElement(modalRef);
  useEffect(() => {
    if (IsOutsideElement && backButton) {
      handleClose();
    }
  }, [IsOutsideElement]);

  const setFirstTimeFalse = () => {
    window.localStorage.setItem(localStorageKeys.isFirstTime, false);
  };

  const acceptBtnAction = () => {
    setFirstTimeFalse();
    window.localStorage.setItem(localStorageKeys.isWeb3User, true);
    handleClose();
  };

  const cancelBtnAction = () => {
    setFirstTimeFalse();
    handleClose();
  };

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
        {closeButton && (
          <span className={styles['close']} onClick={handleClose}>
            {ModalText.closeLabel}
          </span>
        )}
        <div className={styles['body-content']}>
          {title && <span className={styles['title']}>{title}</span>}
          {children && <span className={styles['children']}>{children}</span>}
          {acceptLabel && (
            <div className={styles['footer']}>
              <ButtonComponent
                buttonType='primary'
                btnLabel={acceptLabel}
                onClick={acceptBtnAction}
              />
              <ButtonComponent
                buttonType='tertiary'
                btnLabel={cancelLabel || ModalText.defaultCancelLabel}
                onClick={cancelBtnAction}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
