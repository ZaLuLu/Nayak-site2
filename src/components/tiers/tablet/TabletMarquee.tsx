import React from 'react'

interface TabletMarqueeProps {
  text: string
  direction?: 'left' | 'right'
}

export function TabletMarquee({
  text = 'RAPID PROTOTYPING • ARCHITECTURE DESIGN • APPLIED AI RESEARCH • PRODUCTION READY • HIGH VELOCITY • ',
  direction = 'left',
}: TabletMarqueeProps) {
  return (
    <div className="w-full py-2.5 my-4 overflow-hidden bg-[var(--bg-card)] border-y border-[var(--border-base)] flex items-center select-none shadow-xs">
      <div className={`flex whitespace-nowrap ${direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        <span className="font-mono font-bold text-[12px] tracking-wider text-violet-400 px-6">
          {text}
        </span>
        <span className="font-mono font-bold text-[12px] tracking-wider text-violet-400 px-6">
          {text}
        </span>
        <span className="font-mono font-bold text-[12px] tracking-wider text-violet-400 px-6">
          {text}
        </span>
      </div>
    </div>
  )
}
