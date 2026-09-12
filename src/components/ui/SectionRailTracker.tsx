import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ambientAudio } from '../../utils/audioEngine'
import { useDeviceProfile } from '../../utils/useDeviceProfile'

interface RailSection {
  id: string
  label: string
  num: string
}

const RAIL_SECTIONS: RailSection[] = [
  { id: 'home', label: 'Overview', num: '01' },
  { id: 'products', label: 'Products', num: '02' },
  { id: 'services', label: 'Services', num: '03' },
  { id: 'academics', label: 'Academics', num: '04' },
  { id: 'about', label: 'Manifesto', num: '05' },
  { id: 'why-us', label: 'Roadmap', num: '06' },
  { id: 'social', label: 'Dispatches', num: '07' },
  { id: 'contact', label: 'Contact', num: '08' },
]

const ITEM_SPACING = 32 // Exact pixel distance between dots

interface SectionRailTrackerProps {
  onScrollTo?: (id: string) => void
  ignited?: boolean
  isIntroTarget?: boolean
}

/**
 * Pure Minimalist Section Rail Tracker:
 * - Direct connected dots with continuous spine line (NO enclosing pill/capsule background).
 * - Precise mathematical track bounds (dot 0 to dot N-1).
 * - Real-time scroll synchronization and smooth active line fill.
 * - Fluid, highly visible energy transfer from the wordmark fullstop directly to Dot 01.
 */
export function SectionRailTracker({
  onScrollTo,
  ignited = true,
  isIntroTarget = false,
}: SectionRailTrackerProps) {
  const device = useDeviceProfile()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('home')
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const prevActiveRef = useRef('home')

  const spineRef = useRef<HTMLDivElement>(null)
  const activeLineRef = useRef<HTMLDivElement>(null)
  const photonTransferBallRef = useRef<HTMLDivElement>(null)
  const dotWrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const hasAnimatedRef = useRef(false)

  const isHome = location.pathname === '/'

  // Reset animation flag if ignited goes false (e.g. on intro replay)
  useEffect(() => {
    if (!ignited && isIntroTarget) {
      hasAnimatedRef.current = false
      const spine = spineRef.current
      const photonBall = photonTransferBallRef.current
      const dotWrappers = dotWrapperRefs.current.filter(Boolean)

      if (spine) gsap.set(spine, { opacity: 0, scaleY: 0 })
      if (photonBall) gsap.set(photonBall, { opacity: 0 })
      if (dotWrappers.length) gsap.set(dotWrappers, { opacity: 0, scale: 0 })
    }
  }, [ignited, isIntroTarget])

  // Kinetic fluid transfer: Fullstop (.) -> Side Rail Dot 01
  useEffect(() => {
    if (!isHome || device.isMobile || device.isTablet) return
    const spine = spineRef.current
    const photonBall = photonTransferBallRef.current
    const dotWrappers = dotWrapperRefs.current.filter(Boolean)

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReduced || !isIntroTarget) {
      if (spine) gsap.set(spine, { opacity: 1, scaleY: 1 })
      if (dotWrappers.length) gsap.set(dotWrappers, { opacity: 1, scale: 1 })
      if (photonBall) gsap.set(photonBall, { opacity: 0 })
      return
    }

    if (ignited && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true

      if (!photonBall || !spine || !dotWrappers.length) return

      // 1. Measure true resting coordinates FIRST before setting scale 0
      const periodEl = document.querySelector('#hero h1 span:last-child') || document.querySelector('h1 span:last-child')
      const periodRect = periodEl?.getBoundingClientRect()
      const dot0El = dotWrapperRefs.current[0]
      const dot0Rect = dot0El?.getBoundingClientRect()

      const startX = periodRect ? periodRect.left + periodRect.width / 2 : window.innerWidth * 0.58
      const startY = periodRect ? periodRect.top + periodRect.height * 0.75 : window.innerHeight * 0.5
      const targetX = dot0Rect ? dot0Rect.left + dot0Rect.width / 2 : window.innerWidth - 32
      const targetY = dot0Rect ? dot0Rect.top + dot0Rect.height / 2 : window.innerHeight * 0.5 - (3.5 * ITEM_SPACING)

      const arcPeakY = Math.min(startY, targetY) - 55
      const travelDuration = 0.75 // Fluid, unmistakable, cinema-grade duration

      // 2. Initial state prior to launch
      gsap.set(spine, { opacity: 0, scaleY: 0, transformOrigin: 'top center' })
      gsap.set(dotWrappers, { opacity: 0, scale: 0 })

      // Position glowing photon ball directly on the wordmark fullstop
      gsap.set(photonBall, {
        xPercent: -50,
        yPercent: -50,
        left: startX,
        top: startY,
        opacity: 0,
        scale: 0.6,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      })

      const transferTl = gsap.timeline({
        onComplete: () => {
          gsap.set(photonBall, { opacity: 0 })
          gsap.set(spine, { opacity: 1, scaleY: 1 })
          gsap.set(dotWrappers, { opacity: 1, scale: 1 })
        },
      })

      // 1. Ignite at Fullstop
      transferTl
        .to(
          photonBall,
          {
            opacity: 1,
            scale: 1.1,
            duration: 0.12,
            ease: 'back.out(2)',
          },
          0
        )
        // 2. Horizontal glide across the screen to Dot 01
        .to(
          photonBall,
          {
            left: targetX,
            duration: travelDuration,
            ease: 'power2.inOut',
          },
          0.04
        )
        // 3. Smooth upward parabola ascent
        .to(
          photonBall,
          {
            top: arcPeakY,
            scaleX: 1.35,
            scaleY: 0.85,
            rotation: -12,
            duration: travelDuration * 0.46,
            ease: 'sine.out',
          },
          0.04
        )
        // 4. Parabolic descent into Dot 01
        .to(
          photonBall,
          {
            top: targetY,
            scaleX: 1.1,
            scaleY: 0.95,
            rotation: 0,
            duration: travelDuration * 0.54,
            ease: 'power2.in',
          },
          0.04 + travelDuration * 0.46
        )
        // 5. Tactile impact squish on Dot 01
        .to(
          photonBall,
          {
            scaleX: 1.5,
            scaleY: 0.65,
            duration: 0.04,
            ease: 'power1.out',
          },
          0.04 + travelDuration
        )
        // 6. Dissolve into Dot 01
        .to(
          photonBall,
          {
            opacity: 0,
            scale: 1,
            duration: 0.12,
            ease: 'power2.out',
          },
          0.08 + travelDuration
        )

      // 7. Dot 01 activates with glowing back.out pop
      const impactTime = 0.04 + travelDuration
      transferTl.call(
        () => {
          if (dotWrappers[0]) {
            gsap.fromTo(
              dotWrappers[0],
              { opacity: 0, scale: 0.2 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.38,
                ease: 'back.out(2.8)',
              }
            )
          }
        },
        undefined,
        impactTime
      )

      // 8. Spine Line draws down smoothly
      transferTl.to(
        spine,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.42,
          ease: 'power2.out',
        },
        impactTime + 0.04
      )

      // 9. Waypoint Dots 02-08 pop into view in sequence
      transferTl.call(
        () => {
          const remainingDots = dotWrappers.slice(1)
          if (remainingDots.length) {
            gsap.fromTo(
              remainingDots,
              { opacity: 0, scale: 0.2 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.32,
                stagger: 0.04,
                ease: 'back.out(2.2)',
              }
            )
          }
        },
        undefined,
        impactTime + 0.08
      )
    } else if (ignited && hasAnimatedRef.current) {
      if (spine) gsap.set(spine, { opacity: 1, scaleY: 1 })
      if (dotWrappers.length) gsap.set(dotWrappers, { opacity: 1, scale: 1 })
      if (photonBall) gsap.set(photonBall, { opacity: 0 })
    }
  }, [ignited, isIntroTarget, isHome, device.isMobile, device.isTablet])

  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      const now = Date.now()
      const dt = Math.max(1, now - lastScrollTime.current)
      const dy = Math.abs(window.scrollY - lastScrollY.current)
      const velocity = (dy / dt) * 1.8

      lastScrollY.current = window.scrollY
      lastScrollTime.current = now

      const scrollPos = window.scrollY + window.innerHeight * 0.35
      let currentActive = 'home'

      for (let i = RAIL_SECTIONS.length - 1; i >= 0; i--) {
        const item = RAIL_SECTIONS[i]
        const el = document.getElementById(item.id)
        if (el && scrollPos >= el.offsetTop) {
          currentActive = item.id
          break
        }
      }

      if (currentActive !== prevActiveRef.current) {
        prevActiveRef.current = currentActive
        setActiveSection(currentActive)
        ambientAudio.playScrollTick(velocity)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  if (!isHome || device.isMobile) return null

  const handleDotClick = (id: string) => {
    ambientAudio.playScrollTick(2.5)
    if (onScrollTo) {
      onScrollTo(id)
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const activeIndex = Math.max(0, RAIL_SECTIONS.findIndex((s) => s.id === activeSection))
  const totalTrackHeight = (RAIL_SECTIONS.length - 1) * ITEM_SPACING

  return (
    <>
      {/* Screen-Space Kinetic Transfer Photon Ball */}
      <div
        ref={photonTransferBallRef}
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 opacity-0"
        style={{
          backgroundColor: '#8B5CF6',
          boxShadow:
            '0 0 16px #8B5CF6, 0 0 32px rgba(139, 92, 246, 0.95), 0 0 48px rgba(192, 38, 211, 0.75)',
          willChange: 'transform, opacity, left, top',
        }}
      />

      <nav
        className="fixed right-6 xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none pointer-events-auto"
        aria-label="Section Navigation Tracker"
      >
        {/* Pure Connected Dots & Line Container (No enclosing background pill) */}
        <div
          className="relative flex flex-col items-center"
          style={{ height: `${totalTrackHeight}px`, width: '24px' }}
        >
          {/* Background Hairline Spine (Connects exactly from center of top dot to center of bottom dot) */}
          <div
            ref={spineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[1.5px] bg-black/15 dark:bg-white/15 pointer-events-none rounded-full will-change-transform"
            style={{ height: `${totalTrackHeight}px` }}
          />

          {/* Active Progress Line (Fills down smoothly to the active section dot) */}
          <div
            ref={activeLineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] pointer-events-none transition-all duration-300 ease-out rounded-full"
            style={{
              height: `${activeIndex * ITEM_SPACING}px`,
              background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))',
              boxShadow: '0 0 10px var(--accent-primary)',
            }}
          />

          {/* 8 Connected Waypoint Nodes */}
          {RAIL_SECTIONS.map((section, idx) => {
            const isActive = activeSection === section.id
            const isPassed = idx <= activeIndex

            return (
              <div
                key={section.id}
                ref={(el) => {
                  dotWrapperRefs.current[idx] = el
                }}
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center group will-change-transform"
                style={{
                  top: `${idx * ITEM_SPACING}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Clickable Hit Target Button (Enlarged 28px for effortless clicking) */}
                <button
                  onClick={() => handleDotClick(section.id)}
                  className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                  aria-label={`Jump to section ${section.num}: ${section.label}`}
                >
                  {/* Waypoint Dot */}
                  <span
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-3 h-3 bg-white border-2 border-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-primary),0_0_20px_var(--accent-primary)] scale-110'
                        : isPassed
                        ? 'w-2 h-2 bg-[var(--accent-primary)] group-hover:scale-125 shadow-[0_0_6px_var(--accent-primary)]'
                        : 'w-1.5 h-1.5 bg-black/25 dark:bg-white/20 group-hover:bg-black/60 dark:group-hover:bg-white/70 group-hover:scale-125'
                    }`}
                  />
                </button>

                {/* Minimalist Swiss Hover Tooltip */}
                <div className="absolute right-8 px-2.5 py-1 rounded-lg font-mono text-[11px] whitespace-nowrap pointer-events-none transition-all duration-200 shadow-lg border opacity-0 group-hover:opacity-100 translate-x-1.5 group-hover:translate-x-0 bg-[var(--bg-surface-elevated)]/95 backdrop-blur-md text-[var(--text-primary)] border-[var(--border-base)] flex items-center gap-1.5 z-30">
                  <span className="font-bold text-[10px] text-[var(--accent-primary)]">
                    {section.num}
                  </span>
                  <span className="text-[var(--text-muted)]">·</span>
                  <span className="font-body font-semibold">{section.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default SectionRailTracker
