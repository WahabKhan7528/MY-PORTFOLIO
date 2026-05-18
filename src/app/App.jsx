import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from '@/shared/Layout/Navbar';
import Footer from '@/shared/Layout/Footer';
import ScrollProgress from '@/shared/Layout/ScrollProgress';
import TransitionWrapper from '@/shared/Layout/TransitionWrapper';
import FloatingResumeButton from '@/shared/Ui/FloatingResumeButton';
import Preloader from '@/shared/Ui/Preloader';
import CustomCursor from '@/shared/Ui/CustomCursor';
import EasterEggs from '@/shared/Ui/EasterEggs';
import ParticleDataStream from '@/shared/Effects/ParticleDataStream';
import ProjectDetail from '@/features/Projects/ProjectDetail';
import { audioEngine } from '@/lib/audio';

// Pages
import Home from '@/app/routes/Home';
import AboutPage from '@/app/routes/About';
import ProjectsPage from '@/app/routes/Projects';
import ContactPage from '@/app/routes/Contact';

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
        <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono text-white overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 animate-scanline" />

          {/* Corner Accents for the whole screen */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 border-t border-l border-white/30" />
          <div className="absolute top-3 sm:top-6 right-3 sm:right-6 w-3 sm:w-4 h-3 sm:h-4 border-t border-r border-white/30" />
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 border-b border-l border-white/30" />
          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-3 sm:w-4 h-3 sm:h-4 border-b border-r border-white/30" />

          {/* HUD Container around button */}
          <div className="relative group p-6 sm:p-10 border border-white/10 backdrop-blur-sm max-w-[90vw]">
            {/* Brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-white/60" />
            <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-white/60" />
            <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-white/60" />
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-white/60" />

            <div className="flex flex-col gap-6 items-center">
              {/* Top Metadata Line */}
              <div className="w-full flex justify-between text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/70 font-bold border-b border-white/5 pb-2">
                <span>SYS_READY</span>
                <span>AUTH_REQ</span>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  audioEngine.init();
                  audioEngine.playDrone();
                  setSystemStarted(true);
                }}
                className="relative z-10 px-5 py-3 sm:px-10 sm:py-5 min-h-[44px] border border-white text-[10px] sm:text-sm tracking-[0.1em] sm:tracking-[0.3em] uppercase bg-white text-black hover:bg-black hover:text-white transition-all duration-500 flex flex-row items-center justify-center gap-2 sm:gap-3 overflow-hidden group/btn font-bold max-w-full"
              >
                {/* Inner scanline effect for button on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover/btn:animate-scan transition-all duration-1000" />
                
                <span className="relative z-10 text-xs sm:text-base whitespace-nowrap">[ Initialize System ]</span>
              </button>

              {/* Bottom Metadata Line */}
              <div className="w-full flex justify-between text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] text-white/40 border-t border-white/5 pt-2">
                <span>LOC: 0x7A4.001</span>
                <span>NET_SECURE</span>
              </div>
            </div>
          </div>

          {/* Instruction Text */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full px-4">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase text-white/60 mb-2 font-medium">Awaiting User Interaction</p>
            <p className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40">Wahab Khan Portfolio v1.0</p>
          </div>
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

