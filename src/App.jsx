import { useState, useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FloatingResumeButton from './components/FloatingResumeButton';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {/* Show the GSAP Preloader first */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Content only becomes interactive/visible when loader is done animating out */}
      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
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
