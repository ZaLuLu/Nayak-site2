export interface MetricHighlight {
  label: string
  value: string
  subtext: string
  detail: string
}

export const STUDIO_METRICS: MetricHighlight[] = [
  {
    label: 'Learners & Builders',
    value: '12k+',
    subtext: 'Engineers Trained',
    detail: 'Engineers trained through our live cohorts, workshops, and open-source learning tools.',
  },
  {
    label: 'Shipped Software',
    value: '40+',
    subtext: 'Production Releases',
    detail: 'Full-stack web applications, AI integrations, and developer tools shipped to real users.',
  },
  {
    label: 'Full IP Ownership',
    value: '100%',
    subtext: 'Your Code & Cloud',
    detail: 'Complete repository and infrastructure handover. Zero vendor lock-in or recurring agency retainers.',
  },
  {
    label: 'Direct Founder Access',
    value: '0 Middlemen',
    subtext: 'Work with Builders',
    detail: 'No account managers or ticket routers. You collaborate directly with senior engineers building your software.',
  },
]

export const MANIFESTO_PARAGRAPHS = [
  {
    heading: 'Built for Real Users',
    body: 'We reject bloated codebases and bureaucratic development cycles. Every product we build is designed with clean architecture, fast load times, and simple interfaces.',
  },
  {
    heading: 'Craftsmanship from Day One',
    body: 'Whether building our own developer tools or working with client teams, we write clean, maintainable code that teams can own and extend with confidence.',
  },
]

