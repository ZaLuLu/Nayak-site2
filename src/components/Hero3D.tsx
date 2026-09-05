import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, Terminal, Globe, GraduationCap, Code2, Cpu, Sparkles, Layers } from 'lucide-react'
import { BorderBeam } from './ui/BorderBeam'
import { CrowdCanvas } from './ui/skiper-ui/skiper39'

gsap.registerPlugin(ScrollTrigger)

interface Hero3DProps {
  visible?: boolean
  onScrollToDivision?: (id: string) => void
}

const ACCENT_CYCLE = [
  { color: '#7C3AED', name: 'Violet-600' },
  { color: '#4338CA', name: 'Indigo-700' },
  { color: '#A5A0B8', name: 'Platinum' },
]

export function Hero3D({ visible = true }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordmarkStageRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLHeadingElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const flyingBallRef = useRef<HTMLDivElement>(null)
  const kickerRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const periodRef = useRef<HTMLSpanElement>(null)
  const scrollPromptRef = useRef<HTMLDivElement>(null)
  const crowdRef = useRef<HTMLDivElement>(null)
  const revealedContentRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const hasRevealedRef = useRef(false)

  const [accentIndex, setAccentIndex] = useState(0)
  const activeAccent = ACCENT_CYCLE[accentIndex]

  // Typographic Full Stop period interactive trigger to cycle accent color
  const handlePeriodClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setAccentIndex((prev) => (prev + 1) % ACCENT_CYCLE.length)

    const dot = e.currentTarget
    gsap.fromTo(
      dot,
      { scale: 1.4 },
      { scale: 1, duration: 0.35, ease: 'back.out(2.5)' }
    )
  }, [])

  // 3D Tilt interaction for the 3 division cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isTouch && !isReduced) {
      const normX = (x / rect.width - 0.5) * 12
      const normY = (y / rect.height - 0.5) * -12
      card.style.transform = `perspective(1100px) rotateX(${normY.toFixed(2)}deg) rotateY(${normX.toFixed(2)}deg) translateZ(14px) translateY(-6px)`
    }
  }

  const handleCardMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)'
  }

  useEffect(() => {
    if (!visible) return
    const container = containerRef.current
    const wordmarkStage = wordmarkStageRef.current
    const wordmark = wordmarkRef.current
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[]
    const flyingBall = flyingBallRef.current
    const kicker = kickerRef.current
    const subline = sublineRef.current
    const periodEl = periodRef.current
    const scrollPrompt = scrollPromptRef.current
    const crowdEl = crowdRef.current
    const revealedContent = revealedContentRef.current
    const cards = cardRefs.current.filter(Boolean)

    if (!container || !wordmarkStage || !wordmark || !scrollPrompt || !revealedContent || !flyingBall || !periodEl) return

    let entranceTimer: ReturnType<typeof setTimeout> | null = null

    const mm = gsap.matchMedia()

    mm.add(
      {
        isReduced: '(prefers-reduced-motion: reduce)',
        isStandard: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { isReduced } = context.conditions as { isReduced: boolean }

        if (isReduced) {
          gsap.set(letters, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' })
          gsap.set([periodEl, kicker, subline, crowdEl], { opacity: 1, scale: 1 })
          gsap.set(flyingBall, { opacity: 0 })
          gsap.set(wordmarkStage, { opacity: 0, pointerEvents: 'none' })
          gsap.set(revealedContent, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' })
          return
        }

        // ── STEP 1: CHOREOGRAPHED BOUNCING FULLSTOP ENTRANCE ANIMATION ──
        if (!hasRevealedRef.current) {
          // Initialize hidden states for wordmark elements
          gsap.set(letters, { opacity: 0, scale: 0.35, y: 14, filter: 'blur(8px)' })
          gsap.set(periodEl, { opacity: 0, scale: 0 })
          gsap.set([kicker, subline, scrollPrompt, crowdEl], { opacity: 0, y: 14 })
          gsap.set(flyingBall, { opacity: 0, scale: 0 })

          const startBounceChoreography = () => {
            if (!letters.length || !periodEl || !flyingBall || !wordmark) return

            const wordmarkRect = wordmark.getBoundingClientRect()
            if (wordmarkRect.width === 0) {
              requestAnimationFrame(startBounceChoreography)
              return
            }

            // High-precision viewport-relative coordinate resolution
            const letterTargets = letters.map((l) => {
              const r = l.getBoundingClientRect()
              return {
                x: r.left - wordmarkRect.left + r.width / 2,
                y: r.top - wordmarkRect.top + r.height * 0.15,
              }
            })

            const periodRect = periodEl.getBoundingClientRect()
            const finalPeriodPos = {
              x: periodRect.left - wordmarkRect.left + periodRect.width / 2,
              y: periodRect.top - wordmarkRect.top + periodRect.height * 0.5,
            }

            const dropStartX = (letterTargets[0]?.x || 30) - 32
            const dropStartY = -180

            const entranceTl = gsap.timeline({
              delay: 0.05,
              onComplete: () => {
                hasRevealedRef.current = true
              },
            })

            // 0. Position flying ball at top aperture
            gsap.set(flyingBall, {
              xPercent: -50,
              yPercent: -50,
              x: dropStartX,
              y: dropStartY,
              opacity: 1,
              scale: 1,
              scaleX: 0.85,
              scaleY: 1.25,
            })

            // 1. Initial Gravitational Plunge to letter 0 ('N')
            entranceTl.to(flyingBall, {
              x: letterTargets[0].x,
              y: letterTargets[0].y,
              scaleX: 1.35,
              scaleY: 0.75,
              duration: 0.4,
              ease: 'power2.in',
            })

            // Pop letter 0 on impact
            entranceTl.call(() => {
              gsap.to(letters[0], {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.3,
                ease: 'back.out(2.4)',
              })
            })

            // 2. Parabolic Bounces across letters 1..8 ('a', 'y', 'a', 'k', 'L', 'a', 'b', 's')
            const jumpDuration = 0.15
            const arcHeights = [32, 34, 32, 38, 50, 34, 32, 34]

            for (let i = 1; i < letterTargets.length; i++) {
              const prev = letterTargets[i - 1]
              const target = letterTargets[i]
              const arcPeakY = Math.min(prev.y, target.y) - arcHeights[i - 1]

              entranceTl.to(flyingBall, {
                scaleX: 0.8,
                scaleY: 1.3,
                duration: 0.035,
                ease: 'power1.out',
              })

              entranceTl.to(
                flyingBall,
                {
                  x: target.x,
                  duration: jumpDuration,
                  ease: 'power1.inOut',
                },
                `-=${0.035}`
              )

              entranceTl.to(
                flyingBall,
                {
                  y: arcPeakY,
                  duration: jumpDuration * 0.46,
                  ease: 'power1.out',
                },
                `<`
              )

              entranceTl.to(
                flyingBall,
                {
                  y: target.y,
                  duration: jumpDuration * 0.54,
                  ease: 'power1.in',
                },
                `>${-jumpDuration * 0.02}`
              )

              // Impact squash & reveal target letter
              const targetLetter = letters[i]
              entranceTl.to(flyingBall, {
                scaleX: 1.35,
                scaleY: 0.75,
                duration: 0.035,
                ease: 'power2.out',
              })

              entranceTl.call(
                () => {
                  gsap.to(targetLetter, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.3,
                    ease: 'back.out(2.4)',
                  })
                },
                undefined,
                `<`
              )
            }

            // 3. Final Leap into Fullstop Anchor position
            const lastLetter = letterTargets[letterTargets.length - 1]
            const finalArcPeak = Math.min(lastLetter.y, finalPeriodPos.y) - 30

            entranceTl.to(flyingBall, {
              scaleX: 0.85,
              scaleY: 1.25,
              duration: 0.035,
              ease: 'power1.out',
            })

            entranceTl.to(
              flyingBall,
              {
                x: finalPeriodPos.x,
                duration: 0.2,
                ease: 'power1.inOut',
              },
              `-=${0.035}`
            )
            entranceTl.to(
              flyingBall,
              {
                y: finalArcPeak,
                duration: 0.09,
                ease: 'power1.out',
              },
              `<`
            )
            entranceTl.to(
              flyingBall,
              {
                y: finalPeriodPos.y,
                duration: 0.11,
                ease: 'power1.in',
              },
              `>`
            )

            // 4. Morph flying ball into the authentic interactive Fullstop (.)
            entranceTl.to(flyingBall, {
              opacity: 0,
              scale: 0.4,
              duration: 0.08,
            })

            entranceTl.call(() => {
              gsap.fromTo(
                periodEl,
                { opacity: 1, scale: 2.6, filter: 'drop-shadow(0 0 24px currentColor)' },
                { opacity: 1, scale: 1, filter: 'drop-shadow(0 0 12px currentColor)', duration: 0.45, ease: 'back.out(3.0)' }
              )
            }, undefined, '<')

            // 5. Fade in Kicker, Subline, ScrollPrompt, and Crowd Horizon smoothly
            entranceTl.to(
              [kicker, subline],
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.12,
                ease: 'power2.out',
              },
              '>-0.1'
            )

            entranceTl.to(
              [scrollPrompt, crowdEl],
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'power2.out',
              },
              '>-0.3'
            )
          }

          entranceTimer = setTimeout(startBounceChoreography, 80)
        } else {
          gsap.set(letters, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' })
          gsap.set([periodEl, kicker, subline, scrollPrompt, crowdEl], { opacity: 1, y: 0 })
          gsap.set(flyingBall, { opacity: 0 })
        }

        // ── STEP 2: PINNED SCROLLTRIGGER SCRUB TIMELINE (ALWAYS CREATED) ──
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=160%',
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        masterTl
          // 01. Prompt & kicker dissolve first as user begins scrolling
          .to(
            scrollPrompt,
            {
              opacity: 0,
              y: -20,
              duration: 0.18,
              ease: 'power2.out',
            },
            0
          )
          .to(
            kicker,
            {
              opacity: 0,
              y: -16,
              duration: 0.2,
              ease: 'power2.out',
            },
            0.02
          )
          // 02. Crowd dissolves with subtle blur
          .to(
            crowdEl,
            {
              opacity: 0,
              y: 28,
              filter: 'blur(8px)',
              duration: 0.32,
              ease: 'power2.inOut',
            },
            0.04
          )
          // 03. Wordmark and subline push into camera with optical rack-focus blur
          .to(
            [wordmark, subline],
            {
              scale: 2.5,
              opacity: 0,
              y: -50,
              filter: 'blur(16px)',
              duration: 0.55,
              ease: 'power2.inOut',
            },
            0.04
          )
          // 04. Unfurl the revealed content (PSA Headline & description)
          .fromTo(
            revealedContent,
            {
              opacity: 0,
              y: 36,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: 'power3.out',
              onStart: () => {
                revealedContent.style.pointerEvents = 'auto'
              },
              onReverseComplete: () => {
                revealedContent.style.pointerEvents = 'none'
              },
            },
            0.26
          )

        // 05. Fan-out the 3 cards from stacked deck into grid
        if (cards.length === 3) {
          masterTl
            .fromTo(
              cards[0],
              { xPercent: 28, rotateZ: -4, scale: 0.94 },
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power3.out',
              },
              0.3
            )
            .fromTo(
              cards[1],
              { xPercent: 0, rotateZ: 0, scale: 0.96 },
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power3.out',
              },
              0.32
            )
            .fromTo(
              cards[2],
              { xPercent: -28, rotateZ: 4, scale: 0.94 },
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power3.out',
              },
              0.34
            )
        }

        return () => {
          if (entranceTimer) clearTimeout(entranceTimer)
        }
      },
      container
    )

    return () => mm.revert()
  }, [visible])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center bg-transparent text-[var(--text-primary)] select-none transition-colors duration-300 overflow-hidden"
    >
      {/* =========================================================================
          CROWD HORIZON LAYER (Skiper39): 18 Avatars walking across bottom floor line
          ========================================================================= */}
      <div
        ref={crowdRef}
        className="absolute inset-x-0 bottom-0 h-[180px] sm:h-[220px] md:h-[260px] pointer-events-none z-[5] overflow-hidden flex items-end justify-center opacity-30 dark:opacity-25 transition-opacity duration-500"
        style={{
          maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
        }}
      >
        <CrowdCanvas src="/images/peeps/all-peeps.png" count={18} />
      </div>

      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 md:px-10 h-full flex flex-col items-center justify-center">
        {/* =========================================================================
            STAGE 1: MONUMENTAL ALL-CAPS WORDMARK & STUDIO BRANDING
            ========================================================================= */}
        <div
          ref={wordmarkStageRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        >
          {/* Studio Top Kicker Badge */}
          <div
            ref={kickerRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)]/80 backdrop-blur-md mb-6 shadow-xs pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[var(--text-secondary)] font-medium">
              Digital Architecture & Research Studio
            </span>
          </div>

          {/* Monumental Wordmark with Letter-by-Letter Bouncing Reveal */}
          <div className="relative inline-flex items-baseline justify-center">
            <h1
              ref={wordmarkRef}
              className="font-display font-black text-[clamp(3.5rem,8.8vw,7.8rem)] tracking-[-0.035em] select-none inline-flex items-baseline justify-center leading-none text-center drop-shadow-sm relative"
            >
              {/* Luminous Flying Physics Ball (Choreographed Bouncing Fullstop) */}
              <div
                ref={flyingBallRef}
                className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full pointer-events-none z-30 opacity-0"
                style={{
                  backgroundColor: activeAccent.color,
                  boxShadow: `0 0 16px ${activeAccent.color}, 0 0 32px ${activeAccent.color}`,
                  top: 0,
                  left: 0,
                }}
              />

              {/* Word 1: Nayak */}
              <span className="inline-flex items-baseline">
                {['N', 'a', 'y', 'a', 'k'].map((char, i) => (
                  <span
                    key={`nayak-${i}`}
                    ref={(el) => {
                      letterRefs.current[i] = el
                    }}
                    className="hero-letter inline-block will-change-transform text-[var(--text-primary)] dark:drop-shadow-[0_2px_16px_rgba(124,58,237,0.25)]"
                  >
                    {char}
                  </span>
                ))}
              </span>

              {/* Word separator space */}
              <span className="inline-block w-[0.24em]">&nbsp;</span>

              {/* Word 2: Labs */}
              <span className="inline-flex items-baseline">
                {['L', 'a', 'b', 's'].map((char, i) => (
                  <span
                    key={`labs-${i}`}
                    ref={(el) => {
                      letterRefs.current[5 + i] = el
                    }}
                    className="hero-letter inline-block will-change-transform text-[var(--text-primary)] dark:drop-shadow-[0_2px_16px_rgba(124,58,237,0.25)]"
                  >
                    {char}
                  </span>
                ))}
              </span>

              {/* Typographical Fullstop (.) with Signature Accent Color */}
              <span
                ref={periodRef}
                onClick={handlePeriodClick}
                className="text-[var(--accent-primary)] cursor-pointer select-none pointer-events-auto transition-transform hover:scale-110 active:scale-95 inline-block ml-[0.04em] drop-shadow-[0_0_12px_currentColor] will-change-transform"
                style={{ color: activeAccent.color }}
                title={`Active Accent: ${activeAccent.name} · Click to cycle`}
                aria-label={`Cycle accent color. Current: ${activeAccent.name}`}
              >
                .
              </span>
            </h1>
          </div>

          {/* Sub-line Ethos Tagline */}
          <p
            ref={sublineRef}
            className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] tracking-widest uppercase mt-5 max-w-xl mx-auto opacity-90"
          >
            Software Without Shortcuts · Engineered to Ship
          </p>

          {/* Minimalist Scroll Prompt */}
          <div
            ref={scrollPromptRef}
            className="absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase pointer-events-none opacity-80"
          >
            <ArrowDown
              className="w-4 h-4 animate-bounce"
              style={{ color: activeAccent.color }}
            />
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: REVEALED 3D FAN-OUT DIVISION PORTAL CARDS (Unfurls on Scroll)
            ========================================================================= */}
        <div
          ref={revealedContentRef}
          className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center py-6 will-change-transform"
        >
          {/* Studio Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="font-mono text-[11px] tracking-wider uppercase text-[var(--text-secondary)] font-medium">
              Digital Architecture & Research Studio
            </span>
          </div>

          {/* Main Studio Headline */}
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4 text-[var(--text-primary)]">
            Software without shortcuts. Design without fluff.
          </h2>

          <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8">
            We build directly with technical teams—from algorithmic developer sandboxes and bespoke cloud architectures to intensive engineering cohorts.
          </p>

          {/* 3 High-Impact 3D Fan-Out Division Portal Cards */}
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full mb-8 text-left perspective-1000"
          >
            {/* Portal 01: Products (Violet) */}
            <Link
              ref={(el) => {
                cardRefs.current[0] = el
              }}
              to="/products"
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
              onMouseLeave={() => handleCardMouseLeave(0)}
              className="card-tactile drafting-card p-5 sm:p-6 flex flex-col justify-between group cursor-pointer will-change-transform relative overflow-hidden"
            >
              <BorderBeam size={180} duration={12} colorFrom="var(--accent-primary)" colorTo="var(--accent-secondary)" />
              {/* Corner Drafting Marks */}
              <div className="pointer-events-none absolute inset-2.5 z-20 opacity-40 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true">
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--border-hover)]" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--border-hover)]" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--border-hover)]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--border-hover)]" />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-semibold">
                    01 · Products
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                  Products (P)
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  In-house platforms, developer sandboxes & visual memory runtime analyzers.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-base)]">
                    #Visualizers
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-base)]">
                    #3DTelemetry
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-primary)] group-hover:underline">
                <span>Explore products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Portal 02: Services (Fuchsia) */}
            <Link
              ref={(el) => {
                cardRefs.current[1] = el
              }}
              to="/services"
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
              onMouseLeave={() => handleCardMouseLeave(1)}
              className="card-tactile drafting-card p-5 sm:p-6 flex flex-col justify-between group cursor-pointer will-change-transform relative overflow-hidden"
            >
              <BorderBeam size={180} duration={12} delay={4} colorFrom="var(--accent-secondary)" colorTo="var(--accent-primary)" />
              {/* Corner Drafting Marks */}
              <div className="pointer-events-none absolute inset-2.5 z-20 opacity-40 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true">
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--border-hover)]" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--border-hover)]" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--border-hover)]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--border-hover)]" />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-secondary)] font-semibold">
                    02 · Services
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-secondary)] transition-colors">
                  Services (S)
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Custom cloud architectures, bespoke microservices & production AI systems.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-base)]">
                    #Architecture
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-base)]">
                    #FullStack
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-secondary)] group-hover:underline">
                <span>View capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Portal 03: Academics (Indigo) */}
            <Link
              ref={(el) => {
                cardRefs.current[2] = el
              }}
              to="/academics"
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
              onMouseLeave={() => handleCardMouseLeave(2)}
              className="card-tactile drafting-card p-5 sm:p-6 flex flex-col justify-between group cursor-pointer will-change-transform relative overflow-hidden"
            >
              <BorderBeam size={180} duration={12} delay={8} colorFrom="var(--accent-tertiary)" colorTo="var(--accent-secondary)" />
              {/* Corner Drafting Marks */}
              <div className="pointer-events-none absolute inset-2.5 z-20 opacity-40 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true">
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--border-hover)]" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--border-hover)]" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--border-hover)]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--border-hover)]" />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-tertiary)]/10 text-[var(--accent-tertiary)]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-tertiary)] font-semibold">
                    03 · Academics
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-tertiary)] transition-colors">
                  Academics (A)
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  6-week intensive engineering fellowship & hands-on architecture mentorship.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-base)]">
                    #Fellowship
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-base)]">
                    #12Seats
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-tertiary)] group-hover:underline">
                <span>Join cohort</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Authentic Studio Scope Badges (3D Tactile Tiles) */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-[var(--border-base)]">
            <div className="p-3 rounded-2xl glass-panel specular-border text-center flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <Code2 className="w-4 h-4 text-[var(--accent-primary)] mb-1" />
              <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                100% In-House
              </div>
              <div className="font-body text-[9px] text-[var(--text-muted)]">
                Zero Outsourcing
              </div>
            </div>
            <div className="p-3 rounded-2xl glass-panel specular-border text-center flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <Cpu className="w-4 h-4 text-[var(--accent-secondary)] mb-1" />
              <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Applied AI
              </div>
              <div className="font-body text-[9px] text-[var(--text-muted)]">
                Production Runtimes
              </div>
            </div>
            <div className="p-3 rounded-2xl glass-panel specular-border text-center flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <Layers className="w-4 h-4 text-[var(--accent-tertiary)] mb-1" />
              <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Direct Mentorship
              </div>
              <div className="font-body text-[9px] text-[var(--text-muted)]">
                Architect to Builder
              </div>
            </div>
            <div className="p-3 rounded-2xl glass-panel specular-border text-center flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <Sparkles className="w-4 h-4 text-[var(--accent-primary)] mb-1" />
              <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Strict Cohort
              </div>
              <div className="font-body text-[9px] text-[var(--text-muted)]">
                12 Seats Max
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero3D
