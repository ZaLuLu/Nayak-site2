import React, { useEffect, useRef } from 'react'

export interface GradientWavesProps {
  className?: string
  speed?: number
  waveLayers?: number
  amplitude?: number
  frequency?: number
  colors?: string[]
  opacity?: number
}

export function GradientWaves({
  className = '',
  speed = 0.0012,
  waveLayers = 5,
  amplitude = 50,
  frequency = 0.004,
  colors = [
    'rgba(139, 92, 246, 0.25)',  // violet
    'rgba(192, 38, 211, 0.20)',  // fuchsia
    'rgba(79, 70, 229, 0.18)',   // indigo
    'rgba(168, 85, 247, 0.15)',  // purple
    'rgba(56, 189, 248, 0.12)',  // cyan sky
  ],
  opacity = 0.85,
}: GradientWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render)
        return
      }

      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = opacity

      time += speed

      const horizonY = height * 0.45

      // Render each rolling harmonic wave layer from back to front
      for (let layer = 0; layer < waveLayers; layer++) {
        const layerRatio = (layer + 1) / waveLayers
        const color = colors[layer % colors.length]
        const layerAmp = amplitude * (0.6 + layerRatio * 0.8)
        const layerFreq = frequency * (1 - layerRatio * 0.3)
        const layerSpeed = time * (0.8 + layerRatio * 0.6)
        const layerY = horizonY + (height - horizonY) * (layerRatio * 0.85)

        ctx.beginPath()
        ctx.moveTo(0, height)
        ctx.lineTo(0, layerY)

        const step = 8
        for (let x = 0; x <= width; x += step) {
          const sin1 = Math.sin(x * layerFreq + layerSpeed + layer * 1.2)
          const sin2 = Math.cos(x * (layerFreq * 1.8) - layerSpeed * 0.5) * 0.5
          const y = layerY + (sin1 + sin2) * layerAmp * Math.sin((x / width) * Math.PI)
          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.closePath()

        // Gradient fill for depth
        const fillGrad = ctx.createLinearGradient(0, layerY - layerAmp, 0, height)
        fillGrad.addColorStop(0, color)
        fillGrad.addColorStop(1, 'transparent')

        ctx.fillStyle = fillGrad
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [speed, waveLayers, amplitude, frequency, colors, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
