import React from 'react'

interface MobileMarqueeProps {
  text?: string
}

export function MobileMarquee({
  text = 'RAPID PROTOTYPING • ARCHITECTURE DESIGN • APPLIED AI RESEARCH • PRODUCTION READY • HIGH VELOCITY • ',
}: MobileMarqueeProps) {
  return (
    <div className="w-full py-3.5 my-3 overflow-hidden bg-[var(--bg-surface)] border-y border-[var(--border-base)] flex items-center select-none shadow-xs">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-mono font-bold text-[12px] tracking-wider text-[var(--accent-primary)] px-4">
          {text}
        </span>
        <span className="font-mono font-bold text-[12px] tracking-wider text-[var(--accent-primary)] px-4">
          {text}
        </span>
      </div>
    </div>
  )
}
