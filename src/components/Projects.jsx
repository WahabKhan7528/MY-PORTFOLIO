import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const projects = [
  {
    id: 1,
    title: "The Best College Website",
    category: "Web App",
    year: "2025",
    description: "Interactive portal with custom LMS and dynamic CMS.",
    demoUrl: "https://the-best-group-of-colleges.vercel.app/",
    image: "/project-images/TBC/1.webp",
  },
  {
    id: 2,
    title: "Premium Client Portfolio",
    category: "Front End",
    year: "2026",
    description: "Sophisticated aesthetics and high performance.",
    demoUrl: "#",
    repoUrl: "https://github.com/WahabKhan7528",
    image: "/project-images/Momo Portfolio/2.webp",
  },
  {
    id: 3,
    title: "WOXO BLOGS",
    category: "Front End",
    year: "2023",
    description: "Modern, responsive platform focused on clean UI.",
    demoUrl: "#",
    repoUrl: "https://github.com/WahabKhan7528",
    image: "/project-images/woxo-blogs-1.png",
  },
];

const cornerStyles = [
  "top-24 left-10 md:left-20 text-left items-start", // Top Left
  "top-24 right-10 md:right-20 text-right items-end", // Top Right
  "bottom-24 left-10 md:left-20 text-left items-start", // Bottom Left
  "bottom-24 right-10 md:right-20 text-right items-end", // Bottom Right
];

export default function Projects({ onProjectSelect }) {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(
    () => {
      if (window.innerWidth < 768) return;

      const panels = gsap.utils.toArray(".project-slide");

      // MOTION: Horizontal Pinning (Right to Left move)
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 2,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: "power2.inOut",
          },
          end: () =>
            `+=${containerRef.current.offsetWidth * (panels.length - 1)}`,
          invalidateOnRefresh: true,
        },
      });

      // MOTION: Staggered reveal for captions
      panels.forEach((panel) => {
        const info = panel.querySelector(".project-info-inner");
        if (!info) return;

        gsap.fromTo(
          info.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-screen md:h-screen overflow-visible md:overflow-hidden bg-black text-white z-60"
    >
      <div
        ref={horizontalRef}
        className="flex flex-col md:flex-row min-h-screen md:h-full w-full md:w-fit relative z-10"
      >
        {projects.map((project, index) => {
          return (
            <div
              key={project.id}
              className="project-slide w-full md:w-screen min-h-[82vh] md:h-full relative flex items-center justify-center overflow-hidden"
            >
              {/* Full Bleed Background Image */}
              <div className="absolute inset-0 z-0 bg-black">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    width={1600}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain object-center p-4 md:p-8 brightness-[0.95] transition-transform duration-[2s]"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
              </div>

              {/* Project Numbering (Top Right) */}
              <div className="absolute top-20 right-4 sm:top-24 sm:right-8 md:top-36 md:right-12 z-20 flex flex-col items-center justify-center min-w-16 h-16 sm:min-w-20 sm:h-20 md:min-w-25 md:h-25 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                <span className="text-2xl sm:text-3xl md:text-[44px] font-display font-black leading-none text-white select-none tracking-tighter">
                  0{index + 1}
                </span>
                <div className="h-px w-8 bg-white/40 mt-1" />
              </div>

              {/* Project Action (Bottom Left) */}
              <div className="absolute bottom-8 left-4 sm:bottom-12 sm:left-6 md:bottom-24 md:left-20 z-20">
                <div className="project-info-inner">
                  <button
                    onClick={() => onProjectSelect(project)}
                    className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-bold text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
                  >
                    Explore Work
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
