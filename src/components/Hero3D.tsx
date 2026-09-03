import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, Terminal, Globe, GraduationCap } from 'lucide-react'
import HeroBackground from './HeroBackground'

gsap.registerPlugin(ScrollTrigger)

interface Hero3DProps {
  visible?: boolean
  onScrollToDivision?: (id: string) => void
}

const ACCENT_CYCLE = [
  { color: '#8B5CF6', name: 'Violet' },
  { color: '#C026D3', name: 'Fuchsia' },
  { color: '#4F46E5', name: 'Indigo' },
]

const WORDMARK_LETTERS = [
  { char: 'N', key: 'l0' },
  { char: 'a', key: 'l1' },
  { char: 'y', key: 'l2' },
  { char: 'a', key: 'l3' },
  { char: 'k', key: 'l4' },
  { char: '\u00A0', key: 'l5' },
  { char: 'L', key: 'l6' },
  { char: 'a', key: 'l7' },
  { char: 'b', key: 'l8' },
  { char: 's', key: 'l9' },
]

export function Hero3D({ visible = true }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordmarkStageRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLHeadingElement>(null)
  const scrollPromptRef = useRef<HTMLDivElement>(null)
  const revealedContentRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const [accentIndex, setAccentIndex] = useState(0)
  const activeAccent = ACCENT_CYCLE[accentIndex]

  // Period interactive trigger
  const handlePeriodClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setAccentIndex((prev) => (prev + 1) % ACCENT_CYCLE.length)

    // Micro vibration / pulse on the period
    const dot = e.currentTarget
    gsap.fromTo(
      dot,
      { scale: 1.5 },
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
    const scrollPrompt = scrollPromptRef.current
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
          gsap.set(wordmark, { opacity: 1, scale: 1 })
          gsap.set('.hero-letter', { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' })
          gsap.set(revealedContent, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' })
          return
        }

        // 1. Initial 3D letter emergence entrance
        gsap.set(wordmark, { opacity: 1 })
        gsap.fromTo(
          '.hero-letter',
          { opacity: 0, y: 40, rotateX: -28, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            stagger: 0.032,
            duration: 0.85,
            ease: 'power4.out',
          }
        )

        // Set initial state for scrub
        gsap.set(scrollPrompt, { opacity: 1, y: 0 })
        gsap.set(revealedContent, { opacity: 0, y: 32, scale: 0.96, pointerEvents: 'none' })

        // Initial 3D Stacked-deck arrangement for cards
        if (cards.length === 3) {
          gsap.set(cards[0], { xPercent: 30, rotateZ: -4, scale: 0.94 })
          gsap.set(cards[1], { xPercent: 0, rotateZ: 0, scale: 0.96 })
          gsap.set(cards[2], { xPercent: -30, rotateZ: 4, scale: 0.94 })
        }

        // Master ScrollTrigger Scrub Timeline
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=140%',
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
          },
        })

        masterTl
          // 01. Prompt dissolves first
          .to(
            scrollPrompt,
            {
              opacity: 0,
              y: -18,
              duration: 0.22,
              ease: 'power2.out',
            },
            0
          )
          // 02. Cinematic wordmark push into camera with optical rack-focus blur
          .to(
            wordmark,
            {
              scale: 2.75,
              opacity: 0,
              y: -55,
              filter: 'blur(16px)',
              duration: 0.65,
              ease: 'power2.inOut',
            },
            0.04
          )
          // 03. Unfurl the revealed content and fan-out the 3D stacked deck
          .to(
            revealedContent,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
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
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)] select-none transition-colors duration-300"
    >
      {/* Live WebGL Shader Background */}
      <HeroBackground />

      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 md:px-10 h-full flex flex-col items-center justify-center">
        {/* =========================================================================
            STAGE 1: MONUMENTAL 3D WORDMARK (Laser-Focused & Pristine)
            ========================================================================= */}
        <div
          ref={wordmarkStageRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        >
          <h1
            ref={wordmarkRef}
            className="font-display font-bold text-hero text-[var(--text-primary)] tracking-tight will-change-transform select-none perspective-1200 flex items-center justify-center"
          >
            {WORDMARK_LETTERS.map((letter) => (
              <span key={letter.key} className="hero-letter">
                {letter.char}
              </span>
            ))}

            {/* Interactive Accent Period */}
            <button
              onClick={handlePeriodClick}
              type="button"
              className="relative inline-block ml-1 cursor-pointer pointer-events-auto p-1 -m-1 focus:outline-none transition-transform hover:scale-125"
              title={`Active Accent: ${activeAccent.name} · Click to cycle`}
              aria-label={`Cycle accent color. Current: ${activeAccent.name}`}
            >
              <span
                className="inline-block transition-colors duration-300 font-display"
                style={{
                  color: activeAccent.color,
                  textShadow: `0 0 24px ${activeAccent.color}`,
                }}
              >
                .
              </span>
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
                style={{ backgroundColor: activeAccent.color }}
              />
            </button>
          </h1>

          {/* Minimalist Scroll Prompt */}
          <div
            ref={scrollPromptRef}
            className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase pointer-events-none opacity-80"
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
          {/* Eyebrow badge (LOCKED: .glass-pill, clean sentence case) */}
          <div className="glass-pill mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-pulse" />
            <span>Engineering divisions · Products, services & academics</span>
          </div>

          {/* Single Gradient-Text Heading on Home Page (LOCKED §2) */}
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4 heading-gradient">
            We engineer software that ships.
          </h2>

          <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
            Autonomous AI runtimes, high-scale web platforms, and open technical research.
          </p>

          {/* 3 High-Impact 3D Fan-Out Division Portal Cards */}
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full mb-8 text-left perspective-1000"
          >
            {/* Portal 01: Products (Violet) */}
            <Link
              ref={(el) => { cardRefs.current[0] = el }}
              to="/products"
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
              onMouseLeave={() => handleCardMouseLeave(0)}
              className="frosted-slab specular-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between group cursor-pointer shadow-md will-change-transform border border-[var(--border-base)]"
            >
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
                  DI Notes Algorithm Visualizer & EventMesh 3D Global Radar.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #DI-Notes
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #3D-Mesh
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-primary)] font-semibold">
                <span>Launch sandbox</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Portal 02: Services (Fuchsia) */}
            <Link
              ref={(el) => { cardRefs.current[1] = el }}
              to="/services"
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
              onMouseLeave={() => handleCardMouseLeave(1)}
              className="frosted-slab specular-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between group cursor-pointer shadow-md will-change-transform border border-[var(--border-base)]"
            >
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
                  Autonomous agentic pipelines, high-scale web platforms & distributed systems.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #p95-12ms
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #AgenticPipelines
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-secondary)] font-semibold">
                <span>View capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Portal 03: Academics (Indigo) */}
            <Link
              ref={(el) => { cardRefs.current[2] = el }}
              to="/academics"
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
              onMouseLeave={() => handleCardMouseLeave(2)}
              className="frosted-slab specular-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between group cursor-pointer shadow-md will-change-transform border border-[var(--border-base)]"
            >
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
                  6-Week intensive engineering fellowship with live code reviews & 12 seats.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #Cohort-04
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)]">
                    ● 12 seats open
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-tertiary)] font-semibold">
                <span>View syllabus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
            <span>Continue scrolling for full system manifesto</span>
            <ArrowDown className="w-3 h-3 text-[var(--text-secondary)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
