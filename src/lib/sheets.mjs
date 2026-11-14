// Reads the image spreadsheets that Markdown can refer to as ![](img:<id>).
// Used by rehype-sheet-images.mjs and astro.config.mjs (Node only, no Astro imports).
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parseCsv } from './csv.mjs';
import { mediaUrl } from './media.mjs';

// Sheets whose ids can be used in Markdown. Ids must be unique across all of them.
export const MARKDOWN_SHEETS = ['blog', 'misc'];

const readSheet = (name) => {
  try {
    return readFileSync(new URL(`../content/images/${name}.csv`, import.meta.url), 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') return '';
    throw e;
  }
};

/** @returns {Map<string, { src: string, alt: string }>} */
export function loadMarkdownImages() {
  const map = new Map();
  const seen = new Map(); // id -> "sheet.csv line N"
  for (const name of MARKDOWN_SHEETS) {
    for (const r of parseCsv(readSheet(name))) {
      if (!r.id && !r.image) continue;
      const where = `${name}.csv line ${Number(r.row) + 2}`;
      if (!r.id || !r.image) throw new Error(`${where}: both "id" and "image" are required`);
      if (seen.has(r.id)) throw new Error(`Duplicate image id "${r.id}" in ${where} (already used in ${seen.get(r.id)})`);
      seen.set(r.id, where);
      map.set(r.id, { src: mediaUrl(r.image), alt: r.alt });
    }
  }
  return map;
}

/**
 * 3D models for ![](model:<id>), from src/content/images/models.csv (id,model,poster,alt,size).
 * `poster` is optional; `size` is shown on the load button (e.g. "4 MB").
 * @returns {Map<string, { src: string, poster: string, alt: string, size: string }>}
 */
export function loadModels() {
  const map = new Map();
  for (const r of parseCsv(readSheet('models'))) {
    if (!r.id && !r.model) continue;
    const where = `models.csv line ${Number(r.row) + 2}`;
    if (!r.id || !r.model) throw new Error(`${where}: both "id" and "model" are required`);
    if (map.has(r.id)) throw new Error(`Duplicate model id "${r.id}" in ${where}`);
    map.set(r.id, {
      src: mediaUrl(r.model),
      poster: r.poster ? mediaUrl(r.poster) : '',
      alt: r.alt || '3D model',
      size: r.size || '',
    });
  }
  return map;
}

// Changes whenever a sheet changes. Passed to the rehype plugin as an option so Astro's content
// cache (which only watches the .md files) re-renders posts after a sheet edit.
export const sheetsVersion = () =>
  createHash('sha1').update([...MARKDOWN_SHEETS, 'models'].map(readSheet).join('\0')).digest('hex').slice(0, 12);
