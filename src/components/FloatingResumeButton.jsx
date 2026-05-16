import { useRef, useLayoutEffect } from 'react';
import { gsap } from '../lib/gsap';

/**
 * FloatingResumeButton - Minimal "Precision Noir" implementation.
 * Compact, square industrial design with surgical precision.
 */
export default function FloatingResumeButton() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) return;

            // MOTION: Subtle entrance from the right
            gsap.from(containerRef.current, {
                x: 60,
                opacity: 0,
                duration: 1.5,
                ease: 'expo.out',
                delay: 1.2
            });

            // MOTION: Mechanical float
            gsap.to(containerRef.current, {
                y: -6,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-8 right-8 z-50 pointer-events-auto group/resume"
        >
            <a
                href="/AWAK_ATS_Resume.docx"
                download="AWAK_ATS_Resume.docx"
                aria-label="Download Resume"
                className="group relative flex items-center justify-center w-12 h-12 bg-black border border-white/30 overflow-hidden transition-all duration-500 hover:border-white"
            >
                {/* Background Inversion Layer */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                {/* Surgical Corner Accents */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-black/40 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-black/40 transition-colors duration-500" />

                {/* Icon Assembly */}
                <div className="relative z-10 flex items-center justify-center">
                    <span className="text-sm font-black tracking-widest text-white group-hover:text-black transition-colors duration-500">
                        CV
                    </span>
                </div>

                {/* Tooltip Technical Label */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-x-4 group-hover:translate-x-0">
                    <div className="relative bg-black border border-white/20 px-3 py-1.5 whitespace-nowrap">
                        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/40" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/40" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white uppercase">
                            DOWNLOAD_RESUME
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
}

