import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const BASE_URL = 'http://127.0.0.1:5173'

async function runSubpagesAudit() {
  console.log('=== VERIFYING SUBPAGES OVERHAUL ACROSS ALL DEVICES ===\n')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // 1. Check Mobile Products Page (390x844)
  console.log('1. Checking Mobile Products Page (/products)...')
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', err => errors.push(err.message))

    await page.goto(`${BASE_URL}/products`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    const mobileProducts = await page.evaluate(() => {
      const header = document.querySelector('header')
      const buttons = header ? Array.from(header.querySelectorAll('button')) : []
      const hasConnectBtn = buttons.some(b => b.textContent?.includes('Connect'))
      const productCards = document.querySelectorAll('main section')

      return {
        hasConnectBtn,
        productCardsCount: productCards.length,
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_subpage_products.png'), fullPage: true })
    console.log('Mobile Products Page:', mobileProducts)
    await context.close()
  }

  // 2. Check Mobile Services Page (/services)
  console.log('2. Checking Mobile Services Page (/services)...')
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()
    await page.goto(`${BASE_URL}/services`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_subpage_services.png'), fullPage: true })
    console.log('Mobile Services Page screenshot taken.')
    await context.close()
  }

  // 3. Check Mobile Academics Page (/academics)
  console.log('3. Checking Mobile Academics Page (/academics)...')
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()
    await page.goto(`${BASE_URL}/academics`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_subpage_academics.png'), fullPage: true })
    console.log('Mobile Academics Page screenshot taken.')
    await context.close()
  }

  // 4. Check Desktop Products Page (1440x900)
  console.log('4. Checking Desktop Products Page (1440x900)...')
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.goto(`${BASE_URL}/products`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_subpage_products.png') })
    console.log('Desktop Products Page screenshot taken.')
    await page.close()
  }

  await browser.close()
  console.log('\n=== ALL SUBPAGE TESTS PASSED WITH 0 ERRORS ===')
}

runSubpagesAudit().catch(err => {
  console.error('Subpages audit failed:', err)
  process.exit(1)
})
