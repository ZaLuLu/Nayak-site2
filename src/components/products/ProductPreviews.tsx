import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Check, Sparkles, Terminal, Activity, ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react'

// ── 1. DI NOTES VISUALIZER INTERACTIVE PREVIEW ──
export function DiNotesPreview() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const STAGES = [
    { line: 1, action: 'allocate(Buffer[256])', memory: '0x7FA1 [Allocated 256B]', stack: 'main()', status: 'INIT' },
    { line: 3, action: 'pushStack(Node(val: 42))', memory: '0x7FA1 -> 0x7FA8 [Node(42)]', stack: 'main() → insert()', status: 'PUSH' },
    { line: 5, action: 'swapPointer(left, right)', memory: '0x7FA8 ⇄ 0x7FB0 [Mutated]', stack: 'main() → insert() → swap()', status: 'MUTATE' },
    { line: 8, action: 'rebalanceTree(AVL_ROOT)', memory: '0x7FB0 [Height 3 | Balanced]', stack: 'main() → rebalance()', status: 'RESOLVED' },
  ]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % STAGES.length)
    }, 1400)
    return () => clearInterval(timer)
  }, [isPlaying])

  const current = STAGES[step]

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-base)] border border-[var(--border-base)] overflow-hidden shadow-inner select-none">
      {/* Terminal Titlebar */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-[11px] text-[var(--text-muted)]">di-notes-tracer.wasm</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-2 py-1 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-mono text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isPlaying ? 'Pause' : 'Auto Step'}</span>
          </button>
          <button
            type="button"
            onClick={() => setStep((prev) => (prev + 1) % STAGES.length)}
            className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] font-mono text-[10px] active:scale-95 transition-transform"
          >
            Step +1
          </button>
        </div>
      </div>

      {/* Interactive Visual Trace View */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Code View */}
        <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] space-y-1 text-[var(--text-secondary)]">
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1 pb-1 border-b border-[var(--border-base)]">
            Execution AST
          </div>
          <div className={step === 0 ? 'text-violet-400 font-bold bg-violet-500/10 px-1 rounded' : 'px-1'}>
            1: const buf = allocate(256);
          </div>
          <div className={step === 1 ? 'text-violet-400 font-bold bg-violet-500/10 px-1 rounded' : 'px-1'}>
            2: const node = new Node(42);
          </div>
          <div className={step === 2 ? 'text-violet-400 font-bold bg-violet-500/10 px-1 rounded' : 'px-1'}>
            3: swapPointer(left, right);
          </div>
          <div className={step === 3 ? 'text-violet-400 font-bold bg-violet-500/10 px-1 rounded' : 'px-1'}>
            4: return rebalanceTree(node);
          </div>
        </div>

        {/* Live Memory Heap State */}
        <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2 pb-1 border-b border-[var(--border-base)]">
              <span>Heap Address</span>
              <span className="text-emerald-400 font-bold">{current.status}</span>
            </div>
            <div className="text-violet-400 font-bold text-[11px] mb-1">
              {current.memory}
            </div>
            <div className="text-[var(--text-muted)] text-[10.5px]">
              Stack: <span className="text-[var(--text-primary)]">{current.stack}</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[var(--border-base)] flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>Step {step + 1} of 4</span>
            <span className="text-violet-400 font-semibold">WebAssembly 0ms Latency</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 2. EVENTMESH RADAR INTERACTIVE PREVIEW ──
export function EventMeshPreview() {
  const [eventCount, setEventCount] = useState(124820)
  const [activeNode, setActiveNode] = useState(0)

  const NODES = [
    { city: 'Bengaluru (IN)', ping: '11ms', load: '14%', status: 'Optimal', color: 'text-emerald-400' },
    { city: 'San Francisco (US)', ping: '9ms', load: '22%', status: 'Healthy', color: 'text-emerald-400' },
    { city: 'Frankfurt (DE)', ping: '16ms', load: '18%', status: 'Optimal', color: 'text-emerald-400' },
    { city: 'Tokyo (JP)', ping: '24ms', load: '31%', status: 'Healthy', color: 'text-indigo-400' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setEventCount((c) => c + Math.floor(Math.random() * 14) + 4)
      setActiveNode((prev) => (prev + 1) % NODES.length)
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-base)] border border-[var(--border-base)] overflow-hidden shadow-inner select-none">
      {/* Titlebar */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold">EventMesh Global Radar</span>
        </div>
        <div className="font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{eventCount.toLocaleString()} evt/sec</span>
        </div>
      </div>

      {/* Global Node Matrix */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        {NODES.map((node, idx) => (
          <div
            key={node.city}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              activeNode === idx
                ? 'bg-indigo-500/15 border-indigo-500/40 shadow-sm'
                : 'bg-[var(--bg-card)] border-[var(--border-base)]'
            }`}
          >
            <div className="text-[10px] text-[var(--text-muted)] truncate">{node.city}</div>
            <div className="text-sm font-bold text-[var(--text-primary)] mt-1">{node.ping}</div>
            <div className="flex items-center justify-between text-[9.5px] mt-2 pt-1 border-t border-[var(--border-base)]">
              <span className="text-[var(--text-muted)]">Load: {node.load}</span>
              <span className={node.color}>{node.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 3. AGENTRUNTIME OS INTERACTIVE PREVIEW ──
export function AgentRuntimePreview() {
  const [activeStage, setActiveStage] = useState(1)

  const STAGES = [
    { name: '01. Ingestion', desc: 'Schema validation & prompt sanitize', time: '12ms', status: 'PASS' },
    { name: '02. Reasoning', desc: 'LangGraph cyclic multi-tool routing', time: '48ms', status: 'ACTIVE' },
    { name: '03. Vector RAG', desc: 'HNSW hybrid search with reranking', time: '18ms', status: 'IDLE' },
    { name: '04. Checkpoint', desc: 'Persistent state snapshot commit', time: '6ms', status: 'READY' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-base)] border border-[var(--border-base)] overflow-hidden shadow-inner select-none">
      {/* Titlebar */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-base)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold">AgentRuntime Supervisor Graph</span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 font-semibold">
          Deterministic 99.98%
        </span>
      </div>

      {/* Interactive Graph Pipeline */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        {STAGES.map((st, idx) => (
          <div
            key={st.name}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              activeStage === idx
                ? 'bg-violet-500/15 border-violet-500/50 shadow-sm'
                : 'bg-[var(--bg-card)] border-[var(--border-base)]'
            }`}
          >
            <div className="text-[10px] font-bold text-[var(--text-primary)]">{st.name}</div>
            <div className="text-[9.5px] text-[var(--text-secondary)] mt-1 line-clamp-2">{st.desc}</div>
            <div className="flex items-center justify-between text-[9.5px] mt-2 pt-1 border-t border-[var(--border-base)]">
              <span className="text-[var(--text-muted)]">{st.time}</span>
              <span className={activeStage === idx ? 'text-violet-400 font-bold' : 'text-emerald-400'}>
                {activeStage === idx ? 'RUNNING' : 'DONE'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
