import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function ProjectDetail({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const lastActiveEl = useRef(null);

  useEffect(() => {
    lastActiveEl.current = document.activeElement;
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'Tab') {
        // Simple focus trap
        const focusable = contentRef.current.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);

    const ctx = gsap.context(() => {
      // Animate in
      gsap.fromTo(overlayRef.current, 
        { yPercent: 100 }, 
        { yPercent: 0, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(contentRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      );
    });

    // focus first focusable element
    setTimeout(() => {
      const focusable = contentRef.current.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
      if (focusable.length) focusable[0].focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      ctx.revert();
      if (lastActiveEl.current && lastActiveEl.current.focus) lastActiveEl.current.focus();
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      yPercent: 100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: onClose
    });
  };

  if (!project) return null;

  // Mocking extra screenshots by reusing the main image and applying slight CSS filters for variation
  const screenshots = [
    project.image,
    project.image,
    project.image
  ];

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black text-white overflow-y-auto"
      data-lenis-prevent="true"
    >
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference bg-gradient-to-b from-black/80 to-transparent">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-bold">
          Project Case Study
        </span>
        <button 
          onClick={handleClose}
          className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          <span>Close</span>
          <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto px-6 pt-32 md:pt-48 pb-20">
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400">{project.category}</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400">{project.year}</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight tracking-tighter mb-8">
            {project.title}
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed mb-12">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-6">
            {project.demoUrl && project.demoUrl !== '#' && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-white text-black rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:scale-105 transition-transform"
              >
                Visit Live Site
              </a>
            )}
            <a 
              href={project.repoUrl || "https://github.com/WahabKhan7528"}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-white/10 transition-colors"
            >
              View GitHub Repo
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-20 relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
        </div>

        {/* Screenshots Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-bold mb-10 tracking-tight">Project Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {screenshots.map((src, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'} bg-zinc-900 border border-white/10`}>
                <img 
                  src={src} 
                  alt={`${project.title} screenshot ${i+1}`} 
                  className={`w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 ${i === 1 ? 'grayscale' : ''} ${i === 2 ? 'contrast-125' : ''}`} 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
