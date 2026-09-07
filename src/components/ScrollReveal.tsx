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
  variant?: string
}

/**
 * High-Velocity 60FPS Blur-Free ScrollReveal:
 * - 0% CSS filter blur overhead (eliminates GPU paint lag on fast scrolls).
 * - Aggressive pre-trigger (start: 'top 96%') so content is ready before entering user focus.
 * - Snappy hardware-accelerated opacity + subtle translateY.
 * - Immediate full visibility if element is already within viewport on mount.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  y = 16,
  duration = 0.35,
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    // If reduced motion is preferred or element is already in viewport on mount, show immediately
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: Math.min(y, 20),
        },
        {
          opacity: 1,
          y: 0,
          duration: Math.min(duration, 0.4),
          delay: Math.min(delay, 0.15),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 96%',
            once: true,
          },
        }
      )
    })

    return () => mm.revert()
  }, [delay, y, duration])

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  )
}

export default ScrollReveal

