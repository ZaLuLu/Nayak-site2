import React, { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useDeviceProfile } from '../../utils/useDeviceProfile'

interface IntroSequenceProps {
  onHandoffStart?: () => void
  onComplete: () => void
  forceReplay?: boolean
}

/**
 * Desktop & TV Flagship Cinematic Intro Engine:
 * - Active strictly for Laptop and TV screens (>= 1024px, non-touch).
 * - Multi-stage optical rack-focus blur typography progression.
 * - Precision laser seam shutter split with synchronized handoff to Hero.
 * - Automatically bypassed on Mobile and Tablet/iPad for instant 0-latency access.
 */
export function IntroSequence({ onHandoffStart, onComplete, forceReplay = false }: IntroSequenceProps) {
  const device = useDeviceProfile()
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const skipBtnRef = useRef<HTMLButtonElement>(null)
  const telemetryRef = useRef<HTMLDivElement>(null)
  const masterTlRef = useRef<gsap.core.Timeline | null>(null)
  const hasFinishedRef = useRef(false)

  // Auto-bypass for mobile, tablet, or touch screens
  const isEligibleDesktop =
    (device.isLaptop || device.isTV || device.isUltrawide) &&
    !device.isMobile &&
    !device.isTablet &&
    device.width >= 1024 &&
    !device.isTouch

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    try {
      sessionStorage.setItem('nayak_intro_seen_v2', 'true')
    } catch {
      // Ignored
    }
    onComplete()
  }, [onComplete])

  const handleSkip = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true

    if (masterTlRef.current) {
      masterTlRef.current.kill()
    }

    const textEl = textRef.current
    const topPanel = topPanelRef.current
    const bottomPanel = bottomPanelRef.current
    const seam = seamRef.current
    const skipBtn = skipBtnRef.current
    const telemetry = telemetryRef.current
    const container = containerRef.current

    if (container) container.style.pointerEvents = 'none'
    onHandoffStart?.()

    if (skipBtn) gsap.to(skipBtn, { opacity: 0, duration: 0.1 })
    if (telemetry) gsap.to(telemetry, { opacity: 0, duration: 0.1 })
    if (textEl) gsap.to(textEl, { opacity: 0, scale: 0.96, filter: 'blur(8px)', duration: 0.12 })

    if (seam) {
      gsap.set(seam, { opacity: 1, scaleX: 1 })
      gsap.to(seam, { opacity: 0, duration: 0.15 })
    }

    if (topPanel && bottomPanel) {
      gsap.to(topPanel, {
        yPercent: -100,
        duration: 0.35,
        ease: 'power4.inOut',
      })
      gsap.to(bottomPanel, {
        yPercent: 100,
        duration: 0.35,
        ease: 'power4.inOut',
        onComplete: () => {
          try {
            sessionStorage.setItem('nayak_intro_seen_v2', 'true')
          } catch {
            // Ignored
          }
          onComplete()
        },
      })
    } else {
      finishIntro()
    }
  }, [onHandoffStart, onComplete, finishIntro])

  // Keyboard shortcut listener (Escape key skips intro)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  // Check eligibility and session cache
  useEffect(() => {
    if (!isEligibleDesktop) {
      onHandoffStart?.()
      onComplete()
      return
    }

    if (!forceReplay) {
      try {
        const seen = sessionStorage.getItem('nayak_intro_seen_v2')
        if (seen === 'true') {
          onHandoffStart?.()
          onComplete()
          return
        }
      } catch {
        // Ignored
      }
    }

    const container = containerRef.current
    const textEl = textRef.current
    const topPanel = topPanelRef.current
    const bottomPanel = bottomPanelRef.current
    const seam = seamRef.current
    const flash = flashRef.current
    const skipBtn = skipBtnRef.current
    const telemetry = telemetryRef.current

    if (!container || !topPanel || !bottomPanel || !seam || !flash) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      onHandoffStart?.()
      finishIntro()
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const masterTl = gsap.timeline({
        onComplete: finishIntro,
      })
      masterTlRef.current = masterTl

      const phrases = ['No pitch. Just proof.', 'Software Without Shortcuts.']

      gsap.set(topPanel, { yPercent: 0 })
      gsap.set(bottomPanel, { yPercent: 0 })
      gsap.set(seam, { opacity: 0, scaleX: 0 })
      gsap.set(flash, { opacity: 0 })
      if (skipBtn) gsap.set(skipBtn, { opacity: 0, y: -8 })
      if (telemetry) gsap.set(telemetry, { opacity: 0, y: 6 })

      if (skipBtn) masterTl.to(skipBtn, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.1)
      if (telemetry) masterTl.to(telemetry, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.15)

      phrases.forEach((phrase, idx) => {
        const isLast = idx === phrases.length - 1

        masterTl
          .call(() => {
            if (textEl) textEl.textContent = phrase
          })
          .fromTo(
            textEl,
            { opacity: 0, scale: 1.08, filter: 'blur(14px)', y: 16 },
            { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.55, ease: 'expo.out' }
          )
          .to(textEl, { duration: 0.65 })
          .to(textEl, {
            opacity: 0,
            scale: 0.95,
            filter: 'blur(10px)',
            y: -12,
            duration: isLast ? 0.3 : 0.35,
            ease: 'power2.inOut',
          })
      })

      masterTl
        .to({}, { duration: 0.05 })
        .call(() => {
          if (container) container.style.pointerEvents = 'none'
          if (skipBtn) gsap.to(skipBtn, { opacity: 0, duration: 0.15 })
          if (telemetry) gsap.to(telemetry, { opacity: 0, duration: 0.15 })
        })
        .set(seam, { opacity: 1, scaleX: 0 })
        .to(seam, {
          scaleX: 1,
          duration: 0.35,
          ease: 'power4.out',
        })
        .set(flash, { opacity: 0.25 })
        .to(flash, { opacity: 0, duration: 0.25, ease: 'power2.out' })
        .to(seam, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1')
        .to(
          [topPanel, bottomPanel],
          {
            yPercent: (i) => (i === 0 ? -100 : 100),
            duration: 0.65,
            ease: 'power4.inOut',
          },
          '-=0.05'
        )
        // Fire handoff right as the shutters separate so the bounce is 100% visible
        .call(() => {
          onHandoffStart?.()
        }, undefined, '-=0.25')
    })

    return () => {
      mm.revert()
    }
  }, [isEligibleDesktop, forceReplay, onHandoffStart, onComplete, finishIntro])

  if (!isEligibleDesktop) return null

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[300] select-none cursor-pointer pointer-events-auto"
      aria-label="Welcome to Nayak Labs - Click or tap anywhere to skip"
      role="status"
    >
      {/* Skip button for immediate visitor control */}
      <button
        ref={skipBtnRef}
        onClick={(e) => {
          e.stopPropagation()
          handleSkip()
        }}
        className="absolute top-5 right-5 sm:top-6 sm:right-6 z-50 px-3 py-1.5 rounded-[10px] border border-white/20 bg-black/50 hover:bg-white/10 text-white/80 hover:text-white font-mono text-[11px] tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-lg flex items-center gap-1.5"
        aria-label="Skip introductory animation"
      >
        <span>SKIP</span>
        <span className="text-white/40">[ESC]</span>
        <span>→</span>
      </button>

      {/* Top half-panel */}
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 bg-[#07050E] z-20 border-b border-white/[0.1] overflow-hidden backdrop-blur-2xl"
        style={{ height: '50%', willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0px, transparent 48px, rgba(255, 255, 255, 0.02) 48px, rgba(255, 255, 255, 0.02) 50px)',
          }}
        />
        <div
          className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[85vw] h-[100%] rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.45) 0%, rgba(79, 70, 229, 0.25) 40%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Spatial Telemetry HUD */}
        <div
          ref={telemetryRef}
          className="absolute top-5 left-5 sm:top-6 sm:left-6 font-mono text-[10px] sm:text-[11px] text-white/50 tracking-widest pointer-events-none flex items-center gap-2.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]" />
          </span>
          <span>LAT 12.9716° N · LNG 77.5946° E //</span>
          <span className="text-white/80 font-semibold">NAYAK LABS RUNTIME</span>
        </div>
      </div>

      {/* Bottom half-panel */}
      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 bg-[#07050E] z-20 border-t border-white/[0.1] overflow-hidden backdrop-blur-2xl"
        style={{ height: '50%', willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0px, transparent 48px, rgba(255, 255, 255, 0.02) 48px, rgba(255, 255, 255, 0.02) 50px)',
          }}
        />
        <div
          className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 w-[85vw] h-[100%] rounded-full opacity-35 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(192, 38, 211, 0.45) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />

        <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 font-mono text-[10px] text-white/40 tracking-widest pointer-events-none flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C026D3] shadow-[0_0_8px_#C026D3]" />
          <span>AUTONOMOUS RUNTIMES · SWISS CODE · 2026</span>
        </div>
      </div>

      {/* Chromatic Laser Seam */}
      <div
        ref={seamRef}
        className="absolute inset-x-0 z-30 pointer-events-none origin-center"
        style={{
          top: '50%',
          height: '2px',
          background:
            'linear-gradient(90deg, transparent 0%, #4338CA 20%, #7C3AED 40%, #FFFFFF 50%, #C026D3 60%, #4338CA 80%, transparent 100%)',
          boxShadow:
            '0 0 16px rgba(255,255,255,0.9), 0 0 32px rgba(124,58,237,0.7), 0 0 48px rgba(192,38,211,0.5)',
          transform: 'translateY(-50%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Subtle bloom flash */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-30 pointer-events-none bg-white opacity-0"
        style={{ willChange: 'opacity' }}
      />

      {/* Centered Kinetic Typography */}
      <div className="absolute inset-0 z-40 flex items-center justify-center px-6 pointer-events-none">
        <div
          className="absolute w-[540px] h-[260px] rounded-full opacity-45 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, rgba(79, 70, 229, 0.2) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <h2
          ref={textRef}
          className="font-display font-medium text-center tracking-tight text-white relative z-10"
          style={{
            fontSize: 'clamp(1.75rem, 4.8vw, 3.6rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1.15,
            textShadow: '0 0 36px rgba(255,255,255,0.35), 0 0 60px rgba(139,92,246,0.3)',
            willChange: 'transform, opacity, filter',
          }}
        />
      </div>
    </div>
  )
}
