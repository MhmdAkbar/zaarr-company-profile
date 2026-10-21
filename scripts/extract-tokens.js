// Buka https://zaar-mocha.vercel.app/ -> DevTools -> Console -> paste semua file ini -> Enter.
// Hasil JSON otomatis masuk clipboard (copy()). Kirim ke Claude untuk diisi ke tokens.css.
(() => {
  const selectors = [
    'body', 'nav', 'header', 'nav a', 'video',
    'h1', 'h2', 'h3', 'h4', 'h5', 'p',
    'a[href="#products"]', 'a[href="#"]',
    '#about', '#services', '#products', 'footer', 'footer h5', 'img',
  ];
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      color: s.color, bg: s.backgroundColor, bgImage: s.backgroundImage,
      font: s.fontFamily, size: s.fontSize, weight: s.fontWeight,
      lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
      textTransform: s.textTransform, padding: s.padding, margin: s.margin,
      radius: s.borderRadius, shadow: s.boxShadow, border: s.border,
      maxWidth: s.maxWidth, height: s.height, position: s.position,
      display: s.display, gap: s.gap,
    };
  };
  const out = { styles: {}, rootVars: {}, fonts: [], fontLinks: [] };
  selectors.forEach((sel) => (out.styles[sel] = pick(sel)));
  for (const sheet of document.styleSheets) {
    try {
      for (const r of sheet.cssRules) {
        if (r.selectorText === ':root') {
          for (const n of r.style) {
            if (n.startsWith('--')) out.rootVars[n] = r.style.getPropertyValue(n).trim();
          }
        }
      }
    } catch (e) {}
  }
  out.fonts = [...document.fonts].map((f) => `${f.family} ${f.weight}`);
  out.fontLinks = [...document.querySelectorAll('link[href*="fonts"]')].map((l) => l.href);
  copy(JSON.stringify(out, null, 2));
  console.log('Tersalin ke clipboard.');
})();
