import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function ProjectDetail({ project, onClose }) {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeImage, setActiveImage] = useState(project?.image);

  useEffect(() => {
    if (project) setActiveImage(project.image);
  }, [project]);

  // Handle entry animation and escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);

    let resizeObserver;
    let animation;
    let slider;
    let sliderContent;
    let setupSliderAnimation;
    let handleEnter;
    let handleLeave;

    const ctx = gsap.context(() => {
      // Entry animation
      const tl = gsap.timeline();
      tl.fromTo(containerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power4.inOut' }
      )
      .fromTo('.animate-stagger', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        "-=0.3"
      );

      // Continuous Marquee Slider Animation
      if (sliderRef.current) {
        slider = sliderRef.current;
        sliderContent = slider.querySelector(".slider-content");

        setupSliderAnimation = () => {
          if (!sliderContent) return;
          const totalWidth = sliderContent.offsetWidth / 2;
          if (animation) animation.kill();
          animation = gsap.to(sliderContent, {
            x: -totalWidth,
            duration: 15,
            repeat: -1,
            ease: "none",
          });
        };

        setupSliderAnimation();

        handleEnter = () => animation && animation.pause();
        handleLeave = () => animation && animation.play();

        slider.addEventListener("mouseenter", handleEnter);
        slider.addEventListener("mouseleave", handleLeave);

        if (window.ResizeObserver) {
          resizeObserver = new ResizeObserver(setupSliderAnimation);
          resizeObserver.observe(sliderContent);
        } else {
          window.addEventListener("resize", setupSliderAnimation);
        }
      }
    });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
      if (slider) {
        slider.removeEventListener("mouseenter", handleEnter);
        slider.removeEventListener("mouseleave", handleLeave);
      }
      if (resizeObserver) resizeObserver.disconnect();
      if (setupSliderAnimation) {
        window.removeEventListener("resize", setupSliderAnimation);
      }
      if (animation) animation.kill();
      ctx.revert();
    };
  }, [project]);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: onClose
    });
  };

  if (!project) return null;

  const screenshots = project.screenshots || [project.image];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col"
      data-lenis-prevent="true"
    >
      {/* Background Cyberpunk Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Top Header - Sticky */}
      <header className="relative z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 py-4 md:px-8 md:py-6 lg:px-12 lg:py-8">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col animate-stagger">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-white/50 uppercase">
              PROJECT_ID
            </span>
            <span className="text-sm md:text-base font-mono font-bold tracking-widest text-white uppercase">
              {project.id || '00'}
            </span>
          </div>
          
          <button 
            onClick={handleClose}
            className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 animate-stagger"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              CLOSE_SESSION
            </span>
            <div className="w-4 h-[1px] bg-white group-hover:bg-black transition-colors" />
          </button>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-4 md:p-8 lg:p-12 pb-24" data-lenis-prevent="true">
        <div className="w-full space-y-8 md:space-y-12">
          
          {/* Header / Title */}
          <header className="animate-stagger max-w-5xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-display tracking-tighter leading-[0.92] uppercase text-white drop-shadow-lg break-words">
              {project.title.split(/[_\s]+/)[0]}
              <br />
              <span className="text-white/30 italic">
                {project.title.split(/[_\s]+/).slice(1).join(' ') || 'SYS'}
              </span>
            </h1>
          </header>

          {/* Description Section */}
          <section className="animate-stagger max-w-4xl space-y-3 border-l-2 border-white/20 pl-4 py-2">
            <h3 className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-white/40 uppercase">
              PROJECT_OVERVIEW
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </section>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start justify-between">
            
            {/* Left Column: Visuals */}
            <div className="w-full lg:w-7/12 min-w-0 space-y-6 md:space-y-8 animate-stagger">
              {/* Main Hero Image Container */}
              <div className="relative group w-full aspect-[4/3] md:aspect-video border border-white/20 bg-white/5 overflow-hidden">
                <img 
                  src={activeImage} 
                  alt={project.title} 
                  className="w-full h-full object-contain grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/50" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/50" />
              </div>

              {/* Gallery / Screenshots (Horizontal Infinite Scroll Marquee) */}
              <div className="space-y-3 overflow-hidden">
                <div className="flex justify-between items-end">
                  <h4 className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-white/50 uppercase">
                    PROJECT_GALLERY
                  </h4>
                  <span className="text-[8px] md:text-[9px] font-mono text-white/30 uppercase tracking-widest italic animate-pulse">
                    STREAMING_ACTIVE
                  </span>
                </div>
                <div
                  ref={sliderRef}
                  className="relative w-full overflow-hidden cursor-pointer py-2"
                >
                  <div className="slider-content flex gap-3 md:gap-4 w-max">
                    {[...screenshots, ...screenshots].map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(src)}
                        className={`relative flex-shrink-0 w-32 md:w-48 aspect-video border transition-all duration-300 overflow-hidden ${activeImage === src ? 'border-white scale-105 z-10' : 'border-white/20 opacity-60 hover:opacity-100'}`}
                      >
                        <img src={src} alt={`Screenshot ${i}`} className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 right-2 text-[8px] md:text-[9px] font-mono text-white/60 tracking-wider">
                          CAM_0{(i % screenshots.length) + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="w-full lg:w-4/12 min-w-0 space-y-8 md:space-y-12">
              
              {/* Tech Stack & Specs Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 animate-stagger">
                <div className="space-y-1 border-l-2 border-white/20 pl-3 md:pl-4">
                  <span className="text-[9px] md:text-[11px] lg:text-xs font-mono text-white/40 tracking-widest uppercase">TYPE</span>
                  <p className="text-xs md:text-base lg:text-lg font-mono tracking-wider uppercase text-white/90">
                    {project.category || 'PROJECT'}
                  </p>
                </div>
                <div className="space-y-1 border-l-2 border-white/20 pl-3 md:pl-4">
                  <span className="text-[9px] md:text-[11px] lg:text-xs font-mono text-white/40 tracking-widest uppercase">YEAR</span>
                  <p className="text-xs md:text-base lg:text-lg font-mono tracking-wider uppercase text-white/90">
                    {project.year || '2026'}
                  </p>
                </div>
                <div className="col-span-2 space-y-2 border-l-2 border-white/20 pl-3 md:pl-4 pt-2">
                  <span className="text-[9px] md:text-[11px] lg:text-xs font-mono text-white/40 tracking-widest uppercase">TECHNOLOGY_STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {(project.tech || ['REACT', 'TAILWIND']).map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/10 border border-white/20 text-[10px] md:text-xs lg:text-sm font-mono tracking-widest uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-col gap-3 md:gap-4 pt-4 md:pt-6 animate-stagger w-full">
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group relative flex w-full items-center justify-between px-4 py-4 md:px-6 md:py-5 bg-white text-black overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    
                    <div className="flex items-center gap-3 md:gap-4 relative z-10">
                      <span className="text-[11px] md:text-sm font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mt-[2px]">
                        LAUNCH_LIVE_DEMO
                      </span>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center">
                      <svg className="w-5 h-5 md:w-7 md:h-7 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </a>
                )}
                
                <a 
                  href={project.repoUrl || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group relative flex w-full items-center justify-between px-4 py-4 md:px-6 md:py-5 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 md:gap-4 relative z-10">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="text-[11px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/60 group-hover:text-white transition-colors mt-[2px]">
                      VIEW_SOURCE_CODE
                    </span>
                  </div>
                  
                  <div className="relative z-10 flex items-center overflow-hidden">
                    <div className="flex -space-x-1">
                      <svg className="w-5 h-5 md:w-7 md:h-7 text-white/20 group-hover:text-white/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <svg className="w-5 h-5 md:w-7 md:h-7 text-white/20 group-hover:text-white transition-colors duration-300 delay-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
