import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Globe, GraduationCap, Code2, Cpu, Sparkles, Layers, ShieldCheck } from 'lucide-react'
import { DIVISIONS, SCOPE_BADGES } from '../../../data/divisions'
import { ambientAudio } from '../../../utils/audioEngine'

interface TabletHeroProps {
  onScrollToDivision?: (id: string) => void
}

export function TabletHero({ onScrollToDivision }: TabletHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Lightweight native canvas particle/mesh background for Tablet
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle nodes
    const particleCount = 28
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Connect near nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw and move particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(167, 139, 250, 0.4)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const getDivisionIcon = (letter: string) => {
    switch (letter) {
      case 'P':
        return <Terminal className="w-5 h-5 text-violet-400" />
      case 'S':
        return <Globe className="w-5 h-5 text-indigo-400" />
      case 'A':
        return <GraduationCap className="w-5 h-5 text-sky-400" />
      default:
        return <Terminal className="w-5 h-5" />
    }
  }

  const getScopeIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-violet-400" />
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-indigo-400" />
      case 'Layers':
        return <Layers className="w-4 h-4 text-sky-400" />
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-violet-400" />
      default:
        return <Code2 className="w-4 h-4" />
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-[85vh] flex flex-col justify-start px-6 sm:px-8 pt-24 pb-14 overflow-hidden select-none"
    >
      {/* Native Kinetic Canvas Mesh */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 dark:opacity-40 -z-10"
      />

      {/* ── HEADER BANNER ── */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)]/80 backdrop-blur-md mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_6px_rgba(139,92,246,0.8)] animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--text-secondary)] font-semibold">
            NayakLabs // Tablet System Architecture
          </span>
        </div>

        <h1 className="font-display font-black text-[clamp(2.8rem,6.5vw,4.4rem)] leading-[1.05] tracking-tight text-[var(--text-primary)] mb-3">
          Architectural Software<span className="text-violet-500">.</span>
        </h1>

        <p className="font-body text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
          Digital architecture and research studio. Three dedicated production pillars engineered from first principles for extreme performance and zero bloat.
        </p>
      </div>

      {/* ── 3-COLUMN PSA LUXURY CARDS ── */}
      <div className="w-full grid grid-cols-3 gap-4 mb-8">
        {DIVISIONS.map((div) => (
          <Link
            key={div.id}
            to={div.route}
            onClick={() => ambientAudio.playTick()}
            className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between group active:scale-[0.98] transition-all duration-200 shadow-md shadow-black/5 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)]">
                  {getDivisionIcon(div.letter)}
                </div>
                <span className="font-mono text-[10.5px] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-violet-400 font-bold">
                  {div.code}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1.5 group-hover:text-violet-400 transition-colors">
                {div.title}
              </h3>
              <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                {div.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[9px]">
                {div.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-violet-400 font-bold">
              <span>{div.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* ── 4-COLUMN SYSTEM TELEMETRY MATRIX ── */}
      <div className="w-full grid grid-cols-4 gap-3 pt-5 border-t border-[var(--border-base)]">
        {SCOPE_BADGES.map((b) => (
          <div
            key={b.title}
            className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-base)] flex flex-col items-center text-center"
          >
            <div className="mb-1.5">{getScopeIcon(b.iconName)}</div>
            <div className="font-mono text-[10.5px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {b.title}
            </div>
            <div className="font-body text-[9.5px] text-[var(--text-muted)] mt-0.5">{b.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
