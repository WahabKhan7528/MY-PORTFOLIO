import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your goals and users to plan the right solution.",
    details: ["User Flows", "Requirements", "Plan"]
  },
  {
    number: "02",
    title: "Architecture",
    description: "We design a clear, scalable system and data model.",
    details: ["Database", "APIs", "Design"]
  },
  {
    number: "03",
    title: "Build",
    description: "We write reliable code and assemble the product.",
    details: ["Development", "State", "Security"]
  },
  {
    number: "04",
    title: "Launch",
    description: "We test, optimize, and deploy so the product runs well.",
    details: ["Testing", "CI/CD", "Deploy"]
  }
];

export default function Process() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".process-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 85%",
          once: true
        }
      }
    );

    gsap.fromTo(".process-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          once: true
        }
      }
    );
  }, { scope: container });


  return (
    <section ref={container} className="flex items-center relative overflow-hidden bg-black py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.01] -skew-x-12 transform origin-top translate-x-20" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-12">
        <div className="process-header mb-16 sm:mb-20 lg:mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-[10px] font-mono tracking-[0.6em] text-white/50 uppercase">Method</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-white">
            How I Work<br />
            <span className="text-white/30">Process</span>
          </h2>
        </div>

        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6 md:px-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-card group relative p-8 sm:p-10 bg-white/[0.01] backdrop-blur-sm border border-white/5 transition-all duration-700 hover:bg-white/[0.04] hover:border-white/40 overflow-hidden"
            >
              {/* Scanline Effect (Only on hover) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity pointer-events-none" />

              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-none tracking-tighter">{step.number}</span>
              </div>

              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-xs font-mono text-white/40 group-hover:text-white group-hover:border-white/40 transition-all duration-500 relative">
                    {step.number}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-right opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <div className="text-[7px] font-mono text-white/30 uppercase tracking-[0.4em]">PHASE_STABILITY</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-0.5 bg-white/40" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-xl font-display font-black text-white tracking-tighter leading-none group-hover:translate-x-1 transition-transform duration-500 hover-glitch">
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-500">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-3 pt-8 border-t border-white/5">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 group/detail">
                      <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-mono text-white/20 group-hover/detail:text-white/60 transition-colors font-bold">[{idx + 1}]</span>
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-mono text-white/30 uppercase tracking-widest group-hover/detail:text-white/60 transition-colors">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-px h-2 bg-white/10 group-hover:bg-white/40 transition-all duration-500" />
                <div className="absolute top-0 left-0 w-2 h-px bg-white/10 group-hover:bg-white/40 transition-all duration-500" />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none rotate-180">
                <div className="absolute top-0 left-0 w-px h-2 bg-white/10 group-hover:bg-white/40 transition-all duration-500" />
                <div className="absolute top-0 left-0 w-2 h-px bg-white/10 group-hover:bg-white/40 transition-all duration-500" />
              </div>

              {/* Interaction Decorator */}
              <div className="absolute bottom-4 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                  <span className="text-[6px] font-mono text-white/20 tracking-[0.4em] uppercase">SYSTEM_READY</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
