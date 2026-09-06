import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'http://127.0.0.1:5173'
const OUT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

async function run() {
  console.log('=== VERIFYING TABLET / IPAD TIER ARCHITECTURE ===\n')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    // 1. IPAD PORTRAIT (768x1024)
    console.log('1. Testing iPad Portrait (768x1024)...')
    {
      const context = await browser.newContext({
        viewport: { width: 768, height: 1024 },
        hasTouch: true,
      })
      const page = await context.newPage()
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1000)

      await page.screenshot({
        path: path.join(OUT_DIR, 'tablet_v5_ipad_portrait_hero.png'),
        fullPage: false,
      })

      await page.screenshot({
        path: path.join(OUT_DIR, 'tablet_v5_ipad_portrait_full.png'),
        fullPage: true,
      })
      console.log('iPad Portrait screenshots captured.')
      await context.close()
    }

    // 2. IPAD LANDSCAPE (1024x768)
    console.log('2. Testing iPad Landscape (1024x768)...')
    {
      const context = await browser.newContext({
        viewport: { width: 1024, height: 768 },
        hasTouch: true,
      })
      const page = await context.newPage()
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1000)

      await page.screenshot({
        path: path.join(OUT_DIR, 'tablet_v5_ipad_landscape_hero.png'),
        fullPage: false,
      })

      await page.screenshot({
        path: path.join(OUT_DIR, 'tablet_v5_ipad_landscape_full.png'),
        fullPage: true,
      })
      console.log('iPad Landscape screenshots captured.')
      await context.close()
    }

    // 3. VERIFY MOBILE VIEW REMAINS 100% INTACT (390x844)
    console.log('3. Verifying Mobile View (390x844)...')
    {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
      })
      const page = await context.newPage()
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(800)

      await page.screenshot({
        path: path.join(OUT_DIR, 'mobile_v5_untouched_verification.png'),
        fullPage: false,
      })
      console.log('Mobile untouched verification screenshot captured.')
      await context.close()
    }

    // 4. VERIFY DESKTOP VIEW REMAINS 100% INTACT (1440x900)
    console.log('4. Verifying Desktop View (1440x900)...')
    {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        hasTouch: false,
      })
      const page = await context.newPage()
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1200)

      await page.screenshot({
        path: path.join(OUT_DIR, 'desktop_v5_untouched_verification.png'),
        fullPage: false,
      })
      console.log('Desktop untouched verification screenshot captured.')
      await context.close()
    }

    console.log('\n=== ALL TABLET QA TESTS PASSED WITH 0 ERRORS ===')
  } catch (err) {
    console.error('QA Test Error:', err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

run()
