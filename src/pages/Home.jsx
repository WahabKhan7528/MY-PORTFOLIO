import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Process from '../components/Process';
import Stats from '../components/Stats';
import { Link } from 'react-router-dom';

const Home = ({ onProjectSelect }) => {
  return (
    <div id="home">
      <Hero />
      <Stats />

      <div className="relative">
        <About />
      </div>

      <Process />

      <div className="relative">
        <Skills />
      </div>

      <div className="relative">
        <Projects onProjectSelect={onProjectSelect} />

      </div>

      <Contact />
    </div>
  );
};

export default Home;
