import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const experiences = [
  {
    year: "April 2025 – Present",
    role: "Freelance Developer",
    company: "Self-Employed",
    desc: "• Developing personal projects and expanding technical expertise.\n• Delivered freelance projects for clients, including a professional portfolio and a college management system."
  },
  {
    year: "December 2024 – April 2025",
    role: "Front-End Intern",
    company: "Enigmatix",
    desc: "• Built front-end UI components using React.js, Bootstrap, and Tailwind CSS as part of real-world development workflows.\n• Attended technical sessions with senior developers, learning industry best practices and coding standards."
  }
];

export default function Experience() {
  const container = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".exp-card").forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          }
        }
      );
    });

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
            if (label) label.innerText = `${percent.toString().padStart(3, '0')}%`;
          }
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative py-16 sm:py-24 md:py-32 lg:py-48 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter">
            PROFESSIONAL<br />
            <span className="text-white/20">LOGS.</span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative timeline-container">
          {/* Vertical Line Track */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-white/5 hidden lg:block" />

          {/* Glowing Progress Line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-white origin-top shadow-[0_0_15px_rgba(255,255,255,0.5)] timeline-progress hidden lg:block scale-y-0" />

          {/* Scrolling Technical Node */}
          <div className="absolute left-0 lg:left-1/2 w-6 h-6 border border-white/40 bg-black -translate-x-3 z-30 hidden lg:flex items-center justify-center timeline-scanner top-0">
            <div className="w-1 h-1 bg-white animate-pulse shadow-[0_0_8px_white]" />
            {/* Technical Label for Scanner */}
            <div className="absolute left-8 whitespace-nowrap text-xs font-mono text-white/80 uppercase tracking-[0.4em] scanner-percent">
              000%
            </div>
          </div>

          <div className="space-y-12 md:space-y-48 pt-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`exp-card relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Fixed Node Point */}
                <div className="absolute left-0 lg:left-1/2 top-12 w-2 h-2 bg-white/20 -translate-x-1 z-10 hidden lg:block" />

                <div className="w-full lg:w-5/12 group relative">
                  {/* Card Container */}
                  <div className={`relative p-8 md:p-12 border border-white/5 bg-white/[0.01] backdrop-blur-xl transition-all duration-700 hover:bg-white/[0.04] hover:border-white/40 overflow-hidden ${i % 2 === 0 ? "text-left" : "text-left md:text-right"
                    }`}>
                    {/* Scanline Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity pointer-events-none" />

                    {/* Top Header Log Style */}
                    <div className={`flex items-center gap-4 mb-10 ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
                      <span className="text-xs font-mono text-white/70 uppercase tracking-[0.3em]">LOG_{i + 1}</span>
                      <div className="flex-1 h-px bg-white/5" />
                      <span className="text-xs font-mono text-white/90 uppercase tracking-widest">{exp.year}</span>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-8 relative z-10">
                      <div className="space-y-3">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tighter leading-[0.8] hover-glitch">
                          {exp.role.toUpperCase()}
                        </h3>
                        <div className={`flex items-center gap-2 ${i % 2 === 0 ? "" : "lg:justify-end"}`}>
                          <div className="w-1.5 h-1.5 bg-white/40" />
                          <span className="text-xs sm:text-sm md:text-base font-mono text-white/70 uppercase tracking-widest">{exp.company}</span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-500 max-w-lg whitespace-pre-line">
                        {exp.desc}
                      </p>
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

                <div className="lg:w-2/12" /> {/* Spacer */}
                <div className="lg:w-5/12 hidden lg:block" /> {/* Empty half */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

