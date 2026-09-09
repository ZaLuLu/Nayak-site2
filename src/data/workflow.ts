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
    title: 'Architecture Blueprint & System Contracts',
    timeline: 'Phase 01',
    badge: 'Architecture',
    desc: 'Deep-dive into your data schema, API topology, latency budgets, and security boundaries. Bilateral NDA and IP transfer agreement executed before the first line of code.',
    deliverables: ['System Architecture Blueprint', 'OpenAPI 3.0 Specs & DB Schemas', 'Executed Bilateral IP Assignment'],
    iconName: 'FileCode',
  },
  {
    id: 'prototype',
    num: '02',
    title: 'Live Interactive Staging Deployment',
    timeline: 'Phase 02',
    badge: 'Verification',
    desc: 'We deploy an active interactive build to a private staging URL. You click through real screens and validate user flows before production backend logic is finalized.',
    deliverables: ['Live Staging URL Deployed', 'Interactive UX Feedback Review', 'Production API Contracts Locked'],
    iconName: 'Zap',
  },
  {
    id: 'build',
    num: '03',
    title: 'Core Engine Build & AI Graph Pipelines',
    timeline: 'Phase 03',
    badge: 'Core Engineering',
    desc: 'High-velocity production code. Distributed queues (BullMQ/Redis), agent orchestration graphs, vector search indexes, auth, billing, and automated CI/CD pipeline.',
    deliverables: ['Full-Stack Production Application', 'Self-Correcting LLM Pipelines', 'Test Suites & Load Telemetry'],
    iconName: 'GitCommit',
  },
  {
    id: 'transfer',
    num: '04',
    title: '100% IP, Cloud & Repository Transfer',
    timeline: 'Phase 04',
    badge: 'Ownership',
    desc: 'Complete handover of all repositories, secrets, Docker registries, and cloud infrastructure directly to your organization. Zero vendor lock-in or recurring agency fees.',
    deliverables: ['Git Commit History & Repository Ownership', 'Cloud Infrastructure & Secret Transfer', 'Technical Architecture Documentation'],
    iconName: 'ShieldCheck',
  },
  {
    id: 'warranty',
    num: '05',
    title: 'Active Launch Support & SLA Warranty',
    timeline: 'Post-Launch',
    badge: 'Reliability',
    desc: 'We stand by what we ship. Includes active post-launch bug triage, edge-case monitoring, and telemetry stabilization so your team launches with 100% confidence.',
    deliverables: ['Guaranteed Bug Fix SLA', 'Telemetry & Error Monitoring', 'Team Onboarding Walkthrough'],
    iconName: 'Clock',
  },
]
