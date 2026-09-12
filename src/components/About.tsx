import React from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { ArrowRight, Terminal, ShieldCheck, Layers, GitBranch, Server, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BorderBeam } from './ui/BorderBeam'

const STACK_BADGES = [
  { name: 'TypeScript', category: 'Language' },
  { name: 'Next.js & React', category: 'Frontend' },
  { name: 'FastAPI & Python', category: 'Backend' },
  { name: 'PostgreSQL & Redis', category: 'Data' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Cloudflare / AWS', category: 'Infra' },
]

export function About() {
  return (
    <section
      id="about"
      className="py-14 md:py-20 flex flex-col justify-center px-6 md:px-10 max-w-[1240px] mx-auto relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[var(--border-base)] before:to-transparent transition-colors duration-300"
      aria-labelledby="about-headline"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-6 gap-3">
        <ScrollReveal delay={0}>
          <SectionEyebrow label="Engineering Philosophy" />
        </ScrollReveal>
      </div>

      <div className="max-w-4xl mb-10">
        <ScrollReveal delay={0.05}>
          <h2
            id="about-headline"
            className="text-section-h md:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.18] mb-4"
          >
            Senior engineering pods that design, build, and ship production software alongside founders.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 font-normal">
            No middle managers or abstract slide decks. We write database schemas, build interactive interfaces, and deploy scalable systems directly to your cloud infrastructure.
          </p>
        </ScrollReveal>

        {/* 3 Core Ethos Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          <ScrollReveal delay={0.16}>
            <div className="p-5 rounded-2xl card-tactile drafting-card flex flex-col justify-between h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
              <div>
                <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] w-fit mb-3.5">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="font-display text-sm font-bold text-[var(--text-primary)] mb-1.5">
                  Working Code First
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  Interactive staging builds deployed from week one so you can test real workflows.
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.20}>
            <div className="p-5 rounded-2xl card-tactile drafting-card flex flex-col justify-between h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
              <div>
                <div className="p-2.5 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] w-fit mb-3.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-display text-sm font-bold text-[var(--text-primary)] mb-1.5">
                  100% IP & Code Ownership
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  Full control of repositories, databases, environment secrets, and documentation.
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="p-5 rounded-2xl card-tactile drafting-card flex flex-col justify-between h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
              <div>
                <div className="p-2.5 rounded-xl bg-[var(--accent-tertiary)]/10 text-[var(--accent-tertiary)] w-fit mb-3.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="font-display text-sm font-bold text-[var(--text-primary)] mb-1.5">
                  Direct Builder Access
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  Direct communication with the engineers architecting and maintaining your codebase.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Production Stack & Capabilities Banner */}
      <ScrollReveal delay={0.28}>
        <div className="card-tactile drafting-card p-6 sm:p-8 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-colors duration-300">
          <BorderBeam size={260} duration={14} colorFrom="var(--accent-primary)" colorTo="var(--accent-secondary)" />

          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
              <Server className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Production Core Stack</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {STACK_BADGES.map((badge, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-base)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10 w-full lg:w-auto">
            <Link
              to="/services"
              className="btn-tactile py-2.5 px-5 text-xs font-body font-semibold inline-flex items-center justify-center gap-2"
            >
              <span>Explore services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default About
