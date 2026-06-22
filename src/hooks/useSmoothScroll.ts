import { useEffect } from 'react';

/**
 * useSmoothScroll – native 1:1 real-time scrolling.
 * No Lenis / no momentum / no fixed scroll distance.
 * Page moves exactly as much as your scroll input, stops instantly when you stop.
 * Only anchor-link clicks get a smooth animated scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // Native smooth scroll with header offset
      const top =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        80;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
}
