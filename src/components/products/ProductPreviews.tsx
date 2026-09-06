import React, { useState, useEffect } from 'react'
import { Sparkles, Terminal, Activity, ArrowRight, Zap, CheckCircle2, RefreshCw, Cpu, Layers } from 'lucide-react'

// ── 1. DI NOTES VISUALIZER: VISUAL MEMORY TREE & NODE GRAPH ──
export function DiNotesPreview() {
  const [activeNode, setActiveNode] = useState(1)

  const NODES = [
    { id: 0, val: '18', label: 'Left Child', depth: 'Depth 2', addr: '0x7FA1', color: 'border-purple-500/40' },
    { id: 1, val: '42', label: 'AVL Root', depth: 'Depth 1 (Balanced)', addr: '0x7FA8', color: 'border-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.3)] bg-violet-500/20' },
    { id: 2, val: '84', label: 'Right Child', depth: 'Depth 2', addr: '0x7FB2', color: 'border-purple-500/40' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODES.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const selected = NODES[activeNode]

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-base)] border border-[var(--border-base)] overflow-hidden shadow-md select-none">
      {/* Titlebar */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold">Interactive Memory Tree</span>
        </div>
        <span className="font-mono text-[9.5px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 font-semibold">
          WebAssembly WASM
        </span>
      </div>

      {/* Visual Interactive Graph */}
      <div className="p-5 flex flex-col items-center justify-center">
        {/* Root Node */}
        <div className="relative mb-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setActiveNode(1)}
            className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${
              activeNode === 1
                ? 'bg-violet-600 text-white border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-105'
                : 'bg-[var(--bg-card)] border-[var(--border-base)] text-[var(--text-primary)] hover:border-violet-400'
            }`}
          >
            <span className="font-display font-black text-lg leading-none">42</span>
            <span className="font-mono text-[8px] opacity-80 mt-0.5">ROOT</span>
          </button>

          {/* Branch Lines */}
          <div className="w-28 h-4 border-b-2 border-x-2 border-violet-500/30 rounded-b-xl -mt-1 pointer-events-none" />
        </div>

        {/* Children Nodes Row */}
        <div className="flex items-center justify-center gap-12 mb-5">
          {/* Left Node */}
          <button
            type="button"
            onClick={() => setActiveNode(0)}
            className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${
              activeNode === 0
                ? 'bg-violet-600 text-white border-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.5)] scale-105'
                : 'bg-[var(--bg-card)] border-[var(--border-base)] text-[var(--text-primary)] hover:border-violet-400'
            }`}
          >
            <span className="font-display font-black text-base leading-none">18</span>
            <span className="font-mono text-[7.5px] opacity-80 mt-0.5">LEFT</span>
          </button>

          {/* Right Node */}
          <button
            type="button"
            onClick={() => setActiveNode(2)}
            className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${
              activeNode === 2
                ? 'bg-violet-600 text-white border-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.5)] scale-105'
                : 'bg-[var(--bg-card)] border-[var(--border-base)] text-[var(--text-primary)] hover:border-violet-400'
            }`}
          >
            <span className="font-display font-black text-base leading-none">84</span>
            <span className="font-mono text-[7.5px] opacity-80 mt-0.5">RIGHT</span>
          </button>
        </div>

        {/* Live Inspector Bar */}
        <div className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[var(--text-secondary)]">Node: <strong className="text-[var(--text-primary)]">{selected.label} ({selected.val})</strong></span>
          </div>
          <span className="text-violet-400 font-bold">{selected.addr}</span>
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
    <div className="w-full rounded-2xl bg-[var(--bg-base)] border border-[var(--border-base)] overflow-hidden shadow-md select-none">
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
      <div className="p-4 space-y-2">
        {NODES.map((node, i) => (
          <div
            key={node.city}
            onClick={() => setActiveIdx(i)}
            className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer active:scale-98 ${
              activeIdx === i
                ? 'bg-indigo-500/15 border-indigo-500/40 shadow-sm'
                : 'bg-[var(--bg-card)] border-[var(--border-base)] opacity-80'
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
    <div className="w-full rounded-2xl bg-[var(--bg-base)] border border-[var(--border-base)] overflow-hidden shadow-md select-none">
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
      <div className="p-4 space-y-2">
        {PIPELINE.map((p, i) => (
          <div
            key={p.title}
            onClick={() => setActiveStep(i)}
            className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer active:scale-98 ${
              activeStep === i
                ? 'bg-violet-500/15 border-violet-500/50 shadow-sm'
                : 'bg-[var(--bg-card)] border-[var(--border-base)] opacity-80'
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
