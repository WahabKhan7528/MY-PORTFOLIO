import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export default function FlashPanel() {
  const flashRef = useRef(null);

  useGSAP(() => {
    // MOTION: Flash transition panel opacity on load
    gsap.fromTo(flashRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
    );
  });

  return (
    <div ref={flashRef} className="fixed inset-0 z-[9998] bg-white pointer-events-none" />
  );
}
