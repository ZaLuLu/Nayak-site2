import React from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BorderBeam } from './ui/BorderBeam'

export function About() {
  return (
    <section
      id="about"
      className="py-14 md:py-18 flex flex-col justify-center px-6 md:px-10 max-w-[1240px] mx-auto relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[var(--border-base)] before:to-transparent transition-colors duration-300"
      aria-labelledby="about-headline"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-6 gap-3">
        <ScrollReveal delay={0}>
          <SectionEyebrow index="05" label="Studio manifesto · Engineering ethos" />
        </ScrollReveal>
      </div>

      <div className="max-w-4xl mb-8">
        <ScrollReveal delay={0.05}>
          <h2
            id="about-headline"
            className="text-section-h md:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.2] mb-4"
          >
            We believe modern software engineering is held back by bloated agency retainers, fragmented contractors, and endless slide decks.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-6 font-normal">
            We build alongside technical founders to architect, benchmark, and ship production systems—zero agency bloat, zero intermediaries, pure engineering output.
          </p>
        </ScrollReveal>

        {/* 3 Core Ethos Pillars (3D Tactile Glass Tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 pt-4 mb-8">
          <ScrollReveal delay={0.16}>
            <div className="p-5 rounded-2xl glass-panel drafting-card specular-border flex items-start gap-3.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
              <div className="p-2 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                  Working Code First
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  Working software over slide decks. Verified benchmarks over roadmaps.
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.20}>
            <div className="p-5 rounded-2xl glass-panel drafting-card specular-border flex items-start gap-3.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
              <div className="p-2 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                  100% IP Ownership
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  Complete repository, cloud infrastructure, and architectural ownership.
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="p-5 rounded-2xl glass-panel drafting-card specular-border flex items-start gap-3.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
              <div className="p-2 rounded-xl bg-[var(--accent-tertiary)]/10 text-[var(--accent-tertiary)] shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                  Direct Founder Access
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  Direct architect-to-builder collaboration with no account managers.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={0.28}>
        <div
          className="card-tactile drafting-card p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-colors duration-300"
        >
          <BorderBeam size={240} duration={14} colorFrom="var(--accent-primary)" colorTo="var(--accent-secondary)" />

          {/* Corner Drafting Marks */}
          <div className="pointer-events-none absolute inset-2.5 z-20 opacity-40 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true">
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[var(--border-hover)]" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[var(--border-hover)]" />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[var(--border-hover)]" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[var(--border-hover)]" />
          </div>

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 font-body text-xs text-[var(--accent-primary)] mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio conviction</span>
            </div>
            <blockquote className="font-display font-medium text-xl sm:text-2xl text-[var(--text-primary)] leading-snug">
              "Great engineering does not need to justify itself with hype. It proves itself the moment you test the software."
            </blockquote>
          </div>

          <Link
            to="/services"
            className="btn-tactile py-3 px-6 text-xs font-body font-semibold inline-flex items-center gap-2 shrink-0 relative z-10"
          >
            <span>Explore services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default About
