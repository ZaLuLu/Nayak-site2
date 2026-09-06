import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, Cpu, GraduationCap, CheckCircle2, Sparkles } from 'lucide-react'

export function MobilePillarStack() {
  return (
    <div className="w-full px-4 py-12 flex flex-col gap-16 border-t border-[var(--border-base)]">
      {/* ── PILLAR 01: PRODUCTS (P) ── */}
      <section id="products" className="scroll-mt-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
            01 · Products (P)
          </span>
        </div>

        <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-2">
          In-House Platforms & Runtimes
        </h2>
        <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
          Autonomous developer tools, visual memory analyzers, and 3D indexing toolkits tested in production.
        </p>

        {/* Product Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] shadow-xs mb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                DI Notes Visualizer
              </h3>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-violet-400">
              v2.5 stable
            </span>
          </div>

          <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
            Real-time memory allocation, pointer swaps, recursion trees, and call stack visualizer. Step forward, inspect runtime variables, and duel algorithms in real time.
          </p>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--text-muted)]">Zero Setup Required</span>
            <Link
              to="/products"
              className="py-1.5 px-3 rounded-lg bg-violet-600 text-white font-mono text-xs font-semibold inline-flex items-center gap-1 active:scale-95 transition-transform"
            >
              <span>Launch</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PILLAR 02: SERVICES (S) ── */}
      <section id="services" className="scroll-mt-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
            02 · Services (S)
          </span>
        </div>

        <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-2">
          Bespoke Cloud & Applied AI
        </h2>
        <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
          Custom microservices, distributed architectures, and applied AI systems delivered with zero middlemen.
        </p>

        {/* Services Capability Highlights */}
        <div className="grid grid-cols-1 gap-2.5 mb-3">
          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-start gap-3">
            <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                Autonomous AI Runtimes
              </div>
              <div className="font-body text-xs text-[var(--text-secondary)] mt-0.5">
                Local-first inference pipelines and streaming state machines.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-start gap-3">
            <Globe className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                Global Edge Microservices
              </div>
              <div className="font-body text-xs text-[var(--text-secondary)] mt-0.5">
                Sub-100ms multi-region clusters with automatic geo-routing.
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/services"
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-indigo-400 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <span>View All Engineering Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── PILLAR 03: ACADEMICS (A) ── */}
      <section id="academics" className="scroll-mt-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-semibold">
            03 · Academics (A)
          </span>
        </div>

        <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-2">
          Engineering Fellowship
        </h2>
        <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
          6-week intensive systems fellowship with direct 1-on-1 architecture mentorship. Strictly 12 seats.
        </p>

        {/* Academic Details Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] mb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                Next Cohort: Autumn 2026
              </span>
            </div>
            <span className="font-mono text-[10px] text-sky-400 font-bold">12 Seats Max</span>
          </div>

          <ul className="space-y-2 mb-4 font-body text-xs text-[var(--text-secondary)]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Distributed Systems & Raft Consensus</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Custom Memory Allocators & WebAssembly</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Direct Architect Code Reviews</span>
            </li>
          </ul>

          <Link
            to="/academics"
            className="w-full py-2.5 px-4 rounded-xl bg-sky-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <span>Apply For Fellowship</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
