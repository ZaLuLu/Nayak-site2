import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../utils/themeContext'

gsap.registerPlugin(ScrollTrigger)

/**
 * GlobalCanvasBackground:
 * Ultra-clean Precision Studio background replacing busy slats with an elite, noise-free architecture:
 * - Layer 1: Continuous Deep Void Canvas (#0A0714 in Dark / #F8FAFC in Light)
 * - Layer 2: Luminous Ambient Aurora Glow Pools (Violet, Fuchsia, Indigo triad)
 * - Layer 3: Precision Architectural Coordinate Grid (48px crosshairs, 5% opacity)
 * - Layer 4: Interactive Liquid Cursor Specular Spotlight (tracks mouse smoothly)
 * - 100% continuous from Hero to Footer with ZERO section color gaps or breaks.
 */
export function GlobalCanvasBackground() {
  const { themeMode } = useTheme()
  const isDark = themeMode === 'dark'

  const containerRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

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
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Layer 1: Base Void Canvas ── */}
      <div className="absolute inset-0 bg-[var(--bg-base)] transition-colors duration-500" />

      {/* ── Layer 2: Organic Ambient Aurora Light Pools (Violet / Fuchsia / Indigo Triad) ── */}
      <div
        ref={auroraRef}
        className="absolute -inset-x-20 -top-32 h-[150vh] w-[calc(100%+160px)] pointer-events-none will-change-transform opacity-75 dark:opacity-70 transition-opacity duration-500"
      >
        {isDark ? (
          /* Dark Mode: Signature Violet / Fuchsia / Indigo Ambient Pools */
          <div className="relative w-full h-full">
            {/* Top-center primary violet aura */}
            <div
              className="absolute top-[5%] left-[20%] w-[70vw] max-w-[950px] h-[550px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(139, 92, 246, 0.38) 0%, rgba(79, 70, 229, 0.25) 45%, transparent 75%)',
                filter: 'blur(80px)',
              }}
            />

            {/* Mid-right glowing fuchsia light pool */}
            <div
              className="absolute top-[28%] right-[5%] w-[60vw] max-w-[800px] h-[600px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(192, 38, 211, 0.30) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 75%)',
                filter: 'blur(90px)',
              }}
            />

            {/* Lower-left deep indigo anchor glow */}
            <div
              className="absolute top-[55%] -left-[10%] w-[65vw] max-w-[850px] h-[650px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(67, 56, 202, 0.32) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 75%)',
                filter: 'blur(95px)',
              }}
            />
          </div>
        ) : (
          /* Light Mode: Swiss Clean Slate Ambient Aura */
          <div className="relative w-full h-full">
            <div
              className="absolute top-[8%] left-[25%] w-[65vw] max-w-[850px] h-[500px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(254, 205, 211, 0.40) 0%, rgba(254, 215, 170, 0.30) 45%, transparent 75%)',
                filter: 'blur(75px)',
              }}
            />
            <div
              className="absolute top-[35%] right-[10%] w-[55vw] max-w-[700px] h-[450px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(254, 226, 226, 0.35) 0%, rgba(254, 243, 199, 0.20) 50%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Layer 3: Precision Architectural Coordinate Grid (Linear/Vercel Aesthetic) ── */}
      <div
        className="absolute inset-0 opacity-[0.14] dark:opacity-[0.09] pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-base) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-base) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 35%, transparent 85%)',
        }}
      />

      {/* ── Layer 4: Interactive Liquid Cursor Specular Spotlight ── */}
      <div
        ref={spotlightRef}
        className="absolute -top-[225px] -left-[225px] w-[450px] h-[450px] rounded-full pointer-events-none opacity-50 dark:opacity-35 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.28) 0%, rgba(192, 38, 211, 0.10) 45%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(220, 38, 38, 0.14) 0%, rgba(217, 119, 6, 0.08) 45%, transparent 70%)',
          filter: 'blur(55px)',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 5: Seamless Edge Atmosphere ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(10, 7, 20, 0.7) 100%)'
            : 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 65%, rgba(248, 250, 252, 0.5) 100%)',
        }}
      />
    </div>
  )
}

export default GlobalCanvasBackground
