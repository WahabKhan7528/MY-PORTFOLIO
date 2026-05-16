import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

export default function Vision() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".vision-content",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(".vision-image",
      { opacity: 0, scale: 1.1, x: 50 },
      {
        opacity: 0.6,
        scale: 1,
        x: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(".tech-data-point",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative flex items-center bg-black overflow-hidden border-t border-white/5 py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          <div className="vision-content">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-white/40" />
              <span className="text-[10px] font-mono tracking-[0.6em] text-white/50 uppercase">
                STRATEGIC_VISION_v2.0
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white leading-none mb-12 tracking-tighter">
              BEYOND THE CODE, <br />
              <span className="text-white/20 italic">I ARCHITECT</span> <br />
              <span className="text-white/40">DIGITAL FUTURES.</span>
            </h2>
            
            <div className="space-y-8 max-w-xl">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light leading-tight tracking-tight">
                My mission is to transform abstract concepts into high-performance digital machines. I believe that every line of code should contribute to a larger, seamless ecosystem.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="tech-data-point">
                  <div className="text-[10px] font-mono text-white/30 mb-2">PROTOCOL_01</div>
                  <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm mb-2">Resilient Systems</h4>
                  <p className="text-gray-500 text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-relaxed">Prioritizing security and zero-latency interactions from the very first commit.</p>
                </div>
                <div className="tech-data-point">
                  <div className="text-[10px] font-mono text-white/30 mb-2">PROTOCOL_02</div>
                  <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm mb-2">Scalable Growth</h4>
                  <p className="text-gray-500 text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-relaxed">Engineering solutions that grow seamlessly with increasing user demand and load.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="vision-image relative lg:h-full flex items-center justify-center">
            <div className="relative w-full aspect-square lg:aspect-[4/5] border border-white/10 bg-white/[0.02] overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.02)]">
              <img 
                src="/vision-blueprint.png" 
                alt="System Architecture Blueprint" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 ease-out"
              />
              
              {/* Technical Overlay Layers */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/40 pointer-events-none" />
              
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="h-8 w-8 border-t border-l border-white/40" />
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-mono text-white/40 tracking-tighter">REF_ID: 0x7F2A</div>
                  </div>
                  <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-mono text-cyan-400/60 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm">
                    ARCHITECTURE_STABLE
                  </div>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-12 bg-cyan-500/40" />
                      <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Sub_Systems</span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`h-1 ${i < 4 ? 'bg-cyan-500/30' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-mono text-white/30 uppercase">Telemetry_Output</div>
                      <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-mono text-white/50 bg-black/40 px-2 py-1 border border-white/5">
                        L: 12ms | U: 99.98%
                      </div>
                    </div>
                    <div className="h-8 w-8 border-b border-r border-white/40" />
                  </div>
                </div>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-20 w-full animate-scanline pointer-events-none" />
            </div>
            
            {/* Background Ambience */}
            <div className="absolute -top-20 -right-20 w-60 sm:w-72 lg:w-80 h-60 sm:h-72 lg:h-80 bg-cyan-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-60 sm:w-72 lg:w-80 h-60 sm:h-72 lg:h-80 bg-white/5 rounded-full blur-[120px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}


