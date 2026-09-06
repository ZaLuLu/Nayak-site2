import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react'

export function TabletPillarStack() {
  return (
    <div className="w-full px-8 py-16 flex flex-col gap-20 border-t border-[var(--border-base)]">
      {/* ── PILLAR 01: PRODUCTS (P) ── */}
      <section id="products" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
            01 · Products (P) · In-House Runtimes
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">100% Free & Open Source</span>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="font-display font-black text-3xl text-[var(--text-primary)] leading-tight mb-3">
              What we build when no one’s watching.
            </h2>
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              We engineer autonomous runtime telemetry, visual developer sandboxes, and memory tracing toolkits used by technical teams worldwide.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-mono text-xs text-violet-400 font-semibold hover:underline"
            >
              <span>Explore full product ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Dossier Card */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    DI Notes Visualizer
                  </h3>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-md bg-[var(--bg-base)] border border-[var(--border-base)] text-violet-400 font-semibold">
                  v2.5 stable
                </span>
              </div>

              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Real-time memory allocation, pointer swaps, recursion trees, and call stack visualizer. Step forward, inspect runtime variables, and duel algorithms in real time.
              </p>

              <div className="flex flex-wrap gap-2 mb-4 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">#AlgorithmTrace</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">#MemoryState</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">#InteractiveDuel</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--text-muted)]">Interactive Workbench</span>
              <Link
                to="/products"
                className="py-1.5 px-3 rounded-lg bg-violet-600 text-white font-mono text-xs font-semibold inline-flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>Launch Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLAR 02: SERVICES (S) ── */}
      <section id="services" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
            02 · Services (S) · Custom Engineering
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">Enterprise Architecture</span>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="font-display font-black text-3xl text-[var(--text-primary)] leading-tight mb-3">
              Software built to survive production.
            </h2>
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              We partner directly with high-growth technical founders to build resilient distributed infrastructure, local AI runtimes, and low-latency cloud systems.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 font-semibold hover:underline"
            >
              <span>View architectural capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-start gap-3">
              <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  Autonomous AI Runtimes
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] mt-1">
                  Local-first LLM inference pipelines, vector embeddings, and streaming agent loops.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-start gap-3">
              <Globe className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  Global Distributed Cloud Systems
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)] mt-1">
                  Sub-100ms multi-region clusters, event streaming architectures, and high-throughput databases.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLAR 03: ACADEMICS (A) ── */}
      <section id="academics" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-semibold">
            03 · Academics (A) · Engineering Fellowship
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">Strictly 12 Seats</span>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="font-display font-black text-3xl text-[var(--text-primary)] leading-tight mb-3">
              Where engineers become systems architects.
            </h2>
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              A 6-week intensive engineering fellowship combining deep systems programming, distributed protocols, and direct 1-on-1 code reviews.
            </p>
            <Link
              to="/academics"
              className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 font-semibold hover:underline"
            >
              <span>View curriculum & cohort timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-sky-400" />
                  <span className="font-display font-bold text-base text-[var(--text-primary)]">
                    Next Cohort: Autumn 2026
                  </span>
                </div>
                <span className="font-mono text-[11px] text-sky-400 font-bold">12 Seats Max</span>
              </div>

              <ul className="space-y-2.5 mb-4 font-body text-xs text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Distributed Systems & Raft Consensus</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Custom Memory Allocators & WebAssembly</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Direct 1-on-1 Architect Code Reviews</span>
                </li>
              </ul>
            </div>

            <Link
              to="/academics"
              className="w-full py-2.5 px-4 rounded-xl bg-sky-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <span>Apply For Fellowship</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
