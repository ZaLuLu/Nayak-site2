import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, GraduationCap, Code2, Cpu, Sparkles, Layers } from 'lucide-react'
import { DIVISIONS, SCOPE_BADGES } from '../../../data/divisions'

interface MobileHeroProps {
  onScrollToDivision?: (id: string) => void
}

export function MobileHero({ onScrollToDivision }: MobileHeroProps) {
  const getDivisionIcon = (letter: string) => {
    switch (letter) {
      case 'P':
        return <Terminal className="w-5 h-5 text-violet-300" />
      case 'S':
        return <Globe className="w-5 h-5 text-violet-300" />
      case 'A':
        return <GraduationCap className="w-5 h-5 text-violet-300" />
      default:
        return <Terminal className="w-5 h-5 text-violet-300" />
    }
  }

  const getScopeIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-violet-400" />
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-violet-400" />
      case 'Layers':
        return <Layers className="w-4 h-4 text-violet-400" />
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-violet-400" />
      default:
        return <Code2 className="w-4 h-4" />
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-start px-4 pt-20 pb-8 overflow-x-hidden"
    >
      {/* ── BRAND KICKER BADGE ── */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/30 backdrop-blur-md mb-4 self-start shadow-xs">
        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-violet-300 font-semibold">
          Digital Architecture & Research
        </span>
      </div>

      {/* ── PROMINENT MONUMENTAL WORDMARK ── */}
      <h1 className="font-display font-black text-[clamp(2.8rem,11.5vw,4.2rem)] leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] mb-3">
        Nayak Labs<span className="text-violet-500">.</span>
      </h1>

      {/* ── DESCRIPTOR COPY ── */}
      <p className="font-body text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6">
        Digital architecture and applied research studio. Building in-house platforms, custom cloud systems, and high-velocity engineering fellowships.
      </p>

      {/* ── 3 VERTICALLY STACKED PURPLE DIVISION CARDS ── */}
      <div className="w-full flex flex-col gap-3.5 mb-8">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-violet-400 font-bold">
            Core Divisions
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            Tap to open dedicated page
          </span>
        </div>

        {/* 1. Products (P) */}
        <Link
          to="/products"
          className="w-full p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-[var(--bg-surface)] border border-purple-500/30 hover:border-purple-400/60 flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-purple-950/20 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <Terminal className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                  01 · Products (P)
                </span>
                <h2 className="font-display font-black text-xl text-[var(--text-primary)] group-hover:text-purple-300 transition-colors mt-0.5">
                  Products
                </h2>
              </div>
            </div>
          </div>

          <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
            In-house developer tooling, visual memory runtime analyzers, and autonomous AI infrastructure.
          </p>

          <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between font-mono text-xs text-purple-400 font-bold">
            <span>Click to open Products page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 2. Services (S) */}
        <Link
          to="/services"
          className="w-full p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-[var(--bg-surface)] border border-purple-500/30 hover:border-purple-400/60 flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-purple-950/20 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <Globe className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                  02 · Services (S)
                </span>
                <h2 className="font-display font-black text-xl text-[var(--text-primary)] group-hover:text-purple-300 transition-colors mt-0.5">
                  Services
                </h2>
              </div>
            </div>
          </div>

          <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
            Custom distributed systems, cloud microservices, and applied AI engineering with zero middlemen.
          </p>

          <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between font-mono text-xs text-purple-400 font-bold">
            <span>Click to open Services page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 3. Academics (A) */}
        <Link
          to="/academics"
          className="w-full p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-[var(--bg-surface)] border border-purple-500/30 hover:border-purple-400/60 flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-purple-950/20 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <GraduationCap className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                  03 · Academics (A)
                </span>
                <h2 className="font-display font-black text-xl text-[var(--text-primary)] group-hover:text-purple-300 transition-colors mt-0.5">
                  Academics
                </h2>
              </div>
            </div>
          </div>

          <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
            6-week intensive engineering fellowships and direct 1-on-1 architecture mentorship. Strictly 12 seats.
          </p>

          <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between font-mono text-xs text-purple-400 font-bold">
            <span>Click to open Academics page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* ── 4 COMPACT SCOPE BADGES (2x2 GRID) ── */}
      <div className="w-full grid grid-cols-2 gap-2.5 pt-4 border-t border-[var(--border-base)]">
        {SCOPE_BADGES.map((b) => (
          <div
            key={b.title}
            className="p-3 rounded-xl bg-[var(--bg-surface)]/60 border border-[var(--border-base)] flex flex-col items-center text-center"
          >
            <div className="mb-1">{getScopeIcon(b.iconName)}</div>
            <div className="font-mono text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {b.title}
            </div>
            <div className="font-body text-[8px] text-[var(--text-muted)]">{b.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
