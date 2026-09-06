import React from 'react'

interface MobileMarqueeProps {
  text?: string
}

export function MobileMarquee({
  text = 'RAPID PROTOTYPING • ARCHITECTURE DESIGN • APPLIED AI RESEARCH • PRODUCTION READY • HIGH VELOCITY • ',
}: MobileMarqueeProps) {
  return (
    <div className="w-full py-4 my-2 overflow-hidden bg-purple-950/20 border-y border-purple-500/20 flex items-center select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-mono font-bold text-[13px] tracking-wider text-purple-300 px-4">
          {text}
        </span>
        <span className="font-mono font-bold text-[13px] tracking-wider text-purple-300 px-4">
          {text}
        </span>
      </div>
    </div>
  )
}
