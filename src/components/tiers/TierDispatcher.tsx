import React from 'react'
import { useDeviceProfile } from '../../utils/useDeviceProfile'
import { MobileHero } from './mobile/MobileHero'
import { MobilePillarStack } from './mobile/MobilePillarStack'
import { MobileManifesto } from './mobile/MobileManifesto'
import { TabletHero } from './tablet/TabletHero'
import { TabletPillarStack } from './tablet/TabletPillarStack'
import { TabletManifesto } from './tablet/TabletManifesto'
import { Hero3D } from '../Hero3D'
import { PillarStack } from '../pillars/PillarStack'
import { About } from '../About'

// ── HERO DISPATCHER ──
interface TierHeroProps {
  visible?: boolean
  isIntroHandoff?: boolean
  onScrollToDivision?: (id: string) => void
}

export function TierHeroDispatcher({
  visible = true,
  isIntroHandoff = false,
  onScrollToDivision,
}: TierHeroProps) {
  const device = useDeviceProfile()

  if (device.isMobile) {
    return <MobileHero onScrollToDivision={onScrollToDivision} />
  }

  if (device.isTablet || (device.isTouch && device.width < 1024)) {
    return <TabletHero onScrollToDivision={onScrollToDivision} />
  }

  return (
    <Hero3D
      visible={visible}
      isIntroHandoff={isIntroHandoff}
      onScrollToDivision={onScrollToDivision}
    />
  )
}

// ── PILLAR STACK (DIVISIONS) DISPATCHER ──
export function TierPillarStackDispatcher() {
  const device = useDeviceProfile()

  if (device.isMobile) {
    return <MobilePillarStack />
  }

  if (device.isTablet || (device.isTouch && device.width < 1024)) {
    return <TabletPillarStack />
  }

  return <PillarStack />
}

// ── ABOUT / MANIFESTO DISPATCHER ──
export function TierAboutDispatcher() {
  const device = useDeviceProfile()

  if (device.isMobile) {
    return <MobileManifesto />
  }

  if (device.isTablet || (device.isTouch && device.width < 1024)) {
    return <TabletManifesto />
  }

  return <About />
}
