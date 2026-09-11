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
    title: 'In-House Products',
    shortTitle: 'Products',
    tagline: 'Focused Tools for Builders & Learners',
    description: 'Software we build, launch, and maintain in-house. From interactive algorithm sandboxes to social scheduling tools, designed to make complex concepts simple.',
    route: '/products',
    badge: 'Our Tools',
    accentColor: '#8B5CF6',
    gradient: 'from-violet-500/20 to-purple-500/5',
    tags: ['#DeveloperTools', '#InteractiveNotes', '#Sandboxes', '#Algorithms'],
    metrics: [
      { label: 'Active Users', value: '4,200+' },
      { label: 'Open Source', value: 'MIT License' },
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
    tags: ['#WebApps', '#NextJS', '#PracticalAI', '#Automations'],
    metrics: [
      { label: 'Delivery Cycle', value: '2–6 Weeks' },
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
    title: '100% In-House',
    subtitle: 'Zero Outsourcing',
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

