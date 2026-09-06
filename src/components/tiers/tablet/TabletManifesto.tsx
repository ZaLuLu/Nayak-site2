import React from 'react'
import { STUDIO_METRICS, MANIFESTO_PARAGRAPHS } from '../../../data/metrics'
import { Sparkles, ShieldCheck, Zap } from 'lucide-react'

export function TabletManifesto() {
  return (
    <section id="about" className="w-full px-6 sm:px-8 py-14 border-t border-[var(--border-base)] scroll-mt-20 select-none">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold">
          Studio Manifesto & Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Manifesto narrative (6 cols) */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight mb-3">
              Zero bloat. Uncompromising systems architecture.
            </h2>
            <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              We reject bloated frameworks and bureaucratic development cycles. Every system we build is designed with ruthless architectural precision, sub-100ms response targets, and clear ownership.
            </p>
          </div>

          <div className="space-y-3">
            {MANIFESTO_PARAGRAPHS.map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)]">
                <h3 className="font-display font-bold text-sm text-[var(--text-primary)] mb-1">
                  {p.heading}
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 4-Quadrant Telemetry Matrix (6 cols) */}
        <div className="md:col-span-6 grid grid-cols-2 gap-3 self-center">
          {STUDIO_METRICS.map((m) => (
            <div
              key={m.label}
              className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col justify-between"
            >
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1 font-semibold">
                {m.label}
              </div>
              <div className="font-display font-black text-2xl text-violet-400 mb-0.5">
                {m.value}
              </div>
              <div className="font-body text-xs text-[var(--text-secondary)] font-medium">
                {m.subtext}
              </div>
              <div className="font-body text-[10px] text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border-base)] leading-normal">
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
