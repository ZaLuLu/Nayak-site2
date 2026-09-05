import React, { useEffect, useState, useRef } from 'react'

interface NumberFlowProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  decimals?: number
}

/**
 * SmoothUI inspired NumberFlow component
 * Smoothly interpolates and ticks numerical values on scroll into view with spring physics
 */
export function NumberFlow({
  value,
  prefix = '',
  suffix = '',
  duration = 1800,
  className = '',
  decimals = 0,
}: NumberFlowProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()

          const update = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out expo curve for ultra-smooth mechanical deceleration
            const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            const current = easeOutProgress * value

            setDisplayValue(current)

            if (progress < 1) {
              requestAnimationFrame(update)
            } else {
              setDisplayValue(value)
            }
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  const formattedNumber = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={elementRef} className={`font-mono tabular-nums inline-block ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  )
}

export default NumberFlow
