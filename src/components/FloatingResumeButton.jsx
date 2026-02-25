import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FloatingResumeButton() {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const xTo = useRef();
    const yTo = useRef();

    useGSAP(() => {
        // Initial Mount Animation
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1.0, delay: 1.5, ease: 'back.out(1.5)' }
        );

        // Setup quickTo for optimized magnetic movement
        xTo.current = gsap.quickTo(buttonRef.current, "x", { duration: 0.4, ease: "power4.out" });
        yTo.current = gsap.quickTo(buttonRef.current, "y", { duration: 0.4, ease: "power4.out" });
    }, { scope: containerRef });

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

        // Calculate center precisely based on current DOM Rect (which includes transforms)
        // Wait, if it transforms, the Rect center shifts. So we need the original or subtract the current transform.
        // Even simpler: calculate distance from the mouse to the center of the viewport-based bounding box.
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Smooth magnetic pull
        if (xTo.current && yTo.current) {
            xTo.current(distanceX * 0.35);
            yTo.current(distanceY * 0.35);
        }
    };

    const handleMouseLeave = () => {
        if (xTo.current && yTo.current) {
            xTo.current(0);
            yTo.current(0);
        }
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <div
            ref={containerRef}
            className="fixed bottom-8 right-8 z-50 pointer-events-auto opacity-0 transform-gpu"
        >
            <a
                ref={buttonRef}
                href="/resume.pdf"
                download="Wahab_Resume.pdf"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                className="relative flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden cursor-pointer group rounded-full w-14 h-14"
            >
                {/* Glowing background effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Icon */}
                <div className="flex items-center justify-center w-6 h-6 text-white relative z-10">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </div>
            </a>
        </div>
    );
}
