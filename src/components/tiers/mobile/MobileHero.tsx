import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, GraduationCap, Code2, Cpu, Sparkles, Layers, MessageSquare, ExternalLink } from 'lucide-react'
import { DIVISIONS, SCOPE_BADGES } from '../../../data/divisions'

interface MobileHeroProps {
  onScrollToDivision?: (id: string) => void
}

export function MobileHero({ onScrollToDivision }: MobileHeroProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const cardWidth = el.offsetWidth * 0.85
    const active = Math.round(el.scrollLeft / cardWidth)
    setActiveCardIndex(Math.min(Math.max(active, 0), DIVISIONS.length - 1))
  }

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
      className="relative w-full min-h-[92vh] flex flex-col justify-start px-4 pt-20 pb-12 overflow-x-hidden"
    >
      {/* ── BRAND KICKER BADGE ── */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)]/80 backdrop-blur-md mb-4 self-start shadow-xs">
        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-secondary)] font-semibold">
          NayakLabs // Mobile V2.4
        </span>
      </div>

      {/* ── MONUMENTAL WORDMARK ── */}
      <h1 className="font-display font-black text-[clamp(2.5rem,10.2vw,3.6rem)] leading-[1.05] tracking-tight text-[var(--text-primary)] mb-3">
        Nayak Labs<span className="text-violet-500">.</span>
      </h1>

      {/* ── DESCRIPTOR COPY ── */}
      <p className="font-body text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6 max-w-[95%]">
        Digital architecture and applied research studio. Building in-house platforms, custom cloud systems, and high-velocity engineering fellowships.
      </p>

      {/* ── DIRECT ACTION PILL CLUSTER ── */}
      <div className="flex items-center gap-2.5 mb-8">
        <a
          href="#mobile-divisions-section"
          className="flex-1 py-3 px-4 rounded-xl bg-[var(--accent-primary)] text-white font-body font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md shadow-violet-500/20"
        >
          <span>Explore Portals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        <a
          href="https://wa.me/919999999999?text=Hello%20NayakLabs%20Team"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)] font-body font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* ── HORIZONTAL TOUCH SNAP DECK ── */}
      <div id="mobile-divisions-section" className="w-full mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            Division Portals ({DIVISIONS.length})
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            Swipe to browse →
          </span>
        </div>

        <div
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 scrollbar-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {DIVISIONS.map((div, idx) => (
            <Link
              key={div.id}
              to={div.route}
              className="snap-center shrink-0 w-[82vw] p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between relative overflow-hidden active:scale-98 transition-transform shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/10">
                    {getDivisionIcon(div.letter)}
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-base)] border border-[var(--border-base)] text-violet-400 font-semibold">
                    {div.code}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
                  {div.title}
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {div.description}
                </p>

                {/* Quick tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {div.tags.slice(0, 3).map((t) => (
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
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Dynamic Active Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {DIVISIONS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === i ? 'w-6 bg-violet-500' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
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
