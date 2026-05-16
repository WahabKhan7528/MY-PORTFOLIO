import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap, ScrollTrigger } from './lib/gsap';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingResumeButton from './components/FloatingResumeButton';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ProjectDetail from './components/ProjectDetail';
import TransitionWrapper from './components/TransitionWrapper';
import ParticleDataStream from './components/ParticleDataStream';
import EasterEggs from './components/EasterEggs';
import { audioEngine } from './lib/audio';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [systemStarted, setSystemStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const flashRef = useRef(null);
  const location = useLocation();

  useGSAP(() => {
    // MOTION: Flash transition panel opacity on load
    gsap.fromTo(flashRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
    );
  });


  useLayoutEffect(() => {
    if (loading) return;

    // LOCOMOTIVE SCROLL 5 + GSAP SYNC
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
      }
    });

    const lenis = locomotiveScroll.lenisInstance;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (lenis) lenis.off('scroll', ScrollTrigger.update);
      locomotiveScroll.destroy();
    };
  }, [loading, location.pathname]); // Refresh on route change

  // Global Audio Event Listeners
  useEffect(() => {
    const handleMouseDown = () => {
      audioEngine.playClick();
    };

    // User interaction enables audio context
    const handleInteraction = () => {
      audioEngine.init();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen">
      <ScrollToTop />
      <ParticleDataStream />
      <div ref={flashRef} className="fixed inset-0 z-[9998] bg-white pointer-events-none" />

      {!systemStarted && (
        <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono text-white">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <button
            onClick={() => {
              audioEngine.init();
              audioEngine.playDrone();
              setSystemStarted(true);
            }}
            className="relative z-10 px-8 py-4 border border-white/30 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors duration-500"
          >
            [ Initialize System ]
          </button>
        </div>
      )}

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
