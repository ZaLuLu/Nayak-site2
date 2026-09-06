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
    <section id="contact" className="w-full px-5 py-12 border-t border-[var(--border-base)] scroll-mt-16 select-none">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold uppercase tracking-wider">
          Founders Direct
        </span>
      </div>

      <h2 className="font-display font-black text-2xl text-[var(--text-primary)] leading-tight mb-2">
        Let’s Build Together
      </h2>
      <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
        Reach out directly to principal systems architects. Guaranteed response within 4 hours.
      </p>

      {/* Direct Contact Cards List */}
      <div className="space-y-3 mb-6">
        {/* Email Card */}
        <a
          href="mailto:hello@nayaklabs.com"
          className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-98 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/15">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  hello@nayaklabs.com
                </div>
                <div className="font-mono text-[9px] text-[var(--accent-primary)] font-medium">Direct Founder Inbox</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-secondary)] active:scale-90 transition-transform"
              title="Copy email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="pt-2.5 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-primary)] font-semibold">
            <span>Compose email</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>

        {/* WhatsApp Card */}
        <a
          href="https://wa.me/919999999999?text=Hello%20NayakLabs%20Team"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] flex flex-col justify-between active:scale-98 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/15">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  WhatsApp Direct
                </div>
                <div className="font-mono text-[9px] text-emerald-500 font-medium">Real-Time Messaging</div>
              </div>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
              Live
            </span>
          </div>

          <div className="pt-2.5 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-emerald-500 font-semibold">
            <span>Chat now</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  )
}
