"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import styles from "./LogoLoop.module.css";

export default function LogoLoop({
  children,
  speed = 30, // seconds per loop cycle
  direction = "left",
  gap = 24,
  fade = true,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.staticContainer} style={{ gap: `${gap}px` }}>
        {children}
      </div>
    );
  }

  // If user requests reduced motion, display items in a simple static wrapped row
  if (prefersReducedMotion) {
    return (
      <div className={styles.staticContainer} style={{ gap: `${gap}px` }}>
        {children}
      </div>
    );
  }

  const loopClass = `${styles.track} ${
    direction === "right" ? styles.reverse : ""
  }`;

  return (
    <div
      className={`${styles.container} ${fade ? styles.fade : ""}`}
      style={{
        "--gap": `${gap}px`,
        "--speed": `${speed}s`,
      }}
    >
      <div className={loopClass}>
        {/* Render primary list */}
        <div className={styles.group}>{children}</div>
        {/* Render duplicate list for seamless looping */}
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
