// Lets Markdown refer to images by their id in the spreadsheets instead of a URL:
//   ![](img:tokyo-01)             uses the sheet's alt text
//   ![Custom alt](img:tokyo-01)   overrides it
// Looks in src/content/images/blog.csv and misc.csv (see MARKDOWN_SHEETS; ids must be unique).
// Sheets are read when Astro starts, so restart the dev server after editing them.
import { loadMarkdownImages } from './sheets.mjs';

// `options.version` is unused here; astro.config.mjs passes sheetsVersion() so the cache notices sheet edits.
export default function rehypeSheetImages() {
  const images = loadMarkdownImages();
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      const src = String(node.properties?.src ?? '');
      if (src.startsWith('img:')) {
        const hit = images.get(src.slice(4));
        if (!hit) throw new Error(`Markdown image "${src}" not found in blog.csv / misc.csv`);
        node.properties.src = hit.src;
        if (!node.properties.alt) node.properties.alt = hit.alt;
      }
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}
