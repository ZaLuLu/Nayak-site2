import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../../utils/themeContext'
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react'

interface MobileNavbarProps {
  onScrollTo?: (id: string) => void
}

const MOBILE_NAV_LINKS = [
  { label: 'Products', num: '01', id: 'products', pagePath: '/products' },
  { label: 'Services', num: '02', id: 'services', pagePath: '/services' },
  { label: 'Academics', num: '03', id: 'academics', pagePath: '/academics' },
  { label: 'Studio Manifesto', num: '04', id: 'about', pagePath: '/#about' },
  { label: 'Direct Contact', num: '05', id: 'contact', pagePath: '/#contact' },
]

export function MobileNavbar({ onScrollTo }: MobileNavbarProps) {
  const { themeMode, toggleThemeMode } = useTheme()
  const isDark = themeMode === 'dark'
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const handleLinkClick = (link: typeof MOBILE_NAV_LINKS[0]) => {
    setMenuOpen(false)
    if (isHome) {
      if (link.pagePath.startsWith('/#')) {
        const el = document.getElementById(link.id)
        el?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(link.pagePath)
      }
    } else {
      if (link.pagePath.startsWith('/#')) {
        navigate('/', { state: { scrollTo: link.id } })
      } else {
        navigate(link.pagePath)
      }
    }
  }

  const handleBrandClick = () => {
    setMenuOpen(false)
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <header className="fixed top-3 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto w-full max-w-[480px] h-12 px-4 rounded-full navbar-glass border border-[var(--border-base)] shadow-xl flex items-center justify-between transition-all duration-300"
          aria-label="Mobile navigation"
        >
          {/* Prominent Bold Brand Wordmark */}
          <Link
            to="/"
            onClick={handleBrandClick}
            className="flex items-center gap-2 group cursor-pointer text-left select-none pl-1"
            aria-label="Nayak Labs home"
          >
            <span className="font-display font-black text-[var(--text-primary)] text-[15px] tracking-tight transition-opacity duration-200 group-hover:opacity-85">
              Nayak Labs
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] inline-block shadow-[0_0_8px_var(--accent-primary)]" />
          </Link>

          {/* Action Icons: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => toggleThemeMode()}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 rounded-full transition-colors cursor-pointer active:scale-90"
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-[var(--text-primary)] rounded-full hover:bg-[var(--text-primary)]/5 active:scale-90 transition-transform cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {menuOpen ? <X className="w-4 h-4 text-[var(--accent-primary)]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--bg-base)]/98 backdrop-blur-2xl flex flex-col justify-between pt-20 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200"
          aria-modal="true"
        >
          <div className="space-y-3 pt-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-2">
              Navigation Index
            </div>

            {MOBILE_NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link)}
                className="w-full p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-center justify-between text-left active:scale-98 transition-transform shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--accent-primary)] font-bold">
                    {link.num}
                  </span>
                  <span className="font-display font-bold text-base text-[var(--text-primary)]">
                    {link.label}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--border-base)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>NayakLabs // Mobile V2.5</span>
            <span className="text-[var(--accent-primary)] font-semibold">0 Middlemen</span>
          </div>
        </div>
      )}
    </>
  )
}
