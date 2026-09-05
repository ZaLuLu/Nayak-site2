import React from 'react'
import { Link } from 'react-router-dom'
import {
  Bot,
  Globe,
  Database,
  Palette,
  CheckCircle2,
  ArrowRight,
  Workflow,
  Sparkles,
  Terminal,
  Layers,
} from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { GlobalCanvasBackground } from '../components/ui/GlobalCanvasBackground'
import { Footer } from '../components/Footer'
import { ScrollReveal } from '../components/ScrollReveal'
import { Navbar } from '../components/Navbar'

interface ServicePillar {
  id: string
  number: string
  title: string
  subtitle: string
  icon: React.ElementType
  accentColor: string
  capabilities: string[]
  stack: string[]
  architecturePattern: string
  deliverables: string[]
  leadTime?: string
  highlight?: string
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'agentic-ai',
    number: '01',
    title: 'Autonomous AI Systems & Retrieval Architecture',
    subtitle: 'Production-grade agentic pipelines that reason, call external APIs, and operate securely on private data.',
    icon: Bot,
    accentColor: 'var(--accent-primary)',
    capabilities: [
      'Multi-agent workflow orchestration with state graphs and human-in-the-loop validation.',
      'Hybrid semantic vector retrieval with reranking (Qdrant, pgvector, Pinecone).',
      'Deterministic structured outputs, tool-calling schema validation, and prompt jailbreak guardrails.',
      'Low-latency model streaming backends with dynamic fallback routing across providers.',
    ],
    stack: ['LangGraph', 'FastAPI', 'Python 3.12', 'Qdrant', 'OpenAI SDK', 'Pydantic'],
    architecturePattern: 'Event-driven LangGraph supervisor coordinating worker agents with persistent SQLite/PostgreSQL checkpointing.',
    deliverables: ['Full agent runtime repository', 'Custom RAG indexing pipeline', 'Admin evaluation dashboard', 'Comprehensive API documentation'],
  },
  {
    id: 'fullstack-web',
    number: '02',
    title: 'High-Scale Web & Mobile Product Engineering',
    subtitle: 'Blazing fast, type-safe full-stack platforms crafted with modern framework architecture and edge distribution.',
    icon: Globe,
    accentColor: 'var(--accent-secondary)',
    capabilities: [
      'Next.js 15 & React 18 platforms utilizing Server Components and streaming SSR.',
      'Robust PostgreSQL & Supabase database schema design with automated migration pipelines.',
      'Stripe & LemonSqueezy multi-tier subscription billing with webhook reconciliation.',
      'Role-based access control (RBAC), OAuth 2.0 auth flows, and enterprise SSO integration.',
    ],
    stack: ['Next.js 15', 'TypeScript', 'React 18', 'PostgreSQL', 'Tailwind CSS', 'Drizzle ORM', 'Redis'],
    architecturePattern: 'Zero-waterfall server rendering with Redis edge caching and decoupled asynchronous backend microservices.',
    deliverables: ['Production Next.js application', 'Complete CI/CD build scripts', 'Automated unit & E2E tests', 'Cloud infrastructure configuration'],
  },
  {
    id: 'distributed-systems',
    number: '03',
    title: 'Real-Time Distributed Systems & Data Pipelines',
    subtitle: 'High-throughput asynchronous task engines, WebSockets, and resilient automated data extraction pipelines.',
    icon: Database,
    accentColor: 'var(--accent-tertiary)',
    capabilities: [
      'High-throughput queue architectures processing millions of concurrent jobs (BullMQ / Celery).',
      'Real-time bi-directional WebSockets and low-latency audio/video WebRTC telemetry.',
      'Resilient web scraping and distributed data aggregation with proxy rotation and anti-bot handling.',
      'Automated background sync engines with exponential backoff and dead-letter queues.',
    ],
    stack: ['Go', 'Node.js', 'Redis Streams', 'BullMQ', 'Docker', 'WebSockets', 'Playwright'],
    architecturePattern: 'Distributed worker pools ingesting event streams with guaranteed at-least-once delivery and telemetry logging.',
    deliverables: ['Worker service binaries / containers', 'Monitoring & metrics dashboard', 'Proxy orchestration layer', 'Resilience test suite'],
  },
  {
    id: 'kinetic-ui',
    number: '04',
    title: 'Kinetic UI/UX, Design Systems & Motion Engineering',
    subtitle: 'Award-winning interactive digital surfaces that captivate users with 60fps deterministic motion and optical depth.',
    icon: Palette,
    accentColor: 'var(--accent-primary)',
    capabilities: [
      'Bespoke specular glassmorphic design systems with standardized typographic and color tokens.',
      'Hardware-accelerated, 60fps GSAP ScrollTrigger timelines and inertia scroll synchronization.',
      'Interactive Canvas / WebGL data visualizers, 3D globes, and interactive sandboxes.',
      'Strict WCAG AA accessibility compliance, keyboard navigation, and prefers-reduced-motion gating.',
    ],
    stack: ['GSAP 3.15', 'HTML5 Canvas', 'Lenis Smooth Scroll', 'Vanilla CSS Tokens', 'Figma', 'Lucide'],
    architecturePattern: 'GPU-composited layered DOM rendering with synchronized RAF tickers and zero layout thrashing.',
    deliverables: ['Figma design system blueprint', 'Interactive React component library', 'Motion token specification', 'Accessibility audit report'],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <GrainOverlay />
      <GlobalCanvasBackground />

      {/* Unified Gradient Glassmorphic Navbar */}
      <Navbar />

      {/* Ambient Aurora Light Pool (Violet / Fuchsia) */}
      <div
        className="absolute top-20 right-1/4 w-[600px] h-[350px] rounded-full opacity-25 dark:opacity-20 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(192, 38, 211, 0.35) 0%, rgba(139, 92, 246, 0.18) 45%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <main className="pt-24 sm:pt-28 pb-24 px-6 md:px-10 max-w-[1240px] mx-auto relative z-10">
        {/* Hero Stage with Single Gradient-Text Heading on Services Page (LOCKED §2) */}
        <ScrollReveal variant="blur-focus">
          <div className="max-w-3xl mb-16">
            <div className="glass-pill mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              <span>Engineering capabilities & client pods</span>
            </div>
            {/* Solid Single-Color Heading (Strict Zero Gradients) */}
            <h1 className="text-section-h md:text-5xl font-display font-bold tracking-tight mb-6 text-[var(--text-primary)]">
              Software built with absolute engineering rigor.
            </h1>
            <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              We partner with tech founders and ambitious product teams to architect, build, and deploy production software. No generic boilerplate, no junior delegation, and zero agency fluff.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Core Pillars Grid */}
        <div className="space-y-12 mb-24">
          {SERVICE_PILLARS.map((service, sIdx) => {
            const Icon = service.icon
            return (
              <ScrollReveal key={service.id} delay={sIdx * 0.08} variant="blur-focus">
                <section
                  id={service.id}
                  className="glass-panel specular-border p-8 sm:p-10 rounded-2xl relative overflow-hidden border border-[var(--border-base)]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8 pb-8 border-b border-[var(--border-base)]">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-3 font-mono text-xs">
                        <span className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] font-bold text-[var(--text-primary)]">
                          Pillar {service.number}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-3">
                        {service.title}
                      </h2>
                      <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                        {service.subtitle}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)] self-start">
                      <Icon className="w-8 h-8" style={{ color: service.accentColor }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Capabilities List */}
                    <div>
                      <h3 className="font-body text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        <span>Core Capabilities</span>
                      </h3>
                      <ul className="space-y-3 font-body text-xs sm:text-sm text-[var(--text-secondary)]">
                        {service.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architecture & Deliverables */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-body text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Workflow className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                          <span>Architecture Pattern</span>
                        </h3>
                        <p className="font-mono text-xs text-[var(--text-secondary)] bg-[var(--bg-surface)] p-3 rounded-xl border border-[var(--border-base)] leading-relaxed">
                          {service.architecturePattern}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-body text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
                          <span>Key Deliverables</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((del, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] font-mono text-[11px] text-[var(--text-secondary)]"
                            >
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Bar */}
                  <div className="pt-6 border-t border-[var(--border-base)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[var(--text-muted)]">Stack:</span>
                      {service.stack.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded-[6px] bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)] text-[11px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/#contact"
                      className="inline-flex items-center gap-1.5 font-bold text-xs text-[var(--accent-primary)] hover:underline"
                    >
                      <span>Start engagement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </section>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Operating Model / How We Work */}
        <section className="glass-panel p-8 sm:p-12 rounded-2xl mb-20 border border-[var(--border-base)]">
          <div className="max-w-2xl mb-10">
            <span className="font-body text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              Operating Model
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mt-2 mb-3">
              How we work together
            </h2>
            <p className="font-body text-sm text-[var(--text-secondary)]">
              Direct technical access. Clear milestones. 100% intellectual property ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-[10px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
              <span className="font-mono text-xs text-[var(--accent-primary)] font-bold">Stage 01</span>
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mt-2 mb-1">
                Technical Discovery
              </h3>
              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                We review system constraints, API contracts, database topology, and establish mutual NDA.
              </p>
            </div>

            <div className="p-5 rounded-[10px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
              <span className="font-mono text-xs text-[var(--accent-secondary)] font-bold">Stage 02</span>
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mt-2 mb-1">
                Clickable Prototype
              </h3>
              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                We deploy a functional staging environment so you test user flows and latency before final buildout.
              </p>
            </div>

            <div className="p-5 rounded-[10px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
              <span className="font-mono text-xs text-[var(--accent-tertiary)] font-bold">Stage 03</span>
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mt-2 mb-1">
                Core Build & CI/CD
              </h3>
              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                Asynchronous worker pods, optimized vector indexes, database migrations, and comprehensive tests.
              </p>
            </div>

            <div className="p-5 rounded-[10px] bg-[var(--bg-surface)] border border-[var(--border-base)]">
              <span className="font-mono text-xs text-[var(--accent-primary)] font-bold">Stage 04</span>
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mt-2 mb-1">
                100% IP Transfer
              </h3>
              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                Full Git repository handoff, documentation, secrets handover, and deployment support.
              </p>
            </div>
          </div>
        </section>

        {/* Direct CTA */}
        <div className="text-center py-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-4">
            Have a project or technical architecture in mind?
          </h2>
          <p className="font-body text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
            Connect directly with our engineering team to review system requirements and feasibility.
          </p>
          <Link to="/#contact" className="btn-primary">
            <span>Get in touch with the studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer onScrollTo={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
