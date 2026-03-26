import PortfolioCard from '@components/PortfolioCard.component';
import HomeHero from '@components/HomeHero.component';
import ServicesSection from '@components/ServicesSection.component';
import ContactSection from '@components/ContactSection.component';
import Web3WorkSection from '@layouts/Web3WorkSection.component';
import { useSite } from '@context/SiteContext';
import { isWeb3Project } from '@utils/portfolio';
import styles from './Portfolio.module.scss';

function PortfolioComponent({ projectsData, resume }) {
  const site = useSite();
  const home = site.ui.home;
  const projects = projectsData || [];
  const web3Projects = projects.filter(isWeb3Project);
  const web2Projects = projects.filter((p) => !isWeb3Project(p));

  return (
    <div className={styles['portfolio-page']}>
      <HomeHero resume={resume} />
      <ServicesSection />
      <section className={styles['section']} aria-labelledby="work-heading">
        <h2 id="work-heading" className={styles['section-title']}>
          {home.projectsTitle}
        </h2>
        <p className={styles['section-sub']}>{home.projectsSubtitle}</p>
        <div className={styles['portfolio']}>
          {web2Projects.map((data) => (
            <PortfolioCard
              key={`portfolio-card-${data.id}`}
              type={data.type}
              description={data.description}
              projectName={data.projectName}
              overview={data.overview}
              github={data.github}
            />
          ))}
        </div>
      </section>
      <Web3WorkSection projects={web3Projects} />
      <ContactSection email={resume?.email} />
    </div>
  );
}

export default PortfolioComponent;
