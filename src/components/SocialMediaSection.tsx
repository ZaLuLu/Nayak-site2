import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react'

interface DispatchPost {
  id: string
  tag: string
  title: string
  date: string
  excerpt: string
  metric: string
  author: string
  category: string
}

const DISPATCHES: DispatchPost[] = [
  {
    id: 'd1',
    tag: '#AgenticAI',
    category: 'Autonomous Systems',
    title: 'Multi-Agent State Routing: Resolving Non-Deterministic Cyclic Loops',
    date: '2 DAYS AGO',
    excerpt: 'Designing hierarchical supervisor graphs with deterministic checkpoint state recovery, fallback models, and human-in-the-loop review nodes.',
    metric: '99.4% Task Convergence',
    author: 'Nayak Labs Systems Pod',
  },
  {
    id: 'd2',
    tag: '#DistributedQueues',
    category: 'Core Infrastructure',
    title: 'Benchmarking Redis Streams vs BullMQ: Sub-12ms p95 Under Concurrent Ingestion',
    date: '5 DAYS AGO',
    excerpt: 'Profiling memory allocation and event-loop microtasks when ingesting 5,000 concurrent streaming jobs across distributed worker pools.',
    metric: '11.8ms p95 Latency',
    author: 'Telemetry & Infra Pod',
  },
  {
    id: 'd3',
    tag: '#KineticUI',
    category: 'Design Engineering',
    title: 'Frosted Pleated Glass & Liquid Shader Tokens: Specular Depth in CSS',
    date: '1 WEEK AGO',
    excerpt: 'Architecting dynamic refraction borders, backdrop saturation, and zero-jank 60fps GSAP timelines across both light and dark operating modes.',
    metric: '60fps Hardware Accelerated',
    author: 'Kinetic Design Pod',
  },
  {
    id: 'd4',
    tag: '#EngineeringFellowship',
    category: 'Academy & R&D',
    title: 'Fellowship Cohort 04: 12 Builders Shipping Production Autonomous Engines',
    date: '2 WEEKS AGO',
    excerpt: 'Behind the scenes of our 6-week intensive engineering cohort. Live code reviews, weekly architectural defenses, and zero tutorial fluff.',
    metric: '12 / 12 Seats Assigned',
    author: 'Nayak Labs Academy',
  },
  {
    id: 'd5',
    tag: '#OpenSource',
    category: 'Open Research',
    title: 'EventMesh 3D Radar v2.0: Real-Time Global Technology Summit Tracking',
    date: '3 WEEKS AGO',
    excerpt: 'Open source 3D Canvas engine tracking developer summits, AI hackathons, and national tech hubs with zero external map library overhead.',
    metric: '100% Free & Open Source',
    author: 'Open Technical Research',
  },
  {
    id: 'd6',
    tag: '#ModelInference',
    category: 'Edge AI',
    title: 'Sub-50ms Edge Speculative Decoding on Heterogeneous Hardware',
    date: '1 MONTH AGO',
    excerpt: 'Deploying small draft models alongside quantized 70B parameters to triple generation throughput on edge workstations with zero cloud roundtrip.',
    metric: '3.2x Throughput Gain',
    author: 'Applied Machine Intelligence',
  },
]

export function SocialMediaSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)

  const total = DISPATCHES.length

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }, [total])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
  }, [total])

  // Autoplay with hover pause
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused, handleNext])

  // Touch and mouse drag handlers for natural swiping
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    dragStartX.current = clientX
    isDragging.current = true
  }

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || dragStartX.current === null) return
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX
    const diff = clientX - dragStartX.current

    if (diff > 45) {
      handlePrev()
    } else if (diff < -45) {
      handleNext()
    }
    dragStartX.current = null
    isDragging.current = false
  }

  return (
    <section
      id="social"
      className="py-24 md:py-32 min-h-[100svh] flex flex-col justify-center relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[var(--border-base)] before:to-transparent scroll-mt-20 overflow-hidden"
      aria-labelledby="social-headline"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 w-full">
        {/* Eyebrow & Headline */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-6 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="06" label="Community & dispatch · Social" />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.08}>
          <div className="max-w-2xl mb-8">
            <h2
              id="social-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-3"
            >
              Public build logs & dispatches.
            </h2>
            <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
              Real-time engineering updates, architecture breakdowns, and telemetry snapshots directly from our lab.
            </p>
          </div>
        </ScrollReveal>

        {/* Skiper49 Inverted Perspective 3D Carousel Stage */}
        <ScrollReveal delay={0.12} variant="blur-focus">
          <div
            className="relative min-h-[380px] sm:min-h-[420px] w-full flex items-center justify-center py-4 select-none perspective-1200 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
          >
            {DISPATCHES.map((item, idx) => {
              // Calculate relative offset distance
              let diff = idx - activeIndex
              if (diff > total / 2) diff -= total
              if (diff < -total / 2) diff += total

              const isCenter = diff === 0
              const isRight1 = diff === 1
              const isLeft1 = diff === -1
              const isRight2 = diff === 2
              const isLeft2 = diff === -2

              // Exact Skiper49 Inverted 3D Transform Formula
              let translateX = '0%'
              let translateZ = 0
              let rotateY = 0
              let scale = 1
              let opacity = 1
              let blur = '0px'
              let zIndex = 40

              if (isCenter) {
                translateX = '0%'
                translateZ = 0
                rotateY = 0
                scale = 1
                opacity = 1
                blur = '0px'
                zIndex = 40
              } else if (isRight1) {
                translateX = '58%'
                translateZ = -90
                rotateY = -22 // Inverted inward fanning
                scale = 0.88
                opacity = 0.72
                blur = '2px'
                zIndex = 30
              } else if (isLeft1) {
                translateX = '-58%'
                translateZ = -90
                rotateY = 22 // Inverted inward fanning
                scale = 0.88
                opacity = 0.72
                blur = '2px'
                zIndex = 30
              } else if (isRight2) {
                translateX = '105%'
                translateZ = -170
                rotateY = -34
                scale = 0.75
                opacity = 0.35
                blur = '5px'
                zIndex = 20
              } else if (isLeft2) {
                translateX = '-105%'
                translateZ = -170
                rotateY = 34
                scale = 0.75
                opacity = 0.35
                blur = '5px'
                zIndex = 20
              } else {
                translateX = diff > 0 ? '140%' : '-140%'
                translateZ = -250
                rotateY = diff > 0 ? -45 : 45
                scale = 0.65
                opacity = 0
                blur = '8px'
                zIndex = 10
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute w-full max-w-xl transition-all duration-700 ease-out-expo cursor-pointer ${
                    isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-90'
                  }`}
                  style={{
                    transform: `translateX(${translateX}) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    opacity,
                    filter: `blur(${blur})`,
                    zIndex,
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <div className="glass-panel drafting-card specular-border p-7 sm:p-9 rounded-2xl shadow-2xl flex flex-col justify-between h-[330px] sm:h-[350px] border border-[var(--border-base)] relative overflow-hidden group">
                    {/* Glowing corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-glow)] rounded-full blur-2xl pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity" />

                    {/* Corner Drafting Marks */}
                    <div className="pointer-events-none absolute inset-2.5 z-20 opacity-40 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true">
                      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[var(--border-hover)]" />
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[var(--border-hover)]" />
                      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[var(--border-hover)]" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[var(--border-hover)]" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-primary)] font-semibold">
                            {item.tag}
                          </span>
                          <span className="font-body text-[11px] text-[var(--text-muted)] font-medium">
                            {item.category}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-3 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                        {item.title}
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs">
                      <span className="text-[var(--accent-primary)] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.metric}</span>
                      </span>
                      <span className="text-[var(--text-muted)] text-[11px] flex items-center gap-1 group-hover:text-[var(--text-primary)] transition-colors">
                        <span>{item.author}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Controls Bar Positioned BELOW Carousel (3D Tactile Buttons) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--border-base)]">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <button
                onClick={handlePrev}
                className="btn-ghost p-3 rounded-full text-[var(--text-primary)] cursor-pointer shadow-md"
                aria-label="Previous dispatch"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-4 py-2 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] font-mono text-xs text-[var(--text-muted)] shadow-xs">
                <span className="text-[var(--text-primary)] font-bold">0{activeIndex + 1}</span> / 0{total}
              </div>
              <button
                onClick={handleNext}
                className="btn-ghost p-3 rounded-full text-[var(--text-primary)] cursor-pointer shadow-md"
                aria-label="Next dispatch"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Dot Indicators */}
            <div className="flex items-center gap-2">
              {DISPATCHES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'w-8 bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]'
                      : 'w-2 bg-[var(--border-base)] hover:bg-[var(--border-hover)]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SocialMediaSection
