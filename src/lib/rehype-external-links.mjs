// Rehype plugin (all Markdown): links to other sites open in a new tab.
// Keep OWN_HOSTS in sync with src/lib/links.ts.
const OWN_HOSTS = ['judemyers.eu', 'www.judemyers.eu'];

const isExternal = (href) => {
  if (typeof href !== 'string' || !/^(https?:)?\/\//i.test(href)) return false;
  try {
    return !OWN_HOSTS.includes(new URL(href, 'https://judemyers.eu').hostname);
  } catch {
    return false;
  }
};

const visit = (node) => {
  if (node.type === 'element' && node.tagName === 'a' && isExternal(node.properties?.href)) {
    const rel = new Set([].concat(node.properties.rel ?? []).flatMap((r) => String(r).split(/\s+/)).filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    node.properties.target = '_blank';
    node.properties.rel = [...rel];
  }
  node.children?.forEach(visit);
};

export default function rehypeExternalLinks() {
  return (tree) => visit(tree);
}
