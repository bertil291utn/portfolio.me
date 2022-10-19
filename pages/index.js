import { useState } from 'react';
import ModalComponent from '../components/common/Modal.component';
import PortfolioComponent from '../layouts/Portfolio.component';

function HomeContent() {
  const [show, setShow] = useState(true);
  return (
    <>
      <PortfolioComponent />
      <ModalComponent show={show} setShow={setShow} />
    </>
  );
}

export default HomeContent;
