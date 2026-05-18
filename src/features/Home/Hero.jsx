import { useRef, lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Link } from "react-router-dom";

const RippleEffect = lazy(() => import("@/shared/Effects/RippleEffect"));

export default function Hero() {
  const container = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(".init-bar",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power4.inOut" }
    )
      .fromTo(".hero-meta",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-heading-line",
        { y: 100, skewY: 10, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(".hero-cta-container",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
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
      y: "100vh",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

  }, { scope: container });


  return (
    <section
      ref={container}
      className="hero-section home-hero-section relative w-full h-screen overflow-hidden bg-black flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-20 sm:py-0"
    >
      {/* Background technical elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Suspense fallback={null}>
          <RippleEffect />
        </Suspense>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="scan-line absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />

      {/* Decorative Wireframe Sphere */}
      <div className="hero-sphere absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] border border-white/5 rounded-full pointer-events-none">
        <div className="absolute inset-0 border-t border-white/10 rounded-full rotate-45 scale-110" />
        <div className="absolute inset-0 border-l border-white/10 rounded-full -rotate-45 scale-90" />
        <div className="absolute inset-0 border-b border-white/5 rounded-full rotate-12" />
      </div>

      {/* Surgical Corner Accents */}
      <div className="absolute inset-10 pointer-events-none border border-white/5">
        <div className="corner-accent absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/40" />
        <div className="corner-accent absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/40" />
        <div className="corner-accent absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/40" />
        <div className="corner-accent absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
        <div className="hero-meta flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-white/40" />
          <span className="text-[12px] font-mono tracking-[0.6em] text-white/70 uppercase">-----</span>
          <div className="h-px w-12 bg-white/40" />
        </div>

        <h1 ref={headingRef} className="hero-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter leading-[0.82] uppercase flex flex-col mb-12">
          <div className="overflow-hidden pb-2">
            <span className="hero-heading-line inline-block">Full-Stack</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-heading-line inline-block text-white/20 italic">Architect</span>
          </div>
        </h1>

        <div className="relative w-full max-w-md mb-12 mx-auto">
          <div className="init-bar absolute top-0 left-0 h-px w-full bg-white/60 origin-center" />
          <div className="h-px w-full bg-white/10" />
        </div>

        <div className="hero-desc mb-12 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-light leading-relaxed">
            I build fast, reliable web apps with the MERN stack. I turn complex ideas into real products.
          </p>
        </div>

        <div className="hero-cta-container flex flex-wrap gap-6 items-center justify-center">
          <Link
            to="/projects"
            className="group relative px-6 sm:px-10 py-4 sm:py-5 min-h-[44px] text-sm bg-gray-200 text-black overflow-hidden transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 text-[11px] tracking-[0.3em] uppercase font-bold">View Projects</span>
            <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </Link>

          <Link
            to="/contact"
            className="px-6 sm:px-10 py-4 sm:py-5 min-h-[44px] border border-white/10 text-white text-[11px] tracking-[0.3em] uppercase font-bold bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 -left-10 text-[clamp(5rem,20vw,25rem)] font-black text-white/[0.02] pointer-events-none select-none leading-none tracking-tighter uppercase">
        ARCHITECT
      </div>
    </section>
  );
}



