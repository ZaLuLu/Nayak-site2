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
  const aspectRatio = width / (height || 1)
  const orientation: 'landscape' | 'portrait' = width >= height ? 'landscape' : 'portrait'
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window

  let deviceType: DeviceType = 'laptop'
  const isUltrawide = aspectRatio >= 2.05
  const isTV = width >= 1920 || (width >= 1600 && aspectRatio >= 2.0)

  if (isTV || (width >= 1920 && !isTouch)) {
    deviceType = 'tv-ultrawide'
  } else if (width < 640 || (width < 768 && orientation === 'portrait')) {
    deviceType = 'mobile'
  } else if (width >= 640 && width <= 1366 && isTouch) {
    if (orientation === 'landscape') {
      deviceType = 'tablet-landscape'
    } else {
      deviceType = 'tablet-portrait'
    }
  } else if (width >= 768 && width < 1024 && !isTouch) {
    // Small desktop / portrait monitor
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
          next.aspectRatio >= 2.0
            ? 'ultrawide'
            : next.aspectRatio >= 1.5
            ? '16-9'
            : next.aspectRatio >= 1.2
            ? '4-3'
            : 'portrait'
        )
      }, 60)
    }

    // Set initial attributes
    const initial = calculateDeviceProfile()
    const root = document.documentElement
    root.setAttribute('data-device', initial.deviceType)
    root.setAttribute('data-orientation', initial.orientation)
    root.setAttribute('data-touch', initial.isTouch ? 'true' : 'false')
    root.setAttribute(
      'data-aspect',
      initial.aspectRatio >= 2.0
        ? 'ultrawide'
        : initial.aspectRatio >= 1.5
        ? '16-9'
        : initial.aspectRatio >= 1.2
        ? '4-3'
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
