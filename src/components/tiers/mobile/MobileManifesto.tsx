import React from 'react'
import { STUDIO_METRICS, MANIFESTO_PARAGRAPHS } from '../../../data/metrics'

export function MobileManifesto() {
  return (
    <section id="about" className="w-full px-5 py-12 border-t border-[var(--border-base)] scroll-mt-16 select-none">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold uppercase tracking-wider">
          Studio Manifesto
        </span>
      </div>

      <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-4">
        Software engineered alongside founders.
      </h2>

      <div className="space-y-3 mb-8">
        {MANIFESTO_PARAGRAPHS.map((p, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xs">
            <h3 className="font-display font-bold text-sm text-[var(--text-primary)] mb-1">
              {p.heading}
            </h3>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>

      {/* Studio Track Record Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {STUDIO_METRICS.map((m) => (
          <div
            key={m.label}
            className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col justify-between shadow-xs"
          >
            <div className="font-mono text-[9.5px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
              {m.label}
            </div>
            <div className="font-display font-black text-xl text-[var(--accent-primary)]">
              {m.value}
            </div>
            <div className="font-body text-[9px] text-[var(--text-secondary)] mt-1 font-medium">
              {m.subtext}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
