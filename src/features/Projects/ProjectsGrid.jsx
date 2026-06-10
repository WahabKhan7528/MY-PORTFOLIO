import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const projects = [
  {
    id: "01",
    title: "TBC Campus OS",
    category: "LMS & CMS PLATFORM",
    year: "2026",
    description: "TBC is an enterprise-grade College Management System that digitizes the academic and administrative operations of educational institutions. It features a dual-module architecture with a Learning Management System (LMS) for course delivery, assignments, and student progress tracking, and a Content Management System (CMS) for institutional announcements, notices, and dynamic content.",
    demoUrl: "https://the-best-group-of-colleges.vercel.app/",
    repoUrl: "https://github.com/WahabKhan7528/THE-BEST-GROUP-OF-COLLEGES",
    image: "/project-images/TBC/1.webp",
    screenshots: [
      "/project-images/TBC/1.webp",
      "/project-images/TBC/2.webp",
      "/project-images/TBC/3.webp",
      "/project-images/TBC/4.webp"
    ],
    tech: ["REACT", "GSAP", "EXPRESS", "MONGODB", "TAILWIND", "REDUX","JWT", "NODE", "AXIOS"]
  },
  {
    id: "02",
    title: "CLIENT PORTFOLIO",
    category: "PORTFOLIO WEBSITE",
    year: "2026",
    description: "A personal portfolio website built for Masooma, a UX/UI and brand designer. The site is crafted to reflect her design identity clean, minimal, and visually intentional. Built with React and Vite for a fast, modern frontend experience, styled with Tailwind CSS for a fully responsive layout across all devices, and deployed on Vercel for seamless continuous delivery.",
    demoUrl: "https://masooma-portfolio.vercel.app/",
    repoUrl: "https://github.com/WahabKhan7528/masooma-portfolio",
    image: "/project-images/Momo Portfolio/2.webp",
    screenshots: [
      "/project-images/Momo Portfolio/1.webp",
      "/project-images/Momo Portfolio/2.webp",
      "/project-images/Momo Portfolio/3.webp"
    ],
    tech: ["REACT", "TAILWIND", "GSAP", "VITE", "VERCEL"]
  },
  {
    id: "03",
    title: "CRUX - AI Career Intelligence",
    category: "AI SAAS & DASHBOARD",
    year: "2026",
    description: "A premium, AI-powered career intelligence platform designed to bridge the gap between job seekers and their target roles. It features dynamic dashboard interfaces, automated resume parsing and analysis, and intelligent job matching algorithms. The front-end is heavily focused on delivering a high-end, dynamic user experience with fluid framer-motion layout transitions, responsive segmented controls, custom interactive toggles, and robust session management UI.",
    demoUrl: "https://crux-opal.vercel.app",
    repoUrl: "https://github.com/WahabKhan7528/CRUX",
    image: "/project-images/CRUX/HERO.webp",
    screenshots: [
      "/project-images/CRUX/HERO.webp",
      "/project-images/CRUX/DASHBOARD.webp",
      "/project-images/CRUX/BYOK.webp"
    ],
    tech: ["REACT", "TAILWIND CSS", "FRAMER MOTION", "VITE"]
  },
  {
    id: "04",
    title: "ARABIC KITCHEN",
    category: "Restraunt WEBSITE",
    year: "2026",
    description: "Arabic Kitchen is a single-page web experience built with React and Vite, designed to present a restaurant’s offerings with rich visuals and tactile interactions. The site combines vivid photography, an interactive menu, reservation functionality, and customer testimonials with subtle motion and cultural UI details to create an engaging dining-first impression. Custom components including an Arabic geometric pattern overlay, grain texture, animated hero particles, a custom cursor, and magnetic hover effects add personality while preserving fast load times and responsive behavior across devices.",
    demoUrl: "https://arabic-kitchen.vercel.app/",
    repoUrl: "https://github.com/WahabKhan7528/ARABIC-KITCHEN",
    image: "/project-images/ARABIC-KITCHEN/HOME.png",
    screenshots: [],
    tech: ["REACT", "TAILWIND", "THREEJS", "VITE", "VERCEL"]
  }
];



export default function ProjectsGrid({ onProjectSelect }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".project-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 sm:mb-24 lg:mb-28 gap-8">
          <div className="space-y-4">
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] sm:text-[clamp(2.75rem,4.5vw,5rem)] lg:text-[clamp(3.5rem,4vw,6.5rem)] font-display font-black tracking-tighter leading-[0.92]">
              Featured<br />
              <span className="text-white/30 italic">Projects.</span>
            </h2>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group relative bg-black p-6 sm:p-8 md:p-12 overflow-hidden cursor-pointer"
              onClick={() => onProjectSelect && onProjectSelect(project)}
            >
              {/* Card Hover Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Surgical Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 group-hover:border-white/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 group-hover:border-white/50 transition-colors" />

              <div className="relative z-10 flex flex-col h-full space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-sm font-mono text-white/80 uppercase tracking-widest">ID_{project.id}</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-none group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="aspect-[16/9] overflow-hidden border border-white/5 relative group-hover:border-white/20 transition-colors">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain md:grayscale md:brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                  {/* Scanning Bar */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-0 group-hover:opacity-50 group-hover:translate-y-[200px] transition-all duration-[2000ms] ease-linear pointer-events-none" />
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 flex gap-2 sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 delay-100">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold tracking-widest">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="h-px flex-1 bg-white/10 group-hover:bg-white/30 transition-colors" />
                    <span className="text-sm font-mono text-white/80 group-hover:text-white transition-colors tracking-[0.3em] italic">Open Project</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

