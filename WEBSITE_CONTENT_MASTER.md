# Nayak Labs — Website Content Master & Copywriting Guide
> **Version:** 2.1 (Includes Cinematic Intro Sequence & Precision Motion Timings)  
> **How to use this file:** Edit the copy between the markdown quotes or codeblocks below. Each section includes strict **Parameters & Limits** (character counts, formatting constraints, animation durations, and grid rules) to ensure your changes never break responsiveness, card alignments, or kinetic transitions across Desktop, Tablet, and Mobile. Once updated, share this file back to apply the new content seamlessly!

---

## 📋 Quick Parameter Legend & Design Rules

| Parameter Badge | Meaning & Impact on Design |
| :--- | :--- |
| `[CHAR LIMIT: Min-Max]` | Recommended character length (including spaces) so text stays balanced and avoids awkward line wrapping. |
| `[TIMING: Xs / Yms]` | Animation and display duration. Modifying phrase lengths may require tweaking these durations in code. |
| `[GRID COUNT: N]` | Number of items rendered in a grid (e.g. 3 columns, 4 badges). Adding/removing items changes grid symmetry. |
| `[FORMAT]` | Strict casing (e.g. `UPPERCASE MONO`, `Title Case`, `Sentence case`). |
| `[ACCENT PERIOD]` | Titles end with an active glowing period `.` that cycles accent colors in the theme engine. |

---

# SECTION 0: Flagship Cinematic Intro Sequence
*File: `src/components/intro/IntroSequence.tsx`*  
*Scope: Active exclusively on Desktop & Laptop (screen width >= 1024px, non-touch). Automatically bypassed on Mobile and Tablet for 0-latency instant access. Can be replayed anytime via navigation.*

### 0.1 Global Sequence Duration & Behavior
* **Total Intro Runtime:** `~3.85s – 4.10s` (from black screen to full hero reveal)
* **Skip Triggers:** Click anywhere on screen, click `SKIP [ESC]`, or press the `Escape` key (instant `0.35s` shutter exit).
* **Session Storage Key:** `nayak_intro_seen_v2` (only plays automatically once per browser session).

### 0.2 Telemetry HUD Overlays & Skip Button
* **Top Spatial Telemetry HUD:**
  * **Text:** `LAT 12.9716° N · LNG 77.5946° E // NAYAK LABS RUNTIME` `[CHAR LIMIT: 40-55]` `[FORMAT: UPPERCASE MONO]`
  * **Animation Timing:** Fades in at `t = 0.15s` (duration: `0.40s`, ease: `power2.out`), fades out at `t = 3.10s` (duration: `0.15s`).
* **Bottom Spatial Telemetry HUD:**
  * **Text:** `AUTONOMOUS RUNTIMES · SWISS CODE · 2026` `[CHAR LIMIT: 30-45]` `[FORMAT: UPPERCASE MONO]`
  * **Animation Timing:** Static on bottom panel, slides down with lower shutter panel at `t = 3.45s`.
* **Skip Button:**
  * **Label:** `SKIP [ESC] →` `[CHAR LIMIT: 10-15]` `[FORMAT: UPPERCASE MONO]`
  * **Animation Timing:** Fades in at `t = 0.10s` (duration: `0.30s`), fades out at `t = 3.10s` (duration: `0.15s`).

### 0.3 Kinetic Optical Typography Progression
*Two sequential typographic phrases rendered in optical rack-focus blur and scale:*

* **Phrase 01:**
  * **Text:** `"No pitch. Just proof."` `[CHAR LIMIT: 16-28]` `[FORMAT: Title Case / Sentence case]`
  * **Phase Timings `[TOTAL: 1.55s]`:**
    1. *Rack-Focus Fade In (scale 1.08 → 1.0, blur 14px → 0px, y 16 → 0):* `0.55s` (`expo.out`)
    2. *Readability Hold & Gaze Window:* `0.65s`
    3. *Dissolve Out (scale 1.0 → 0.95, blur 0px → 10px, y 0 → -12):* `0.35s` (`power2.inOut`)

* **Phrase 02:**
  * **Text:** `"Software Without Shortcuts."` `[CHAR LIMIT: 20-34]` `[FORMAT: Title Case]`
  * **Phase Timings `[TOTAL: 1.50s]`:**
    1. *Rack-Focus Fade In (scale 1.08 → 1.0, blur 14px → 0px, y 16 → 0):* `0.55s` (`expo.out`)
    2. *Readability Hold & Gaze Window:* `0.65s`
    3. *Dissolve Out (scale 1.0 → 0.95, blur 0px → 10px, y 0 → -12):* `0.30s` (`power2.inOut`)

### 0.4 Shutter Separation & Hero Handoff Stage
* **Step 1: Chromatic Laser Seam Expansion:** Expands horizontal beam from center at `t = 3.15s` (duration: `0.35s`, ease: `power4.out`).
* **Step 2: Bloom Specular Flash:** Flashes white bloom at `t = 3.25s` (duration: `0.25s`, peak opacity: `0.25`).
* **Step 3: Dual Shutter Separation:** Top panel slides up (`-100%`) and bottom panel slides down (`+100%`) at `t = 3.45s` (duration: `0.65s`, ease: `power4.inOut`).
* **Step 4: Hero Physics Trigger:** Handoff signal fires at `t = 3.85s` (`0.25s` before shutters finish separating), waking the bouncing kinetic accent dot on the homepage hero seamlessly.

---

# SECTION 1: Global Navigation Bar & Header
*Appears across all pages: Desktop (`Navbar.tsx`), Tablet (`TabletNavbar.tsx`), Mobile (`MobileNavbar.tsx`)*

### 1.1 Brand Logo & Wordmark
* **Wordmark:** `Nayak Labs.` `[CHAR LIMIT: 8-14]` `[FORMAT: Title Case + Accent Period]`
* **Status Jewel:** Glowing accent dot (Cycles with active theme engine)
* **Hover Micro-interaction:** `0.20s` opacity transition (`1.0 → 0.85`)

### 1.2 Navigation Links `[COUNT: 4 links + 1 CTA]`
* **Link 01:**
  * **Number:** `01` `[FORMAT: 2-digit number]`
  * **Label:** `Products` `[CHAR LIMIT: 6-12]`
  * **Target Route:** `/products`
* **Link 02:**
  * **Number:** `02`
  * **Label:** `Services` `[CHAR LIMIT: 6-12]`
  * **Target Route:** `/services`
* **Link 03:**
  * **Number:** `03`
  * **Label:** `Academics` `[CHAR LIMIT: 6-12]`
  * **Target Route:** `/academics`
* **Link 04:**
  * **Number:** `04`
  * **Label:** `Workflow` `[CHAR LIMIT: 6-12]`
  * **Target Route:** `/#why-us`

### 1.3 Action Buttons
* **Desktop/Laptop CTA Button:** `Connect` `[CHAR LIMIT: 6-10]` `[FORMAT: Title Case]`
  * *Hover Animation Timing:* `0.20s` scale transition (`1.0 → 1.02`), `0.20s` arrow translation (`+2px`).
* **Mobile Drawer CTA Button:** `Initiate contact` `[CHAR LIMIT: 12-20]`
* **Mobile Subline:** `NayakLabs // Mobile V2.6 — 0 Middlemen`

---

# SECTION 2: Homepage (`/`)

## 2.1 Hero Section
*Main landing fold on Desktop (`Hero3D.tsx`), Tablet (`TabletHero.tsx`), and Mobile (`MobileHero.tsx`)*

### Top Kicker & Studio Badges
* **Studio Kicker Badge:** `Digital Architecture & Research Studio` `[CHAR LIMIT: 24-40]` `[FORMAT: UPPERCASE/Title Case]`
* **Tablet Founder Badge:** `NAYAK LABS // FOUNDED & DIRECTED BY NAWAZ NAYAK` `[CHAR LIMIT: 30-50]` `[FORMAT: UPPERCASE MONO]`
* **Live Runtime Status Badge:** `Autonomous Runtimes Online` `[CHAR LIMIT: 20-32]`

### Monumental Headline & Subtitles
* **Main Monumental Wordmark:** `Nayak Labs.` `[ACCENT PERIOD: Required]`
* **Kinetic Ball Bounce Timing (Desktop):** 6 damped physical bounces over `2.40s` settling onto rest position beside "Nayak Labs".
* **Studio Tagline:** `Digital Systems Architecture & Applied AI Laboratory.` `[CHAR LIMIT: 40-65]`
* **Editorial Subtitle Paragraph:** `[CHAR LIMIT: 120-220]`
  > "Digital architecture and applied research studio. Building in-house platforms, custom cloud systems, and high-velocity engineering fellowships."
* **Founder Attribution Pill (Mobile):** `Nawaz Nayak · Principal Pod` `[CHAR LIMIT: 20-35]`

### 4 Telemetry / Scope Badges `[GRID COUNT: 4]`
*Rendered in 2x2 grid on Mobile / 4-column bar on Tablet & Desktop*
* **Badge 01:**
  * **Title:** `100% In-House` `[CHAR LIMIT: 10-16]` `[FORMAT: Title Case]`
  * **Subtitle:** `Zero Outsourcing` `[CHAR LIMIT: 12-20]`
* **Badge 02:**
  * **Title:** `Applied AI` `[CHAR LIMIT: 10-16]`
  * **Subtitle:** `Production Runtimes` `[CHAR LIMIT: 12-20]`
* **Badge 03:**
  * **Title:** `Direct Mentorship` `[CHAR LIMIT: 10-16]`
  * **Subtitle:** `Architect to Builder` `[CHAR LIMIT: 12-20]`
* **Badge 04:**
  * **Title:** `Strict Cohort` `[CHAR LIMIT: 10-16]`
  * **Subtitle:** `12 Seats Max` `[CHAR LIMIT: 12-20]`

---

## 2.2 Core Divisions / Pillar Stack (P, S, A)
*Section IDs: `#products`, `#services`, `#academics`*

### Division 01: Products (P)
* **Eyebrow:** `01 · Products (P) · In-house platforms & runtimes`
* **Section Headline:** `What we build when no one’s watching.` `[CHAR LIMIT: 30-48]`
* **Section Paragraph:** `[CHAR LIMIT: 120-200]`
  > "We engineer autonomous runtime telemetry, visual developer sandboxes, and 3D indexing tools used by technical teams worldwide. 100% free, production-tested, and open source."
* **Tags `[COUNT: 3-4]`:** `#DeveloperTools`, `#Runtimes`, `#Observability`, `#WebAssembly`
* **Metrics `[COUNT: 2]`:**
  * Metric 1: Label: `Latency` | Value: `<12ms`
  * Metric 2: Label: `Uptime` | Value: `99.99%`
* **CTA Button Text:** `Explore Products` `[CHAR LIMIT: 14-20]`

### Division 02: Services (S)
* **Eyebrow:** `02 · Services (S) · Engineering capabilities`
* **Section Headline:** `Software built with absolute engineering rigor.` `[CHAR LIMIT: 30-48]`
* **Section Paragraph:** `[CHAR LIMIT: 120-200]`
  > "We partner with venture-backed tech founders and product teams to architect, code, and deploy production AI pipelines and high-scale full-stack applications."
* **Tags `[COUNT: 3-4]`:** `#DistributedSystems`, `#CloudInfra`, `#AppliedAI`, `#Scalability`
* **Metrics `[COUNT: 2]`:**
  * Metric 1: Label: `Delivery` | Value: `2-4 Wks`
  * Metric 2: Label: `Satisfaction` | Value: `100%`
* **CTA Button Text:** `View Capabilities` `[CHAR LIMIT: 14-20]`

### Division 03: Academics (A)
* **Eyebrow:** `03 · Academics (A) · Engineering fellowship academy`
* **Section Headline:** `Skip the tutorials. Ship the real thing.` `[CHAR LIMIT: 30-48]`
* **Section Paragraph:** `[CHAR LIMIT: 120-200]`
  > "An elite 6-week intensive engineering cohort for serious developers. Strictly 12 seats. Direct architectural mentorship, weekly live code reviews, and production software deployed by Week 6."
* **Tags `[COUNT: 3-4]`:** `#Fellowship`, `#Architecture`, `#FoundersDirect`, `#12SeatsMax`
* **Metrics `[COUNT: 2]`:**
  * Metric 1: Label: `Cohort Size` | Value: `12 Max`
  * Metric 2: Label: `Duration` | Value: `6 Weeks`
* **CTA Button Text:** `Join Cohort` `[CHAR LIMIT: 14-20]`

---

## 2.3 Ambient Ribbon Marquee #1
*Full-width curved kinetic text loop across Desktop & Tablet*
* **Scroll Speed:** `0.065 pixels/frame` (~`14.0s` for full phrase wrap on 1920px screen).
* **Hover Acceleration:** `1.4x` speed boost on mouse hover.
* **Marquee String:** `[FORMAT: ALL CAPS + BULLET SEPARATORS]`
  > `RAPID PROTOTYPING • ARCHITECTURE DESIGN • APPLIED AI RESEARCH • PRODUCTION READY • HIGH VELOCITY • `

---

## 2.4 Studio Manifesto & Ethos (`#about`)
*Act 3: Studio conviction and operational model*

* **Eyebrow:** `05 · Studio manifesto · Engineering ethos`
* **Headline:** `We believe modern software engineering is held back by bloated agency retainers, fragmented contractors, and endless slide decks.` `[CHAR LIMIT: 100-140]`
* **Description Paragraph:** `[CHAR LIMIT: 160-240]`
  > "Nayak Labs operates as a high-velocity product studio. We partner directly with technical founders to architect, build, and deploy production software—delivering verifiable outcomes with zero intermediaries."

### 3 Core Ethos Tiles `[GRID COUNT: 3]`
* **Tile 01:**
  * **Title:** `Working Code First` `[CHAR LIMIT: 14-22]`
  * **Description:** `Working software over slide decks. Verified benchmarks over roadmaps.` `[CHAR LIMIT: 60-90]`
* **Tile 02:**
  * **Title:** `100% IP Ownership` `[CHAR LIMIT: 14-22]`
  * **Description:** `Complete repository, cloud infrastructure, and architectural ownership.` `[CHAR LIMIT: 60-90]`
* **Tile 03:**
  * **Title:** `Direct Founder Access` `[CHAR LIMIT: 14-22]`
  * **Description:** `Direct architect-to-builder collaboration with no account managers.` `[CHAR LIMIT: 60-90]`

### Studio Conviction Quote & CTA Card
* **Kicker:** `Studio conviction`
* **Quote:** `"Great engineering does not need to justify itself with hype. It proves itself the moment you test the software."` `[CHAR LIMIT: 90-130]`
* **Card CTA Button:** `Explore services` `[CHAR LIMIT: 14-20]`

---

## 2.5 Engineering Lifecycle & Milestones (`#why-us`)
*Act 4: 5-Phase interactive delivery roadmap*

* **Eyebrow:** `04 · Why choose us · Engineering lifecycle`
* **Headline:** `Linear precision. Zero ambiguity.` `[CHAR LIMIT: 24-40]`
* **Subtitle:** `Every deliverable is locked, tested, and verified before the next begins. Click through the 5 milestones below to inspect our engineering roadmap.` `[CHAR LIMIT: 120-170]`

### 5 Linear Milestones `[COUNT: 5]`
* **Milestone 01:**
  * **Phase:** `Phase 01` | **Number:** `01` | **Badge:** `Architecture`
  * **Title:** `Discovery & System Contracts` `[CHAR LIMIT: 24-36]`
  * **Description:** `Deep-dive into your data schema, API topology, latency budgets, and security boundaries. Bilateral NDA and IP transfer agreement executed before the first line of code.` `[CHAR LIMIT: 140-190]`
  * **Deliverables `[COUNT: 3]`:**
    1. `System Architecture Blueprint`
    2. `OpenAPI 3.0 Specs & DB Schemas`
    3. `Executed Bilateral IP Assignment`

* **Milestone 02:**
  * **Phase:** `Phase 02` | **Number:** `02` | **Badge:** `Verification`
  * **Title:** `Live Clickable Prototype` `[CHAR LIMIT: 24-36]`
  * **Description:** `We deploy an active interactive build to a private staging URL. You click through real screens and validate user flows before production backend logic is finalized.` `[CHAR LIMIT: 140-190]`
  * **Deliverables `[COUNT: 3]`:**
    1. `Live Staging URL Deployed`
    2. `Interactive UX Feedback Review`
    3. `Production API Contracts Locked`

* **Milestone 03:**
  * **Phase:** `Phase 03` | **Number:** `03` | **Badge:** `Core Engineering`
  * **Title:** `Production Build & AI Pipelines` `[CHAR LIMIT: 24-36]`
  * **Description:** `High-velocity production code. Distributed queues (BullMQ/Redis), agent orchestration graphs, vector search indexes, auth, billing, and automated CI/CD pipeline.` `[CHAR LIMIT: 140-190]`
  * **Deliverables `[COUNT: 3]`:**
    1. `Full-Stack Production Application`
    2. `Self-Correcting LLM Pipelines`
    3. `Test Suites & Load Telemetry`

* **Milestone 04:**
  * **Phase:** `Phase 04` | **Number:** `04` | **Badge:** `Ownership`
  * **Title:** `100% IP & Asset Transfer` `[CHAR LIMIT: 24-36]`
  * **Description:** `Complete handover of all repositories, secrets, Docker registries, and cloud infrastructure directly to your organization. Zero vendor lock-in or recurring agency fees.` `[CHAR LIMIT: 140-190]`
  * **Deliverables `[COUNT: 3]`:**
    1. `Git Commit History & Repository Ownership`
    2. `Cloud Infrastructure & Secret Transfer`
    3. `Technical Architecture Documentation`

* **Milestone 05:**
  * **Phase:** `Phase 05` | **Number:** `05` | **Badge:** `Warranty`
  * **Title:** `Post-Launch Warranty & Support` `[CHAR LIMIT: 24-36]`
  * **Description:** `We stand by what we ship. Includes active post-launch bug triage, edge-case monitoring, and telemetry stabilization so your team launches with 100% confidence.` `[CHAR LIMIT: 140-190]`
  * **Deliverables `[COUNT: 3]`:**
    1. `Guaranteed Bug Fix SLA`
    2. `Telemetry & Error Monitoring`
    3. `Team Onboarding Walkthrough`

---

## 2.6 Public Build Logs & Dispatches (`#social`)
*Act 5: 3D Perspective interactive carousel (Desktop/Tablet)*
* **Carousel Autoplay Interval:** `6.0s` cycle interval per card (automatically pauses on hover or drag).
* **Card Drag Sensitivity:** Smooth 3D tilt response with spring back (`0.45s` settle time).

* **Eyebrow:** `06 · Community & dispatch · Social`
* **Headline:** `Public build logs & dispatches.` `[CHAR LIMIT: 24-40]`
* **Subtitle:** `Real-time engineering updates, architecture breakdowns, and telemetry snapshots directly from our lab.` `[CHAR LIMIT: 90-130]`

### 6 Dispatch Cards `[COUNT: 6]`
* **Dispatch 01:**
  * **Tag:** `#AgenticAI` | **Category:** `Autonomous Systems` | **Date:** `2 DAYS AGO`
  * **Title:** `Multi-Agent State Routing: Resolving Non-Deterministic Cyclic Loops` `[CHAR LIMIT: 55-75]`
  * **Excerpt:** `Designing hierarchical supervisor graphs with deterministic checkpoint state recovery, fallback models, and human-in-the-loop review nodes.` `[CHAR LIMIT: 110-150]`
  * **Metric:** `99.4% Task Convergence` | **Author:** `Nayak Labs Systems Pod`

* **Dispatch 02:**
  * **Tag:** `#DistributedQueues` | **Category:** `Core Infrastructure` | **Date:** `5 DAYS AGO`
  * **Title:** `Benchmarking Redis Streams vs BullMQ: Sub-12ms p95 Under Concurrent Ingestion` `[CHAR LIMIT: 55-75]`
  * **Excerpt:** `Profiling memory allocation and event-loop microtasks when ingesting 5,000 concurrent streaming jobs across distributed worker pools.` `[CHAR LIMIT: 110-150]`
  * **Metric:** `11.8ms p95 Latency` | **Author:** `Telemetry & Infra Pod`

* **Dispatch 03:**
  * **Tag:** `#KineticUI` | **Category:** `Design Engineering` | **Date:** `1 WEEK AGO`
  * **Title:** `Frosted Pleated Glass & Liquid Shader Tokens: Specular Depth in CSS` `[CHAR LIMIT: 55-75]`
  * **Excerpt:** `Architecting dynamic refraction borders, backdrop saturation, and zero-jank 60fps GSAP timelines across both light and dark operating modes.` `[CHAR LIMIT: 110-150]`
  * **Metric:** `60fps Hardware Accelerated` | **Author:** `Kinetic Design Pod`

* **Dispatch 04:**
  * **Tag:** `#EngineeringFellowship` | **Category:** `Academy & R&D` | **Date:** `2 WEEKS AGO`
  * **Title:** `Fellowship Cohort 04: 12 Builders Shipping Production Autonomous Engines` `[CHAR LIMIT: 55-75]`
  * **Excerpt:** `Behind the scenes of our 6-week intensive engineering cohort. Live code reviews, weekly architectural defenses, and zero tutorial fluff.` `[CHAR LIMIT: 110-150]`
  * **Metric:** `12 / 12 Seats Assigned` | **Author:** `Nayak Labs Academy`

* **Dispatch 05:**
  * **Tag:** `#OpenSource` | **Category:** `Open Research` | **Date:** `3 WEEKS AGO`
  * **Title:** `EventMesh 3D Radar v2.0: Real-Time Global Technology Summit Tracking` `[CHAR LIMIT: 55-75]`
  * **Excerpt:** `Open source 3D Canvas engine tracking developer summits, AI hackathons, and national tech hubs with zero external map library overhead.` `[CHAR LIMIT: 110-150]`
  * **Metric:** `100% Free & Open Source` | **Author:** `Open Technical Research`

* **Dispatch 06:**
  * **Tag:** `#ModelInference` | **Category:** `Edge AI` | **Date:** `1 MONTH AGO`
  * **Title:** `Sub-50ms Edge Speculative Decoding on Heterogeneous Hardware` `[CHAR LIMIT: 55-75]`
  * **Excerpt:** `Deploying small draft models alongside quantized 70B parameters to triple generation throughput on edge workstations with zero cloud roundtrip.` `[CHAR LIMIT: 110-150]`
  * **Metric:** `3.2x Throughput Gain` | **Author:** `Applied Machine Intelligence`

---

## 2.7 Ambient Ribbon Marquee #2
*Full-width curved kinetic text loop across Desktop & Tablet*
* **Scroll Speed:** `0.065 pixels/frame` (moving Right to Left).
* **Marquee String:** `[FORMAT: ALL CAPS + BULLET SEPARATORS]`
  > `AUTONOMOUS RUNTIMES • ZERO BLOAT SYSTEMS • FULL STACK ARCHITECTURES • FOUNDERS DIRECT • `

---

## 2.8 Direct Founders Contact (`#contact`)
*Act 6: Communication and project inquiries fold*

* **Eyebrow:** `06 · Get in touch · Direct access`
* **Headline:** `Let’s build together.` `[CHAR LIMIT: 18-30]`
* **Subtitle:** `No endless automated forms or agency account managers. Reach out directly through any of our official communication channels.` `[CHAR LIMIT: 100-140]`

### 3 Official Direct Channels `[GRID COUNT: 3]`
* **Channel 01: Email**
  * **Name:** `Gmail / Direct Email`
  * **Handle:** `hello@nayaklabs.com`
  * **Badge:** `Direct founder inbox · <12h SLA` `[CHAR LIMIT: 24-36]`
  * **Description:** `Send an inquiry directly to the founder engineering inbox. Ideal for custom technical reviews, architecture scopes, and enterprise builds.` `[CHAR LIMIT: 110-150]`
  * **Action CTA:** `Compose in Gmail / Email`

* **Channel 02: LinkedIn**
  * **Name:** `LinkedIn / Founder Network`
  * **Handle:** `Nayak Labs / Nawaz Nayak`
  * **Badge:** `Founder profile · Direct DM` `[CHAR LIMIT: 24-36]`
  * **Description:** `Connect directly with Nawaz Nayak on LinkedIn for advisory discussions, technical partnerships, and fellowship inquiries.` `[CHAR LIMIT: 110-150]`
  * **Action CTA:** `Connect on LinkedIn`

* **Channel 03: Instagram**
  * **Name:** `Instagram / Build Logs`
  * **Handle:** `@nayaklabs`
  * **Badge:** `Live stories & prototypes` `[CHAR LIMIT: 24-36]`
  * **Description:** `Follow our real-time laboratory updates, kinetic UI motion teasers, and daily engineering build logs.` `[CHAR LIMIT: 110-150]`
  * **Action CTA:** `Follow @nayaklabs`

---

# SECTION 3: Products Page (`/products`)

### 3.1 Header Banner
* **Kicker:** `In-House Platforms & Interactive Runtimes`
* **Headline:** `What we build when no one’s watching.` `[ACCENT PERIOD: Required]`
* **Subtitle:** `Open-source developer tooling, interactive algorithm engines, and global telemetry platforms engineered with zero bloat.` `[CHAR LIMIT: 100-140]`

### 3.2 Product 01: DI Notes Sorting Visualizer
* **Code:** `01` | **Category:** `Developer Tooling` | **Version:** `v2.5 Stable`
* **Title:** `DI Notes Sorting Visualizer` `[CHAR LIMIT: 24-35]`
* **Tagline:** `Interactive Runtime Memory & Sorting Algorithm Engine` `[CHAR LIMIT: 45-65]`
* **Description:** `A visual execution engine for data structures and sorting algorithms. Step forward, inspect runtime comparisons and pointer swaps, and duel QuickSort, MergeSort, and HeapSort in real time.` `[CHAR LIMIT: 160-220]`
* **Key Features `[COUNT: 4]`:**
  1. `Interactive QuickSort, MergeSort & Binary Search step-by-step array tracers.`
  2. `Real-time comparison pointers and swap telemetry with O(N log N) analysis.`
  3. `Zero-latency browser runtime with dynamic speed controls and code tracing.`
  4. `Speed benchmark duel mode comparing algorithms on randomized memory states.`
* **Metrics `[COUNT: 3]`:**
  * Metric 1: Label: `Developers` | Value: `4,200+`
  * Metric 2: Label: `Latency` | Value: `< 2ms`
  * Metric 3: Label: `License` | Value: `MIT Open`
* **Tags `[COUNT: 4]`:** `#SortingAlgorithms`, `#QuickSort`, `#BinarySearch`, `#MemoryTrace`
* **GitHub Link:** `https://github.com/ZaLuLu/nayaklabs-site`

### 3.3 Product 02: EventMesh 3D Radar
* **Code:** `02` | **Category:** `Distributed Systems & AI` | **Version:** `v3.0 Core`
* **Title:** `EventMesh 3D Radar` `[CHAR LIMIT: 24-35]`
* **Tagline:** `Global Event Distribution & Microservice Latency Tracker` `[CHAR LIMIT: 45-65]`
* **Description:** `Interactive rotatable 3D WebGL globe telemetry monitor. Track developer summits, AI hackathons, and archive benchmarks across major tech hubs worldwide with real-time city targeting.` `[CHAR LIMIT: 160-220]`
* **Key Features `[COUNT: 4]`:**
  1. `Interactive 3D Cobe WebGL globe with smooth touch/mouse rotation and zoom.`
  2. `Dynamic city pinpoint targeting with automatic camera lock and orientation.`
  3. `Category-based filtering across Hackathons, AI Summits, and Workshops.`
  4. `Live attendee counters, architectural track tags, and telemetry pass access.`
* **Metrics `[COUNT: 3]`:**
  * Metric 1: Label: `Active Hubs` | Value: `7 Major Hubs`
  * Metric 2: Label: `Attendees` | Value: `7,000+`
  * Metric 3: Label: `Avg Latency` | Value: `< 14ms`
* **Tags `[COUNT: 4]`:** `#3DGlobe`, `#WebGL`, `#AISummits`, `#EdgeTelemetry`
* **GitHub Link:** `https://github.com/ZaLuLu/nayaklabs-site`

---

# SECTION 4: Services Page (`/services`)

### 4.1 Header Banner
* **Kicker:** `Engineering Capabilities & Custom Architecture`
* **Headline:** `Software built with absolute engineering rigor.` `[ACCENT PERIOD: Required]`
* **Subtitle:** `We partner directly with funded startups, technical founders, and scale-ups to architect and ship production distributed systems and applied AI models.` `[CHAR LIMIT: 130-180]`

### 4.2 4 Core Service Pillars `[GRID COUNT: 4]`
* **Pillar 01:**
  * **Number:** `01` | **Icon:** `Bot`
  * **Title:** `Autonomous AI & Retrieval Architecture` `[CHAR LIMIT: 35-48]`
  * **Subtitle:** `Production agentic workflows that reason, execute deterministic tools, and ground on private data.` `[CHAR LIMIT: 80-110]`
  * **Capabilities `[COUNT: 2]`:**
    1. `Multi-agent graph topologies with LangGraph cyclic error recovery.`
    2. `Hybrid semantic vector retrieval with reranking (Qdrant, pgvector).`
  * **Stack Tags `[COUNT: 5]`:** `LangGraph`, `FastAPI`, `Qdrant`, `Claude SDK`, `Python`
  * **Metric:** `< 80ms` | **Metric Label:** `Streaming TTFT`

* **Pillar 02:**
  * **Number:** `02` | **Icon:** `Globe`
  * **Title:** `High-Scale Web & Edge Systems` `[CHAR LIMIT: 35-48]`
  * **Subtitle:** `Type-safe platforms engineered with modern Server Components, edge caching, and automated failover.` `[CHAR LIMIT: 80-110]`
  * **Capabilities `[COUNT: 2]`:**
    1. `Next.js 15 platforms with streaming SSR and strict TypeScript.`
    2. `PostgreSQL schema optimization with PgBouncer connection pooling.`
  * **Stack Tags `[COUNT: 5]`:** `Next.js 15`, `TypeScript`, `PostgreSQL`, `Tailwind`, `Redis`
  * **Metric:** `99.99%` | **Metric Label:** `Uptime SLA`

* **Pillar 03:**
  * **Number:** `03` | **Icon:** `Database`
  * **Title:** `Distributed Queues & Real-Time Data` `[CHAR LIMIT: 35-48]`
  * **Subtitle:** `High-throughput asynchronous task workers, bi-directional WebSockets, and resilient sync pipelines.` `[CHAR LIMIT: 80-110]`
  * **Capabilities `[COUNT: 2]`:**
    1. `Asynchronous task queues processing 5k+ events/sec (BullMQ).`
    2. `Low-latency WebSockets and automated dead-letter recovery.`
  * **Stack Tags `[COUNT: 5]`:** `Go`, `Node.js`, `Redis Streams`, `BullMQ`, `Docker`
  * **Metric:** `< 15ms` | **Metric Label:** `p95 Latency`

* **Pillar 04:**
  * **Number:** `04` | **Icon:** `Palette`
  * **Title:** `Kinetic UI/UX & Motion Systems` `[CHAR LIMIT: 35-48]`
  * **Subtitle:** `Digital surfaces engineered with 60fps hardware-accelerated motion and strict WCAG AA standards.` `[CHAR LIMIT: 80-110]`
  * **Capabilities `[COUNT: 2]`:**
    1. `Hardware-accelerated 60fps GSAP timelines and Canvas visualizers.`
    2. `Bespoke design systems with unified typographic and color tokens.`
  * **Stack Tags `[COUNT: 4]`:** `GSAP 3`, `Canvas API`, `Design Tokens`, `Figma`
  * **Metric:** `60fps` | **Metric Label:** `Fluid Motion`

---

# SECTION 5: Academics Page (`/academics`)

### 5.1 Header Banner & Stat Wells
* **Kicker:** `Engineering Fellowship & Academy`
* **Headline:** `Engineering mastery through production builds.` `[ACCENT PERIOD: Required]`
* **Subtitle:** `An elite 6-week intensive engineering fellowship for serious builders. Strictly 12 seats. Direct architectural mentorship, weekly production reviews, and live software deployed by Week 6.` `[CHAR LIMIT: 160-220]`
* **3 Stat Wells `[COUNT: 3]`:**
  * Stat 1: Label: `Cohort` | Value: `12 Seats`
  * Stat 2: Label: `Duration` | Value: `6 Weeks`
  * Stat 3: Label: `Output` | Value: `Live Shipped`

### 5.2 6-Week Curriculum Blueprint `[COUNT: 6 Weeks]`
* **Week 01:**
  * **Title:** `Systems & TypeScript Architecture` `[CHAR LIMIT: 30-40]`
  * **Focus:** `Advanced type systems, asynchronous event loops, and deterministic error boundaries.` `[CHAR LIMIT: 70-100]`
  * **Deliverable:** `Type-Safe RPC Client with retry buffers` `[CHAR LIMIT: 35-50]`
  * **Badge:** `Core Systems`
  * **Latency / Benchmark:** `< 1.2ms`
  * **Stack `[COUNT: 4]`:** `TypeScript 5.6`, `Zod`, `Node.js`, `RPC`

* **Week 02:**
  * **Title:** `High-Throughput Backends & Queues` `[CHAR LIMIT: 30-40]`
  * **Focus:** `Redis Streams, BullMQ task engines, and PostgreSQL indexing with PgBouncer.` `[CHAR LIMIT: 70-100]`
  * **Deliverable:** `5k events/sec Distributed Worker Engine` `[CHAR LIMIT: 35-50]`
  * **Badge:** `Distributed Queues`
  * **Latency / Benchmark:** `< 12ms p95`
  * **Stack `[COUNT: 4]`:** `BullMQ`, `Redis Streams`, `PostgreSQL`, `PgBouncer`

* **Week 03:**
  * **Title:** `Agentic AI & Vector Retrieval` `[CHAR LIMIT: 30-40]`
  * **Focus:** `LangGraph multi-agent state graphs, Qdrant hybrid search, and deterministic tool schemas.` `[CHAR LIMIT: 70-100]`
  * **Deliverable:** `Autonomous Code Sandbox Research Agent` `[CHAR LIMIT: 35-50]`
  * **Badge:** `Applied AI`
  * **Latency / Benchmark:** `72ms TTFT`
  * **Stack `[COUNT: 4]`:** `LangGraph`, `Qdrant`, `FastAPI`, `Claude SDK`

* **Week 04:**
  * **Title:** `Kinetic Interfaces & Motion Systems` `[CHAR LIMIT: 30-40]`
  * **Focus:** `Next.js 15 Server Components, 60fps GSAP timelines, and WCAG AA design systems.` `[CHAR LIMIT: 70-100]`
  * **Deliverable:** `Hardware-Accelerated WebGL/Canvas Interface` `[CHAR LIMIT: 35-50]`
  * **Badge:** `Kinetic UI/UX`
  * **Latency / Benchmark:** `16.6ms / frame`
  * **Stack `[COUNT: 4]`:** `Next.js 15`, `GSAP 3`, `Canvas API`, `WebGL`

* **Week 05:**
  * **Title:** `Cloud Infrastructure & Observability` `[CHAR LIMIT: 30-40]`
  * **Focus:** `Multi-stage Docker builds, GitHub Actions CI/CD, OpenTelemetry, and zero-trust auth.` `[CHAR LIMIT: 70-100]`
  * **Deliverable:** `Automated Blue-Green Deployment Pipeline` `[CHAR LIMIT: 35-50]`
  * **Badge:** `Cloud & Observability`
  * **Latency / Benchmark:** `99.99% SLA`
  * **Stack `[COUNT: 4]`:** `Docker`, `Terraform`, `OpenTelemetry`, `GitHub Actions`

* **Week 06:**
  * **Title:** `Full Capstone & Engineering Defense` `[CHAR LIMIT: 30-40]`
  * **Focus:** `End-to-end production architecture sprint, stress benchmarking, and mentor code defense.` `[CHAR LIMIT: 70-100]`
  * **Deliverable:** `Live Production AI Platform with Real Telemetry` `[CHAR LIMIT: 35-50]`
  * **Badge:** `Capstone Defense`
  * **Latency / Benchmark:** `Production Live`
  * **Stack `[COUNT: 3]`:** `Full Production Stack`, `Live Telemetry`, `Bespoke Architecture`

### 5.3 Fellowship Admission Modal & Form
* **Modal Title:** `Apply for Fellowship Cohort 04`
* **Modal Subtitle:** `Strictly 12 engineers per cohort. Submit your email and GitHub profile below for architectural review.`
* **Button CTA:** `Submit Application for Review`

---

# SECTION 6: Global Footer & Legal
*Appears at bottom of every page (`Footer.tsx`)*

### 6.1 Column 1: Core Divisions
* `01 / Products (P)` -> `/products`
* `02 / Services (S)` -> `/services`
* `03 / Academics (A)` -> `/academics`

### 6.2 Column 2: Studio Inquiries
* `Direct Founder Email` -> `mailto:hello@nayaklabs.com`
* `LinkedIn Founder DM` -> `https://linkedin.com/company/nayaklabs`
* `Instagram Build Logs` -> `https://instagram.com/nayaklabs`

### 6.3 Column 3: Legal & Standards
* `IP Transfer & Assignment`
* `Bilateral Non-Disclosure (NDA)`
* `Telemetry & Privacy Standard`
* `Open Source Licenses`

### 6.4 Bottom Bar & Copyright
* **Tagline:** `Nayak Labs — High-velocity product studio & engineering fellowship.` `[CHAR LIMIT: 50-80]`
* **Subline:** `Architected & Directed by Nawaz Nayak · 0 Middlemen · Verifiable Code` `[CHAR LIMIT: 60-90]`
* **Copyright:** `© 2026 Nayak Labs. All rights reserved.`
