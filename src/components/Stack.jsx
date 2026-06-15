import AnimatedSection from "./AnimatedSection";
import LogoLoop from "./LogoLoop";

const stackGroups = [
  {
    label: "AI / ML",
    items: [
      { label: "Python", text: "Py" },
      { label: "TensorFlow", text: "TF" },
      { label: "Ollama", text: "OLLA" },
      { label: "RAG / LLMs", text: "RAG", color: "#4ade80" },
    ],
  },
  {
    label: "Backend",
    items: [
      { label: "FastAPI", text: "FAPI" },
      { label: "Java", text: "Java", color: "#ff6b6b" },
      { label: "MongoDB", text: "Mongo", color: "#4DB33D", size: 7 },
      { label: "SQL", text: "SQL", color: "#FF4438" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Docker", text: "🐳", color: "#2496ED" },
      { label: "AWS", text: "AWS", color: "#FF9900" },
      { label: "Git", text: "Git", color: "#F05032" },
      { label: "Airflow", text: "Flow" },
    ],
  },
];

function StackIcon({ item, bare = false }) {
  const fontSize = item.size ?? 8;
  const color = item.color ?? "#6C63FF";

  const svg = (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#1A1A2E" />
      <text
        x="20"
        y="24"
        textAnchor="middle"
        fontFamily="Space Grotesk"
        fontSize={fontSize}
        fontWeight="700"
        fill={color}
      >
        {item.text}
      </text>
    </svg>
  );

  if (bare) return svg;

  return (
    <div className="stack-icon">
      {svg}
      <span>{item.label}</span>
    </div>
  );
}

export default function Stack() {
  return (
    <section className="section section-alt" id="stack" aria-label="Tech stack section">
      <div className="container">
        <div className="section-label">
          <span className="mono accent">03</span> Stack
        </div>
        <h2 className="section-heading">What I build with</h2>
        <LogoLoop
          items={stackGroups.flatMap((g) => g.items).map((item) => ({
            label: item.label,
            node: <StackIcon item={item} bare />,
          }))}
          speed={32}
          className="stack-loop"
        />
        <div className="stack-groups">
          {stackGroups.map((group) => (
            <AnimatedSection key={group.label} className="stack-group" name={`stack-${group.label}`}>
              <h3 className="stack-group-label">{group.label}</h3>
              <div className="stack-icons">
                {group.items.map((item) => (
                  <StackIcon key={item.label} item={item} />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
