import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ambientAudio } from '../../utils/audioEngine'

interface RailSection {
  id: string
  label: string
  num: string
  color: string
}

const RAIL_SECTIONS: RailSection[] = [
  { id: 'home', label: 'Hero Overview', num: '01', color: '#8B5CF6' },
  { id: 'products', label: 'Products (P)', num: '02', color: '#C026D3' },
  { id: 'services', label: 'Services (S)', num: '03', color: '#4F46E5' },
  { id: 'academics', label: 'Academics (A)', num: '04', color: '#A855F7' },
  { id: 'about', label: 'Studio Manifesto', num: '05', color: '#7C3AED' },
  { id: 'why-us', label: 'Engineering Roadmap', num: '06', color: '#9333EA' },
  { id: 'social', label: 'Dispatches & Community', num: '07', color: '#D946EF' },
  { id: 'contact', label: 'Direct Access', num: '08', color: '#6366F1' },
]

interface SectionRailTrackerProps {
  onScrollTo?: (id: string) => void
}

export function SectionRailTracker({ onScrollTo }: SectionRailTrackerProps) {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('home')
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const prevActiveRef = useRef('home')

  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      const now = Date.now()
      const dt = Math.max(1, now - lastScrollTime.current)
      const dy = Math.abs(window.scrollY - lastScrollY.current)
      const velocity = (dy / dt) * 1.8 // Scroll velocity factor

      lastScrollY.current = window.scrollY
      lastScrollTime.current = now

      const scrollPos = window.scrollY + window.innerHeight * 0.35
      let currentActive = 'home'

      for (let i = RAIL_SECTIONS.length - 1; i >= 0; i--) {
        const item = RAIL_SECTIONS[i]
        const el = document.getElementById(item.id)
        if (el && scrollPos >= el.offsetTop) {
          currentActive = item.id
          break
        }
      }

      if (currentActive !== prevActiveRef.current) {
        prevActiveRef.current = currentActive
        setActiveSection(currentActive)
        // Play haptic tick sound with velocity modulation
        ambientAudio.playScrollTick(velocity)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  if (!isHome) return null

  const handleDotClick = (id: string) => {
    ambientAudio.playScrollTick(2.5)
    if (onScrollTo) {
      onScrollTo(id)
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const activeIndex = RAIL_SECTIONS.findIndex((s) => s.id === activeSection)
  const activeColor = RAIL_SECTIONS[activeIndex]?.color || '#8B5CF6'

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none pointer-events-auto"
      aria-label="Page section progress"
    >
      <div className="relative flex flex-col items-center gap-6 py-2">
        {/* Weightless Hairline Spine */}
        <div className="absolute top-2 bottom-2 w-[1px] bg-[var(--border-base)]/40 pointer-events-none" />

        {/* Dynamic Glowing Active Progress Line */}
        <div
          className="absolute top-2 w-[1.5px] pointer-events-none transition-all duration-300 rounded-full"
          style={{
            height: `${Math.min(100, Math.max(0, (activeIndex / (RAIL_SECTIONS.length - 1)) * 100))}%`,
            background: `linear-gradient(to bottom, #8B5CF6, ${activeColor})`,
            boxShadow: `0 0 8px ${activeColor}80`,
          }}
        />

        {/* 8 Connected Micro-Dots with Dynamic Purple Hue Transitions */}
        {RAIL_SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id
          const isPassed = idx <= activeIndex

          return (
            <div
              key={section.id}
              className="relative flex items-center justify-center group"
            >
              {/* Refined Micro-Dot */}
              <button
                onClick={() => handleDotClick(section.id)}
                className={`relative z-10 transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'w-2.5 h-2.5 scale-125'
                    : isPassed
                    ? 'w-1.5 h-1.5 hover:scale-150'
                    : 'w-1.5 h-1.5 bg-[var(--border-base)] hover:scale-150'
                }`}
                style={{
                  backgroundColor: isActive ? section.color : isPassed ? `${section.color}CC` : undefined,
                  boxShadow: isActive ? `0 0 10px ${section.color}` : undefined,
                }}
                aria-label={`Jump to ${section.label}`}
              />

              {/* Hover-ONLY Tooltip Capsule */}
              <div
                className="absolute right-6 px-2.5 py-1 rounded-full font-mono text-[10px] whitespace-nowrap pointer-events-none transition-all duration-200 shadow-md border opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 bg-[var(--bg-card)]/90 backdrop-blur-md text-[var(--text-primary)] border-[var(--border-base)]"
              >
                <div className="flex items-center gap-1.5">
                  <span style={{ color: section.color }} className="font-bold">
                    {section.num}
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="font-body font-medium">{section.label}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default SectionRailTracker
