import React, { useEffect, useRef, useState, useId } from 'react'
import './CurvedLoop.css'

export interface CurvedLoopProps {
  text?: string
  speed?: number
  direction?: 'left' | 'right'
  curveHeight?: number
  fontSize?: number
  className?: string
  interactive?: boolean
}

export function CurvedLoop({
  text = 'RAPID PROTOTYPING • ARCHITECTURE DESIGN • APPLIED AI RESEARCH • PRODUCTION READY • HIGH VELOCITY • ',
  speed = 0.08,
  direction = 'left',
  curveHeight = 28,
  fontSize = 13,
  className = '',
  interactive = true,
}: CurvedLoopProps) {
  const pathId = useId()
  const textPathRef = useRef<SVGTextPathElement>(null)
  const measureTextRef = useRef<SVGTextElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const offsetRef = useRef<number>(0)
  const singleWidthRef = useRef<number>(1000)
  const animFrameRef = useRef<number | null>(null)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1)

  // 12 repeats guarantee that the path is filled with buffer on both sides
  const fullText = Array(12).fill(text).join('')

  useEffect(() => {
    // Measure single chunk width for exact seamless wrap
    if (measureTextRef.current) {
      try {
        const width = measureTextRef.current.getComputedTextLength()
        if (width > 50) singleWidthRef.current = width
      } catch {
        // Fallback
        singleWidthRef.current = text.length * (fontSize * 0.82)
      }
    }

    let lastTime = performance.now()

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 3)
      lastTime = time

      const dir = direction === 'left' ? -1 : 1
      const pixelsPerFrame = (speed * 12) * speedMultiplier * dir
      const chunk = singleWidthRef.current || 1000

      offsetRef.current += pixelsPerFrame * delta

      // Seamless mathematical wrapping using exact phrase length
      if (dir < 0) {
        if (offsetRef.current <= -chunk) {
          offsetRef.current += chunk
        }
      } else {
        if (offsetRef.current >= 0) {
          offsetRef.current -= chunk
        }
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${offsetRef.current}px`)
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [speed, direction, speedMultiplier, text, fontSize])

  // Sculpted architectural curve viewBox
  const svgWidth = 1440
  const svgHeight = 72
  const midY = 36
  const startY = midY + curveHeight * 0.35
  const endY = midY - curveHeight * 0.35
  const controlY1 = midY - curveHeight
  const controlY2 = midY + curveHeight

  const pathD = `M -600 ${startY} C ${svgWidth * 0.3} ${controlY1}, ${svgWidth * 0.7} ${controlY2}, ${svgWidth + 600} ${endY}`

  return (
    <div
      className={`curved-loop-container py-1 ${className}`}
      onMouseEnter={() => interactive && setSpeedMultiplier(1.4)}
      onMouseLeave={() => interactive && setSpeedMultiplier(1)}
    >
      <svg
        className="curved-loop-svg"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path
            id={pathId}
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>

        {/* Hidden single chunk for exact pixel measurement */}
        <text
          ref={measureTextRef}
          className="curved-loop-text"
          style={{ fontSize: `${fontSize}px`, opacity: 0, pointerEvents: 'none' }}
          aria-hidden="true"
          x="-9999"
          y="-9999"
        >
          {text}
        </text>

        <text
          className="curved-loop-text"
          style={{ fontSize: `${fontSize}px` }}
        >
          <textPath
            ref={textPathRef}
            href={`#${pathId}`}
            startOffset="0px"
          >
            {fullText}
          </textPath>
        </text>
      </svg>
    </div>
  )
}

export default CurvedLoop
