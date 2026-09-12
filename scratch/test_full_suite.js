import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/15e51867-ce21-4c93-9533-deb7d262f1de/qa_screenshots'
const BASE_URL = 'http://localhost:5173'

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })

async function testFullSuite() {
  console.log('=== RUNNING FULL ANIMATION & INTERACTION VERIFICATION ===')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('pageerror', err => errors.push(err.message))

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => sessionStorage.clear())
  await page.reload({ waitUntil: 'domcontentloaded' })

  // 1. Capture Intro Rack Focus (t = 500ms)
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_intro_rack_focus.png') })
  console.log('1. Captured 01_intro_rack_focus.png')

  // 2. Capture Laser Seam & Aperture Parting (t = 1650ms)
  await page.waitForTimeout(1150)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_intro_aperture_split.png') })
  console.log('2. Captured 02_intro_aperture_split.png')

  // 3. Capture Continuous Fluid Ball Bounce across letters (t = 2200ms)
  await page.waitForTimeout(550)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_hero_fluid_bounce.png') })
  console.log('3. Captured 03_hero_fluid_bounce.png')

  // 4. Capture Settled Hero Stage 1 with full typography, period dot & subline (t = 3600ms)
  await page.waitForTimeout(1400)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_hero_stage1_settled.png') })
  console.log('4. Captured 04_hero_stage1_settled.png')

  // 5. Test Click Period to cycle accent color
  await page.click('span[aria-label*="Cycle accent color"]')
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_hero_accent_cycled.png') })
  console.log('5. Captured 05_hero_accent_cycled.png')

  // 6. Test Pinned Scroll Scrub into Stage 2 (3D Card Workbench Fan-Out)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'instant' }))
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_hero_stage2_workbench.png') })
  console.log('6. Captured 06_hero_stage2_workbench.png')

  // 7. Test Theme Toggle to Dark Mode
  const themeToggle = await page.$('button[aria-label*="theme"], button[title*="theme"], button[aria-label*="Theme"]')
  if (themeToggle) {
    await themeToggle.click()
    await page.waitForTimeout(300)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_hero_dark_theme.png') })
    console.log('7. Captured 07_hero_dark_theme.png')
  }

  console.log('Total Console/Page Errors:', errors)
  await browser.close()
  console.log('=== VERIFICATION COMPLETED ===')
}

testFullSuite().catch(console.error)
