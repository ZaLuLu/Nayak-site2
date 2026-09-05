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
  const kickerRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const periodRef = useRef<HTMLSpanElement>(null)
  const scrollPromptRef = useRef<HTMLDivElement>(null)
  const crowdRef = useRef<HTMLDivElement>(null)
  const revealedContentRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

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
    const normX = (x / rect.width - 0.5) * 6
    const normY = (y / rect.height - 0.5) * -6

    card.style.transform = `perspective(1000px) rotateX(${normY}deg) rotateY(${normX}deg) translateY(-4px)`
  }

  const handleCardMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  useEffect(() => {
    if (!visible) return
    const container = containerRef.current
    const wordmarkStage = wordmarkStageRef.current
    const wordmark = wordmarkRef.current
    const kicker = kickerRef.current
    const subline = sublineRef.current
    const periodEl = periodRef.current
    const scrollPrompt = scrollPromptRef.current
    const crowdEl = crowdRef.current
    const revealedContent = revealedContentRef.current
    const cards = cardRefs.current.filter(Boolean)

    if (!container || !wordmarkStage || !wordmark || !scrollPrompt || !revealedContent) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        isReduced: '(prefers-reduced-motion: reduce)',
        isStandard: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { isReduced } = context.conditions as { isReduced: boolean }

        if (isReduced) {
          gsap.set([wordmark, kicker, subline, crowdEl], { opacity: 1, scale: 1 })
          gsap.set(revealedContent, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' })
          return
        }

        // Initial visible state (guaranteed 100% visible on load)
        gsap.set([wordmark, kicker, subline, crowdEl, scrollPrompt], {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
        })

        // Initial card state for scrub
        if (cards.length === 3) {
          gsap.set(cards[0], { xPercent: 30, rotateZ: -4, scale: 0.94 })
          gsap.set(cards[1], { xPercent: 0, rotateZ: 0, scale: 0.96 })
          gsap.set(cards[2], { xPercent: -30, rotateZ: 4, scale: 0.94 })
        }
        gsap.set(revealedContent, { opacity: 0, y: 32, scale: 0.96, pointerEvents: 'none' })

        // Master ScrollTrigger Scrub Timeline
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=140%',
            scrub: 0.75,
            pin: true,
            anticipatePin: 1,
          },
        })

        masterTl
          // 01. Prompt & kicker dissolve first as user begins scrolling
          .to(
            scrollPrompt,
            {
              opacity: 0,
              y: -20,
              duration: 0.2,
              ease: 'power2.out',
            },
            0
          )
          .to(
            kicker,
            {
              opacity: 0,
              y: -16,
              duration: 0.22,
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
              duration: 0.35,
              ease: 'power2.inOut',
            },
            0.04
          )
          // 03. Wordmark and subline push into camera with optical rack-focus blur
          .to(
            [wordmark, subline],
            {
              scale: 0.88,
              opacity: 0,
              filter: 'blur(16px)',
              duration: 0.45,
              ease: 'power2.inOut',
            },
            0.06
          )
          // 04. Unfurl the revealed content and fan-out the 3D stacked deck
          .to(
            revealedContent,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.58,
              ease: 'power3.out',
              onStart: () => {
                revealedContent.style.pointerEvents = 'auto'
              },
              onReverseComplete: () => {
                revealedContent.style.pointerEvents = 'none'
              },
            },
            0.32
          )

        // Fan-out the 3 cards from stacked deck into grid
        if (cards.length === 3) {
          masterTl
            .to(
              cards[0],
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
              },
              0.38
            )
            .to(
              cards[1],
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
              },
              0.4
            )
            .to(
              cards[2],
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
              },
              0.42
            )
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
          CROWD HORIZON LAYER (Skiper39): 6-8 Avatars walking along bottom floor line
          ========================================================================= */}
      <div
        ref={crowdRef}
        className="absolute inset-x-0 bottom-0 h-[180px] sm:h-[220px] md:h-[260px] pointer-events-none z-[5] overflow-hidden flex items-end justify-center"
      >
        <CrowdCanvas src="/images/peeps/all-peeps.png" count={7} />
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

          {/* Monumental Wordmark with Genuine Typographic Full Stop (.) */}
          <h1
            ref={wordmarkRef}
            className="font-display font-black text-[clamp(3.5rem,8.8vw,7.8rem)] tracking-[-0.035em] select-none inline-flex items-baseline justify-center leading-none text-center drop-shadow-sm"
          >
            <span className="bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent dark:drop-shadow-[0_2px_16px_rgba(124,58,237,0.25)]">
              Nayak Labs
            </span>
            {/* Typographical Fullstop (.) with Signature Accent Color */}
            <span
              ref={periodRef}
              onClick={handlePeriodClick}
              className="text-[var(--accent-primary)] cursor-pointer select-none pointer-events-auto transition-transform hover:scale-110 active:scale-95 inline-block ml-[0.04em] drop-shadow-[0_0_12px_currentColor]"
              style={{ color: activeAccent.color }}
              title={`Active Accent: ${activeAccent.name} · Click to cycle`}
              aria-label={`Cycle accent color. Current: ${activeAccent.name}`}
            >
              .
            </span>
          </h1>

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

          <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
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
              className="card-tactile p-5 sm:p-6 flex flex-col justify-between group cursor-pointer will-change-transform relative overflow-hidden"
            >
              <BorderBeam size={180} duration={12} colorFrom="var(--accent-primary)" colorTo="var(--accent-secondary)" />
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
              className="card-tactile p-5 sm:p-6 flex flex-col justify-between group cursor-pointer will-change-transform relative overflow-hidden"
            >
              <BorderBeam size={180} duration={12} delay={4} colorFrom="var(--accent-secondary)" colorTo="var(--accent-primary)" />
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
              className="card-tactile p-5 sm:p-6 flex flex-col justify-between group cursor-pointer will-change-transform relative overflow-hidden"
            >
              <BorderBeam size={180} duration={12} delay={8} colorFrom="var(--accent-tertiary)" colorTo="var(--accent-secondary)" />
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

          {/* Authentic Studio Scope Badges */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--border-base)]">
            <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-center flex flex-col items-center justify-center">
              <Code2 className="w-4 h-4 text-[var(--accent-primary)] mb-1.5" />
              <div className="font-mono text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                100% In-House
              </div>
              <div className="font-body text-[10px] text-[var(--text-muted)]">
                Zero Outsourcing
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-center flex flex-col items-center justify-center">
              <Cpu className="w-4 h-4 text-[var(--accent-secondary)] mb-1.5" />
              <div className="font-mono text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Applied AI
              </div>
              <div className="font-body text-[10px] text-[var(--text-muted)]">
                Production Runtimes
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-center flex flex-col items-center justify-center">
              <Layers className="w-4 h-4 text-[var(--accent-tertiary)] mb-1.5" />
              <div className="font-mono text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Direct Mentorship
              </div>
              <div className="font-body text-[10px] text-[var(--text-muted)]">
                Architect to Builder
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-center flex flex-col items-center justify-center">
              <Sparkles className="w-4 h-4 text-[var(--accent-primary)] mb-1.5" />
              <div className="font-mono text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Strict Cohort
              </div>
              <div className="font-body text-[10px] text-[var(--text-muted)]">
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
