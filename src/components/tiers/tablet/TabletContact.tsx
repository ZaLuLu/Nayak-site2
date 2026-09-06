import React, { useState } from 'react'
import { Mail, ArrowUpRight, Copy, Check, MessageSquare } from 'lucide-react'
import { ambientAudio } from '../../../utils/audioEngine'

export function TabletContact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    ambientAudio.playTick()
    navigator.clipboard.writeText('hello@nayaklabs.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="w-full px-6 sm:px-8 py-8 border-t border-[var(--border-base)] scroll-mt-16 select-none">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold">
          Founders Direct · Bilateral Communication
        </span>
        <span className="font-mono text-[11px] text-[var(--text-muted)]">4h Guaranteed Response SLA</span>
      </div>

      <div className="max-w-2xl mb-4">
        <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] leading-tight mb-1">
          Start a conversation directly with our architects.
        </h2>
        <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
          No SDRs or sales reps. Direct, high-bandwidth technical alignment with the team that writes your code.
        </p>
      </div>

      {/* 3-Column Contact Channels */}
      <div className="grid grid-cols-3 gap-3.5">
        {/* Email */}
        <a
          href="mailto:hello@nayaklabs.com"
          onClick={() => ambientAudio.playTick()}
          className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-black/5 group"
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-violet-400">
                <Mail className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-90 transition-transform cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-xs" />}
              </button>
            </div>

            <div className="font-mono text-[9.5px] text-violet-400 font-bold uppercase tracking-wider mb-0.5">
              Direct Inbox
            </div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mb-1">
              hello@nayaklabs.com
            </h3>
            <p className="font-body text-[11.5px] text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">
              Best for custom architecture reviews, project specifications, and bilateral NDA requests.
            </p>
          </div>

          <div className="pt-2.5 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[11px] text-violet-400 font-bold group-hover:underline">
            <span>Compose Email</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919999999999?text=Hello%20NayakLabs%20Team"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ambientAudio.playTick()}
          className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-black/5 group"
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                Live Chat
              </span>
            </div>

            <div className="font-mono text-[9.5px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
              Instant Messaging
            </div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mb-1">
              WhatsApp Direct
            </h3>
            <p className="font-body text-[11.5px] text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">
              Real-time messaging for rapid technical questions, cohort inquiries, and urgent architecture consulting.
            </p>
          </div>

          <div className="pt-2.5 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[11px] text-emerald-400 font-bold group-hover:underline">
            <span>Open WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ambientAudio.playTick()}
          className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-[0.98] transition-all shadow-md shadow-black/5 group"
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-blue-400">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="font-mono text-[9.5px] text-blue-400 font-bold uppercase tracking-wider mb-0.5">
              Professional Network
            </div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mb-1">
              LinkedIn
            </h3>
            <p className="font-body text-[11.5px] text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">
              Follow our engineering research dispatches, architecture teardowns, and fellowship announcements.
            </p>
          </div>

          <div className="pt-2.5 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[11px] text-blue-400 font-bold group-hover:underline">
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  )
}
