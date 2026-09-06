import { useState, useEffect } from 'react'

export type DeviceType =
  | 'tv-ultrawide'
  | 'laptop'
  | 'tablet-landscape'
  | 'tablet-portrait'
  | 'mobile'

export interface DeviceProfile {
  deviceType: DeviceType
  aspectRatio: number
  width: number
  height: number
  orientation: 'landscape' | 'portrait'
  isTouch: boolean
  isUltrawide: boolean
  isTV: boolean
  isLaptop: boolean
  isTablet: boolean
  isTabletLandscape: boolean
  isTabletPortrait: boolean
  isMobile: boolean
}

function calculateDeviceProfile(): DeviceProfile {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'laptop',
      aspectRatio: 16 / 9,
      width: 1440,
      height: 900,
      orientation: 'landscape',
      isTouch: false,
      isUltrawide: false,
      isTV: false,
      isLaptop: true,
      isTablet: false,
      isTabletLandscape: false,
      isTabletPortrait: false,
      isMobile: false,
    }
  }

  const width = window.innerWidth
  const height = window.innerHeight

  // Use hardware orientation / media queries rather than volatile innerHeight
  // so virtual keyboards on mobile/tablets NEVER trigger false landscape switches
  const isLandscapeQuery = window.matchMedia('(orientation: landscape)').matches
  const orientation: 'landscape' | 'portrait' = isLandscapeQuery ? 'landscape' : 'portrait'
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window

  // Calculate base physical screen dimensions for stable categorization
  const screenWidth = typeof window.screen !== 'undefined' ? window.screen.width : width
  const effectiveWidth = Math.min(width, screenWidth || width)

  let deviceType: DeviceType = 'laptop'
  const aspectRatio = width / (height || 1)
  const isUltrawide = width >= 2100 || (width >= 1600 && aspectRatio >= 2.05)
  const isTV = width >= 1920 && !isTouch

  if (isTV || isUltrawide) {
    deviceType = 'tv-ultrawide'
  } else if (effectiveWidth < 640 || (!isLandscapeQuery && effectiveWidth < 768)) {
    // Phone form factor (immune to virtual keyboard height drops)
    deviceType = 'mobile'
  } else if (effectiveWidth <= 1366 && isTouch) {
    // Tablet / iPad form factor
    if (orientation === 'landscape') {
      deviceType = 'tablet-landscape'
    } else {
      deviceType = 'tablet-portrait'
    }
  } else if (effectiveWidth >= 640 && effectiveWidth < 1024 && !isTouch) {
    deviceType = orientation === 'portrait' ? 'tablet-portrait' : 'laptop'
  } else {
    deviceType = 'laptop'
  }

  return {
    deviceType,
    aspectRatio,
    width,
    height,
    orientation,
    isTouch,
    isUltrawide,
    isTV,
    isLaptop: deviceType === 'laptop',
    isTablet: deviceType === 'tablet-landscape' || deviceType === 'tablet-portrait',
    isTabletLandscape: deviceType === 'tablet-landscape',
    isTabletPortrait: deviceType === 'tablet-portrait',
    isMobile: deviceType === 'mobile',
  }
}

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(calculateDeviceProfile)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const next = calculateDeviceProfile()
        setProfile(next)

        // Synchronize HTML root data attributes for CSS rules
        const root = document.documentElement
        root.setAttribute('data-device', next.deviceType)
        root.setAttribute('data-orientation', next.orientation)
        root.setAttribute('data-touch', next.isTouch ? 'true' : 'false')
        root.setAttribute(
          'data-aspect',
          next.isUltrawide
            ? 'ultrawide'
            : next.orientation === 'landscape'
            ? '16-9'
            : 'portrait'
        )
      }, 50)
    }

    const initial = calculateDeviceProfile()
    const root = document.documentElement
    root.setAttribute('data-device', initial.deviceType)
    root.setAttribute('data-orientation', initial.orientation)
    root.setAttribute('data-touch', initial.isTouch ? 'true' : 'false')
    root.setAttribute(
      'data-aspect',
      initial.isUltrawide
        ? 'ultrawide'
        : initial.orientation === 'landscape'
        ? '16-9'
        : 'portrait'
    )

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return profile
}
