import { useEffect, useRef, useState } from "react";
import { ViewTransition } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function AnimatedSection({
  children,
  className = "",
  name = "reveal-item",
  as: Tag = "div",
  threshold = 0.08,
  ...rest
}) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  const content = (
    <Tag
      ref={ref}
      className={`animated-section ${visible ? "is-visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );

  if (reducedMotion) return content;

  return (
    <ViewTransition name={name} enter="auto" default="none">
      {content}
    </ViewTransition>
  );
}
