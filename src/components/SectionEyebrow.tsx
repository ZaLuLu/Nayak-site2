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
export function SectionEyebrow({ label, className = '' }: SectionEyebrowProps) {
  const cleanLabel = label
    .replace(/^—\s*/, '')
    .replace(/\/\//g, '·')
    .replace(/^\d+\s*[\/·]\s*/, '')
    .trim()

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-secondary)] font-body text-xs font-medium ${className}`}>
      <span>{cleanLabel}</span>
    </div>
  )
}

