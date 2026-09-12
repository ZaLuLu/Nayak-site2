import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/15e51867-ce21-4c93-9533-deb7d262f1de/qa_screenshots'
const BASE_URL = 'http://localhost:5173'

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })

async function testHeroUpgrade() {
  console.log('=== TESTING UPGRADED INTRO AND HERO SEQUENCE ===')

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

  // 1. Capture early intro (optical typography rack-focus)
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_intro_rack_focus.png') })
  console.log('Captured 01_intro_rack_focus.png')

  // 2. Capture laser ignition & beam bloom
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_intro_laser_split.png') })
  console.log('Captured 02_intro_laser_split.png')

  // 3. Capture ball plunge & letter bounce
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_hero_letter_bounce.png') })
  console.log('Captured 03_hero_letter_bounce.png')

  // 4. Capture settled hero with full wordmark & period
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_hero_settled.png') })
  console.log('Captured 04_hero_settled.png')

  // 5. Test interactive period click to cycle accent
  const period = await page.$('span[aria-label*="Cycle accent color"]')
  if (period) {
    await period.click()
    await page.waitForTimeout(300)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_hero_accent_cycled.png') })
    console.log('Captured 05_hero_accent_cycled.png')
  }

  // 6. Test scroll scrub into 3D card workbench
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'instant' }))
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_hero_scroll_workbench.png') })
  console.log('Captured 06_hero_scroll_workbench.png')

  console.log('Page Errors:', errors)
  await browser.close()
  console.log('=== TEST COMPLETED SUCCESSFULLY ===')
}

testHeroUpgrade().catch(console.error)
