import Hero from '@/features/Home/Hero';
import AboutSection from '@/features/About/AboutSection';
import Skills from '@/features/Shared/Skills';
import ProjectsGrid from '@/features/Projects/ProjectsGrid';
import ContactSection from '@/features/Contact/ContactSection';
import Process from '@/features/Shared/Process';
import Stats from '@/features/Shared/Stats';

const Home = ({ onProjectSelect }) => {
  return (
    <div id="home">
      <Hero />
      <Stats />

      <div className="relative">
        <AboutSection />
      </div>

      <Process />

      <div className="relative">
        <Skills />
      </div>

      <div className="relative">
        <ProjectsGrid onProjectSelect={onProjectSelect} />

      </div>

      <ContactSection />
    </div>
  );
};

export default Home;

