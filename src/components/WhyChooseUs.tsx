import React, { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, GitCommit, FileCode, Clock } from 'lucide-react'
import { BorderBeam } from './ui/BorderBeam'

interface MilestoneStep {
  id: string
  num: string
  title: string
  timeline: string
  badge: string
  desc: string
  deliverables: string[]
  icon: React.ElementType
}

const STEPS: MilestoneStep[] = [
  {
    id: 'discovery',
    num: '01',
    title: 'Discovery & Scoping',
    timeline: 'Week 0',
    badge: 'Planning',
    desc: 'We start with scoping calls to understand your product goals, data models, and user workflows. We establish clear deliverables, timeline milestones, and fixed pricing.',
    deliverables: ['Detailed Project Scope', 'Data Model & Architecture Plan', 'Mutual IP & Non-Disclosure Agreement'],
    icon: FileCode,
  },
  {
    id: 'prototype',
    num: '02',
    title: 'Clickable Prototype',
    timeline: 'Week 1',
    badge: 'Design & UX',
    desc: 'We deploy an interactive prototype to a private staging URL. You can click through real screens, test interactions, and give feedback before backend logic is finalized.',
    deliverables: ['Private Staging URL', 'Interactive User Flow Review', 'Design System & Component Library'],
    icon: Zap,
  },
  {
    id: 'build',
    num: '03',
    title: 'Core Development & Testing',
    timeline: 'Weeks 2–5',
    badge: 'Engineering',
    desc: 'We write clean, production-ready code with continuous deployments. We integrate authentication, databases, third-party APIs, and automated test suites.',
    deliverables: ['Full-Stack Production Application', 'Automated Test Suites', 'Weekly Working Demos & Slack Updates'],
    icon: GitCommit,
  },
  {
    id: 'transfer',
    num: '04',
    title: 'Complete Handover & IP Ownership',
    timeline: 'Launch Week',
    badge: 'Ownership',
    desc: 'We transfer full repository access, cloud infrastructure, and environment variables directly to your organization. You own 100% of the code with zero lock-in.',
    deliverables: ['Full Git Repository Ownership', 'Cloud Deployment & Environment Transfer', 'Clean Documentation & Runbooks'],
    icon: ShieldCheck,
  },
  {
    id: 'warranty',
    num: '05',
    title: 'Launch Support & Warranty',
    timeline: 'Post-Launch',
    badge: 'Support',
    desc: 'We stand behind everything we build. We provide 30 days of active post-launch support, monitoring, and fast bug triage so your public launch runs smoothly.',
    deliverables: ['30-Day Post-Launch Warranty', 'Error Monitoring & Health Checks', 'Team Onboarding Walkthrough'],
    icon: Clock,
  },
]

export function WhyChooseUs() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const activeStep = STEPS[activeStepIndex]
  const IconComponent = activeStep.icon

  return (
    <section
      id="why-us"
      className="py-14 md:py-18 flex flex-col justify-center relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[var(--border-base)] before:to-transparent scroll-mt-20"
      aria-labelledby="why-headline"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-6 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow label="How We Build" />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.08}>
          <div className="max-w-3xl mb-8">
            <h2
              id="why-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-3"
            >
              From idea to production in five clear steps.
            </h2>
            <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
              Every deliverable is tested and reviewed before moving to the next phase. Click below to explore our delivery process.
            </p>
          </div>
        </ScrollReveal>


        {/* Linear Stepper Navigation Bar (3D Tactile Switches) */}
        <ScrollReveal delay={0.12}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-2 rounded-2xl bg-[var(--bg-surface-inset)] mb-8 border border-[var(--border-base)] shadow-sm">
            {STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepIndex(idx)
                  }}
                  className={`py-3.5 px-3.5 rounded-xl font-mono text-xs transition-all duration-200 flex flex-col items-start gap-1 cursor-pointer text-left ${isActive
                      ? 'bg-[var(--bg-surface-elevated)] border border-[var(--accent-primary)]/60 text-[var(--text-primary)] shadow-md translate-y-[-2px] shadow-[0_0_15px_var(--accent-glow)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] hover:-translate-y-0.5'
                    }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-bold ${isActive ? 'text-[var(--accent-primary)]' : ''}`}>
                      {step.num}
                    </span>
                    <span className="text-[10px] uppercase opacity-70">
                      {step.timeline.split(' ')[0]}
                    </span>
                  </div>
                  <span className="font-display font-semibold text-xs truncate w-full">
                    {step.title.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Interactive Active Milestone Panel */}
        <ScrollReveal delay={0.16} variant="blur-focus">
          <div className="card-tactile drafting-card p-6 sm:p-10 relative overflow-hidden group">
            <BorderBeam size={280} duration={14} colorFrom="var(--accent-primary)" colorTo="var(--accent-secondary)" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Column: Stage Detail */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-body text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface-elevated)] text-[var(--accent-primary)] font-bold shadow-xs">
                    Stage {activeStep.num} · {activeStep.badge}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {activeStep.timeline}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-4">
                  {activeStep.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  {activeStep.desc}
                </p>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-base)]">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i <= activeStepIndex
                          ? 'w-8 bg-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-primary)]'
                          : 'w-2 bg-[var(--border-base)]'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Verified Deliverables Checklist (3D Glass Inset) */}
              <div className="lg:col-span-5 p-6 rounded-2xl card-inset-well shadow-lg">
                <div className="font-body text-xs text-[var(--text-muted)] font-semibold mb-4 uppercase tracking-wider">
                  Verified Deliverables
                </div>
                <div className="space-y-3.5">
                  {activeStep.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                      <span className="font-body font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {activeStepIndex === STEPS.length - 1 ? 'Pipeline complete' : `Next: Stage ${STEPS[activeStepIndex + 1]?.num}`}
                  </span>
                  <button
                    onClick={() => {
                      setActiveStepIndex((prev) => (prev + 1) % STEPS.length)
                    }}
                    className="btn-primary py-1.5 px-4 text-xs font-mono font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{activeStepIndex === STEPS.length - 1 ? 'Restart' : 'Next stage'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
