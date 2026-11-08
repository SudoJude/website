// Lets Markdown refer to images by their id in the spreadsheets instead of a URL:
//   ![](img:tokyo-01)             uses the sheet's alt text
//   ![Custom alt](img:tokyo-01)   overrides it
// Looks in src/content/images/blog.csv and misc.csv (ids must be unique across both).
// The sheets are read once when Astro starts, so restart the dev server after editing them.
import { readFileSync } from 'node:fs';
import { parseCsv } from './csv.mjs';
import { mediaUrl } from './media.mjs';

const SHEETS = ['blog', 'misc'];

function load() {
  const map = new Map();
  for (const name of SHEETS) {
    let text = '';
    try {
      text = readFileSync(new URL(`../content/images/${name}.csv`, import.meta.url), 'utf8');
    } catch {
      continue;
    }
    for (const r of parseCsv(text)) if (r.id && r.image) map.set(r.id, { src: mediaUrl(r.image), alt: r.alt || '' });
  }
  return map;
}

export default function rehypeSheetImages() {
  const images = load();
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      const src = String(node.properties?.src ?? '');
      if (src.startsWith('img:')) {
        const id = src.slice(4);
        const hit = images.get(id);
        if (!hit) throw new Error(`Markdown image "${src}" not found in blog.csv / misc.csv`);
        node.properties.src = hit.src;
        if (!node.properties.alt) node.properties.alt = hit.alt;
      }
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}
