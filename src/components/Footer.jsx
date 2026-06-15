import siteContent from "../data/content.json";

export default function Footer() {
  const { contactEmail, github, linkedin } = siteContent;

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <span className="footer-logo">
          TG<span className="accent">.</span>
        </span>
        <div className="footer-links">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href={`mailto:${contactEmail}`} aria-label="Email">
            Email
          </a>
          <a href="/content.json" download aria-label="Download resume">
            Resume
          </a>
        </div>
        <span className="footer-copy">© 2025 TechGod · Alwar, India</span>
      </div>
    </footer>
  );
}
