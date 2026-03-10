import { useState, useEffect } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <CustomCursor />
        <ScrollProgress />
        <Navbar />

        <main id="home">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <FloatingResumeButton />
      </div>
    </div>
  );
}

export default App;
