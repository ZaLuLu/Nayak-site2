import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Terminal, Globe, Cpu, Sparkles, ArrowRight, GitBranch, ExternalLink, Play, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { GlobalCanvasBackground } from '../components/ui/GlobalCanvasBackground'
import { Footer } from '../components/Footer'
import { ScrollReveal } from '../components/ScrollReveal'
import { TierNavbarDispatcher } from '../components/tiers/TierDispatcher'
import { DiNotesPreview, EventMeshPreview, AgentRuntimePreview } from '../components/products/ProductPreviews'

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
    title: 'DI Notes Sorting Visualizer',
    tagline: 'Interactive Runtime Memory & Sorting Algorithm Engine',
    category: 'Developer Tooling',
    version: 'v2.5 Stable',
    description: 'A visual execution engine for data structures and sorting algorithms. Step forward, inspect runtime comparisons and pointer swaps, and duel QuickSort, MergeSort, and HeapSort in real time.',
    features: [
      'Interactive QuickSort, MergeSort & HeapSort step-by-step array tracers.',
      'Real-time comparison pointers and swap telemetry with O(n log n) analysis.',
      'Zero-latency browser runtime powered by WebAssembly execution engine.',
      'Custom snippet editor with instant AST trace and complexity duel mode.',
    ],
    metrics: [
      { label: 'Developers', value: '4,200+' },
      { label: 'Latency', value: '< 2ms' },
      { label: 'License', value: 'MIT Open' },
    ],
    tags: ['#SortingAlgorithms', '#QuickSort', '#WebAssembly', '#MemoryTrace'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    demoActionText: 'Interactive Sandbox',
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
      { label: 'Throughput', value: '120k/s' },
      { label: 'Edge Nodes', value: '35 Nodes' },
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
      { label: 'Fallback', value: '< 80ms' },
      { label: 'Accuracy', value: '99.98%' },
      { label: 'Runtime', value: 'Py / Node' },
    ],
    tags: ['#AgenticAI', '#LangGraph', '#StructuredOutputs', '#RAG'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    demoActionText: 'Inspect State Graphs',
    accentColor: 'var(--accent-primary)',
  },
]

export default function ProductsPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const renderProductPreview = (id: string) => {
    switch (id) {
      case 'di-notes':
        return <DiNotesPreview />
      case 'event-mesh':
        return <EventMeshPreview />
      case 'agent-runtime':
        return <AgentRuntimePreview />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <GrainOverlay />
      <GlobalCanvasBackground />

      {/* Multi-Tier Responsive Navbar */}
      <TierNavbarDispatcher />

      {/* Main Container */}
      <main className="pt-20 sm:pt-28 pb-32 sm:pb-40 px-4 sm:px-8 md:px-12 max-w-[1280px] mx-auto relative z-10">
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
        <div className="space-y-12 sm:space-y-16">
          {PRODUCTS.map((prod) => (
            <section
              key={prod.id}
              className="card-tactile group relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] transition-all duration-300 shadow-xl shadow-black/5"
            >
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24 group-hover:bg-[var(--accent-primary)]/10 transition-all duration-500" />

              <div className="flex flex-col gap-6">
                {/* Top Row: Title, Category Badges & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border-base)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/20">
                        {prod.code} · {prod.category}
                      </span>
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-base)]">
                        {prod.version}
                      </span>
                    </div>

                    <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">
                      {prod.title}
                    </h2>
                    <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold mt-1">
                      {prod.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <a
                      href={prod.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3.5 rounded-xl font-mono text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-base)] hover:border-[var(--border-hover)] inline-flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                    </a>
                  </div>
                </div>

                {/* Middle Row: Description & Live Interactive Preview Component */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Description & Checklist (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                        {prod.description}
                      </p>

                      {/* Features Checklist */}
                      <div className="space-y-2 mb-5">
                        {prod.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 font-body text-xs text-[var(--text-primary)]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[10px]">
                        {prod.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border-base)]">
                      {prod.metrics.map((m) => (
                        <div key={m.label} className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-center">
                          <div className="font-mono text-[8.5px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5 truncate">
                            {m.label}
                          </div>
                          <div className="font-display font-black text-sm text-[var(--text-primary)]">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Preview Sandbox (7 cols) */}
                  <div className="lg:col-span-7">
                    {renderProductPreview(prod.id)}
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

      <Footer />
    </div>
  )
}
