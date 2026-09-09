const { chromium } = require('playwright')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const SCREENSHOT_DIR = path.join(__dirname, 'baseline_screenshots')
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
  console.log('Starting preview server on port 4173...')
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  })

  // Wait for server to become responsive
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const browser = await chromium.launch({ headless: true })
  const consoleLogs = []

  for (const vp of viewports) {
    for (const r of routes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
        userAgent: vp.isMobile
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
          : undefined
      })

      const page = await context.newPage()
      page.on('console', (msg) => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
          consoleLogs.push(`[${vp.name}][${r.name}] ${msg.type()}: ${msg.text()}`)
        }
      })
      page.on('pageerror', (err) => {
        consoleLogs.push(`[${vp.name}][${r.name}] PAGE_ERROR: ${err.message}`)
      })

      const url = `http://localhost:4173${r.path}`
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
        // Wait for fonts & DOM settles
        await page.waitForTimeout(1000)

        const filename = path.join(SCREENSHOT_DIR, `${r.name}_${vp.name}.png`)
        await page.screenshot({ path: filename, fullPage: false })
        console.log(`✓ Captured ${r.name} @ ${vp.name} (${vp.width}x${vp.height}) -> ${filename}`)
      } catch (e) {
        console.error(`✗ Error on ${r.name} @ ${vp.name}:`, e.message)
      } finally {
        await context.close()
      }
    }
  }

  await browser.close()
  preview.kill()

  console.log('\n--- Console Logs Recorded ---')
  if (consoleLogs.length === 0) {
    console.log('Zero console errors or warnings detected across all routes!')
  } else {
    consoleLogs.forEach((log) => console.log(log))
  }
}

run().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
