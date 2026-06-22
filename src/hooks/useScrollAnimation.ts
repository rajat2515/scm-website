import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollAnimation – adds `animations-ready` to <body> *only* after we have
 *   a) set up the IntersectionObserver
 *   b) instantly mark any elements that are already in the viewport as visible.
 * This prevents a flash‑of‑hidden content while still keeping the progressive
 * enhancement guarantee (elements are visible until JS runs).
 */
export function useScrollAnimation() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay ensures DOM is fully updated after route change
    const timeoutId = setTimeout(() => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-animate]')
      );
      if (!targets.length) return;

      // 1️⃣ Create observer – it will fire for elements that scroll into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      // 2️⃣ Observe all targets
      targets.forEach((el) => observer.observe(el));

      // 3️⃣ Immediately mark any targets already in viewport as visible
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });

      // 4️⃣ Now it is safe to tell CSS we are ready – hidden rules will apply only to the rest
      document.body.classList.add('animations-ready');

    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Don't remove animations-ready on cleanup to prevent flash during route transitions
    };
  }, [pathname]);
}
