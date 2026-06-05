import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { audioEngine } from '@/lib/audio';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString([], { hour12: false }));
    const container = useRef(null);
    const logsRef = useRef(null);

    const logMessages = [
        "[ 0.000000] INITIALIZING SYSTEM BOOT...",
        "[ 0.124512] CHECKING HARDWARE INTEGRITY...",
        "[ 0.451212] MOUNTING CORE MODULES...",
        "[ 0.845121] ESTABLISHING SECURE PROTOCOLS...",
        "[ 1.214512] LOADING VISUAL ASSETS...",
        "[ 1.541212] CALIBRATING INTERFACE...",
        "[ 1.845121] SYSTEM OPERATIONAL."
    ];

    useEffect(() => {
        const updateClock = () => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour12: false }));
        };

        updateClock();
        const intervalId = window.setInterval(updateClock, 1000);

        return () => window.clearInterval(intervalId);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) tl.duration(0);

            const progressObj = { val: 0 };

            tl.addLabel('start');

            // Animate progress
            tl.to(progressObj, {
                val: 100,
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => setProgress(Math.round(progressObj.val))
            }, 'start');

            // Stagger log lines
            const logLines = container.current.querySelectorAll('.log-line');
            tl.fromTo(logLines,
                { opacity: 0, x: -5 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.2,
                    stagger: {
                        each: 0.15,
                        onStart: () => audioEngine.playTelemetry()
                    },
                    ease: 'power1.out'
                },
                'start+=0.1'
            );

            // Animate grid lines
            tl.fromTo('.grid-line-h',
                { scaleX: 0 },
                { scaleX: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' },
                'start'
            );
            tl.fromTo('.grid-line-v',
                { scaleY: 0 },
                { scaleY: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' },
                'start'
            );

            tl.addLabel('exit', '+=0.3');

            // Exit animation
            tl.to('.log-line, .percentage-text, .metadata-text, .progress-bar-container', {
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in',
                onStart: () => audioEngine.playThud()
            }, 'exit');

            tl.to('.grid-line-h', { scaleX: 0, duration: 0.5, ease: 'power2.inOut' }, 'exit+=0.2');
            tl.to('.grid-line-v', { scaleY: 0, duration: 0.5, ease: 'power2.inOut' }, 'exit+=0.2');

            tl.to(container.current, {
                y: '-100%',
                duration: 0.8,
                ease: 'power3.inOut'
            }, 'exit+=0.5');

            // Reveal hero
            const heroTarget = document.querySelector('.hero-container');
            if (heroTarget) {
                gsap.fromTo(heroTarget, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: tl.labels.exit + 0.5
                });
            }

        }, container);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={container} className="fixed inset-0 z-[9999] bg-black pointer-events-auto flex flex-col overflow-hidden font-mono text-white p-4 sm:p-10">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 animate-scanline" />

            {/* Layout Framing Lines */}
            <div className="grid-line-h absolute top-1/4 left-0 right-0 h-[1px] bg-white/10 origin-left" />
            <div className="grid-line-h absolute bottom-1/4 left-0 right-0 h-[1px] bg-white/10 origin-left" />
            <div className="grid-line-v absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/10 origin-top" />
            <div className="grid-line-v absolute top-0 bottom-0 right-1/4 w-[1px] bg-white/10 origin-top" />

            {/* Content Areas */}

            {/* Top Left: System Info */}
            <div className="metadata-text absolute top-4 sm:top-10 left-4 sm:left-10 text-[9px] sm:text-xs uppercase tracking-widest text-white/70">
                <div>System: WAHAB_OS_V1.0</div>
                <div>Kernel: Precision_Noir</div>
                <div>Status: Initializing</div>
            </div>

            {/* Top Right: Time/Date or Metadata */}
            <div className="metadata-text absolute top-4 sm:top-10 right-4 sm:right-10 text-[9px] sm:text-xs uppercase tracking-widest text-white/70 text-right">
                <div>Sector: 0x7A4</div>
                <div>Mode: Secure</div>
                <div>Time: {currentTime}</div>
            </div>

            {/* Center: Massive Loading Percentage */}
            <div className="flex-1 flex flex-col items-center justify-center percentage-text">
                <div className="text-[clamp(5rem,18vw,12.5rem)] font-display font-bold leading-none text-white tracking-tighter">
                    {progress.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/70 -mt-2 sm:-mt-4">
                    Percent Loaded
                </div>
            </div>

            {/* Bottom Left: Logs */}
            <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 max-w-md hidden sm:block">
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/70 mb-2">Boot Logs:</div>
                <div ref={logsRef} className="space-y-1 font-mono text-[10px] sm:text-xs text-white/80">
                    {logMessages.map((msg, index) => (
                        <div key={index} className="log-line">
                            {msg}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Right: Progress Bar Segmented */}
            <div className="progress-bar-container absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-full max-w-[150px] sm:max-w-[200px] md:max-w-xs">
                <div className="flex justify-between text-[9px] sm:text-xs uppercase tracking-widest text-white/70 mb-2">
                </div>
                <div className="flex space-x-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 flex-1 ${i < Math.floor(progress / 5) ? 'bg-white' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Corner Accents (Surgical) */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50" />
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50" />
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50" />
        </div>
    );
}

