import { useEffect, useCallback, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ThemeProvider } from './utils/themeContext'
import { GrainOverlay } from './components/GrainOverlay'
import { GlobalCanvasBackground } from './components/ui/GlobalCanvasBackground'
import { Navbar } from './components/Navbar'
import { Hero3D } from './components/Hero3D'
import { PillarStack } from './components/pillars/PillarStack'
import { About } from './components/About'
import { WhyChooseUs } from './components/WhyChooseUs'
import { SocialMediaSection } from './components/SocialMediaSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { IntroSequence } from './components/intro/IntroSequence'
import { SectionRailTracker } from './components/ui/SectionRailTracker'
import { TargetCursor, CurvedLoop } from './components/ui/react-bits'

import ProductsPage from './pages/ProductsPage'
import ServicesPage from './pages/ServicesPage'
import AcademicsPage from './pages/AcademicsPage'
import ComingSoon from './pages/ComingSoon'

import { useDeviceProfile } from './utils/useDeviceProfile'

gsap.registerPlugin(ScrollTrigger)

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
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
  // On mobile & tablets, allow native 120Hz/60Hz hardware momentum scrolling
  useEffect(() => {
    if (device.isTouch) return

    const lenis = new Lenis({
      duration: 1.1,
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
    gsap.ticker.lagSmoothing(0)

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
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
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
    setIsIntroHandoff(false)
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
      {!device.isTouch && <TargetCursor />}
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

      {/* Main layout is rendered in natural flow so fonts and sizes measure with 100% precision */}
      <div className="relative w-full">
        <Navbar onScrollTo={scrollTo} onReplayIntro={isDesktopIntroTarget ? handleReplayIntro : undefined} />
        <SectionRailTracker onScrollTo={scrollTo} />

        <main id="home">
          {/* Act 1: Hero Section with Scroll Zoom */}
          <Hero3D
            visible={heroAwake || introFinished || !isDesktopIntroTarget}
            isIntroHandoff={isIntroHandoff}
            onScrollToDivision={scrollTo}
          />

          {/* Act 2: Dedicated Division Sections (P, S, A) */}
          <PillarStack />

          {/* Organic Sleek Curved Ribbon Marquee #1 */}
          <CurvedLoop
            text="RAPID PROTOTYPING • ARCHITECTURE DESIGN • APPLIED AI RESEARCH • PRODUCTION READY • HIGH VELOCITY • "
            speed={0.06}
            fontSize={13}
            curveHeight={24}
            className="my-3 opacity-90"
          />

          {/* Act 3: Studio Manifesto */}
          <About />

          {/* Act 4: Linear Interactive Why Choose Us */}
          <WhyChooseUs />

          {/* Act 5: Community & Dispatch (Social Media Placeholder) */}
          <SocialMediaSection />

          {/* Organic Sleek Curved Ribbon Marquee #2 (Duplicated before Contact) */}
          <CurvedLoop
            text="AUTONOMOUS RUNTIMES • ZERO BLOAT SYSTEMS • FULL STACK ARCHITECTURES • FOUNDERS DIRECT • "
            speed={0.06}
            direction="right"
            fontSize={13}
            curveHeight={24}
            className="my-3 opacity-90"
          />

          {/* Act 6: Direct 3-Card Contact (Gmail, LinkedIn, Instagram) */}
          <Contact />
        </main>

        <Footer onScrollTo={scrollTo} onReplayIntro={handleReplayIntro} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
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
