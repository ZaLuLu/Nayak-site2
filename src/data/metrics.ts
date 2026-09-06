export interface MetricHighlight {
  label: string
  value: string
  subtext: string
  detail: string
}

export const STUDIO_METRICS: MetricHighlight[] = [
  {
    label: 'Deployment Speed',
    value: '< 45s',
    subtext: 'Edge Global CDN',
    detail: 'Automated CI/CD pipelines deploying to 35+ global edge points in seconds.',
  },
  {
    label: 'Architecture Uptime',
    value: '99.99%',
    subtext: 'Continuous Reliability',
    detail: 'Self-healing Kubernetes clusters with automated multi-zone failovers.',
  },
  {
    label: 'Fellowship Placement',
    value: '100%',
    subtext: 'Elite Industry Roles',
    detail: 'Every graduate secures principal or senior engineering positions at Tier-1 tech firms.',
  },
  {
    label: 'Founders Direct',
    value: '0 Middlemen',
    subtext: 'High-Bandwidth Pairing',
    detail: 'You collaborate directly with principal systems engineers and architects from day one.',
  },
]

export const MANIFESTO_PARAGRAPHS = [
  {
    heading: 'Engineered for Radical Simplicity',
    body: 'We reject bloated frameworks and bureaucratic development cycles. Every system we build is designed with ruthless architectural precision, sub-100ms response targets, and clear ownership.',
  },
  {
    heading: 'From First Principles to Global Scale',
    body: 'Whether crafting developer sandboxes or architecting enterprise AI infrastructure, we write zero-waste code that runs anywhere without runtime lock-in.',
  },
]
