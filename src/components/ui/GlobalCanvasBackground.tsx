import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../utils/themeContext'

gsap.registerPlugin(ScrollTrigger)

interface Mote {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
  alpha: number
  pulseSpeed: number
  pulsePhase: number
}

/**
 * GlobalCanvasBackground:
 * Ultra-Clean High-End Luxury Studio Background
 * 
 * 🌑 Dark Mode — "Midnight Velvet & Haute Horlogerie":
 * - Pure, seamless obsidian void (#08060F) with ZERO harsh vertical seams or cluttered constellation lines.
 * - Soft royal amethyst & sapphire indigo luminous ambient aura pools.
 * - Sparse, ethereal floating micro-stardust motes with gentle twinkle.
 * - Smooth liquid specular cursor spotlight.
 * 
 * ☀️ Light Mode — "Architectural Marble & Silk Gallery":
 * - Warm Italian alabaster marble canvas (#FCFBFF).
 * - Precision architectural drafting grid with '+' coordinate registration crosshairs.
 * - Daylight sunlight caustics and interactive surveyor cursor guide axes.
 */
export function GlobalCanvasBackground() {
  const { themeMode } = useTheme()
  const isDark = themeMode === 'dark'

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Cursor coordinate tracking
  const mouseRef = useRef({ x: -9999, y: -9999, targetX: -9999, targetY: -9999, isHovering: false })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
      mouseRef.current.isHovering = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false
      mouseRef.current.targetX = -9999
      mouseRef.current.targetY = -9999
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Parallax on ambient aurora light pools
  useEffect(() => {
    const aurora = auroraRef.current
    if (!aurora) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(aurora, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      })
    })

    return () => mm.revert()
  }, [])

  // Interactive HTML5 Canvas Dual-Mode Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Sparse luxury micro-motes for Dark Mode (clean, quiet elegance)
    const MOTE_COUNT = 36
    const motes: Mote[] = []
    for (let i = 0; i < MOTE_COUNT; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.15 - Math.random() * 0.25,
        size: 0.8 + Math.random() * 1.5,
        baseAlpha: 0.15 + Math.random() * 0.35,
        alpha: 0.3,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animId: number

    const render = () => {
      time += 0.015

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1

      ctx.clearRect(0, 0, width, height)

      if (isDark) {
        // ── 🌑 DARK MODE: SUBTLE ETHEREAL MICRO-STARDUST (CLEAN & MINIMAL) ──
        const mouseX = mouseRef.current.x
        const mouseY = mouseRef.current.y
        const hasMouse = mouseRef.current.isHovering && mouseX > 0

        for (let m of motes) {
          m.pulsePhase += m.pulseSpeed
          m.alpha = m.baseAlpha + Math.sin(m.pulsePhase) * 0.15

          // Gentle cursor drift repulsion
          if (hasMouse) {
            const dx = m.x - mouseX
            const dy = m.y - mouseY
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 100 && dist > 0) {
              const force = (1 - dist / 100) * 1.2
              m.x += (dx / dist) * force
              m.y += (dy / dist) * force
            }
          }

          m.x += m.vx
          m.y += m.vy

          if (m.y < -10) m.y = height + 10
          if (m.x < -10) m.x = width + 10
          if (m.x > width + 10) m.x = -10

          ctx.beginPath()
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(235, 230, 250, ${Math.max(0.05, Math.min(0.7, m.alpha))})`
          ctx.fill()
        }
      } else {
        // ── ☀️ LIGHT MODE: ARCHITECTURAL DRAFTING GRID, CAUSTICS & SURVEYOR AXES ──
        const minorStep = 32
        const majorStep = 160

        // Minor grid lines
        ctx.strokeStyle = 'rgba(18, 15, 29, 0.025)'
        ctx.lineWidth = 0.75
        ctx.beginPath()
        for (let x = 0; x < width; x += minorStep) {
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
        }
        for (let y = 0; y < height; y += minorStep) {
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
        }
        ctx.stroke()

        // Major grid lines
        ctx.strokeStyle = 'rgba(18, 15, 29, 0.045)'
        ctx.lineWidth = 1.0
        ctx.beginPath()
        for (let x = 0; x < width; x += majorStep) {
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
        }
        for (let y = 0; y < height; y += majorStep) {
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
        }
        ctx.stroke()

        // Drafting '+' Registration Crosshairs
        ctx.strokeStyle = 'rgba(109, 40, 217, 0.16)'
        ctx.lineWidth = 1.0
        const crossSize = 4
        for (let x = majorStep; x < width; x += majorStep) {
          for (let y = majorStep; y < height; y += majorStep) {
            ctx.beginPath()
            ctx.moveTo(x - crossSize, y)
            ctx.lineTo(x + crossSize, y)
            ctx.moveTo(x, y - crossSize)
            ctx.lineTo(x, y + crossSize)
            ctx.stroke()
          }
        }

        // Sunlight Caustic Waves
        const waveCount = 2
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath()
          const waveOffset = w * 2.2 + time * 0.35
          const waveYBase = height * 0.3 + w * (height * 0.35)

          ctx.moveTo(0, waveYBase)
          for (let x = 0; x <= width; x += 40) {
            const waveY =
              waveYBase +
              Math.sin(x * 0.003 + waveOffset) * 40 +
              Math.cos(x * 0.005 - waveOffset * 0.5) * 25
            ctx.lineTo(x, waveY)
          }

          ctx.strokeStyle = `rgba(139, 92, 246, ${0.025 - w * 0.008})`
          ctx.lineWidth = 24 + w * 12
          ctx.stroke()
        }

        // Interactive Surveyor Crosshair on Cursor
        const mouseX = mouseRef.current.x
        const mouseY = mouseRef.current.y
        if (mouseRef.current.isHovering && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
          ctx.strokeStyle = 'rgba(109, 40, 217, 0.10)'
          ctx.lineWidth = 0.8
          ctx.setLineDash([4, 6])
          ctx.beginPath()
          ctx.moveTo(mouseX, 0)
          ctx.lineTo(mouseX, height)
          ctx.moveTo(0, mouseY)
          ctx.lineTo(width, mouseY)
          ctx.stroke()
          ctx.setLineDash([])

          ctx.font = '9px "JetBrains Mono", monospace'
          ctx.fillStyle = 'rgba(18, 15, 29, 0.40)'
          ctx.fillText(`X:${Math.round(mouseX)} Y:${Math.round(mouseY)}`, mouseX + 10, mouseY - 10)
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isDark])

  // Cursor following smooth liquid spotlight
  useEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      if (spotlight) {
        spotlight.style.transform = `translate(${currentX}px, ${currentY}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Layer 1: Base Seamless Void Canvas ── */}
      <div className="absolute inset-0 bg-[var(--bg-base)] transition-colors duration-500" />

      {/* ── Layer 2: Vibrant Ambient Aurora Focus Pools ── */}
      <div
        ref={auroraRef}
        className="absolute -inset-x-12 -top-24 h-[160vh] w-[calc(100%+96px)] pointer-events-none will-change-transform opacity-90 dark:opacity-85 transition-opacity duration-500"
      >
        {isDark ? (
          /* Dark Mode: Luxury Midnight Velvet & Royal Amethyst Ambient Pools */
          <div className="relative w-full h-full">
            {/* Top-center royal amethyst aura */}
            <div
              className="absolute top-[4%] left-[18%] w-[75vw] max-w-[1000px] h-[600px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(139, 92, 246, 0.35) 0%, rgba(79, 70, 229, 0.20) 45%, transparent 75%)',
                filter: 'blur(90px)',
              }}
            />

            {/* Mid-right deep sapphire plum pool */}
            <div
              className="absolute top-[30%] right-[3%] w-[65vw] max-w-[850px] h-[650px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(167, 139, 250, 0.22) 0%, rgba(109, 40, 217, 0.14) 50%, transparent 75%)',
                filter: 'blur(95px)',
              }}
            />

            {/* Lower-left midnight indigo anchor glow */}
            <div
              className="absolute top-[58%] -left-[8%] w-[70vw] max-w-[900px] h-[700px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(67, 56, 202, 0.30) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 75%)',
                filter: 'blur(100px)',
              }}
            />
          </div>
        ) : (
          /* Light Mode: Luminous Alabaster Marble & Silk Gallery Ambient Aura */
          <div className="relative w-full h-full">
            {/* Top delicate lilac pearl focus */}
            <div
              className="absolute top-[6%] left-[20%] w-[70vw] max-w-[900px] h-[550px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(139, 92, 246, 0.10) 0%, rgba(196, 181, 253, 0.06) 45%, transparent 75%)',
                filter: 'blur(75px)',
              }}
            />
            {/* Mid warm alabaster violet warmth */}
            <div
              className="absolute top-[38%] right-[8%] w-[60vw] max-w-[750px] h-[500px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(109, 40, 217, 0.08) 0%, rgba(79, 70, 229, 0.04) 50%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Layer 3: Precision Architectural 32px Dot-Matrix Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.16] pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(240, 235, 255, 0.35) 1.2px, transparent 1.2px)'
            : 'radial-gradient(rgba(18, 15, 29, 0.18) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* ── Layer 4: Interactive HTML5 Canvas (Clean Micro-Motes in Dark / Grid & Caustics in Light) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* ── Layer 5: Interactive Liquid Cursor Specular Spotlight ── */}
      <div
        ref={spotlightRef}
        className="absolute -top-[225px] -left-[225px] w-[450px] h-[450px] rounded-full pointer-events-none opacity-45 dark:opacity-35 transition-opacity duration-500 z-15"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.22) 0%, rgba(79, 70, 229, 0.08) 45%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(109, 40, 217, 0.08) 0%, rgba(196, 181, 253, 0.04) 45%, transparent 70%)',
          filter: 'blur(55px)',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 6: Ambient Edge Atmospheric Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 58%, rgba(8, 6, 15, 0.8) 100%)'
            : 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 68%, rgba(252, 251, 255, 0.6) 100%)',
        }}
      />
    </div>
  )
}

export default GlobalCanvasBackground
