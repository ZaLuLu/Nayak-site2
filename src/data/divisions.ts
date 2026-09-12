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
    code: 'Products',
    title: 'Software Products',
    shortTitle: 'Products',
    tagline: 'Engineered Platforms for Modern Builders',
    description: 'High-performance products and platforms engineered for developers and teams. Interactive visual execution runtimes, spatial data meshes, and high-throughput tooling.',
    route: '/products',
    badge: 'Our Platforms',
    accentColor: '#8B5CF6',
    gradient: 'from-violet-500/20 to-purple-500/5',
    tags: ['#DeveloperTools', '#AlgorithmRuntime', '#EventMesh', '#Platform'],
    metrics: [
      { label: 'Active Users', value: '4,200+' },
      { label: 'Platform Availability', value: '99.9% Uptime' },
    ],
    ctaText: 'Explore Products',
  },
  {
    id: 'services',
    letter: 'S',
    code: 'Services',
    title: 'Software Development',
    shortTitle: 'Services',
    tagline: 'Senior Engineering Teams for Your Product',
    description: 'We design and build full-stack web applications, practical AI tools, and automated workflows. Shipped with clean architecture, tests, and complete IP ownership.',
    route: '/services',
    badge: 'Client Pods',
    accentColor: '#4F46E5',
    gradient: 'from-indigo-500/20 to-blue-500/5',
    tags: ['#WebApps', '#FastAPI', '#PracticalAI', '#Automations'],
    metrics: [
      { label: 'Delivery Cadence', value: 'Sprint-Based' },
      { label: 'Code Ownership', value: '100% Yours' },
    ],
    ctaText: 'View Services',
  },
  {
    id: 'academics',
    letter: 'A',
    code: 'Training',
    title: 'Engineering Programs',
    shortTitle: 'Training',
    tagline: 'Hands-On Programs Taught by Builders',
    description: 'Intensive, small-cohort engineering programs in systems design, full-stack craft, and applied AI. Taught live by practicing engineers who ship production code every day.',
    route: '/academics',
    badge: 'Live Cohorts',
    accentColor: '#0EA5E9',
    gradient: 'from-cyan-500/20 to-sky-500/5',
    tags: ['#SmallCohorts', '#LiveMentorship', '#RealProjects', '#CodeReviews'],
    metrics: [
      { label: 'Engineers Trained', value: '12,000+' },
      { label: 'Projects Shipped', value: '40+' },
    ],
    ctaText: 'View Curriculum',
  },
]

export const SCOPE_BADGES = [
  {
    iconName: 'Code2',
    title: 'Senior Engineering',
    subtitle: 'Deterministic Quality',
    color: 'var(--accent-primary)',
  },
  {
    iconName: 'Cpu',
    title: 'Practical AI',
    subtitle: 'Built for Production',
    color: 'var(--accent-secondary)',
  },
  {
    iconName: 'Layers',
    title: 'Direct Mentorship',
    subtitle: 'Learn from Builders',
    color: 'var(--accent-tertiary)',
  },
  {
    iconName: 'Sparkles',
    title: 'Working Code',
    subtitle: 'Shipped Weekly',
    color: 'var(--accent-primary)',
  },
]

