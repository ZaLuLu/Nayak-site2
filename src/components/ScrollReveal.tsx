import React, { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
  duration?: number
  variant?: 'blur-focus' | 'fade-up' | 'clip-wipe' | 'line-stagger' | 'depth-scale'
}

/**
 * ScrollReveal:
 * Locked v3.0 Blur-to-Focus Section Reveal.
 * Duration: 700ms, Easing: power2.out.
 * Panel enters at blur(6px) opacity 0.7 translateY(24px), resolves cleanly to blur(0) opacity 1 translateY(0).
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  y = 24,
  duration = 0.7,
  variant = 'blur-focus',
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        motionOK: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { motionOK } = context.conditions as { motionOK: boolean }
        if (!motionOK) {
          gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: 'none', clipPath: 'none' })
          return
        }

        // Section blur-to-focus reveal (LOCKED in spec: 700ms power2.out, blur 6px -> 0, opacity 0.7 -> 1, translateY 24px -> 0)
        gsap.fromTo(
          el,
          {
            opacity: 0.7,
            y,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        )
      }
    )

    return () => mm.revert()
  }, [delay, y, duration, variant])

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  )
}
