import { getCollection, type CollectionEntry } from 'astro:content';

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
  return all.sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
}

export function excerptOf(post: CollectionEntry<'blog'>, max = 240) {
  if (post.data.excerpt) return post.data.excerpt;
  const first =
    (post.body ?? '')
      .split(/\n\s*\n/)
      .find((p) => p.trim() && !/^(#|!\[|<)/.test(p.trim())) ?? '';
  const text = first
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
