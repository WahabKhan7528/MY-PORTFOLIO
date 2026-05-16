import { useEffect } from 'react';
import AboutHero from '../components/AboutHero';
import Stats from '../components/Stats';
import About from '../components/About';
import Vision from '../components/Vision';
import Philosophy from '../components/Philosophy';
import Process from '../components/Process';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import { ScrollTrigger } from '../lib/gsap';

const AboutPage = () => {
  useEffect(() => {
    // Ensure ScrollTrigger refreshes when the page loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black w-full relative">
      <AboutHero />
      <Stats />
      <About />
      <Vision />
      <Philosophy />
      <Process />
      <Experience />
      <Skills />
    </div>
  );
};

export default AboutPage;


