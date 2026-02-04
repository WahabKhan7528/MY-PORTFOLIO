import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FloatingResumeButton from './components/FloatingResumeButton';

function App() {
  return (
    <div className="relative">
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
  );
}

export default App;
