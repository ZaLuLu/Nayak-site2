import React from 'react'
import { STUDIO_METRICS, MANIFESTO_PARAGRAPHS } from '../../../data/metrics'

export function TabletManifesto() {
  return (
    <section id="about" className="w-full px-6 sm:px-8 py-8 border-t border-[var(--border-base)] scroll-mt-16 select-none">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold">
          Studio Manifesto & Standards
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Manifesto narrative (6 cols) */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] leading-tight mb-2">
              Software engineered alongside founders.
            </h2>
            <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Senior engineering pods that design, build, and deploy production systems directly to your cloud infrastructure.
            </p>
          </div>

          <div className="space-y-2.5">
            {MANIFESTO_PARAGRAPHS.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)]">
                <h3 className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)] mb-0.5">
                  {p.heading}
                </h3>
                <p className="font-body text-[11.5px] text-[var(--text-secondary)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 4-Quadrant Telemetry Matrix (6 cols) */}
        <div className="md:col-span-6 grid grid-cols-2 gap-2.5">
          {STUDIO_METRICS.map((m) => (
            <div
              key={m.label}
              className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col justify-between"
            >
              <div className="font-mono text-[9.5px] text-[var(--text-muted)] uppercase tracking-wider mb-1 font-semibold">
                {m.label}
              </div>
              <div className="font-display font-black text-xl text-violet-400 mb-0.5">
                {m.value}
              </div>
              <div className="font-body text-[11.5px] text-[var(--text-secondary)] font-medium">
                {m.subtext}
              </div>
              <div className="font-body text-[9.5px] text-[var(--text-muted)] mt-1.5 pt-1.5 border-t border-[var(--border-base)] leading-normal">
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
