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
      className="relative w-full flex flex-col justify-start px-5 pt-20 pb-10 overflow-x-hidden select-none"
    >
      {/* ── STUDIO KICKER BADGE ── */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] backdrop-blur-md mb-4 self-start shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-secondary)] font-semibold">
          Digital Architecture & Research
        </span>
      </div>

      {/* ── MONUMENTAL WORDMARK ── */}
      <h1 className="font-display font-black text-[clamp(2.9rem,11.5vw,4.2rem)] leading-[0.98] tracking-[-0.035em] text-[var(--text-primary)] mb-3">
        Nayak Labs<span className="text-[var(--accent-primary)]">.</span>
      </h1>

      {/* ── EDITORIAL SUBTITLE ── */}
      <p className="font-body text-[14px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[96%]">
        Digital architecture and applied research studio. Building in-house platforms, custom cloud systems, and high-velocity engineering fellowships.
      </p>

      {/* ── 3 LUXURY STACKED DIVISION CARDS ── */}
      <div className="w-full flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent-primary)] font-bold">
            Core Divisions
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            Tap to explore
          </span>
        </div>

        {/* 1. Products (P) */}
        <Link
          to="/products"
          className="card-tactile group relative overflow-hidden rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-black/5"
        >
          {/* Subtle Accent Glow Ring */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-[var(--accent-primary)]/20 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/15">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-bold">
                01 · Products (P)
              </span>
            </div>

            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-1.5">
              Products
            </h2>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              In-house developer tooling, visual memory runtime analyzers, and autonomous AI infrastructure.
            </p>
          </div>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-primary)] font-semibold">
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 2. Services (S) */}
        <Link
          to="/services"
          className="card-tactile group relative overflow-hidden rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-black/5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-[var(--accent-secondary)]/20 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/15">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-secondary)] font-bold">
                02 · Services (S)
              </span>
            </div>

            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors mb-1.5">
              Services
            </h2>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Custom distributed systems, cloud microservices, and specialized applied AI engineering.
            </p>
          </div>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-secondary)] font-semibold">
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 3. Academics (A) */}
        <Link
          to="/academics"
          className="card-tactile group relative overflow-hidden rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-black/5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-[var(--accent-primary)]/20 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/15">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-bold">
                03 · Academics (A)
              </span>
            </div>

            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-1.5">
              Academics
            </h2>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              6-week intensive engineering fellowships and direct 1-on-1 architecture mentorship. Strictly 12 seats.
            </p>
          </div>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-primary)] font-semibold">
            <span>Explore Academics</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* ── 4 ARCHITECTURAL SCOPE BADGES (2x2 GRID) ── */}
      <div className="w-full grid grid-cols-2 gap-2.5 pt-4 border-t border-[var(--border-base)]">
        {SCOPE_BADGES.map((b) => (
          <div
            key={b.title}
            className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col items-center text-center shadow-xs"
          >
            <div className="mb-1.5">{getScopeIcon(b.iconName)}</div>
            <div className="font-mono text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {b.title}
            </div>
            <div className="font-body text-[8.5px] text-[var(--text-muted)] mt-0.5">{b.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
