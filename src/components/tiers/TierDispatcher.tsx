import React from 'react'
import { useDeviceProfile } from '../../utils/useDeviceProfile'

// Mobile-Dedicated Components (100% Isolated in src/components/tiers/mobile/)
import { MobileNavbar } from './mobile/MobileNavbar'
import { MobileHero } from './mobile/MobileHero'
import { MobileMarquee } from './mobile/MobileMarquee'
import { MobileManifesto } from './mobile/MobileManifesto'
import { MobileContact } from './mobile/MobileContact'

// Tablet-Dedicated Components
import { TabletHero } from './tablet/TabletHero'
import { TabletPillarStack } from './tablet/TabletPillarStack'
import { TabletManifesto } from './tablet/TabletManifesto'
import { TabletWhyChooseUs } from './tablet/TabletWhyChooseUs'
import { TabletContact } from './tablet/TabletContact'

// Desktop & Laptop Components (UNTOUCHED)
import { Navbar } from '../Navbar'
import { Hero3D } from '../Hero3D'
import { PillarStack } from '../pillars/PillarStack'
import { About } from '../About'
import { WhyChooseUs } from '../WhyChooseUs'
import { Contact } from '../Contact'
import { CurvedLoop } from '../ui/react-bits'

// ── 1. NAVBAR DISPATCHER ──
interface TierNavbarProps {
  onScrollTo?: (id: string) => void
  onReplayIntro?: () => void
}

export function TierNavbarDispatcher({ onScrollTo, onReplayIntro }: TierNavbarProps) {
  const device = useDeviceProfile()

  if (device.isMobile) {
    return <MobileNavbar onScrollTo={onScrollTo} />
  }

  return <Navbar onScrollTo={onScrollTo} onReplayIntro={onReplayIntro} />
}

// ── 2. HERO DISPATCHER ──
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

// ── 3. PILLAR STACK (DIVISIONS) DISPATCHER ──
export function TierPillarStackDispatcher() {
  const device = useDeviceProfile()

  // On mobile, the 3 stacked purple cards in MobileHero already handle direct page navigation cleanly!
  if (device.isMobile) {
    return null
  }

  if (device.isTablet || (device.isTouch && device.width < 1024)) {
    return <TabletPillarStack />
  }

  return <PillarStack />
}

// ── 4. RIBBON MARQUEE DISPATCHER ──
interface TierMarqueeProps {
  text: string
  direction?: 'left' | 'right'
}

export function TierMarqueeDispatcher({ text, direction = 'left' }: TierMarqueeProps) {
  const device = useDeviceProfile()

  if (device.isMobile) {
    return <MobileMarquee text={text} />
  }

  return (
    <CurvedLoop
      text={text}
      direction={direction}
      speed={0.06}
      fontSize={13}
      curveHeight={24}
      className="my-3 opacity-90"
    />
  )
}

// ── 5. ABOUT / MANIFESTO DISPATCHER ──
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

// ── 6. WHY CHOOSE US (WORKFLOW) DISPATCHER ──
export function TierWhyChooseUsDispatcher() {
  const device = useDeviceProfile()

  // On mobile, keep it streamlined and focused
  if (device.isMobile) {
    return null
  }

  if (device.isTablet || (device.isTouch && device.width < 1024)) {
    return <TabletWhyChooseUs />
  }

  return <WhyChooseUs />
}

// ── 7. CONTACT DISPATCHER ──
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
