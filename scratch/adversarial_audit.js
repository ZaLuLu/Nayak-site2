import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = '/home/nawaz/.gemini/antigravity-ide/brain/258d2d92-7abb-4153-b3d3-e534941b7e40/qa_screenshots'
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const BASE_URL = 'http://127.0.0.1:5173'

async function runAdversarialAudit() {
  console.log('=== STARTING RIGOROUS ADVERSARIAL AUDIT ===\n')

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/nawaz/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const results = {}

  // ---------------------------------------------------------------------------
  // TEST 1: Desktop Pinned Scroll Scrub Verification (1440x900)
  // ---------------------------------------------------------------------------
  console.log('--- Test 1: Desktop Pinned Scroll Scrub Verification ---')
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    const logs = []
    const errors = []
    page.on('console', msg => logs.push(msg.text()))
    page.on('pageerror', err => errors.push(err.message))

    // Set sessionStorage seen so we test hero directly at rest and during scrub
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => {
      sessionStorage.setItem('nayak_intro_seen_v2', 'true')
    })
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    // Capture Stage 1 at rest
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'adv_v2_test1_stage1_at_rest.png') })

    const stage1Stats = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const wordmark = hero ? hero.querySelector('h1') : null
      const scrollPrompt = hero ? hero.querySelector('[class*="animate-bounce"]') : null
      const revealed = hero ? hero.querySelector('.perspective-1000') : null
      const revealedContainer = revealed ? revealed.closest('.absolute') : null
      const cards = hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]') : []

      return {
        wordmarkVisible: wordmark ? window.getComputedStyle(wordmark).opacity : null,
        wordmarkScale: wordmark ? window.getComputedStyle(wordmark).transform : null,
        scrollPromptVisible: scrollPrompt ? window.getComputedStyle(scrollPrompt.parentElement).opacity : null,
        revealedOpacity: revealedContainer ? window.getComputedStyle(revealedContainer).opacity : null,
        revealedPointerEvents: revealedContainer ? window.getComputedStyle(revealedContainer).pointerEvents : null,
        cardsCount: cards.length
      }
    })
    console.log('Stage 1 Stats (Scroll pos 0):', stage1Stats)

    // Scrub Progression: 300px, 600px, 900px, 1200px
    const scrubPositions = [300, 600, 900, 1200]
    const scrubData = []

    for (const pos of scrubPositions) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), pos)
      await page.waitForTimeout(300)
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `adv_v2_test1_scrub_${pos}px.png`) })

      const posStats = await page.evaluate(y => {
        const hero = document.getElementById('hero')
        const wordmark = hero ? hero.querySelector('h1') : null
        const revealed = hero ? hero.querySelector('.perspective-1000') : null
        const revealedContainer = revealed ? revealed.closest('.absolute') : null
        const cards = hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]') : []

        return {
          scrollY: window.scrollY,
          wordmarkOpacity: wordmark ? window.getComputedStyle(wordmark).opacity : null,
          revealedOpacity: revealedContainer ? window.getComputedStyle(revealedContainer).opacity : null,
          revealedPointerEvents: revealedContainer ? window.getComputedStyle(revealedContainer).pointerEvents : null,
          cardTransforms: Array.from(cards).map(c => window.getComputedStyle(c).transform)
        }
      }, pos)
      console.log(`Scrub stats at ${pos}px:`, posStats)
      scrubData.push(posStats)
    }

    // Test 3D Mouse Tilt on Card 0 at 1200px scroll
    const card0 = await page.$('#hero a[href="/products"]')
    let tiltTransform = ''
    if (card0) {
      const box = await card0.boundingBox()
      if (box) {
        await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.8)
        await page.waitForTimeout(150)
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'adv_v2_test1_card_tilt_hover.png') })
        tiltTransform = await page.evaluate(el => el ? window.getComputedStyle(el).transform : '', card0)
      }
    }
    console.log('Card 0 Tilt Transform on Hover:', tiltTransform)

    // Test Navigation Jump to bottom and back
    await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'instant' }))
    await page.waitForTimeout(300)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'adv_v2_test1_nav_jump_3000px.png') })

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(300)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'adv_v2_test1_back_to_0px.png') })

    results.test1_pinned_scrub = {
      stage1Stats,
      scrubData,
      tiltTransform,
      errors
    }
    await page.close()
  }

  // ---------------------------------------------------------------------------
  // TEST 2: Full Intro Sequence Cold Load & Bouncing Ball Handoff
  // ---------------------------------------------------------------------------
  console.log('\n--- Test 2: Full Intro Cold Load & Bouncing Ball Handoff ---')
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    const errors = []
    page.on('pageerror', err => errors.push(err.message))

    // Clear session storage to force full cold intro
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => sessionStorage.clear())
    await page.reload({ waitUntil: 'domcontentloaded' })

    // Frame 1: Mid phrase (1.5s)
    await page.waitForTimeout(1500)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'adv_v2_test2_intro_phrase.png') })

    // Frame 2: Seam split (3.5s)
    await page.waitForTimeout(2000)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'adv_v2_test2_intro_seam_split.png') })

    // Frame 3: Settled on Stage 1 (6.0s)
    await page.waitForTimeout(2500)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'adv_v2_test2_intro_settled_stage1.png') })

    const settledCheck = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const wordmark = hero ? hero.querySelector('h1') : null
      const letters = hero ? hero.querySelectorAll('.hero-letter') : []
      const letterTransforms = Array.from(letters).map(l => window.getComputedStyle(l).transform)
      const hasNaN = letterTransforms.some(t => t.includes('NaN'))
      return {
        wordmarkVisible: wordmark ? window.getComputedStyle(wordmark).opacity : null,
        letterCount: letters.length,
        hasNaN
      }
    })
    console.log('Intro Cold Load Settled Stats:', settledCheck)
    results.test2_cold_intro = { settledCheck, errors }
    await page.close()
  }

  // ---------------------------------------------------------------------------
  // TEST 3: Boundary Breakpoint Audits across all 4 Tiers
  // ---------------------------------------------------------------------------
  console.log('\n--- Test 3: Boundary Breakpoint Audits across All Tiers ---')
  {
    const breakpoints = [
      { name: 'mobile_767px', width: 767, height: 900, isTouch: true },
      { name: 'tablet_portrait_768px', width: 768, height: 1024, isTouch: true },
      { name: 'tablet_landscape_1023px', width: 1023, height: 768, isTouch: true },
      { name: 'laptop_mouse_1024px', width: 1024, height: 800, isTouch: false },
      { name: 'laptop_mouse_1279px', width: 1279, height: 900, isTouch: false },
      { name: 'tv_ultrawide_1280px', width: 1280, height: 900, isTouch: false },
      { name: 'tv_4k_2560px', width: 2560, height: 1440, isTouch: false }
    ]

    const boundaryAudits = {}

    for (const bp of breakpoints) {
      const page = await browser.newPage({
        viewport: { width: bp.width, height: bp.height },
        hasTouch: bp.isTouch
      })
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
      if (!bp.isTouch && bp.width >= 1024) {
        // Preset seen to inspect hero layout directly
        await page.evaluate(() => sessionStorage.setItem('nayak_intro_seen_v2', 'true'))
        await page.reload({ waitUntil: 'domcontentloaded' })
      }
      await page.waitForTimeout(600)
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `adv_v2_test3_${bp.name}.png`) })

      const audit = await page.evaluate(() => {
        const root = document.documentElement
        const deviceType = root.getAttribute('data-device')
        const touchAttr = root.getAttribute('data-touch')
        const rail = document.querySelector('aside')
        const railVisible = rail ? window.getComputedStyle(rail).display !== 'none' : false
        const hero = document.getElementById('hero')
        const hasMobileDeck = !!hero?.querySelector('[class*="overflow-x-auto"]')
        const has3ColDossier = !!hero?.querySelector('.grid-cols-3')
        return {
          deviceType,
          touchAttr,
          railVisible,
          hasMobileDeck,
          has3ColDossier,
          cardsCount: hero ? hero.querySelectorAll('a[href="/products"], a[href="/services"], a[href="/academics"]').length : 0
        }
      })
      console.log(`Audit for ${bp.name}:`, audit)
      boundaryAudits[bp.name] = audit
      await page.close()
    }
    results.test3_boundaries = boundaryAudits
  }

  // ---------------------------------------------------------------------------
  // TEST 4: Lenis Touch Isolation & Virtual Keyboard Flip Guard
  // ---------------------------------------------------------------------------
  console.log('\n--- Test 4: Lenis Touch Isolation & Virtual Keyboard Guard ---')
  {
    // Mobile Touch page
    const touchPage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      hasTouch: true
    })
    await touchPage.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await touchPage.waitForTimeout(400)

    const lenisCheck = await touchPage.evaluate(() => ({
      hasLenisClass: document.documentElement.classList.contains('lenis'),
      hasLenisGlobal: !!window.lenis
    }))

    // Height simulation (virtual keyboard opens)
    const beforeDevice = await touchPage.evaluate(() => document.documentElement.getAttribute('data-device'))
    await touchPage.setViewportSize({ width: 390, height: 420 })
    await touchPage.waitForTimeout(250)
    const afterDevice = await touchPage.evaluate(() => document.documentElement.getAttribute('data-device'))

    console.log('Lenis Check on Touch:', lenisCheck)
    console.log(`Keyboard Resize: Before=${beforeDevice}, After=${afterDevice}`)
    await touchPage.close()

    results.test4_touch_and_keyboard = {
      lenisCheck,
      keyboardGuard: { beforeDevice, afterDevice, tierPreserved: beforeDevice === afterDevice }
    }
  }

  // Save report
  fs.writeFileSync(path.join(SCREENSHOT_DIR, 'rigorous_adversarial_report.json'), JSON.stringify(results, null, 2))
  console.log('\n=== ALL RIGOROUS AUDITS COMPLETE ===')
  await browser.close()
}

runAdversarialAudit().catch(err => {
  console.error('Audit failed:', err)
  process.exit(1)
})
