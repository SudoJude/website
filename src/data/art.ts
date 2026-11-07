// Art page images (remote Squarespace CDN for now, like the rest of the site's images).
// `src` is shown on the page, `full` opens in a new tab ("View fullsize" on the old site).
const base = 'https://images.squarespace-cdn.com/content/v1/6977e92fc2a43f6e90f0c94f';

export const art = [
  {
    src: `${base}/763f4a27-91e2-47f5-a1a0-d38800e8a685/HNI_0010.JPG`,
    alt: 'Painting of a slice of melon on a pale green plate against a purple background',
  },
  {
    src: `${base}/d1d241b7-db5a-45fc-ab70-d43f32afb3bb/HNI_0009.JPG`,
    alt: 'Charcoal-style sketch of a tree trunk and leafy canopy',
  },
  {
    src: `${base}/907b6584-8fd5-4212-bae5-f489ca9f3c44/HNI_0008.JPG`,
    alt: 'A pink and white tulip with a green leaf on a blue background',
  },
  {
    src: `${base}/6e897cf7-d388-4efd-93cc-e48629ab6522/HNI_0007.JPG`,
    alt: 'A painting of a red cherry with a brown stem on a light background',
  },
].map((a) => ({ ...a, full: `${a.src}?format=2500w` }));
