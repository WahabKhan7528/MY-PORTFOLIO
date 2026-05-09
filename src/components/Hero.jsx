import { useRef, lazy, Suspense, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

const RippleEffect = lazy(() => import('./RippleEffect'));

export default function Hero() {
    const container = useRef(null);
    const canvasContainerRef = useRef(null);
    const headingRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) return;

            // MOTION: Word-level split and entrance for heading
            const headingWords = document.querySelectorAll('.hero-heading-word');
            const tl = gsap.timeline({ delay: 0.5 }); // Delay after preloader

            tl.fromTo(headingWords,
                { y: 60, skewY: 4, opacity: 0 },
                { y: 0, skewY: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out' }
            );

            // MOTION: Sub-tagline fade and y entrance
            tl.fromTo('.hero-desc',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
                "-=0.2"
            );

            // MOTION: CTA buttons entrance
            tl.fromTo('.hero-cta',
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out' },
                "-=0.2"
            );

            // MOTION: Scroll indicator arrow continuous oscillation
            gsap.fromTo('.scroll-indicator', 
                { y: -8 }, 
                { y: 8, duration: 1.4, ease: 'power1.inOut', yoyo: true, repeat: -1 }
            );

            // MOTION: Cinematic scroll off effect for Hero section
            const exitTl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            exitTl.to(headingRef.current, {
                y: window.innerHeight * 0.35,
                opacity: 0,
                scale: 0.85,
                filter: "blur(12px)",
                ease: "none"
            }, 0);

            if (canvasContainerRef.current) {
                exitTl.to(canvasContainerRef.current, {
                    y: window.innerHeight * 0.15,
                    opacity: 0.1,
                    ease: "none"
                }, 0);
            }

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-0">
            <div ref={canvasContainerRef} className="absolute inset-0 pointer-events-none z-0">
                <Suspense fallback={null}>
                    <RippleEffect />
                </Suspense>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none z-0" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
                <div ref={headingRef} className="hero-content flex flex-col items-center">
                    <h1 className="hero-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
                        <span className="inline-block overflow-visible">
                            {"Frontend Developer".split(" ").map((word, i) => (
                                <span key={i} className="hero-heading-word inline-block mr-3 lg:mr-4">{word}</span>
                            ))}
                        </span>
                    </h1>

                    <p className="hero-desc text-lg sm:text-xl md:text-2xl text-gray-400 font-light mb-12 max-w-2xl">
                        Crafting immersive, high-performance web experiences with React and modern CSS. Transforming complex designs into seamless, interactive reality.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#projects" className="hero-cta px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide transition-transform hover:scale-105 active:scale-95">
                            View My Work
                        </a>
                        <a href="#contact" className="hero-cta px-8 py-4 rounded-full border border-white/30 text-white font-medium text-sm tracking-wide bg-white/5 backdrop-blur-md transition-transform hover:scale-105 active:scale-95 hover:bg-white/10">
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
