import { defineConfig } from 'astro/config';

// Served from the custom domain judemyers.eu (see public/CNAME), so no `base`.
export default defineConfig({
  site: 'https://judemyers.eu',
});
