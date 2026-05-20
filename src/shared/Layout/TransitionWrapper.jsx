import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  const overlayRef = useRef(null);
  const pathRef = useRef(null);
  const logoRef = useRef(null);
  const pathLengthRef = useRef(0); // Cache path length
  const { contextSafe } = useGSAP({ scope: overlayRef });

  // Initialize SVG path and logo
  useGSAP(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      pathLengthRef.current = len; // Store length
      gsap.set(pathRef.current, {
        strokeDasharray: len,
        strokeDashoffset: len,
        strokeWidth: 2,
      });
    }
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 0, y: 20 });
    }
  }, []);

  // eslint-disable-next-line react-hooks/refs
  const handleTransition = contextSafe(() => {
    const path = pathRef.current;
    const len = pathLengthRef.current || path.getTotalLength(); // Use cached length
    const targetWidth = Math.max(window.innerWidth, window.innerHeight) * 2; // Ensure full coverage

    const tl = gsap.timeline();

    tl.to(overlayRef.current, { 
      opacity: 1, 
      duration: 0.3, 
      ease: "power2.inOut",
      force3D: true,
      onStart: () => { overlayRef.current.style.pointerEvents = "all"; }
    })
    .to(path, { 
      strokeDashoffset: 0, 
      strokeWidth: targetWidth, 
      duration: 0.8, 
      ease: "power3.inOut",
      force3D: true
    }, "<")
    // Fade in logo when covered
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      force3D: true
    }, "-=0.4")
    .add(() => {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
      if (window.locomotiveScroll) {
        if (window.locomotiveScroll.lenisInstance) {
          window.locomotiveScroll.lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.locomotiveScroll.scrollTo(0, { immediate: true });
        }
      }
    }, "-=0.1")
    // Reveal content and fade out logo simultaneously
    .to(path, { 
      strokeDashoffset: -len, 
      duration: 0.8, 
      ease: "power3.inOut",
      force3D: true
    })
    .to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      force3D: true
    }, "<")
    .to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.inOut",
      force3D: true,
      onComplete: () => {
        overlayRef.current.style.pointerEvents = "none";
        gsap.set(path, { strokeDashoffset: len, strokeWidth: 2 });
        gsap.set(logoRef.current, { y: 20 }); // reset for next time
      }
    }, "-=0.2");
  });

  useGSAP(() => {
    if (location.pathname !== displayLocation.pathname) {
      handleTransition();
    }
  }, [location]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center opacity-0 bg-black/5"
        style={{ willChange: "opacity" }}
      >
        <div ref={logoRef} className="absolute z-10 pointer-events-none" style={{ willChange: "transform, opacity" }}>
           <span 
             className="font-display text-6xl sm:text-8xl md:text-[120px] tracking-tighter select-none"
             style={{ color: '#E6E1DD' }}
           >
             WAHAB.
           </span>
        </div>
        <svg
          width="100%" height="100%" viewBox="0 0 1316 664" fill="none"
          className="w-full h-full scale-150 sm:scale-125 lg:scale-150"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            ref={pathRef}
            style={{ willChange: "stroke-dashoffset, stroke-width" }}
            d="M -100 764 L 1416 -100"
            stroke="#1a1a1a"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
      <div className="page-content-wrapper">{children(displayLocation)}</div>
    </>
  );
};

export default TransitionWrapper;

