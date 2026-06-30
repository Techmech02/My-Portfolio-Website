"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GradientText from "@/components/animations/GradientText";
import useActiveSection from "@/hooks/useActiveSection";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeSection = useActiveSection(["about", "projects", "stack", "blog", "contact"]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: "#about", label: "About", id: "about" },
    { href: "#projects", label: "Work", id: "projects" },
    { href: "#stack", label: "Stack", id: "stack" },
    { href: "#blog", label: "Notes", id: "blog" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.progress} aria-hidden="true">
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <div className={`${styles.inner} container`}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <GradientText speed={5}>SB.</GradientText>
        </Link>

        <ul className={styles.links} role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`${styles.link} ${
                  activeSection === link.id ? styles.active : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CV Download button - now points to resume.pdf */}
        <a
          href="/resume.pdf"
          download="Sagar_Bhati_Resume.pdf"
          className={styles.cvBtn}
          aria-label="Download Resume"
        >
          Resume
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              download="Sagar_Bhati_Resume.pdf"
              onClick={closeMenu}
              className={styles.mobileCv}
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
