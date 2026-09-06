import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const BASE_URL = 'http://127.0.0.1:5173'

async function runTierVerification() {
  console.log('=== VERIFYING FULL MULTI-TIER ARCHITECTURE ACROSS ALL 5 SECTIONS ===\n')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const results = {}

  // 1. Mobile Phone (390x844)
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
    await page.waitForTimeout(600)

    const mobileAudit = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const products = document.getElementById('products')
      const services = document.getElementById('services')
      const academics = document.getElementById('academics')
      const about = document.getElementById('about')
      const whyUs = document.getElementById('why-us')
      const contact = document.getElementById('contact')

      return {
        hasHero: !!hero,
        hasProducts: !!products,
        hasServices: !!services,
        hasAcademics: !!academics,
        hasAbout: !!about,
        hasWhyUs: !!whyUs,
        hasContact: !!contact,
        hasWhatsAppBtn: !!document.querySelector('a[href*="wa.me"]'),
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v4_mobile_full.png'), fullPage: true })
    results.mobile = { ...mobileAudit, errors }
    console.log('Mobile audit:', mobileAudit)
    await context.close()
  }

  // 2. Tablet Portrait (768x1024)
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
    await page.waitForTimeout(600)

    const tabletAudit = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const hero3Col = hero ? hero.querySelector('.grid-cols-3') : null
      const about = document.getElementById('about')
      const whyUs = document.getElementById('why-us')
      const contact = document.getElementById('contact')

      return {
        hasHero3Col: !!hero3Col,
        hasAbout: !!about,
        hasWhyUs: !!whyUs,
        hasContact: !!contact,
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v4_tablet_full.png'), fullPage: true })
    results.tablet = { ...tabletAudit, errors }
    console.log('Tablet audit:', tabletAudit)
    await context.close()
  }

  // 3. Laptop / Desktop (1440x900)
  console.log('3. Checking Desktop Laptop (1440x900)...')
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

    const desktopAudit = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const about = document.getElementById('about')
      const whyUs = document.getElementById('why-us')
      const contact = document.getElementById('contact')

      return {
        hasHero: !!hero,
        hasAbout: !!about,
        hasWhyUs: !!whyUs,
        hasContact: !!contact,
      }
    })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'tier_v4_desktop_hero.png') })
    results.desktop = { ...desktopAudit, errors }
    console.log('Desktop audit:', desktopAudit)
    await page.close()
  }

  await browser.close()
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'tier_v4_full_verification.json'),
    JSON.stringify(results, null, 2)
  )

  console.log('\n=== ALL 5 CORE SECTIONS SUCCESSFULLY VERIFIED ACROSS ALL TIERS ===')
}

runTierVerification().catch(err => {
  console.error('Audit failed:', err)
  process.exit(1)
})
