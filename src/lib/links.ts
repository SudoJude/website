// External links (another site) always open in a new tab. Use `linkProps(href)` on any <a>
// in a template; Markdown content is handled by src/lib/rehype-external-links.mjs.
const OWN_HOSTS = ['judemyers.eu', 'www.judemyers.eu'];

export function isExternal(href: string): boolean {
  if (!/^(https?:)?\/\//i.test(href)) return false; // relative, mailto:, tel:, #anchor …
  try {
    return !OWN_HOSTS.includes(new URL(href, 'https://judemyers.eu').hostname);
  } catch {
    return false;
  }
}

export const linkProps = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
