import { useState } from 'react';
import ModalComponent from '@components/common/Modal.component';
import PortfolioComponent from '@layouts/Portfolio.component';
import { ModalText } from '@placeholders/modal.placeholders';

function HomeContent() {
  const [show, setShow] = useState(true);
  return (
    <>
      <PortfolioComponent />
      <ModalComponent
        show={show}
        setShow={setShow}
        title={'session as web3 user'}
      >
        {ModalText.description}
      </ModalComponent>
    </>
  );
}

export default HomeContent;
