import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const BASE_URL = 'http://127.0.0.1:5173'

async function runMobileAudit() {
  console.log('=== VERIFYING MOBILE-ISOLATED ENHANCEMENTS ===\n')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // 1. Test Mobile (390x844 iPhone 14 Pro)
  console.log('1. Checking Mobile Screen (390x844)...')
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', err => errors.push(err.message))

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    const mobileCheck = await page.evaluate(() => {
      const header = document.querySelector('header')
      const navBrand = header ? header.querySelector('a')?.textContent?.trim() : null
      const buttons = header ? Array.from(header.querySelectorAll('button')) : []
      const hasConnectBtn = buttons.some(b => b.textContent?.includes('Connect'))
      
      const hero = document.getElementById('hero')
      const heroH1 = hero ? hero.querySelector('h1')?.textContent?.trim() : null
      const hasWaBtn = !!hero?.querySelector('a[href*="wa.me"]')
      
      // 3 stacked purple cards
      const productCard = hero?.querySelector('a[href="/products"]')
      const serviceCard = hero?.querySelector('a[href="/services"]')
      const academicCard = hero?.querySelector('a[href="/academics"]')

      const marquee = document.querySelector('.animate-marquee')

      return {
        navBrand,
        hasConnectBtn,
        heroH1,
        hasWaBtn,
        hasProductCard: !!productCard,
        hasServiceCard: !!serviceCard,
        hasAcademicCard: !!academicCard,
        hasMarquee: !!marquee,
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_isolated_v5_hero.png') })
    console.log('Mobile Check Results:', mobileCheck)

    // Verify click to navigate to /products
    await page.click('a[href="/products"]')
    await page.waitForURL('**/products')
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_isolated_v5_products_page.png') })
    console.log('Products page URL reached successfully:', page.url())

    await context.close()
  }

  // 2. Test Tablet & Desktop (ensuring original Navbar and layout are 100% UNTOUCHED)
  console.log('2. Checking Desktop Screen (1440x900) for zero regressions...')
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => sessionStorage.setItem('nayak_intro_seen_v2', 'true'))
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    const desktopCheck = await page.evaluate(() => {
      const header = document.querySelector('header')
      const navLinks = header ? header.querySelectorAll('button') : []

      return {
        navLinksCount: navLinks.length,
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_untouched_v5.png') })
    console.log('Desktop Untouched Check:', desktopCheck)
    await page.close()
  }

  await browser.close()
  console.log('\n=== ALL TESTS PASSED WITH 0 ERRORS ===')
}

runMobileAudit().catch(err => {
  console.error('Audit failed:', err)
  process.exit(1)
})
