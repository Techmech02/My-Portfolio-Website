"use client";

import { useEffect, useRef } from "react";
import content from "@/data/content.json";
import { typewriterWords } from "@/data/modalData";
import Typewriter from "@/components/animations/Typewriter";
import GlitchText from "@/components/animations/GlitchText";
import GradientText from "@/components/animations/GradientText";
import NeuralNetwork from "@/components/canvas/NeuralNetwork";
import MagneticElement from "@/components/animations/MagneticElement";
import Button from "@/components/ui/Button";
import useCountUp from "@/hooks/useCountUp";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef(null);

  // Setup cursor glow coordinate updates
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate stats
  const [yearsRef, yearsValue] = useCountUp(content.stats.yearsBuilding);
  const [projectsRef, projectsValue] = useCountUp(content.stats.projectsShipped);
  const [liveRef, liveValue] = useCountUp(content.stats.liveProducts);

  return (
    <section ref={containerRef} className={styles.hero} id="hero">
      {/* Dynamic Canvas Background */}
      <NeuralNetwork />

      {/* Ambient hover glow */}
      <div className={styles.glow} />

      <div className={`${styles.inner} container`}>
        <div className={styles.content}>
          <div className={styles.badgeWrapper}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Available for AI/ML Roles</span>
          </div>

          <h1 className={styles.title}>
            Hi, I&apos;m{" "}
            <span className={styles.name}>
              <GlitchText text="Sagar Bhati" />
            </span>
          </h1>

          <h2 className={styles.subtitle}>
            Building intelligent{" "}
            <Typewriter words={typewriterWords} />
          </h2>

          <p className={styles.desc}>{content.tagline}</p>

          <div className={styles.actions}>
            <MagneticElement>
              <Button href="#projects" variant="primary" size="lg">
                View Work
              </Button>
            </MagneticElement>
            <MagneticElement>
              <Button href="#contact" variant="secondary" size="lg">
                Get In Touch
              </Button>
            </MagneticElement>
          </div>

          {/* Stats Counters */}
          <div className={styles.stats}>
            <div className={styles.statCard} ref={yearsRef}>
              <span className={styles.statNum}>{yearsValue}+</span>
              <span className={styles.statLabel}>Years Building</span>
            </div>
            <div className={styles.statCard} ref={projectsRef}>
              <span className={styles.statNum}>{projectsValue}+</span>
              <span className={styles.statLabel}>AI/ML Projects</span>
            </div>
            <div className={styles.statCard} ref={liveRef}>
              <span className={styles.statNum}>{liveValue}+</span>
              <span className={styles.statLabel}>Deployed Agents</span>
            </div>
          </div>
        </div>

        {/* Visual Graphic Area (SVG portrait/avatar in floating box) */}
        <div className={styles.graphicArea}>
          <div className={`${styles.avatarFrame} animate-float`}>
            <div className={styles.avatarGlass}>
              {/* Hand-drawn futuristic cyber theme inline SVG */}
              <svg
                viewBox="0 0 200 200"
                className={styles.avatarSvg}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="85" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 5" />
                <circle cx="100" cy="100" r="75" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1" />
                
                {/* Circuit lines */}
                <path d="M40 100 H160" stroke="rgba(124, 106, 255, 0.15)" strokeWidth="1" />
                <path d="M100 40 V160" stroke="rgba(124, 106, 255, 0.15)" strokeWidth="1" />
                
                {/* Face silhouette placeholder */}
                <path
                  d="M100 60 C80 60 70 75 70 95 C70 120 85 135 100 135 C115 135 130 120 130 95 C130 75 120 60 100 60 Z"
                  fill="rgba(124, 106, 255, 0.1)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                
                {/* Shoulders */}
                <path
                  d="M60 160 C60 145 75 140 100 140 C125 140 140 145 140 160"
                  fill="rgba(0, 212, 255, 0.08)"
                  stroke="var(--accent-2)"
                  strokeWidth="2"
                />
                
                {/* Node dots */}
                <circle cx="100" cy="60" r="4" fill="var(--accent-3)" />
                <circle cx="70" cy="95" r="4" fill="var(--accent-2)" />
                <circle cx="130" cy="95" r="4" fill="var(--accent-2)" />
                
                {/* Digital overlay text */}
                <text x="50%" y="175" dominantBaseline="middle" textAnchor="middle" fill="var(--accent-2)" fontSize="10" fontFamily="var(--font-mono)">
                  &lt; AI_CORE_ACTIVE &gt;
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <a href="#about" aria-label="Scroll to About section">
          <span className={styles.mouse}>
            <span className={styles.wheel} />
          </span>
        </a>
      </div>
    </section>
  );
}
