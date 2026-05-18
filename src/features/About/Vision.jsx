import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * Vision Component - Recreated from scratch.
 * Implements a high-fidelity "Precision Noir" aesthetic with massive typography,
 * glassmorphic HUD visual, and surgical precision layout.
 */
export default function Vision() {
  const container = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Entrance animation for content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      }
    });

    tl.fromTo(".vision-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "expo.out"
      }
    )
    .fromTo(".vision-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=1"
    )
    .fromTo(".protocol-node",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      },
      "-=0.8"
    )
    .fromTo(".hud-panel",
      { opacity: 0, scale: 0.9, x: 50 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.5,
        ease: "power4.out"
      },
      "-=1"
    );

    // Continuous rotation for the core visual
    gsap.to(".rotating-core", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Pulse effect for radar rings
    gsap.to(".radar-ring", {
      scale: 1.5,
      opacity: 0,
      duration: 2,
      repeat: -1,
      stagger: 0.5,
      ease: "power1.out"
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative flex items-center bg-black overflow-hidden border-t border-white/5 py-24 lg:py-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Decorative Light Leak */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-center">
          
          {/* Left Side: Typography & Copy (7 cols) */}
          <div className="lg:col-span-7">
            <h2 className="vision-title text-5xl sm:text-6xl md:text-7xl font-display font-black text-white leading-[0.85] tracking-tighter mb-8">
              BEYOND<br />
              THE CODE,<br />
              <span className="text-white/20 italic">I ARCHITECT</span><br />
              DIGITAL FUTURES.
            </h2>
            
            <p className="vision-text text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl mb-12">
              My mission is to transform abstract concepts into high-performance digital machines. I believe that every line of code should contribute to a larger, seamless ecosystem.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="protocol-node">
                <div className="text-xs font-mono text-white/70 mb-2">// PROTOCOL_01</div>
                <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs mb-2">Resilient Systems</h4>
                <p className="text-white/80 text-xs leading-relaxed">Prioritizing security and zero-latency interactions from the very first commit.</p>
              </div>
              <div className="protocol-node">
                <div className="text-xs font-mono text-white/70 mb-2">// PROTOCOL_02</div>
                <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs mb-2">Scalable Growth</h4>
                <p className="text-white/80 text-xs leading-relaxed">Engineering solutions that grow seamlessly with increasing user demand and load.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Complex HUD Visual (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="hud-panel relative w-full max-w-[380px] mx-auto lg:mx-0 aspect-square bg-white/[0.02] border border-white/10 backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden group transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />

              {/* Header Info */}
              <div className="flex justify-between items-center z-10">
                <span className="text-xs font-mono text-white/70 tracking-widest">SYS_DIAGNOSTICS</span>
                <span className="text-xs font-mono text-white/80 border border-white/30 px-2 py-0.5 bg-white/5">ONLINE</span>
              </div>

              {/* Central Radar/Core Visual */}
              <div className="relative flex-1 flex items-center justify-center">
                {/* Radar Rings */}
                <div className="radar-ring absolute w-32 h-32 border border-white/10 rounded-full" />
                <div className="radar-ring absolute w-32 h-32 border border-white/10 rounded-full" style={{ animationDelay: '0.5s' }} />
                <div className="radar-ring absolute w-32 h-32 border border-white/10 rounded-full" style={{ animationDelay: '1s' }} />

                {/* Rotating Core */}
                <div className="rotating-core relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full text-white/10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5, 5" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                  
                  {/* Central Node */}
                  <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
              </div>

              {/* Footer Data */}
              <div className="z-10 grid grid-cols-2 gap-4 text-xs font-mono text-white/70 border-t border-white/10 pt-4">
                <div>
                  <div className="text-white/80 mb-1">LATENCY_INDEX</div>
                  <div>0.0012 MS / REF</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 mb-1">LOAD_CAPACITY</div>
                  <div>98.4% STABLE</div>
                </div>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-10" />
            </div>

            {/* Background Ambience */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[50px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-[50px] -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}

