// Minimal CSV reader for the image spreadsheets in src/content/images/.
// Handles quoted cells ("a, b", "" for a quote), CRLF, a UTF-8 BOM and blank lines.
/** @param {string} text @returns {Record<string, string>[]} */
export function parseCsv(text) {
  /** @type {string[][]} */
  const rows = [];
  /** @type {string[]} */
  let row = [];
  let cell = '';
  let quoted = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      rows.push(row); row = [];
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }

  const [header, ...body] = rows.filter((r) => r.some((v) => v.trim()));
  if (!header) return [];
  const keys = header.map((k) => k.trim());
  return body.map((r, i) => {
    /** @type {Record<string, string>} */
    const o = { row: String(i) };
    keys.forEach((k, j) => { o[k] = (r[j] ?? '').trim(); });
    return o;
  });
}
