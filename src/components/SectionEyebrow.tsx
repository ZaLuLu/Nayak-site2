import React from 'react'

interface SectionEyebrowProps {
  index?: string
  label: string
  className?: string
}

/**
 * SectionEyebrow:
 * Renders a crisp glass-pill badge in plain sentence case with a subtle accent status dot.
 * Replaces cypher-scramble and all-caps styling per v3.0 redesign spec.
 */
export function SectionEyebrow({ index, label, className = '' }: SectionEyebrowProps) {
  // Format clean human-readable label
  const cleanLabel = label
    .replace(/^—\s*/, '')
    .replace(/\/\//g, '·')
    .trim()

  const text = index ? `${index} · ${cleanLabel}` : cleanLabel

  return (
    <div className={`glass-pill ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-pulse shrink-0" />
      <span>{text}</span>
    </div>
  )
}
