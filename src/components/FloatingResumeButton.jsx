import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export default function FloatingResumeButton() {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) return;

            // MOTION: Idle float
            const floatTween = gsap.to(containerRef.current, { 
                y: -8, 
                duration: 2, 
                yoyo: true, 
                repeat: -1, 
                ease: 'power1.inOut' 
            });

            // MOTION: Hover enter and leave
            const btn = buttonRef.current;
            if (btn) {
                btn.addEventListener('mouseenter', () => {
                    floatTween.pause();
                    gsap.to(btn, { scale: 1.08, rotation: 3, duration: 0.3, ease: 'power2.out' });
                });
                btn.addEventListener('mouseleave', () => {
                    floatTween.resume();
                    gsap.to(btn, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
                });
            }

            // MOTION: Pulse when scrolling past 90%
            ScrollTrigger.create({
                trigger: document.body,
                start: '90% bottom',
                onEnter: () => {
                    gsap.fromTo(btn, 
                        { scale: 1.15 }, 
                        { scale: 1, duration: 0.5, ease: 'power3.out' }
                    );
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed bottom-8 right-8 z-50 pointer-events-auto">
            <a
                ref={buttonRef}
                href="/AWAK_ATS_Resume.docx"
                download="AWAK_ATS_Resume.docx"
                aria-label="Download Resume"
                className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full text-white overflow-hidden relative group"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 relative z-10"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            </a>
        </div>
    );
}
