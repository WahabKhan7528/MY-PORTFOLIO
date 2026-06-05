import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const stats = [
  { label: "PROJECTS BUILT", value: "5", suffix: "+", id: "01" },
  { label: "DEPLOYMENTS", value: "5", suffix: "+", id: "02" },
  { label: "EXPERIENCE", value: "2", suffix: "Years +", id: "03" }
];

export default function Stats() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".stat-header > *",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );

    gsap.fromTo(".stat-box",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        }
      }
    );
  }, { scope: container });


  return (
    <section ref={container} className="stats-container flex items-center bg-black border-y border-white/10 relative overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="stat-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-20 border-l-2 border-white/20 pl-6 md:pl-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tighter mb-4">Fresher Highlights</h2>
            <p className="text-xs sm:text-sm md:text-base font-mono text-white/70 tracking-[0.3em]">Portfolio numbers that better reflect a junior developer profile</p>
          </div>
          <div className="mt-8 md:mt-0 text-left md:text-right flex flex-col md:items-end">
            <div className="w-12 h-px bg-white/20 mb-4" />
            <p className="text-xs sm:text-sm md:text-base font-mono text-white/80 tracking-[0.2em] max-w-[320px] leading-relaxed">
              I combine solid engineering with clean design to build reliable web products.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-white/10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-box group p-8 sm:p-10 md:p-10 lg:p-14 flex flex-col items-start justify-between relative transition-all duration-500 hover:bg-white/[0.04] overflow-hidden ${index < stats.length - 1 ? 'md:border-r border-white/10' : ''
                } ${index % 2 === 0 && index !== stats.length - 1 ? 'sm:border-r border-white/10' : ''
                } border-b border-white/10 md:border-b-0 last:border-b-0`}
            >
              {/* Scanning line effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-y-full group-hover:animate-scan pointer-events-none" />

              {/* Card Background Patterns */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/10" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-white/10" />
              </div>

              {/* ID */}
              <div className="mb-10">
                <span className="text-sm font-mono text-white/60 tracking-widest group-hover:text-white/80 transition-colors duration-300">
                  [{stat.id}]
                </span>
              </div>

              <div className="flex items-baseline gap-1 relative">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tighter group-hover:text-white transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  {stat.value}
                </span>
                <span className="text-lg md:text-xl font-display font-bold text-white/40 group-hover:text-white/70 transition-colors">
                  {stat.suffix}
                </span>
              </div>

              <div className="mt-10 w-full flex justify-between items-end">
                <div className="text-xs sm:text-sm md:text-base text-white/70 font-mono tracking-[0.4em] uppercase group-hover:text-white transition-all duration-300">
                  {stat.label}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs sm:text-[13px] md:text-sm font-mono text-white/70 tracking-tighter animate-pulse">
                  VERIFIED
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/50 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/50 transition-colors" />

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

