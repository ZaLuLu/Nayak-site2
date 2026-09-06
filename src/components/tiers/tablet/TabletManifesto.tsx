import React from 'react'
import { STUDIO_METRICS, MANIFESTO_PARAGRAPHS } from '../../../data/metrics'

export function TabletManifesto() {
  return (
    <section id="about" className="w-full px-8 py-16 border-t border-[var(--border-base)] scroll-mt-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-400 font-semibold">
          Studio Manifesto & Telemetry
        </span>
      </div>

      <div className="grid grid-cols-2 gap-10">
        {/* Left Column: Manifesto narrative */}
        <div>
          <h2 className="font-display font-black text-3xl text-[var(--text-primary)] leading-tight mb-4">
            Zero bloat. Uncompromising systems architecture.
          </h2>
          <div className="space-y-4">
            {MANIFESTO_PARAGRAPHS.map((p, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
                <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                  {p.heading}
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 4-Quadrant Telemetry Matrix */}
        <div className="grid grid-cols-2 gap-3 self-start">
          {STUDIO_METRICS.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between"
            >
              <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-2">
                {m.label}
              </div>
              <div className="font-display font-black text-2xl text-violet-400 mb-1">
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
