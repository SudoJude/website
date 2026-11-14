import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeContent from './src/lib/rehype-content.mjs';
import rehypeSheetImages from './src/lib/rehype-sheet-images.mjs';
import { sheetsVersion } from './src/lib/sheets.mjs';
import rehypeModels from './src/lib/rehype-models.mjs';
import rehypeExternalLinks from './src/lib/rehype-external-links.mjs';

// Hosted on Cloudflare at the root of judemyers.eu, so no `base`.
export default defineConfig({
  site: 'https://judemyers.eu',
  integrations: [sitemap()],
  // rehypeSheetImages: `![](img:id)` lookups; rehypeExternalLinks: all Markdown; rehypeModels: `![](model:id)` 3D viewers (must run before rehypeContent); rehypeContent: projects and blog only
  markdown: { rehypePlugins: [[rehypeSheetImages, { version: sheetsVersion() }], rehypeExternalLinks, [rehypeModels, { version: sheetsVersion() }], rehypeContent] },
});
