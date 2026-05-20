import { useLayoutEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function useLocomotiveScroll(loading, pathname) {
  useLayoutEffect(() => {
    if (loading) return;

    // Reset window scroll immediately before creating the scroll instance
    window.scrollTo(0, 0);

    // LOCOMOTIVE SCROLL 5 + GSAP SYNC
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
      }
    });

    window.locomotiveScroll = locomotiveScroll;

    const lenis = locomotiveScroll.lenisInstance;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (lenis) lenis.off('scroll', ScrollTrigger.update);
      locomotiveScroll.destroy();
      window.locomotiveScroll = null;
    };
  }, [loading, pathname]); // Refresh on route change
}
