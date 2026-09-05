import React, { useRef, useState, useCallback } from 'react'
import { useTheme } from '../utils/themeContext'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  borderGlowColor?: string
  enable3DTilt?: boolean
  showCornerMarks?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  style?: React.CSSProperties
}

/**
 * SpotlightCard:
 * Bespoke 3D Luxury Tilt Card with Dual-Mode Physical Lighting:
 * - 🌑 Dark Mode: High-precision brushed platinum laser spotlight + diamond-cut specular border glow.
 * - ☀️ Light Mode: 7-color sunlight prism caustic rainbow dispersion glint + architectural drafting corner marks.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'var(--spotlight-default)',
  borderGlowColor = 'var(--spotlight-border-default)',
  enable3DTilt = true,
  showCornerMarks = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style = {},
}: SpotlightCardProps) {
  const { themeMode } = useTheme()
  const isDark = themeMode === 'dark'

  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // High-performance CSS custom properties update - 0 React re-renders during mouse tracking
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)

      if (enable3DTilt) {
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!isTouch && !isReduced) {
          const normX = (x / rect.width - 0.5) * 10
          const normY = (y / rect.height - 0.5) * -10
          card.style.transform = `perspective(1100px) rotateX(${normY.toFixed(2)}deg) rotateY(${normX.toFixed(2)}deg) translateZ(12px) translateY(-5px)`
        }
      }
    },
    [enable3DTilt]
  )

  const handleMouseEnter = () => {
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    const card = cardRef.current
    if (card) {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)'
    }
    onMouseLeave?.()
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.25s ease',
      }}
      className={`glass-panel relative overflow-hidden ${className}`}
    >
      {/* ── ☀️ Light Mode: 7-Color Sunlight Prism Rainbow Caustic Dispersion Glint ── */}
      {!isDark && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: isHovered ? 0.75 : 0,
            background: `radial-gradient(360px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 255, 255, 0.95) 0%, rgba(244, 114, 182, 0.12) 22%, rgba(167, 139, 250, 0.12) 45%, rgba(56, 189, 248, 0.10) 68%, transparent 85%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* ── 🌑 Dark Mode: Brushed Platinum Laser Spotlight ── */}
      {isDark && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(380px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Specular White Top-Edge Glare */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: isHovered ? (isDark ? 0.65 : 0.45) : 0,
          background: `radial-gradient(260px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 255, 255, ${isDark ? 0.14 : 0.4}), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Illuminated 3D border glow mask */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${borderGlowColor}, transparent 70%)`,
          maskImage: 'linear-gradient(#000,#000), linear-gradient(#000,#000)',
          maskClip: 'content-box, border-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          border: '1px solid transparent',
        }}
        aria-hidden="true"
      />

      {/* ── Architectural Drafting Corner Marks (L-Brackets in Light / Diamond Accents in Dark) ── */}
      {showCornerMarks && (
        <div className="pointer-events-none absolute inset-2.5 z-20 opacity-40 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
          {/* Top-Left */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--border-hover)] opacity-70" />
          {/* Top-Right */}
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--border-hover)] opacity-70" />
          {/* Bottom-Left */}
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--border-hover)] opacity-70" />
          {/* Bottom-Right */}
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--border-hover)] opacity-70" />
        </div>
      )}

      {/* 3D Elevated Content Layer */}
      <div
        className="relative z-10"
        style={{
          transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default SpotlightCard
