import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeProject from './src/lib/rehype-project.mjs';

// Hosted on Cloudflare at the root of judemyers.eu, so no `base`.
export default defineConfig({
  site: 'https://judemyers.eu',
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeProject] }, // only acts on src/content/projects
});
