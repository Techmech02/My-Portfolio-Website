import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * GlitchText — adapted from React Bits (reactbits.dev/text-animations/glitch-text)
 * RGB-split + clip-path glitch effect. Plays once on mount (or scroll-into-view),
 * then settles to plain text — keeps it tasteful for a recruiter-facing site.
 * Respects prefers-reduced-motion (skips animation entirely).
 */
export default function GlitchText({
  children,
  className = "",
  as: Tag = "span",
  playOnHover = false,
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [glitching, setGlitching] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setGlitching(false), 900);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const handleMouseEnter = () => {
    if (reducedMotion || !playOnHover) return;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 600);
  };

  return (
    <Tag
      className={`glitch-text ${glitching ? "is-glitching" : ""} ${className}`.trim()}
      data-text={typeof children === "string" ? children : undefined}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Tag>
  );
}
