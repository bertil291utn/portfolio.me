import { useEffect, useState } from 'react';
import ModalComponent from '@components/common/Modal.component';
import PortfolioComponent from '@layouts/Portfolio.component';
import { newUserModalLabels } from '@placeholders/modal.placeholders';
import { localStorageKeys } from '@keys/localStorage';
import { addNewDevice, getPortfolio } from '@utils/firebaseFunctions';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

function HomeContent({ projects }) {
  const [show, setShow] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    setIsFirstTime(!window.localStorage.getItem(localStorageKeys.isFirstTime));
  }, []);

  const setFirstTimeFalse = () => {
    window.localStorage.setItem(localStorageKeys.isFirstTime, false);
  };


  const acceptBtnAction = async () => {
    setFirstTimeFalse();

    try {
      await openConnectModal();
      await addNewDevice(address, { isWeb3User: true })

    } catch (error) {
      console.log(error.message)
    }
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
  const resp = await getPortfolio();
  const projects = resp.docs.map((doc) => doc.data())

  return {
    props: {
      projects,
    },
  };
}

export default HomeContent;
