import React, { useState } from 'react'
import { Mail, ArrowUpRight, Copy, Check, MessageSquare } from 'lucide-react'

export function MobileContact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText('hello@nayaklabs.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="w-full px-4 py-12 border-t border-[var(--border-base)] scroll-mt-16">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
          Founders Direct · 0 Middlemen
        </span>
      </div>

      <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-2">
        Let’s Build Together
      </h2>
      <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
        Reach out directly to principal systems architects. Response time: within 4 hours.
      </p>

      {/* Direct Contact Cards List */}
      <div className="space-y-3 mb-6">
        {/* Email Card */}
        <a
          href="mailto:hello@nayaklabs.com"
          className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between active:scale-98 transition-transform shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  hello@nayaklabs.com
                </div>
                <div className="font-mono text-[9px] text-violet-400">Direct Founder Inbox</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[var(--text-secondary)] active:scale-90 transition-transform"
              title="Copy email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="pt-2 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[11px] text-violet-400 font-semibold">
            <span>Compose email</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* WhatsApp Card */}
        <a
          href="https://wa.me/919999999999?text=Hello%20NayakLabs%20Team"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between active:scale-98 transition-transform shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  WhatsApp Direct
                </div>
                <div className="font-mono text-[9px] text-emerald-400">Real-Time Messaging</div>
              </div>
            </div>
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
              Live
            </span>
          </div>

          <div className="pt-2 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[11px] text-emerald-400 font-semibold">
            <span>Chat now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* LinkedIn Card */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] flex flex-col justify-between active:scale-98 transition-transform shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  LinkedIn Studio Page
                </div>
                <div className="font-mono text-[9px] text-blue-400">Network & Careers</div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-[11px] text-blue-400 font-semibold">
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </section>
  )
}
