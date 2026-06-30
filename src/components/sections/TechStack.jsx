"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import LogoLoop from "@/components/animations/LogoLoop";
import FadeIn from "@/components/animations/FadeIn";
import useTilt from "@/hooks/useTilt";
import styles from "./TechStack.module.css";

// Separate small components for each tilted category block to use separate hook instances
function StackCategoryCard({ category, items, glowColor, delay }) {
  const tiltRef = useTilt({ max: 5, scale: 1.01 });

  return (
    <FadeIn direction="up" delay={delay}>
      <div ref={tiltRef} style={{ height: "100%" }}>
        <GlassCard 
          hoverEffect={true} 
          className={styles.card}
          style={{ "--card-glow": glowColor }}
        >
          <h3 className={styles.cardTitle}>{category}</h3>
          <ul className={styles.itemList}>
            {items.map((item, idx) => (
              <li key={idx} className={styles.item}>
                <span className={styles.bullet} />
                <span className={styles.itemName}>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </FadeIn>
  );
}

export default function TechStack() {
  const categories = [
    {
      name: "AI & Machine Learning",
      glowColor: "rgba(0, 212, 255, 0.15)", // Cyan glow
      items: ["Supervised & Unsupervised Learning", "Deep Learning & Neural Networks", "LSTM Time-Series Forecasting", "Data Analysis & Modelling"],
      delay: 0.1,
    },
    {
      name: "Frameworks & Libraries",
      glowColor: "rgba(124, 106, 255, 0.15)", // Purple glow
      items: ["TensorFlow & Keras", "scikit-learn", "Flask Backend", "boto3 (AWS Python SDK)"],
      delay: 0.2,
    },
    {
      name: "Cloud & DevOps",
      glowColor: "rgba(244, 114, 182, 0.15)", // Rose glow
      items: ["AWS Services (SageMaker, S3, EC2)", "DVC (Data Version Control)", "Git & CI/CD Pipelines", "n8n Workflow Automation"],
      delay: 0.3,
    },
    {
      name: "Computer Science Core",
      glowColor: "rgba(74, 222, 128, 0.15)", // Green glow
      items: ["Data Structures & Algorithms", "Operating Systems (OS)", "Computer Networks", "Database Systems (DBMS)"],
      delay: 0.4,
    },
  ];

  // Logos for marquee (abbreviations / texts representing tech symbols)
  const marqueeLogos = [
    { label: "Python", color: "var(--accent-2)" },
    { label: "TensorFlow", color: "#FF6F00" },
    { label: "Keras", color: "#D00000" },
    { label: "AWS", color: "#FF9900" },
    { label: "Flask", color: "#a5a5c5" },
    { label: "boto3", color: "var(--accent)" },
    { label: "Git", color: "#F05032" },
    { label: "DVC", color: "#9437FF" },
    { label: "n8n", color: "#FF6D5A" },
    { label: "Docker", color: "#2496ED" },
    { label: "FastAPI", color: "#009688" },
    { label: "SQLite", color: "#003B57" },
  ];

  const marqueeItems = marqueeLogos.map((logo, idx) => (
    <div 
      key={idx} 
      className={styles.marqueeItem}
      style={{ borderColor: logo.color }}
    >
      <span className={styles.logoLabel} style={{ color: logo.color }}>
        {logo.label}
      </span>
    </div>
  ));

  return (
    <section className={styles.stack} id="stack">
      <div className="container">
        <SectionHeading
          title="Technical Stack"
          subtitle="Skills"
          align="left"
        />

        {/* Top Marquee Loop */}
        <FadeIn direction="none" delay={0.05} className={styles.marqueeContainer}>
          <LogoLoop speed={32} gap={24} fade={true}>
            {marqueeItems}
          </LogoLoop>
        </FadeIn>

        {/* Bento Grid */}
        <div className={styles.grid}>
          {categories.map((cat, idx) => (
            <StackCategoryCard
              key={idx}
              category={cat.name}
              glowColor={cat.glowColor}
              items={cat.items}
              delay={cat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
