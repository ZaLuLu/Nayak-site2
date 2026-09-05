import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * WidePleatedGlass:
 * Continuous full-viewport backdrop rendering wide frosted fluted/pleated glass columns.
 * Features subtle optical refraction stripes, backdrop blur, and GSAP scroll parallax.
 */
export function WidePleatedGlass() {
  const containerRef = useRef<HTMLDivElement>(null)
  const columnsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const col = columnsRef.current
    if (!col) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(col, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="frosted-pleats-container"
      aria-hidden="true"
    >
      <div
        ref={columnsRef}
        className="w-full h-[120vh] -top-[10vh] grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-14 pointer-events-none select-none opacity-80 transition-opacity duration-300"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={`frosted-pleat-column ${
              i >= 6 ? 'hidden sm:block' : ''
            } ${i >= 8 ? 'hidden md:block' : ''} ${i >= 12 ? 'hidden lg:block' : ''}`}
            style={{
              opacity: i % 2 === 0 ? 0.9 : 0.65,
            }}
          >
            {/* Top specular glint */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/[0.04] dark:from-white/[0.03] to-transparent pointer-events-none" />
            
            {/* Vertical hairline shimmer */}
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.06] dark:via-white/[0.05] to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default WidePleatedGlass
