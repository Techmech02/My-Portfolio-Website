"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import styles from "./GlitchText.module.css";

export default function GlitchText({
  text,
  playOnHover = true,
  className = "",
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Trigger glitch on mount
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 900);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => {
    if (!playOnHover || prefersReducedMotion || isGlitching) return;
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 600);
  };

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`${styles.glitch} ${isGlitching ? styles.active : ""} ${className}`}
      data-text={text}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </span>
  );
}
