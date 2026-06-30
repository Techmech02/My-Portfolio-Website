"use client";

import content from "@/data/content.json";
import SkillBar from "@/components/ui/SkillBar";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import styles from "./About.module.css";

export default function About() {
  // Main skills with levels for the progress bar display
  const primarySkills = [
    { name: "Python / AI / ML", level: 85 },
    { name: "Deep Learning & LSTM Modelling", level: 80 },
    { name: "AWS Cloud (boto3, SageMaker)", level: 75 },
    { name: "DevOps & Pipelines (DVC, Git)", level: 70 },
    { name: "Backend APIs (Flask, FastAPI)", level: 78 },
  ];

  return (
    <section className={styles.about} id="about">
      <div className="container">
        <SectionHeading
          title="About Me"
          subtitle="Overview"
          align="left"
        />

        <div className={styles.grid}>
          {/* Left Column: Bio and Education */}
          <div className={styles.leftCol}>
            <FadeIn direction="up" delay={0.1}>
              <p className={styles.bioText}>{content.bio}</p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} className={styles.educationWrapper}>
              <GlassCard hoverEffect={true} className={styles.eduCard}>
                <h3 className={styles.eduTitle}>Education</h3>
                <div className={styles.eduItem}>
                  <p className={styles.eduDegree}>{content.education.degree}</p>
                  <p className={styles.eduInstitution}>
                    {content.education.institution}
                  </p>
                  <div className={styles.eduMeta}>
                    <span>{content.education.expected}</span>
                    <span className={styles.eduSeparator}>•</span>
                    <span className={styles.eduCgpa}>CGPA: {content.education.cgpa}</span>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} className={styles.cvWrapper}>
              <Button href="/resume.pdf" variant="primary" size="md">
                Download Full Resume (PDF)
              </Button>
            </FadeIn>
          </div>

          {/* Right Column: Skill metrics */}
          <div className={styles.rightCol}>
            <FadeIn direction="up" delay={0.15}>
              <h3 className={styles.sectionSub}>Core Capabilities</h3>
              <div className={styles.skillBars}>
                {primarySkills.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </FadeIn>

            {/* Structured quick tags */}
            <FadeIn direction="up" delay={0.25} className={styles.tagSection}>
              <h4 className={styles.tagTitle}>Technical Specializations</h4>
              <div className={styles.tagGrid}>
                {Object.entries(content.skillCategories).map(([category, items], catIdx) => (
                  <div key={catIdx} className={styles.tagGroup}>
                    <span className={styles.groupLabel}>{category}:</span>
                    <div className={styles.tags}>
                      {items.map((item, itemIdx) => (
                        <span key={itemIdx} className={styles.tag}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
