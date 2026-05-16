import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const projects = [
  {
    id: 1,
    title: "TBC System",
    category: "LMS Platform",
    year: "2025",
    description: "An educational web platform built for stability and scale.",
    demoUrl: "https://the-best-group-of-colleges.vercel.app/",
    image: "/project-images/TBC/1.webp",
  },
  {
    id: 2,
    title: "Noir Interface",
    category: "UI System",
    year: "2026",
    description: "A refined UI system for high-end web experiences.",
    demoUrl: "#",
    repoUrl: "https://github.com/WahabKhan7528",
    image: "/project-images/Momo Portfolio/2.webp",
  },
  {
    id: 3,
    title: "WOXO Module",
    category: "Content Hub",
    year: "2023",
    description: "A content management and distribution system.",
    demoUrl: "#",
    repoUrl: "https://github.com/WahabKhan7528",
    image: "/project-images/woxo-blogs-1.png",
  },
];

export default function Projects({ onProjectSelect, isHero = false }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".project-slide");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${slides.length * 100}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide, index) => {
        const card = slide.querySelector(".project-card");
        const content = slide.querySelector(".project-content");
        const image = slide.querySelector(".project-card img");

        // Turn image to color
        tl.to(image, {
          filter: "none",
          duration: 0.5,
          ease: "power1.out",
        });

        // Content fades out quickly
        tl.to(content, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power1.out",
        })
        // Card zooms in and slide fades out
        .to(card, {
          scale: 2.5,
          duration: 1,
          ease: "power2.inOut",
        }, "<")
        .to(slide, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        }, "<");
        
        // Add a small spacer in the timeline between slides
        if (index < slides.length - 1) {
          tl.to({}, { duration: 0.2 });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`relative w-full h-screen bg-black text-white overflow-hidden ${isHero ? 'hero-section' : 'full-section'}`}
    >
      {/* Section Badge */}
      <div className="absolute top-12 left-6 md:left-24 z-20 flex items-center gap-4">
        <div className="h-px w-8 bg-white/40" />
        <span className="text-xs font-mono tracking-[0.6em] text-white/50 uppercase">Selected Works</span>
      </div>

      <div className="relative w-full h-full">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-slide absolute inset-0 flex items-center justify-center p-6 sm:p-10 md:p-20 lg:p-24 bg-black"
            style={{ zIndex: (projects.length - index) * 10 }}
          >
            {/* Grid Overlay inside each slide */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            {/* Large Background Number */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-[25rem] font-display font-black text-white/[0.03] pointer-events-none hidden lg:block">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center w-full max-w-7xl relative z-10">
              
              {/* Project Visual (Takes 7 columns) */}
              <div className="project-card lg:col-span-7 relative group/visual flex justify-center lg:justify-end order-1 lg:order-1">
                <div className="relative z-10 border border-white/10 p-3 bg-white/5 backdrop-blur-sm overflow-hidden aspect-video w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center grayscale contrast-125 brightness-50"
                  />

                  {/* Technical Overlays */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-4 h-[1px] bg-white/40" />
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs font-mono text-white/40 uppercase tracking-widest">
                    ID_{project.id}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Decorative Frame */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-white/10 -z-10" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-white/10 -z-10" />
              </div>

              {/* Project Info (Takes 5 columns) */}
              <div className="project-content lg:col-span-5 space-y-8 order-2 lg:order-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono tracking-[0.5em] text-white/70 uppercase">
                      Project {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px w-12 bg-white/40" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-none tracking-tighter">
                    {project.title}
                  </h2>
                </div>

                {/* Metadata Table */}
                <div className="border-t border-b border-white/10 py-6 space-y-3">
                  <div className="grid grid-cols-2 text-xs font-mono">
                    <span className="text-white/40 uppercase tracking-wider">Category</span>
                    <span className="text-white/90">{project.category}</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs font-mono">
                    <span className="text-white/40 uppercase tracking-wider">Timeline</span>
                    <span className="text-white/90">{project.year}</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs font-mono">
                    <span className="text-white/40 uppercase tracking-wider">Status</span>
                    <span className="text-white/90">Production Ready</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md">
                  {project.description}
                </p>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => onProjectSelect(project)}
                    className="group relative px-8 py-4 bg-gray-200 text-black overflow-hidden transition-all duration-300 hover:bg-white hover:scale-105"
                  >
                    <span className="relative z-10 text-xs tracking-[0.3em] uppercase font-bold italic">Open Project</span>
                    <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
