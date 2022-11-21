import Link from 'next/link';
import styles from './Resume.module.scss';
import ToggleComponent from '@components/common/Toggle.component';
import { useTheme } from 'next-themes';
import resumeFile from '@data/resume.json';
import { BsLinkedin, BsGithub, BsTelegram } from 'react-icons/bs';
import { PageLabel } from '@placeholders/resume.placeholder';
import { isTokenCheckPassed } from '@utils/common';
import { useEffect, useState } from 'react';
import { useWalletContext } from '@context/WalletProvider';
import ModalComponent from '@components/common/Modal.component';
import ToastComponent from '@components/common/Toast.component';
import { PortfolioLabel } from '@placeholders/portfolio.placeholder';
import { useRouter } from 'next/router';
import { navbarElements } from '@placeholders/navbar.placeholders';

const ResumeComponent = () => {
  const [claimTokensModal, setClaimTokensModal] = useState(false);
  const [stakeTokensModal, setStakeTokensModal] = useState(false);
  const { userCustomTokenBalance, userStakedAmount } = useWalletContext();
  const [isStakeHolder, setIsStakeHolder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsStakeHolder(userStakedAmount?.toString() > 0);
  }, [userStakedAmount]);

  const ICON = {
    linkedin: <BsLinkedin />,
    github: <BsGithub />,
    telegram: <BsTelegram />,
  };

  const { resolvedTheme } = useTheme();
  const {
    name,
    title,
    isAvailable,
    description,
    email,
    location,
    socialNetwork,
    workExperience,
    education,
    skills,
  } = resumeFile;

  const openURL = (URL) => () => {
    const _isTokenCheckPassed = isTokenCheckPassed({
      setClaimTokensModal,
      setStakeTokensModal,
      userCustomTokenBalance,
      isStakeHolder,
    });
    _isTokenCheckPassed && window.open(URL, '_blank');
  };

  const claimAcceptBtnAction = () => {
    router.push(`/${navbarElements.tokens.label}`);
  };

  const stakeAcceptBtnAction = () => {
    router.push(`/${navbarElements.profile.label}#${IdContent.staking}`);
  };

  return (
    <div className={`${styles['container']}`}>
      <section className={styles['logo']}>
        <span className={styles['title']}>{name}</span>
        <span className={styles['subtitle']}>{title}</span>
      </section>

      <aside className={styles['contacts']}>
        <Link href={`mailto:${email}`}>
          <span className='hand' title='Send email'>
            {email}
          </span>
        </Link>
        <span>{location}</span>
        <div className={styles['social-networks']}>
          {Object.entries(socialNetwork).map(([socialNetwork, URL], index) => (
            <div
              key={`social-network-${index}`}
              title={socialNetwork}
              className={`hand`}
              onClick={openURL(URL)}
            >
              {ICON[socialNetwork]}
            </div>
          ))}
        </div>
      </aside>

      <section className={styles['description']}>
        <div className={styles['description__toggle']}>
          <ToggleComponent available={isAvailable} />
          <span>{PageLabel.available}</span>
        </div>
        <span className={styles['description__about-me']}>{description}</span>
      </section>
      <div className={styles['order-education-work-exp']}>
        <aside className={styles['education']}>
          <h2>Education</h2>
          {education.map(({ title, institution, date, degree }, index) => (
            <div
              className={styles['education__content']}
              key={`education-${index}`}
            >
              <span className={styles['work-experience__title']}>{title}</span>
              <span>{institution}</span>
              <span>{`${date[0]} - ${date[1]}`}</span>
              <span>{degree}</span>
            </div>
          ))}
        </aside>

        <section className={styles['work-experience']}>
          <h2>Work Experience</h2>
          {workExperience.map(
            ({ date, title, company, location, description }, index) => (
              <div
                className={styles['work-experience__content']}
                key={`work-experience-${index}`}
              >
                <span className={styles['work-experience__date']}>
                  {`${date[0]} - ${date[1]}`}
                </span>
                <span className={styles['work-experience__title']}>
                  {title}
                </span>
                <p className={styles['work-experience__place']}>
                  <span>{company}</span>
                  <span>{location}</span>
                </p>
                <span className={styles['work-experience__description']}>
                  {description}
                </span>
              </div>
            )
          )}
        </section>
      </div>
      <section className={styles['skills']}>
        <h2>Skills</h2>
        <div className={styles['skills__content']}>
          {skills.map(({ name, items }, index) => (
            <div className={styles['skills__items']} key={`skills-${index}`}>
              <span className={styles['skills__title']}>{name}</span>
              <span className={styles['skills__description']}>{items}</span>
            </div>
          ))}
        </div>
      </section>
      <ModalComponent
        show={claimTokensModal}
        setShow={setClaimTokensModal}
        acceptLabel={PortfolioLabel.freeTokensBtn}
        acceptBtnAction={claimAcceptBtnAction}
      >
        {PortfolioLabel.modalClaimDesc}
      </ModalComponent>
      <ModalComponent
        show={stakeTokensModal}
        setShow={setStakeTokensModal}
        acceptLabel={PortfolioLabel.stakeTokensBtn}
        acceptBtnAction={stakeAcceptBtnAction}
      >
        {PortfolioLabel.modalStakeDesc}
      </ModalComponent>
    </div>
  );
};

export default ResumeComponent;
