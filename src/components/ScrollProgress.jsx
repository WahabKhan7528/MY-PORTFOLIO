import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        let rafId;
        let currentWidth = 0;

        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const targetWidth = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            currentWidth += (targetWidth - currentWidth) * 0.15;

            bar.style.width = `${currentWidth}%`;

            rafId = requestAnimationFrame(updateProgress);
        };

        rafId = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div
            ref={barRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '3px',
                width: '0%',
                zIndex: 99999,
                background: 'linear-gradient(to right, #6b7280, #d1d5db, #ffffff)',
                pointerEvents: 'none',
            }}
        />
    );
}
