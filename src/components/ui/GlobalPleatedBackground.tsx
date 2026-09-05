import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../utils/themeContext'

gsap.registerPlugin(ScrollTrigger)

/**
 * GlobalPleatedBackground:
 * Exact physical reproduction of Image 5's architectural pleated/fluted glass louvre engine.
 * - Layer 1: Luminous Radiant Gradient Light Sweep (Midnight Indigo -> Royal Violet -> Vivid Crimson/Magenta -> Electric Coral)
 * - Layer 2: True Optical Pleated Glass Slat Grid with Specular Bevels & Depth Shadows
 * - Layer 3: Subtle Interactive Cursor Specular Sheen
 * - Seamlessly continuous from Hero to Footer across the entire site with ZERO gaps.
 */
export function GlobalPleatedBackground() {
  const { themeMode } = useTheme()
  const isDark = themeMode === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const slatsRef = useRef<HTMLDivElement>(null)
  const lightSweepRef = useRef<HTMLDivElement>(null)
  const cursorAuraRef = useRef<HTMLDivElement>(null)

  // Cursor following subtle ambient specular light
  useEffect(() => {
    const aura = cursorAuraRef.current
    if (!aura) return

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
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      if (aura) {
        aura.style.transform = `translate(${currentX}px, ${currentY}px)`
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

  // Parallax on the light sweep and glass slats
  useEffect(() => {
    const slats = slatsRef.current
    const sweep = lightSweepRef.current
    if (!slats || !sweep) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(sweep, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      })

      gsap.to(slats, {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
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
      {/* ── Layer 1: Base Canvas Color ── */}
      <div className="absolute inset-0 bg-[var(--bg-base)] transition-colors duration-500" />

      {/* ── Layer 2: Radiant Gradient Light Sweep (Image 5 Luminous Arc) ── */}
      <div
        ref={lightSweepRef}
        className="absolute -inset-x-20 -top-40 h-[140vh] w-[calc(100%+160px)] pointer-events-none will-change-transform opacity-90 dark:opacity-95"
      >
        {isDark ? (
          /* Dark Mode Image 5 Palette: Midnight Indigo -> Royal Violet -> Vivid Magenta -> Electric Coral */
          <div className="relative w-full h-full">
            {/* Primary luminous magenta/coral light sweep arc */}
            <div
              className="absolute top-[8%] left-[10%] w-[80vw] max-w-[1100px] h-[550px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 55% 45%, rgba(244, 63, 94, 0.45) 0%, rgba(225, 29, 72, 0.55) 25%, rgba(192, 38, 211, 0.48) 50%, rgba(79, 70, 229, 0.35) 75%, transparent 100%)',
                filter: 'blur(75px)',
                transform: 'rotate(-14deg)',
              }}
            />

            {/* Deep royal indigo/violet bottom-left depth aura */}
            <div
              className="absolute top-[25%] -left-[10%] w-[65vw] max-w-[850px] h-[650px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(30, 27, 75, 0.95) 0%, rgba(49, 46, 129, 0.75) 45%, transparent 75%)',
                filter: 'blur(85px)',
              }}
            />

            {/* Radiant electric pink/rose top-right glow */}
            <div
              className="absolute -top-[5%] right-[2%] w-[55vw] max-w-[700px] h-[500px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(251, 113, 133, 0.38) 0%, rgba(192, 38, 211, 0.30) 45%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>
        ) : (
          /* Light Mode: Swiss Minimalist Crisp Luminous Canvas */
          <div className="relative w-full h-full">
            {/* Subtle luminous champagne/coral sweep for Swiss aesthetic */}
            <div
              className="absolute top-[10%] left-[15%] w-[75vw] max-w-[1000px] h-[500px] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(254, 205, 211, 0.45) 0%, rgba(254, 215, 170, 0.35) 40%, rgba(241, 245, 249, 0.6) 75%, transparent 100%)',
                filter: 'blur(70px)',
                transform: 'rotate(-12deg)',
              }}
            />
            <div
              className="absolute top-[30%] -right-[5%] w-[50vw] max-w-[650px] h-[450px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(254, 226, 226, 0.4) 0%, rgba(254, 243, 199, 0.25) 50%, transparent 70%)',
                filter: 'blur(75px)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Layer 3: Physical Optical Pleated Glass Slat Columns (Image 5 Replica) ── */}
      <div
        ref={slatsRef}
        className="absolute -inset-y-16 inset-x-0 w-full h-[125vh] pointer-events-none will-change-transform grid grid-cols-[repeat(auto-fill,minmax(38px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(42px,1fr))]"
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="relative h-full border-l border-r border-transparent"
            style={{
              // Left specular highlight bevel + Right depth shadow bevel
              borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.13)' : 'rgba(255, 255, 255, 0.75)',
              borderRightColor: isDark ? 'rgba(0, 0, 0, 0.42)' : 'rgba(15, 23, 42, 0.05)',
              // Physical glass convex curvature reflection gradient
              background: isDark
                ? `linear-gradient(90deg, rgba(255, 255, 255, ${
                    i % 2 === 0 ? '0.04' : '0.02'
                  }) 0%, rgba(255, 255, 255, ${
                    i % 2 === 0 ? '0.02' : '0.005'
                  }) 30%, transparent 65%, rgba(0, 0, 0, 0.18) 100%)`
                : `linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 70%, rgba(15, 23, 42, 0.02) 100%)`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {/* Top glass glint highlight */}
            <div
              className="absolute top-0 inset-x-0 h-36 pointer-events-none"
              style={{
                background: isDark
                  ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, transparent 100%)'
                  : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Layer 4: Interactive Liquid Cursor Specular Glow ── */}
      <div
        ref={cursorAuraRef}
        className="absolute -top-[200px] -left-[200px] w-[400px] h-[400px] rounded-full pointer-events-none opacity-40 dark:opacity-30 transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, rgba(244, 63, 94, 0.35) 0%, rgba(192, 38, 211, 0.15) 40%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(220, 38, 38, 0.18) 0%, rgba(217, 119, 6, 0.10) 45%, transparent 70%)',
          filter: 'blur(45px)',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 5: Seamless Edge Atmosphere ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 60%, rgba(6, 8, 20, 0.6) 100%)'
            : 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 70%, rgba(248, 250, 252, 0.4) 100%)',
        }}
      />
    </div>
  )
}

export default GlobalPleatedBackground
