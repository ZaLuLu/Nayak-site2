export interface DivisionItem {
  id: string
  letter: string
  code: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  route: string
  badge: string
  accentColor: string
  gradient: string
  tags: string[]
  metrics: { label: string; value: string }[]
  ctaText: string
}

export const DIVISIONS: DivisionItem[] = [
  {
    id: 'products',
    letter: 'P',
    code: '01 · Products',
    title: 'Products (P)',
    shortTitle: 'Products',
    tagline: 'In-House Platforms & Autonomous Runtimes',
    description: 'Proprietary developer runtimes, low-latency visual memory profilers, and deterministic multi-agent execution engines built 100% in-house.',
    route: '/products',
    badge: 'Proprietary Core',
    accentColor: '#8B5CF6', // Royal Amethyst
    gradient: 'from-violet-500/20 to-purple-500/5',
    tags: ['#EventMesh', '#WebAssembly', '#AgentKernel', '#ZeroOverhead'],
    metrics: [
      { label: 'Latency', value: '< 8ms' },
      { label: 'Runtime Uptime', value: '99.99%' },
    ],
    ctaText: 'Explore Platforms',
  },
  {
    id: 'services',
    letter: 'S',
    code: '02 · Services',
    title: 'Services (S)',
    shortTitle: 'Services',
    tagline: 'Dedicated Engineering Pods & AI Architecture',
    description: 'Bespoke client pods delivering high-throughput cloud architectures, sub-millisecond microservices, and applied AI systems with strict production SLAs.',
    route: '/services',
    badge: 'Enterprise Pods',
    accentColor: '#4F46E5', // Sapphire Indigo
    gradient: 'from-indigo-500/20 to-blue-500/5',
    tags: ['#DistributedSystems', '#CloudInfra', '#AppliedAI', '#ProductionSLAs'],
    metrics: [
      { label: 'Sprint Cycle', value: '2-4 Wks' },
      { label: 'Code Handover', value: '100% IP' },
    ],
    ctaText: 'View Capabilities',
  },
  {
    id: 'academics',
    letter: 'A',
    code: '03 · Academics',
    title: 'Academics (A)',
    shortTitle: 'Academics',
    tagline: '6-Week Architecture Residency & Mentorship',
    description: 'Selective engineering fellowship capped at 12 engineers per cohort. Direct 1-on-1 architecture mentorship and live systems deployment with studio founders.',
    route: '/academics',
    badge: 'Selective Fellowship',
    accentColor: '#0EA5E9', // Sky Cyan
    gradient: 'from-cyan-500/20 to-sky-500/5',
    tags: ['#12SeatsMax', '#6Weeks', '#ArchitectureLab', '#DirectMentorship'],
    metrics: [
      { label: 'Cohort Cap', value: '12 Seats' },
      { label: 'Curriculum', value: '6 Weeks' },
    ],
    ctaText: 'Apply to Cohort',
  },
]

export const SCOPE_BADGES = [
  {
    iconName: 'Code2',
    title: '100% In-House',
    subtitle: 'Zero Outsourcing',
    color: 'var(--accent-primary)',
  },
  {
    iconName: 'Cpu',
    title: 'Applied AI',
    subtitle: 'Production Runtimes',
    color: 'var(--accent-secondary)',
  },
  {
    iconName: 'Layers',
    title: 'Direct Mentorship',
    subtitle: 'Principal to Builder',
    color: 'var(--accent-tertiary)',
  },
  {
    iconName: 'Sparkles',
    title: 'Selective Cohort',
    subtitle: '12 Seats Max',
    color: 'var(--accent-primary)',
  },
]
