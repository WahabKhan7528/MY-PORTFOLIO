import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
        const cursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });

        const followerX = gsap.quickTo(followerRef.current, "x", { duration: 0.5, ease: "power3.out" });
        const followerY = gsap.quickTo(followerRef.current, "y", { duration: 0.5, ease: "power3.out" });

        const moveCursor = (e) => {
            cursorX(e.clientX);
            cursorY(e.clientY);
            followerX(e.clientX);
            followerY(e.clientY);
        };

        const handleMouseDown = () => {
            gsap.to(cursorRef.current, { scale: 0.5, duration: 0.2 });
            gsap.to(followerRef.current, { scale: 1.5, opacity: 0.2, duration: 0.2 });
        };

        const handleMouseUp = () => {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
            gsap.to(followerRef.current, { scale: 1, opacity: 0.5, duration: 0.2 });
        };

        const handleMouseLeave = () => {
            gsap.to([cursorRef.current, followerRef.current], { opacity: 0, duration: 0.3 });
        };

        const handleMouseEnter = () => {
            gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
            gsap.to(followerRef.current, { opacity: 0.5, duration: 0.3 });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        document.body.classList.add('cursor-none');

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.classList.remove('cursor-none');
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-50 transition-colors duration-300"
            />
        </>
    );
}
