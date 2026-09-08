# NAYAKLABS-V2 · MASTER CONTENT & COPY SPECIFICATION
> **Source Repository:** [er-surajnayak/nayaklabs-v2](https://github.com/er-surajnayak/nayaklabs-v2)  
> **Extraction Date:** September 7, 2026  
> **Purpose:** Page-by-page, component-by-component exact wording, layout structure, interactive component definitions, and content parameter limits for copywriting and content updates.

---

## TABLE OF CONTENTS
1. [Global Header & Navigation](#0-global-header--navigation)
2. [Global Footer](#0-global-footer)
3. [Page 1: Home (`index.html`)](#page-1-home-indexhtml)
4. [Page 2: Products (`products.html`)](#page-2-products-productshtml)
5. [Page 3: Services (`services.html`)](#page-3-services-serviceshtml)
6. [Page 4: Training (`training.html`)](#page-4-training-traininghtml)

---

# 0. GLOBAL HEADER & NAVIGATION
*(Extracted from `assets/partials.js`)*

| Element | Parameter / Limit | Exact Current Copy | Notes / Target URL |
| :--- | :--- | :--- | :--- |
| **Brand Logo Icon** | SVG Glyphs | `[SVG Logo Symbol]` | 24x24 Vector |
| **Brand Text** | 1-2 words (max 15 chars) | `nayaklabs` | Links to `index.html` |
| **Nav Link 1** | 1 word (max 10 chars) | `Home` | `index.html` |
| **Nav Link 2** | 1 word (max 10 chars) | `Products` | `products.html` |
| **Nav Link 3** | 1 word (max 10 chars) | `Training` | `training.html` |
| **Nav Link 4** | 1 word (max 10 chars) | `Services` | `services.html` |
| **Nav CTA Button** | 2-4 words (max 20 chars) | `Book a call →` | `services.html#contact` |

---

# 0. GLOBAL FOOTER
*(Extracted from `assets/partials.js`)*

### Column 1: Brand & Tagline
- **Brand Logo:** `nayaklabs` (with SVG Icon)
- **Tagline:**
  ```text
  Build. Learn. Automate. A studio for AI products, technical training, and software craftsmanship.
  ```
  *(Limit: 80–120 characters)*

### Column 2: Products Navigation
- **Section Heading:** `Product`
- **Links:**
  1. `PostEZ` (`products.html#postez`)
  2. `DI Notes` (`products.html#dinotes`)
  3. `EventJn.` (`products.html#eventjn`)

### Column 3: Company Navigation
- **Section Heading:** `Company`
- **Links:**
  1. `Training` (`training.html`)
  2. `Services` (`services.html`)
  3. `Contact` (`services.html#contact`)

### Column 4: Social / External
- **Section Heading:** `Social`
- **Links:**
  1. `Twitter / X` (`https://twitter.com`)
  2. `LinkedIn` (`https://linkedin.com`)
  3. `GitHub` (`https://github.com`)

### Footer Bottom Bar
- **Copyright & Location:** `© 2026 NayakLabs · BLR/IN`
- **System Status Badge:** `v1.4.0 · all systems operational` *(Status dot color: active green)*

---

# PAGE 1: HOME (`index.html`)

## Section 1.1: Hero Section
- **Status Eyebrow Badge:**
  - Copy: `NayakLabs · v1.4 · shipping weekly`
  - *Parameter:* Max 35 chars. Contains active glowing pulse indicator.
- **Main Headline (H1):**
  - Line 1: `Build.`
  - Line 2: `Learn.`
  - Line 3: `Automate with AI.`
  - *Parameter:* 3 punchy lines, gradient/highlight on the 3rd line.
- **Hero Lead Description:**
  - Copy: `A studio for shipping AI products, training engineers, and building the software that keeps teams moving. Three verticals, one obsession with craft.`
  - *Parameter:* 120–160 characters.
- **Hero CTAs:**
  - **Primary CTA:** `Explore products →` *(Links to `products.html`)*
  - **Secondary CTA:** `Start learning →` *(Links to `training.html`)*
- **Hero Metrics Strip (3 Stats):**
  1. Stat: `3` | Label: `verticals`
  2. Stat: `12k+` | Label: `learners`
  3. Stat: `40+` | Label: `shipped projects`

### Section 1.1.B: Hero Interactive Live Peek Card (`postez / draft`)
- **Card Topbar:**
  - Window Title: `postez / draft`
  - Window Status: `ai active`
- **Topic Input Pill / Label:**
  - Label: `Topic`
  - Value: `shipping weekly as a solo dev`
- **Theme Selection Pills:**
  1. `minimal` *(Active by default)*
  2. `editorial`
  3. `bold`
- **Live Output Text Box (Typewriter Simulation):**
  ```text
  The secret to shipping every week isn't working 80 hours.

  It's cutting scope until it hurts, then cutting 10% more.

  1/ Pick one user problem
  2/ Build the simplest fix
  3/ Ship before you feel ready

  Everything else is procrastination dressed up as planning.
  ```
- **Card Action Buttons:**
  - Button 1: `Schedule`
  - Button 2: `Publish →`
- **Floating Badges / Stickers:**
  - Floating Badge 1 (Top Right): `⚡ generated in 1.2s`
  - Floating Badge 2 (Bottom Left): `● 4 channels ready`

---

## Section 1.2: Marquee Banner
- **Scrolling Ribbon Text (Repeated Continuously):**
  ```text
  AI Products · Tech Training · Software Services · Automations · Fine-tuned Models · Shipped. Not shelved. · 
  ```

---

## Section 1.3: Three Core Verticals Grid
- **Section Meta Eyebrow:** `01 / THREE PILLARS`
- **Section Title:** `What we do.`
- **Section Lead:** `Three distinct practices, united by how we build.`

### Pillar Card 1: AI Products
- **Vertical Number / Tag:** `01 / PRODUCTS`
- **Title:** `AI Products`
- **Description:** `Software we build, launch, and maintain in-house. Focused tools for creators, learners, and builders.`
- **Bullet Items:**
  - `PostEZ — AI social content engine`
  - `DI Notes — Interactive technical notes`
  - `EventJn. — Tech events across India`
- **Card CTA:** `Explore products →` *(Links to `products.html`)*

### Pillar Card 2: Tech Training
- **Vertical Number / Tag:** `02 / TRAINING`
- **Title:** `Tech Training`
- **Description:** `Cohort-based, mentor-led programs in AI engineering, DSA, and modern software craft. Taught by builders.`
- **Bullet Items:**
  - `AI / ML Engineering cohort`
  - `DSA & Systems Deep-Dive`
  - `Real-World Projects track`
- **Card CTA:** `View curriculum →` *(Links to `training.html`)*

### Pillar Card 3: Software Services
- **Vertical Number / Tag:** `03 / SERVICES`
- **Title:** `Software Services`
- **Description:** `Senior engineering teams embedded with your product. Web development, custom AI integrations, and automations.`
- **Bullet Items:**
  - `Full-stack web applications`
  - `Custom LLM & RAG pipelines`
  - `Workflow & ops automation`
- **Card CTA:** `Work with us →` *(Links to `services.html`)*

---

## Section 1.4: Four Feature Strips (Our Standards)
- **Section Meta Eyebrow:** `02 / HOW WE OPERATE`
- **Section Title:** `Built different by default.`

| Card # | Title (H3) | Description |
| :--- | :--- | :--- |
| **01** | `Built for speed` | Production from day one. We prototype in code, not mockups, and ship real deploys weekly. |
| **02** | `Taught by builders` | Our instructors and mentors are active engineers writing code every day, not career educators. |
| **03** | `Designed to last` | Clean architectures, thorough tests, and considered UX. No throwaway work, no tech debt dumps. |
| **04** | `Always shipping` | Public changelogs, open cohorts, and transparent progress. You see what we build as we build it. |

---

## Section 1.5: Live Social Feed Grid (8 Feed Tiles)
- **Section Meta Eyebrow:** `03 / PUBLIC LOG`
- **Section Title:** `Fresh off the desk.`
- **Section Lead:** `Updates, writeups, and releases from the studio.`

```text
[Tile 1] Tag: BUILD LOG  · 2d ago
"Shipped v1.4 of PostEZ — scheduled posts now support multi-theme visual previews and thread splitting."

[Tile 2] Tag: TEARDOWN   · 4d ago
"Why we rewrote DI Notes' visualizer in raw Canvas instead of WebGL: a short thread on bundle sizes."

[Tile 3] Tag: TRAINING   · 5d ago
"Applications open for the Summer AI/ML cohort. 120 seats, rolling admits. Starts June 15."

[Tile 4] Tag: EVENT      · 1w ago
"EventJn. just crossed 500 active tech listings across BLR, DEL, HYD, and MUM. Built with Next.js."

[Tile 5] Tag: CASE STUDY · 1w ago
"How we built an internal ops automation tool for a D2C brand in 6 weeks — zero to production."

[Tile 6] Tag: NOTES      · 2w ago
"Five things we got wrong about prompt evaluation in production (and what we use instead of LLM-as-judge)."

[Tile 7] Tag: LAUNCH     · 2w ago
"EventJn. for Workshops — organizers can now accept registrations and sync with Google Calendar."

[Tile 8] Tag: HIRING     · 3w ago
"We're looking for two senior full-stack engineers to join our services practice. Remote-first (IN)."
```

---

## Section 1.6: Homepage Bottom CTA Banner
- **Eyebrow:** `Open for Q3 '26`
- **Headline (H2):** `Ready to build something that actually ships?`
- **Lead Copy:** `Whether it's a product you need built, a seat in our next training cohort, or a bespoke engineering engagement — let's talk.`
- **Primary Button:** `Book a call →` *(Links to `services.html#contact`)*
- **Secondary Button:** `See what we ship →` *(Links to `products.html`)*

---

# PAGE 2: PRODUCTS (`products.html`)

## Section 2.1: Products Header & Subnavigation
- **Eyebrow Badge:** `Products · 3 shipping · 2 in beta`
- **Page Title (H1):** `The software we built for ourselves first.`
- **Lead Description:** `Each one scratches an itch we had at NayakLabs — then kept working well enough to ship publicly. Try the interactive demos below.`
- **Anchor Subnav Tabs:**
  1. `01 PostEZ` (`#postez`)
  2. `02 DI Notes` (`#dinotes`)
  3. `03 EventJn.` (`#eventjn`)

---

## Section 2.2: Product 01 — PostEZ (`#postez`)
- **Product Index Tag:** `/ 01 · AI content · scheduling`
- **Product Name (H2):** `PostEZ`
- **Product Description:** `Turn a raw topic or messy notes into a week of high-signal posts. Apply visual themes, tune voice and perspective, and schedule across channels — all in one clean workspace.`

### Interactive Controls Form:
1. **Topic Input:**
   - Label: `Topic or rough note`
   - Default Placeholder / Value: `Why small teams ship faster than large companies`
2. **Themes Selector (4 Options):**
   - `Minimal` (Default selected)
   - `Editorial`
   - `Bold`
   - `Mono`
3. **Voice Selector (4 Options):**
   - `Confident` (Default selected)
   - `Playful`
   - `Technical`
   - `Warm`
4. **Custom Instructions Input:**
   - Label: `Custom instructions (optional)`
   - Placeholder: `e.g. Include 3 bullet points, keep under 200 words`
5. **Channels Checkbox Strip (4 Platforms):**
   - `Twitter / X` (Checked)
   - `LinkedIn` (Checked)
   - `Instagram`
   - `Threads`
6. **Action Button:** `Generate post ⚡`

### Interactive Post Preview Card:
- **Card Header:** Avatar (`NL`), User Handle: `@nayaklabs · 1m ago`, Channel Tag: `Twitter / X`
- **Generated Post Body:**
  ```text
  Large teams don't move slowly because they have bad engineers.

  They move slowly because consensus is an O(n²) communication problem.

  A team of 3 can decide in 5 minutes.
  A team of 30 needs 4 meetings, a doc review, and a sign-off.

  Keep teams small. Protect their autonomy.
  ```
- **Preview Footer Actions:**
  - `Schedule for tomorrow`
  - `Publish now →`

---

## Section 2.3: Product 02 — DI Notes (`#dinotes`)
- **Product Index Tag:** `/ 02 · Interactive learning`
- **Product Name (H2):** `DI Notes`
- **Product Description:** `Concepts you can touch. Every lesson comes with a live playground — change an input, drag a slider, watch the algorithm execute step by step. Below: our live sorting visualizer.`

### Interactive Sorting Visualizer Controls:
1. **Algorithm Selector (4 Algorithms):**
   - `Bubble Sort` (Default selected)
   - `Insertion Sort`
   - `Selection Sort`
   - `Quick Sort`
2. **Array Size Slider:**
   - Range: `8 to 48 elements` (Default: `24`)
3. **Animation Speed Slider:**
   - Range: `1x to 5x` (Default: `3x`)
4. **Data Distribution (4 Buttons):**
   - `Random` (Default selected)
   - `Reversed`
   - `Nearly sorted`
   - `Few unique`
5. **Interactive Buttons:**
   - `Run algorithm ▶`
   - `Reset / Shuffle ↺`
6. **Real-time Telemetry Stats:**
   - Comparisons: `0`
   - Swaps / Writes: `0`
   - Time Complexity: `O(n²)` (or `O(n log n)`)
   - Step Narration Box: `Ready. Press Run to begin sorting.`

---

## Section 2.4: Product 03 — EventJn. (`#eventjn`)
- **Product Index Tag:** `/ 03 · Event aggregator`
- **Product Name (H2):** `EventJn.`
- **Product Description:** `Hackathons, tech meetups, and developer workshops across India — curated in one place. Filter by type, price, and city, and subscribe to get weekly digests.`

### Category & Price Filters:
- **Category Filter Tabs:** `All (9)`, `Hackathons (2)`, `Meetups (3)`, `Workshops (2)`, `Conferences (2)`
- **Price Filter Tabs:** `All prices`, `Free only`, `Paid`

### 9 Curated Event Cards:
1. **Event 1:**
   - Date Badge: `MAY 03`
   - Title: `AI Builders Hackathon (Summer Edition)`
   - Organizer: `devfolio.co`
   - Tags: `Hackathon` · `Free` · `Bengaluru`
   - Action: `Register →`
2. **Event 2:**
   - Date Badge: `MAY 09`
   - Title: `LLM Evaluation in Production Workshop`
   - Organizer: `NayakLabs`
   - Tags: `Workshop` · `Paid · ₹1,499` · `Online`
   - Action: `Register →`
3. **Event 3:**
   - Date Badge: `MAY 12`
   - Title: `React India Community Meetup #42`
   - Organizer: `react-india`
   - Tags: `Meetup` · `Free` · `Mumbai`
   - Action: `RSVP →`
4. **Event 4:**
   - Date Badge: `MAY 17`
   - Title: `DSA Masters: Graphs & DP Weekend Bootcamp`
   - Organizer: `NayakLabs`
   - Tags: `Workshop` · `Paid · ₹2,999` · `Online`
   - Action: `Enroll →`
5. **Event 5:**
   - Date Badge: `MAY 22`
   - Title: `AsiaJS Conference 2026`
   - Organizer: `asiajs.co`
   - Tags: `Conference` · `Paid · ₹4,500` · `Bengaluru`
   - Action: `Buy Tickets →`
6. **Event 6:**
   - Date Badge: `MAY 24`
   - Title: `Hack the North India (Online Qualifiers)`
   - Organizer: `hacknorth.io`
   - Tags: `Hackathon` · `Free` · `Online`
   - Action: `Register →`
7. **Event 7:**
   - Date Badge: `JUN 01`
   - Title: `Indie Hackers Delhi Meetup`
   - Organizer: `indiehackers`
   - Tags: `Meetup` · `Free` · `Delhi NCR`
   - Action: `RSVP →`
8. **Event 8:**
   - Date Badge: `JUN 07`
   - Title: `Shipping AI Products: Panel & Demos`
   - Organizer: `NayakLabs`
   - Tags: `Meetup` · `Free` · `Bengaluru`
   - Action: `RSVP →`
9. **Event 9:**
   - Date Badge: `JUN 14`
   - Title: `Design Systems for Engineers Jam`
   - Organizer: `design-india`
   - Tags: `Conference` · `Paid · ₹1,999` · `Hyderabad`
   - Action: `Register →`

---

# PAGE 3: SERVICES (`services.html`)

## Section 3.1: Services Header
- **Eyebrow Badge:** `Services · 2 slots open for Q3 '26`
- **Page Title (H1):** `Senior engineering, on loan.`
- **Lead Description:** `Embed a senior product engineering team for a defined engagement. We build web apps, AI integrations, internal tools, and automations — shipped end-to-end with a clean handoff.`

---

## Section 3.2: Three Core Service Offerings

### Service 01: Web Development
- **Code & Tag:** `WEB / 01`
- **Pricing & Timeline:** `From ₹2.5L · 2–6 weeks typical`
- **Title (H2):** `Web Development`
- **Summary:** `Marketing sites, dashboards, customer portals, and full-stack web applications. Built with Next.js, TypeScript, clean architecture, and real deploys.`
- **Scope Breakdown:**
  1. `Marketing & landing pages` — High conversion, sub-second loads, bespoke animations.
  2. `Admin dashboards & internal tools` — Complex state, real-time data, role-based access.
  3. `Full-stack SaaS products` — Auth, billing, database design, API integrations.
  4. `Migrations & rewrites` — Modernize legacy stacks with zero customer downtime.
- **Service CTA:** `Inquire about Web →` *(Scrolls to `#contact`)*

### Service 02: AI Solutions
- **Code & Tag:** `AI / 02`
- **Pricing & Timeline:** `From ₹4.0L · 3–8 weeks typical`
- **Title (H2):** `AI Solutions`
- **Summary:** `Retrieval systems (RAG), fine-tuned models, structured prompt pipelines, and evaluation harnesses. We build AI features that work reliably in production — not just in demos.`
- **Scope Breakdown:**
  1. `Retrieval & RAG systems` — Vector search, hybrid retrieval, chunking, reranking.
  2. `Model fine-tuning & evaluation` — Custom datasets, LoRA tuning, automated eval suites.
  3. `Agents & tool-use pipelines` — Structured output, multi-step orchestration, fallback flows.
  4. `LLM cost & latency optimization` — Semantic caching, prompt compression, small-model routing.
- **Service CTA:** `Inquire about AI →` *(Scrolls to `#contact`)*

### Service 03: Automation Tools
- **Code & Tag:** `AUTO / 03`
- **Pricing & Timeline:** `From ₹1.8L · 2–4 weeks typical`
- **Title (H2):** `Automation Tools`
- **Summary:** `Internal workflow engines, data pipelines, and ops automations. Replace fragile spreadsheets and messy Zapier chains with robust, observable software that scales.`
- **Scope Breakdown:**
  1. `Workflow & ops automation` — Approval flows, cross-tool sync, automated reports.
  2. `Data pipelines & ETL` — Scheduled scrapers, data cleaning, warehouse ingestion.
  3. `Third-party integrations` — Custom webhooks, Slack/Discord bots, payment webhooks.
  4. `Scheduled job systems` — Cron engines, queue workers, failure alerting.
- **Service CTA:** `Inquire about Automation →` *(Scrolls to `#contact`)*

---

## Section 3.3: The 4-Phase Delivery Process
- **Section Eyebrow:** `HOW WE ENGAGE`
- **Section Title:** `From brief to production in four phases.`

```text
[Phase 01] 01 Discovery — Week 0 (3–5 days)
Two scoping calls, a written technical brief, fixed milestones, and guaranteed pricing. No open-ended hourly billing surprises.

[Phase 02] 02 Architecture & Design — Week 1
Interactive wireframes, data model schemas, system architecture diagrams, and milestone sign-off.

[Phase 03] 03 Build & Iterate — Weeks 2–6
Weekly working demos, shared private Slack channel, live staging deploys, and transparent commit logs.

[Phase 04] 04 Ship & Handoff — Final Week
Production deployment, architecture documentation, video runbooks, and 30 days of included post-launch warranty.
```

---

## Section 3.4: Client Trust Logos Strip
- **Section Label:** `TEAMS WE'VE BUILT AND SHIPPED WITH`
- **Logos:** `ALTAIR.CO` · `◇ NORTHBEAM` · `/POST` · `KINESIS` · `⌘ VAULT` · `FERRO·LAB`

---

## Section 3.5: Contact & Intake Form (`#contact`)
- **Contact Meta Info:**
  - Response Time: `Response time: < 24 hours`
  - Location: `Bengaluru, IN (GMT+5:30)`
  - Direct Email: `hello@nayaklabs.co`
- **Form Fields & Options:**
  1. **Full Name:** Text Input (Required)
  2. **Company / Team:** Text Input (Optional)
  3. **Work Email:** Email Input (Required)
  4. **Primary Interests (Pills / Checkboxes):**
     - `Web Development`
     - `AI Solutions`
     - `Automation Tools`
     - `Tech Training`
     - `Other`
  5. **Estimated Budget Range (Select / Radios):**
     - `Under ₹2,00,000`
     - `₹2,00,000 – ₹5,00,000`
     - `₹5,00,000 – ₹15,00,000`
     - `₹15,00,000+`
     - `Not sure yet`
  6. **Timeline (Select / Radios):**
     - `ASAP (within 2 weeks)`
     - `Within 1 month`
     - `1–3 months`
     - `Just exploring`
  7. **Project Details:** Textarea (Placeholder: `Tell us what you're building, key constraints, and what success looks like...`)
  8. **Submit Button:** `Send project brief →`

---

# PAGE 4: TRAINING (`training.html`)

## Section 4.1: Training Header
- **Eyebrow Badge:** `Training · Summer '26 cohort · 120 seats`
- **Page Title (H1):** `Learn to ship. Not to pass interviews.`
- **Lead Description:** `Cohort-based programs taught by engineers who ship production code every week. Live sessions, real-world projects, rigorous code reviews. No certificate theatre.`
- **Header CTAs:**
  - Primary CTA: `Join a cohort →` *(Scrolls to `#cohorts`)*
  - Secondary CTA: `Explore curriculum →` *(Scrolls to `#curriculum`)*

---

## Section 4.2: The 4-Step Learning Arc
- **Section Eyebrow:** `OUR METHODOLOGY`
- **Section Title:** `Four steps to production mastery.`

```text
[Step 01] 01 / LEARN — Live Architecture & Deep Dives
4 hours/week of live, interactive technical sessions. Deep intuition over syntax memorization. Full recordings, code notes, and dedicated Q&A.

[Step 02] 02 / PRACTICE — Weekly Problem Sets & Code Labs
Challenging, graded problem sets. 1-on-1 mentor code reviews, automated test harnesses, and peer code discussions.

[Step 03] 03 / BUILD — 3-Week Real Capstone Sprint
Build a production-grade application from a real product brief. Weekly milestone reviews, live debugging sessions, and architecture reviews.

[Step 04] 04 / DEPLOY — Public Release & Demo Day
Ship your capstone to a public URL with CI/CD, database migrations, load tests, and a live presentation to industry engineers.
```

---

## Section 4.3: Three Cohort Tracks (`#curriculum`)

### Track 1: AI / ML Engineering
- **Duration & Effort:** `12 weeks · 4 hrs/week live + 6 hrs build`
- **Level & Prerequisites:** `Intermediate · Python & basic calculus`
- **Tuition:** `₹48,000` *(EMI available)*
- **Capstone Project:** `Production RAG application with custom eval suite & caching`
- **12-Week Syllabus:**
  - `Week 01:` Mathematical foundations — vectors, embeddings, matrix operations & probability
  - `Week 02:` Classical ML review — regression, trees, cross-validation & evaluation metrics
  - `Week 03:` Deep learning from scratch — forward pass, backprop, custom autograd engine
  - `Week 04:` Transformer architecture — multi-head attention, positional encoding & KV cache
  - `Week 05:` Modern LLMs & Prompt Engineering — structured output, chain-of-thought & tool use
  - `Week 06:` Vector DBs & Retrieval (RAG) — hybrid search, chunking strategies & rerankers
  - `Week 07:` Fine-Tuning — LoRA, QLoRA, dataset preparation & instruction tuning
  - `Week 08:` Evaluation harnesses — golden test sets, synthetic benchmarks & LLM-as-judge
  - `Week 09:` Serving & Inference — vLLM, latency optimization, quantization & guardrails
  - `Week 10:` Capstone Kickoff — architecture review, schema design & repo setup
  - `Week 11:` Capstone Build — core features, eval pipeline & integration tests
  - `Week 12:` Demo Day — live presentations, code walkthroughs & mentor feedback

### Track 2: DSA & Systems Design
- **Duration & Effort:** `10 weeks · 4 hrs/week live + 5 hrs build`
- **Level & Prerequisites:** `Beginner → Intermediate · Any programming language`
- **Tuition:** `₹32,000` *(EMI available)*
- **Capstone Project:** `Distributed URL shortener handling 10,000 requests/sec with rate limiter`
- **10-Week Syllabus:**
  - `Week 01:` Asymptotic complexity, invariants, recursion & master theorem
  - `Week 02:` Arrays, strings, two-pointer techniques & sliding window patterns
  - `Week 03:` Stacks, queues, monotonic structures & heap priority queues
  - `Week 04:` Trees, tries, binary search trees & graph traversals (BFS/DFS)
  - `Week 05:` Shortest path algorithms (Dijkstra, Bellman-Ford), MSTs & Union-Find
  - `Week 06:` Dynamic Programming patterns — 1D, 2D, knapsack & state machines
  - `Week 07:` System Design fundamentals — caching, sharding, replication & proxies
  - `Week 08:` Distributed Systems basics — CAP theorem, consensus, WAL & message queues
  - `Week 09:` Capstone Architecture — API gateway, database schema & caching layer
  - `Week 10:` Capstone Load Testing — benchmarking, profiling bottlenecks & Demo Day

### Track 3: Real-World Projects & Full-Stack Craft
- **Duration & Effort:** `8 weeks · 5 hrs/week live + 8 hrs build`
- **Level & Prerequisites:** `Any level · HTML/CSS/JS fundamentals`
- **Tuition:** `₹28,000` *(EMI available)*
- **Capstone Project:** `Full-stack SaaS app with auth, payments, background workers & clean UI`
- **8-Week Syllabus:**
  - `Week 01:` Product brief breakdown, PRD writing & scoping ruthlessly
  - `Week 02:` Architecture blueprint, schema modeling & tech stack selection
  - `Week 03:` Core Sprint 1 — Authentication, database setup & essential CRUD
  - `Week 04:` Core Sprint 2 — Complex business logic, external APIs & background queues
  - `Week 05:` Frontend Polish — Design tokens, micro-interactions, responsive UX & a11y
  - `Week 06:` CI/CD & Production Deploy — Docker, automated tests, logs & telemetry
  - `Week 07:` Beta User Testing — analytics setup, error tracking & feedback loops
  - `Week 08:` Demo Day & Portfolio Polish — project launch, documentation & pitch

---

## Section 4.4: Mentor Profiles
- **Section Eyebrow:** `MENTORSHIP`
- **Section Title:** `Learn directly from engineers who ship.`

```text
[Mentor 1] Arjun Patel
Title: AI LEAD
Bio: Ex-Staff ML Engineer at a tier-1 fintech. 8+ years building production recommendation engines and LLM pipelines. Teaches the AI/ML Engineering track.

[Mentor 2] Priya Nayak
Title: SYSTEMS ARCHITECT
Bio: Built distributed scheduling engines and high-throughput data platforms at B2B SaaS unicorns. Teaches the DSA & Systems track.

[Mentor 3] Rahul Menon
Title: PRODUCT LEAD
Bio: Full-stack founder who has shipped 3 products to 1M+ active users. Obsessed with UX, performance, and developer velocity. Teaches Real-World Projects.

[Mentor 4] Sana Iyer
Title: CODE & ARCHITECTURE REVIEWER
Bio: Ex-Engineering Manager and veteran open-source contributor. Leads weekly code reviews, architecture teardowns, and career strategy.
```

---

## Section 4.5: Cohort Enrollment & Application Banner (`#cohorts`)
- **Main Heading (H2):** `Summer '26 cohort starts June 15.`
- **Lead Copy:** `120 total seats across all three tracks. Rolling admissions until filled. No entrance test — just a 5-minute written application.`
- **Live Track Seat Status Bars:**
  - `AI / ML Engineering:` **47 / 60 seats filled** *(78% capacity)*
  - `DSA & Systems:` **21 / 40 seats filled** *(52% capacity)*
  - `Real-World Projects:` **18 / 20 seats filled** *(90% capacity)*
- **Key Details Meta Strip:**
  - Start Date: `June 15, 2026`
  - Format: `Live sessions + recordings`
  - Commitment: `4–6 hrs / week`
- **Application CTA Button:** `Submit 5-minute application →`

---

## HOW TO USE THIS FILE FOR CONTENT UPDATES
1. **Modify any copy directly** in this file.
2. Maintain character limits and parameter formats indicated above so responsive layouts and component interfaces do not break.
3. Once completed, provide this file back, and all changes will be reflected into `nayaklabs-site` immediately.
