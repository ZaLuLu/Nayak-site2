export interface MilestoneStep {
  id: string
  num: string
  title: string
  timeline: string
  badge: string
  desc: string
  deliverables: string[]
  iconName: 'FileCode' | 'Zap' | 'GitCommit' | 'ShieldCheck' | 'Clock'
}

export const WORKFLOW_STEPS: MilestoneStep[] = [
  {
    id: 'discovery',
    num: '01',
    title: 'Architecture & Scoping',
    timeline: 'Step 1',
    badge: 'Planning',
    desc: 'We map out your data models, core workflows, and third-party integrations. We establish exact milestones, API contracts, and an agreed delivery timeline.',
    deliverables: ['System Architecture & Schema Specs', 'Milestone & Delivery Schedule', 'Mutual IP & Non-Disclosure Agreement'],
    iconName: 'FileCode',
  },
  {
    id: 'prototype',
    num: '02',
    title: 'Interactive Staging Demo',
    timeline: 'Step 2',
    badge: 'UX & Review',
    desc: 'We deploy an early working build to a private staging environment. You click through real screens, verify core interactions, and give feedback before full backend wiring.',
    deliverables: ['Live Staging URL', 'Interactive User Flow Review', 'Design System & UI Components'],
    iconName: 'Zap',
  },
  {
    id: 'build',
    num: '03',
    title: 'Production Build & Automated Tests',
    timeline: 'Step 3',
    badge: 'Engineering',
    desc: 'We build the full application in FastAPI, Next.js, and TypeScript. We hook up authentication, database schemas, background workers, and automated test suites.',
    deliverables: ['Full-Stack Production App', 'End-to-End & Integration Tests', 'Async Demos & Direct Chat Updates'],
    iconName: 'GitCommit',
  },
  {
    id: 'transfer',
    num: '04',
    title: 'Repository Handover & Cloud Setup',
    timeline: 'Step 4',
    badge: 'Ownership',
    desc: 'We hand over git repository ownership, cloud accounts, and environment secrets directly to your team. You own every line of code and every infrastructure asset.',
    deliverables: ['Full Git Repository Ownership', 'Production Cloud Infrastructure Setup', 'Architecture Docs & Runbooks'],
    iconName: 'ShieldCheck',
  },
  {
    id: 'warranty',
    num: '05',
    title: 'Launch Support & Monitoring',
    timeline: 'Step 5',
    badge: 'Support',
    desc: 'We stand by what we ship. We monitor performance, triage any unexpected bugs, and help your team get fully comfortable with the codebase.',
    deliverables: ['30-Day Post-Launch Support', 'Error Tracking & Health Monitoring', 'Handover Walkthrough Session'],
    iconName: 'Clock',
  },
]

