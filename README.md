# TechGod Portfolio

Dark, terminal-coded developer portfolio for a CSE fresher targeting AI/ML roles.

## Files
```
index.html      — Main page (single HTML file)
styles.css      — All styles with CSS custom properties
scripts.js      — Typewriter, modals, nav, form, scroll reveal
content.json    — All site content (update this first)
README.md       — This file
```

## Customize before deploying

1. **content.json** — Update name, email, GitHub, projects, blog posts
2. **index.html** — Search for `techgod@email.com` and replace with your real email
3. **index.html** — Update GitHub and LinkedIn links (search `github.com/techgod`)
4. **Avatar** — Replace the SVG avatar in the hero section with your actual photo (use a circular `<img>` tag inside `.avatar-ring`)

## Deploy in 2 minutes

### Netlify (recommended — free)
```bash
# Drag and drop the folder to https://app.netlify.com/drop
# OR use the CLI:
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
git init
git add .
git commit -m "Portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
# Enable GitHub Pages in repo settings → Pages → Deploy from branch: main
```

## Custom domain
Once deployed on Netlify/Vercel, go to your dashboard → Domain settings → Add custom domain.
Buy a domain from Namecheap (~₹800/year for a `.dev` domain).

## Performance checklist
- [ ] Replace placeholder email with real email
- [ ] Update all social links
- [ ] Add your actual photo to the avatar section
- [ ] Update project descriptions in `modalData` in `scripts.js`
- [ ] Add real blog post links when you publish
- [ ] Test on mobile (Chrome DevTools → Toggle device toolbar)
- [ ] Run Lighthouse audit (DevTools → Lighthouse → Generate report)

## Contact form
The form currently simulates a send. To make it actually send emails:
1. Sign up at https://formspree.io (free tier = 50 submissions/month)
2. Create a new form → get your endpoint URL
3. In `scripts.js`, replace the `setTimeout` simulation with:
```javascript
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Accept": "application/json" },
  body: new FormData(form)
});
```
