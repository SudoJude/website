import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeContent from './src/lib/rehype-content.mjs';
import rehypeExternalLinks from './src/lib/rehype-external-links.mjs';

// Hosted on Cloudflare at the root of judemyers.eu, so no `base`.
export default defineConfig({
  site: 'https://judemyers.eu',
  integrations: [sitemap()],
  // rehypeExternalLinks: all Markdown; rehypeContent: projects and blog only
  markdown: { rehypePlugins: [rehypeExternalLinks, rehypeContent] },
});
