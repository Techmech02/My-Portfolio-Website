import styles from "./SectionHeading.module.css";

export default function SectionHeading({ title, subtitle, align = "left" }) {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.decorator}>
        <span className={styles.line} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
