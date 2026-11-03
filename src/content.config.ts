import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { photoCategories } from './data/categories';

// A picture is either a local file (preferred, optimised at build time) or a remote URL.
const picture = (image: () => z.ZodType) => z.union([image(), z.string().url()]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string().optional(), // title used on home-page cards
      featured: z.boolean().default(false), // show on the home page
      order: z.number().default(100), // lower = earlier
      cover: picture(image).optional(),
      coverAlt: z.string().default(''),
      draft: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string().optional(), // defaults to the first paragraph
      cover: picture(image).optional(),
      coverAlt: z.string().default(''),
      draft: z.boolean().default(false),
    }),
});

const photography = defineCollection({
  loader: file('./src/content/photography/photos.yaml'),
  schema: ({ image }) =>
    z.object({
      image: picture(image),
      alt: z.string(),
      category: z.enum(photoCategories),
      featured: z.boolean().default(false), // show on the home page
      date: z.coerce.date().optional(), // newest first when set
    }),
});

export const collections = { projects, blog, photography };
