import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
const BASE_URL = 'http://127.0.0.1:5173'

async function testUninterruptedIntro() {
  console.log('=== TESTING UNINTERRUPTED INTRO PROGRESSION ===')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const logs = []
  const errors = []
  page.on('console', msg => logs.push(msg.text()))
  page.on('pageerror', err => errors.push(err.message))

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => sessionStorage.clear())
  await page.reload({ waitUntil: 'domcontentloaded' })

  // Capture every 800ms from 0s to 6.4s without any clicking or skipping
  for (let t = 800; t <= 6400; t += 800) {
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `uninterrupted_intro_${t}ms.png`) })
    const status = await page.evaluate(() => {
      const intro = document.querySelector('[role="status"]')
      const wordmark = document.querySelector('h1')
      const letters = document.querySelectorAll('.hero-letter')
      return {
        hasIntro: !!intro,
        wordmarkOpacity: wordmark ? window.getComputedStyle(wordmark).opacity : null,
        letter0Transform: letters[0] ? window.getComputedStyle(letters[0]).transform : null
      }
    })
    console.log(`Time ${t}ms:`, status)
  }

  await browser.close()
  console.log('=== TEST COMPLETE ===')
}

testUninterruptedIntro().catch(console.error)
