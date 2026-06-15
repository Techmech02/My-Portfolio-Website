/* =============================================
   TYPEWRITER
   ============================================= */
const words = ["work.", "ships.", "matters.", "scales.", "solves."];
let wIdx = 0, cIdx = 0, deleting = false;
const el = document.getElementById("typewriter");

function type() {
  if (!el) return;
  const word = words[wIdx];
  if (deleting) {
    el.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; setTimeout(type, 400); return; }
  } else {
    el.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
setTimeout(type, 600);

/* =============================================
   NAV SCROLL + HAMBURGER
   ============================================= */
const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".nav-hamburger");
const mobileMenu = document.getElementById("mobile-menu");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

hamburger?.addEventListener("click", () => {
  const open = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!open));
  mobileMenu?.setAttribute("aria-hidden", String(open));
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    hamburger?.setAttribute("aria-expanded", "false");
    mobileMenu?.setAttribute("aria-hidden", "true");
  });
});

/* =============================================
   ACTIVE NAV LINK (INTERSECTION)
   ============================================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const observerOptions = { rootMargin: "-40% 0px -55% 0px" };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${entry.target.id}`
          ? "var(--text)"
          : "";
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

/* =============================================
   SKILL BAR ANIMATION (INTERSECTION)
   ============================================= */
const bars = document.querySelectorAll(".bar-fill");
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "bar-in 1.2s cubic-bezier(.22,1,.36,1) both";
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

bars.forEach(bar => {
  bar.style.animation = "none";
  barObserver.observe(bar);
});

/* =============================================
   MODAL
   ============================================= */
const modalData = {
  "modal-1": {
    title: "GST Notice Explainer",
    sub: "SaaS Wrapper · Revenue-first product",
    challenge: "Indian SMBs receive GST notices they don't understand — leading to panic, bad decisions, and expensive CA consultations for simple compliance issues.",
    approach: "Built an LLM-powered wrapper that ingests GST notice PDFs, identifies the notice type (demand, scrutiny, mismatch), explains it in plain Hindi/English, and suggests next steps. Designed for non-accountant small business owners.",
    outcome: "Early revenue product. Targeting ₹499/notice or subscription tier. Validated demand with Alwar-based traders.",
    tech: ["Python", "FastAPI", "PDF parsing", "LLM API", "React"]
  },
  "modal-2": {
    title: "ElectroAI — Trades AI",
    sub: "Long-term moat · Hyper-vertical AI",
    challenge: "Indian electricians carry all their knowledge in their heads. When they retire, it goes with them. There's no accessible, language-appropriate tool for on-the-job help.",
    approach: "A hyper-narrow AI assistant trained on Indian electrical codes, wiring standards, and common fault patterns — accessible via a simple SMS/WhatsApp interface. No app install required.",
    outcome: "18-month build. Currently in research/design phase. Targeting Indian electrician unions and training institutes for distribution.",
    tech: ["LLM fine-tuning", "WhatsApp API", "Python", "Domain RAG", "Hindi NLP"]
  },
  "modal-3": {
    title: "This Portfolio",
    sub: "Personal project · Shipped in one session",
    challenge: "Most fresher portfolios look identical — a template with placeholder text. Needed something that showed product thinking, not just technology knowledge.",
    approach: "Designed from scratch with a specific visual identity: dark, dense, terminal-coded. Every section has a job. No stock images. Real project descriptions. Built with vanilla HTML/CSS/JS for performance and portability.",
    outcome: "You're looking at it. Fast, accessible, mobile-responsive, zero dependencies.",
    tech: ["HTML5", "CSS Custom Properties", "Vanilla JS", "SVG", "No frameworks"]
  },
  "modal-4": {
    title: "JSF Web Application",
    sub: "Academic · Java EE Stack",
    challenge: "Learning JavaServer Faces for a college project while simultaneously building towards modern web standards.",
    approach: "Built a full CRUD web application with JSF, Maven, Mojarra, and Tomcat. Implemented ManagedBeans, validation, and navigation flows. Used it to understand the Java EE component lifecycle.",
    outcome: "Academic credit + deeper understanding of component-based MVC patterns that informed my FastAPI and React work.",
    tech: ["JSF", "Java EE", "Maven", "Mojarra", "Tomcat", "MySQL"]
  },
  "modal-5": {
    title: "AlgoViz — Algorithm Visualizer",
    sub: "Educational tool · Open source",
    challenge: "Sorting algorithms are taught abstractly. Students memorize Big-O without understanding why. Needed a visual learning tool.",
    approach: "Interactive visualizer for 8 sorting algorithms (bubble, merge, quick, heap, insertion, selection, shell, radix). Adjustable array size and speed. Color-coded comparisons, swaps, and sorted elements.",
    outcome: "Used by classmates for exam prep. Helped explain concepts in 5 minutes that lectures took 2 hours to cover.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS Animations", "Vanilla JS"]
  },
  "modal-6": {
    title: "CLI Toolset",
    sub: "Developer tools · Personal use + open source",
    challenge: "Repetitive tasks across my projects: spinning up dev environments, running linters, deploying to test servers, checking cloud costs.",
    approach: "A unified CLI wrapper for my most-used tools: GhostAudit scanner, TruthLens scoring, system monitor. Built with Click (Python), distributed as a pip package.",
    outcome: "Saves ~20 min/day. Open-sourced it. A few GitHub stars from other students who forked it.",
    tech: ["Python", "Click", "Subprocess", "Pip packaging", "Shell scripting"]
  }
};

const overlay = document.getElementById("modal-overlay");
const closeBtn = document.getElementById("modal-close");
const modalContent = document.getElementById("modal-content");
let lastFocused = null;

function openModal(id) {
  const data = modalData[id];
  if (!data) return;
  lastFocused = document.activeElement;
  modalContent.innerHTML = `
    <h2>${data.title}</h2>
    <p class="modal-sub">${data.sub}</p>
    <div class="modal-tags">${data.tech.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <h3>The Problem</h3>
    <p>${data.challenge}</p>
    <h3>The Approach</h3>
    <p>${data.approach}</p>
    <h3>Outcome</h3>
    <p>${data.outcome}</p>
  `;
  overlay.hidden = false;
  closeBtn.focus();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  lastFocused?.focus();
}

document.querySelectorAll(".gallery-thumb").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});
closeBtn?.addEventListener("click", closeModal);
overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) closeModal(); });

// Trap focus inside modal
overlay?.addEventListener("keydown", (e) => {
  if (e.key !== "Tab" || overlay.hidden) return;
  const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
  }
});

/* =============================================
   CONTACT FORM
   ============================================= */
const form = document.getElementById("contact-form");
const formSuccess = form?.querySelector(".form-success");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("[required]").forEach(field => {
    field.classList.remove("error");
    if (!field.value.trim()) {
      field.classList.add("error");
      valid = false;
    }
    if (field.type === "email" && field.value && !field.value.includes("@")) {
      field.classList.add("error");
      valid = false;
    }
  });

  if (!valid) return;

  const btn = form.querySelector("button[type=submit]");
  btn.classList.add("loading");
  btn.disabled = true;

  // Simulate send (replace with actual endpoint)
  setTimeout(() => {
    btn.classList.remove("loading");
    btn.disabled = false;
    formSuccess.hidden = false;
    form.reset();
    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  }, 1200);
});

/* =============================================
   SCROLL REVEAL (subtle)
   ============================================= */
const revealEls = document.querySelectorAll(".project-card, .blog-card, .stack-group, .gallery-thumb");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// Only if reduced motion is NOT preferred
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealEls.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    revealObserver.observe(el);
  });
}
