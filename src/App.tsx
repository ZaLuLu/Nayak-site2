import React, { useEffect, useCallback, useRef, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ThemeProvider } from './utils/themeContext'
import { GrainOverlay } from './components/GrainOverlay'
import { GlobalCanvasBackground } from './components/ui/GlobalCanvasBackground'
import {
  TierNavbarDispatcher,
  TierHeroDispatcher,
  TierPillarStackDispatcher,
  TierMarqueeDispatcher,
  TierAboutDispatcher,
  TierWhyChooseUsDispatcher,
  TierContactDispatcher,
} from './components/tiers/TierDispatcher'
import { SocialMediaSection } from './components/SocialMediaSection'
import { Footer } from './components/Footer'
import { IntroSequence } from './components/intro/IntroSequence'
import { SectionRailTracker } from './components/ui/SectionRailTracker'
import { TargetCursor } from './components/ui/react-bits'

import { useDeviceProfile } from './utils/useDeviceProfile'

import ProductsPage from './pages/ProductsPage'
import ServicesPage from './pages/ServicesPage'
import AcademicsPage from './pages/AcademicsPage'
import ComingSoon from './pages/ComingSoon'

gsap.registerPlugin(ScrollTrigger)

// Route title & scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    const titles: Record<string, string> = {
      '/': 'Nayak Labs — Autonomous Systems & Applied AI Studio',
      '/products': 'Nayak Labs — In-House Platforms & Interactive Runtimes',
      '/services': 'Nayak Labs — Engineering Capabilities & Client Pods',
      '/academics': 'Nayak Labs — Engineering Fellowship & Academy',
      '/coming-soon': 'Nayak Labs — Portal Deploying Soon',
    }
    document.title = titles[pathname] || 'Nayak Labs — Autonomous Systems & Applied AI Studio'
  }, [pathname])
  return null
}


function MainLayout() {
  const device = useDeviceProfile()
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const isDesktopIntroTarget =
    (device.isLaptop || device.isTV || device.isUltrawide) &&
    !device.isMobile &&
    !device.isTablet &&
    device.width >= 1024 &&
    !device.isTouch

  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window === 'undefined') return true
    const w = window.innerWidth
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    if (w < 1024 || isTouch) return true

    try {
      return sessionStorage.getItem('nayak_intro_seen_v2') === 'true'
    } catch {
      return false
    }
  })
  const [forceReplay, setForceReplay] = useState(false)
  const [heroAwake, setHeroAwake] = useState(() => {
    if (typeof window === 'undefined') return true
    const w = window.innerWidth
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    return w < 1024 || isTouch
  })

  // Ensure mobile and tablet immediately wake hero and mark intro as finished
  useEffect(() => {
    if (!isDesktopIntroTarget && !introFinished) {
      setIntroFinished(true)
      setHeroAwake(true)
      setIsIntroHandoff(false)
    }
  }, [isDesktopIntroTarget, introFinished])

  // Initialize Lenis smooth scroll ONLY on non-touch (desktop/laptop/TV) devices
  useEffect(() => {
    if (device.isTouch) return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [device.isTouch])

  // Lock body scroll only while intro sequence is in progress on desktop
  useEffect(() => {
    if (isDesktopIntroTarget && !introFinished) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (lenisRef.current) {
        lenisRef.current.resize()
      }
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDesktopIntroTarget, introFinished])

  const scrollTo = useCallback((id: string) => {
    if (id === 'home' || id === 'hero') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.1 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const target = document.getElementById(id)
    if (!target) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64, duration: 1.1 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Handle incoming scroll request from subpage navigation
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo && introFinished) {
      const timer = setTimeout(() => {
        scrollTo(state.scrollTo!)
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [location.state, introFinished, scrollTo])

  const [isIntroHandoff, setIsIntroHandoff] = useState(false)

  const handleHandoffStart = useCallback(() => {
    setIsIntroHandoff(true)
    setHeroAwake(true)
  }, [])

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true)
    setForceReplay(false)
    setHeroAwake(true)
  }, [])

  const handleReplayIntro = useCallback(() => {
    if (!isDesktopIntroTarget) return
    window.scrollTo({ top: 0, behavior: 'instant' })
    setIsIntroHandoff(false)
    setIntroFinished(false)
    setHeroAwake(false)
    setForceReplay(true)
  }, [isDesktopIntroTarget])

  return (
    <div className="relative min-h-screen bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      <GrainOverlay />
      <GlobalCanvasBackground />

      {/* Intro sequence strictly for Laptop & TV screens */}
      {isDesktopIntroTarget && !introFinished && (
        <IntroSequence
          forceReplay={forceReplay}
          onHandoffStart={handleHandoffStart}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Main layout is rendered in natural flow */}
      <div className="relative w-full">
        <TierNavbarDispatcher onScrollTo={scrollTo} onReplayIntro={isDesktopIntroTarget ? handleReplayIntro : undefined} />
        <SectionRailTracker onScrollTo={scrollTo} />

        <main id="home">
          {/* Act 1: Hero Section */}
          <TierHeroDispatcher
            visible={heroAwake || introFinished || !isDesktopIntroTarget}
            isIntroHandoff={isIntroHandoff}
            onScrollToDivision={scrollTo}
          />

          {/* Act 2: Dedicated Division Sections (P, S, A) */}
          <TierPillarStackDispatcher />

          {/* Ribbon Marquee #1 */}
          <TierMarqueeDispatcher
            text="RAPID PROTOTYPING • ARCHITECTURE DESIGN • APPLIED AI RESEARCH • PRODUCTION READY • HIGH VELOCITY • "
          />

          {/* Act 3: Studio Manifesto & Telemetry */}
          <TierAboutDispatcher />

          {/* Act 4: Milestones & Delivery Blueprint */}
          <TierWhyChooseUsDispatcher />

          {/* Act 5: Community & Dispatch (Desktop/Tablet Only) */}
          {!device.isMobile && <SocialMediaSection />}

          {/* Ribbon Marquee #2 (Desktop/Tablet Only) */}
          {!device.isMobile && (
            <TierMarqueeDispatcher
              text="AUTONOMOUS RUNTIMES • ZERO BLOAT SYSTEMS • FULL STACK ARCHITECTURES • FOUNDERS DIRECT • "
              direction="right"
            />
          )}

          {/* Act 6: Direct Founders Contact */}
          <TierContactDispatcher />
        </main>

        <Footer onScrollTo={scrollTo} onReplayIntro={handleReplayIntro} />
      </div>
    </div>
  )
}

function GlobalCursor() {
  const device = useDeviceProfile()
  if (device.isTouch) return null
  return <TargetCursor />
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalCursor />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
