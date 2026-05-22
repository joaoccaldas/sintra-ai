'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

const icons: Record<string, string> = {
  0: '🧠', 1: '💙', 2: '❤️', 3: '🔄',
  4: '💼', 5: '🌿', 6: '🍃', 7: '🔁',
  8: '⚡', 9: '🔗', 10: '🌱', 11: '🕊️',
  12: '🎯', 13: '🌸',
}

export default function ClientIssues() {
  const { t } = useLanguage()
  const ci = t.clientIssues

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase">{ci.heroTag}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white mt-4 mb-4 leading-tight">
            {ci.heroTitle}
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl">{ci.heroSubtitle}</p>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-lg leading-relaxed">{ci.intro}</p>
        </div>
      </section>

      {/* ── ISSUES GRID ──────────────────────────────────────── */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ci.issues.map((issue, i) => (
              <div
                key={issue.title}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-teal/30 hover:shadow-lg transition-all group"
              >
                <div className="text-2xl mb-4">{icons[i]}</div>
                <h3 className="font-semibold text-navy text-base mb-2 group-hover:text-teal transition-colors">
                  {issue.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{issue.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENHANCEMENT ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-teal-xlight rounded-2xl p-8">
              <div className="text-3xl mb-4">✦</div>
              <h3 className="font-serif text-2xl font-medium text-navy mb-4">{ci.enhanceTitle}</h3>
              <p className="text-slate-600 leading-relaxed">{ci.enhanceText}</p>
            </div>
            <div className="bg-cream rounded-2xl p-8">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="font-serif text-2xl font-medium text-navy mb-4">{ci.diversityTitle}</h3>
              <p className="text-slate-600 leading-relaxed">{ci.diversityText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-4xl font-medium">{ci.ctaTitle}</h2>
          <p className="text-slate-300 text-lg">{ci.ctaText}</p>
          <Link href="/contact" className="btn-teal inline-flex text-base px-8 py-4 mt-4">
            {ci.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
