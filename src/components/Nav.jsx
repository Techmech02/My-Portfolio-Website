import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.style.color =
                link.getAttribute("href") === `#${entry.target.id}` ? "var(--text)" : "";
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner container">
        <a href="#" className="nav-logo" aria-label="Home">
          TG<span className="accent">.</span>
        </a>
        <ul className="nav-links" role="list">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#stack">Stack</a></li>
          <li><a href="#blog">Notes</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="/content.json" download="TechGod_CV.json" className="btn btn-ghost btn-sm" aria-label="Download CV">
          Download CV
        </a>
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className="mobile-menu" id="mobile-menu" aria-hidden={!menuOpen}>
        <ul role="list">
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#projects" onClick={closeMenu}>Work</a></li>
          <li><a href="#stack" onClick={closeMenu}>Stack</a></li>
          <li><a href="#blog" onClick={closeMenu}>Notes</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          <li><a href="/content.json" download onClick={closeMenu}>Download CV</a></li>
        </ul>
      </div>
    </nav>
  );
}
