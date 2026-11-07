// Rehype plugin for project case studies (src/content/projects) and blog posts (src/content/blog).
// - A run of 2+ image-only paragraphs becomes a looping carousel (both collections).
// - A paragraph containing only a link becomes a blue button (projects only).
const isBlank = (n) => n.type === 'text' && !n.value.trim();
const significant = (p) => p.children.filter((c) => !isBlank(c));

const soleChild = (node, tag) => {
  if (node.type !== 'element' || node.tagName !== 'p') return null;
  const kids = significant(node);
  return kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === tag ? kids[0] : null;
};

// Same markup as src/components/Carousel.astro (styles/behaviour: carousel.css / carousel.ts).
const button = (dir, label, text) => ({
  type: 'element',
  tagName: 'button',
  properties: { type: 'button', className: ['carousel-nav', dir], ariaLabel: label, 'data-dir': dir === 'prev' ? '-1' : '1' },
  children: [{ type: 'text', value: text }],
});

// Per-collection carousel look (CSS variables read by carousel.css)
const KINDS = {
  projects: { buttons: true, style: '--carousel-gap:0;--carousel-height:clamp(220px,31vw,450px);--carousel-nav-top:50%' },
  blog: { buttons: false, style: '--carousel-gap:0;--carousel-height:clamp(260px,34.5vw,497px);--carousel-nav-top:50%' },
};

export default function rehypeContent() {
  return (tree, file) => {
    const path = String(file?.path ?? '');
    const name = path.includes('/content/projects/') ? 'projects' : path.includes('/content/blog/') ? 'blog' : null;
    if (!name) return;
    const kind = KINDS[name];
    const out = [];
    let run = [];
    const flush = () => {
      if (run.length > 1) {
        out.push({
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['carousel', 'content-gallery'],
            'data-carousel': '',
            'data-loop': '',
            'data-align': 'center',
            role: 'group',
            ariaRoleDescription: 'carousel',
            ariaLabel: 'Image gallery',
            style: kind.style,
          },
          children: [
            { type: 'element', tagName: 'div', properties: { className: ['carousel-track'] }, children: run },
            button('prev', 'Previous image', '←'),
            button('next', 'Next image', '→'),
          ],
        });
      } else {
        out.push(...run.map((img) => ({ type: 'element', tagName: 'p', properties: {}, children: [img] })));
      }
      run = [];
    };
    for (const node of tree.children) {
      const img = soleChild(node, 'img');
      if (img) {
        run.push(img);
        continue;
      }
      if (isBlank(node) && run.length) continue; // whitespace between images keeps the run going
      flush();
      const link = kind.buttons ? soleChild(node, 'a') : null;
      if (link) {
        link.properties = { ...link.properties, className: ['btn'] };
        // Consecutive link-only paragraphs share one row of buttons
        const prev = out.filter((n) => !isBlank(n)).at(-1);
        if (prev?.properties?.className?.includes('btn-row')) prev.children.push(link);
        else out.push({ type: 'element', tagName: 'p', properties: { className: ['btn-row'] }, children: [link] });
      } else if (isBlank(node)) {
        out.push(node);
      } else {
        out.push(node);
      }
    }
    flush();
    tree.children = out;
  };
}
