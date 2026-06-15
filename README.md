# TechGod Portfolio

Dark, terminal-coded developer portfolio for a CSE fresher targeting AI/ML roles. Built with **React 19**, **Vite**, React `<ViewTransition>` animations ([react.dev](https://react.dev/reference/react/ViewTransition)), security hardening, and **Vitest** tests.

## Stack

- React 19 (canary) + Vite
- React `<ViewTransition>` + `startTransition` for modal and scroll-reveal animations
- Security: input sanitization, honeypot, rate limiting, CSP headers, safe link handling
- Vitest + React Testing Library (26 tests)

## Files

```
index.html              — Vite entry
src/
  App.jsx               — Root layout
  components/           — Nav, Hero, About, Projects, Stack, Blog, Contact, Modal
  utils/security.js     — Validation & sanitization
  data/content.json     — Site content (update this first)
  styles.css            — All styles
public/
  content.json          — Downloadable CV/resume JSON
  _headers              — Netlify security headers (CSP, etc.)
```

## Commands

```bash
npm install
npm run dev       # Local dev server
npm run build     # Production build → dist/
npm test          # Run test suite
npm run preview   # Preview production build
```

## Customize before deploying

1. **src/data/content.json** — Update name, email, GitHub, projects, blog posts (also copy to `public/content.json`)
2. **Contact form** — Wire up Formspree or your API in `src/components/Contact.jsx`
3. **Avatar** — Replace the SVG avatar in `Hero.jsx` with your photo

## Deploy

### Netlify (recommended)
```bash
npm run build
# Drag dist/ to https://app.netlify.com/drop
# OR: netlify deploy --prod --dir=dist
```

### Vercel
```bash
npm run build
vercel --prod
```

## Security features

- **No innerHTML** — Modal content rendered as React elements (XSS-safe)
- **Form validation** — Email regex, length limits, honeypot anti-spam field
- **Rate limiting** — 5-second cooldown between form submissions
- **CSP headers** — Configured in `public/_headers` for Netlify
- **External links** — `rel="noopener noreferrer"` on all outbound links

## Testing

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

Tests cover security utilities, contact form validation, modal behavior, and app smoke tests.
