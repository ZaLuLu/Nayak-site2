import React, { useState } from 'react'
import {
  Users,
  Calendar,
  Award,
  CheckCircle2,
  ChevronRight,
  Code2,
  Sparkles,
  X,
  Mail,
} from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { GlobalCanvasBackground } from '../components/ui/GlobalCanvasBackground'
import { Footer } from '../components/Footer'
import { ScrollReveal } from '../components/ScrollReveal'
import { TierNavbarDispatcher } from '../components/tiers/TierDispatcher'

interface ModuleItem {
  number: string
  title: string
  duration: string
  coreTopics: string[]
  codeLab: string
  capstoneOutcome: string
}

const MODULES: ModuleItem[] = [
  {
    number: '01',
    title: 'Modern Systems Foundations & TypeScript Architecture',
    duration: 'WEEK 01',
    coreTopics: [
      'Advanced TypeScript generic constraints, template literal types & discriminated unions.',
      'Asynchronous event loop mechanics, microtask scheduling & memory profiling.',
      'Deterministic functional state pipelines and error boundary design patterns.',
    ],
    codeLab: 'Build a strict type-safe RPC client with compile-time schema inference and automated retry buffers.',
    capstoneOutcome: 'Zero `any` type safety with 100% strict compiler compliance.',
  },
  {
    number: '02',
    title: 'High-Throughput Backends & Distributed Task Engines',
    duration: 'WEEK 02',
    coreTopics: [
      'FastAPI & Node.js asynchronous runtime optimization.',
      'Distributed task queues with Redis Streams, BullMQ, and dead-letter handling.',
      'PostgreSQL query indexing (B-Tree, GIN, GiST), connection pooling (PgBouncer), and transaction isolation.',
    ],
    codeLab: 'Design a resilient distributed job worker processing 5,000 concurrent events/sec with rate limiters.',
    capstoneOutcome: 'Sub-15ms p95 API response times under simulated load testing.',
  },
  {
    number: '03',
    title: 'Agentic AI Architecture & Production Vector Retrieval',
    duration: 'WEEK 03',
    coreTopics: [
      'Multi-agent state graph topologies using LangGraph with cyclic error resolution.',
      'High-dimensional vector indexing, HNSW algorithms, and hybrid sparse-dense search (Qdrant).',
      'Deterministic function-calling schemas, streaming inference, and guardrails against prompt injection.',
    ],
    codeLab: 'Build an autonomous multi-step research agent that executes sandbox Python code and compiles verified reports.',
    capstoneOutcome: 'Autonomous multi-tool agent with verifiable reasoning traces and checkpoint recovery.',
  },
  {
    number: '04',
    title: 'Advanced Kinetic Frontend & Design Systems',
    duration: 'WEEK 04',
    coreTopics: [
      'Next.js 15 Server Components, streaming SSR, and edge route handlers.',
      'Hardware-accelerated 60fps GSAP ScrollTrigger timelines and inertia scroll integration.',
      'Custom specular glassmorphic design token architecture and accessible WCAG AA standards.',
    ],
    codeLab: 'Construct an interactive 3D WebGL / Canvas visualizer integrated into a production design system.',
    capstoneOutcome: 'Lighthouse 98+ performance score with 60fps fluid frame rendering.',
  },
  {
    number: '05',
    title: 'Production Infrastructure, Security & Observability',
    duration: 'WEEK 05',
    coreTopics: [
      'Docker container multi-stage builds and automated CI/CD pipelines (GitHub Actions).',
      'OpenTelemetry distributed tracing, Prometheus metrics, and structured JSON telemetry.',
      'Zero-trust authentication, JWT rotation, CORS policies, and rate-limiting middleware.',
    ],
    codeLab: 'Configure automated blue-green cloud deployments with zero-downtime database migrations.',
    capstoneOutcome: 'Fully automated production deployment pipeline with telemetry dashboards.',
  },
  {
    number: '06',
    title: 'Full-Scale Capstone Build & Engineering Defense',
    duration: 'WEEK 06',
    coreTopics: [
      'End-to-end architecture sprint from product specification to live staging deployment.',
      'Live code reviews with senior engineering mentors and architecture defense.',
      'Production hardening, stress benchmarking, and final launch preparation.',
    ],
    codeLab: 'Deploy a full-stack, production-grade AI platform with live users, real-time analytics, and billing.',
    capstoneOutcome: 'Live shipped production application ready for portfolio and commercial usage.',
  },
]

export default function AcademicsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (waitlistEmail) {
      setWaitlistSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <GrainOverlay />
      <GlobalCanvasBackground />

      {/* Ambient Aurora Light Pool (Violet / Indigo) */}
      <div
        className="absolute top-20 left-1/3 w-[600px] h-[350px] rounded-full opacity-25 dark:opacity-20 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.35) 0%, rgba(79, 70, 229, 0.2) 45%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Unified Multi-Tier Navbar */}
      <TierNavbarDispatcher />

      <main className="pt-24 sm:pt-28 pb-24 px-6 md:px-10 max-w-[1240px] mx-auto relative z-10">
        {/* Hero Section with Single Gradient-Text Heading on Academics Page (LOCKED §2) */}
        <ScrollReveal variant="blur-focus">
          <div className="max-w-3xl mb-16">
            <div className="glass-pill mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
              <span>Fellowship cohorts & academy</span>
            </div>
            {/* Solid Single-Color Heading (Strict Zero Gradients) */}
            <h1 className="text-section-h md:text-5xl font-display font-bold tracking-tight mb-6 text-[var(--text-primary)]">
              Engineering mastery through production builds.
            </h1>
            <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              An elite 6-week intensive engineering fellowship for serious developers. Strictly 12 seats. Direct architectural mentorship, weekly production code reviews, and live software deployed by Week 6.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-base)] font-mono text-xs">
              <div className="p-4 rounded-2xl card-tactile drafting-card border border-[var(--border-base)] relative overflow-hidden">
                <span className="corner-bracket-tl">┌</span>
                <span className="corner-bracket-tr">┐</span>
                <span className="corner-bracket-bl">└</span>
                <span className="corner-bracket-br">┘</span>
                <div className="p-2 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] w-fit mb-2 shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-[var(--text-muted)] text-[10px] uppercase">Cohort Size</div>
                <div className="font-bold text-sm text-[var(--text-primary)]">Strictly 12 Seats</div>
              </div>
              <div className="p-4 rounded-2xl card-tactile drafting-card border border-[var(--border-base)] relative overflow-hidden">
                <span className="corner-bracket-tl">┌</span>
                <span className="corner-bracket-tr">┐</span>
                <span className="corner-bracket-bl">└</span>
                <span className="corner-bracket-br">┘</span>
                <div className="p-2 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] w-fit mb-2 shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-[var(--text-muted)] text-[10px] uppercase">Duration</div>
                <div className="font-bold text-sm text-[var(--text-primary)]">6 Weeks (Live)</div>
              </div>
              <div className="p-4 rounded-2xl card-tactile drafting-card border border-[var(--border-base)] relative overflow-hidden">
                <span className="corner-bracket-tl">┌</span>
                <span className="corner-bracket-tr">┐</span>
                <span className="corner-bracket-bl">└</span>
                <span className="corner-bracket-br">┘</span>
                <div className="p-2 rounded-xl bg-[var(--accent-tertiary)]/10 text-[var(--accent-tertiary)] w-fit mb-2 shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-[var(--text-muted)] text-[10px] uppercase">Outcome</div>
                <div className="font-bold text-sm text-[var(--text-primary)]">Production AI Software</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 6-Week Detailed Curriculum */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 pb-4 border-b border-[var(--border-base)]">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                6-Week Curriculum Blueprint
              </h2>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Every single module is rooted in production repositories and real-world latency budgets.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent-primary)] font-bold">
              Cohort 04 enrolling
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod, mIdx) => (
              <ScrollReveal key={mod.number} delay={mIdx * 0.05} variant="blur-focus">
                <div className="card-tactile drafting-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full group border border-[var(--border-base)] relative overflow-hidden">
                  <span className="corner-bracket-tl">┌</span>
                  <span className="corner-bracket-tr">┐</span>
                  <span className="corner-bracket-bl">└</span>
                  <span className="corner-bracket-br">┘</span>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                      <span className="px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-bold shadow-xs">
                        Module {mod.number}
                      </span>
                      <span className="text-[var(--text-muted)]">{mod.duration}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3 leading-snug">
                      {mod.title}
                    </h3>

                    <ul className="space-y-2 mb-6 font-body text-xs text-[var(--text-secondary)]">
                      {mod.coreTopics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--accent-primary)] mt-0.5">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-base)] space-y-3 font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Code2 className="w-3 h-3 text-[var(--accent-secondary)]" />
                        <span>Code Lab</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-primary)] leading-relaxed">
                        {mod.codeLab}
                      </p>
                    </div>

                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[var(--accent-primary)]" />
                        <span>Benchmark Outcome</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {mod.capstoneOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Admissions Action Banner (3D Tactile Slab) */}
        <section className="card-tactile drafting-card p-8 sm:p-12 rounded-2xl relative overflow-hidden text-left border border-[var(--border-base)]">
          <span className="corner-bracket-tl">┌</span>
          <span className="corner-bracket-tr">┐</span>
          <span className="corner-bracket-bl">└</span>
          <span className="corner-bracket-br">┘</span>
          <div className="max-w-2xl">
            <span className="font-body text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              Fellowship Admissions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2 mb-4">
              Ready to build at the highest level?
            </h2>
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
              Admissions are evaluated on engineering ambition and technical foundation. We review submissions on a rolling basis until the 12 seats are allocated.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary py-3 px-8 text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <span>Apply for next cohort</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Applications Waitlist Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
          <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-2xl relative shadow-2xl border border-[var(--border-base)]">
            <button
              onClick={() => {
                setModalOpen(false)
                setWaitlistSubmitted(false)
              }}
              className="absolute top-5 right-5 p-1.5 rounded-[8px] border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] animate-ping" />
              <span className="font-body text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider">
                Cohort Enrollment
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              Cohort 04 Applications Opening Soon
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              The application portal is currently being configured for the upcoming cohort. Enter your email below to be notified first when seats unlock.
            </p>

            {waitlistSubmitted ? (
              <div className="p-4 rounded-[10px] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-xs font-body flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are on the priority waitlist! We will notify you once admissions go live.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="founder@company.com"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-base)] rounded-[10px] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary justify-center py-2.5 text-xs font-semibold"
                >
                  Notify me when seats open →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer onScrollTo={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
