import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export default function ScrollProgress() {
    const barRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // MOTION: Update scaleX based on scroll progress via ScrollTrigger
            ScrollTrigger.create({
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: self => {
                    const val = Math.round(self.progress * 100);
                    gsap.set(barRef.current, { scaleX: self.progress, transformOrigin: 'left' });
                    if (barRef.current) {
                        barRef.current.setAttribute('role', 'progressbar');
                        barRef.current.setAttribute('aria-valuenow', String(val));
                        barRef.current.setAttribute('aria-valuemin', '0');
                        barRef.current.setAttribute('aria-valuemax', '100');
                        barRef.current.setAttribute('aria-label', 'Page scroll progress');
                    }
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 h-[2px] w-full z-[9999] pointer-events-none"
            style={{ 
                background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.4) 100%)',
                transform: 'scaleX(0)',
                transformOrigin: 'left'
            }}
        />
    );
}
