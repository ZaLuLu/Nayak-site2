import React, { useEffect, useRef, useState } from 'react'
import './TargetCursor.css'

export interface TargetCursorProps {
  targets?: string
  idleSize?: number
  padding?: number
  cornerSize?: number
  borderWidth?: number
  centerDotSize?: number
  lerpFactor?: number
  disabled?: boolean
}

export function TargetCursor({
  targets = 'button, a, input, select, textarea, [role="button"], [role="tab"], [role="link"], [data-cursor-target], .cursor-target, [data-cursor-snap], .card-tactile, .drafting-card, .glass-panel, [data-card], .interactive-card, .interactive-panel, [data-interactive], .cursor-pointer, summary, label[for]',
  idleSize = 28,
  padding = 6,
  lerpFactor = 0.25,
  disabled = false,
}: TargetCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const mousePos = useRef({ x: -100, y: -100 })
  const cursorPos = useRef({ x: -100, y: -100 })
  const boxDim = useRef({ w: idleSize, h: idleSize })
  const targetDim = useRef({ w: idleSize, h: idleSize })

  const centerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const activeTargetRef = useRef<HTMLElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    // Check if device supports fine hover/pointer (disables on touch screens)
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch || disabled) return

    let targetEl: HTMLElement | null = null

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) {
        cursorPos.current = { x: e.clientX, y: e.clientY }
        setIsVisible(true)
      }

      // Check if mouse is hovering over an interactive target
      const target = (e.target as HTMLElement | null)?.closest(targets) as HTMLElement | null
      if (target && document.body.contains(target)) {
        const rect = target.getBoundingClientRect()
        // Ensure element is visible and within sensible interactive element dimensions (< 1400x1000)
        if (rect.width > 12 && rect.height > 12 && rect.width <= 1400 && rect.height <= 1000) {
          targetEl = target
          activeTargetRef.current = target
          setIsLocked(true)
          return
        }
      }

      targetEl = null
      activeTargetRef.current = null
      setIsLocked(false)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsLocked(false)
      targetEl = null
      activeTargetRef.current = null
    }

    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Ultra-Fast 60FPS RAF Loop with Real-Time Element Rect Sync
    const update = () => {
      if (targetEl && document.body.contains(targetEl)) {
        const rect = targetEl.getBoundingClientRect()
        const targetCenterX = rect.left + rect.width / 2
        const targetCenterY = rect.top + rect.height / 2

        cursorPos.current.x += (targetCenterX - cursorPos.current.x) * lerpFactor
        cursorPos.current.y += (targetCenterY - cursorPos.current.y) * lerpFactor

        targetDim.current.w = rect.width + padding * 2
        targetDim.current.h = rect.height + padding * 2
      } else {
        // Track free mouse pointer
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor

        targetDim.current.w = idleSize
        targetDim.current.h = idleSize
      }

      boxDim.current.w += (targetDim.current.w - boxDim.current.w) * lerpFactor
      boxDim.current.h += (targetDim.current.h - boxDim.current.h) * lerpFactor

      // Direct hardware-accelerated transforms without CSS transition lag
      if (centerRef.current) {
        centerRef.current.style.transform = `translate3d(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px, 0)`
      }

      if (boxRef.current) {
        const x = cursorPos.current.x - boxDim.current.w / 2
        const y = cursorPos.current.y - boxDim.current.h / 2
        boxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
        boxRef.current.style.width = `${Math.round(boxDim.current.w)}px`
        boxRef.current.style.height = `${Math.round(boxDim.current.h)}px`
      }

      animationFrameRef.current = requestAnimationFrame(update)
    }

    animationFrameRef.current = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [targets, idleSize, padding, lerpFactor, disabled, isVisible])

  if (disabled) return null

  return (
    <div
      className={`target-cursor-wrapper ${!isVisible ? 'hidden' : ''}`}
      aria-hidden="true"
    >
      {/* Center Reticle Point (Zero latency) */}
      <div
        ref={centerRef}
        className={`target-cursor-center ${isMouseDown ? 'active' : ''}`}
      />

      {/* 4 Outer Snapping Corners (Smooth Lerp Lock) */}
      <div
        ref={boxRef}
        className={`target-cursor-box ${isLocked ? 'locked' : ''}`}
      >
        <div className="target-cursor-corner tl" />
        <div className="target-cursor-corner tr" />
        <div className="target-cursor-corner br" />
        <div className="target-cursor-corner bl" />
      </div>
    </div>
  )
}

export default TargetCursor

