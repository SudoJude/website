import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

// Folder-style entries ("my-post/index.md") get the folder name as slug.
export const slugOf = (id: string) => id.replace(/\/index$/, '');

export async function getProjects() {
  const all = await getCollection('projects', (p) => !p.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts() {
  const all = await getCollection('blog', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPhotos() {
  const all = await getCollection('photography');
  return all.sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0) || a.data.row - b.data.row);
}

// One image from src/content/images/misc.csv, by id.
export async function getMisc(id: string) {
  const entry = await getEntry('misc', id);
  if (!entry) throw new Error(`No image "${id}" in misc.csv`);
  return { src: entry.data.image, alt: entry.data.alt };
}

export async function getArt() {
  const all = await getCollection('art');
  return all.sort((a, b) => a.data.row - b.data.row).map((a) => ({
    src: a.data.image,
    alt: a.data.alt,
    // Squarespace images are resized by query string; R2 files are served as uploaded.
    full: a.data.full ?? (a.data.image.includes('squarespace-cdn') ? `${a.data.image}?format=2500w` : a.data.image),
  }));
}

// Paragraphs of a post's excerpt: the `excerpt` frontmatter (blank line = new paragraph), or the
// first body paragraph. The old Squarespace posts had hand-written excerpts, kept in frontmatter.
export function excerptParagraphs(post: CollectionEntry<'blog'>): string[] {
  if (post.data.excerpt) return post.data.excerpt.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);
  const first =
    (post.body ?? '')
      .split(/\n\s*\n/)
      .find((p) => p.trim() && !/^(#|!\[|<)/.test(p.trim())) ?? '';
  const text = first
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? [text] : [];
}

const plain = (md: string) =>
  md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const squash = (s: string) => plain(s).toLowerCase().replace(/[^a-z0-9]+/g, '');

// Text for the blog listing: the excerpt, then the post's own paragraphs after the one the excerpt
// came from, so the listing can fill the height of the thumbnail (cut to fit in the browser).
export function listingText(post: CollectionEntry<'blog'>, maxChars = 2500): string {
  const paras = (post.body ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(#|!\[|<|>)/.test(p) && !/^\*\*[^*]+\*\*$/.test(p)); // skip headings, images, embeds, quotes
  const excerpt = excerptParagraphs(post);
  let next = 1; // by default continue after the first paragraph
  const tail = squash(excerpt.at(-1) ?? '').slice(-40); // where the excerpt ends
  if (tail.length >= 20) {
    const at = paras.findIndex((p) => squash(p).includes(tail));
    if (at >= 0) next = at + 1;
  }
  const text = [...excerpt, ...paras.slice(next).map(plain)].join(' ');
  return text.length > maxChars ? text.slice(0, maxChars) : text;
}

// Single-line, length-limited excerpt (meta descriptions)
export function excerptOf(post: CollectionEntry<'blog'>, max = 240) {
  const text = excerptParagraphs(post).join(' ').replace(/\s+/g, ' ');
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;
}

// "11 Mar" (year added when it isn't the current year), as on the old Squarespace posts
export const formatPostDate = (d: Date) =>
  d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    ...(d.getUTCFullYear() !== new Date().getUTCFullYear() && { year: 'numeric' as const }),
  });

export const formatDate =(d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
