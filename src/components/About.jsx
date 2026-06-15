import { useEffect, useRef } from "react";
import siteContent from "../data/content.json";

export default function About() {
  const barsRef = useRef([]);

  useEffect(() => {
    const bars = barsRef.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "bar-in 1.2s cubic-bezier(.22,1,.36,1) both";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    bars.forEach((bar) => {
      bar.style.animation = "none";
      observer.observe(bar);
    });

    return () => observer.disconnect();
  }, []);

  const { stats, skills } = siteContent;

  return (
    <section className="section" id="about" aria-label="About section">
      <div className="container">
        <div className="section-label">
          <span className="mono accent">01</span> About
        </div>
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-heading">
              I build things.
              <br />
              The rest follows.
            </h2>
            <p>
              6th semester CSE student at MITRC, Alwar — but my real education happens when
              I&apos;m debugging a FastAPI backend at 2am or shipping a Chrome extension that
              solves a problem nobody else noticed yet.
            </p>
            <p>
              I&apos;m pursuing a GenAI Engineer path with serious intent: RAG systems, agentic
              workflows, vector databases, and LLM API development. I don&apos;t collect
              certificates; I build proof.
            </p>
            <p>
              Long game: enough financial freedom to travel the world, eventually open an
              orphanage, and build things that expand access for people who don&apos;t usually get
              it.
            </p>
            <div className="quick-stats">
              <div className="qstat">
                <span className="qstat-num">{stats.yearsBuilding}+</span>
                <span className="qstat-desc">Years coding</span>
              </div>
              <div className="qstat">
                <span className="qstat-num">{stats.projectsShipped}+</span>
                <span className="qstat-desc">Projects shipped</span>
              </div>
              <div className="qstat">
                <span className="qstat-num">{stats.liveProducts}</span>
                <span className="qstat-desc">Live products</span>
              </div>
            </div>
          </div>
          <div className="about-skills">
            <h3 className="skills-heading">Core skills</h3>
            <div className="skill-bars">
              {skills.map((skill, i) => (
                <div className="skill-bar-item" key={skill.name}>
                  <div className="skill-meta">
                    <span>{skill.name}</span>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div className="bar-track">
                    <div
                      ref={(el) => {
                        barsRef.current[i] = el;
                      }}
                      className="bar-fill"
                      style={{ "--pct": `${skill.level}%` }}
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} ${skill.level}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
