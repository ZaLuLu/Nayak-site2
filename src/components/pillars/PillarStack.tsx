import React, { useState } from 'react'
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
  Play,
  RotateCcw,
  MapPin,
} from 'lucide-react'

export function PillarStack() {
  // Mini interactive state for DI Notes on-card visualizer
  const [arrayState, setArrayState] = useState([38, 72, 19, 94, 55, 27])
  const [stepCount, setStepCount] = useState(0)

  const handleStepSort = () => {
    setArrayState((prev) => {
      const arr = [...prev]
      // One step of bubble sort pass
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i]
          arr[i] = arr[i + 1]
          arr[i + 1] = temp
          break
        }
      }
      return arr
    })
    setStepCount((c) => c + 1)
  }

  const handleResetSort = () => {
    setArrayState([38, 72, 19, 94, 55, 27])
    setStepCount(0)
  }

  // Active city tab for EventJn. on-card preview
  const [activeCity, setActiveCity] = useState('Bengaluru')
  const cityCounts: Record<string, number> = {
    Bengaluru: 184,
    Mumbai: 112,
    'Delhi NCR': 96,
    Online: 140,
  }

  return (
    <div className="w-full">
      {/* =========================================================================
          DIVISION 01: PRODUCTS
          ========================================================================= */}
      <section
        id="products"
        className="py-14 md:py-20 flex flex-col justify-center border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-6 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow label="In-House Products" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-8">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-3">
                Software we build, ship, and run in-house.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                Developer tools, visual execution engines, and technical community directories built to solve daily engineering bottlenecks.
              </p>
            </div>
          </ScrollReveal>

          {/* Products Preview Cards Grid (3D Tactile Cards with Interactive Mini-Widgets) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {/* Product 1: DI Notes Visualizer */}
            <ScrollReveal delay={0.12}>
              <div className="card-tactile drafting-card p-6 sm:p-8 flex flex-col justify-between h-full border border-[var(--border-base)] relative overflow-hidden group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] shadow-sm">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        DI Notes Visualizer
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface-elevated)] text-[var(--accent-primary)] font-semibold shadow-xs">
                      v1.4 Live
                    </span>
                  </div>

                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                    Step-by-step visual execution engine for algorithms, pointer operations, and memory layouts.
                  </p>

                  {/* Interactive Mini Sandbox Widget */}
                  <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-base)] mb-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-3">
                      <span>Array Buffer · Step {stepCount}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handleStepSort}
                          className="px-2 py-0.5 rounded bg-[var(--accent-primary)]/20 hover:bg-[var(--accent-primary)]/30 text-[var(--accent-primary)] flex items-center gap-1 transition-colors cursor-pointer"
                          title="Execute single sort step"
                        >
                          <Play className="w-2.5 h-2.5" />
                          <span>Step</span>
                        </button>
                        <button
                          onClick={handleResetSort}
                          className="p-1 rounded hover:bg-white/10 text-[var(--text-muted)] transition-colors cursor-pointer"
                          title="Reset array"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-end gap-2 h-14 pt-2">
                      {arrayState.map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-[var(--accent-primary)]/70 to-[var(--accent-primary)] transition-all duration-300 shadow-xs"
                            style={{ height: `${(val / 100) * 44}px` }}
                          />
                          <span className="font-mono text-[10px] text-[var(--text-muted)]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">Open source · MIT</span>
                  <Link
                    to="/products"
                    className="btn-ghost py-1.5 px-3.5 text-xs font-body font-semibold inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Launch sandbox</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Product 2: EventJn. */}
            <ScrollReveal delay={0.16}>
              <div className="card-tactile drafting-card p-6 sm:p-8 flex flex-col justify-between h-full border border-[var(--border-base)] relative overflow-hidden group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] shadow-sm">
                        <Globe className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        EventJn.
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface-elevated)] text-[var(--accent-secondary)] font-semibold shadow-xs">
                      532 Listed
                    </span>
                  </div>

                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                    Curated radar tracking developer meetups, hackathons, and systems workshops across tech hubs.
                  </p>

                  {/* Interactive City Filter Preview */}
                  <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-base)] mb-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[var(--accent-secondary)]" />
                        <span>Active Hub: {activeCity}</span>
                      </span>
                      <span className="font-semibold text-[var(--accent-secondary)]">
                        {cityCounts[activeCity]} Events
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {Object.keys(cityCounts).map((city) => (
                        <button
                          key={city}
                          onClick={() => setActiveCity(city)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer truncate text-center ${
                            activeCity === city
                              ? 'bg-[var(--accent-secondary)] text-white font-semibold shadow-sm'
                              : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-base)]'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">Live registry</span>
                  <Link
                    to="/products"
                    className="btn-ghost py-1.5 px-3.5 text-xs font-body font-semibold inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Browse all hubs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Interactive Workbench Action Trigger (3D Tactile Banner) */}
          <ScrollReveal delay={0.2}>
            <Link
              to="/products"
              className="card-tactile p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer border border-[var(--border-base)] transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[var(--accent-primary)] text-white shadow-md group-hover:scale-105 group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    Explore all in-house products & interactive tools
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Try the algorithm sandboxes, social post generators, and event directories.
                  </div>
                </div>
              </div>
              <div className="btn-primary py-2 px-4 text-xs font-body font-semibold shrink-0">
                <span>View all products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 02: SERVICES
          ========================================================================= */}
      <section
        id="services"
        className="py-14 md:py-18 flex flex-col justify-center border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-6 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow label="Software Development" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-8">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-3">
                Senior engineering teams for your next release.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                We partner with founders and product teams to design, code, and ship full-stack web applications, practical AI tools, and workflow automations.
              </p>
            </div>
          </ScrollReveal>

          {/* 4 Core Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <ScrollReveal delay={0.12}>
              <div className="card-tactile p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div className="p-3 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] w-fit mb-4 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    Practical AI & Agents
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Custom document search, smart data extraction, and reliable multi-step agent workflows that work consistently.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="card-tactile p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div className="p-3 rounded-2xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] w-fit mb-4 shadow-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    Full-Stack Web Apps
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Customer portals, admin dashboards, and SaaS platforms built with Next.js, TypeScript, and clean database design.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="card-tactile p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div className="p-3 rounded-2xl bg-[var(--accent-tertiary)]/10 text-[var(--accent-tertiary)] w-fit mb-4 shadow-sm">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    Automations & Pipelines
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Background task workers, third-party API integrations, and data ingestion pipelines that replace fragile spreadsheets.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="card-tactile p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div className="p-3 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] w-fit mb-4 shadow-sm">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    UI Design & Microcopy
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Polished design systems, responsive layouts, and smooth animations that make your product feel fast and delightful.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Services Showcase Action Trigger (3D Tactile Banner) */}
          <ScrollReveal delay={0.28}>
            <Link
              to="/services"
              className="card-tactile p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer border border-[var(--border-base)] transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[var(--accent-secondary)] text-white font-bold shadow-md group-hover:scale-105 group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
                    Explore our engineering capabilities & pricing
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    View scope options, engagement timelines, and interactive budget estimators.
                  </div>
                </div>
              </div>
              <div className="btn-primary py-2 px-4 text-xs font-body font-semibold shrink-0">
                <span>View services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 03: ACADEMICS / TRAINING
          ========================================================================= */}
      <section
        id="academics"
        className="py-14 md:py-18 flex flex-col justify-center border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-6 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow label="Engineering Programs" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-8">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-3">
                Learn by building real software, not watching videos.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                Small-cohort, mentor-led programs in modern web architecture, systems design, and AI. Taught live by engineers who write production code every day.
              </p>
            </div>
          </ScrollReveal>

          {/* Curriculum Teaser Cards (3D Tactile Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <ScrollReveal delay={0.12}>
              <div className="card-tactile p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <span className="font-body text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-tertiary)] font-semibold shadow-xs">
                    Track 01
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mt-3 mb-2">
                    AI & Machine Learning
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    12 weeks covering embeddings, vector databases, fine-tuning with LoRA, and production RAG evaluation suites.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-base)] flex items-center gap-2 text-xs font-body text-[var(--text-primary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
                  <span>Capstone: Production RAG application</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="card-tactile p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <span className="font-body text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-tertiary)] font-semibold shadow-xs">
                    Track 02
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mt-3 mb-2">
                    DSA & Systems Design
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    10 weeks of hands-on data structures, concurrency, caching, rate limiting, and distributed architecture fundamentals.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-base)] flex items-center gap-2 text-xs font-body text-[var(--text-primary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
                  <span>Capstone: Distributed URL shortener</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="card-tactile p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border-base)]">
                <div>
                  <span className="font-body text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-tertiary)] font-semibold shadow-xs">
                    Track 03
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mt-3 mb-2">
                    Real-World Full-Stack Craft
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    8 weeks of building and launching a complete production SaaS product with auth, database migrations, and CI/CD.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-base)] flex items-center gap-2 text-xs font-body text-[var(--text-primary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
                  <span>Capstone: Live production SaaS app</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Academics Showcase Action Trigger (3D Tactile Banner) */}
          <ScrollReveal delay={0.24}>
            <Link
              to="/academics"
              className="card-tactile p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer border border-[var(--border-base)] transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[var(--accent-tertiary)] text-white font-bold shadow-md group-hover:scale-105 group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-tertiary)] transition-colors">
                    Explore upcoming cohort schedules & syllabus
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Review weekly session breakdowns, capstone projects, and admissions.
                  </div>
                </div>
              </div>
              <div className="btn-primary py-2 px-4 text-xs font-body font-semibold shrink-0">
                <span>View all tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

