import React, { useState, useEffect, useRef } from 'react'
import {
  Bot,
  Globe,
  Database,
  Palette,
  Play,
  RotateCcw,
  Zap,
  Activity,
  CheckCircle2,
  Layers,
  Sparkles,
  Server,
  Cpu,
} from 'lucide-react'

export function ServiceArchitecturePreview() {
  const [activeTab, setActiveTab] = useState<'ai' | 'edge' | 'queue' | 'motion'>('ai')

  return (
    <div className="card-tactile p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xl overflow-hidden mb-12 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[var(--border-base)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-[var(--accent-secondary)] font-semibold uppercase tracking-wider">
              Interactive Architecture Sandbox
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            How we architect systems
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-base)] shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-base)] font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span>AI & RAG</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('edge')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'edge'
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-base)] font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Web & Edge</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'queue'
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-base)] font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Task Queues</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('motion')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'motion'
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-base)] font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span>Design Systems</span>
          </button>
        </div>
      </div>

      {/* Stage Views */}
      <div className="min-h-[280px]">
        {activeTab === 'ai' && <AIRagPipelineSimulator />}
        {activeTab === 'edge' && <EdgeCacheSimulator />}
        {activeTab === 'queue' && <QueueConcurrencySimulator />}
        {activeTab === 'motion' && <KineticMotionSandbox />}
      </div>
    </div>
  )
}

// ── 1. AUTONOMOUS AI & RAG PIPELINE SIMULATOR ──
function AIRagPipelineSimulator() {
  const [running, setRunning] = useState(false)
  const [activeStep, setActiveStep] = useState(2)

  const STEPS = [
    { title: 'Schema Ingest', desc: 'Pydantic structured payload validation', latency: '4ms', status: 'PASS' },
    { title: 'Dense Embedding', desc: 'OpenAI text-embedding-3-large (3072 dim)', latency: '18ms', status: 'READY' },
    { title: 'Qdrant Hybrid Search', desc: 'HNSW index cosine similarity (k=8, score > 0.89)', latency: '24ms', status: 'INDEXED' },
    { title: 'Cohere Rerank v3', desc: 'Cross-encoder relevance filtration', latency: '12ms', status: 'FILTERED' },
    { title: 'Streaming LLM Tokens', desc: 'Deterministic agent tool response stream', latency: '16ms', status: 'STREAMING' },
  ]

  const runSimulation = () => {
    setRunning(true)
    setActiveStep(0)
    let cur = 0
    const timer = setInterval(() => {
      cur++
      if (cur < STEPS.length) {
        setActiveStep(cur)
      } else {
        clearInterval(timer)
        setRunning(false)
      }
    }, 450)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] font-mono text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="text-[var(--accent-secondary)] font-bold">QUERY:</span>
          <span className="text-[var(--text-primary)] truncate">
            "SELECT p99_latency FROM vector_index WHERE throughput &gt; 5000"
          </span>
        </div>
        <button
          type="button"
          onClick={runSimulation}
          disabled={running}
          className="btn-primary py-1.5 px-3.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{running ? 'Executing Graph...' : 'Test RAG Run'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {STEPS.map((s, idx) => {
          const isActive = activeStep === idx
          const isDone = activeStep > idx
          return (
            <div
              key={s.title}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
                isActive
                  ? 'border-violet-500 bg-violet-500/15 shadow-md shadow-violet-500/10 scale-[1.02]'
                  : isDone
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-[var(--border-base)] bg-[var(--bg-surface)] opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-bold text-[var(--text-muted)]">
                    0{idx + 1}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      isActive
                        ? 'bg-violet-600 text-white animate-pulse'
                        : isDone
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {isActive ? 'RUNNING' : isDone ? 'VERIFIED' : s.status}
                  </span>
                </div>
                <h4 className="font-display font-bold text-xs text-[var(--text-primary)] mb-1">
                  {s.title}
                </h4>
                <p className="font-body text-[10px] text-[var(--text-secondary)] leading-snug">
                  {s.desc}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-[var(--border-base)] font-mono text-[10px] text-right font-bold text-violet-400">
                {s.latency}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] font-mono text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pipeline Verification: <strong className="text-[var(--text-primary)]">Grounded & Verified</strong></span>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold uppercase">Production Ready</span>
      </div>
    </div>
  )
}

// ── 2. HIGH-SCALE WEB & EDGE SYSTEMS SIMULATOR ──
function EdgeCacheSimulator() {
  const [cached, setCached] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
        <div>
          <h4 className="font-display font-bold text-sm text-[var(--text-primary)]">
            Global Edge KV Routing vs Cold Database Origin
          </h4>
          <p className="font-body text-xs text-[var(--text-secondary)]">
            Toggle request path to compare serverless cold starts against edge cached payloads.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-base)]">
          <button
            type="button"
            onClick={() => setCached(true)}
            className={`px-3 py-1 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
              cached ? 'bg-sky-500 text-white' : 'text-[var(--text-secondary)]'
            }`}
          >
            ⚡ Edge Cache Hit
          </button>
          <button
            type="button"
            onClick={() => setCached(false)}
            className={`px-3 py-1 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
              !cached ? 'bg-rose-500 text-white' : 'text-[var(--text-secondary)]'
            }`}
          >
            ❄️ Cold Origin Fetch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Response TTFB</div>
          <div className="font-display font-black text-2xl text-[var(--text-primary)]">
            {cached ? (
              <span className="text-emerald-400">11.4 ms</span>
            ) : (
              <span className="text-rose-400">248.0 ms</span>
            )}
          </div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] mt-1">
            {cached ? 'Served from Tokyo Edge Node' : 'Roundtrip to US-East Origin'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Database Load</div>
          <div className="font-display font-black text-2xl text-[var(--text-primary)]">
            {cached ? (
              <span className="text-sky-400">0 QPS (100% Shielded)</span>
            ) : (
              <span className="text-amber-400">1 Connection Pool Spike</span>
            )}
          </div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] mt-1">
            {cached ? 'PgBouncer zero overhead' : 'TLS Handshake + SQL Query'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Bandwidth Cost</div>
          <div className="font-display font-black text-2xl text-[var(--text-primary)]">
            {cached ? (
              <span className="text-emerald-400">98% Egress Reduction</span>
            ) : (
              <span className="text-rose-400">Standard Transit Rate</span>
            )}
          </div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] mt-1">
            HTTP/3 Brotli compression active
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 3. DISTRIBUTED TASK QUEUES & CONCURRENCY SIMULATOR ──
function QueueConcurrencySimulator() {
  const [concurrency, setConcurrency] = useState(4)
  const [burstActive, setBurstActive] = useState(false)
  const [processed, setProcessed] = useState(14820)
  const [queueSize, setQueueSize] = useState(12)

  useEffect(() => {
    const timer = setInterval(() => {
      const incoming = burstActive ? 180 : 35
      const drained = concurrency * 12

      setQueueSize((prev) => Math.max(0, prev + incoming - drained))
      setProcessed((p) => p + drained)
    }, 600)

    return () => clearInterval(timer)
  }, [concurrency, burstActive])

  const triggerBurst = () => {
    setBurstActive(true)
    setQueueSize((q) => q + 450)
    setTimeout(() => setBurstActive(false), 2500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
        <div>
          <h4 className="font-display font-bold text-sm text-[var(--text-primary)]">
            BullMQ Concurrency Engine & Dead-Letter Isolation
          </h4>
          <p className="font-body text-xs text-[var(--text-secondary)]">
            Simulate dynamic worker concurrency scaling and live queue drain rates.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerBurst}
          className={`py-1.5 px-3.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
            burstActive
              ? 'bg-rose-600 text-white animate-pulse'
              : 'btn-tactile text-white'
          }`}
        >
          {burstActive ? '⚠️ Bursting 5k Events...' : '⚡ Inject Burst Traffic'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Queue Backlog</div>
          <div className={`font-display font-black text-2xl ${queueSize > 100 ? 'text-rose-400' : 'text-[var(--text-primary)]'}`}>
            {queueSize.toLocaleString()} jobs
          </div>
          <div className="font-mono text-[9px] text-[var(--text-muted)]">Redis Streams buffer</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Throughput Drain</div>
          <div className="font-display font-black text-2xl text-emerald-400">
            {(concurrency * 1200).toLocaleString()} evt/s
          </div>
          <div className="font-mono text-[9px] text-[var(--text-muted)]">Zero backpressure loss</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Total Processed</div>
          <div className="font-display font-black text-2xl text-sky-400">
            {processed.toLocaleString()}
          </div>
          <div className="font-mono text-[9px] text-[var(--text-muted)]">0 Dead-Letter Faults</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Worker Pods:</span>
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">{concurrency} Workers</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={concurrency}
            onChange={(e) => setConcurrency(parseInt(e.target.value))}
            className="w-full accent-[var(--accent-primary)] cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  )
}

// ── 4. KINETIC UI & MOTION SPRING SANDBOX ──
function KineticMotionSandbox() {
  const [springStiffness, setSpringStiffness] = useState(180)
  const [springDamping, setSpringDamping] = useState(14)
  const [posX, setPosX] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const triggerKick = () => {
    setPosX(160)
    setTimeout(() => setPosX(0), 120)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
        <div>
          <h4 className="font-display font-bold text-sm text-[var(--text-primary)]">
            Hardware-Accelerated 60fps Spring Physics
          </h4>
          <p className="font-body text-xs text-[var(--text-secondary)]">
            Adjust stiffness and damping parameters to experience frame-budget precision.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerKick}
          className="btn-primary py-1.5 px-4 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Impulse Kick</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
        {/* Kinetic Spring Target */}
        <div className="flex-1 flex items-center justify-center min-h-[140px] w-full">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={triggerKick}
            style={{
              transform: `translateX(${posX}px) scale(${isHovered ? 1.08 : 1})`,
              transition: `transform ${350 / springStiffness}s cubic-bezier(0.175, 0.885, 0.32, ${1 + springDamping / 40})`,
            }}
            className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20 cursor-pointer select-none flex items-center gap-3 active:scale-95"
          >
            <Sparkles className="w-5 h-5 animate-spin text-amber-300" style={{ animationDuration: '4s' }} />
            <div>
              <div className="font-display font-black text-sm">60fps Hardware Quad</div>
              <div className="font-mono text-[10px] text-white/80">transform: translate3d</div>
            </div>
          </div>
        </div>

        {/* Physics Controls */}
        <div className="w-full sm:w-64 space-y-3 font-mono text-xs">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[var(--text-muted)]">Stiffness:</span>
              <span className="font-bold text-[var(--text-primary)]">{springStiffness} N/m</span>
            </div>
            <input
              type="range"
              min="80"
              max="350"
              value={springStiffness}
              onChange={(e) => setSpringStiffness(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[var(--text-muted)]">Damping:</span>
              <span className="font-bold text-[var(--text-primary)]">{springDamping} Ns/m</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={springDamping}
              onChange={(e) => setSpringDamping(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-[var(--border-base)] flex items-center justify-between text-[10px]">
            <span className="text-[var(--text-muted)]">Frame Delta:</span>
            <span className="text-emerald-400 font-bold">16.6ms (100% 60fps)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
