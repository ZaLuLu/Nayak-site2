import React, { useState } from 'react'
import { CheckCircle2, ChevronDown, FileCode, Zap, GitCommit, ShieldCheck, Clock } from 'lucide-react'
import { WORKFLOW_STEPS } from '../../../data/workflow'

export function MobileWhyChooseUs() {
  const [expandedIndex, setExpandedIndex] = useState(0)

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
    <section id="why-us" className="w-full px-4 py-12 border-t border-[var(--border-base)] scroll-mt-16">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
          Architecture & Delivery
        </span>
      </div>

      <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-2">
        How We Ship Systems
      </h2>
      <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
        5 rigorous phases from contract to production handover. Zero vendor lock-in.
      </p>

      {/* Accordion List */}
      <div className="space-y-2.5">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isExpanded = expandedIndex === idx

          return (
            <div
              key={step.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-[var(--bg-surface)] border-violet-500/40 shadow-sm'
                  : 'bg-[var(--bg-surface)]/60 border-[var(--border-base)]'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                className="w-full p-4 flex items-center justify-between text-left active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5">{getIcon(step.iconName)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-violet-400 font-bold">
                        {step.num}
                      </span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/70">
                        {step.timeline}
                      </span>
                    </div>
                    <div className="font-display font-bold text-sm text-[var(--text-primary)] mt-0.5">
                      {step.title}
                    </div>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-violet-400' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[var(--border-base)]/50">
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                    {step.desc}
                  </p>

                  <div className="space-y-1.5">
                    {step.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-2 font-body text-[11px] text-[var(--text-primary)]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
