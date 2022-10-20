import { useState } from 'react';
import ModalComponent from '@components/common/Modal.component';
import PortfolioComponent from '@layouts/Portfolio.component';
import { ModalText } from '@placeholders/modal.placeholders';

function HomeContent() {
  const [show, setShow] = useState(true);
  //TODO: show modal only when there's no local storage display modal value
  return (
    <>
      <PortfolioComponent />
      <ModalComponent
        show={show}
        setShow={setShow}
        acceptLabel={ModalText.acceptLabel}
        cancelLabel={ModalText.cancelLabel}
      >
        {ModalText.description}
      </ModalComponent>
    </>
  );
}

export default HomeContent;
