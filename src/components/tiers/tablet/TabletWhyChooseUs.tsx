import React, { useState } from 'react'
import { CheckCircle2, FileCode, Zap, GitCommit, ShieldCheck, Clock, ArrowRight } from 'lucide-react'
import { WORKFLOW_STEPS } from '../../../data/workflow'
import { ambientAudio } from '../../../utils/audioEngine'

export function TabletWhyChooseUs() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeStep = WORKFLOW_STEPS[activeIdx]

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileCode':
        return <FileCode className="w-4 h-4 text-violet-400" />
      case 'Zap':
        return <Zap className="w-4 h-4 text-indigo-400" />
      case 'GitCommit':
        return <GitCommit className="w-4 h-4 text-sky-400" />
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />
      case 'Clock':
        return <Clock className="w-4 h-4 text-violet-400" />
      default:
        return <Zap className="w-4 h-4" />
    }
  }

  return (
    <section id="why-us" className="w-full px-6 sm:px-8 py-8 border-t border-[var(--border-base)] scroll-mt-16 select-none">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold">
          Execution Blueprint · 5 Milestones
        </span>
        <span className="font-mono text-[11px] text-[var(--text-muted)]">100% IP Handover</span>
      </div>

      <div className="max-w-2xl mb-4">
        <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] leading-tight mb-1">
          From first contract to production ownership.
        </h2>
        <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
          Predictable milestones with zero ambiguity. Every repository, secret, and deployment asset is transferred directly to your organization.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left Column: 5 Steps Selector (5 cols) */}
        <div className="col-span-5 space-y-1.5">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = activeIdx === idx

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  ambientAudio.playTick()
                  setActiveIdx(idx)
                }}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                  isActive
                    ? 'bg-[var(--bg-card)] border-violet-500/60 shadow-md shadow-black/5'
                    : 'bg-[var(--bg-card)]/60 border-[var(--border-base)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-violet-400' : 'text-[var(--text-muted)]'}`}>
                    {step.num}
                  </span>
                  <div>
                    <div className="font-display font-bold text-xs text-[var(--text-primary)]">
                      {step.title}
                    </div>
                    <div className="font-mono text-[9.5px] text-[var(--text-muted)]">
                      {step.timeline}
                    </div>
                  </div>
                </div>

                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-violet-400 translate-x-0.5' : 'text-transparent'}`} />
              </button>
            )
          })}
        </div>

        {/* Right Column: Active Step Blueprint Dossier (7 cols) */}
        <div className="col-span-7 p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col justify-between shadow-md shadow-black/5">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
                  {getIcon(activeStep.iconName)}
                </div>
                <div>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-violet-400 font-bold">
                    {activeStep.badge}
                  </span>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                    {activeStep.title}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-[10.5px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-secondary)] font-semibold">
                {activeStep.timeline}
              </span>
            </div>

            <p className="font-body text-[11.5px] text-[var(--text-secondary)] leading-relaxed mb-4">
              {activeStep.desc}
            </p>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2">
                Phase Deliverables & Artifacts
              </div>
              <div className="space-y-1.5">
                {activeStep.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2 font-body text-[11.5px] text-[var(--text-primary)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[10.5px] text-[var(--text-muted)] mt-4">
            <span>Milestone {activeStep.num} of 05</span>
            <span className="text-violet-400 font-bold">Bilateral SLA Protected</span>
          </div>
        </div>
      </div>
    </section>
  )
}
