import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function ProjectsCTA() {
  const container = useRef(null);

  useGSAP(() => {
    // Radar Animation
    gsap.to(".radar-line", {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    gsap.fromTo(".radar-ping",
      { scale: 0, opacity: 1 },
      { scale: 2, opacity: 0, duration: 2, repeat: -1, ease: "power1.out", stagger: 0.8 }
    );

    gsap.fromTo(".cta-text-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
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
    <section ref={container} className="bg-black py-24 sm:py-32 md:py-48 lg:py-60 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-center relative overflow-hidden border-t border-white/5">
      {/* Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="relative w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] border border-white/20 rounded-full flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full" />
          <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full" />

          {/* Radar Line */}
          <div className="radar-line absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-t from-transparent to-white/40 origin-bottom" />

          {/* Pings */}
          <div className="radar-ping absolute w-4 h-4 bg-white rounded-full blur-sm" style={{ top: '20%', left: '30%' }} />
          <div className="radar-ping absolute w-4 h-4 bg-white rounded-full blur-sm" style={{ top: '60%', left: '70%' }} />
          <div className="radar-ping absolute w-4 h-4 bg-white rounded-full blur-sm" style={{ top: '40%', left: '80%' }} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">

          {/* Left: Collaboration Info */}
          <div className="space-y-12 order-2 lg:order-1">
            <div className="cta-text-reveal space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-white/60" />
                <span className="text-[12px] font-mono tracking-[0.5em] text-white/90 uppercase">Inquiry</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] font-mono text-white/50 tracking-widest mb-1">Availability</p>
                  <p className="text-sm font-mono text-white tracking-wider">Open for new projects</p>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-white/50 tracking-widest mb-1">Location</p>
                  <p className="text-sm font-mono text-white tracking-wider">Remote</p>
                </div>
              </div>
            </div>


            <div className="cta-text-reveal group relative p-8 bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">
              {/* Card Scanline */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[4000ms] ease-linear" />

              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full blur-[2px] animate-ping" />
                    </div>
                    <span className="text-[12px] font-mono tracking-[0.3em] text-white uppercase font-bold">Ready to collaborate</span>
                  </div>
                  <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest">v3.0.1</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-light text-white/70 leading-relaxed tracking-wide">
                    I'm open to new projects. If you need a reliable, well‑designed web product, let's talk.
                  </p>


                  {/* Inquiry Process */}
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    {[
                      { label: "Response Time", value: "Under 24 hours" },
                      { label: "Services", value: "Full-Stack, UI/UX" },
                      { label: "Expertise", value: "High Performance" }
                    ].map((log, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] font-mono tracking-widest">
                        <span className="text-white/30">{log.label}</span>
                        <div className="flex-1 mx-4 h-[px] border-b border-dashed border-white/5" />
                        <span className="text-white/80">{log.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Bar Simulation */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px] font-mono text-white/20 tracking-[0.3em]">
                    <span>Contact Active</span>
                    <span>Ready</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                    <div className="h-full w-full bg-white/20 group-hover:bg-green-500/50 transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Surgical Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
            </div>

          </div>

          {/* Right: Main CTA */}
          <div className="space-y-10 order-1 lg:order-2 lg:text-right">
            <h2 className="cta-text-reveal text-6xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85]">
              Build<br />
              <span className="text-white/20 italic">Something</span>
            </h2>

            <div className="cta-text-reveal flex flex-col lg:items-end gap-8">
              <p className="text-gray-400 font-light text-sm md:text-lg max-w-md lg:ml-auto leading-relaxed text-white/60">
                Execute the next phase of your digital strategy. Let's discuss how we can elevate your project with a precision-engineered web experience.
              </p>


              <Link
                to="/contact"
                className="group relative w-full sm:w-fit px-8 sm:px-12 py-6 sm:py-8 min-h-[44px] bg-white text-black overflow-hidden transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-4"
              >
                <span className="relative z-10 text-xs tracking-[0.6em] font-bold">Get in Touch</span>
                <span className="relative z-10 text-lg">→</span>
                {/* Button Scanline */}
                <div className="absolute inset-0 bg-gray-200 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-black/10 group-hover:bg-black/30 transition-colors" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

