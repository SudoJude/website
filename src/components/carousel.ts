// Behaviour for every `[data-carousel]` on the page (see Carousel.astro).
// With `data-loop` the slides are cloned on both sides and the scroll position is
// silently moved by one set whenever it drifts, so the carousel wraps in both directions.

function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.complete) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener('load', () => resolve(), { once: true });
    img.addEventListener('error', () => resolve(), { once: true });
  });
}

function initCarousel(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('.carousel-track');
  if (!track) return;
  const loop = root.hasAttribute('data-loop');
  const center = root.dataset.align === 'center';
  const originals = Array.from(track.children) as HTMLElement[];
  const navs = root.querySelectorAll<HTMLButtonElement>('.carousel-nav');

  if (originals.length < 2) {
    navs.forEach((b) => b.remove());
    return;
  }

  const slides = () => Array.from(track.children) as HTMLElement[];
  const padLeft = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;
  // scrollLeft at which a slide sits in its snap position
  const snapLeft = (el: HTMLElement) =>
    center ? el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2 : el.offsetLeft - padLeft();

  let setWidth = 0; // width of one full set of slides, including the gap after it

  const build = () => {
    track.querySelectorAll('[data-clone]').forEach((c) => c.remove());
    const first = originals[0];
    const last = originals[originals.length - 1];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    setWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft + gap;
    const copies = setWidth > 0 ? Math.max(1, Math.ceil(track.clientWidth / setWidth)) : 1;

    const makeSet = () =>
      originals.map((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.dataset.clone = '';
        clone.setAttribute('aria-hidden', 'true');
        clone.inert = true;
        return clone;
      });
    const before: HTMLElement[] = [];
    const after: HTMLElement[] = [];
    for (let i = 0; i < copies; i++) {
      before.push(...makeSet());
      after.push(...makeSet());
    }
    track.prepend(...before);
    track.append(...after);
    track.scrollTo({ left: snapLeft(first), behavior: 'instant' });
  };

  const shift = (dx: number) => {
    track.style.scrollSnapType = 'none';
    track.scrollLeft += dx;
    track.style.scrollSnapType = '';
  };

  // After scrolling stops, move back to the middle set if we drifted into a clone set.
  const settle = () => {
    if (setWidth <= 0) return;
    const home = snapLeft(originals[0]);
    const x = track.scrollLeft;
    if (x < home - setWidth / 2) shift(setWidth);
    else if (x > home + setWidth / 2) shift(-setWidth);
  };

  navs.forEach((b) =>
    b.addEventListener('click', () => {
      const all = slides();
      let current = 0;
      let best = Infinity;
      all.forEach((s, i) => {
        const d = Math.abs(snapLeft(s) - track.scrollLeft);
        if (d < best) {
          best = d;
          current = i;
        }
      });
      const target = all[Math.min(all.length - 1, Math.max(0, current + Number(b.dataset.dir)))];
      track.scrollTo({ left: snapLeft(target), behavior: 'smooth' });
    }),
  );

  if (!loop) return;

  root.classList.add('js-loop');
  const imgs = Array.from(track.querySelectorAll('img'));
  imgs.forEach((img) => (img.loading = 'eager')); // widths must be known to measure sets
  Promise.all(imgs.map(waitForImage)).then(() => {
    build();
    root.classList.add('is-ready');
  });

  let timer = 0;
  track.addEventListener(
    'scroll',
    () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 120);
    },
    { passive: true },
  );

  let width = root.clientWidth;
  window.addEventListener('resize', () => {
    if (root.clientWidth === width) return;
    width = root.clientWidth;
    build();
  });
}

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);
