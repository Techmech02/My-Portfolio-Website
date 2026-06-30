"use client";

import content from "@/data/content.json";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import styles from "./Blog.module.css";

export default function Blog() {
  return (
    <section className={styles.blog} id="blog">
      <div className="container">
        <SectionHeading
          title="Technical Notes"
          subtitle="Articles"
          align="left"
        />

        <div className={styles.grid}>
          {content.blog.map((post, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.15}>
              <GlassCard hoverEffect={true} className={styles.card}>
                <div className={styles.meta}>
                  <span className={styles.tag}>{post.tag}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.action}>
                  <Button href={post.url} variant="text" size="sm" external={true}>
                    Read Article &rarr;
                  </Button>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
