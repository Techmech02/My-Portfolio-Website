/**
 * LogoLoop — adapted from React Bits (reactbits.dev/animations/logo-loop)
 * Infinite horizontal marquee of logos/icons using a duplicated track + CSS
 * keyframe translateX. Pauses on hover/focus. Respects prefers-reduced-motion
 * (track becomes a static wrapped row).
 *
 * items: [{ label, node }] — node is any renderable (svg, emoji, text)
 */
export default function LogoLoop({
  items = [],
  speed = 28,
  direction = "left",
  gap = 48,
  fade = true,
  className = "",
}) {
  const animationName = direction === "right" ? "logo-loop-right" : "logo-loop-left";

  return (
    <div className={`logo-loop ${fade ? "logo-loop-fade" : ""} ${className}`.trim()}>
      <div
        className="logo-loop-track"
        style={{
          animationName,
          animationDuration: `${speed}s`,
          gap: `${gap}px`,
        }}
      >
        {items.map((item, i) => (
          <div className="logo-loop-item" key={`a-${item.label}-${i}`} title={item.label}>
            {item.node}
            <span className="logo-loop-label">{item.label}</span>
          </div>
        ))}
        {items.map((item, i) => (
          <div className="logo-loop-item logo-loop-item-dup" key={`b-${item.label}-${i}`} title={item.label} aria-hidden="true">
            {item.node}
            <span className="logo-loop-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
