import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.locomotiveScroll) {
      if (window.locomotiveScroll.lenisInstance) {
        window.locomotiveScroll.lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.locomotiveScroll.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
