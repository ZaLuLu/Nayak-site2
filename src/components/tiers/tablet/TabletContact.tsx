import React, { useState } from 'react'
import { Mail, ArrowUpRight, Copy, Check, MessageSquare } from 'lucide-react'

export function TabletContact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText('hello@nayaklabs.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="w-full px-8 py-16 border-t border-[var(--border-base)] scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
          Founders Direct · Bilateral Communication
        </span>
        <span className="font-mono text-xs text-[var(--text-muted)]">4h Guaranteed Response SLA</span>
      </div>

      <div className="max-w-2xl mb-8">
        <h2 className="font-display font-black text-3xl text-[var(--text-primary)] leading-tight mb-2">
          Start a conversation directly with our architects.
        </h2>
        <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
          No SDRs or sales reps. Direct, high-bandwidth technical alignment with the team that writes your code.
        </p>
      </div>

      {/* 3-Column Contact Channels */}
      <div className="grid grid-cols-3 gap-4">
        {/* Email */}
        <a
          href="mailto:hello@nayaklabs.com"
          className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between active:scale-98 transition-transform shadow-xs group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                <Mail className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-[var(--text-secondary)] active:scale-90 transition-transform"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="font-mono text-[10px] text-violet-400 font-bold uppercase tracking-wider mb-1">
              Direct Inbox
            </div>
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
              hello@nayaklabs.com
            </h3>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Best for custom architecture reviews, project specifications, and bilateral NDA requests.
            </p>
          </div>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-violet-400 font-semibold group-hover:underline">
            <span>Compose Email</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919999999999?text=Hello%20NayakLabs%20Team"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between active:scale-98 transition-transform shadow-xs group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                Live Chat
              </span>
            </div>

            <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">
              Instant Messaging
            </div>
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
              WhatsApp Direct
            </h3>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Real-time messaging for rapid technical questions, cohort inquiries, and urgent architecture consulting.
            </p>
          </div>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-emerald-400 font-semibold group-hover:underline">
            <span>Open WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between active:scale-98 transition-transform shadow-xs group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="font-mono text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">
              Professional Network
            </div>
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
              LinkedIn
            </h3>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Follow our engineering research dispatches, architecture teardowns, and fellowship announcements.
            </p>
          </div>

          <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-blue-400 font-semibold group-hover:underline">
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  )
}
