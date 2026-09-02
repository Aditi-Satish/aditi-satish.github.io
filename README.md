# Aditi Lakshmi Satish — Scientific Research Website

> **PhD Research Scholar · HoMeCell Lab · Indian Institute of Technology Gandhinagar**  
> *"Resource optimisation through transcription start site selection and its exploitation in cancers."*

This repository houses the personal scientific research website for **Aditi Lakshmi Satish**, engineered as a contemporary scientific field notebook combining editorial typography (Didot + Georgia), procedural watercolor washes, and an interactive genomic transcription start site (TSS) trajectory model.

---

## 🔬 Featured Accepted Work

- **Title**: *Gene functions determine stochastic or adaptive futile transcription in cancers through deregulated start site deployments*
- **Journal**: *Frontiers in Bioinformatics* (2026)
- **DOI**: [10.3389/fbinf.2026.1883461](https://doi.org/10.3389/fbinf.2026.1883461)
- **Article Link**: [Frontiers in Bioinformatics Abstract](https://www.frontiersin.org/journals/bioinformatics/articles/10.3389/fbinf.2026.1883461/abstract)

---

## 🛠 Tech Stack

- **Tooling & Bundler**: Vite 6 (ultra-fast, zero-overhead dev server & bundler)
- **Language**: TypeScript (strongly typed SVG manipulation & interaction models)
- **Styling**: Native Modern CSS (CSS Custom Properties, Grid, Flexbox, Procedural SVG Filters)
- **Typography**: Didot (Display) + Georgia (Reading) with cross-platform GFS Didot fallback
- **Hosting**: GitHub Pages (via GitHub Actions static artifact deployment)
- **Total Production Size**: `< 12 KB gzipped`

---

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Dev Server** (Instant live-reloading):
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

3. **Typecheck & Production Build**:
   ```bash
   npm run build
   ```
   The compiled static files are generated in `./dist/`.

---

## 🚀 How to Host on GitHub Pages (When Ready)

1. **Create a New GitHub Repository**:
   - Go to [github.com/new](https://github.com/new).
   - Name your repository (e.g., `aditi_website` or `<your-username>.github.io`).
   - Leave it public.

2. **Connect & Push from Your Terminal**:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository **Settings** $\rightarrow$ **Pages**.
   - Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
   - That's it! The automated workflow in `.github/workflows/deploy.yml` will automatically build and publish your website whenever you push changes.

---

## 📂 Project Structure

```
aditi_website/
├── index.html                 # Semantic, accessible HTML5 layout
├── vite.config.js             # Base path configuration for GitHub Pages
├── tsconfig.json              # TypeScript configuration
├── package.json               # Scripts: dev, build, typecheck, preview
├── .github/
│   └── workflows/
│       └── deploy.yml         # Automated GitHub Actions deployment
├── backups/
│   └── v1-javascript/         # Pristine backup of the initial Vanilla JS build
├── public/
│   ├── favicon.svg            # Custom SVG watercolor TSS branding icon
│   └── images/
│       ├── homecell-lab-logo.png # Authentic HoMeCell Lab logo (raw as-is)
│       └── iitgn-logo.png        # Authentic IIT Gandhinagar seal (raw as-is)
└── src/
    ├── styles/
    │   ├── variables.css      # Design tokens (colors, Didot/Georgia fonts, spacing)
    │   ├── typography.css     # Editorial typographic scale
    │   ├── watercolor.css     # Procedural paper texture, SVG watercolor wash filters
    │   └── main.css           # Responsive layout, navigation, brand logo sizing
    └── scripts/
        ├── main.ts            # Application bootstrap
        ├── tss-visual.ts      # Interactive TSS genomic landscape diagram
        └── annotations.ts     # Citation copying & active scroll spy
```

---

## 📜 Scholarly Colophon & Research Statement

> *“Transcription start site selection is an evolutionary balance of resource expenditure against cellular fidelity. In cancers, understanding whether initiation shifts are stochastic drift or adaptive survival reveals the metabolic vulnerabilities of the malignant cell.”*  
> — **Aditi Lakshmi Satish**
