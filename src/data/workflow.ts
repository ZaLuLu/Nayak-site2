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
    title: 'Discovery & Scoping',
    timeline: 'Week 0',
    badge: 'Planning',
    desc: 'We start with scoping calls to understand your product goals, data models, and user workflows. We establish clear deliverables, timeline milestones, and fixed pricing.',
    deliverables: ['Detailed Project Scope', 'Data Model & Architecture Plan', 'Mutual IP & Non-Disclosure Agreement'],
    iconName: 'FileCode',
  },
  {
    id: 'prototype',
    num: '02',
    title: 'Clickable Prototype',
    timeline: 'Week 1',
    badge: 'Design & UX',
    desc: 'We deploy an interactive prototype to a private staging URL. You can click through real screens, test interactions, and give feedback before backend logic is finalized.',
    deliverables: ['Private Staging URL', 'Interactive User Flow Review', 'Design System & Component Library'],
    iconName: 'Zap',
  },
  {
    id: 'build',
    num: '03',
    title: 'Core Development & Testing',
    timeline: 'Weeks 2–5',
    badge: 'Engineering',
    desc: 'We write clean, production-ready code with continuous deployments. We integrate authentication, databases, third-party APIs, and automated test suites.',
    deliverables: ['Full-Stack Production Application', 'Automated Test Suites', 'Weekly Working Demos & Slack Updates'],
    iconName: 'GitCommit',
  },
  {
    id: 'transfer',
    num: '04',
    title: 'Complete Handover & IP Ownership',
    timeline: 'Launch Week',
    badge: 'Ownership',
    desc: 'We transfer full repository access, cloud infrastructure, and environment variables directly to your organization. You own 100% of the code with zero lock-in.',
    deliverables: ['Full Git Repository Ownership', 'Cloud Deployment & Environment Transfer', 'Clean Documentation & Runbooks'],
    iconName: 'ShieldCheck',
  },
  {
    id: 'warranty',
    num: '05',
    title: 'Launch Support & Warranty',
    timeline: 'Post-Launch',
    badge: 'Support',
    desc: 'We stand behind everything we build. We provide 30 days of active post-launch support, monitoring, and fast bug triage so your public launch runs smoothly.',
    deliverables: ['30-Day Post-Launch Warranty', 'Error Monitoring & Health Checks', 'Team Onboarding Walkthrough'],
    iconName: 'Clock',
  },
]

