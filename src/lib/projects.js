import content from "@/data/content.json";
import { modalData } from "@/data/modalData";

/**
 * Merges content.json project data with detailed case studies from modalData.js.
 */
export function getAllProjects() {
  return content.projects.map((project) => {
    const details = modalData[project.id] || {};
    return {
      ...project,
      slug: project.id,
      sub: details.sub || "",
      challenge: details.challenge || "",
      approach: details.approach || "",
      outcome: details.outcome || "",
      detailedTech: details.tech || project.tech,
    };
  });
}

export function getProjectBySlug(slug) {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug);
}
