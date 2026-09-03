import React, { useRef, useEffect } from 'react'
import { MeshGradient, FlutedGlass } from '@paper-design/shaders-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../utils/themeContext'

gsap.registerPlugin(ScrollTrigger)

const DARK_COLORS = ['#4338CA', '#8B5CF6', '#C026D3', '#0A0714']
const LIGHT_COLORS = ['#4338CA', '#8B5CF6', '#C026D3', '#FAFAFB']

/**
 * HeroBackground:
 * Layer 1 (bottom): <MeshGradient> with locked violet/fuchsia/indigo triad at speed=0.15, distortion=0.6, swirl=0.4
 * Layer 2: <FlutedGlass> with 0.15x scroll parallax scrub via GSAP ScrollTrigger
 * Layer 3: Architectural Grid & Specular Vignette
 * Layer 4: Cursor-following liquid spotlight
 */
export default function HeroBackground() {
  const { themeMode } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const flutedRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Cursor following spotlight
  useEffect(() => {
    const container = containerRef.current
    const spotlight = spotlightRef.current
    if (!container || !spotlight) return

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

  // Fluted glass scroll parallax (0.15x scroll delta scrub)
  useEffect(() => {
    const fluted = flutedRef.current
    if (!fluted) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(fluted, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    })

    return () => mm.revert()
  }, [])

  const isDark = themeMode === 'dark'
  const meshColors = isDark ? DARK_COLORS : LIGHT_COLORS

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Layer 1 (Bottom): Live WebGL MeshGradient Ambient Shader Loop ── */}
      <div className="absolute inset-0 w-full h-full opacity-90 dark:opacity-80">
        <MeshGradient
          colors={meshColors}
          speed={0.15}
          distortion={0.6}
          swirl={0.4}
          className="w-full h-full"
        />
      </div>

      {/* ── Layer 2: FlutedGlass Optical Shader with Scroll-Linked Parallax ── */}
      <div
        ref={flutedRef}
        className="absolute -inset-y-12 inset-x-0 w-full pointer-events-none will-change-transform"
        style={{
          opacity: isDark ? 0.10 : 0.05,
        }}
      >
        <FlutedGlass
          colorBack={isDark ? '#8B5CF6' : '#6D28D9'}
          colorHighlight={isDark ? '#C026D3' : '#A21CAF'}
          size={0.06}
          distortion={0.35}
          className="w-full h-full"
        />
      </div>

      {/* ── Layer 3: Precision Architectural Crosshair Coordinate Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.20] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-base) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-base) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 80%)',
        }}
      />

      {/* ── Layer 4: Interactive Liquid Specular Spotlight (Tracks cursor) ── */}
      <div
        ref={spotlightRef}
        className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-500 opacity-60 dark:opacity-45"
        style={{
          background: 'radial-gradient(circle at center, var(--accent-glow) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 5: Specular Vignette at screen perimeters ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, var(--bg-base) 95%)',
        }}
      />
    </div>
  )
}
