import { useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const RippleEffect = lazy(() => import('./RippleEffect'));

export default function Hero() {
    const container = useRef(null);

    useGSAP(() => {
        // Wait for preloader to finish (2.5s)
        const tl = gsap.timeline({ delay: 2.5 });

        // Decorative Elements
        tl.to('.hero-deco-1', { opacity: 0.1, scale: 1, duration: 2, ease: 'power2.out' }, 0.5)
            .to('.hero-deco-2', { opacity: 0.05, scale: 1, duration: 2, ease: 'power2.out' }, 0.7);

        // Main Content Container
        tl.fromTo('.hero-card',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
            0.3
        );

        // Eyebrow Text
        tl.fromTo('.hero-eyebrow',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
            0.5
        );

        // Main Heading
        tl.fromTo('.hero-heading',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
            0.6
        );

        // Role/Title
        tl.fromTo('.hero-role',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
            0.8
        );

        // Description
        tl.fromTo('.hero-desc',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
            0.6
        );

        // CTA Buttons
        tl.fromTo('.hero-cta',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.1 },
            0.8
        );

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-0">
            {/* WebGL Ripple Background - Lazy Loaded */}
            <Suspense fallback={null}>
                <RippleEffect />
            </Suspense>

            {/* Enhanced Gradient Overlay with vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

            {/* Decorative Elements */}
            <div
                className="hero-deco-1 hidden sm:block absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none opacity-0 scale-[0.8]"
            />
            <div
                className="hero-deco-2 hidden sm:block absolute bottom-1/4 right-1/4 w-80 sm:w-96 md:w-[500px] h-80 sm:h-96 md:h-[500px] bg-white rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] pointer-events-none opacity-0 scale-[0.8]"
            />

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:mt-25">
                {/* Glassmorphic Content Card */}
                <div
                    className="hero-card glass rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 backdrop-blur-xl opacity-0"
                >
                    {/* Eyebrow Text */}
                    <div className="hero-eyebrow mb-4 sm:mb-6 opacity-0">
                        <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                            Portfolio 2026
                        </span>
                    </div>

                    {/* Main Heading with Character Animation */}
                    <div className="hero-heading mb-4 sm:mb-6 opacity-0">
                        <h1 className="heading-xl mb-2 leading-[0.9]">
                            <span className="block text-gradient">MERN Stack Developer</span>
                        </h1>
                    </div>

                    {/* Role/Title with typing effect feel */}
                    <div className="hero-role mb-6 sm:mb-8 opacity-0">
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight text-white/90">
                            Full-Stack Web Developer
                            <span className="text-gray-500"> & </span>
                            Problem Solver
                        </p>
                    </div>

                    {/* Description */}
                    <div className="hero-desc mb-8 sm:mb-12 opacity-0">
                        <p className="text-base sm:text-lg md:text-xl max-w-3xl text-gray-400 font-light leading-relaxed">
                            Building scalable web applications with MongoDB, Express.js, React, and Node.js.
                            Transforming ideas into robust, high-performance digital solutions.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        <a
                            href="#projects"
                            className="hero-cta group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 opacity-0"
                        >
                            <span className="relative z-10">View My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </a>

                        <a
                            href="#contact"
                            className="hero-cta px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/30 text-white font-medium text-sm tracking-wide hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105 active:scale-95 opacity-0"
                        >
                            Get In Touch
                        </a>

                        <a
                            href="#about"
                            className="hero-cta px-6 sm:px-8 py-3 sm:py-4 rounded-full text-gray-400 font-medium text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2 hover:scale-105 active:scale-95 opacity-0"
                        >
                            <span>Learn More</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
