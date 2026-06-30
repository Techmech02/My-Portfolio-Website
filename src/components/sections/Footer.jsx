import content from "@/data/content.json";
import GradientText from "@/components/animations/GradientText";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.logo}>
          <GradientText speed={6}>SB.</GradientText>
        </div>

        <p className={styles.copyright}>
          &copy; {currentYear} Sagar Bhati · Ajmer, India. All rights reserved.
        </p>

        <ul className={styles.links} role="list">
          <li>
            <a
              href={content.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={content.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${content.contactEmail}`} className={styles.link}>
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
