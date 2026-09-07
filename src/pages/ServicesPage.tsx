import React, { useState } from 'react'
import { Bot, Globe, Database, Palette, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { GlobalCanvasBackground } from '../components/ui/GlobalCanvasBackground'
import { Footer } from '../components/Footer'
import { TierNavbarDispatcher } from '../components/tiers/TierDispatcher'
import { ServiceArchitecturePreview } from '../components/services/ServiceArchitecturePreview'

interface ServicePillar {
  id: string
  number: string
  title: string
  subtitle: string
  icon: React.ElementType
  capabilities: string[]
  stack: string[]
  metric: string
  metricLabel: string
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'agentic-ai',
    number: '01',
    title: 'Autonomous AI & Retrieval Architecture',
    subtitle: 'Production agentic workflows that reason, execute deterministic tools, and ground on private data.',
    icon: Bot,
    capabilities: [
      'Multi-agent graph topologies with LangGraph cyclic error recovery.',
      'Hybrid semantic vector retrieval with reranking (Qdrant, pgvector).',
    ],
    stack: ['LangGraph', 'FastAPI', 'Qdrant', 'Claude SDK', 'Python'],
    metric: '< 80ms',
    metricLabel: 'Streaming TTFT',
  },
  {
    id: 'fullstack-web',
    number: '02',
    title: 'High-Scale Web & Edge Systems',
    subtitle: 'Type-safe platforms engineered with modern Server Components, edge caching, and automated failover.',
    icon: Globe,
    capabilities: [
      'Next.js 15 platforms with streaming SSR and strict TypeScript.',
      'PostgreSQL schema optimization with PgBouncer connection pooling.',
    ],
    stack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Tailwind', 'Redis'],
    metric: '99.99%',
    metricLabel: 'Uptime SLA',
  },
  {
    id: 'distributed-systems',
    number: '03',
    title: 'Distributed Queues & Real-Time Data',
    subtitle: 'High-throughput asynchronous task workers, bi-directional WebSockets, and resilient sync pipelines.',
    icon: Database,
    capabilities: [
      'Asynchronous task queues processing 5k+ events/sec (BullMQ).',
      'Low-latency WebSockets and automated dead-letter recovery.',
    ],
    stack: ['Go', 'Node.js', 'Redis Streams', 'BullMQ', 'Docker'],
    metric: '< 15ms',
    metricLabel: 'p95 Latency',
  },
  {
    id: 'kinetic-ui',
    number: '04',
    title: 'Kinetic UI/UX & Motion Systems',
    subtitle: 'Digital surfaces engineered with 60fps hardware-accelerated motion and strict WCAG AA standards.',
    icon: Palette,
    capabilities: [
      'Hardware-accelerated 60fps GSAP timelines and Canvas visualizers.',
      'Bespoke design systems with unified typographic and color tokens.',
    ],
    stack: ['GSAP 3', 'Canvas API', 'Design Tokens', 'Figma'],
    metric: '60fps',
    metricLabel: 'Fluid Motion',
  },
]

export default function ServicesPage() {
  const [mobileActivePillarIdx, setMobileActivePillarIdx] = useState(0)
  const mobilePillar = SERVICE_PILLARS[mobileActivePillarIdx]
  const MobileIcon = mobilePillar.icon

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300 select-none">
      <GrainOverlay />
      <GlobalCanvasBackground />

      {/* Unified Multi-Tier Navbar */}
      <TierNavbarDispatcher />

      {/* Main Content */}
      <main className="pt-20 sm:pt-28 pb-24 sm:pb-40 px-4 sm:px-8 md:px-12 max-w-[1240px] mx-auto relative z-10">
        {/* ── HEADER BANNER ── */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
              Engineering Capabilities & Client Pods
            </span>
          </div>

          <h1 className="font-display font-black text-[clamp(2rem,5.5vw,3.8rem)] leading-[1.08] tracking-tight text-[var(--text-primary)] mb-3 sm:mb-4">
            Software built with absolute engineering rigor<span className="text-[var(--accent-secondary)]">.</span>
          </h1>

          <p className="font-body text-xs sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
            We partner directly with founders and technical teams to architect, build, and deploy production software. No generic boilerplate, no junior delegation, and zero fluff.
          </p>
        </div>

        {/* ── MOBILE VIEW: UNIFIED COMPACT WORKBENCH & ACTIVE PILLAR DOSSIER (MD:HIDDEN) ── */}
        <div className="block md:hidden space-y-6 mb-10">
          <ServiceArchitecturePreview />

          {/* Mobile Pillar Selector Tabs */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)]">
            {SERVICE_PILLARS.map((p, idx) => {
              const PIcon = p.icon
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setMobileActivePillarIdx(idx)}
                  className={`flex-1 py-2 px-1.5 rounded-lg font-mono text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer truncate ${
                    mobileActivePillarIdx === idx
                      ? 'bg-[var(--accent-secondary)] text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <PIcon className="w-3 h-3 shrink-0" />
                  <span className="truncate">0{idx + 1} {p.title.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>

          {/* Active Single Pillar Card on Mobile */}
          <section className="rounded-2xl p-5 bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-[var(--border-base)]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]">
                    <MobileIcon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--accent-secondary)]">
                    Pillar {mobilePillar.number}
                  </span>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-black text-[var(--text-primary)]">{mobilePillar.metric}</div>
                  <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{mobilePillar.metricLabel}</div>
                </div>
              </div>

              <h2 className="font-display font-bold text-base text-[var(--text-primary)] mb-1">
                {mobilePillar.title}
              </h2>
              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                {mobilePillar.subtitle}
              </p>

              <div className="space-y-1.5 mb-4">
                {mobilePillar.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2 font-body text-xs text-[var(--text-primary)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mb-4 font-mono text-[10px]">
                {mobilePillar.stack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[var(--text-muted)]">Founder Direct Pod</span>
              <a
                href="mailto:hello@nayaklabs.com?subject=Inquiry:%20Architecture%20Review"
                className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent-secondary)]"
              >
                <span>Consult on this Pillar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>

        {/* ── DESKTOP & TABLET VIEW: FULL WORKBENCH + 4 PILLAR GRID (UNTOUCHED) ── */}
        <div className="hidden md:block">
          {/* INTERACTIVE ARCHITECTURE WORKBENCH */}
          <ServiceArchitecturePreview />

          {/* 4 CORE SERVICE PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
            {SERVICE_PILLARS.map((service) => {
              const Icon = service.icon

              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="rounded-2xl p-6 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between transition-colors duration-200"
                >
                  <div>
                    {/* Top Bar: Icon + Pillar Number + SLA Metric */}
                    <div className="flex items-center justify-between gap-3 mb-3.5 pb-3 border-b border-[var(--border-base)]">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs font-bold text-[var(--accent-secondary)]">
                          Pillar {service.number}
                        </span>
                      </div>

                      <div className="text-right font-mono">
                        <div className="text-xs font-black text-[var(--text-primary)]">{service.metric}</div>
                        <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{service.metricLabel}</div>
                      </div>
                    </div>

                    <h2 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)] mb-1.5">
                      {service.title}
                    </h2>
                    <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {service.subtitle}
                    </p>

                    {/* Concise Capabilities */}
                    <div className="space-y-2 mb-4">
                      {service.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2 font-body text-xs text-[var(--text-primary)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[10px]">
                      {service.stack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">Founder Direct Pod</span>
                    <a
                      href="mailto:hello@nayaklabs.com?subject=Inquiry:%20Architecture%20Review"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent-secondary)] hover:underline"
                    >
                      <span>Consult on this Pillar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-bold text-[var(--accent-secondary)] uppercase tracking-wider">
              Bilateral NDA & Guaranteed 4h SLA
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] mt-1 mb-1.5">
              Ready to architect your production system?
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)]">
              Direct technical alignment with principal systems architects from day one.
            </p>
          </div>

          <a
            href="mailto:hello@nayaklabs.com"
            className="py-3 px-6 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_14px_rgba(79,70,229,0.35)] active:translate-y-0.5 inline-flex items-center justify-center gap-2 shrink-0"
          >
            <span>Initiate Direct Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
