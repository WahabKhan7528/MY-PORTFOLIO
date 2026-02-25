import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const container = useRef(null);
    const topHalf = useRef(null);
    const bottomHalf = useRef(null);
    const content = useRef(null);
    const progressBar = useRef(null);
    const textRef = useRef(null);
    const glowRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        // Object to animate the number
        const progressObj = { value: 0 };

        // 1. Simulate Loading Progress
        tl.to(progressObj, {
            value: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
                setProgress(Math.round(progressObj.value));
            }
        }, 0);

        tl.to(progressBar.current, {
            width: "100%",
            duration: 1.8,
            ease: "power2.inOut"
        }, 0);

        // 2. Hide Content
        tl.to(content.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in"
        }, "+=0.2");

        // 3. Split the background like a sliding door
        tl.to(topHalf.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut"
        }, "split");

        tl.to(bottomHalf.current, {
            yPercent: 100,
            duration: 0.8,
            ease: "power4.inOut"
        }, "split");

        // --- Interactive Cursor Logic ---
        const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3" });

        const textXTo = gsap.quickTo(textRef.current, "x", { duration: 0.5, ease: "power2.out" });
        const textYTo = gsap.quickTo(textRef.current, "y", { duration: 0.5, ease: "power2.out" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const textBounds = textRef.current?.getBoundingClientRect();

            if (textBounds) {
                const textCenterX = textBounds.left + textBounds.width / 2;
                const textCenterY = textBounds.top + textBounds.height / 2;

                // Calculate distance from center of text
                const distanceX = clientX - textCenterX;
                const distanceY = clientY - textCenterY;

                // Magnetize text slightly
                textXTo(distanceX * 0.1);
                textYTo(distanceY * 0.1);
            }

            // Move ambient glow strictly to cursor
            xTo(clientX);
            yTo(clientY);
        };

        const handleMouseLeave = () => {
            textXTo(0);
            textYTo(0);
            gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
        };

        const handleMouseEnter = () => {
            gsap.to(glowRef.current, { opacity: 0.5, duration: 0.3 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };

    }, { scope: container });

    return (
        <div
            ref={container}
            className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col overflow-hidden"
        >
            {/* Interactive Glowing Orb */}
            <div
                ref={glowRef}
                className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 mix-blend-screen"
            />

            {/* Split Backgrounds */}
            <div ref={topHalf} className="h-1/2 w-full bg-black border-b border-white/5 relative z-10 pointer-events-none" />
            <div ref={bottomHalf} className="h-1/2 w-full bg-black border-t border-white/5 relative z-10 pointer-events-none" />

            {/* Overlay Content */}
            <div
                ref={content}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20 pointer-events-none"
            >
                <div
                    ref={textRef}
                    className="text-3xl sm:text-4xl font-display font-bold tracking-widest text-white mb-12 drop-shadow-2xl"
                >
                    WAHAB.
                </div>

                <div className="w-full max-w-xs relative">
                    <div className="flex justify-between text-xs font-medium tracking-widest text-gray-400 uppercase mb-4">
                        <span>Loading</span>
                        <span>{progress}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
                        {/* Progress Fill */}
                        <div
                            ref={progressBar}
                            className="h-full bg-white w-0"
                            style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
