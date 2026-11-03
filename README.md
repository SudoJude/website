# Jude Myers Design

Astro site on GitHub Pages. Content is files, not code: add a file, push, it deploys.

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # if node isn't on your PATH
npm install
npm run dev
```

## Adding content

### Project
```bash
npm run new -- project "My Project"
```
Creates `src/content/projects/my-project/index.md`. Drop `cover.jpg` in the same folder, set `cover: ./cover.jpg`, and write the case study in Markdown (images next to the file work too: `![alt](./detail.jpg)`).
Frontmatter: `title`, `shortTitle` (home card), `featured` (show on home), `order` (lower first), `cover`, `coverAlt`, `draft`.

### Blog post
```bash
npm run new -- post "My Post"
```
Creates a draft in `src/content/blog/my-post/`. Set `draft: false` when ready. `date` sets ordering; `excerpt` is optional (defaults to the first paragraph).

### Photography
1. Put the file in `src/assets/photography/`.
2. Add an entry to `src/content/photography/photos.yaml`:
```yaml
harbour-dusk:
  image: ../../assets/photography/harbour-dusk.jpg
  alt: Boats in a harbour at dusk
  category: Landscape, Nature, & Travel
  featured: true     # optional: show on the home page
  date: 2026-09-01   # optional: newest first
```
Categories live in `src/data/categories.ts`.

Local images are resized and converted to modern formats at build time. Existing items still use remote Squarespace URLs; replace them with local files whenever you like (a build error tells you if a path is wrong).

### Other
- About page, nav and social links: `src/data/site.ts`.
- Anything invalid in frontmatter fails the build with the file and field named, so mistakes can't reach the live site.

## Deploy (Cloudflare)
Push to `main`; Cloudflare builds with `npm run build` and serves `dist/` as configured in `wrangler.jsonc`. Pull requests get a CI run (`npm run check` + build) from GitHub Actions.
- `public/_headers` and `public/_redirects` control headers and redirects (add old-URL redirects there).
- Sitemap and `robots.txt` are generated/served automatically.
- Limits: 25 MiB per file, 20,000 files per deploy. Keep very large originals out of the repo (Cloudflare R2 behind a custom domain; use the remote-URL form of `cover:` / `image:`).
