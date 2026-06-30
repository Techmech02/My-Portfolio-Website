import styles from "./GradientText.module.css";

export default function GradientText({
  children,
  className = "",
  speed = 8,
}) {
  return (
    <span 
      className={`${styles.text} ${className}`}
      style={{ "--gradient-speed": `${speed}s` }}
    >
      {children}
    </span>
  );
}
