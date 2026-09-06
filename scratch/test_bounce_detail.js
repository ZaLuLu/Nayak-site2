import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
const BASE_URL = 'http://127.0.0.1:5173'

async function testBounceDetail() {
  console.log('=== TESTING LETTER BOUNCE DETAIL FRAME BY FRAME ===')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => sessionStorage.clear())
  await page.reload({ waitUntil: 'domcontentloaded' })

  // Wait until phrase 2 finishes (~3000ms)
  await page.waitForTimeout(3000)

  // Capture every 250ms during the shutter split & letter bounce (3000ms -> 5500ms)
  for (let t = 3000; t <= 5500; t += 250) {
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `bounce_frame_${t}ms.png`) })
    const info = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.hero-letter')).map(l => ({
        text: l.innerText,
        opacity: window.getComputedStyle(l).opacity,
        scale: window.getComputedStyle(l).transform
      }))
      const ball = document.querySelector('.hero-letter')?.parentElement?.parentElement?.querySelector('.rounded-full')
      return {
        lettersRevealed: letters.filter(l => l.opacity === '1').length,
        lettersCount: letters.length
      }
    })
    console.log(`t = ${t}ms: ${info.lettersRevealed} / ${info.lettersCount} letters revealed`)
  }

  await browser.close()
  console.log('=== TEST COMPLETE ===')
}

testBounceDetail().catch(console.error)
