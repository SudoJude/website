import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { photoCategories } from './data/categories';
import { parseCsv } from './lib/csv.mjs';
import { mediaUrl } from './lib/media.mjs';

// A picture is either a local file (preferred, optimised at build time) or a remote URL.
const picture = (image: () => z.ZodType) => z.union([image(), z.string().url()]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string().optional(), // title used on home-page cards
      heading: z.string().optional(), // page h1 when it differs from `title`
      tagline: z.string().optional(), // line under the heading in the dark hero
      details: z.array(z.string()).default([]), // "Role: …", "Duration: …" etc. for the hero banner
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

// Image spreadsheets live in src/content/images/*.csv (open them in Excel, Numbers, etc.).
// `image` is a full URL or a path inside the R2 bucket; `row` is the line order in the sheet.
const sheetImage = z.string().min(1).transform(mediaUrl);
// Blank = false. Anything other than true/yes/1 or false/no/0 is an error, so typos don't silently hide a photo.
const sheetBool = z.preprocess((v) => {
  if (typeof v !== 'string') return v;
  const t = v.trim().toLowerCase();
  return ['true', 'yes', '1'].includes(t) ? true : ['', 'false', 'no', '0'].includes(t) ? false : v;
}, z.boolean());
const sheetDate = z.preprocess((v) => (v === '' ? undefined : v), z.coerce.date().optional());

const photography = defineCollection({
  loader: file('./src/content/images/photography.csv', { parser: parseCsv }),
  schema: z.object({
    row: z.coerce.number(),
    image: sheetImage,
    alt: z.string().min(1),
    category: z.enum(photoCategories),
    featured: sheetBool.default(false), // show on the home page
    date: sheetDate, // newest first when set
  }),
});

// Everything else (about-page portrait, home-page images, social previews, ...).
// `used_on` is a note to yourself. Use ![](img:<id>) in Markdown, or getMisc('<id>') in a page.
// blog.csv has no collection: it is only read by rehype-sheet-images.mjs (src/lib/sheets.mjs).
const misc = defineCollection({
  loader: file('./src/content/images/misc.csv', { parser: parseCsv }),
  schema: z.object({
    row: z.coerce.number(),
    image: sheetImage,
    alt: z.string().default(''),
    used_on: z.string().default(''),
  }),
});

const art = defineCollection({
  loader: file('./src/content/images/art.csv', { parser: parseCsv }),
  schema: z.object({
    row: z.coerce.number(),
    image: sheetImage, // shown in the grid
    full: sheetImage.optional(), // opened in a new tab; defaults to `image`
    alt: z.string().min(1),
  }),
});

export const collections = { projects, blog, photography, art, misc };
