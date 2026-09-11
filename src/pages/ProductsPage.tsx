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
  badge: string
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
    tagline: 'Interactive Learning Engine & Algorithm Visualizer',
    category: 'Developer Tooling',
    badge: 'Interactive Sandbox',
    description: 'Concepts you can touch. Inspect runtime comparisons, pointer swaps, and algorithm execution step by step in real time across classic sorting techniques.',
    features: [
      'Interactive QuickSort, MergeSort, BubbleSort & Binary Search step tracers.',
      'Step-by-step array inspection with real-time comparison pointers.',
      'Interactive array controls with dynamic speed and code tracing.',
      'Clear algorithmic time and space complexity explanations.',
    ],
    metrics: [
      { label: 'Learners', value: '4,200+' },
      { label: 'Algorithms', value: '5 Tracks' },
      { label: 'License', value: 'MIT Open' },
    ],
    tags: ['#SortingAlgorithms', '#QuickSort', '#BinarySearch', '#InteractiveLearning'],
    githubUrl: 'https://github.com/ZaLuLu/nayaklabs-site',
    accentColor: 'var(--accent-primary)',
  },
  {
    id: 'event-mesh',
    code: '02',
    title: 'EventJn. 3D Radar',
    tagline: 'Tech Events, Hackathons & Developer Summits across India',
    category: 'Community Platform',
    badge: 'Interactive 3D Map',
    description: 'Hackathons, tech meetups, and developer workshops curated across major tech hubs. Filter by category, city, and date with our interactive 3D globe.',
    features: [
      'Curated tech meetups, hackathons, and developer conferences.',
      'Interactive 3D globe with smooth city pinpoint targeting and rotation controls.',
      'Filter across Hackathons, AI Summits, Workshops, and Community Meetups.',
      'Direct links to event agendas, organizer handles, and registrations.',
    ],
    metrics: [
      { label: 'Active Cities', value: '7 Hubs' },
      { label: 'Community', value: '7,000+' },
      { label: 'Listings', value: '500+ Active' },
    ],
    tags: ['#3DGlobe', '#WebGL', '#TechEvents', '#DeveloperCommunity'],
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
                In-House Tools & Open Source
              </span>
            </div>

            <h1 className="font-display font-black text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-tight text-[var(--text-primary)] mb-3 sm:mb-4">
              The software we built for ourselves first<span className="text-[var(--accent-primary)]">.</span>
            </h1>

            <p className="font-body text-xs sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              Each one scratches an itch we had at NayakLabs — then kept working well enough to ship publicly. Try the interactive tools below.
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
              <span>DI Notes</span>
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
              <span>EventJn. 3D</span>
            </button>
          </div>
        </div>

        {/* ── MOBILE VIEW: RENDER ONLY THE ACTIVE PRODUCT ── */}
        <div className="block md:hidden">
          {mobileActiveProduct === 'di-notes' && (
            <section className="card-tactile rounded-3xl p-5 bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xl flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/20">
                    Developer Tooling
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[var(--accent-primary)] border border-[var(--border-base)] font-semibold">
                    {PRODUCTS[0].badge}
                  </span>
                </div>
                <h2 className="font-display font-black text-xl text-[var(--text-primary)]">
                  DI Notes Sorting Visualizer
                </h2>
                <p className="font-mono text-[11px] text-[var(--accent-primary)] font-semibold mt-0.5 mb-3">
                  Interactive Learning Engine & Algorithm Visualizer
                </p>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Inspect runtime comparisons, pointer swaps, and algorithm execution step by step in real time.
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
                    Community Platform
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--accent-secondary)] border border-[var(--border-base)] font-semibold">
                    {PRODUCTS[1].badge}
                  </span>
                </div>
                <h2 className="font-display font-black text-xl text-[var(--text-primary)]">
                  EventJn. 3D Radar
                </h2>
                <p className="font-mono text-[11px] text-[var(--accent-secondary)] font-semibold mt-0.5 mb-3">
                  Tech Events, Hackathons & Developer Summits
                </p>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Interactive rotatable 3D globe radar. Filter and explore developer summits, AI hackathons, and workshops across India.
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

        {/* ── DESKTOP & TABLET VIEW: FULL MULTI-SECTION DUAL SHOWCASE ── */}
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
                      Developer Tooling
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--accent-primary)] border border-[var(--border-base)] font-semibold">
                      {PRODUCTS[0].badge}
                    </span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">
                    DI Notes Sorting Visualizer
                  </h2>
                  <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold mt-1">
                    Interactive Learning Engine & Algorithm Visualizer
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
                    Concepts you can touch. Inspect runtime comparisons, pointer swaps, and algorithm execution step by step in real time across classic sorting techniques.
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

          {/* PRODUCT 02: EVENTJN 3D RADAR */}
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
                      Community Platform
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--accent-secondary)] border border-[var(--border-base)] font-semibold">
                      {PRODUCTS[1].badge}
                    </span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">
                    EventJn. 3D Radar
                  </h2>
                  <p className="font-mono text-xs text-[var(--accent-secondary)] font-semibold mt-1">
                    Tech Events, Hackathons & Developer Summits
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
                    Hackathons, tech meetups, and developer workshops curated across major tech hubs. Filter by category, city, and date with our interactive 3D globe.
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
