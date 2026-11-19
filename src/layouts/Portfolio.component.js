import PortfolioCard from '@components/PortfolioCard.component';
import HomeHero from '@components/HomeHero.component';
import ServicesSection from '@components/ServicesSection.component';
import FdeSection from '@components/FdeSection.component';
import CaseStudiesSection from '@components/CaseStudiesSection.component';
import ContactSection from '@components/ContactSection.component';
import { useSite } from '@context/SiteContext';
import styles from './Portfolio.module.scss';

function PortfolioComponent({ projectsData, caseStudies = [], resume }) {
  const site = useSite();
  const home = site.ui.home;
  const projects = projectsData || [];
  const caseStudyByProject = Object.fromEntries(
    caseStudies.filter((cs) => cs.projectId).map((cs) => [cs.projectId, cs.slug])
  );

  return (
    <div className={styles['portfolio-page']}>
      <HomeHero resume={resume} />
      <ServicesSection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <FdeSection />
      <section className={styles['section']} aria-labelledby="work-heading">
        <h2 id="work-heading" className={styles['section-title']}>
          {home.projectsTitle}
        </h2>
        <p className={styles['section-sub']}>{home.projectsSubtitle}</p>
        <div className={styles['portfolio']}>
          {projects.map((data) => (
            <PortfolioCard
              key={`portfolio-card-${data.id}`}
              type={data.type}
              description={data.description}
              projectName={data.projectName}
              overview={data.overview}
              github={data.github}
              caseStudySlug={caseStudyByProject[data.id]}
              caseStudyLabel={home.caseStudyLinkLabel}
            />
          ))}
        </div>
      </section>
      <ContactSection
        email={resume?.email}
        upwork={resume?.socialNetwork?.upwork}
      />
    </div>
  );
}

export default PortfolioComponent;
