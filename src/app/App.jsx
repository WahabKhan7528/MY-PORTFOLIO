import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from '@/shared/Layout/Navbar';
import Footer from '@/shared/Layout/Footer';
import ScrollProgress from '@/shared/Layout/ScrollProgress';
import TransitionWrapper from '@/shared/Layout/TransitionWrapper';
import ScrollToTop from '@/shared/Layout/ScrollToTop';
import FloatingResumeButton from '@/shared/Ui/FloatingResumeButton';
import Preloader from '@/shared/Ui/Preloader';
import CustomCursor from '@/shared/Ui/CustomCursor';
import EasterEggs from '@/shared/Ui/EasterEggs';
import FlashPanel from '@/shared/Ui/FlashPanel';
import ParticleDataStream from '@/shared/Effects/ParticleDataStream';
import ProjectDetail from '@/features/Projects/ProjectDetail';

// Hooks
import useLocomotiveScroll from '@/shared/hooks/useLocomotiveScroll';
import useGlobalAudio from '@/shared/hooks/useGlobalAudio';

// Pages
import Home from '@/app/routes/Home';
import AboutPage from '@/app/routes/About';
import ProjectsPage from '@/app/routes/Projects';
import ContactPage from '@/app/routes/Contact';
import PrivacyPage from '@/app/routes/Privacy';
import TermsPage from '@/app/routes/Terms';

function App() {
  const [systemStarted, setSystemStarted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();

  // Custom Hooks
  useLocomotiveScroll(loading, location.pathname);
  useGlobalAudio();

  return (
    <div className="relative bg-black text-white min-h-screen">
      <ScrollToTop />
      <ParticleDataStream />
      <FlashPanel />

      {/* SystemInit removed: app starts immediately */}

      {systemStarted && loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`transition-opacity duration-700 ${(!systemStarted || loading) ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <CustomCursor />
        <ScrollProgress />
        <EasterEggs />
        <Navbar />

        <main className="hero-container">
          <TransitionWrapper>
            {(displayLocation) => (
              <Routes location={displayLocation}>
                <Route path="/" element={<Home onProjectSelect={setSelectedProject} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage onProjectSelect={setSelectedProject} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/test-preloader" element={<Preloader onComplete={() => console.log('Preloader test complete')} />} />
              </Routes>
            )}
          </TransitionWrapper>
        </main>

        <Footer />
        <FloatingResumeButton />
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;
