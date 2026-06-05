import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { audioEngine } from '@/lib/audio';

/**
 * FloatingResumeButton - Expanding System Controls menu.
 * Compact, square industrial design with surgical precision.
 */
export default function FloatingResumeButton() {
    const containerRef = useRef(null);
    const menuRef = useRef(null);
    const floatTween = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

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

            // MOTION: Mechanical float (pauses when open to keep click targets stable)
            floatTween.current = gsap.to(containerRef.current, {
                y: -6,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Pause floating motion when menu is expanded to provide stable click targets
    useEffect(() => {
        if (!floatTween.current) return;
        if (isOpen) {
            floatTween.current.pause();
            gsap.to(containerRef.current, { y: 0, duration: 0.3 });
        } else {
            floatTween.current.play();
        }
    }, [isOpen]);

    // Handle mechanical spring entrance/exit of menu items
    useEffect(() => {
        const items = menuRef.current?.querySelectorAll('.menu-item');
        if (!items) return;

        if (isOpen) {
            gsap.to(items, {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.08,
                duration: 0.5,
                ease: 'back.out(1.5)',
                pointerEvents: 'auto'
            });
        } else {
            gsap.to(items, {
                opacity: 0,
                y: 20,
                scale: 0.8,
                stagger: 0.05,
                duration: 0.3,
                ease: 'expo.in',
                pointerEvents: 'none'
            });
        }
    }, [isOpen]);

    const scrollToTop = () => {
        audioEngine.init();
        audioEngine.playThud();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
    };

    const openTerminal = () => {
        audioEngine.init();
        audioEngine.playClick();
        window.dispatchEvent(new CustomEvent('open-terminal'));
        setIsOpen(false);
    };

    const handleToggle = () => {
        audioEngine.init();
        audioEngine.playClick();
        setIsOpen(!isOpen);
    };

    const handleMouseEnter = () => {
        audioEngine.init();
        if (!isOpen) {
            audioEngine.playTelemetry();
        }
        setIsOpen(true);
    };

    return (
        <div
            ref={containerRef}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col-reverse items-center gap-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Main Toggle Button */}
            <button
                onClick={handleToggle}
                onMouseEnter={() => {
                    audioEngine.init();
                    audioEngine.playTelemetry();
                }}
                aria-label="Toggle Menu"
                className="group relative flex items-center justify-center w-12 h-12 bg-black border border-white/30 overflow-hidden transition-all duration-300 ease-out hover:border-white"
            >
                {/* Background Inversion Layer */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                {/* Surgical Corner Accents */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-black/40 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-black/40 transition-colors duration-300" />

                {/* Icon Assembly */}
                <div className="relative z-10 flex items-center justify-center">
                    <span className="text-sm font-black tracking-widest text-white group-hover:text-black transition-colors duration-300 font-mono uppercase">
                        {isOpen ? 'X' : 'GOTO'}
                    </span>
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none translate-x-2 group-hover:translate-x-0 hidden sm:flex">
                    <div className="relative bg-black/90 backdrop-blur-md border border-white/20 px-3 py-1.5 whitespace-nowrap">
                        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/40" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/40" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white uppercase">
                            QUICK_ACTIONS
                        </span>
                    </div>
                </div>

                {/* Custom Floating Arrow (No layout gap, absolutely positioned relative to button) */}
                <div className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100 animate-bounce'}`}>
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </button>

            {/* Expanded Menu Items */}
            <div
                ref={menuRef}
                className="flex flex-col gap-3 mb-1"
            >
                {/* Terminal Button */}
                <button
                    onClick={openTerminal}
                    onMouseEnter={() => {
                        audioEngine.init();
                        audioEngine.playTelemetry();
                    }}
                    className="menu-item opacity-0 scale-80 group relative flex items-center justify-center w-12 h-12 bg-black border border-white/30 overflow-hidden transition-all duration-300 ease-out hover:border-white pointer-events-none"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-black/40 transition-colors duration-300" />
                    <div className="relative z-10 flex items-center justify-center">
                        <span className="text-xs font-bold tracking-widest text-white group-hover:text-black transition-colors duration-300 font-mono">
                            TRM
                        </span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none translate-x-2 group-hover:translate-x-0 hidden sm:flex">
                        <div className="relative bg-black/90 backdrop-blur-md border border-white/20 px-3 py-1.5 whitespace-nowrap">
                            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/40" />
                            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/40" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white uppercase">
                                OPEN_TERMINAL
                            </span>
                        </div>
                    </div>
                </button>

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    onMouseEnter={() => {
                        audioEngine.init();
                        audioEngine.playTelemetry();
                    }}
                    className="menu-item opacity-0 scale-80 group relative flex items-center justify-center w-12 h-12 bg-black border border-white/30 overflow-hidden transition-all duration-300 ease-out hover:border-white pointer-events-none"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-black/40 transition-colors duration-300" />
                    <div className="relative z-10 flex items-center justify-center">
                        <span className="text-xs font-bold tracking-widest text-white group-hover:text-black transition-colors duration-300 font-mono">
                            TOP
                        </span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none translate-x-2 group-hover:translate-x-0 hidden sm:flex">
                        <div className="relative bg-black/90 backdrop-blur-md border border-white/20 px-3 py-1.5 whitespace-nowrap">
                            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/40" />
                            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/40" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white uppercase">
                                SCROLL_TOP
                            </span>
                        </div>
                    </div>
                </button>

                {/* CV Button */}
                <a
                    href="/AWAK_ATS_Resume.docx"
                    download="AWAK_ATS_Resume.docx"
                    onClick={() => {
                        audioEngine.init();
                        audioEngine.playThud();
                        setIsOpen(false);
                    }}
                    onMouseEnter={() => {
                        audioEngine.init();
                        audioEngine.playTelemetry();
                    }}
                    className="menu-item opacity-0 scale-80 group relative flex items-center justify-center w-12 h-12 bg-black border border-white/30 overflow-hidden transition-all duration-300 ease-out hover:border-white pointer-events-none"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-black/40 transition-colors duration-300" />
                    <div className="relative z-10 flex items-center justify-center">
                        <span className="text-xs font-bold tracking-widest text-white group-hover:text-black transition-colors duration-300 font-mono">
                            CV
                        </span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none translate-x-2 group-hover:translate-x-0 hidden sm:flex">
                        <div className="relative bg-black/90 backdrop-blur-md border border-white/20 px-3 py-1.5 whitespace-nowrap">
                            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/40" />
                            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/40" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white uppercase">
                                DOWNLOAD_CV
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
