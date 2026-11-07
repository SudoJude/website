// Rehype plugin for project case studies only (src/content/projects).
// - A run of 2+ image-only paragraphs becomes a horizontal carousel ("reel").
// - A paragraph containing only a link becomes a blue button.
const isBlank = (n) => n.type === 'text' && !n.value.trim();
const significant = (p) => p.children.filter((c) => !isBlank(c));

const soleChild = (node, tag) => {
  if (node.type !== 'element' || node.tagName !== 'p') return null;
  const kids = significant(node);
  return kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === tag ? kids[0] : null;
};

const button = (dir, label, text) => ({
  type: 'element',
  tagName: 'button',
  properties: { type: 'button', className: ['reel-nav', dir], ariaLabel: label, 'data-dir': dir === 'prev' ? '-1' : '1' },
  children: [{ type: 'text', value: text }],
});

export default function rehypeProject() {
  return (tree, file) => {
    if (!String(file?.path ?? '').includes('/content/projects/')) return;
    const out = [];
    let run = [];
    const flush = () => {
      if (run.length > 1) {
        out.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['reel'], 'data-reel': '' },
          children: [
            { type: 'element', tagName: 'div', properties: { className: ['reel-track'] }, children: run },
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
      const link = soleChild(node, 'a');
      if (link) {
        link.properties = { ...link.properties, className: ['btn'] };
        out.push({ type: 'element', tagName: 'p', properties: { className: ['btn-row'] }, children: [link] });
      } else {
        out.push(node);
      }
    }
    flush();
    tree.children = out;
  };
}
