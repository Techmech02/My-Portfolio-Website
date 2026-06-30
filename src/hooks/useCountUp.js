import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/**
 * Animates a number from 0 to `end` when the returned ref enters the viewport.
 * Returns [ref, value] — attach ref to the element you want to observe.
 */
export default function useCountUp(end, { duration = 1200, threshold = 0.4 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(end);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setValue(end);
      return;
    }

    setValue(0);
    const el = ref.current;
    if (!el) return;

    let rafId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          setValue(Math.round(end * eased));
          if (progress < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [end, duration, threshold, reducedMotion]);

  return [ref, value];
}
