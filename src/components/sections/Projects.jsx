"use client";

import { getAllProjects } from "@/lib/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import useTilt from "@/hooks/useTilt";
import styles from "./Projects.module.css";

function ProjectCard({ project, index }) {
  const tiltRef = useTilt({ max: 4, scale: 1.01 });

  // Custom visual background SVGs representing the project concepts
  const renderVisual = (id) => {
    if (id === "ai-resource-optimization") {
      return (
        <svg viewBox="0 0 400 180" className={styles.cardSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          <path d="M 0 30 H 400" stroke="rgba(0, 212, 255, 0.05)" />
          <path d="M 0 90 H 400" stroke="rgba(0, 212, 255, 0.05)" />
          <path d="M 0 150 H 400" stroke="rgba(0, 212, 255, 0.05)" />
          
          {/* CPU / Wave lines (LSTM representation) */}
          <path
            d="M 10 90 Q 50 20, 100 140 T 200 60 T 300 120 T 390 90"
            stroke="url(#gradient-cyan)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 10 90 Q 50 40, 100 120 T 200 80 T 300 100 T 390 90"
            stroke="rgba(124, 106, 255, 0.3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          
          {/* Prediction dots */}
          <circle cx="100" cy="140" r="5" fill="var(--accent-2)" />
          <circle cx="200" cy="60" r="5" fill="var(--accent-2)" />
          <circle cx="300" cy="120" r="5" fill="var(--accent-2)" />
          
          <defs>
            <linearGradient id="gradient-cyan" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent)" />
              <stop offset="0.5" stopColor="var(--accent-2)" />
              <stop offset="1" stopColor="var(--accent-3)" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
    if (id === "ghost-audit") {
      return (
        <svg viewBox="0 0 400 180" className={styles.cardSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Node boxes representing AWS servers */}
          <rect x="40" y="30" width="80" height="40" rx="4" fill="rgba(124, 106, 255, 0.05)" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="280" y="30" width="80" height="40" rx="4" fill="rgba(124, 106, 255, 0.05)" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="160" y="110" width="80" height="40" rx="4" fill="rgba(0, 212, 255, 0.05)" stroke="var(--accent-2)" strokeWidth="1.5" />
          
          {/* Server details */}
          <line x1="50" y1="45" x2="70" y2="45" stroke="var(--accent-3)" strokeWidth="2" />
          <line x1="50" y1="55" x2="90" y2="55" stroke="var(--text-muted)" strokeWidth="1.5" />
          
          <line x1="290" y1="45" x2="310" y2="45" stroke="var(--accent-3)" strokeWidth="2" />
          <line x1="290" y1="55" x2="330" y2="55" stroke="var(--text-muted)" strokeWidth="1.5" />

          <line x1="170" y1="125" x2="190" y2="125" stroke="var(--success)" strokeWidth="2" />
          <line x1="170" y1="135" x2="210" y2="135" stroke="var(--text-muted)" strokeWidth="1.5" />
          
          {/* Alert dot warning of cost waste */}
          <circle cx="345" cy="45" r="4" fill="var(--error)" />

          {/* Connection vectors */}
          <path d="M 120 50 L 200 110" stroke="rgba(124, 106, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 280 50 L 200 110" stroke="rgba(124, 106, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      );
    }
    if (id === "adaptive-mcq-system") {
      return (
        <svg viewBox="0 0 400 180" className={styles.cardSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flow nodes (Item Response Theory visual) */}
          <circle cx="80" cy="90" r="16" fill="rgba(124, 106, 255, 0.05)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="200" cy="50" r="16" fill="rgba(0, 212, 255, 0.05)" stroke="var(--accent-2)" strokeWidth="1.5" />
          <circle cx="200" cy="130" r="16" fill="rgba(244, 114, 182, 0.05)" stroke="var(--accent-3)" strokeWidth="1.5" />
          <circle cx="320" cy="90" r="16" fill="rgba(74, 222, 128, 0.05)" stroke="var(--success)" strokeWidth="1.5" />
          
          {/* Question Level labels inside circles */}
          <text x="80" y="93" fill="var(--text)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Q1</text>
          <text x="200" y="53" fill="var(--text)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Q2+</text>
          <text x="200" y="133" fill="var(--text)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Q2-</text>
          <text x="320" y="93" fill="var(--text)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">End</text>

          {/* Paths */}
          <path d="M 96 90 L 184 50" stroke="var(--accent-2)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 96 90 L 184 130" stroke="var(--accent-3)" strokeWidth="1.5" />
          <path d="M 216 50 L 304 90" stroke="var(--success)" strokeWidth="1.5" />
          <path d="M 216 130 L 304 90" stroke="var(--success)" strokeWidth="1.5" />
        </svg>
      );
    }
    return null;
  };

  // Bento layout classes: alternate width depending on index
  const isLarge = index === 0;
  const cardClass = `${styles.cardWrapper} ${isLarge ? styles.largeCard : ""}`;

  return (
    <FadeIn direction="up" delay={index * 0.15} className={cardClass}>
      <div ref={tiltRef} style={{ height: "100%" }}>
        <GlassCard hoverEffect={true} className={styles.projectCard}>
          {/* Card Graphic visual representation of ML concepts */}
          <div className={styles.visualContainer}>
            {renderVisual(project.slug)}
            <div className={styles.visualGlow} />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <span className={styles.role}>{project.role}</span>
              {project.featuredBadge && (
                <Badge variant="highlight">{project.featuredBadge}</Badge>
              )}
            </div>

            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.summary}>{project.summary}</p>

            <div className={styles.techWrapper}>
              {project.tech.map((t, idx) => (
                <Badge key={idx} variant="accent">
                  {t}
                </Badge>
              ))}
            </div>

            <div className={styles.cardActions}>
              <Button href={`/projects/${project.slug}`} variant="secondary" size="sm">
                Case Study
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </FadeIn>
  );
}

export default function Projects() {
  const projects = getAllProjects();

  return (
    <section className={styles.projects} id="projects">
      <div className="container">
        <SectionHeading
          title="Featured Work"
          subtitle="Projects"
          align="left"
        />

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
