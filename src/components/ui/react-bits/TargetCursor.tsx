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
  targets = 'button, a, [role="button"], [data-cursor-target], .cursor-target, input, textarea',
  idleSize = 28,
  padding = 6,
  lerpFactor = 0.18,
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

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Check if mouse is hovering over a target
      const target = (e.target as HTMLElement | null)?.closest(targets) as HTMLElement | null
      if (target) {
        activeTargetRef.current = target
        setIsLocked(true)
      } else {
        activeTargetRef.current = null
        setIsLocked(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsLocked(false)
      activeTargetRef.current = null
    }

    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Animation Loop with lerp smoothing
    const update = () => {
      if (activeTargetRef.current && document.body.contains(activeTargetRef.current)) {
        const rect = activeTargetRef.current.getBoundingClientRect()
        // Lock to target center
        const targetCenterX = rect.left + rect.width / 2
        const targetCenterY = rect.top + rect.height / 2

        cursorPos.current.x += (targetCenterX - cursorPos.current.x) * lerpFactor
        cursorPos.current.y += (targetCenterY - cursorPos.current.y) * lerpFactor

        targetDim.current.w = rect.width + padding * 2
        targetDim.current.h = rect.height + padding * 2
      } else {
        // Track free mouse
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor

        targetDim.current.w = idleSize
        targetDim.current.h = idleSize
      }

      boxDim.current.w += (targetDim.current.w - boxDim.current.w) * lerpFactor
      boxDim.current.h += (targetDim.current.h - boxDim.current.h) * lerpFactor

      if (centerRef.current) {
        centerRef.current.style.left = `${mousePos.current.x}px`
        centerRef.current.style.top = `${mousePos.current.y}px`
      }

      if (boxRef.current) {
        boxRef.current.style.left = `${cursorPos.current.x}px`
        boxRef.current.style.top = `${cursorPos.current.y}px`
        boxRef.current.style.width = `${boxDim.current.w}px`
        boxRef.current.style.height = `${boxDim.current.h}px`
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
      {/* Center Reticle Point */}
      <div
        ref={centerRef}
        className={`target-cursor-center ${isMouseDown ? 'active' : ''}`}
      />

      {/* 4 Outer Snapping Corners */}
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
