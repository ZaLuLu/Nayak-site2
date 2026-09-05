# Nayak Labs — Minimalist Editorial Design System & Architecture Guide

> **Version**: 4.1 (Minimalist Editorial & Screen-Framed Architecture)  
> **Philosophy**: Precision Studio · Single-Color High-Contrast Typography · Real 3D Spherical Physics · 60fps Motion  
> **Target Audience**: Technical Founders, Engineers, Enterprise Builders & AI Researchers  

---

## 1. Minimalist Editorial Design Philosophy

```
+---------------------------------------------------------------------------------+
|                                 DESIGN PILLARS                                  |
|                                                                                 |
|  1. SOLID MONOCHROME TEXT   100% single-color text with ZERO gradient clippings |
|  2. SCREEN-CENTERED FRAMING Every section occupies & centers squarely on screen |
|  3. REAL 3D SPHERICAL GLOBE True 3D canvas trigonometry with interactive spin   |
|  4. GROUNDED HONEST COPY    Realistic deliverables without marketing hyperbole  |
|  5. AMBIENT AUDIO ENGINE    Atmospheric generative Web Audio drone with toggle  |
|  6. PRESERVED TYPOGRAPHY    Outfit (display) · Plus Jakarta (body) · JetBrains  |
+---------------------------------------------------------------------------------+
```

---

## 2. Strict Single-Color Typography Standard

To maximize readability and maintain an uncluttered Swiss editorial presence, **all gradient-text clippings (`.heading-gradient`) are prohibited**.

| Element | Dark Mode Color | Light Mode Color | Styling Specification |
| :--- | :--- | :--- | :--- |
| **Hero Title (`.text-hero`)** | `#FFFFFF` | `#0F172A` | `font-display font-bold text-hero tracking-tight` |
| **Section Headings (`.text-section-h`)** | `#FFFFFF` | `#0F172A` | `font-display font-bold text-section-h tracking-tight` |
| **Card Headings (`.text-card-h`)** | `#FFFFFF` | `#0F172A` | `font-display font-bold text-card-h` |
| **Body Copy** | `#CBD5E1` | `#475569` | `font-body text-base leading-relaxed` |
| **Monospace Badges & Tags** | `var(--accent-primary)` | `var(--accent-primary)` | `font-mono text-xs uppercase tracking-wider` |

---

## 3. Screen-Centered Section Framing

Every major homepage section is built with viewport-centered geometry:
- **Geometry:** `min-h-[100svh] flex flex-col justify-center items-center py-20 px-6 max-w-[1240px] mx-auto`
- **Scrolling Behavior:** Lenis smooth scrolling naturally frames each section in the vertical center of the screen, creating a clean sequence with zero awkward cutoffs.

---

## 4. Product Sandbox: Real 3D Interactive Globe

In [EventMeshRadar.tsx](file:///home/nawaz/CODING/nayaklabs-site/src/components/products/EventMeshRadar.tsx):
- **3D Sphere Math:**
  $$x = R \cdot \cos(\text{lat}) \cdot \sin(\text{lng} + \text{rot})$$
  $$y = -R \cdot \sin(\text{lat})$$
  $$z = R \cdot \cos(\text{lat}) \cdot \cos(\text{lng} + \text{rot})$$
- **Occlusion Culling:** Only nodes with $z > 0$ are rendered in full opacity on the front face of the sphere.
- **Interactive Drag:** Users can click and drag to spin the globe freely in 3D space with inertia damping.

---

## 5. Generative Atmospheric Audio Controller

- **Engine:** Synthesized directly using the `AudioContext` oscillator and gain nodes in [audioEngine.ts](file:///home/nawaz/CODING/nayaklabs-site/src/utils/audioEngine.ts).
- **Sound Profile:** 432Hz deep soothing ambient chord pad with low-pass filtering.
- **Navbar Controller:** An interactive audio wave icon in [Navbar.tsx](file:///home/nawaz/CODING/nayaklabs-site/src/components/Navbar.tsx) that animates when playing and allows 1-click pause/mute.
