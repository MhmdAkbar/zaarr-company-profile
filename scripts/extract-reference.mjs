// Menangkap referensi dari situs asli: HTML, semua CSS/JS/font mentah,
// screenshot (1280/768/375), dan data style terkomputasi -> reference/
// Pakai: npm run ref
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'

const SITE = 'https://zaar-mocha.vercel.app/'
const OUT = 'reference'
await fs.mkdir(`${OUT}/raw`, { recursive: true })
await fs.mkdir(`${OUT}/original`, { recursive: true })

const browser = await chromium.launch()

// ---------- 1) Desktop: simpan resource mentah + data style ----------
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
const page = await ctx.newPage()
const savedFiles = []

page.on('response', async (res) => {
  try {
    const type = res.request().resourceType()
    if (!['document', 'stylesheet', 'script', 'font'].includes(type)) return
    const u = new URL(res.url())
    const name = path.basename(u.pathname) || 'index.html'
    await fs.writeFile(`${OUT}/raw/${name}`, await res.body())
    savedFiles.push({ type, url: res.url(), file: name })
  } catch {}
})

await page.goto(SITE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const data = await page.evaluate(() => {
  const selectors = [
    'body', 'nav', 'header', 'nav a', 'video',
    'h1', 'h2', 'h3', 'h4', 'h5', 'p',
    'a[href="#products"]', 'a[href="#"]',
    '#about', '#services', '#products', 'footer', 'footer h5', 'img',
  ]
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return {
      rect: { x: r.x, y: r.y + scrollY, width: r.width, height: r.height },
      color: s.color, bg: s.backgroundColor, bgImage: s.backgroundImage,
      font: s.fontFamily, size: s.fontSize, weight: s.fontWeight,
      lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
      textTransform: s.textTransform, textAlign: s.textAlign,
      padding: s.padding, margin: s.margin, radius: s.borderRadius,
      shadow: s.boxShadow, border: s.border, maxWidth: s.maxWidth,
      position: s.position, display: s.display, gap: s.gap,
      flexDirection: s.flexDirection, justifyContent: s.justifyContent,
      alignItems: s.alignItems, gridTemplateColumns: s.gridTemplateColumns,
      objectFit: s.objectFit, opacity: s.opacity, zIndex: s.zIndex,
      transition: s.transition,
    }
  }
  const styles = {}
  selectors.forEach((sel) => (styles[sel] = pick(sel)))

  // semua nilai unik yang dipakai di halaman (untuk menentukan token)
  const tally = { color: {}, bg: {}, font: {}, size: {}, radius: {}, shadow: {} }
  const add = (k, v) => v && (tally[k][v] = (tally[k][v] || 0) + 1)
  document.querySelectorAll('body, body *').forEach((el) => {
    const s = getComputedStyle(el)
    add('color', s.color)
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') add('bg', s.backgroundColor)
    add('font', s.fontFamily)
    add('size', s.fontSize)
    if (s.borderRadius !== '0px') add('radius', s.borderRadius)
    if (s.boxShadow !== 'none') add('shadow', s.boxShadow)
  })

  const rootVars = {}
  for (const sheet of document.styleSheets) {
    try {
      for (const r of sheet.cssRules) {
        if (r.selectorText === ':root') {
          for (const n of r.style) {
            if (n.startsWith('--')) rootVars[n] = r.style.getPropertyValue(n).trim()
          }
        }
      }
    } catch {}
  }

  // seluruh CSS terparsir (termasuk :hover dan @media), untuk porting 1:1
  let cssText = ''
  for (const sheet of document.styleSheets) {
    try {
      for (const r of sheet.cssRules) cssText += r.cssText + '\n'
    } catch {}
  }

  const video = document.querySelector('video')
  return {
    styles, tally, rootVars, cssText,
    fonts: [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.status}`),
    fontLinks: [...document.querySelectorAll('link[href*="font"]')].map((l) => l.href),
    videoHtml: video ? video.outerHTML : null,
    bodyHtml: document.body.outerHTML,
    headHtml: document.head.outerHTML,
  }
})

await fs.writeFile(`${OUT}/body.html`, data.bodyHtml)
await fs.writeFile(`${OUT}/head.html`, data.headHtml)
await fs.writeFile(`${OUT}/original.css`, data.cssText)
const { bodyHtml, headHtml, cssText, ...tokens } = data
tokens.savedFiles = savedFiles
await fs.writeFile(`${OUT}/tokens.json`, JSON.stringify(tokens, null, 2))

// ---------- 2) Screenshot di 3 lebar ----------
for (const w of [1280, 768, 375]) {
  const p = await browser.newPage({ viewport: { width: w, height: 800 } })
  await p.goto(SITE, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1000)
  await p.screenshot({ path: `${OUT}/original/fold-${w}.png` })
  await p.screenshot({ path: `${OUT}/original/full-${w}.png`, fullPage: true })
  for (const sel of ['nav', '#about', '#services', '#products', 'footer']) {
    const loc = p.locator(sel).first()
    if (await loc.count()) {
      await loc.screenshot({ path: `${OUT}/original/${sel.replace('#', '')}-${w}.png` })
    }
  }
  await p.close()
}

await browser.close()
console.log('Selesai. Lihat folder reference/ (tokens.json, original.css, body.html, original/*.png)')
