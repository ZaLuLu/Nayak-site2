import React, { useState } from 'react'
import { CheckCircle2, FileCode, Zap, GitCommit, ShieldCheck, Clock, ArrowRight } from 'lucide-react'
import { WORKFLOW_STEPS } from '../../../data/workflow'

export function TabletWhyChooseUs() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeStep = WORKFLOW_STEPS[activeIdx]

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileCode':
        return <FileCode className="w-5 h-5 text-violet-400" />
      case 'Zap':
        return <Zap className="w-5 h-5 text-indigo-400" />
      case 'GitCommit':
        return <GitCommit className="w-5 h-5 text-sky-400" />
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />
      case 'Clock':
        return <Clock className="w-5 h-5 text-violet-400" />
      default:
        return <Zap className="w-5 h-5" />
    }
  }

  return (
    <section id="why-us" className="w-full px-8 py-16 border-t border-[var(--border-base)] scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
          Execution Blueprint · 5 Milestones
        </span>
        <span className="font-mono text-xs text-[var(--text-muted)]">100% IP Handover</span>
      </div>

      <div className="max-w-2xl mb-8">
        <h2 className="font-display font-black text-3xl text-[var(--text-primary)] leading-tight mb-2">
          From first contract to production ownership.
        </h2>
        <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
          Predictable milestones with zero ambiguity. Every repository, secret, and deployment asset is transferred directly to your organization.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: 5 Steps Selector (5 cols) */}
        <div className="col-span-5 space-y-2">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = activeIdx === idx

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-200 active:scale-98 ${
                  isActive
                    ? 'bg-[var(--bg-surface)] border-violet-500/50 shadow-sm'
                    : 'bg-[var(--bg-surface)]/40 border-[var(--border-base)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-violet-400' : 'text-[var(--text-muted)]'}`}>
                    {step.num}
                  </span>
                  <div>
                    <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                      {step.title}
                    </div>
                    <div className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
                      {step.timeline}
                    </div>
                  </div>
                </div>

                <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-violet-400 translate-x-0.5' : 'text-transparent'}`} />
              </button>
            )
          })}
        </div>

        {/* Right Column: Active Step Blueprint Dossier (7 cols) */}
        <div className="col-span-7 p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-violet-500/10">
                  {getIcon(activeStep.iconName)}
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-violet-400 font-semibold">
                    {activeStep.badge}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                    {activeStep.title}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-base)] border border-[var(--border-base)] text-[var(--text-secondary)]">
                {activeStep.timeline}
              </span>
            </div>

            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              {activeStep.desc}
            </p>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">
                Phase Deliverables & Artifacts
              </div>
              <div className="space-y-2">
                {activeStep.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2.5 font-body text-xs text-[var(--text-primary)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)] mt-6">
            <span>Milestone {activeStep.num} of 05</span>
            <span className="text-violet-400 font-semibold">Bilateral SLA Protected</span>
          </div>
        </div>
      </div>
    </section>
  )
}
