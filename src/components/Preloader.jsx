import { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from '../lib/gsap';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const container = useRef(null);
    const textStr = "WAHAB KHAN";
    const chars = textStr.split("");

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // MOTION: Master timeline for preloader sequence
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) tl.duration(0);

            const progressObj = { val: 0 };
            
            tl.addLabel('start');

            // MOTION: Increment progress counter 0 to 100
            tl.to(progressObj, {
                val: 100,
                duration: 1.8,
                ease: 'power2.inOut',
                onUpdate: () => setProgress(Math.round(progressObj.val))
            }, 'start');

            // MOTION: Subtitle line draws in from left
            tl.fromTo('.subtitle-line', 
                { scaleX: 0 },
                { scaleX: 1, duration: 1.8, transformOrigin: 'left center', ease: 'power2.inOut' }, 
                'start'
            );

            // MOTION: Chars animate from y: 80, rotateX: -90, opacity: 0 to natural
            tl.fromTo('.char', 
                { y: 80, opacity: 0, rotateX: -90, transformOrigin: 'top' },
                { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' },
                'start+=0.2'
            );

            tl.addLabel('exit', '+=0.4');

            // MOTION: Exit animation clipping preloader upward and hero counter-clipping downward
            tl.to(container.current, {
                y: '-105vh',
                duration: 0.9,
                ease: 'power3.inOut'
            }, 'exit');
            
            tl.fromTo('.hero-container', {
                y: '105vh'
            }, {
                y: '0vh',
                duration: 0.9,
                ease: 'power3.inOut'
            }, 'exit');

        }, container);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={container} className="fixed inset-0 z-[9999] bg-black pointer-events-auto flex flex-col overflow-hidden items-center justify-center">
            <div className="flex text-3xl sm:text-4xl font-display font-bold tracking-widest text-white mb-12 drop-shadow-2xl" style={{ perspective: '400px' }}>
                {chars.map((char, index) => (
                    <span key={index} className="char inline-block whitespace-pre">{char}</span>
                ))}
            </div>

            <div className="w-full max-w-xs relative">
                <div className="flex justify-between text-xs font-medium tracking-widest text-gray-400 uppercase mb-4">
                    <span>Loading</span>
                    <span>{progress}%</span>
                </div>

                <div className="w-full h-[1px] bg-white/10 rounded-full">
                    <div className="subtitle-line w-full h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
            </div>
        </div>
    );
}
