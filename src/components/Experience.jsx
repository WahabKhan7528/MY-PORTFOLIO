import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const experiences = [
  {
    year: "2024 - PRESENT",
    role: "Senior Full-Stack Engineer",
    company: "Freelance / Independent",
    desc: "Architecting high-scale MERN applications for global clients. Implementing advanced GSAP animations and real-time data streaming."
  },
  {
    year: "2023 - 2024",
    role: "MERN Stack Developer",
    company: "TechNexus Solutions",
    desc: "Led the development of a collaborative SaaS platform. Optimized database queries and improved frontend performance by 40%."
  },
  {
    year: "2022 - 2023",
    role: "Junior Web Developer",
    company: "Digital Arts Agency",
    desc: "Focused on building responsive UI components and integrating REST APIs. Mastered React.js and modern CSS frameworks."
  }
];

export default function Experience() {
  const container = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".exp-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(".timeline-progress",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );

    gsap.to(".timeline-scanner",
      {
        y: () => timelineRef.current ? timelineRef.current.offsetHeight : 0,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onUpdate: (self) => {
            const percent = Math.round(self.progress * 100);
            const label = document.querySelector(".scanner-percent");
            if (label) label.innerText = `POS_TRK_${percent.toString().padStart(3, '0')}%`;
          }
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative py-16 sm:py-24 md:py-32 lg:py-48 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-xs font-mono tracking-[0.6em] text-white/80 uppercase">
              CHRONOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter">
            PROFESSIONAL<br />
            <span className="text-white/20">LOGS.</span>
          </h2>
        </div>
 
        <div ref={timelineRef} className="relative timeline-container">
          {/* Vertical Line Track */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          
          {/* Glowing Progress Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white origin-top shadow-[0_0_15px_rgba(255,255,255,0.5)] timeline-progress hidden md:block scale-y-0" />

          {/* Scrolling Technical Node */}
          <div className="absolute left-0 md:left-1/2 w-6 h-6 border border-white/40 bg-black -translate-x-3 z-30 hidden md:flex items-center justify-center timeline-scanner top-0">
             <div className="w-1 h-1 bg-white animate-pulse shadow-[0_0_8px_white]" />
             {/* Technical Label for Scanner */}
             <div className="absolute left-8 whitespace-nowrap text-[10px] font-mono text-white/70 uppercase tracking-[0.4em] scanner-percent">
                POS_TRK_000%
             </div>
          </div>

          <div className="space-y-12 md:space-y-48 pt-12">
            {experiences.map((exp, i) => (
              <div 
                key={i} 
                className={`exp-card relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Fixed Node Point */}
                <div className="absolute left-0 md:left-1/2 top-12 w-2 h-2 bg-white/20 -translate-x-1 z-10 hidden md:block" />

                <div className="w-full md:w-5/12 group relative">
                   {/* Card Container */}
                   <div className={`relative p-8 md:p-12 border border-white/5 bg-white/[0.01] backdrop-blur-xl transition-all duration-700 hover:bg-white/[0.04] hover:border-white/40 overflow-hidden ${
                     i % 2 === 0 ? "text-left" : "text-left md:text-right"
                   }`}>
                      {/* Scanline Effect */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity pointer-events-none" />

                      {/* Top Header Log Style */}
                      <div className={`flex items-center gap-4 mb-10 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                         <span className="text-[11px] font-mono text-white/60 uppercase tracking-[0.3em]">LOG_{i + 1}</span>
                         <div className="flex-1 h-px bg-white/5" />
                         <span className="text-[11px] font-mono text-white/80 uppercase tracking-widest">{exp.year}</span>
                      </div>

                      {/* Main Info */}
                      <div className="space-y-8 relative z-10">
                        <div className="space-y-3">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tighter leading-[0.8] hover-glitch">
                            {exp.role.toUpperCase()}
                          </h3>
                          <div className={`flex items-center gap-2 ${i % 2 === 0 ? "" : "md:justify-end"}`}>
                             <div className="w-1.5 h-1.5 bg-white/40" />
                             <span className="text-xs sm:text-sm md:text-base font-mono text-white/70 uppercase tracking-widest">{exp.company}</span>
                          </div>
                        </div>

                        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-500 max-w-lg">
                          {exp.desc}
                        </p>
                      </div>

                      {/* Technical Specs Footer */}
                      <div className={`mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-8 ${i % 2 === 0 ? "" : "text-right"}`}>
                         <div>
                            <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em] mb-2">AUTH_STATUS</div>
                            <div className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-mono text-white/80 uppercase">VERIFIED_LOG_ENTRY</div>
                         </div>
                         <div className={`flex flex-col ${i % 2 === 0 ? "items-start" : "items-end"}`}>
                            <div className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-mono text-white/40 uppercase tracking-[0.4em] mb-2">SYSTEM_PRIORITY</div>
                            <div className="flex gap-1">
                               {[...Array(5)].map((_, idx) => (
                                 <div key={idx} className={`w-2 h-2 border border-white/20 ${idx < 4 ? 'bg-white/40' : 'bg-transparent'}`} />
                               ))}
                            </div>
                         </div>
                      </div>

                      {/* Interactive Corner Accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none group-hover:scale-110 transition-transform">
                        <div className="absolute top-0 left-0 w-[2px] h-4 bg-white/20 group-hover:bg-white/60 transition-all duration-500" />
                        <div className="absolute top-0 left-0 w-4 h-[2px] bg-white/20 group-hover:bg-white/60 transition-all duration-500" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none rotate-180 group-hover:scale-110 transition-transform">
                        <div className="absolute top-0 left-0 w-[2px] h-4 bg-white/20 group-hover:bg-white/60 transition-all duration-500" />
                        <div className="absolute top-0 left-0 w-4 h-[2px] bg-white/20 group-hover:bg-white/60 transition-all duration-500" />
                      </div>
                   </div>
                </div>
                
                <div className="md:w-2/12" /> {/* Spacer */}
                <div className="md:w-5/12 hidden md:block" /> {/* Empty half */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
