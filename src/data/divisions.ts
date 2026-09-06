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
    tagline: 'In-House Platforms & Runtime Tools',
    description: 'In-house developer tooling, visual memory analyzers, and autonomous AI infrastructure built for zero latency.',
    route: '/products',
    badge: 'Flagship Core',
    accentColor: '#7C3AED', // Violet
    gradient: 'from-violet-500/20 to-purple-500/5',
    tags: ['#DeveloperTools', '#Runtimes', '#Observability', '#WebAssembly'],
    metrics: [
      { label: 'Latency', value: '<12ms' },
      { label: 'Uptime', value: '99.99%' },
    ],
    ctaText: 'Explore Products',
  },
  {
    id: 'services',
    letter: 'S',
    code: '02 · Services',
    title: 'Services (S)',
    shortTitle: 'Services',
    tagline: 'Bespoke Cloud & High-Velocity AI',
    description: 'Custom distributed systems, cloud microservices, and specialized applied AI engineering tailored to ambitious startups.',
    route: '/services',
    badge: 'Enterprise Architecture',
    accentColor: '#4338CA', // Indigo
    gradient: 'from-indigo-500/20 to-blue-500/5',
    tags: ['#DistributedSystems', '#CloudInfra', '#AppliedAI', '#Scalability'],
    metrics: [
      { label: 'Delivery', value: '2-4 Wks' },
      { label: 'Satisfaction', value: '100%' },
    ],
    ctaText: 'View Capabilities',
  },
  {
    id: 'academics',
    letter: 'A',
    code: '03 · Academics',
    title: 'Academics (A)',
    shortTitle: 'Academics',
    tagline: 'Engineering Fellowships & Direct Mentorship',
    description: '6-week intensive engineering fellowships and direct 1-on-1 architecture mentorship for high-aptitude developers.',
    route: '/academics',
    badge: 'Elite Fellowship',
    accentColor: '#0EA5E9', // Sky / Cyan
    gradient: 'from-cyan-500/20 to-sky-500/5',
    tags: ['#Fellowship', '#Architecture', '#FoundersDirect', '#12SeatsMax'],
    metrics: [
      { label: 'Cohort Size', value: '12 Max' },
      { label: 'Duration', value: '6 Weeks' },
    ],
    ctaText: 'Join Cohort',
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
    subtitle: 'Architect to Builder',
    color: 'var(--accent-tertiary)',
  },
  {
    iconName: 'Sparkles',
    title: 'Strict Cohort',
    subtitle: '12 Seats Max',
    color: 'var(--accent-primary)',
  },
]
