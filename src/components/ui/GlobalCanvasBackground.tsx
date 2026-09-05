import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../utils/themeContext'

gsap.registerPlugin(ScrollTrigger)

/**
 * GlobalCanvasBackground:
 * Ultra-clean High-Fidelity Studio Background:
 * - Layer 1: Crisp Continuous Obsidian Void (#0B0813 in Dark / #F8FAFC in Light)
 * - Layer 2: Highly Luminous Ambient Aurora Focus Pools (Violet, Fuchsia, Indigo triad)
 * - Layer 3: Precision Architectural 32px Dot-Matrix Grid with clear contrast
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

  // Parallax on ambient aurora light pools
  useEffect(() => {
    const aurora = auroraRef.current
    if (!aurora) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(aurora, {
        yPercent: 18,
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

      {/* ── Layer 2: Vibrant Ambient Aurora Focus Pools ── */}
      <div
        ref={auroraRef}
        className="absolute -inset-x-12 -top-24 h-[160vh] w-[calc(100%+96px)] pointer-events-none will-change-transform opacity-90 dark:opacity-85 transition-opacity duration-500"
      >
        {isDark ? (
          /* Dark Mode: Vibrant Violet / Fuchsia / Indigo Ambient Pools */
          <div className="relative w-full h-full">
            {/* Top-center primary violet aura */}
            <div
              className="absolute top-[4%] left-[18%] w-[75vw] max-w-[1000px] h-[600px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(124, 58, 237, 0.55) 0%, rgba(79, 70, 229, 0.35) 45%, transparent 75%)',
                filter: 'blur(75px)',
              }}
            />

            {/* Mid-right glowing fuchsia light pool */}
            <div
              className="absolute top-[30%] right-[3%] w-[65vw] max-w-[850px] h-[650px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(192, 38, 211, 0.45) 0%, rgba(124, 58, 237, 0.22) 50%, transparent 75%)',
                filter: 'blur(80px)',
              }}
            />

            {/* Lower-left deep indigo anchor glow */}
            <div
              className="absolute top-[58%] -left-[8%] w-[70vw] max-w-[900px] h-[700px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(67, 56, 202, 0.48) 0%, rgba(124, 58, 237, 0.20) 50%, transparent 75%)',
                filter: 'blur(85px)',
              }}
            />
          </div>
        ) : (
          /* Light Mode: Luminous Swiss Studio Aura with Clean Contrast */
          <div className="relative w-full h-full">
            {/* Top rose/coral focus */}
            <div
              className="absolute top-[6%] left-[20%] w-[70vw] max-w-[900px] h-[550px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(244, 63, 94, 0.18) 0%, rgba(245, 158, 11, 0.12) 45%, transparent 75%)',
                filter: 'blur(70px)',
              }}
            />
            {/* Mid amber/violet warmth */}
            <div
              className="absolute top-[38%] right-[8%] w-[60vw] max-w-[750px] h-[500px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(245, 158, 11, 0.14) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 70%)',
                filter: 'blur(75px)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Layer 3: Precision Architectural 32px Dot-Matrix Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.22] pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(196, 189, 224, 0.45) 1.2px, transparent 1.2px)'
            : 'radial-gradient(rgba(13, 11, 20, 0.25) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* ── Layer 4: Interactive Liquid Cursor Specular Spotlight ── */}
      <div
        ref={spotlightRef}
        className="absolute -top-[225px] -left-[225px] w-[450px] h-[450px] rounded-full pointer-events-none opacity-60 dark:opacity-50 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, rgba(124, 58, 237, 0.35) 0%, rgba(192, 38, 211, 0.15) 45%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(244, 63, 94, 0.20) 0%, rgba(245, 158, 11, 0.10) 45%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 5: Ambient Edge Atmospheric Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 58%, rgba(11, 8, 19, 0.75) 100%)'
            : 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 68%, rgba(248, 250, 252, 0.6) 100%)',
        }}
      />
    </div>
  )
}

export default GlobalCanvasBackground
