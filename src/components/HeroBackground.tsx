import React, { useRef, useEffect } from 'react'
import { MoltenMetal } from './ui/react-bits'

/**
 * HeroBackground:
 * Clean, restrained 2-layer system:
 * Layer 1: MoltenMetal fluid specular shader (slow, serene, mode-adaptive)
 * Layer 2: Precision architectural coordinate grid & soft peripheral vignette
 */
export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Layer 1: Prominent React Bits MoltenMetal Specular Fluid Shader ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-85 dark:opacity-80">
        <MoltenMetal
          speed={0.18}
          viscosity={0.68}
          metallic={0.95}
          opacity={0.75}
        />
      </div>

      {/* ── Layer 2: Precision Architectural Crosshair Coordinate Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-base) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-base) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 85%)',
        }}
      />

      {/* ── Layer 3: Soft Specular Edge Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, var(--bg-base) 95%)',
        }}
      />
    </div>
  )
}
