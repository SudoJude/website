// Images and files are hosted in Cloudflare R2 behind this domain.
export const MEDIA_BASE = 'https://cdn.judemyers.eu/';

// Spreadsheet cells can hold a full URL or just a path ("photography/croatia-2026/x.webp").
/** @param {string} v */
export const mediaUrl = (v) => (/^https?:\/\//.test(v) ? v : MEDIA_BASE + v.replace(/^\/+/, ''));
