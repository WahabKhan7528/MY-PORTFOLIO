import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function ProjectsHero() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".init-bar",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power4.inOut" }
    )
    .fromTo(".hero-meta",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".hero-title-line",
      { y: 100, skewY: 10, opacity: 0 },
      { y: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
      "-=0.8"
    )
    .fromTo(".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(".tech-spec",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".corner-accent",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Decorative Sphere Rotation
    gsap.to(".hero-sphere", {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "none"
    });

    // Scanning line animation
    gsap.to(".scan-line", {
      y: "calc(100vh - var(--nav-height))",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    // Floating animation for specs
    gsap.to(".tech-spec-container", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-[calc(100vh-var(--nav-height))] mt-[var(--nav-height)] bg-black overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      <div className="scan-line absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />

      {/* Decorative Wireframe Sphere */}
      <div className="hero-sphere absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] border border-white/5 rounded-full pointer-events-none">
        <div className="absolute inset-0 border-t border-white/10 rounded-full rotate-45 scale-110" />
        <div className="absolute inset-0 border-l border-white/10 rounded-full -rotate-45 scale-90" />
        <div className="absolute inset-0 border-b border-white/5 rounded-full rotate-12" />
      </div>

      {/* Surgical Corner Accents */}
      <div className="absolute inset-4 sm:inset-10 pointer-events-none border border-white/5">
        <div className="corner-accent absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/40" />
        <div className="corner-accent absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/40" />
        <div className="corner-accent absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/40" />
        <div className="corner-accent absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center gap-12">
        <div className="w-full flex flex-col items-center">
          <div className="hero-meta flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-white/40" />
            <span className="text-sm font-mono tracking-[0.6em] text-white/90 uppercase">/ Projects \</span>
            <div className="h-px w-12 bg-white/40" />
          </div>

          <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter leading-[0.85] sm:leading-[0.82] uppercase mb-12 flex flex-col sm:flex-col lg:flex-row items-center gap-x-6">
            <span className="hero-title-line">SELECTED</span>
            <span className="hero-title-line text-white/20 italic">WORKS_</span>
          </h1>

          <div className="relative w-full max-w-md mb-12 mx-auto">
            <div className="init-bar absolute top-0 left-0 h-px w-full bg-white/60 origin-center" />
            <div className="h-px w-full bg-white/10" />
          </div>

          <p className="hero-desc text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            A curated selection of projects that show design and technical work. Each project represents a unique challenge solved with performance, accessibility, and modern web standards in mind.
          </p>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 -left-10 text-[clamp(5rem,20vw,25rem)] font-black text-white/[0.02] pointer-events-none select-none leading-none tracking-tighter uppercase">
        ARCHIVE
      </div>
    </section>
  );
}
