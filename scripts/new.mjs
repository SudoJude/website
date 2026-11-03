// Usage: npm run new -- <project|post> "Title"
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const [type, ...rest] = process.argv.slice(2);
const title = rest.join(' ').trim();
const kinds = { project: 'projects', post: 'blog' };

if (!kinds[type] || !title) {
  console.error('Usage: npm run new -- <project|post> "Title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dir = `src/content/${kinds[type]}/${slug}`;
if (existsSync(dir)) {
  console.error(`${dir} already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const front =
  type === 'project'
    ? `title: "${title}"\nfeatured: false\norder: 50\n# cover: ./cover.jpg\n# coverAlt: ""`
    : `title: "${title}"\ndate: ${today}\n# cover: ./cover.jpg\n# coverAlt: ""\ndraft: true`;

mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/index.md`, `---\n${front}\n---\n\nWrite here.\n`);
console.log(`Created ${dir}/index.md${type === 'post' ? ' (draft: true — remove when ready)' : ''}`);
