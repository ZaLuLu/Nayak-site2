import React, { useState } from 'react'
import {
  Sliders,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  ArrowRight,
  Sparkles,
  Clock,
  Cpu,
} from 'lucide-react'

interface ScopeOption {
  id: string
  label: string
  category: string
  desc: string
  days: number
}

const SCOPE_OPTIONS: ScopeOption[] = [
  {
    id: 'agentic-rag',
    label: 'Autonomous Agentic AI & RAG',
    category: 'Applied AI',
    desc: 'LangGraph multi-agent orchestration, deterministic tool schemas, and hybrid Qdrant search.',
    days: 6,
  },
  {
    id: 'distributed-infra',
    label: 'Distributed Task Queues & Workers',
    category: 'Backend Infra',
    desc: 'BullMQ job processors, Redis Streams buffering, and PostgreSQL PgBouncer tuning.',
    days: 5,
  },
  {
    id: 'edge-platform',
    label: 'High-Scale Edge & Web Platform',
    category: 'Fullstack',
    desc: 'Next.js 15 Server Components, streaming SSR, and zero-trust authentication.',
    days: 5,
  },
  {
    id: 'kinetic-motion',
    label: 'Kinetic UI/UX & Motion Systems',
    category: 'Frontend & UI',
    desc: 'Hardware-accelerated 60fps GSAP timelines, responsive device tiers, and WCAG AA tokens.',
    days: 4,
  },
  {
    id: 'observability',
    label: 'OpenTelemetry & CI/CD Pipelines',
    category: 'DevOps',
    desc: 'Multi-stage Docker builds, blue-green deployment, and live latency tracing.',
    days: 3,
  },
]

export function ProjectScopeEstimator() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['agentic-rag', 'edge-platform'])
  const [podTier, setPodTier] = useState<'standard' | 'accelerated'>('standard')
  const [copied, setCopied] = useState(false)

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    )
  }

  // Calculate estimated days
  const rawDays = selectedIds.reduce((sum, id) => {
    const opt = SCOPE_OPTIONS.find((o) => o.id === id)
    return sum + (opt ? opt.days : 0)
  }, 0)

  const finalDays = podTier === 'accelerated' ? Math.max(10, Math.round(rawDays * 0.75)) : rawDays
  const estimatedSprints = Math.ceil(finalDays / 10)

  const selectedOptions = SCOPE_OPTIONS.filter((o) => selectedIds.includes(o.id))

  const scopeSummaryText = `Nayak Labs — Project Scope Specification
-------------------------------------------
Selected Modules:
${selectedOptions.map((o) => `• [${o.category}] ${o.label} (~${o.days}d)`).join('\n')}

Pod Composition: ${podTier === 'accelerated' ? 'Accelerated Pod (Principal Architect + 2 Senior Engineers)' : 'Standard Pod (Principal Architect + 1 Senior Engineer)'}
Estimated Timeline: ~${finalDays} Business Days (${estimatedSprints} Sprint${estimatedSprints > 1 ? 's' : ''})
SLA Guarantee: Bilateral NDA, Dedicated Senior Pod, Direct Founder Technical Reviews`

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(scopeSummaryText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const emailSubject = encodeURIComponent(`Project Scope Inquiry — ~${finalDays} Days Estimate`)
  const emailBody = encodeURIComponent(scopeSummaryText)
  const mailtoUrl = `mailto:nayaklabs.ai@gmail.com?subject=${emailSubject}&body=${emailBody}`

  return (
    <div className="card-tactile p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xl overflow-hidden mb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[var(--border-base)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sliders className="w-4 h-4 text-[var(--accent-secondary)]" />
            <span className="font-mono text-xs text-[var(--accent-secondary)] font-semibold uppercase tracking-wider">
              Interactive Scope & Pod Estimator
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Configure Your Engineering Scope
          </h3>
          <p className="font-body text-xs text-[var(--text-secondary)] mt-0.5">
            Select the capabilities required for your platform to estimate pod sizing, timeline, and sprint cadence.
          </p>
        </div>

        {/* Pod Velocity Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-base)] shrink-0 font-mono text-xs">
          <button
            type="button"
            onClick={() => setPodTier('standard')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              podTier === 'standard'
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-base)] font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Standard Pod
          </button>
          <button
            type="button"
            onClick={() => setPodTier('accelerated')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              podTier === 'accelerated'
                ? 'bg-[var(--accent-secondary)] text-white shadow-xs font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Accelerated</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Multi-select Modules (7 cols) */}
        <div className="lg:col-span-7 space-y-2.5">
          <span className="font-mono text-[10.5px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Step 1: Select Architectural Modules ({selectedIds.length} Selected)
          </span>

          {SCOPE_OPTIONS.map((opt) => {
            const isSelected = selectedIds.includes(opt.id)

            return (
              <div
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-[var(--bg-surface-elevated)] border-[var(--accent-secondary)] shadow-sm'
                    : 'bg-[var(--bg-surface-inset)] border-[var(--border-base)] opacity-85 hover:opacity-100 hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'bg-[var(--accent-secondary)] border-[var(--accent-secondary)] text-white'
                        : 'border-[var(--border-base)] bg-[var(--bg-surface-inset)]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                        {opt.label}
                      </span>
                      <span className="font-mono text-[9.5px] px-2 py-0.2 rounded bg-[var(--bg-surface-inset)] text-[var(--accent-secondary)] border border-[var(--border-base)] font-bold">
                        {opt.category}
                      </span>
                    </div>
                    <p className="font-body text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-[var(--text-muted)] shrink-0 pt-0.5">
                  ~{opt.days}d
                </span>
              </div>
            )
          })}
        </div>

        {/* Right Column: Dynamic Scope Estimation & Actions (5 cols) */}
        <div className="lg:col-span-5 card-inset-well p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10.5px] text-[var(--accent-secondary)] font-bold uppercase tracking-wider block mb-2">
              Step 2: Estimated Pod Output
            </span>

            {/* Metric Overview Card */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-base)] shadow-xs font-mono">
                <span className="text-[10px] text-[var(--text-muted)] uppercase flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-[var(--accent-secondary)]" />
                  <span>Timeline</span>
                </span>
                <div className="font-display font-black text-xl text-[var(--text-primary)]">
                  ~{finalDays} <span className="text-xs font-normal text-[var(--text-secondary)]">Days</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  {estimatedSprints} Sprint{estimatedSprints > 1 ? 's' : ''} Delivery
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-base)] shadow-xs font-mono">
                <span className="text-[10px] text-[var(--text-muted)] uppercase flex items-center gap-1 mb-1">
                  <Cpu className="w-3 h-3 text-emerald-400" />
                  <span>Pod Sizing</span>
                </span>
                <div className="font-display font-black text-xl text-[var(--text-primary)]">
                  {podTier === 'accelerated' ? '3 Eng' : '2 Eng'}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  Principal + Senior
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-2 mb-6 font-mono text-[11px] text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dedicated Pod · Full Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bilateral NDA & Guaranteed 4h SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Full Source Code & Infrastructure Handover</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[var(--border-base)] space-y-2.5">
            <a
              href={mailtoUrl}
              className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_14px_rgba(79,70,229,0.35)] active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Scope to Founders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2 px-3 rounded-xl font-mono text-xs font-semibold btn-ghost flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Scope Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Scope Specification</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
