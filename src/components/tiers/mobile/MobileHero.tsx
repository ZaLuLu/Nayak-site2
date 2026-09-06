import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, GraduationCap, Code2, Cpu, Sparkles, Layers } from 'lucide-react'
import { SCOPE_BADGES } from '../../../data/divisions'

interface MobileHeroProps {
  onScrollToDivision?: (id: string) => void
}

export function MobileHero({ onScrollToDivision }: MobileHeroProps) {
  const getScopeIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-[var(--accent-primary)]" />
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[var(--accent-secondary)]" />
      case 'Layers':
        return <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
      default:
        return <Code2 className="w-4 h-4" />
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-start px-4 pt-16 pb-8 overflow-x-hidden select-none"
    >
      {/* ── STUDIO KICKER BADGE ── */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] backdrop-blur-md mb-3 self-start shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
        <span className="font-mono text-[9.5px] tracking-widest uppercase text-[var(--text-secondary)] font-semibold">
          Digital Architecture & Research
        </span>
      </div>

      {/* ── MONUMENTAL WORDMARK ── */}
      <h1 className="font-display font-black text-[clamp(2.75rem,11.2vw,3.9rem)] leading-[0.98] tracking-[-0.035em] text-[var(--text-primary)] mb-2.5">
        Nayak Labs<span className="text-[var(--accent-primary)]">.</span>
      </h1>

      {/* ── EDITORIAL SUBTITLE ── */}
      <p className="font-body text-[13.5px] text-[var(--text-secondary)] leading-relaxed mb-6 max-w-[96%]">
        Digital architecture and applied research studio. Building in-house platforms, custom cloud systems, and high-velocity engineering fellowships.
      </p>

      {/* ── 3 LUXURY STACKED DIVISION CARDS WITH 3D GLOSSY BUTTONS ── */}
      <div className="w-full flex flex-col gap-3.5 mb-7">
        <div className="flex items-center justify-between px-1 mb-0.5">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--accent-primary)] font-bold">
            Core Divisions
          </span>
          <span className="font-mono text-[9.5px] text-[var(--text-muted)]">
            Tap to explore
          </span>
        </div>

        {/* 1. Products (P) */}
        <Link
          to="/products"
          className="card-tactile group relative overflow-hidden rounded-2xl p-5 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--accent-primary)]/10 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8 group-hover:bg-[var(--accent-primary)]/20 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/15">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono text-[9.5px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-bold">
                01 · Products (P)
              </span>
            </div>

            <h2 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-1">
              Products
            </h2>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              In-house developer tooling, visual memory runtime analyzers, and autonomous AI infrastructure.
            </p>
          </div>

          {/* 3D Glossy Action Button */}
          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--text-muted)] font-medium">In-House Platforms</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold text-white bg-gradient-to-b from-violet-500 to-violet-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_3px_10px_rgba(124,58,237,0.35)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_5px_14px_rgba(124,58,237,0.5)] group-active:translate-y-0.5 transition-all">
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* 2. Services (S) */}
        <Link
          to="/services"
          className="card-tactile group relative overflow-hidden rounded-2xl p-5 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8 group-hover:bg-[var(--accent-secondary)]/20 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/15">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-mono text-[9.5px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-secondary)] font-bold">
                02 · Services (S)
              </span>
            </div>

            <h2 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors mb-1">
              Services
            </h2>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Custom distributed systems, cloud microservices, and specialized applied AI engineering.
            </p>
          </div>

          {/* 3D Glossy Action Button */}
          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--text-muted)] font-medium">Bespoke Architecture</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold text-white bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_3px_10px_rgba(79,70,229,0.35)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_5px_14px_rgba(79,70,229,0.5)] group-active:translate-y-0.5 transition-all">
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* 3. Academics (A) */}
        <Link
          to="/academics"
          className="card-tactile group relative overflow-hidden rounded-2xl p-5 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--accent-primary)]/10 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8 group-hover:bg-[var(--accent-primary)]/20 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/15">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-mono text-[9.5px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-bold">
                03 · Academics (A)
              </span>
            </div>

            <h2 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-1">
              Academics
            </h2>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              6-week intensive engineering fellowships and direct 1-on-1 architecture mentorship. Strictly 12 seats.
            </p>
          </div>

          {/* 3D Glossy Action Button */}
          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--text-muted)] font-medium">6-Wk Fellowship</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold text-white bg-gradient-to-b from-violet-500 to-violet-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_3px_10px_rgba(124,58,237,0.35)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_5px_14px_rgba(124,58,237,0.5)] group-active:translate-y-0.5 transition-all">
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* ── 4 COMPACT SCOPE BADGES (2x2 GRID) ── */}
      <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-[var(--border-base)]">
        {SCOPE_BADGES.map((b) => (
          <div
            key={b.title}
            className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col items-center text-center shadow-xs"
          >
            <div className="mb-1">{getScopeIcon(b.iconName)}</div>
            <div className="font-mono text-[9.5px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {b.title}
            </div>
            <div className="font-body text-[8px] text-[var(--text-muted)] mt-0.5">{b.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
