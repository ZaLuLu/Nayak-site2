# Nayak Labs — Complete System Architecture & Design Guide

> **Version**: 3.0 — September 2026  
> **Codebase**: `nayaklabs-site` — Vite + React 18 + TypeScript + GSAP + Lenis + Tailwind CSS + WebGL Shaders

---

## Table of Contents

1. [Project Overview & Philosophy](#1-project-overview--philosophy)
2. [Technology Stack & Dependencies](#2-technology-stack--dependencies)
3. [File Tree & Architecture Map](#3-file-tree--architecture-map)
4. [Routing & Page Architecture](#4-routing--page-architecture)
5. [Design System — Complete Token Reference (v3.0 LOCKED)](#5-design-system--complete-token-reference-v30-locked)
6. [Typography System](#6-typography-system)
7. [Glassmorphic Component Classes](#7-glassmorphic-component-classes)
8. [Theme System — Dark/Light Mode](#8-theme-system--darklight-mode)
9. [Animation System — GSAP & Lenis Pipeline](#9-animation-system--gsap--lenis-pipeline)
10. [Component Deep-Dives](#10-component-deep-dives)
11. [Page Deep-Dives](#11-page-deep-dives)
12. [SEO & Accessibility](#12-seo--accessibility)
13. [Visual Architecture Diagrams](#13-visual-architecture-diagrams)

---

## 1. Project Overview & Philosophy

**Nayak Labs** is an AI product studio and engineering fellowship. The website serves as a fully interactive portfolio, engineering showcase, and admissions portal. It is designed with the following core principles:

| Principle | Implementation |
|---|---|
| **High-Contrast Specular Glass** | Every glass panel has a crisp 1px top-edge inset highlight line + 16px border-radius |
| **Unified Hue Family** | Indigo (`#4338CA`) → Violet (`#8B5CF6`) → Fuchsia (`#C026D3`) triad across both dark and light modes |
| **Live WebGL Shader Background** | Dual-layer `@paper-design/shaders-react` `MeshGradient` + `FlutedGlass` optical caustics |
| **Structured Geometry** | Buttons are 10px radius (no soft pills); cards are 16px radius (max 20px) |
| **60fps Deterministic Motion** | Blur-to-focus reveal (700ms `power2.out`), GSAP 3.15 ScrollTrigger scrub |
| **Single Gradient Heading** | Exactly one gradient-text clipped heading per page for maximum editorial impact |
| **Production-Grade SEO & A11y** | OpenGraph, Twitter Cards, canonical URLs, WCAG AA 4.5:1 contrast compliance |

---

## 2. Technology Stack & Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI component framework |
| `react-dom` | ^18.3.1 | DOM rendering |
| `react-router-dom` | ^6.26.0 | Client-side routing with `BrowserRouter` |
| `@paper-design/shaders-react` | ^0.0.18 | WebGL shaders (`MeshGradient`, `FlutedGlass`) |
| `gsap` | ^3.15.0 | Animation engine (ScrollTrigger, timelines, scrub) |
| `lenis` | ^1.1.0 | Smooth-scroll engine synchronized to GSAP ticker |
| `lucide-react` | ^1.37.0 | Tree-shakeable SVG icon set |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^5.4.1 | Lightning-fast HMR dev server + bundler |
| `@vitejs/plugin-react` | ^4.3.1 | React Fast Refresh for Vite |
| `typescript` | ^5.5.3 | Strict type-checking |
| `tailwindcss` | ^3.4.7 | Utility-first CSS with custom extensions |
| `postcss` | ^8.4.40 | CSS processing pipeline |
| `autoprefixer` | ^10.4.19 | Vendor prefix automation |

---

## 3. File Tree & Architecture Map

```
nayaklabs-site/
├── index.html                          # Entry HTML — SEO meta, Google Fonts, FOUC prevention script
├── package.json                        # Dependencies & scripts
├── vite.config.ts                      # Vite configuration
├── tsconfig.json                       # TypeScript strict configuration
├── tailwind.config.js                  # Tailwind extensions (fonts, colors, border-radius tokens)
├── postcss.config.js                   # PostCSS pipeline (tailwindcss, autoprefixer)
│
└── src/
    ├── main.tsx                         # React root mount (StrictMode → <App />)
    ├── App.tsx                          # Root router, Lenis setup, intro state machine, MainLayout
    ├── index.css                        # v3.0 design system — tokens, glass classes, typography
    │
    ├── utils/
    │   ├── themeContext.tsx              # ThemeProvider — dark/light mode toggle with locked triad
    │   └── audioEngine.ts               # Stub audio haptics (disabled)
    │
    ├── components/
    │   ├── intro/
    │   │   └── IntroSequence.tsx         # Cinematic shutter-split intro with violet/fuchsia laser seam
    │   │
    │   ├── Navbar.tsx                    # Floating glassmorphic navigation bar (10px Connect CTA)
    │   ├── Hero3D.tsx                    # 3D wordmark + scroll scrub → 3D fan-out portal cards
    │   ├── HeroBackground.tsx            # Live WebGL MeshGradient + FlutedGlass shader stack
    │   │
    │   ├── pillars/
    │   │   └── PillarStack.tsx           # 3 division sections (Products, Services, Academics)
    │   │
    │   ├── About.tsx                     # Studio Manifesto section
    │   ├── WhyChooseUs.tsx               # Linear precision 5-stage engineering lifecycle
    │   ├── SocialMediaSection.tsx        # 3D depth-blur dispatch carousel
    │   ├── Contact.tsx                   # 3 high-impact channel cards (Gmail, LinkedIn, Instagram)
    │   ├── Footer.tsx                    # 4-column footer with theme toggle + back-to-top
    │   │
    │   ├── ScrollReveal.tsx              # Blur-to-focus reveal wrapper (700ms power2.out)
    │   ├── SectionEyebrow.tsx            # Glass-pill status badge in clean sentence case
    │   ├── SpotlightCard.tsx             # Radial cursor spotlight card
    │   ├── GrainOverlay.tsx              # SVG feTurbulence film grain overlay
    │   │
    │   ├── products/
    │   │   ├── DiNotesVisualizer.tsx      # Algorithm sorting/search visualizer
    │   │   └── EventMeshRadar.tsx         # Interactive 3D canvas globe & India radar
    │   │
    │   └── ui/
    │       └── AnimatedBeam.tsx           # SVG animated gradient beam connector
    │
    └── pages/
        ├── ProductsPage.tsx              # Products showcase — single gradient heading
        ├── ServicesPage.tsx              # Services architecture — 4 pillar deep-dives
        ├── AcademicsPage.tsx             # 6-week fellowship curriculum + waitlist modal
        └── ComingSoon.tsx                # Placeholder page for future routes
```

---

## 4. Design System — Complete Token Reference (v3.0 LOCKED)

### Dark Mode (`[data-theme="dark"]`)

```
BACKGROUNDS
--bg-base                  #0A0714
--bg-card                  rgba(20,14,36,0.68)
--bg-card-hover            rgba(30,20,52,0.85)
--bg-surface               rgba(24,16,42,0.62)
--bg-surface-elevated      rgba(32,22,56,0.82)

BORDERS
--border-base              rgba(196,181,253,0.12)
--border-hover             rgba(196,181,253,0.32)
--border-specular          rgba(233,213,255,0.55)

TEXT
--text-primary             #F4F0FF
--text-secondary           #AEA0D6
--text-muted               #6E6390

ACCENTS
--accent-primary           #8B5CF6   /* violet-500 — primary CTA, active states */
--accent-secondary         #C026D3   /* fuchsia-600 — secondary emphasis, tags */
--accent-tertiary          #4F46E5   /* indigo-600 — links, data viz, focus rings */
--accent-glow              rgba(139,92,246,0.35)

BUTTONS
--btn-primary-bg           #F4F0FF
--btn-primary-text         #0A0714
--btn-primary-hover-bg     #8B5CF6
--btn-primary-hover-text   #FFFFFF
--btn-ghost-border         rgba(196,181,253,0.24)
--btn-ghost-hover-bg       rgba(139,92,246,0.12)
```

### Light Mode (`[data-theme="light"]`)

```
BACKGROUNDS
--bg-base                  #FAFAFB
--bg-card                  rgba(255,255,255,0.86)
--bg-card-hover            #FFFFFF
--bg-surface               rgba(243,242,248,0.85)
--bg-surface-elevated      rgba(237,235,247,0.95)

BORDERS
--border-base              rgba(30,20,56,0.12)
--border-hover             rgba(30,20,56,0.28)
--border-specular          rgba(30,20,56,0.45)

TEXT
--text-primary             #14101F
--text-secondary           #4A4160
--text-muted               #766C8E

ACCENTS
--accent-primary           #6D28D9   /* violet-700 */
--accent-secondary         #A21CAF   /* fuchsia-700 */
--accent-tertiary          #4338CA   /* indigo-700 */
--accent-glow              rgba(109,40,217,0.22)

BUTTONS
--btn-primary-bg           #14101F
--btn-primary-text         #FFFFFF
--btn-primary-hover-bg     #6D28D9
--btn-primary-hover-text   #FFFFFF
--btn-ghost-border         rgba(30,20,56,0.18)
--btn-ghost-hover-bg       rgba(109,40,217,0.08)
```

### Shared Gradient Ramp

```css
--gradient-ramp: linear-gradient(135deg, #4338CA 0%, #8B5CF6 45%, #C026D3 100%);
```

---

## 5. Component Specs

### `.glass-panel`
```css
.glass-panel {
  background: var(--bg-card);
  backdrop-filter: blur(28px) saturate(190%);
  border: 1px solid var(--border-base);
  border-radius: 16px;
  box-shadow:
    0 1px 0 0 var(--border-specular) inset,   /* crisp top-edge highlight — MANDATORY */
    0 16px 32px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(0, 0, 0, 0.04);
}
.glass-panel:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px); /* NO scale */
  box-shadow:
    0 1px 0 0 var(--border-specular) inset,
    0 16px 32px rgba(0, 0, 0, 0.32),
    0 0 24px var(--accent-glow);
}
```

### `.glass-pill`
```css
.glass-pill {
  background: var(--bg-surface);
  backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  padding: 6px 14px;
  font: 500 13px/1 'Plus Jakarta Sans', sans-serif; /* Sentence case */
}
```

### Buttons
- **`border-radius`**: `10px` (structured, rectangular-with-radius)
- **Primary**: Solid background with hover accent transition and elevation
- **Ghost**: Visible 1px border at all times (`border: 1px solid var(--btn-ghost-border)`)

---

## 6. Background System (Hero Shader Stack)

```
Layer 1 (bottom): <MeshGradient> — colors={['#4338CA','#8B5CF6','#C026D3','#0A0714']} (dark)
                                    colors={['#4338CA','#8B5CF6','#C026D3','#FAFAFB']} (light)
                   speed={0.15}, distortion={0.6}, swirl={0.4}, opacity 100%
Layer 2:           <FlutedGlass> tinted to accent-primary, opacity 10% dark / 5% light,
                   parallax translateY at 0.15x scroll speed via GSAP ScrollTrigger scrub
Layer 3:           Precision coordinate crosshair grid
Layer 4:           Cursor-following liquid spotlight
Layer 5:           Specular vignette at screen perimeters
```

---

## 7. Animation Pipeline

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Section blur-to-focus reveal | 700ms | `power2.out` | `blur(6px) opacity 0.7 translateY(24px)` → `blur(0) opacity 1 translateY(0)`. Trigger once, `scrub: false`. |
| Specular border sweep (hover) | 600ms | `cubic-bezier(0.16,1,0.3,1)` | One-shot per hover-enter |
| Hero MeshGradient ambient loop | continuous | linear, `speed=0.15` | Only continuous motion permitted |
| Fluted ray parallax | scroll-linked | `scrub: 0.5` | translateY only, 0.15x scroll speed |
| Card hover lift | 250ms | `power2.out` | `translateY(-4px)`, no scale |
| Theme toggle transition | 300ms | `power1.inOut` | Cross-fade CSS custom properties |

---

> **Nayak Labs v3.0 Specification — Fully Implemented & Verified.**
