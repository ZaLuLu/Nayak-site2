import { useState, useEffect } from 'react'

export type DeviceTier = 'mobile' | 'tablet' | 'desktop' | 'tv'

export interface DeviceTierInfo {
  tier: DeviceTier
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTV: boolean
  isTouch: boolean
  width: number
  height: number
  orientation: 'portrait' | 'landscape'
}

function resolveDeviceTier(): DeviceTierInfo {
  if (typeof window === 'undefined') {
    return {
      tier: 'desktop',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTV: false,
      isTouch: false,
      width: 1440,
      height: 900,
      orientation: 'landscape',
    }
  }

  const width = window.innerWidth
  const height = window.innerHeight
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
  const isLandscape = window.matchMedia('(orientation: landscape)').matches
  const orientation: 'portrait' | 'landscape' = isLandscape ? 'landscape' : 'portrait'

  let tier: DeviceTier = 'desktop'

  if (width >= 1920 && !isTouch) {
    tier = 'tv'
  } else if (width < 768) {
    tier = 'mobile'
  } else if (width < 1024 || (isTouch && width <= 1366)) {
    tier = 'tablet'
  } else {
    tier = 'desktop'
  }

  return {
    tier,
    isMobile: tier === 'mobile',
    isTablet: tier === 'tablet',
    isDesktop: tier === 'desktop',
    isTV: tier === 'tv',
    isTouch,
    width,
    height,
    orientation,
  }
}

export function useDeviceTier(): DeviceTierInfo {
  const [tierInfo, setTierInfo] = useState<DeviceTierInfo>(resolveDeviceTier)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    const handleResize = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        setTierInfo(resolveDeviceTier())
      }, 50)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return tierInfo
}
