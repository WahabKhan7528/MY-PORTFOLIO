import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Learn your goals and users to plan the right solution.",
  },
  {
    number: "02",
    title: "Architecture",
    description: "Design a clear, scalable system and data model.",
  },
  {
    number: "03",
    title: "Build",
    description: "Write reliable code and assemble the product.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Test, optimize, and deploy so the product runs well.",
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
          end: "top 50%",
          scrub: 1,
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
          end: "top 40%",
          scrub: 1,
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-white">
            How I Work<br />
            <span className="text-white/30">Process</span>
          </h2>
        </div>

        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-0">
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
                </div>

                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-xl font-display font-black text-white tracking-tighter leading-none group-hover:translate-x-1 transition-transform duration-500 hover-glitch">
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed font-light group-hover:text-white transition-colors duration-500">
                    {step.description}
                  </p>
                </div>

                {/* details removed */}
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

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

