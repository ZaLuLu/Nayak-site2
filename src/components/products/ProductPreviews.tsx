import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Terminal, Activity, ArrowRight, Zap, CheckCircle2, RefreshCw, Cpu, Layers, Play, Pause, RotateCcw } from 'lucide-react'

// ── 1. DI NOTES VISUALIZER: INTERACTIVE SORTING ALGORITHM ENGINE ──
export function DiNotesPreview() {
  const INITIAL_ARRAY = [45, 82, 24, 96, 58, 32, 75, 18, 64]
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY])
  const [comparing, setComparing] = useState<number[]>([1, 2])
  const [swapping, setSwapping] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [algo, setAlgo] = useState<'quicksort' | 'mergesort' | 'heapsort'>('quicksort')
  const [isRunning, setIsRunning] = useState(true)
  const [comparisons, setComparisons] = useState(14)
  const [swaps, setSwaps] = useState(6)

  // Automated gentle visualization loop
  useEffect(() => {
    if (!isRunning) return

    let step = 0
    const interval = setInterval(() => {
      step++
      const idx1 = Math.floor(Math.random() * (array.length - 1))
      const idx2 = idx1 + 1

      setComparing([idx1, idx2])

      if (Math.random() > 0.4) {
        setSwapping([idx1, idx2])
        setArray((prev) => {
          const next = [...prev]
          const temp = next[idx1]
          next[idx1] = next[idx2]
          next[idx2] = temp
          return next
        })
        setSwaps((s) => s + 1)
      } else {
        setSwapping([])
      }

      setComparisons((c) => c + 1)

      // Mark some as sorted progressively
      if (step % 5 === 0) {
        setSortedIndices((prev) => Array.from(new Set([...prev, Math.floor(Math.random() * array.length)])))
      }
    }, 1200)

    return () => clearInterval(interval)
  }, [isRunning, array.length])

  const handleReset = () => {
    setArray([35, 78, 22, 90, 52, 28, 68, 15, 84])
    setComparing([])
    setSwapping([])
    setSortedIndices([])
    setComparisons(0)
    setSwaps(0)
    setIsRunning(true)
  }

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] overflow-hidden shadow-lg select-none">
      {/* Titlebar with Algorithm Selector */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold">Sorting Runtime Visualizer</span>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1 font-mono text-[9.5px]">
          {(['quicksort', 'mergesort', 'heapsort'] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAlgo(a)
                handleReset()
              }}
              className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                algo === a
                  ? 'bg-violet-600 text-white font-bold shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {a.replace('sort', ' Sort')}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Array Bars Canvas */}
      <div className="p-5 flex flex-col justify-between h-[190px]">
        <div className="flex items-end justify-between gap-2 h-28 px-2 pt-2">
          {array.map((val, idx) => {
            const isComp = comparing.includes(idx)
            const isSwap = swapping.includes(idx)
            const isSorted = sortedIndices.includes(idx)

            let barColor = 'bg-violet-500/30 border-violet-500/40'
            if (isSwap) {
              barColor = 'bg-rose-500 border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.6)]'
            } else if (isComp) {
              barColor = 'bg-amber-400 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
            } else if (isSorted) {
              barColor = 'bg-emerald-500 border-emerald-400'
            }

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="font-mono text-[9px] text-[var(--text-muted)] font-semibold">
                  {val}
                </span>
                <div
                  style={{ height: `${val}%` }}
                  className={`w-full rounded-t-md border transition-all duration-300 ${barColor}`}
                />
              </div>
            )
          })}
        </div>

        {/* Live Telemetry & Control Bar */}
        <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[10.5px]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--text-muted)]">
              Comparisons: <strong className="text-[var(--text-primary)]">{comparisons}</strong>
            </span>
            <span className="text-[var(--text-muted)]">
              Swaps: <strong className="text-[var(--text-primary)]">{swaps}</strong>
            </span>
            <span className="text-violet-400 font-bold hidden sm:inline">
              O(n log n)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="p-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)] hover:border-violet-400 cursor-pointer"
              title={isRunning ? 'Pause' : 'Play'}
            >
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)] hover:border-violet-400 cursor-pointer"
              title="Shuffle / Reset"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 2. EVENTMESH RADAR: VISUAL REGIONAL LATENCY MATRIX ──
export function EventMeshPreview() {
  const [activeIdx, setActiveIdx] = useState(0)

  const NODES = [
    { city: 'Bengaluru', country: 'IN', latency: '11ms', status: 'Optimal', throughput: '42k evt/s', load: 35 },
    { city: 'San Francisco', country: 'US', latency: '9ms', status: 'Optimal', throughput: '58k evt/s', load: 48 },
    { city: 'Frankfurt', country: 'DE', latency: '16ms', status: 'Healthy', throughput: '29k evt/s', load: 24 },
    { city: 'Tokyo', country: 'JP', latency: '22ms', status: 'Optimal', throughput: '19k evt/s', load: 16 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % NODES.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] overflow-hidden shadow-lg select-none">
      {/* Titlebar */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold">Global Edge Cluster</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>35 Live Edge PoPs</span>
        </div>
      </div>

      {/* Visual Interactive Hub */}
      <div className="p-3.5 space-y-2">
        {NODES.map((node, i) => (
          <div
            key={node.city}
            onClick={() => setActiveIdx(i)}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer active:scale-98 ${
              activeIdx === i
                ? 'bg-indigo-500/15 border-indigo-500/40 shadow-sm'
                : 'bg-[var(--bg-surface)] border-[var(--border-base)] opacity-80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${activeIdx === i ? 'bg-indigo-400 animate-pulse' : 'bg-white/20'}`} />
              <div>
                <div className="font-display font-bold text-xs text-[var(--text-primary)]">
                  {node.city}, {node.country}
                </div>
                <div className="font-mono text-[9px] text-[var(--text-muted)]">
                  {node.throughput}
                </div>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-xs font-bold text-emerald-400">{node.latency}</div>
              <div className="text-[9px] text-[var(--text-muted)]">{node.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 3. AGENTRUNTIME OS: VISUAL PIPELINE GRAPH ──
export function AgentRuntimePreview() {
  const [activeStep, setActiveStep] = useState(1)

  const PIPELINE = [
    { title: 'User Intent Ingest', desc: 'Pydantic structured schema validation', time: '8ms' },
    { title: 'LangGraph Supervisor', desc: 'Cyclic tool routing & agent delegation', time: '42ms' },
    { title: 'Vector Knowledge RAG', desc: 'Qdrant hybrid sparse-dense retrieval', time: '14ms' },
    { title: 'Checkpoint Snapshot', desc: 'Deterministic PostgreSQL state commit', time: '5ms' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE.length)
    }, 1600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] overflow-hidden shadow-lg select-none">
      {/* Titlebar */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold">Autonomous Agent Graph</span>
        </div>
        <span className="font-mono text-[9.5px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 font-semibold">
          Deterministic Loop
        </span>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="p-3.5 space-y-2">
        {PIPELINE.map((p, i) => (
          <div
            key={p.title}
            onClick={() => setActiveStep(i)}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer active:scale-98 ${
              activeStep === i
                ? 'bg-violet-500/15 border-violet-500/50 shadow-sm'
                : 'bg-[var(--bg-surface)] border-[var(--border-base)] opacity-80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${activeStep === i ? 'bg-violet-600 text-white' : 'bg-white/10 text-[var(--text-muted)]'}`}>
                {i + 1}
              </span>
              <div>
                <div className="font-display font-bold text-xs text-[var(--text-primary)]">
                  {p.title}
                </div>
                <div className="font-body text-[10px] text-[var(--text-secondary)]">
                  {p.desc}
                </div>
              </div>
            </div>

            <div className="text-right font-mono shrink-0 pl-2">
              <div className="text-[10.5px] font-bold text-violet-400">{p.time}</div>
              <div className="text-[8.5px] text-emerald-400">
                {activeStep === i ? 'ACTIVE' : 'READY'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
