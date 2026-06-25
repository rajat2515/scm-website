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
    let observer: IntersectionObserver;
    let mutationObserver: MutationObserver;

    // Small delay ensures DOM is fully updated after route change
    const timeoutId = setTimeout(() => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-animate]')
      );

      // 1️⃣ Create observer – it will fire for elements that scroll into view
      observer = new IntersectionObserver(
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

      const observeElement = (el: HTMLElement) => {
        // Only observe if it's not already visible
        if (el.classList.contains('is-visible')) return;
        
        observer.observe(el);
        // Immediately mark any targets already in viewport as visible
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      };

      // 2️⃣ Observe all current targets
      targets.forEach(observeElement);

      // 3️⃣ Set up a MutationObserver to watch for dynamically added elements
      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // ELEMENT_NODE
              const element = node as HTMLElement;
              if (element.hasAttribute('data-animate')) {
                observeElement(element);
              }
              const childTargets = Array.from(element.querySelectorAll<HTMLElement>('[data-animate]'));
              childTargets.forEach(observeElement);
            }
          });
        });
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });

      // 4️⃣ Now it is safe to tell CSS we are ready – hidden rules will apply only to the rest
      document.body.classList.add('animations-ready');

    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      // Don't remove animations-ready on cleanup to prevent flash during route transitions
    };
  }, [pathname]);
}
