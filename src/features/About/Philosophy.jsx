import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const philosophies = [
  {
    id: "01",
    title: "PRECISION",
    tagline: "SURGICAL_EXECUTION",
    desc: "Every pixel and every function must serve a purpose. There is no room for digital clutter or redundant processes. We build for absolute efficiency.",
    metrics: ["EFFICIENCY: 99.9%", "LATENCY: <10ms", "OVERHEAD: 0.0%"],
    icon: "▣"
  },
  {
    id: "02",
    title: "RESILIENCE",
    tagline: "FAULT_TOLERANCE",
    desc: "Systems must be built to withstand extreme load, handle errors gracefully, and scale infinitely. Failure is not an option; it is a parameter to be managed.",
    metrics: ["UPTIME: 100%", "SCALABILITY: INF", "REDUNDANCY: 3X"],
    icon: "◰"
  },
  {
    id: "03",
    title: "AESTHETICS",
    tagline: "VISUAL_DOMINANCE",
    desc: "Form follows function, but the form itself must inspire and command attention. A beautiful system is a respected system. Design is a technical requirement.",
    metrics: ["IMPACT: MAX", "COHESION: 1.0", "FIDELITY: HIGH"],
    icon: "◈"
  }
];

export default function Philosophy() {
  const container = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Background scanline animation
      gsap.to(".scanline", {
        y: () => window.innerHeight,
        duration: 4,
        ease: "none",
        repeat: -1
      });

      // Staggered reveal of philosophy modules
      gsap.fromTo(".philosophy-module",
        { opacity: 0, y: 50, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );

      // Header reveal
      gsap.fromTo(".phi-header",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative py-24 md:py-32 flex items-center bg-black overflow-hidden border-t border-white/5"
    >
      {/* Technical Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Scanline */}
      <div className="scanline absolute top-0 left-0 w-full h-[2px] bg-white/10 blur-sm pointer-events-none z-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8 phi-header">
          <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tighter leading-none mb-4">
              ARCHITECTURAL <br />
              <span className="text-white/20 italic">PRINCIPLES.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {philosophies.map((phi, i) => (
            <div
              key={i}
              className="philosophy-module group relative bg-white/[0.02] border border-white/10 p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/30"
            >
              {/* Module Header */}
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-white/60 mb-1">{phi.id}</span>
                  <span className="text-3xl font-mono text-white/20 group-hover:text-white/40 transition-colors">{phi.icon}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-white/70 uppercase tracking-widest mb-1">MODULE_TAG</div>
                  <div className="text-xs font-mono text-white/80 uppercase tracking-tighter bg-white/5 px-2 py-0.5">
                    {phi.tagline}
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <h3 className="text-3xl font-display font-black text-white mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                {phi.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-10 text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-gray-200 transition-colors">
                {phi.desc}
              </p>

              {/* Technical Metrics */}
              <div className="space-y-3 pt-8 border-t border-white/5">
                {phi.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center group/metric">
                    <span className="text-xs font-mono text-white/60 group-hover/metric:text-white/80 transition-colors">
                      {metric.split(':')[0]}
                    </span>
                    <div className="flex-1 mx-4 h-[1px] bg-white/5 group-hover/metric:bg-white/10 transition-colors" />
                    <span className="text-xs font-mono text-white/80 group-hover/metric:text-white/90 transition-colors">
                      {metric.split(':')[1]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/60 transition-colors" />

              {/* Interaction Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-4 right-4 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

