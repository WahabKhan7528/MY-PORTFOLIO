import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

export default function ProjectDetail({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const sliderRef = useRef(null);
  const lastActiveEl = useRef(null);
  const [activeImage, setActiveImage] = useState(project?.image);

  useEffect(() => {
    if (project) setActiveImage(project.image);
  }, [project]);

  useEffect(() => {
    lastActiveEl.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKey);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power4.inOut' }
      )
      .fromTo(".detail-header > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=0.2"
      )
      .fromTo(".detail-visual-main",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        "-=1"
      );

      // Continuous Marquee Slider Animation
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const sliderContent = slider.querySelector('.slider-content');
        
        // Infinite loop animation
        const totalWidth = sliderContent.offsetWidth / 2; // Since we doubled it
        
        const animation = gsap.to(sliderContent, {
          x: -totalWidth,
          duration: 10, // Adjust speed here. 10s for a full loop.
          repeat: -1,
          ease: "none",
        });

        slider.addEventListener('mouseenter', () => animation.pause());
        slider.addEventListener('mouseleave', () => animation.play());
      }
    });

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [project]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: onClose
    });
  };

  if (!project) return null;

  const screenshots = project.screenshots || [project.image];
  // Double the images for infinite loop
  const displayScreenshots = [...screenshots, ...screenshots];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black text-white overflow-y-auto no-scrollbar"
      data-lenis-prevent="true"
    >
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Top Protocol Bar - Responsive */}
      <div className="fixed top-0 left-0 w-full p-3 sm:p-4 md:p-6 lg:p-10 flex justify-between items-center z-[10000] border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] md:text-[11px] font-mono tracking-[0.4em] text-white/70 uppercase leading-none mb-1">PROJECT_ID</span>
            <span className="text-xs md:text-sm font-mono font-bold tracking-widest uppercase">NODE_{project.id || "00"}</span>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="group flex items-center gap-2 md:gap-4 px-4 md:px-8 py-2 md:py-3 bg-white text-black text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase hover:bg-gray-200 transition-all duration-300"
        >
          <span className="hidden sm:inline">CLOSE_SESSION</span>
          <span className="sm:hidden">CLOSE</span>
          <div className="w-3 md:w-4 h-px bg-black group-hover:w-6 transition-all" />
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-24">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            <header className="detail-header space-y-4 sm:space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-6 sm:w-8 md:w-12 h-px bg-white/60" />
                <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.6em] md:tracking-[0.8em] text-white/70 uppercase">CASE_STUDY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-display font-black tracking-tighter leading-none">
                {project.title.split('_')[0]}<br />
                <span className="text-white/20">{project.title.split('_')[1] || "SYSTEM"}</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </header>

            {/* Imagery Section */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <div className="detail-visual-main relative group overflow-hidden border border-white/10 p-2 sm:p-3 md:p-4 bg-white/5 backdrop-blur-sm h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                <img 
                  src={activeImage} 
                  alt={project.title} 
                  className="max-w-full max-h-full object-contain transition-all duration-1000 shadow-2xl"
                />
                
                <div className="absolute top-2 sm:top-4 md:top-6 lg:top-8 left-2 sm:left-4 md:left-6 lg:left-8 flex items-center gap-2 sm:gap-3">
                  <div className="w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.3em] text-white/50 uppercase">ACTIVE_FEED</span>
                </div>

                <div className="absolute top-0 left-0 w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 border-t border-l border-white/40" />
                <div className="absolute bottom-0 right-0 w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 border-b border-r border-white/40" />
              </div>

              {/* Infinite Marquee Slider */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6 overflow-hidden">
                <div className="flex justify-between items-end px-1 sm:px-2">
                  <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.4em] md:tracking-[0.5em] text-white/70 uppercase">GALLERY</h4>
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] font-mono text-white/30 uppercase tracking-widest italic">STREAMING</span>
                </div>
                
                <div 
                  ref={sliderRef}
                  className="relative w-full overflow-hidden cursor-pointer py-4"
                >
                  <div className="slider-content flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-max">
                    {displayScreenshots.map((src, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActiveImage(src)}
                        className={`relative flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-64 aspect-video overflow-hidden border transition-all duration-500 hover:scale-105 hover:z-10 ${activeImage === src ? 'border-white scale-105' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                      >
                        <img src={src} alt={`Screenshot ${i}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 text-[6px] sm:text-[7px] md:text-[8px] font-mono text-white/40 uppercase">CAM_0{(i % screenshots.length) + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) - Responsive Stacking */}
          <aside className="lg:col-span-4 detail-sidebar space-y-8 sm:space-y-10 md:space-y-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 sm:pt-10 lg:pt-0 lg:pl-8 md:lg:pl-12">
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-[10px] sm:text-[11px] font-mono tracking-[0.4em] sm:tracking-[0.5em] text-white/70 uppercase">ACTIONS</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-3 sm:p-4 md:p-6 border border-white/10 hover:bg-white hover:text-black transition-all text-[9px] sm:text-[10px] md:text-xs">
                    <span className="font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">ACCESS</span>
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 -rotate-45 group-hover:rotate-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                )}
                <a href={project.repoUrl || "#"} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-3 sm:p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all text-[9px] sm:text-[10px] md:text-xs">
                  <span className="font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/70 group-hover:text-white\">SOURCE</span>
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </a>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-[10px] sm:text-[11px] font-mono tracking-[0.4em] sm:tracking-[0.5em] text-white/70 uppercase">SPECS</h4>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                {[
                  { label: "TYPE", value: project.category || "PROJECT" },
                  { label: "TECH", value: project.tech ? project.tech.join(" // ") : "REACT" },
                  { label: "YEAR", value: project.year || "2026" },
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-white/10 pb-3 sm:pb-4">
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/50 uppercase tracking-widest">{spec.label}</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs font-mono text-white tracking-wider uppercase break-words">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-[10px] sm:text-[11px] font-mono tracking-[0.4em] sm:tracking-[0.5em] text-white/70 uppercase">MILESTONES</h4>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { phase: "PHASE_01", detail: "Architecture" },
                  { phase: "PHASE_02", detail: "Protocols" },
                  { phase: "PHASE_03", detail: "Deployment" },
                ].map((milestone, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-4 group">
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/50 group-hover:text-white transition-colors whitespace-nowrap">{milestone.phase}</span>
                    <div className="h-px flex-1 bg-white/10 group-hover:bg-white/30 transition-colors" />
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white tracking-wider uppercase whitespace-nowrap">{milestone.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-[10px] sm:text-[11px] font-mono tracking-[0.4em] sm:tracking-[0.5em] text-white/70 uppercase">CAPABILITIES</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["RESILIENT", "DYNAMIC", "SCALABLE"].map(cap => (
                  <span key={cap} className="px-2 sm:px-3 py-1 bg-white/10 border border-white/20 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/80 tracking-widest uppercase">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
