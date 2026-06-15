export const modalData = {
  "modal-1": {
    title: "GST Notice Explainer",
    sub: "SaaS Wrapper · Revenue-first product",
    challenge:
      "Indian SMBs receive GST notices they don't understand — leading to panic, bad decisions, and expensive CA consultations for simple compliance issues.",
    approach:
      "Built an LLM-powered wrapper that ingests GST notice PDFs, identifies the notice type (demand, scrutiny, mismatch), explains it in plain Hindi/English, and suggests next steps. Designed for non-accountant small business owners.",
    outcome:
      "Early revenue product. Targeting ₹499/notice or subscription tier. Validated demand with Alwar-based traders.",
    tech: ["Python", "FastAPI", "PDF parsing", "LLM API", "React"],
  },
  "modal-2": {
    title: "ElectroAI — Trades AI",
    sub: "Long-term moat · Hyper-vertical AI",
    challenge:
      "Indian electricians carry all their knowledge in their heads. When they retire, it goes with them. There's no accessible, language-appropriate tool for on-the-job help.",
    approach:
      "A hyper-narrow AI assistant trained on Indian electrical codes, wiring standards, and common fault patterns — accessible via a simple SMS/WhatsApp interface. No app install required.",
    outcome:
      "18-month build. Currently in research/design phase. Targeting Indian electrician unions and training institutes for distribution.",
    tech: ["LLM fine-tuning", "WhatsApp API", "Python", "Domain RAG", "Hindi NLP"],
  },
  "modal-3": {
    title: "This Portfolio",
    sub: "Personal project · Shipped in one session",
    challenge:
      "Most fresher portfolios look identical — a template with placeholder text. Needed something that showed product thinking, not just technology knowledge.",
    approach:
      "Designed from scratch with a specific visual identity: dark, dense, terminal-coded. Every section has a job. No stock images. Real project descriptions. Built with React for performance and maintainability.",
    outcome: "You're looking at it. Fast, accessible, mobile-responsive, tested and secure.",
    tech: ["React", "Vite", "View Transitions", "Vitest", "Security hardening"],
  },
  "modal-4": {
    title: "JSF Web Application",
    sub: "Academic · Java EE Stack",
    challenge:
      "Learning JavaServer Faces for a college project while simultaneously building towards modern web standards.",
    approach:
      "Built a full CRUD web application with JSF, Maven, Mojarra, and Tomcat. Implemented ManagedBeans, validation, and navigation flows. Used it to understand the Java EE component lifecycle.",
    outcome:
      "Academic credit + deeper understanding of component-based MVC patterns that informed my FastAPI and React work.",
    tech: ["JSF", "Java EE", "Maven", "Mojarra", "Tomcat", "MySQL"],
  },
  "modal-5": {
    title: "AlgoViz — Algorithm Visualizer",
    sub: "Educational tool · Open source",
    challenge:
      "Sorting algorithms are taught abstractly. Students memorize Big-O without understanding why. Needed a visual learning tool.",
    approach:
      "Interactive visualizer for 8 sorting algorithms (bubble, merge, quick, heap, insertion, selection, shell, radix). Adjustable array size and speed. Color-coded comparisons, swaps, and sorted elements.",
    outcome:
      "Used by classmates for exam prep. Helped explain concepts in 5 minutes that lectures took 2 hours to cover.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS Animations", "Vanilla JS"],
  },
  "modal-6": {
    title: "CLI Toolset",
    sub: "Developer tools · Personal use + open source",
    challenge:
      "Repetitive tasks across my projects: spinning up dev environments, running linters, deploying to test servers, checking cloud costs.",
    approach:
      "A unified CLI wrapper for my most-used tools: GhostAudit scanner, TruthLens scoring, system monitor. Built with Click (Python), distributed as a pip package.",
    outcome:
      "Saves ~20 min/day. Open-sourced it. A few GitHub stars from other students who forked it.",
    tech: ["Python", "Click", "Subprocess", "Pip packaging", "Shell scripting"],
  },
};

export const typewriterWords = ["work.", "ships.", "matters.", "scales.", "solves."];
