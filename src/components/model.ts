// Behaviour for every `.model` viewer (markup from src/lib/rehype-models.mjs).
// <model-viewer> (~300 KB) and the .glb are only downloaded when a visitor clicks "View in 3D".

type Viewer = HTMLElement & { src: string | null };

function init(root: HTMLElement): void {
  const viewer = root.querySelector<Viewer>('model-viewer');
  const poster = root.querySelector<HTMLButtonElement>('.model__poster');
  const label = poster?.querySelector<HTMLElement>('.model__load');
  if (!viewer || !poster || !label) return;
  // True when focus is still where the click left it (the browser may not have moved it off the button yet).
  const focusUnmoved = () => document.activeElement === document.body || document.activeElement === poster;
  let refocus = false;

  poster.addEventListener('click', async () => {
    if (poster.disabled) return;
    refocus = document.activeElement === poster; // disabling the button drops its focus
    poster.disabled = true;
    label.textContent = 'Loading…';
    try {
      await import('@google/model-viewer');
      await customElements.whenDefined('model-viewer');
      viewer.src = viewer.dataset.src!;
    } catch {
      fail();
    }
  });
  viewer.addEventListener('load', () => {
    const handOver = refocus && focusUnmoved();
    poster.hidden = true;
    // Give keyboard focus to the viewer's interaction layer (focusable once the model is on screen).
    if (handOver) requestAnimationFrame(() => viewer.shadowRoot?.querySelector<HTMLElement>('.userInput')?.focus());
  });
  viewer.addEventListener('error', fail);

  function fail(): void {
    if (poster!.hidden) return;
    viewer!.src = null; // so the next click starts a fresh download
    poster!.disabled = false;
    if (refocus && focusUnmoved()) poster!.focus();
    label!.textContent = "Couldn't load the model. Try again";
  }
}

document.querySelectorAll<HTMLElement>('.model').forEach(init);

if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.model model-viewer').forEach((el) => el.removeAttribute('auto-rotate'));
}
