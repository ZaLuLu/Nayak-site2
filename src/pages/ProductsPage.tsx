import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Terminal, Globe, Cpu, Sparkles, ArrowRight, GitBranch, ExternalLink, Play, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { GlobalCanvasBackground } from '../components/ui/GlobalCanvasBackground'
import { Footer } from '../components/Footer'
import { ScrollReveal } from '../components/ScrollReveal'
import { TierNavbarDispatcher } from '../components/tiers/TierDispatcher'

interface ProductItem {
  id: string
  code: string
  title: string
  tagline: string
  category: string
  version: string
  description: string
  features: string[]
  metrics: { label: string; value: string }[]
  tags: string[]
  githubUrl: string
  demoActionText: string
  accentColor: string
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'di-notes',
    code: '01',
    title: 'DI Notes Visualizer',
    tagline: 'Interactive Runtime Memory & Algorithm Visualizer',
    category: 'Developer Tooling',
    version: 'v2.5 Stable',
    description: 'A visual execution engine for data structures and algorithms. Step forward and backward through memory allocations, pointer mutations, recursion call stacks, and graph traversals in real time.',
    features: [
      'Zero-latency browser runtime with WebAssembly execution engine.',
      'Side-by-side call stack, heap memory, and pointer reference graph.',
      'Algorithm duel mode to compare time and space complexity live.',
      'Custom JavaScript/TypeScript snippet editor with instant AST trace.',
    ],
    metrics: [
      { label: 'Active Developers', value: '4,200+' },
      { label: 'Execution Speed', value: '< 2ms' },
      { label: 'License', value: 'MIT Open Source' },
    ],
    tags: ['#WebAssembly', '#TypeScript', '#ASTParser', '#MemoryTrace'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    demoActionText: 'Launch Visualizer',
    accentColor: 'var(--accent-primary)',
  },
  {
    id: 'event-mesh',
    code: '02',
    title: 'EventMesh Telemetry Radar',
    tagline: 'Global Event Distribution & Microservice Latency Tracker',
    category: 'Distributed Systems',
    version: 'v3.0 Core',
    description: 'High-throughput event streaming telemetry monitor. Visualize WebSocket message queues, Kafka topic lag, and multi-region edge node latency with sub-millisecond precision.',
    features: [
      'Multi-region edge network tracker across 35+ global points of presence.',
      'Live WebSocket streaming with automated backpressure detection.',
      'Zero-overhead OpenTelemetry instrumentation client for Node & Go.',
      'Instant alert triggers for tail-latency anomalies and queue backlogs.',
    ],
    metrics: [
      { label: 'Throughput', value: '120k evt/s' },
      { label: 'Global Points', value: '35 Nodes' },
      { label: 'Avg Latency', value: '< 14ms' },
    ],
    tags: ['#DistributedSystems', '#Kafka', '#OpenTelemetry', '#EdgeCDN'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    demoActionText: 'View Telemetry Radar',
    accentColor: 'var(--accent-secondary)',
  },
  {
    id: 'agent-runtime',
    code: '03',
    title: 'AgentRuntime OS',
    tagline: 'Deterministic State-Graph Supervisor for AI Agents',
    category: 'Applied AI Infrastructure',
    version: 'v1.4 Beta',
    description: 'Production execution runtime for autonomous LLM agent graphs. Provides deterministic cyclic routing, persistent checkpoint memory, structured output schemas, and automated jailbreak filters.',
    features: [
      'Cyclic graph execution engine with human-in-the-loop validation checkpoints.',
      'Hybrid semantic vector retrieval with reranking (Qdrant, pgvector).',
      'Deterministic Pydantic schema validation for external tool calls.',
      'Automated session rollback and self-healing error recovery buffers.',
    ],
    metrics: [
      { label: 'Model Fallback', value: '< 80ms' },
      { label: 'Schema Accuracy', value: '99.98%' },
      { label: 'Runtime', value: 'Python / Node' },
    ],
    tags: ['#AgenticAI', '#LangGraph', '#StructuredOutputs', '#RAG'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    demoActionText: 'Inspect Agent Graphs',
    accentColor: 'var(--accent-primary)',
  },
]

export default function ProductsPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <GrainOverlay />
      <GlobalCanvasBackground />

      {/* Multi-Tier Responsive Navbar */}
      <TierNavbarDispatcher />

      {/* Main Container */}
      <main className="pt-20 sm:pt-28 pb-24 px-4 sm:px-8 md:px-12 max-w-[1280px] mx-auto relative z-10">
        {/* ── HEADER BANNER ── */}
        <ScrollReveal variant="blur-focus">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] backdrop-blur-md mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
                In-House Platforms & Runtimes
              </span>
            </div>

            <h1 className="font-display font-black text-[clamp(2.4rem,6vw,4rem)] leading-[1.05] tracking-tight text-[var(--text-primary)] mb-4">
              What we build when no one’s watching<span className="text-[var(--accent-primary)]">.</span>
            </h1>

            <p className="font-body text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              We don’t just write client code. We engineer autonomous runtime telemetry, visual developer tools, and distributed AI infrastructure used by technical teams worldwide. 100% free and open source.
            </p>
          </div>
        </ScrollReveal>

        {/* ── FABULOUS PRODUCT SHOWCASE CARDS ── */}
        <div className="space-y-10 sm:space-y-12">
          {PRODUCTS.map((prod) => (
            <section
              key={prod.id}
              className="card-tactile group relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] transition-all duration-300 shadow-lg shadow-black/5"
            >
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-[var(--accent-primary)]/10 transition-all duration-500" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Product Information (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Row Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/20">
                        {prod.code} · {prod.category}
                      </span>
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-base)]">
                        {prod.version}
                      </span>
                    </div>

                    <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] mb-2">
                      {prod.title}
                    </h2>
                    <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold mb-4">
                      {prod.tagline}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                      {prod.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="space-y-2.5 mb-6">
                      {prod.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 font-body text-xs sm:text-sm text-[var(--text-primary)]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10.5px]">
                      {prod.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button Cluster */}
                  <div className="pt-4 border-t border-[var(--border-base)] flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveDemo(prod.id)}
                      className="py-2.5 px-5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-b from-violet-500 to-violet-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_14px_rgba(124,58,237,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_6px_18px_rgba(124,58,237,0.5)] active:translate-y-0.5 inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{prod.demoActionText}</span>
                    </button>

                    <a
                      href={prod.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl font-mono text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-base)] hover:border-[var(--border-hover)] inline-flex items-center gap-2 transition-all"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>GitHub Source</span>
                      <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Live Telemetry & Metric Panel (5 cols) */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[var(--bg-surface)]/80 border border-[var(--border-base)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-base)]">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent-primary)] font-bold">
                        Live Architecture Specs
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 mb-4">
                      {prod.metrics.map((m) => (
                        <div key={m.label} className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)]">
                          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                            {m.label}
                          </div>
                          <div className="font-display font-black text-xl text-[var(--text-primary)]">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/15 font-mono text-[11px] text-[var(--accent-primary)] flex items-center justify-between">
                    <span>Automated CI/CD Verified</span>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[var(--accent-primary)] font-bold hover:underline"
          >
            <span>Looking for bespoke custom engineering? Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Interactive Sandbox Demo Modal */}
      {activeDemo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveDemo(null)}
        >
          <div
            className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-base)] shadow-2xl relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-base)]">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[var(--accent-primary)]" />
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  Sandbox Active Runtime
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDemo(null)}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-white/5"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-base)] font-mono text-xs text-emerald-400 mb-6 space-y-1.5">
              <div>&gt; Initializing WebAssembly memory buffer [256MB allocated]... OK</div>
              <div>&gt; Loading AST call stack parser v2.5... OK</div>
              <div>&gt; Realtime tracer listening on port 5173... Connected.</div>
              <div className="text-[var(--text-muted)]">&gt; Ready for custom JavaScript/TypeScript AST inspection.</div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveDemo(null)}
                className="py-2 px-4 rounded-xl font-mono text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-surface)] border border-[var(--border-base)]"
              >
                Close Preview
              </button>
              <a
                href="https://github.com/ZaLuLu/nayaklabs-site"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-xl font-mono text-xs font-bold text-white bg-violet-600 inline-flex items-center gap-1.5"
              >
                <span>View Full Source on GitHub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
