import { chromium } from 'playwright'
const url = 'http://100.122.139.18:4173/'
const browser = await chromium.launch()
const p1 = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await p1.goto(url, { waitUntil: 'load', timeout: 60000 })
await p1.waitForTimeout(2500)
await p1.screenshot({ path: 'preview-shots/fold-1280.png' })
await p1.screenshot({ path: 'preview-shots/full-1280.png', fullPage: true })
const p2 = await browser.newPage({ viewport: { width: 375, height: 700 } })
await p2.goto(url, { waitUntil: 'load', timeout: 60000 })
await p2.waitForTimeout(2500)
await p2.screenshot({ path: 'preview-shots/fold-375.png' })
await browser.close()
console.log('SHOTS OK')
