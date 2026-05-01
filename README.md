# vishnups.com

Personal site & blog for Vishnu P.S. - AI Engineer (LLMs, RAG, agents, MLOps).
Live at [vishnups.com](https://www.vishnups.com).

Built with [Docusaurus 3](https://docusaurus.io/), deployed to GitHub Pages
from the `master` branch via `.github/workflows/deploy.yml`.

## Stack

- Docusaurus 3 (classic preset) + Mermaid + Algolia DocSearch
- React 18, TypeScript
- Inter / JetBrains Mono via Google Fonts
- pnpm (Node >= 18)

## Run locally

```bash
pnpm install
pnpm start          # dev server with hot reload
pnpm build          # production build to ./build
pnpm serve          # serve the built site
pnpm typecheck      # tsc --noEmit
```

## Content

- `blog/` - dated posts (`YYYY-MM-DD-slug.md`), mounted at `/blog`
- `notes/` - long-form notes, mounted at `/notes`; sidebar auto-generated from folder structure
- `src/pages/` - custom routes (`index.tsx`, `about.mdx`, `projects.mdx`)

To publish: push to `master`. GitHub Actions builds and deploys.
