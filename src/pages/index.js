import { useEffect, useState } from 'react';
import ModalComponent from '@components/common/Modal.component';
import PortfolioComponent from '@layouts/Portfolio.component';
import { newUserModalLabels } from '@placeholders/modal.placeholders';
import { localStorageKeys } from '@keys/localStorage';
import { portfolioDataURL } from 'src/config/URLs';

function HomeContent({ projects }) {
  const [show, setShow] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState();
  useEffect(() => {
    setIsFirstTime(!window.localStorage.getItem(localStorageKeys.isFirstTime));
  }, []);

  const setFirstTimeFalse = () => {
    window.localStorage.setItem(localStorageKeys.isFirstTime, false);
  };

  const acceptBtnAction = () => {
    setFirstTimeFalse();
    window.localStorage.setItem(localStorageKeys.isWeb3User, true);
  };

  const cancelBtnAction = () => {
    setFirstTimeFalse();
  };

  return (
    <>
      <PortfolioComponent projectsData={projects} />
      {isFirstTime && (
        <ModalComponent
          show={show}
          setShow={setShow}
          acceptLabel={newUserModalLabels.acceptLabel}
          cancelLabel={newUserModalLabels.cancelLabel}
          backButton={false}
          closeButton={false}
          acceptBtnAction={acceptBtnAction}
          cancelBtnAction={cancelBtnAction}
        >
          {newUserModalLabels.description}
        </ModalComponent>
      )}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(portfolioDataURL);
  const projects = await res.json();

  return {
    props: {
      projects,
    },
  };
}

export default HomeContent;
