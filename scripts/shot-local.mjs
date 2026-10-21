// Screenshot versi React lokal di 3 lebar, untuk dibandingkan dengan reference/original/
// Pakai: npm run build && npx vite preview --port 4173 &   lalu   npm run shot
import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const base = process.argv[2] ?? 'http://localhost:4173/'
await fs.mkdir('reference/local', { recursive: true })
const browser = await chromium.launch()
for (const w of [1280, 768, 375]) {
  const p = await browser.newPage({ viewport: { width: w, height: 800 } })
  await p.goto(base, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1000)
  await p.screenshot({ path: `reference/local/fold-${w}.png` })
  await p.screenshot({ path: `reference/local/full-${w}.png`, fullPage: true })
  for (const sel of ['nav', '#about', '#services', '#products', 'footer']) {
    const loc = p.locator(sel).first()
    if (await loc.count()) {
      await loc.screenshot({ path: `reference/local/${sel.replace('#', '')}-${w}.png` })
    }
  }
  await p.close()
}
await browser.close()
console.log('Selesai. Lihat reference/local/')
