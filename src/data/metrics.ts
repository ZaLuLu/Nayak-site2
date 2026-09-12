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
    label: 'Code Ownership',
    value: '100%',
    subtext: 'Your Code & Cloud',
    detail: 'Complete repository and infrastructure handover. You own the code with zero vendor lock-in.',
  },
  {
    label: 'Direct Access',
    value: '0 Middlemen',
    subtext: 'Work with Builders',
    detail: 'No account managers or ticket routers. You work directly with the senior engineers building your software.',
  },
]

export const MANIFESTO_PARAGRAPHS = [
  {
    heading: 'Built for Real Production',
    body: 'We design every product with clean architecture, fast load times, and simple interfaces.',
  },
  {
    heading: 'Clean Code from Day One',
    body: 'Whether building our own developer tools or working with client teams, we write clean, well-tested code that teams can extend with confidence.',
  },
]

