const { chromium } = require('playwright')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const SCREENSHOT_DIR = path.join(__dirname, 'post_fix_screenshots')
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const routes = [
  { path: '/', name: 'home' },
  { path: '/products', name: 'products' },
  { path: '/services', name: 'services' },
  { path: '/academics', name: 'academics' },
  { path: '/coming-soon', name: 'coming-soon' }
]

const viewports = [
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'tablet', width: 820, height: 1180, isMobile: false, hasTouch: true },
  { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false }
]

async function run() {
  console.log('Starting preview server on port 4174...')
  const preview = spawn('npx', ['vite', 'preview', '--port', '4174', '--strictPort'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  })

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const browser = await chromium.launch({ headless: true })
  const consoleLogs = []

  for (const vp of viewports) {
    for (const r of routes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
      })

      const page = await context.newPage()
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleLogs.push(`[${vp.name}][${r.name}] ERROR: ${msg.text()}`)
        }
      })
      page.on('pageerror', (err) => {
        consoleLogs.push(`[${vp.name}][${r.name}] PAGE_ERROR: ${err.message}`)
      })

      const url = `http://localhost:4174${r.path}`
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
        await page.waitForTimeout(800)

        const filename = path.join(SCREENSHOT_DIR, `${r.name}_${vp.name}.png`)
        await page.screenshot({ path: filename, fullPage: false })
        console.log(`✓ Verified ${r.name} @ ${vp.name} -> ${filename}`)
      } catch (e) {
        console.error(`✗ Error on ${r.name} @ ${vp.name}:`, e.message)
      } finally {
        await context.close()
      }
    }
  }

  await browser.close()
  preview.kill()

  console.log('\n--- Post-Fix Console Audit ---')
  if (consoleLogs.length === 0) {
    console.log('Zero runtime or console errors across all routes & viewports!')
  } else {
    consoleLogs.forEach((log) => console.log(log))
  }
}

run().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
