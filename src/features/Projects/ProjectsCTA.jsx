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
        <div className="flex flex-col items-center justify-center text-center">

          {/* Main CTA */}
          <div className="space-y-10 flex flex-col items-center z-10 relative">
            <h2 className="cta-text-reveal text-7xl sm:text-8xl md:text-9xl font-display font-black tracking-tighter uppercase leading-[0.85]">
              Build<br />
              <span className="text-white/20 italic">Something</span>
            </h2>

            <div className="cta-text-reveal flex flex-col items-center gap-8">
              <p className="text-gray-400 font-light text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-white/60">
                Execute the next phase of your digital strategy. Let's discuss how we can elevate your project with a precision-engineered web experience.
              </p>


              <Link
                to="/contact"
                className="group relative w-full sm:w-fit px-8 sm:px-12 py-6 sm:py-8 min-h-[44px] bg-white text-black overflow-hidden transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-4"
              >
                <span className="relative z-10 text-lg sm:text-xl md:text-2xl tracking-[0.6em] font-bold">Get in Touch</span>
                <span className="relative z-10 text-3xl sm:text-4xl md:text-5xl">→</span>
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

