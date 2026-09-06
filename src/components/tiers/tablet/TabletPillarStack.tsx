import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, Cpu, GraduationCap, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react'
import { DiNotesPreview, EventMeshPreview } from '../../products/ProductPreviews'
import { ambientAudio } from '../../../utils/audioEngine'

export function TabletPillarStack() {
  return (
    <div className="w-full px-6 sm:px-8 py-8 flex flex-col gap-10 border-t border-[var(--border-base)] select-none">
      {/* ── PILLAR 01: PRODUCTS (P) ── */}
      <section id="products" className="scroll-mt-16">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold">
            01 · Products (P) · In-House Tooling
          </span>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">100% Free & Open Source</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] leading-tight mb-2">
                What we build when no one’s watching.
              </h2>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                Autonomous runtime telemetry, live algorithm visualizers, and memory tracing toolkits engineered for high-performance developer workflows.
              </p>

              <div className="space-y-1.5 mb-4 font-body text-xs text-[var(--text-primary)]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Interactive QuickSort, MergeSort & HeapSort step-by-step array tracers.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero-latency browser runtime powered by WebAssembly execution engine.</span>
                </div>
              </div>
            </div>

            <Link
              to="/products"
              onClick={() => ambientAudio.playTick()}
              className="py-2 px-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-md w-fit"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Column: Live Interactive Sorting Visualizer */}
          <div className="lg:col-span-7">
            <DiNotesPreview />
          </div>
        </div>
      </section>

      {/* ── PILLAR 02: SERVICES (S) ── */}
      <section id="services" className="scroll-mt-16">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
            02 · Services (S) · Custom Engineering
          </span>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">Guaranteed 4h SLA</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] leading-tight mb-2">
                Software built to survive production.
              </h2>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                Direct partnership with technical founders to engineer resilient distributed infrastructure, agentic AI loops, and sub-15ms edge pipelines.
              </p>

              <div className="space-y-1.5 mb-4 font-body text-xs text-[var(--text-primary)]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>LangGraph cyclic error recovery and vector retrieval architecture.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>High-throughput task queues handling 5,000+ jobs/sec with BullMQ.</span>
                </div>
              </div>
            </div>

            <Link
              to="/services"
              onClick={() => ambientAudio.playTick()}
              className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-md w-fit"
            >
              <span>Consult on Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Column: Live Interactive EventMesh Radar */}
          <div className="lg:col-span-7">
            <EventMeshPreview />
          </div>
        </div>
      </section>

      {/* ── PILLAR 03: ACADEMICS (A) ── */}
      <section id="academics" className="scroll-mt-16">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold">
            03 · Academics (A) · Engineering Fellowship
          </span>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">Cohort 04 Enrolling</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] leading-tight mb-2">
                Where engineers become systems architects.
              </h2>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                An elite 6-week intensive engineering fellowship combining deep systems programming, distributed protocols, and direct 1-on-1 code reviews. Strictly 12 seats.
              </p>

              <div className="space-y-1.5 mb-4 font-body text-xs text-[var(--text-primary)]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strictly 12 seats allocated per cohort on rolling technical review.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Production AI platform deployed live by Week 6.</span>
                </div>
              </div>
            </div>

            <Link
              to="/academics"
              onClick={() => ambientAudio.playTick()}
              className="py-2 px-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-md w-fit"
            >
              <span>Apply For Fellowship</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Column: 6-Week Fellowship Curriculum Blueprint Preview */}
          <div className="lg:col-span-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] overflow-hidden shadow-lg">
            <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold">Curriculum Blueprint Matrix</span>
              </div>
              <span className="font-mono text-[9.5px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-bold">
                Autumn 2026
              </span>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] text-sky-400 font-bold uppercase block">Weeks 01–02</span>
                  <span className="font-display font-bold text-xs text-[var(--text-primary)]">TypeScript Systems & Distributed Queues</span>
                </div>
                <span className="font-mono text-[9.5px] text-[var(--text-muted)] font-semibold">5k evt/s Engine</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] text-violet-400 font-bold uppercase block">Weeks 03–04</span>
                  <span className="font-display font-bold text-xs text-[var(--text-primary)]">Agentic AI & Kinetic WebGL Interfaces</span>
                </div>
                <span className="font-mono text-[9.5px] text-[var(--text-muted)] font-semibold">Qdrant Graph Agent</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase block">Weeks 05–06</span>
                  <span className="font-display font-bold text-xs text-[var(--text-primary)]">Cloud Infra & Final Engineering Defense</span>
                </div>
                <span className="font-mono text-[9.5px] text-emerald-400 font-bold">Live Shipped</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
