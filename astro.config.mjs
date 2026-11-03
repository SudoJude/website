import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hosted on Cloudflare at the root of judemyers.eu, so no `base`.
export default defineConfig({
  site: 'https://judemyers.eu',
  integrations: [sitemap()],
});
