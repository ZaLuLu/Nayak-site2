import React from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../ScrollReveal'
import { SectionEyebrow } from '../SectionEyebrow'
import {
  ArrowRight,
  Terminal,
  Globe,
  Cpu,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Database,
  Bot,
  Layers,
  Palette,
} from 'lucide-react'

export function PillarStack() {
  return (
    <div className="w-full">
      {/* =========================================================================
          DIVISION 01: PRODUCTS (P)
          ========================================================================= */}
      <section
        id="products"
        className="py-24 md:py-32 min-h-[100svh] flex flex-col justify-center border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow index="01" label="Products (P) · In-house platforms & runtimes" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-12">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4">
                What we build when no one’s watching.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                We engineer autonomous runtime telemetry, visual developer sandboxes, and 3D indexing tools used by technical teams worldwide. 100% free, production-tested, and open source.
              </p>
            </div>
          </ScrollReveal>

          {/* Products Preview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {/* Product 1: DI Notes Visualizer */}
            <ScrollReveal delay={0.12}>
              <div className="glass-panel p-7 sm:p-8 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-[10px] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        DI Notes Visualizer
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-[6px] border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-primary)]">
                      v2.5 stable
                    </span>
                  </div>

                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Real-time memory allocation, pointer swaps, recursion trees, and call stack visualizer. Step forward, inspect runtime variables, and duel algorithms in real time.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                    <span className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #AlgorithmTrace
                    </span>
                    <span className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #MemoryState
                    </span>
                    <span className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #InteractiveDuel
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">Interactive workbench</span>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-primary)] hover:underline font-bold"
                  >
                    <span>Launch sandbox</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Product 2: EventMesh 3D Radar */}
            <ScrollReveal delay={0.16}>
              <div className="glass-panel p-7 sm:p-8 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-[10px] bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]">
                        <Globe className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        EventMesh 3D Radar
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-[6px] border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-secondary)]">
                      3D telemetry
                    </span>
                  </div>

                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Interactive rotatable 3D canvas globe tracking global developer summits, AI hackathons, and archive benchmarks across major tech cities worldwide.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                    <span className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #3DGlobeMesh
                    </span>
                    <span className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #SummitRadar
                    </span>
                    <span className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #RealtimePins
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">Live 3D globe feed</span>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-secondary)] hover:underline font-bold"
                  >
                    <span>Explore 3D globe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Interactive Workbench Action Trigger */}
          <ScrollReveal delay={0.2}>
            <Link
              to="/products"
              className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer border border-[var(--border-base)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-[10px] bg-[var(--accent-primary)] text-white shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    Click to open full interactive products suite
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Access real-time algorithm runs, rotatable 3D globe telemetry, and developer benchmarks.
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] shrink-0">
                <span>Open interactive workbench</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 02: SERVICES (S)
          ========================================================================= */}
      <section
        id="services"
        className="py-24 md:py-32 min-h-[100svh] flex flex-col justify-center border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow index="02" label="Services (S) · Engineering capabilities" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-12">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4">
                Software built with absolute engineering rigor.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                We partner with venture-backed tech founders and product teams to architect, code, and deploy production AI pipelines and high-scale full-stack applications.
              </p>
            </div>
          </ScrollReveal>

          {/* 4 Core Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <ScrollReveal delay={0.12}>
              <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <Bot className="w-5 h-5 text-[var(--accent-primary)] mb-4" />
                <div>
                  <div className="font-body text-xs text-[var(--text-muted)] font-medium mb-1">
                    AI Runtimes
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    Autonomous AI Agents & RAG
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Multi-agent state graphs, hybrid vector search (Qdrant), tool-use schemas, and streaming inference.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <Globe className="w-5 h-5 text-[var(--accent-secondary)] mb-4" />
                <div>
                  <div className="font-body text-xs text-[var(--text-muted)] font-medium mb-1">
                    Platforms
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    High-Scale Web Platforms
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Next.js 15 Server Components, type-safe TypeScript, PostgreSQL schemas, and edge caching.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <Database className="w-5 h-5 text-[var(--accent-tertiary)] mb-4" />
                <div>
                  <div className="font-body text-xs text-[var(--text-muted)] font-medium mb-1">
                    Distributed
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    Real-Time Task Pipelines
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Asynchronous task queues (BullMQ/Redis), real-time WebSockets, and resilient scraping engines.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <Palette className="w-5 h-5 text-[var(--accent-primary)] mb-4" />
                <div>
                  <div className="font-body text-xs text-[var(--text-muted)] font-medium mb-1">
                    Kinetic Design
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    Design Systems & Motion
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Bespoke specular glassmorphic design systems, 60fps GSAP physics, and accessible typography.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Services Showcase Action Trigger */}
          <ScrollReveal delay={0.28}>
            <Link
              to="/services"
              className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer border border-[var(--border-base)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-[10px] bg-[var(--accent-secondary)] text-white font-bold shadow-sm">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
                    Explore dedicated services architecture & capabilities
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    View technical architecture blueprints, stack breakdowns, and operating deliverables.
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-secondary)] shrink-0">
                <span>View full services specification</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 03: ACADEMICS (A)
          ========================================================================= */}
      <section
        id="academics"
        className="py-24 md:py-32 min-h-[100svh] flex flex-col justify-center border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow index="03" label="Academics (A) · Engineering fellowship academy" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-12">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4">
                Skip the tutorials. Ship the real thing.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                An elite 6-week intensive engineering cohort for serious developers. Strictly 12 seats. Direct architectural mentorship, weekly live code reviews, and production software deployed by Week 6.
              </p>
            </div>
          </ScrollReveal>

          {/* Curriculum Teaser Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <ScrollReveal delay={0.12}>
              <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <span className="font-mono text-xs text-[var(--accent-tertiary)] font-bold">
                    Weeks 01–02
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mt-2 mb-2">
                    Systems & Task Queues
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    TypeScript architecture, Redis Streams, BullMQ task workers, and PostgreSQL index optimization.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-base)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
                  <span>Sub-15ms p95 task worker deployed</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <span className="font-mono text-xs text-[var(--accent-tertiary)] font-bold">
                    Weeks 03–04
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mt-2 mb-2">
                    Agentic AI & Vector Search
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    LangGraph multi-agent workflows, tool schemas, Qdrant hybrid search, and streaming guardrails.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-base)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
                  <span>Self-correcting research agent</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <span className="font-mono text-xs text-[var(--accent-tertiary)] font-bold">
                    Weeks 05–06
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mt-2 mb-2">
                    Production Capstone Launch
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    Full-scale production deployment, CI/CD, telemetry, live architecture review defense.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-base)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
                  <span>Live deployed production platform</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Academics Showcase Action Trigger */}
          <ScrollReveal delay={0.24}>
            <Link
              to="/academics"
              className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer border border-[var(--border-base)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-[10px] bg-[var(--accent-tertiary)] text-white font-bold shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-tertiary)] transition-colors">
                    Explore 6-week fellowship curriculum & syllabus
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Review weekly code lab specifications, capstone deliverables, and cohort enrollment details.
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-tertiary)] shrink-0">
                <span>View complete syllabus & admissions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
