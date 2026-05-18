import { useEffect } from 'react';
import AboutHero from '@/features/About/AboutHero';
import AboutSection from '@/features/About/AboutSection';
import Vision from '@/features/About/Vision';
import Philosophy from '@/features/About/Philosophy';
import Experience from '@/features/About/Experience';
import Stats from '@/features/Shared/Stats';
import Process from '@/features/Shared/Process';
import Skills from '@/features/Shared/Skills';
import { ScrollTrigger } from '@/lib/gsap';

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
      <AboutSection />
      <Vision />
      <Philosophy />
      <Process />
      <Experience />
      <Skills />
    </div>
  );
};

export default AboutPage;



