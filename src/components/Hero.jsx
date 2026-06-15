import { useRef } from "react";
import Typewriter from "./Typewriter";
import GradientText from "./GradientText";
import GlitchText from "./GlitchText";
import siteContent from "../data/content.json";
import { useCountUp } from "../hooks/useCountUp";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function Hero() {
  const { contactEmail, stats } = siteContent;
  const heroRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const [projectsRef, projectsCount] = useCountUp(stats.projectsShipped);
  const [semestersRef, semestersCount] = useCountUp(stats.semestersStudied);

  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      className="hero"
      id="home"
      aria-label="Hero section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      <div className="hero-bg" aria-hidden="true">
        <svg className="hero-shape" viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="g1" cx="70%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0A0A0F" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2" cx="20%" cy="80%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0A0A0F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="900" height="700" fill="#0A0A0F" />
          <ellipse cx="650" cy="280" rx="420" ry="380" fill="url(#g1)" />
          <ellipse cx="150" cy="580" rx="300" ry="260" fill="url(#g2)" />
          <circle cx="700" cy="120" r="2" fill="#6C63FF" opacity="0.6" />
          <circle cx="820" cy="250" r="1.5" fill="#6C63FF" opacity="0.4" />
          <circle cx="760" cy="380" r="1" fill="#fff" opacity="0.3" />
          <circle cx="680" cy="480" r="2.5" fill="#00D4FF" opacity="0.3" />
          <circle cx="150" cy="200" r="1.5" fill="#fff" opacity="0.2" />
          <circle cx="80" cy="400" r="1" fill="#6C63FF" opacity="0.3" />
          <line x1="600" y1="100" x2="800" y2="180" stroke="#6C63FF" strokeWidth="0.5" opacity="0.2" />
          <line x1="750" y1="200" x2="860" y2="320" stroke="#6C63FF" strokeWidth="0.5" opacity="0.15" />
        </svg>
      </div>
      <div className="hero-cursor-glow" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="dot-live" aria-hidden="true"></span>
            Available for opportunities
          </div>
          <div className="hero-name">
            <GradientText
              as="span"
              className="hero-name-text"
              colors={["#6C63FF", "#00D4FF", "#4ade80", "#6C63FF"]}
              animationSpeed={8}
            >
              TechGod
            </GradientText>
            <span className="hero-name-sub mono">
              <GlitchText as="span">AI Agent Engineer</GlitchText>
            </span>
          </div>
          <h1 className="hero-heading">
            Building things
            <br />
            that actually
            <br />
            <Typewriter />
          </h1>
          <p className="hero-tagline">
            CSE student at MITRC, Alwar — shipping AI/ML products, full-stack apps, and
            open-source tools. I don&apos;t wait for the degree.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href={`mailto:${contactEmail}`} className="btn btn-ghost">
              Download CV
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num" ref={projectsRef}>{projectsCount}+</span>
              <span className="stat-label">Projects shipped</span>
            </div>
            <div className="stat">
              <span className="stat-num" ref={semestersRef}>{semestersCount}</span>
              <span className="stat-label">Semesters building</span>
            </div>
            <div className="stat">
              <span className="stat-num">∞</span>
              <span className="stat-label">Ambition</span>
            </div>
          </div>
        </div>
        <div className="hero-avatar-wrap" aria-hidden="true">
          <div className="avatar-glow"></div>
          <div className="avatar-ring">
            <svg className="avatar-svg" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="circle-clip">
                  <circle cx="160" cy="160" r="148" />
                </clipPath>
                <linearGradient id="av-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A1A2E" />
                  <stop offset="100%" stopColor="#16213E" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="160" r="148" fill="url(#av-bg)" stroke="#6C63FF" strokeWidth="1.5" opacity="0.6" />
              <g clipPath="url(#circle-clip)">
                <rect x="80" y="210" width="160" height="120" rx="20" fill="#6C63FF" opacity="0.9" />
                <rect x="140" y="185" width="40" height="35" rx="8" fill="#C9A882" />
                <ellipse cx="160" cy="155" rx="58" ry="62" fill="#C9A882" />
                <ellipse cx="160" cy="100" rx="58" ry="38" fill="#1A1A1A" />
                <rect x="102" y="100" width="16" height="35" rx="8" fill="#1A1A1A" />
                <rect x="182" y="100" width="16" height="35" rx="8" fill="#1A1A1A" />
                <ellipse cx="140" cy="155" rx="10" ry="11" fill="#fff" />
                <ellipse cx="180" cy="155" rx="10" ry="11" fill="#fff" />
                <circle cx="143" cy="157" r="6" fill="#1A1A1A" />
                <circle cx="183" cy="157" r="6" fill="#1A1A1A" />
                <circle cx="145" cy="155" r="2" fill="#fff" />
                <circle cx="185" cy="155" r="2" fill="#fff" />
                <ellipse cx="160" cy="170" rx="5" ry="4" fill="#B8906A" />
                <path d="M148 182 Q160 192 172 182" stroke="#7A5C3C" strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="105" y="235" width="110" height="70" rx="6" fill="#0A0A0F" opacity="0.8" />
                <rect x="110" y="240" width="100" height="58" rx="4" fill="#1A1A2E" />
                <rect x="118" y="248" width="40" height="3" rx="1.5" fill="#6C63FF" opacity="0.8" />
                <rect x="118" y="255" width="60" height="3" rx="1.5" fill="#00D4FF" opacity="0.6" />
                <rect x="118" y="262" width="30" height="3" rx="1.5" fill="#6C63FF" opacity="0.5" />
                <rect x="118" y="269" width="50" height="3" rx="1.5" fill="#fff" opacity="0.3" />
                <rect x="118" y="276" width="45" height="3" rx="1.5" fill="#00D4FF" opacity="0.4" />
              </g>
            </svg>
          </div>
          <div className="avatar-badge">
            <span className="mono">CSE · 6th Sem</span>
          </div>
        </div>
      </div>
    </section>
  );
}
