import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, GraduationCap, Code2, Cpu, Sparkles, Layers } from 'lucide-react'
import { DIVISIONS, SCOPE_BADGES } from '../../../data/divisions'

interface TabletHeroProps {
  onScrollToDivision?: (id: string) => void
}

export function TabletHero({ onScrollToDivision }: TabletHeroProps) {
  const getDivisionIcon = (letter: string) => {
    switch (letter) {
      case 'P':
        return <Terminal className="w-5 h-5 text-violet-400" />
      case 'S':
        return <Globe className="w-5 h-5 text-indigo-400" />
      case 'A':
        return <GraduationCap className="w-5 h-5 text-sky-400" />
      default:
        return <Terminal className="w-5 h-5" />
    }
  }

  const getScopeIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-violet-400" />
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-indigo-400" />
      case 'Layers':
        return <Layers className="w-4 h-4 text-sky-400" />
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-violet-400" />
      default:
        return <Code2 className="w-4 h-4" />
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] flex flex-col justify-start px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* ── HEADER DOSSIER BANNER ── */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)]/80 backdrop-blur-md mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--text-secondary)] font-semibold">
            NayakLabs // Tablet Dossier
          </span>
        </div>

        <h1 className="font-display font-black text-[clamp(3.2rem,7.5vw,4.8rem)] leading-[1.05] tracking-tight text-[var(--text-primary)] mb-4">
          Architectural Software<span className="text-violet-500">.</span>
        </h1>

        <p className="font-body text-[16px] text-[var(--text-secondary)] leading-relaxed">
          Digital architecture and research studio. Three dedicated production pillars engineered from first principles for extreme performance and zero bloat.
        </p>
      </div>

      {/* ── 3-COLUMN NATURAL GLANCE GRID ── */}
      <div className="w-full grid grid-cols-3 gap-4 mb-8">
        {DIVISIONS.map((div) => (
          <Link
            key={div.id}
            to={div.route}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between group active:scale-98 transition-transform shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-xl bg-violet-500/10">
                  {getDivisionIcon(div.letter)}
                </div>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[var(--bg-base)] border border-[var(--border-base)] text-violet-400 font-semibold">
                  {div.code}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2 group-hover:text-violet-400 transition-colors">
                {div.title}
              </h3>
              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                {div.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {div.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-violet-400 font-semibold">
              <span>{div.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* ── 4-COLUMN SCOPE TELEMETRY MATRIX ── */}
      <div className="w-full grid grid-cols-4 gap-3 pt-6 border-t border-[var(--border-base)]">
        {SCOPE_BADGES.map((b) => (
          <div
            key={b.title}
            className="p-4 rounded-xl bg-[var(--bg-surface)]/60 border border-[var(--border-base)] flex flex-col items-center text-center"
          >
            <div className="mb-2">{getScopeIcon(b.iconName)}</div>
            <div className="font-mono text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {b.title}
            </div>
            <div className="font-body text-[10px] text-[var(--text-muted)] mt-0.5">{b.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
