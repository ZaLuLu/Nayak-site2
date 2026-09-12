import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/5e3f47ac-3918-43cb-a865-d7a0344f3955/screenshots'
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const BASE_URL = 'http://localhost:5173'

async function runTest() {
  console.log('=== TESTING WORDMARK TO SIDE RAIL KINETIC DOCKING ===')

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

  // 1. Wait for intro to finish / split (around 2s)
  await page.waitForTimeout(2200)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_intro_split_hero_bounce.png') })

  // 2. Wait for ball bounce across wordmark to fullstop (around 4s)
  await page.waitForTimeout(1800)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_wordmark_docked_fullstop.png') })

  // Check state of full stop & side rail
  const railState = await page.evaluate(() => {
    const period = document.querySelector('h1 span:last-child')
    const railNav = document.querySelector('nav[aria-label="Section Navigation Tracker"]')
    const dots = document.querySelectorAll('nav[aria-label="Section Navigation Tracker"] button')
    return {
      periodVisible: period ? window.getComputedStyle(period).opacity : null,
      periodScale: period ? window.getComputedStyle(period).transform : null,
      railExists: !!railNav,
      dotCount: dots.length,
      firstDotOpacity: dots[0] ? window.getComputedStyle(dots[0]).opacity : null
    }
  })
  console.log('Rail & Fullstop State:', railState)

  // 3. Wait for side rail rising ball to reach Dot 01 and complete cascade
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_rail_ignited_complete.png') })

  await browser.close()
  console.log('=== TEST COMPLETED SUCCESSFULLY ===')
}

runTest().catch(console.error)
