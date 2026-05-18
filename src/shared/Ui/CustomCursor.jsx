import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [hasMouse, setHasMouse] = useState(false);

    useLayoutEffect(() => {
        // Hide on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            if (cursorRef.current) cursorRef.current.style.display = 'none';
            return;
        }

        const onFirstMouse = () => {
            setHasMouse(true);
            window.removeEventListener('mousemove', onFirstMouse);
        };
        window.addEventListener('mousemove', onFirstMouse, { once: true });

        let currentState = 'default'; // 'default', 'link', 'media'

        const ctx = gsap.context(() => {
            if (!hasMouse) return;
            // MOTION: QuickTo for lag-free cursor tracking
            const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.4, ease: 'power3' });
            const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.4, ease: 'power3' });

            const moveCursor = (e) => {
                xTo(e.clientX);
                yTo(e.clientY);
            };
            window.addEventListener('mousemove', moveCursor);

            // MOTION: Click down scale
            const handleMouseDown = () => gsap.to(cursorRef.current, { scale: 0.75, duration: 0.2 });
            const handleMouseUp = () => gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
            window.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mouseup', handleMouseUp);

            // MOTION: Hover visual change via event delegation
            const updateCursorState = (e) => {
                const target = e.target;
                if (!target || !target.closest) return;

                const interactable = target.closest('a, button, input, textarea, .cursor-pointer');
                // Detect if hovering over an image or video, or a specific container that acts as a visual element
                const isMedia = target.closest('img, video, figure, .project-card, [data-media-cursor]');

                let newState = 'default';
                // If it's a media element and it's clickable (or inside a project card), switch to 'media' sniper crosshair
                if (isMedia && (interactable || target.closest('.project-card'))) {
                    newState = 'media';
                } else if (interactable) {
                    newState = 'link';
                }

                if (currentState !== newState) {
                    currentState = newState;
                    if (newState === 'media') {
                        gsap.to('.cursor-line-h, .cursor-line-v', { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.out' });
                        gsap.to('.cursor-dot', { scale: 0.5, duration: 0.3 });
                        gsap.to('.cursor-sniper', { opacity: 1, scale: 1, rotation: 90, duration: 0.5, ease: 'back.out(1.7)' });
                    } else if (newState === 'link') {
                        gsap.to('.cursor-line-h, .cursor-line-v', { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.out' });
                        gsap.to('.cursor-dot', { scale: 2, duration: 0.3 });
                        gsap.to('.cursor-sniper', { opacity: 0, scale: 0.5, rotation: 0, duration: 0.3 });
                    } else {
                        gsap.to('.cursor-line-h, .cursor-line-v', { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' });
                        gsap.to('.cursor-dot', { scale: 1, duration: 0.3 });
                        gsap.to('.cursor-sniper', { opacity: 0, scale: 0.5, rotation: 0, duration: 0.3 });
                    }
                }
            };

            window.addEventListener('mouseover', updateCursorState);

            return () => {
                window.removeEventListener('mousemove', moveCursor);
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('mouseover', updateCursorState);
            };
        });

        return () => {
            window.removeEventListener('mousemove', onFirstMouse);
            ctx.revert();
        };
    }, [hasMouse]);

    return (
        <div
            ref={cursorRef}
            aria-hidden="true"
            className={`fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${hasMouse ? 'hidden md:block' : 'hidden'}`}
        >
            {/* Sniper Bounding Box / Corners */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 cursor-sniper opacity-0 scale-50 transition-none pointer-events-none">
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-white/80" />
                {/* Top Right */}
                <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-white/80" />
                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-white/80" />
                {/* Bottom Right */}
                <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-white/80" />
            </div>

            {/* Horizontal Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 sm:w-6 h-[1px] bg-white/40 cursor-line-h" />
            {/* Vertical Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 sm:h-6 bg-white/40 cursor-line-v" />
            {/* Central Dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white cursor-dot" />
        </div>
    );
}

