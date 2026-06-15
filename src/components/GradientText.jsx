/**
 * GradientText — adapted from React Bits (reactbits.dev/text-animations/gradient-text)
 * CSS-only animated gradient sweep using background-clip: text.
 * No external deps. Respects prefers-reduced-motion (gradient becomes static).
 */
export default function GradientText({
  children,
  colors = ["#6C63FF", "#00D4FF", "#6C63FF"],
  animationSpeed = 6,
  showBorder = false,
  className = "",
  as: Tag = "span",
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <Tag
      className={`gradient-text ${showBorder ? "gradient-text-border" : ""} ${className}`.trim()}
      style={{
        backgroundImage: gradient,
        animationDuration: `${animationSpeed}s`,
      }}
    >
      {children}
    </Tag>
  );
}
