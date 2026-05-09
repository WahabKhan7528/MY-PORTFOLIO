import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from '../lib/gsap';

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

            // MOTION: Magnetic hover
            const handleInteractableEnter = (e) => {
                const rect = e.target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                // Move cursor to center
                xTo(centerX);
                yTo(centerY);
                gsap.to(cursorRef.current, { scale: 2.5, mixBlendMode: 'difference', borderRadius: '50%', duration: 0.3 });
            };

            const handleInteractableLeave = () => {
                gsap.to(cursorRef.current, { scale: 1, mixBlendMode: 'normal', borderRadius: '50%', duration: 0.3 });
            };

            const interactables = document.querySelectorAll('a, button, input, textarea, .cursor-pointer');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', handleInteractableEnter);
                el.addEventListener('mouseleave', handleInteractableLeave);
            });

            return () => {
                window.removeEventListener('mousemove', moveCursor);
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
                interactables.forEach(el => {
                    el.removeEventListener('mouseenter', handleInteractableEnter);
                    el.removeEventListener('mouseleave', handleInteractableLeave);
                });
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
            className={`fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 ${hasMouse ? 'md:block' : 'hidden'}`}
        />
    );
}
