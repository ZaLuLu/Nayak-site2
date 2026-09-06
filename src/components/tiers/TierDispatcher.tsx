import React from 'react'
import { useDeviceProfile } from '../../utils/useDeviceProfile'
import { MobileHero } from './mobile/MobileHero'
import { MobilePillarStack } from './mobile/MobilePillarStack'
import { MobileManifesto } from './mobile/MobileManifesto'
import { MobileWhyChooseUs } from './mobile/MobileWhyChooseUs'
import { MobileContact } from './mobile/MobileContact'

import { TabletHero } from './tablet/TabletHero'
import { TabletPillarStack } from './tablet/TabletPillarStack'
import { TabletManifesto } from './tablet/TabletManifesto'
import { TabletWhyChooseUs } from './tablet/TabletWhyChooseUs'
import { TabletContact } from './tablet/TabletContact'

import { Hero3D } from '../Hero3D'
import { PillarStack } from '../pillars/PillarStack'
import { About } from '../About'
import { WhyChooseUs } from '../WhyChooseUs'
import { Contact } from '../Contact'

// ── 1. HERO DISPATCHER ──
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

// ── 2. PILLAR STACK (DIVISIONS) DISPATCHER ──
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

// ── 3. ABOUT / MANIFESTO DISPATCHER ──
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

// ── 4. WHY CHOOSE US (WORKFLOW) DISPATCHER ──
export function TierWhyChooseUsDispatcher() {
  const device = useDeviceProfile()

  if (device.isMobile) {
    return <MobileWhyChooseUs />
  }

  if (device.isTablet || (device.isTouch && device.width < 1024)) {
    return <TabletWhyChooseUs />
  }

  return <WhyChooseUs />
}

// ── 5. CONTACT DISPATCHER ──
export function TierContactDispatcher() {
  const device = useDeviceProfile()

  if (device.isMobile) {
    return <MobileContact />
  }

  if (device.isTablet || (device.isTouch && device.width < 1024)) {
    return <TabletContact />
  }

  return <Contact />
}
