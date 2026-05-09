import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function About() {
  const container = useRef(null);
  const yearsRef = useRef(null);
  const projectsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // MOTION: Section title clip reveal
      gsap.fromTo('.about-title-inner',
        { y: '100%' },
        { y: '0%', duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: container.current, start: 'top 80%' } }
      );

      // MOTION: Body paragraphs lines stagger
      gsap.fromTo('.about-paragraph',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: '.about-paragraphs', start: 'top 80%' } }
      );

      // MOTION: Stat counters animation
      const animateStat = (targetRef, maxVal, suffix) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: maxVal,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: targetRef.current, start: 'top 85%' },
          onUpdate: () => {
            if (targetRef.current) {
              targetRef.current.textContent = Math.round(obj.val) + suffix;
            }
          }
        });
      };
      
      animateStat(yearsRef, 3, '+');
      animateStat(projectsRef, 15, '+');

      // MOTION: Floating decorative elements idle rotation
      const floatAnim = gsap.to('.deco-float', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      });

      window.addEventListener('blur', () => floatAnim.pause());
      window.addEventListener('focus', () => floatAnim.resume());

      // MOTION: On scroll scrub, decorative blobs move at different parallax rates
      gsap.to('.deco-float-1', {
        y: -100,
        ease: 'none',
        scrollTrigger: { trigger: container.current, scrub: 1.2 }
      });
      gsap.to('.deco-float-2', {
        y: -200,
        ease: 'none',
        scrollTrigger: { trigger: container.current, scrub: 1.2 }
      });

      return () => {
        window.removeEventListener('blur', () => floatAnim.pause());
        window.removeEventListener('focus', () => floatAnim.resume());
      }
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={container} className="section-padding min-h-screen flex flex-col justify-center py-24 lg:py-32 relative overflow-hidden bg-black text-white">
      <div className="deco-float deco-float-1 absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-[40%] blur-[120px] pointer-events-none" />
      <div className="deco-float deco-float-2 absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-white/5 rounded-[40%] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col justify-center">
            <div className="mb-12 overflow-hidden">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-bold about-title-inner">The Architect</div>
              <h2 className="about-title-inner text-5xl md:text-[80px] lg:text-[100px] font-display font-black leading-[0.9] tracking-tighter">
                WHO I<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">AM.</span>
              </h2>
            </div>

            <div className="about-paragraphs space-y-8 text-gray-400 md:text-xl font-light leading-relaxed max-w-lg">
              <p className="about-paragraph text-white text-2xl md:text-3xl font-normal leading-snug">
                I bridge the gap between complex design and functional, high-performance interfaces.
              </p>
              <p className="about-paragraph">
                I'm a frontend developer specializing in building modern, immersive web experiences. With deep expertise in React, GSAP, and complex UI architecture, I build applications that not only look great but perform exceptionally.
              </p>
              <p className="about-paragraph">
                My approach combines clean code practices, responsive design, and rigorous performance optimization to deliver world-class digital products.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:pl-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              <div className="border-t border-white/20 pt-8">
                <div ref={yearsRef} className="text-7xl md:text-[100px] font-display font-black text-white leading-none mb-4 tracking-tighter">2</div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">
                  Years of<br />Experience
                </div>
              </div>
              <div className="border-t border-white/20 pt-8">
                <div ref={projectsRef} className="text-7xl md:text-[100px] font-display font-black text-white leading-none mb-4 tracking-tighter">3</div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">
                  Projects<br />Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
