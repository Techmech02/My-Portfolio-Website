import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import styles from "./page.module.css";

// Generate static parameters for all project routes during next build (SSG)
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.noise} />
      <div className={`${styles.container} container`}>
        {/* Breadcrumb navigation */}
        <div className={styles.breadcrumbs}>
          <Link href="/#projects" className={styles.backLink}>
            &larr; Back to Neural Core
          </Link>
        </div>

        <article className={styles.article}>
          {/* Header Card */}
          <GlassCard hoverEffect={false} className={styles.headerCard}>
            <div className={styles.headerMeta}>
              <span className={styles.roleLabel}>ROLE:</span>
              <span className={styles.roleValue}>{project.role}</span>
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.subtitle}>{project.sub}</p>

            <div className={styles.badgeList}>
              {project.detailedTech.map((t, idx) => (
                <Badge key={idx} variant="accent">
                  {t}
                </Badge>
              ))}
            </div>
          </GlassCard>

          {/* Detailed sections */}
          <div className={styles.contentGrid}>
            {/* The Problem / Challenge */}
            <GlassCard hoverEffect={false} className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>01 //</span> The Challenge
              </h2>
              <p className={styles.sectionText}>{project.challenge}</p>
            </GlassCard>

            {/* The Approach / Architecture */}
            <GlassCard hoverEffect={false} className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>02 //</span> The Approach
              </h2>
              <p className={styles.sectionText}>{project.approach}</p>
            </GlassCard>

            {/* Outcome / Results */}
            <GlassCard hoverEffect={false} className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>03 //</span> The Outcome
              </h2>
              <p className={styles.sectionText}>{project.outcome}</p>
            </GlassCard>
          </div>

          <div className={styles.actions}>
            <Button href="/#projects" variant="primary" size="md">
              Return to Projects
            </Button>
          </div>
        </article>
      </div>
    </main>
  );
}
