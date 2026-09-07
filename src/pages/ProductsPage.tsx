import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, GitBranch, ExternalLink, CheckCircle2, Terminal, Globe } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { GlobalCanvasBackground } from '../components/ui/GlobalCanvasBackground'
import { Footer } from '../components/Footer'
import { ScrollReveal } from '../components/ScrollReveal'
import { TierNavbarDispatcher } from '../components/tiers/TierDispatcher'
import { DiNotesVisualizer } from '../components/products/DiNotesVisualizer'
import { EventMeshRadar } from '../components/products/EventMeshRadar'

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
      'Interactive QuickSort, MergeSort & Binary Search step-by-step array tracers.',
      'Real-time comparison pointers and swap telemetry with O(N log N) analysis.',
      'Zero-latency browser runtime with dynamic speed controls and code tracing.',
      'Speed benchmark duel mode comparing algorithms on randomized memory states.',
    ],
    metrics: [
      { label: 'Developers', value: '4,200+' },
      { label: 'Latency', value: '< 2ms' },
      { label: 'License', value: 'MIT Open' },
    ],
    tags: ['#SortingAlgorithms', '#QuickSort', '#BinarySearch', '#MemoryTrace'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    accentColor: 'var(--accent-primary)',
  },
  {
    id: 'event-mesh',
    code: '02',
    title: 'EventMesh 3D Radar',
    tagline: 'Global Event Distribution & Microservice Latency Tracker',
    category: 'Distributed Systems & AI',
    version: 'v3.0 Core',
    description: 'Interactive rotatable 3D WebGL globe telemetry monitor. Track developer summits, AI hackathons, and archive benchmarks across major tech hubs worldwide with real-time city targeting.',
    features: [
      'Interactive 3D Cobe WebGL globe with smooth touch/mouse rotation and zoom.',
      'Dynamic city pinpoint targeting with automatic camera lock and orientation.',
      'Category-based filtering across Hackathons, AI Summits, and Workshops.',
      'Live attendee counters, architectural track tags, and telemetry pass access.',
    ],
    metrics: [
      { label: 'Active Hubs', value: '7 Major Hubs' },
      { label: 'Attendees', value: '7,000+' },
      { label: 'Avg Latency', value: '< 14ms' },
    ],
    tags: ['#3DGlobe', '#WebGL', '#AISummits', '#EdgeTelemetry'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    accentColor: 'var(--accent-secondary)',
  },
]

export default function ProductsPage() {
  const [mobileActiveProduct, setMobileActiveProduct] = useState<'di-notes' | 'event-mesh'>('di-notes')

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <GrainOverlay />
      <GlobalCanvasBackground />

      {/* Multi-Tier Responsive Navbar */}
      <TierNavbarDispatcher />

      {/* Main Container */}
      <main className="pt-20 sm:pt-28 pb-24 sm:pb-40 px-4 sm:px-8 md:px-12 max-w-[1360px] mx-auto relative z-10">
        {/* ── HEADER BANNER ── */}
        <ScrollReveal variant="blur-focus">
          <div className="max-w-3xl mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] backdrop-blur-md mb-3 sm:mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
                In-House Platforms & Interactive Runtimes
              </span>
            </div>

            <h1 className="font-display font-black text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-tight text-[var(--text-primary)] mb-3 sm:mb-4">
              What we build when no one’s watching<span className="text-[var(--accent-primary)]">.</span>
            </h1>

            <p className="font-body text-xs sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              We don’t just write client code. We engineer visual developer sandboxes, interactive algorithm tracers, and 3D telemetry tools used by technical teams worldwide. 100% free and open source.
            </p>
          </div>
        </ScrollReveal>

        {/* ── MOBILE-ONLY PRODUCT SEGMENTED SWITCHER ── */}
        <div className="block md:hidden mb-6">
          <div className="flex p-1.5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-base)] shadow-md">
            <button
              type="button"
              onClick={() => setMobileActiveProduct('di-notes')}
              className={`flex-1 py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mobileActiveProduct === 'di-notes'
                  ? 'btn-tactile text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>01 DI Notes</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileActiveProduct('event-mesh')}
              className={`flex-1 py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mobileActiveProduct === 'event-mesh'
                  ? 'btn-tactile text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>02 EventMesh 3D</span>
            </button>
          </div>
        </div>

        {/* ── MOBILE VIEW: RENDER ONLY THE ACTIVE PRODUCT (PREVENTS ELONGATION) ── */}
        <div className="block md:hidden">
          {mobileActiveProduct === 'di-notes' && (
            <section className="card-tactile rounded-3xl p-5 bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xl flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/20">
                    01 · Developer Tooling
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-base)]">
                    v2.5 Stable
                  </span>
                </div>
                <h2 className="font-display font-black text-xl text-[var(--text-primary)]">
                  DI Notes Sorting Visualizer
                </h2>
                <p className="font-mono text-[11px] text-[var(--accent-primary)] font-semibold mt-0.5 mb-3">
                  Interactive Runtime Memory & Sorting Engine
                </p>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Step forward, inspect runtime comparisons and pointer swaps, and duel QuickSort, MergeSort, and Binary Search in real time.
                </p>

                {/* 3 Compact Metrics */}
                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {PRODUCTS[0].metrics.map((m) => (
                    <div key={m.label} className="card-inset-well p-2 text-center">
                      <div className="font-mono text-[8px] text-[var(--text-muted)] uppercase truncate">
                        {m.label}
                      </div>
                      <div className="font-display font-black text-xs text-[var(--text-primary)]">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visualizer */}
              <div className="w-full">
                <DiNotesVisualizer />
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
                <a
                  href={PRODUCTS[0].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3.5 rounded-xl font-mono text-xs font-semibold text-[var(--text-primary)] btn-ghost inline-flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              </div>
            </section>
          )}

          {mobileActiveProduct === 'event-mesh' && (
            <section className="card-tactile rounded-3xl p-5 flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] font-bold border border-[var(--accent-secondary)]/20">
                    02 · Distributed Systems & AI
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-base)]">
                    v3.0 Core
                  </span>
                </div>
                <h2 className="font-display font-black text-xl text-[var(--text-primary)]">
                  EventMesh 3D Radar
                </h2>
                <p className="font-mono text-[11px] text-[var(--accent-secondary)] font-semibold mt-0.5 mb-3">
                  Global Event Distribution & Latency Tracker
                </p>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Interactive rotatable 3D WebGL globe telemetry monitor. Track developer summits and AI hackathons worldwide.
                </p>

                {/* 3 Compact Metrics */}
                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {PRODUCTS[1].metrics.map((m) => (
                    <div key={m.label} className="card-inset-well p-2 text-center">
                      <div className="font-mono text-[8px] text-[var(--text-muted)] uppercase truncate">
                        {m.label}
                      </div>
                      <div className="font-display font-black text-xs text-[var(--text-primary)]">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visualizer */}
              <div className="w-full">
                <EventMeshRadar />
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between">
                <a
                  href={PRODUCTS[1].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3.5 rounded-xl font-mono text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-base)] inline-flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              </div>
            </section>
          )}
        </div>

        {/* ── DESKTOP & TABLET VIEW: FULL MULTI-SECTION DUAL SHOWCASE (UNTOUCHED) ── */}
        <div className="hidden md:block space-y-16 sm:space-y-20">
          {/* PRODUCT 01: DI NOTES SORTING VISUALIZER */}
          <section
            id="di-notes"
            className="card-tactile group relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] transition-all duration-300 shadow-xl shadow-black/5"
          >
            <div className="flex flex-col gap-8">
              {/* Top Row: Title, Category Badges & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border-base)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/20">
                      01 · Developer Tooling
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-base)]">
                      v2.5 Stable
                    </span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">
                    DI Notes Sorting Visualizer
                  </h2>
                  <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold mt-1">
                    Interactive Runtime Memory & Sorting Algorithm Engine
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href="https://github.com/ZaLuLu/nayaklabs-site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-xl font-mono text-xs font-semibold text-[var(--text-primary)] btn-ghost inline-flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                  </a>
                </div>
              </div>

              {/* Description, Metrics, and Features */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8">
                  <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-4">
                    A visual execution engine for data structures and sorting algorithms. Step forward, inspect runtime comparisons and pointer swaps, and duel QuickSort, MergeSort, and HeapSort in real time.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {PRODUCTS[0].features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 font-body text-xs text-[var(--text-primary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="lg:col-span-4 grid grid-cols-3 gap-2">
                  {PRODUCTS[0].metrics.map((m) => (
                    <div key={m.label} className="card-inset-well p-3 text-center">
                      <div className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5 truncate">
                        {m.label}
                      </div>
                      <div className="font-display font-black text-sm text-[var(--text-primary)]">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Interactive Visualizer */}
              <div className="w-full pt-2">
                <DiNotesVisualizer />
              </div>
            </div>
          </section>

          {/* PRODUCT 02: EVENTMESH 3D RADAR */}
          <section
            id="event-mesh"
            className="card-tactile group relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] transition-all duration-300 shadow-xl"
          >
            <div className="flex flex-col gap-8">
              {/* Top Row: Title, Category Badges & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border-base)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] font-bold border border-[var(--accent-secondary)]/20">
                      02 · Distributed Systems & AI
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-base)]">
                      v3.0 Core
                    </span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">
                    EventMesh 3D Radar
                  </h2>
                  <p className="font-mono text-xs text-[var(--accent-secondary)] font-semibold mt-1">
                    Global Event Distribution & Microservice Latency Tracker
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href="https://github.com/ZaLuLu/nayaklabs-site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-xl font-mono text-xs font-semibold text-[var(--text-primary)] btn-ghost inline-flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                  </a>
                </div>
              </div>

              {/* Description, Metrics, and Features */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8">
                  <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-4">
                    Interactive rotatable 3D WebGL globe telemetry monitor. Track developer summits, AI hackathons, and archive benchmarks across major tech hubs worldwide with real-time city targeting.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {PRODUCTS[1].features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 font-body text-xs text-[var(--text-primary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="lg:col-span-4 grid grid-cols-3 gap-2">
                  {PRODUCTS[1].metrics.map((m) => (
                    <div key={m.label} className="card-inset-well p-3 text-center">
                      <div className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5 truncate">
                        {m.label}
                      </div>
                      <div className="font-display font-black text-sm text-[var(--text-primary)]">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Interactive Visualizer */}
              <div className="w-full pt-2">
                <EventMeshRadar />
              </div>
            </div>
          </section>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="mt-16 sm:mt-20 text-center">
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
