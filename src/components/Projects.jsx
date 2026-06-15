import { startTransition } from "react";
import AnimatedSection from "./AnimatedSection";
import siteContent from "../data/content.json";

const galleryItems = [
  { id: "modal-1", title: "GST Explainer", ariaLabel: "GST Notice Explainer project" },
  { id: "modal-2", title: "ElectroAI", ariaLabel: "Trades AI for Electricians project" },
  { id: "modal-3", title: "This Portfolio", ariaLabel: "Portfolio website project" },
  { id: "modal-4", title: "JSF Web App", ariaLabel: "Java web app project" },
  { id: "modal-5", title: "AlgoViz", ariaLabel: "Algorithm visualizer project" },
  { id: "modal-6", title: "CLI Toolset", ariaLabel: "Open source CLI tool project" },
];

const featuredMeta = [
  {
    tags: ["FastAPI", "AWS", "Airflow", "Docker", "B2B SaaS"],
    thumbStyle: { background: "linear-gradient(135deg, #0D0D1A 0%, #1A0D2E 50%, #0D1A1A 100%)" },
    caseStudyLabel: "View GhostAudit case study",
  },
  {
    tags: ["Chrome Extension", "FastAPI", "Ollama", "LLM"],
    thumbStyle: { background: "linear-gradient(135deg, #0A1A0D 0%, #0D1A2E 50%, #1A0A0D 100%)" },
    caseStudyLabel: "View TruthLens case study",
  },
  {
    tags: ["Python", "LSTM", "TensorFlow", "NumPy"],
    thumbStyle: { background: "linear-gradient(135deg, #0D1A0A 0%, #1A1A0A 50%, #0A0D1A 100%)" },
    caseStudyLabel: "View LSTM project case study",
  },
];

export default function Projects({ onOpenModal }) {
  const featured = siteContent.projects.slice(0, 3);

  const openModal = (id) => {
    startTransition(() => onOpenModal(id));
  };

  return (
    <section className="section" id="projects" aria-label="Projects section">
      <div className="container">
        <div className="section-label">
          <span className="mono accent">02</span> Work
        </div>
        <h2 className="section-heading">Projects that ship</h2>
        <div className="projects-featured">
          {featured.map((project, i) => {
            const meta = featuredMeta[i];
            return (
              <AnimatedSection
                key={project.title}
                as="article"
                className="project-card featured"
                name={`project-card-${i}`}
                threshold={0.08}
                tabIndex={0}
                aria-label={`${project.title} project`}
              >
                <div
                  className="project-thumb"
                  style={meta.thumbStyle}
                  aria-hidden="true"
                >
                  <FeaturedThumb index={i} />
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    {meta.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-meta">
                    <span className="project-role">{project.role}</span>
                  </div>
                  <a href="#" className="btn btn-outline" aria-label={meta.caseStudyLabel}>
                    Case Study →
                  </a>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <h3 className="gallery-heading">More work</h3>
        <div className="projects-gallery">
          {galleryItems.map((item) => (
            <AnimatedSection
              key={item.id}
              as="button"
              type="button"
              className="gallery-thumb"
              name={`gallery-${item.id}`}
              aria-label={item.ariaLabel}
              onClick={() => openModal(item.id)}
            >
              <GalleryThumb id={item.id} />
              <span className="thumb-title">{item.title}</span>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedThumb({ index }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 560 316" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
        <rect width="560" height="316" fill="transparent" />
        <rect x="30" y="40" width="180" height="120" rx="8" fill="#1A1A2E" stroke="#6C63FF" strokeWidth="1" opacity="0.7" />
        <text x="48" y="65" fontFamily="JetBrains Mono" fontSize="9" fill="#6C63FF">$ ghost-audit scan</text>
        <text x="48" y="82" fontFamily="JetBrains Mono" fontSize="8" fill="#00D4FF">→ Scanning AWS...</text>
        <text x="48" y="96" fontFamily="JetBrains Mono" fontSize="8" fill="#ff6b6b">⚠ Idle EC2: $340/mo</text>
        <text x="48" y="110" fontFamily="JetBrains Mono" fontSize="8" fill="#ff6b6b">⚠ Orphan EBS: $89/mo</text>
        <text x="48" y="124" fontFamily="JetBrains Mono" fontSize="8" fill="#4ade80">✓ Savings: $429/mo</text>
        <rect x="240" y="20" width="140" height="80" rx="6" fill="#6C63FF" opacity="0.15" stroke="#6C63FF" strokeWidth="0.5" />
        <text x="310" y="55" textAnchor="middle" fontFamily="Inter" fontSize="22" fontWeight="700" fill="#6C63FF">$429</text>
        <text x="310" y="72" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#F0F0FF" opacity="0.7">saved/month</text>
        <circle cx="430" cy="80" r="50" fill="none" stroke="#6C63FF" strokeWidth="2" opacity="0.3" />
        <circle cx="430" cy="80" r="50" fill="none" stroke="#6C63FF" strokeWidth="4" strokeDasharray="220" strokeDashoffset="55" opacity="0.7" />
        <text x="430" y="76" textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="700" fill="#fff">75%</text>
        <text x="430" y="91" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="#F0F0FF" opacity="0.6">waste detected</text>
        <text x="30" y="240" fontFamily="Space Grotesk" fontSize="18" fontWeight="700" fill="#F0F0FF">GhostAudit</text>
        <text x="30" y="258" fontFamily="Inter" fontSize="10" fill="#F0F0FF" opacity="0.5">AI Cloud Cost Leak Detector</text>
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 560 316" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
        <rect width="560" height="316" fill="transparent" />
        <rect x="20" y="30" width="300" height="180" rx="8" fill="#1A1A2E" stroke="#2A2A4A" strokeWidth="1" />
        <rect x="20" y="30" width="300" height="28" rx="8" fill="#0A0A0F" />
        <circle cx="38" cy="44" r="5" fill="#ff5f57" />
        <circle cx="54" cy="44" r="5" fill="#febc2e" />
        <circle cx="70" cy="44" r="5" fill="#28c840" />
        <rect x="240" y="60" width="140" height="160" rx="6" fill="#0A0A0F" stroke="#6C63FF" strokeWidth="1" />
        <text x="310" y="82" textAnchor="middle" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" fill="#F0F0FF">TruthLens</text>
        <circle cx="310" cy="135" r="30" fill="none" stroke="#1A1A2E" strokeWidth="6" />
        <circle cx="310" cy="135" r="30" fill="none" stroke="#ff6b6b" strokeWidth="6" strokeDasharray="188" strokeDashoffset="47" opacity="0.8" />
        <text x="310" y="131" textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="700" fill="#ff6b6b">73</text>
        <text x="30" y="240" fontFamily="Space Grotesk" fontSize="18" fontWeight="700" fill="#F0F0FF">TruthLens</text>
        <text x="30" y="258" fontFamily="Inter" fontSize="10" fill="#F0F0FF" opacity="0.5">AI Sycophancy Detector · Chrome Extension</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 560 316" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
      <rect width="560" height="316" fill="transparent" />
      <polyline points="30,180 80,160 130,170 180,120 230,130 280,100 330,110 380,80 430,90 480,60" fill="none" stroke="#6C63FF" strokeWidth="2" opacity="0.5" />
      <polyline points="30,200 80,185 130,190 180,165 230,170 280,145 330,155 380,130 430,140 480,115" fill="none" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
      <polyline points="480,60 510,45 540,35" fill="none" stroke="#6C63FF" strokeWidth="2" strokeDasharray="5,3" />
      <rect x="390" y="40" width="80" height="25" rx="4" fill="#6C63FF" opacity="0.2" stroke="#6C63FF" strokeWidth="0.5" />
      <text x="430" y="57" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#6C63FF">LSTM Model</text>
      <text x="30" y="260" fontFamily="Space Grotesk" fontSize="16" fontWeight="700" fill="#F0F0FF">LSTM Resource Optimizer</text>
      <text x="30" y="278" fontFamily="Inter" fontSize="9" fill="#F0F0FF" opacity="0.5">Predictive System Resource Management</text>
    </svg>
  );
}

function GalleryThumb({ id }) {
  const thumbs = {
    "modal-1": (
      <div className="thumb-img" style={{ background: "linear-gradient(135deg,#1A0D2E,#2E1A0D)" }}>
        <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect x="20" y="20" width="200" height="95" rx="6" fill="#1A1A2E" opacity="0.7" />
          <text x="120" y="48" textAnchor="middle" fontFamily="Space Grotesk" fontSize="11" fontWeight="700" fill="#FFB347">GST Notice</text>
          <text x="120" y="63" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="#F0F0FF" opacity="0.6">Explainer Wrapper</text>
        </svg>
      </div>
    ),
    "modal-2": (
      <div className="thumb-img" style={{ background: "linear-gradient(135deg,#0A1A0A,#1A1A0A)" }}>
        <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect x="20" y="20" width="200" height="95" rx="6" fill="#0D1A0D" opacity="0.7" />
          <text x="120" y="48" textAnchor="middle" fontFamily="Space Grotesk" fontSize="11" fontWeight="700" fill="#4ade80">ElectroAI</text>
        </svg>
      </div>
    ),
    "modal-3": (
      <div className="thumb-img" style={{ background: "linear-gradient(135deg,#0A0A1A,#1A0A1A)" }}>
        <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <text x="120" y="58" textAnchor="middle" fontFamily="Space Grotesk" fontSize="14" fontWeight="700" fill="#6C63FF">TG.</text>
        </svg>
      </div>
    ),
    "modal-4": (
      <div className="thumb-img" style={{ background: "linear-gradient(135deg,#1A0A0A,#1A100A)" }}>
        <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <text x="120" y="55" textAnchor="middle" fontFamily="Space Grotesk" fontSize="11" fontWeight="700" fill="#ff6b6b">JSF App</text>
        </svg>
      </div>
    ),
    "modal-5": (
      <div className="thumb-img" style={{ background: "linear-gradient(135deg,#0A0D1A,#0A1A1A)" }}>
        <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <text x="120" y="48" textAnchor="middle" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" fill="#00D4FF">AlgoViz</text>
          <rect x="35" y="58" width="20" height="45" rx="2" fill="#00D4FF" opacity="0.8" />
          <rect x="89" y="50" width="20" height="53" rx="2" fill="#00D4FF" opacity="0.9" />
        </svg>
      </div>
    ),
    "modal-6": (
      <div className="thumb-img" style={{ background: "linear-gradient(135deg,#0A0A0A,#0A1A0A)" }}>
        <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <text x="30" y="42" fontFamily="JetBrains Mono" fontSize="9" fill="#4ade80">$ tg-cli --help</text>
        </svg>
      </div>
    ),
  };

  return thumbs[id] ?? null;
}
