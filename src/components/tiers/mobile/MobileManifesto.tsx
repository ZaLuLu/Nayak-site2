import React from 'react'
import { STUDIO_METRICS, MANIFESTO_PARAGRAPHS } from '../../../data/metrics'

export function MobileManifesto() {
  return (
    <section id="about" className="w-full px-4 py-12 border-t border-[var(--border-base)] scroll-mt-16">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-violet-400 font-semibold">
          Studio Manifesto
        </span>
      </div>

      <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-4">
        Zero Bloat. Pure Systems Architecture.
      </h2>

      <div className="space-y-4 mb-8">
        {MANIFESTO_PARAGRAPHS.map((p, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
            <h3 className="font-display font-bold text-sm text-[var(--text-primary)] mb-1">
              {p.heading}
            </h3>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>

      {/* Studio Live Telemetry Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {STUDIO_METRICS.map((m) => (
          <div
            key={m.label}
            className="p-3.5 rounded-xl bg-[var(--bg-surface)]/60 border border-[var(--border-base)] flex flex-col justify-between"
          >
            <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
              {m.label}
            </div>
            <div className="font-display font-black text-xl text-violet-400">
              {m.value}
            </div>
            <div className="font-body text-[9px] text-[var(--text-secondary)] mt-1">
              {m.subtext}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
