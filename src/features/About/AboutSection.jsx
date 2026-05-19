import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function AboutSection() {
  const container = useRef(null);
  const infoRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // MOTION: Staggered entrance for info elements
    gsap.fromTo(
      ".info-stagger",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      },
    );


  }, { scope: container });


  return (
    <section
      id="about"
      ref={container}
      className="relative flex items-center overflow-hidden bg-black text-white px-6 md:px-12 py-24"
    >
      {/* Background technical grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-start">

          {/* Left Side: Identity & Bio */}
          <div className="lg:w-1/2 space-y-16">
            <div className="space-y-6 info-stagger">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[0.92] tracking-tighter">
                Solving<br />
                <span className="text-white/30 italic">Complex Problems.</span>
              </h2>
            </div>

            <div className="space-y-10 info-stagger">
              <div className="relative border-l border-white/20 pl-10">
                {/* Accent corner */}
                <div className="absolute top-0 left-0 w-4 h-[1px] bg-white/40" />
                <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-white/40" />

                <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl italic">
                  "I turn complex ideas into fast, reliable web systems."
                </p>
              </div>

                <div className="bg-white/[0.02] border border-white/5 p-5 sm:p-8 font-mono text-sm leading-relaxed text-gray-400 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                <div className="text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">// BIO_TERMINAL</div>
                <p>
                  I focus on full-stack solutions using the MERN stack. My work aims for clear, scalable, and reliable code.
                </p>
                <div className="mt-6 flex gap-4 text-xs font-mono text-white/50">
                  <span>29.3978 Latitude, 71.6752 longitude</span>
                  <span>/</span>
                  <span>STATUS: ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 info-stagger pt-4">
              <div className="group relative">
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black mb-2 transition-transform duration-500">2+</div>
                <div className="text-xs font-mono text-white/70 uppercase tracking-[0.3em]">Years Experience</div>
                <div className="absolute -left-4 top-0 w-0.5 h-full bg-white/10 group-hover:bg-white/40 transition-colors" />
              </div>
              <div className="group relative">
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black mb-2 transition-transform duration-500">40+</div>
                <div className="text-xs font-mono text-white/70 uppercase tracking-[0.3em]">Systems Built</div>
                <div className="absolute -left-4 top-0 w-0.5 h-full bg-white/10 group-hover:bg-white/40 transition-colors" />
              </div>
            </div>
          </div>

          {/* Right Side: Visual Architecture */}
          <div className="lg:w-1/2 relative group">
            {/* Main Image Container */}
            <div className="relative z-10 border border-white/10 p-5 bg-white/5 backdrop-blur-sm transition-all duration-700 group-hover:border-white/30">
              <div className="overflow-hidden relative">
                <img
                  src="/images/profile.jpeg"
                  alt="The Architect"
                  className="w-full max-h-[350px] sm:max-h-[450px] md:max-h-[500px] object-cover md:grayscale md:contrast-125 md:brightness-75 md:scale-125 transition-all duration-700 group-hover:scale-100 group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100"
                />

                {/* Scanning overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute top-0 left-0 w-full h-1 bg-white/20 animate-scan opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Technical Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-white/20 pointer-events-none transition-all duration-500 group-hover:-top-2 group-hover:-right-2 group-hover:border-white/50 hidden sm:block" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-white/20 pointer-events-none transition-all duration-500 group-hover:-bottom-2 group-hover:-left-2 group-hover:border-white/50 hidden sm:block" />

              <div className="mt-8 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-mono text-white/70 uppercase tracking-[0.4em]">AUTH_PROTOCOL: ARCHITECT</div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">REF_ID: 882-X04</div>
                </div>
                <div className="flex gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 bg-white/10 transition-all duration-300 ${i < 3 ? 'group-hover:bg-white/40' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Background Decorative Blocks */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border border-white/5 bg-white/[0.01] -z-10 animate-pulse hidden sm:block" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-white/5 bg-white/[0.01] -z-10 rotate-12 transition-transform duration-1000 group-hover:rotate-45 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

