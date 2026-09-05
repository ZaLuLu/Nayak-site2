import React, { useEffect, useRef } from 'react'

export interface StrandsProps {
  className?: string
  strandCount?: number
  pointsPerStrand?: number
  speed?: number
  amplitude?: number
  wavelength?: number
  colors?: string[]
  interactive?: boolean
  opacity?: number
}

export function Strands({
  className = '',
  strandCount = 18,
  pointsPerStrand = 60,
  speed = 0.0018,
  amplitude = 45,
  wavelength = 0.008,
  colors = ['#8B5CF6', '#C026D3', '#4F46E5', '#A855F7', '#38BDF8'],
  interactive = true,
  opacity = 0.65,
}: StrandsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Visibility observer to pause animation when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current.targetX = e.clientX - rect.left
      mousePos.current.targetY = e.clientY - rect.top
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render)
        return
      }

      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05

      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = opacity

      time += speed

      const centerY = height / 2

      for (let i = 0; i < strandCount; i++) {
        const progress = i / (strandCount - 1 || 1)
        const strandPhase = i * 0.45
        const color = colors[i % colors.length]

        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5 + Math.sin(progress * Math.PI) * 1.5
        ctx.lineCap = 'round'

        // Create subtle glowing gradient along the strand
        const grad = ctx.createLinearGradient(0, 0, width, height)
        grad.addColorStop(0, `${color}22`)
        grad.addColorStop(0.5, color)
        grad.addColorStop(1, `${color}44`)
        ctx.strokeStyle = grad

        for (let j = 0; j <= pointsPerStrand; j++) {
          const px = (j / pointsPerStrand) * width

          // Mathematical wave combination
          const wave1 = Math.sin(px * wavelength + time + strandPhase) * amplitude
          const wave2 = Math.cos(px * (wavelength * 1.6) - time * 0.8 + strandPhase) * (amplitude * 0.5)

          // Mouse influence
          const distToMouse = Math.hypot(px - mousePos.current.x, centerY - mousePos.current.y)
          const mouseEffect = Math.exp(-distToMouse / 220) * 40 * Math.sin(time * 3 + i)

          const py = centerY + wave1 + wave2 + mouseEffect + (progress - 0.5) * (height * 0.4)

          if (j === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }

        ctx.stroke()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      if (interactive) window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [strandCount, pointsPerStrand, speed, amplitude, wavelength, colors, interactive, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
