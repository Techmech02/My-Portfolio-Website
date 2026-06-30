import { useEffect, useState } from "react";

/**
 * Custom hook to spy on scrolling and return the ID of the currently active section.
 * @param {string[]} sectionIds - Array of section element IDs (e.g. ['hero', 'about', 'stack'])
 * @param {object} options - IntersectionObserver configurations
 */
export default function useActiveSection(sectionIds, options = { rootMargin: "-30% 0px -60% 0px" }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
}
