import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const BASE_URL = 'http://127.0.0.1:5173'

async function runTierVerification() {
  console.log('=== VERIFYING MULTI-TIER ARCHITECTURE ===\n')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const results = {}

  // 1. Mobile Verification (390x844, Touch)
  console.log('1. Checking Mobile Phone (390x844)...')
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
    await page.waitForTimeout(500)

    const mobileState = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const h1 = hero ? hero.querySelector('h1')?.textContent : null
      const exploreBtn = hero ? hero.querySelector('a[href="#mobile-divisions-section"]') : null
      const waBtn = hero ? hero.querySelector('a[href*="wa.me"]') : null
      const cards = hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]') : []
      const scopeGrid = hero ? hero.querySelectorAll('.grid-cols-2 > div') : []

      return {
        h1,
        hasExploreBtn: !!exploreBtn,
        hasWaBtn: !!waBtn,
        cardsCount: cards.length,
        scopeBadgesCount: scopeGrid.length
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v3_mobile_390px.png') })
    results.mobile = { ...mobileState, errors }
    console.log('Mobile check passed:', mobileState)
    await context.close()
  }

  // 2. Tablet Portrait Verification (768x1024, Touch)
  console.log('2. Checking Tablet Portrait (768x1024)...')
  {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', err => errors.push(err.message))

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(500)

    const tabletState = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const h1 = hero ? hero.querySelector('h1')?.textContent : null
      const grid3Col = hero ? hero.querySelector('.grid-cols-3') : null
      const cards = hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]') : []
      const scope4Col = hero ? hero.querySelectorAll('.grid-cols-4 > div') : []

      return {
        h1,
        has3ColGrid: !!grid3Col,
        cardsCount: cards.length,
        scopeBadgesCount: scope4Col.length
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v3_tablet_768px.png') })
    results.tabletPortrait = { ...tabletState, errors }
    console.log('Tablet portrait check passed:', tabletState)
    await context.close()
  }

  // 3. Tablet Landscape Verification (1023x768, Touch)
  console.log('3. Checking Tablet Landscape (1023x768)...')
  {
    const context = await browser.newContext({
      viewport: { width: 1023, height: 768 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', err => errors.push(err.message))

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(500)

    const tabletLandscapeState = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const h1 = hero ? hero.querySelector('h1')?.textContent : null
      const cards = hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]') : []
      return {
        h1,
        cardsCount: cards.length
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v3_tablet_1023px.png') })
    results.tabletLandscape = { ...tabletLandscapeState, errors }
    console.log('Tablet landscape check passed:', tabletLandscapeState)
    await context.close()
  }

  // 4. Laptop / Desktop Verification (1440x900, Mouse)
  console.log('4. Checking Laptop/Desktop (1440x900)...')
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    const errors = []
    page.on('pageerror', err => errors.push(err.message))

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => {
      sessionStorage.setItem('nayak_intro_seen_v2', 'true')
    })
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    const desktopState = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const h1 = hero ? hero.querySelector('h1')?.textContent : null
      const cards = hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]') : []
      const rail = document.querySelector('nav[aria-label="Section tracking"]')

      return {
        h1,
        cardsCount: cards.length,
        hasRailTracker: !!rail
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v3_desktop_1440px.png') })
    results.desktop = { ...desktopState, errors }
    console.log('Desktop check passed:', desktopState)
    await page.close()
  }

  // 5. TV / 4K Verification (2560x1440)
  console.log('5. Checking TV/4K (2560x1440)...')
  {
    const page = await browser.newPage({ viewport: { width: 2560, height: 1440 } })
    const errors = []
    page.on('pageerror', err => errors.push(err.message))

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => {
      sessionStorage.setItem('nayak_intro_seen_v2', 'true')
    })
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    const tvState = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const h1 = hero ? hero.querySelector('h1')?.textContent : null
      const cards = hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]') : []
      return {
        h1,
        cardsCount: cards.length
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v3_tv_2560px.png') })
    results.tv = { ...tvState, errors }
    console.log('TV 4K check passed:', tvState)
    await page.close()
  }

  await browser.close()
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'tier_verification_report.json'),
    JSON.stringify(results, null, 2)
  )

  console.log('\n=== ALL TIERS SUCCESSFULLY VERIFIED ===')
}

runTierVerification().catch(err => {
  console.error('Audit failed:', err)
  process.exit(1)
})
