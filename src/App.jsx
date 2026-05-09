import { useState, useLayoutEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap, ScrollTrigger } from './lib/gsap';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FloatingResumeButton from './components/FloatingResumeButton';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ProjectDetail from './components/ProjectDetail';

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const flashRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // MOTION: Flash transition panel opacity on load
      gsap.fromTo(flashRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

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
  }, [loading]);

  return (
    <div className="relative bg-black min-h-screen text-white">
      <div ref={flashRef} className="fixed inset-0 z-[9998] bg-white pointer-events-none" />
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <CustomCursor />
        <ScrollProgress />
        <Navbar />

        <main id="home" className="hero-container">
          <Hero />
          <About />
          <Skills />
          <Projects onProjectSelect={setSelectedProject} />
          <Contact />
        </main>

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
