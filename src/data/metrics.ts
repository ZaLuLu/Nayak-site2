export interface MetricHighlight {
  label: string
  value: string
  subtext: string
  detail: string
}

export const STUDIO_METRICS: MetricHighlight[] = [
  {
    label: 'Edge Latency Target',
    value: '< 12ms',
    subtext: 'Global Edge Runtimes',
    detail: 'Distributed execution clusters deployed across 35+ global edge nodes with automated zero-downtime routing.',
  },
  {
    label: 'Architecture Uptime',
    value: '99.99%',
    subtext: 'High-Availability SLAs',
    detail: 'Self-healing Kubernetes topologies, multi-region database failover, and automated telemetry alerts.',
  },
  {
    label: 'Fellowship Cohort Cap',
    value: '12 Seats',
    subtext: 'Strict Selectivity',
    detail: 'High-bandwidth 1-on-1 architecture mentorship and weekly code reviews directly from studio founders.',
  },
  {
    label: 'Founders Direct',
    value: '0 Middlemen',
    subtext: 'Principal Engineering',
    detail: 'No account managers or ticket routers. Clients work directly with principal engineers who write and ship production code.',
  },
]

export const MANIFESTO_PARAGRAPHS = [
  {
    heading: 'Engineered for Radical Simplicity',
    body: 'We reject bloated frameworks and bureaucratic development cycles. Every system we build is designed with ruthless architectural precision, sub-50ms latency targets, and zero unnecessary runtime dependencies.',
  },
  {
    heading: 'From First Principles to Global Scale',
    body: 'Whether crafting developer sandboxes or architecting enterprise AI infrastructure, we write zero-waste code that runs anywhere without runtime lock-in.',
  },
]
