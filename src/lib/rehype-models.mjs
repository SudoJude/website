// Turns a paragraph containing only ![](model:<id>) into a click-to-load 3D viewer.
// <id> is a row in src/content/images/models.csv. Markup/styles/behaviour: model.css / model.ts.
// Must run before rehype-content.mjs (which would otherwise treat the "image" as a gallery slide).
// Sheets are read when Astro starts, so restart the dev server after editing models.csv.
import { loadModels } from './sheets.mjs';

const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const text = (value) => ({ type: 'text', value });

// `options.version` is unused here; astro.config.mjs passes sheetsVersion() so the cache notices sheet edits.
export default function rehypeModels() {
  const models = loadModels();
  const find = (p) => {
    if (p.type !== 'element' || p.tagName !== 'p') return null;
    const kids = p.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
    const img = kids.length === 1 && kids[0].tagName === 'img' ? kids[0] : null;
    const src = String(img?.properties?.src ?? '');
    return src.startsWith('model:') ? { id: src.slice(6), alt: String(img.properties.alt ?? '') } : null;
  };
  return (tree) => {
    tree.children = tree.children.map((node) => {
      const hit = find(node);
      if (!hit) return node;
      const m = models.get(hit.id);
      if (!m) throw new Error(`Markdown model "model:${hit.id}" not found in models.csv`);
      const alt = hit.alt || m.alt;
      return el('div', { className: ['model'] }, [
        el('div', { className: ['model__stage'] }, [
          el('model-viewer', {
            'data-src': m.src,
            alt,
            'camera-controls': '',
            'touch-action': 'pan-y',
            'auto-rotate': '',
            'environment-image': 'neutral',
            'shadow-intensity': '1',
            'tone-mapping': 'agx',
          }),
          el('button', { type: 'button', className: ['model__poster'] }, [
            ...(m.poster ? [el('img', { src: m.poster, alt: '', loading: 'lazy', decoding: 'async' })] : []),
            el('span', { className: ['model__load'] }, [text('View in 3D'), ...(m.size ? [el('small', {}, [text(`(${m.size})`)])] : [])]),
          ]),
        ]),
      ]);
    });
  };
}
