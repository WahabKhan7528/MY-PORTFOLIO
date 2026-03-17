import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        let rafId = null;
        let targetProgress = 0;
        let currentProgress = 0;

        const animate = () => {
            currentProgress += (targetProgress - currentProgress) * 0.15;
            bar.style.transform = `scaleX(${currentProgress / 100})`;

            if (Math.abs(targetProgress - currentProgress) > 0.05) {
                rafId = requestAnimationFrame(animate);
            } else {
                currentProgress = targetProgress;
                bar.style.transform = `scaleX(${currentProgress / 100})`;
                rafId = null;
            }
        };

        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            targetProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            if (rafId === null) {
                rafId = requestAnimationFrame(animate);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={barRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '3px',
                width: '100%',
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
                zIndex: 99999,
                background: 'linear-gradient(to right, #6b7280, #d1d5db, #ffffff)',
                pointerEvents: 'none',
                willChange: 'transform',
            }}
        />
    );
}
