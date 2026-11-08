// Images and files are hosted in Cloudflare R2 behind this domain.
export const MEDIA_BASE = 'https://cdn.judemyers.eu/';

// Squarespace's CDN resizes with ?format=<w>w; R2 files are served exactly as uploaded.
/** @param {string} url */
export const isSquarespace = (url) => url.includes('squarespace-cdn');

/** @param {string} segment */
const encodeSegment = (segment) => {
  try {
    return encodeURIComponent(decodeURIComponent(segment)); // never double-encodes
  } catch {
    return encodeURIComponent(segment);
  }
};

// Spreadsheet cells can hold a full URL or just a path ("photography/croatia-2026/x.webp").
// Paths are URL-encoded, so spaces, '#' and '?' in file names still work.
/** @param {string} v */
export const mediaUrl = (v) =>
  /^https?:\/\//.test(v) ? v : MEDIA_BASE + v.replace(/^\/+/, '').split('/').map(encodeSegment).join('/');
