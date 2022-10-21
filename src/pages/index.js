import { useEffect, useState } from 'react';
import ModalComponent from '@components/common/Modal.component';
import PortfolioComponent from '@layouts/Portfolio.component';
import { ModalText } from '@placeholders/modal.placeholders';
import { localStorageKeys } from '@keys/localStorage';

function HomeContent() {
  const [show, setShow] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState();
  useEffect(() => {
    setIsFirstTime(!window.localStorage.getItem(localStorageKeys.isFirstTime));
  }, []);

  return (
    <>
      <PortfolioComponent />
      {isFirstTime && (
        <ModalComponent
          show={show}
          setShow={setShow}
          acceptLabel={ModalText.acceptLabel}
          cancelLabel={ModalText.cancelLabel}
        >
          {ModalText.description}
        </ModalComponent>
      )}
    </>
  );
}

export default HomeContent;
