import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/**
 * Adds a subtle 3D tilt + glow-follow effect on mouse move.
 * Attach the returned ref to the card element.
 */
export default function useTilt({ max = 6, scale = 1.015 } = {}) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - py) * max * 2;
      const rotateY = (px - 0.5) * max * 2;

      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      el.style.setProperty("--tilt-x", `${px * 100}%`);
      el.style.setProperty("--tilt-y", `${py * 100}%`);
    };

    const handleLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [max, scale, reducedMotion]);

  return ref;
}
