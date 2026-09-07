import React, { useState } from 'react'
import {
  Terminal,
  Cpu,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export interface CurriculumWeek {
  week: string
  title: string
  focus: string
  deliverable: string
  badge: string
  code: string
  testResult: string
  latency: string
  stack: string[]
}

export const CURRICULUM_DATA: CurriculumWeek[] = [
  {
    week: '01',
    title: 'Systems & TypeScript Architecture',
    focus: 'Advanced type systems, asynchronous event loops, and deterministic error boundaries.',
    deliverable: 'Type-Safe RPC Client with retry buffers',
    badge: 'Core Systems',
    code: `// Deterministic Type-Safe RPC with Exponential Backoff Buffer
export class SystemRPCClient<TSchema extends ContractSchema> {
  async execute<TMethod extends keyof TSchema>(
    method: TMethod, 
    payload: TSchema[TMethod]['input']
  ): Promise<Result<TSchema[TMethod]['output']>> {
    return this.circuitBreaker.run(() => this.transport.call(method, payload));
  }
}`,
    testResult: '✓ 18 unit tests passed · 0 type unsafe leaks detected',
    latency: '< 1.2ms',
    stack: ['TypeScript 5.6', 'Zod', 'Node.js', 'RPC'],
  },
  {
    week: '02',
    title: 'High-Throughput Backends & Queues',
    focus: 'Redis Streams, BullMQ task engines, and PostgreSQL indexing with PgBouncer.',
    deliverable: '5k events/sec Distributed Worker Engine',
    badge: 'Distributed Queues',
    code: `// High-Throughput Distributed Worker with Dead-Letter Guard
const eventWorker = new Worker('telemetry-queue', async (job) => {
  const { traceId, payload } = job.data;
  await batchInsertStream(traceId, payload);
}, { connection: redisPool, concurrency: 32 });

eventWorker.on('completed', (job) => metricTracker.recordAck(job.id));`,
    testResult: '✓ Benchmarked 5,400 evt/s with 0 dropped buffers',
    latency: '< 12ms p95',
    stack: ['BullMQ', 'Redis Streams', 'PostgreSQL', 'PgBouncer'],
  },
  {
    week: '03',
    title: 'Agentic AI & Vector Retrieval',
    focus: 'LangGraph multi-agent state graphs, Qdrant hybrid search, and deterministic tool schemas.',
    deliverable: 'Autonomous Code Sandbox Research Agent',
    badge: 'Applied AI',
    code: `// LangGraph Multi-Agent Supervisor Loop
const workflow = new StateGraph<AgentStateType>({ channels: stateChannels });

workflow.addNode('supervisor', supervisorNode);
workflow.addNode('code_sandbox', codeExecNode);
workflow.addNode('rag_retriever', qdrantSearchNode);
workflow.addConditionalEdges('supervisor', routingFn);`,
    testResult: '✓ 99.98% tool calling accuracy · 0 hallucinated schema errors',
    latency: '72ms TTFT',
    stack: ['LangGraph', 'Qdrant', 'FastAPI', 'Claude SDK'],
  },
  {
    week: '04',
    title: 'Kinetic Interfaces & Motion Systems',
    focus: 'Next.js 15 Server Components, 60fps GSAP timelines, and WCAG AA design systems.',
    deliverable: 'Hardware-Accelerated WebGL/Canvas Interface',
    badge: 'Kinetic UI/UX',
    code: `// Hardware-Accelerated 60fps Timeline Choreography
gsap.timeline({ scrollTrigger: { trigger: containerRef.current, scrub: 0.75, pin: true } })
  .to(stageOneRef.current, { scale: 1.15, filter: 'blur(10px)', opacity: 0, duration: 1 })
  .fromTo(stageTwoCardsRef.current, { y: 120, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 });`,
    testResult: '✓ 0 dropped frames · 100% WCAG AA contrast compliance',
    latency: '16.6ms / frame',
    stack: ['Next.js 15', 'GSAP 3', 'Canvas API', 'WebGL'],
  },
  {
    week: '05',
    title: 'Cloud Infrastructure & Observability',
    focus: 'Multi-stage Docker builds, GitHub Actions CI/CD, OpenTelemetry, and zero-trust auth.',
    deliverable: 'Automated Blue-Green Deployment Pipeline',
    badge: 'Cloud & Observability',
    code: `// Zero-Downtime Blue-Green Switcher & OpenTelemetry Collector
const tracer = trace.getTracer('production-ingress');
export async function handleIngressRequest(req: Request) {
  const span = tracer.startSpan('http_request_span');
  try {
    return await proxyToActiveColor(req);
  } finally {
    span.end();
  }
}`,
    testResult: '✓ 0 downtime deployment verified · Distributed traces active',
    latency: '99.99% SLA',
    stack: ['Docker', 'Terraform', 'OpenTelemetry', 'GitHub Actions'],
  },
  {
    week: '06',
    title: 'Full Capstone & Engineering Defense',
    focus: 'End-to-end production architecture sprint, stress benchmarking, and mentor code defense.',
    deliverable: 'Live Production AI Platform with Real Telemetry',
    badge: 'Capstone Defense',
    code: `// Live Capstone Release Telemetry
const capstoneManifest = {
  cohort: 'Fellowship Cohort 04',
  runtime: 'Distributed Edge + Autonomous AI Multi-Agent',
  benchmarks: { p99Latency: '14ms', availability: '100%', throughput: '12k req/s' },
  defenseStatus: 'APPROVED_FOR_PRODUCTION'
};`,
    testResult: '✓ Shipped to production · Mentors code review passed',
    latency: 'Production Live',
    stack: ['Full Production Stack', 'Live Telemetry', 'Bespoke Architecture'],
  },
]

interface CurriculumTerminalProps {
  activeWeekIndex?: number
  onSelectWeek?: (idx: number) => void
}

export function CurriculumTerminal({ activeWeekIndex, onSelectWeek }: CurriculumTerminalProps) {
  const [internalActiveWeek, setInternalActiveWeek] = useState(0)

  const activeIdx = activeWeekIndex !== undefined ? activeWeekIndex : internalActiveWeek
  const handleSelect = (idx: number) => {
    if (onSelectWeek) {
      onSelectWeek(idx)
    } else {
      setInternalActiveWeek(idx)
    }
  }

  const current = CURRICULUM_DATA[activeIdx]

  return (
    <div className="card-tactile p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xl overflow-hidden mb-12 select-none">
      {/* Terminal Titlebar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-[var(--border-base)]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base text-[var(--text-primary)]">
                Fellowship Code Lab & Deliverable Terminal
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[var(--accent-secondary)] border border-[var(--border-base)] font-bold">
                Live Shipped
              </span>
            </div>
            <p className="font-body text-xs text-[var(--text-secondary)]">
              Inspect real code implementations and verify architecture deliverables module by module.
            </p>
          </div>
        </div>

        {/* 6-Week Stepper Tabs */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
          {CURRICULUM_DATA.map((item, idx) => (
            <button
              key={item.week}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              W{item.week}
            </button>
          ))}
        </div>
      </div>

      {/* Main Terminal Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Code Inspector (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)]/80 border border-[var(--border-base)] font-mono">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--border-base)] text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[var(--text-primary)] font-bold">
                  src/modules/week_{current.week}_architecture.ts
                </span>
              </div>
              <span className="text-[10px] text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                {current.badge}
              </span>
            </div>

            {/* Code Block */}
            <pre className="text-xs text-[var(--text-secondary)] overflow-x-auto leading-relaxed py-2 font-mono selection:bg-sky-500 selection:text-white">
              <code>{current.code}</code>
            </pre>
          </div>

          {/* Verification Bar */}
          <div className="pt-3 mt-4 border-t border-[var(--border-base)] flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5 truncate">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{current.testResult}</span>
            </span>
            <span className="font-bold text-[var(--text-primary)] shrink-0 pl-2">
              {current.latency}
            </span>
          </div>
        </div>

        {/* Right Column: Module Overview & Deliverable Checklist (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-[var(--bg-surface)]/80 border border-[var(--border-base)]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider">
                WEEK {current.week} · CURRICULUM STAGE
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                Stage {activeIdx + 1} of 6
              </span>
            </div>

            <h4 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
              {current.title}
            </h4>

            <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              {current.focus}
            </p>

            {/* Deliverable Box */}
            <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] mb-5">
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Verified Module Deliverable
              </span>
              <div className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)] flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{current.deliverable}</span>
              </div>
            </div>

            {/* Stack Chips */}
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {current.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-base)] text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-muted)]">Cohort 04 Mentor Code Review</span>
            <span className="text-emerald-400 font-bold">PASSED ✓</span>
          </div>
        </div>
      </div>
    </div>
  )
}
