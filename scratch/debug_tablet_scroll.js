import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const OUT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'

async function debug() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    hasTouch: true,
  })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  // Get initial metrics
  const info1 = await page.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      innerHeight: window.innerHeight,
      scrollY: window.scrollY,
      contact: document.getElementById('contact')?.getBoundingClientRect(),
      footer: document.querySelector('footer')?.getBoundingClientRect(),
    }
  })
  console.log('Before scroll:', JSON.stringify(info1, null, 2))

  // Scroll to bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight)
  })
  await page.waitForTimeout(1000)

  const info2 = await page.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      innerHeight: window.innerHeight,
      scrollY: window.scrollY,
      contact: document.getElementById('contact')?.getBoundingClientRect(),
      footer: document.querySelector('footer')?.getBoundingClientRect(),
    }
  })
  console.log('After scroll to bottom:', JSON.stringify(info2, null, 2))

  await page.screenshot({
    path: path.join(OUT_DIR, 'tablet_scroll_bottom_check.png'),
    fullPage: false,
  })

  await browser.close()
}

debug().catch(console.error)
