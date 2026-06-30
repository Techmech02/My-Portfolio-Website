import styles from "./GlassCard.module.css";

export default function GlassCard({ children, className = "", hoverEffect = true, style = {} }) {
  return (
    <div 
      className={`${styles.card} ${hoverEffect ? styles.hoverable : ""} ${className}`}
      style={style}
    >
      <div className={styles.noise} />
      <div className={styles.glow} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
