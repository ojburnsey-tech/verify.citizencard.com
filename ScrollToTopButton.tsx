import { useEffect, useState } from 'react';
import { ChevronUpIcon } from './icons';

// Persistent scroll-to-top chevron, fixed bottom-right, revealed once the page
// has been scrolled. Mirrors the control on the real verify site.
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 320);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      className={`scroll-top ${isVisible ? 'is-visible' : ''}`}
      aria-label="Scroll back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <ChevronUpIcon />
    </button>
  );
}
